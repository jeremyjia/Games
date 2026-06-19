import json
import re
import subprocess
import sys
import os
from datetime import datetime, timedelta

# 设置正确的编码
def setup_encoding():
    """设置控制台编码为UTF-8"""
    if sys.platform.startswith('win'):
        # Windows系统
        try:
            # 尝试设置控制台编码为UTF-8
            os.system('chcp 65001 > nul')
            # 设置标准输出的编码
            if hasattr(sys.stdout, 'reconfigure'):
                sys.stdout.reconfigure(encoding='utf-8')
            if hasattr(sys.stderr, 'reconfigure'):
                sys.stderr.reconfigure(encoding='utf-8')
        except:
            pass

def safe_print(message):
    """安全打印函数，处理编码问题"""
    try:
        print(message)
    except UnicodeEncodeError:
        # 如果遇到编码错误，尝试使用替代字符
        try:
            print(message.encode('utf-8', errors='replace').decode('utf-8'))
        except:
            # 最后的手段：使用ASCII替代
            print(message.encode('ascii', errors='replace').decode('ascii'))

def parse_order_command(command):
    """
    解析买入指令的自然语言，生成订单参数字典。
    支持复杂的国际股票符号格式。
    """
    
    # 初始化参数字典
    params = {
        'sec_type': 'csus',
        'symbol': None,
        'quantity': 1,
        'paydown_factor': 2.0,
        'good_through_date': None,
        'transaction': 'by'
    }
    
    # 1. 提取股票代码 - 修复的正则表达式
    # 匹配股票代码：2-5个字母数字，可选后接1-2个点分隔的后缀
    # 避免匹配单个字母如 "I", "a" 等
    symbol_pattern = r'\b([A-Z0-9]{2,5}(?:\.[A-Za-z0-9]{1,5}){0,2})\b'
    symbol_match = re.search(symbol_pattern, command, re.IGNORECASE)
    
    if symbol_match:
        candidate = symbol_match.group(1).upper()
        # 进一步过滤：排除常见英文单词
        common_words = {'I', 'A', 'AN', 'THE', 'BUY', 'SELL', 'SHARE', 'SHARES', 
                       'AND', 'OR', 'TO', 'FOR', 'WITH', 'BY', 'OF', 'IN', 'ON'}
        if candidate not in common_words:
            params['symbol'] = candidate
    
    # 如果没有匹配到符号，尝试中文股票名称映射
    if not params['symbol']:
        chinese_stocks = {
            '腾讯': '0700.HK', '阿里巴巴': 'BABA', '茅台': '600519.SS', 
            '平安': '000001.SZ', '招商银行': '600036.SS', '万科': '000002.SZ',
            '宁德时代': '300750.SZ', '美团': '3690.HK', '京东': 'JD',
            '百度': 'BIDU', '小米': '1810.HK', '中国移动': '0941.HK',
            'ibm': 'IBM', '苹果': 'AAPL', '谷歌': 'GOOGL',
            '微软': 'MSFT', '亚马逊': 'AMZN', '特斯拉': 'TSLA',
            '伯克希尔': 'BRK.B', '腾讯ADR': 'TCEHY', '阿里ADR': 'BABA',
            '蔚来': 'NIO', '理想': 'LI', '小鹏': 'XPEV',
            '拼多多': 'PDD', '网易': 'NTES', '微博': 'WB',
            'adven': 'ADVS', 'advs': 'ADVS'
        }
        
        for name, code in chinese_stocks.items():
            if name.lower() in command.lower():
                params['symbol'] = code
                break
    
    # 2. 根据符号自动识别证券类型
    if params['symbol']:
        symbol = params['symbol'].lower()
        if any(ext in symbol for ext in ['.ss', '.sz']):
            params['sec_type'] = 'csus'  # 中国A股
        elif '.hk' in symbol:
            params['sec_type'] = 'hks'   # 港股
        elif '.adr' in symbol:
            params['sec_type'] = 'adr'   # 美国存托凭证
        elif any(ext in symbol for ext in ['.ws', '.wt']):
            params['sec_type'] = 'warrant'  # 权证
        elif any(char in symbol for char in ['.', '-']):
            params['sec_type'] = 'mbus'  # 复杂美国股票代码
        elif 2 <= len(symbol.replace('.', '')) <= 5:  # 最小长度改为2
            params['sec_type'] = 'mbus'  # 简单美国股票代码
    
    # 3. 提取证券类型（如果用户明确指定）
    if 'mbus' in command.lower():
        params['sec_type'] = 'mbus'
    elif 'csus' in command.lower():
        params['sec_type'] = 'csus'
    elif 'adr' in command.lower():
        params['sec_type'] = 'adr'
    elif 'hks' in command.lower():
        params['sec_type'] = 'hks'
    
    # 4. 提取数量
    quantity_match = re.search(r'(\d+)\s*(股|份|个单位|个|手|shares|share)?', command, re.IGNORECASE)
    if quantity_match:
        params['quantity'] = int(quantity_match.group(1))
    
    # 5. 提取支付因子（如果指定）
    paydown_match = re.search(r'(支付因子|paydown)[：:\s]*(\d+\.?\d*)', command, re.IGNORECASE)
    if paydown_match:
        params['paydown_factor'] = float(paydown_match.group(2))
    
    # 6. 提取有效日期（如果指定）
    date_match = re.search(r'(\d{1,2})[/-](\d{1,2})[/-](\d{4})', command)
    if date_match:
        month, day, year = date_match.groups()
        params['good_through_date'] = f"{int(month):02d}/{int(day):02d}/{year}"
    else:
        # 设置默认有效日期（3天后）
        future_date = datetime.now() + timedelta(days=3)
        params['good_through_date'] = future_date.strftime('%m/%d/%Y')
    
    # 7. 检查交易类型
    if any(word in command for word in ['卖', '卖出', 'sell', '售', 'sl', 'short']):
        params['transaction'] = 'sl'
    elif any(word in command for word in ['买', '买入', 'buy', 'purchase', 'by']):
        params['transaction'] = 'by'
    
    # 检查必要参数
    if not params['symbol']:
        # 尝试匹配纯数字代码（如港股）
        numbers_match = re.search(r'(\d{4,5})', command)
        if numbers_match:
            params['symbol'] = numbers_match.group(1) + '.HK'
            params['sec_type'] = 'hks'
        else:
            raise ValueError("无法从指令中识别出股票代码。请明确指定股票名称或代码")
    
    return params

def call_moxy_trader(order_params):
    """
    调用外部交易程序 moxy_trader.py
    """
    try:
        # 构建参数字符串
        json_params = json.dumps(order_params)
        
        # 构建命令行参数列表
        cmd = [
            sys.executable,
            'moxy_trader.py',
            '--json_params',
            json_params
        ]
        
        safe_print("\n📤 正在调用交易程序:")
        safe_print(f"   python moxy_trader.py --json_params '{json_params}'")
        
        # 执行外部程序，设置UTF-8编码环境
        env = os.environ.copy()
        env['PYTHONIOENCODING'] = 'utf-8'
        
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=30,
            env=env
        )
        
        # 输出结果
        if result.returncode == 0:
            safe_print("✅ 交易程序执行成功！")
            if result.stdout:
                safe_print("📊 输出结果:")
                safe_print(result.stdout)
        else:
            safe_print("❌ 交易程序执行失败！")
            safe_print(f"错误代码: {result.returncode}")
            if result.stderr:
                safe_print("错误信息:")
                safe_print(result.stderr)
        
        return result.returncode == 0
        
    except subprocess.TimeoutExpired:
        safe_print("❌ 交易程序执行超时！")
        return False
    except FileNotFoundError:
        safe_print("❌ 找不到交易程序 moxy_trader.py")
        safe_print("请确保 moxy_trader.py 在当前目录下")
        return False
    except Exception as e:
        safe_print(f"❌ 调用交易程序时发生错误: {str(e)}")
        return False

def show_examples():
    """显示支持的指令示例"""
    safe_print("\n🎯 支持的指令格式示例:")
    safe_print("=" * 60)
    
    safe_print("📈 中文指令:")
    safe_print("  • 买入100股腾讯")
    safe_print("  • 买500股600036.SS")
    safe_print("  • 卖出200股IBM")
    safe_print("  • 购买50股BRK.B")
    safe_print("  • 我想买300股TCEHY.adr")
    safe_print("  • 买入100股advs")
    safe_print("  • 买150股茅台 支付因子:1.5")
    safe_print("  • 卖出80股AAPL 有效期:12/31/2023")
    
    safe_print("\n📈 英文指令:")
    safe_print("  • buy 100 share Tencent")
    safe_print("  • purchase 50 shares IBM")
    safe_print("  • sell 200 shares AAPL")
    safe_print("  • buy 300 share BRK.B")
    safe_print("  • I want to buy 150 shares TCEHY.adr")
    safe_print("  • buy 100 share advs")
    safe_print("  • purchase 80 shares MSFT with paydown 1.2")
    safe_print("  • sell 60 shares TSLA good through 12/31/2023")
    
    safe_print("\n🌍 国际股票格式:")
    safe_print("  • 简单代码: IBM, AAPL, ADVS, TSLA")
    safe_print("  • 带后缀: BRK.B, GOOGL, CANN.ADR.Y")
    safe_print("  • ADR凭证: BABA.adr, TCEHY.adr")
    safe_print("  • 港股: 0700.HK, 3690.HK")
    safe_print("  • A股: 600036.SS, 000001.SZ")
    
    safe_print("\n⚙️  可选参数:")
    safe_print("  • 支付因子: 支付因子:1.5 或 paydown:1.2")
    safe_print("  • 有效期: 有效期:12/31/2023 或 good through 12/31/2023")
    safe_print("  • 证券类型: mbus, csus, adr, hks")
    safe_print("=" * 60)

def test_parser():
    """测试股票代码解析功能"""
    test_cases = [
        "买入100股腾讯",
        "buy 100 share advs",
        "购买 BRK.B 50股",
        "sell 200 shares AAPL",
        "我想买 TCEHY.adr 200股",
        "purchase 80 shares MSFT",
        "买入100股600036.SS",
        "buy 150 share IBM",
        "I want to buy 150 shares TCEHY.adr",
        "a purchase order for 100 shares TSLA"
    ]
    
    safe_print("🧪 测试股票代码解析:")
    safe_print("=" * 60)
    
    for test in test_cases:
        try:
            result = parse_order_command(test)
            safe_print(f"📝 输入: {test}")
            safe_print(f"✅ 输出: {result['symbol']} ({result['sec_type']}) x{result['quantity']} {result['transaction']}")
            safe_print("-" * 50)
        except Exception as e:
            safe_print(f"📝 输入: {test}")
            safe_print(f"❌ 错误: {e}")
            safe_print("-" * 50)

def test_specific_cases():
    """测试特定容易出错的案例"""
    test_cases = [
        "I want to buy 150 shares TCEHY.adr",
        "a buy order for 100 shares TSLA",
        "I need to sell 50 shares AAPL",
        "an order to purchase 200 shares IBM"
    ]
    
    safe_print("🧪 测试易错案例:")
    safe_print("=" * 60)
    
    for test in test_cases:
        try:
            result = parse_order_command(test)
            safe_print(f"📝 输入: {test}")
            if result['symbol']:
                safe_print(f"✅ 输出: {result['symbol']} ({result['sec_type']}) x{result['quantity']} {result['transaction']}")
            else:
                safe_print(f"❌ 未识别到符号")
            safe_print("-" * 50)
        except Exception as e:
            safe_print(f"📝 输入: {test}")
            safe_print(f"❌ 错误: {e}")
            safe_print("-" * 50)

def main():
    # 设置编码
    setup_encoding()
    
    safe_print("📈 智能股票交易指令解析器")
    safe_print("=" * 60)
    safe_print("支持中文和英文自然语言指令")
    
    show_examples()
    
    # 先运行测试
    safe_print("\n" + "=" * 60)
    test_specific_cases()
    safe_print("\n" + "=" * 60)
    test_parser()
    safe_print("\n" + "=" * 60)
    
    while True:
        try:
            user_input = input("\n💬 请输入交易指令 (输入 'help' 查看示例, 'test' 测试, 'quit' 退出): ").strip()
            
            if user_input.lower() in ['quit', '退出', 'exit']:
                safe_print("👋 程序已退出。")
                break
            
            if user_input.lower() in ['help', '帮助', '示例']:
                show_examples()
                continue
                
            if user_input.lower() == 'test':
                test_parser()
                continue
            
            if not user_input:
                continue
            
            # 解析指令
            order_params = parse_order_command(user_input)
            
            # 构建输出格式
            result = {
                "buy_order_params": order_params
            }
            
            # 转换为JSON并打印
            json_output = json.dumps(result, indent=4, ensure_ascii=False)
            safe_print("\n📋 生成的订单参数:")
            safe_print(json_output)
            
            # 询问是否执行交易
            confirm = input("\n🚀 是否执行交易？(y/n): ").strip().lower()
            if confirm in ['y', 'yes', '是', '确认']:
                safe_print("\n" + "="*60)
                
                success = call_moxy_trader(order_params)
                
                if success:
                    safe_print("🎉 交易流程完成！")
                else:
                    safe_print("⚠️  交易执行失败，请检查后重试")
                safe_print("="*60)
            else:
                safe_print("❌ 交易已取消")
                
        except ValueError as e:
            safe_print(f"❌ 错误: {str(e)}")
            safe_print("💡 请输入 'help' 查看正确的指令格式")
        except Exception as e:
            safe_print(f"❌ 解析时发生未知错误: {str(e)}")

def create_demo_moxy_trader():
    """
    创建一个演示用的 moxy_trader.py 文件
    """
    demo_code = '''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Moxy Trader - 模拟交易程序
用于接收JSON参数并模拟执行交易
支持国际复杂股票符号
"""

import json
import argparse
import sys
from datetime import datetime

def main():
    # 设置UTF-8编码
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8')
    
    parser = argparse.ArgumentParser(description='Moxy Trader - 股票交易程序')
    parser.add_argument('--json_params', type=str, required=True, help='JSON格式的交易参数')
    
    args = parser.parse_args()
    
    try:
        # 解析JSON参数
        params = json.loads(args.json_params)
        
        print("=" * 60)
        print("🤖 Moxy Trader 交易执行系统")
        print("=" * 60)
        
        # 显示交易详情
        print(f"📊 证券类型: {params.get('sec_type', 'N/A')}")
        print(f"📈 股票代码: {params.get('symbol', 'N/A')}")
        print(f"🔢 交易数量: {params.get('quantity', 'N/A')}")
        print(f"💰 支付因子: {params.get('paydown_factor', 'N/A')}")
        print(f"📅 有效日期: {params.get('good_through_date', 'N/A')}")
        
        transaction_type = "买入" if params.get('transaction') == 'by' else "卖出"
        print(f"🔄 交易类型: {transaction_type}")
        
        # 模拟交易执行
        print("\\n✅ 交易执行成功！")
        print(f"🆔 交易ID: TRX_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
        print(f"⏰ 执行时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        return 0
        
    except json.JSONDecodeError as e:
        print(f"❌ JSON参数解析失败: {e}")
        print(f"📨 接收到的参数: {args.json_params}")
        return 1
    except Exception as e:
        print(f"❌ 交易执行错误: {e}")
        return 2

if __name__ == "__main__":
    sys.exit(main())
'''
    
    with open('moxy_trader.py', 'w', encoding='utf-8') as f:
        f.write(demo_code)
    safe_print("✅ 已创建演示用的 moxy_trader.py 文件")

if __name__ == "__main__":
    # 设置编码
    setup_encoding()
    
    # 检查是否存在 moxy_trader.py，如果不存在则创建演示文件
    try:
        with open('moxy_trader.py', 'r', encoding='utf-8'):
            pass
        safe_print("✅ 找到 moxy_trader.py 文件")
    except FileNotFoundError:
        safe_print("⚠️  未找到 moxy_trader.py，创建演示文件...")
        create_demo_moxy_trader()
    
    safe_print("\n" + "="*60)
    # 运行主程序
    main()