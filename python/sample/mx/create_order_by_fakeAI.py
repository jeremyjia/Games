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
    
    # 1. 提取股票代码
    symbol_match = re.search(r'\b([A-Z]{2,4})\b', command, re.IGNORECASE)
    if symbol_match:
        params['symbol'] = symbol_match.group(1).upper()
    else:
        # 识别中文股票名称
        chinese_stocks = {
            '腾讯': '0700', '阿里巴巴': 'BABA', '茅台': '600519', 
            '平安': '000001', '招商银行': '600036', '万科': '000002',
            '宁德时代': '300750', '美团': '3690', '京东': 'JD',
            '百度': 'BIDU', '小米': '1810', '中国移动': '0941',
            'ibm': 'IBM', '苹果': 'AAPL', '谷歌': 'GOOGL',
            '微软': 'MSFT', '亚马逊': 'AMZN', '特斯拉': 'TSLA'
        }
        
        for name, code in chinese_stocks.items():
            if name.lower() in command.lower():
                params['symbol'] = code
                break
    
    # 2. 提取数量
    quantity_match = re.search(r'(\d+)\s*(股|份|个单位|个|手|shares|share)?', command, re.IGNORECASE)
    if quantity_match:
        params['quantity'] = int(quantity_match.group(1))
    
    # 3. 提取证券类型（如果指定）
    if 'mbus' in command.lower():
        params['sec_type'] = 'mbus'
    elif 'csus' in command.lower():
        params['sec_type'] = 'csus'
    
    # 4. 提取支付因子（如果指定）
    paydown_match = re.search(r'支付因子[：:]\s*(\d+\.?\d*)', command)
    if paydown_match:
        params['paydown_factor'] = float(paydown_match.group(1))
    
    # 5. 设置有效日期（3天后）
    future_date = datetime.now() + timedelta(days=3)
    params['good_through_date'] = future_date.strftime('%m/%d/%Y')
    
    # 6. 检查交易类型
    if any(word in command for word in ['卖', '卖出', 'sell', '售', 'sl']):
        params['transaction'] = 'sl'
    
    # 检查必要参数
    if not params['symbol']:
        numbers_match = re.search(r'(\d{4,6})', command)
        if numbers_match:
            params['symbol'] = numbers_match.group(1)
        else:
            raise ValueError("无法从指令中识别出股票代码。请明确指定股票名称或代码")
    
    return params

def call_moxy_trader_alternative(order_params):
    """
    使用参数列表调用外部交易程序（推荐方式）
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

def main():
    # 设置编码
    setup_encoding()
    
    safe_print("📈 股票交易指令解析器")
    safe_print("支持格式示例：")
    safe_print("- 我想买100股腾讯")
    safe_print("- 买入IBM 10股")
    safe_print("- 卖出500股600036")
    safe_print("- 购买2手茅台 mbus类型")
    safe_print("- 买50股阿里巴巴 支付因子:1.5")
    safe_print("输入 'quit' 或 '退出' 结束程序")
    safe_print("=" * 50)
    
    while True:
        try:
            user_input = input("\n💬 您的指令: ").strip()
            
            if user_input.lower() in ['quit', '退出', 'exit']:
                safe_print("👋 程序已退出。")
                break
            
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
                safe_print("\n" + "="*50)
                
                success = call_moxy_trader_alternative(order_params)
                
                if success:
                    safe_print("🎉 交易流程完成！")
                else:
                    safe_print("⚠️  交易执行失败，请检查后重试")
                safe_print("="*50)
            else:
                safe_print("❌ 交易已取消")
                
        except ValueError as e:
            safe_print(f"❌ 错误: {str(e)}")
            safe_print("💡 请尝试更明确的指令，如：'买入100股腾讯股票'")
        except Exception as e:
            safe_print(f"❌ 解析时发生未知错误: {str(e)}")

def create_demo_moxy_trader():
    """
    创建一个演示用的 moxy_trader.py 文件（使用ASCII字符）
    """
    demo_code = '''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Moxy Trader - 模拟交易程序
用于接收JSON参数并模拟执行交易
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
        
        print("=" * 50)
        print("Moxy Trader 交易执行结果")
        print("=" * 50)
        
        # 显示交易详情
        print(f"证券类型: {params.get('sec_type', 'N/A')}")
        print(f"股票代码: {params.get('symbol', 'N/A')}")
        print(f"交易数量: {params.get('quantity', 'N/A')}")
        print(f"支付因子: {params.get('paydown_factor', 'N/A')}")
        print(f"有效日期: {params.get('good_through_date', 'N/A')}")
        
        transaction_type = "买入" if params.get('transaction') == 'by' else "卖出"
        print(f"交易类型: {transaction_type}")
        
        # 模拟交易执行
        print("\\n交易执行成功！")
        print(f"交易ID: TRX_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
        print(f"执行时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 50)
        
        return 0
        
    except json.JSONDecodeError as e:
        print(f"JSON参数解析失败: {e}")
        print(f"接收到的参数: {args.json_params}")
        return 1
    except Exception as e:
        print(f"交易执行错误: {e}")
        return 2

if __name__ == "__main__":
    sys.exit(main())
'''
    
    with open('moxy_trader.py', 'w', encoding='utf-8') as f:
        f.write(demo_code)
    safe_print("已创建演示用的 moxy_trader.py 文件")

if __name__ == "__main__":
    # 设置编码
    setup_encoding()
    
    # 检查是否存在 moxy_trader.py，如果不存在则创建演示文件
    try:
        with open('moxy_trader.py', 'r', encoding='utf-8'):
            pass
        safe_print("找到 moxy_trader.py 文件")
    except FileNotFoundError:
        safe_print("未找到 moxy_trader.py，创建演示文件...")
        create_demo_moxy_trader()
    
    safe_print("\n" + "="*50)
    # 运行主程序
    main()