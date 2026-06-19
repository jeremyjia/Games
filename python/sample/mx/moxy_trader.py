import win32com.client
import pythoncom
from datetime import datetime
import xml.etree.ElementTree as ET
import sys
import json
import argparse

class MoxyTrader:
    def __init__(self):
        self.moxy = None
        self.initialize_moxy()
    
    def initialize_moxy(self):
        """初始化Moxy COM对象"""
        try:
            # 单线程初始化COM
            pythoncom.CoInitialize()
            
            # 创建Moxy COM对象
            self.moxy = win32com.client.Dispatch("Moxy32.AdventMoxyAction.1")
            print("Moxy COM对象初始化成功!")
            return True
            
        except Exception as e:
            print(f"Moxy初始化失败: {e}")
            return False
    
    def place_bond_order(self, order_params):
        """
        放置债券订单
        
        Parameters:
        order_params: 订单参数字典，包含以下字段:
            - symbol: 债券代码
            - quantity: 数量
            - paydown_factor: 偿付因子
            - good_through_date: 订单有效日期
            - sec_type: 证券类型 (默认'mbus')
            - transaction: 交易类型 (默认'by'表示买入)
        """
        if not self.moxy:
            print("Moxy对象未初始化!")
            return False
        
        try:
            # 构建XML订单
            order_xml = self._build_order_xml(order_params)
            
            print(f"生成的订单XML: {order_xml}")
            
            # 执行订单操作
            result = self.moxy.Action("AutomatedQuickOrder", order_xml, "null")
            
            print(f"订单执行结果: {result}")
            return True
            
        except Exception as e:
            print(f"创建订单失败: {e}")
            return False
    
    def _build_order_xml(self, order_params):
        """
        构建订单XML - 包含Transaction属性
        
        Parameters:
        order_params: 订单参数字典
        """
        # 提取参数并提供默认值
        sec_type = order_params.get('sec_type', 'mbus')
        symbol = order_params.get('symbol', '')
        quantity = order_params.get('quantity', 0)
        paydown_factor = order_params.get('paydown_factor', 1.0)
        good_through_date = order_params.get('good_through_date', '')
        transaction = order_params.get('transaction', 'by')
        
        # 确保日期格式正确
        if isinstance(good_through_date, datetime):
            date_str = good_through_date.strftime('%m/%d/%Y')
        else:
            date_str = str(good_through_date)
        
        # 构建XML订单结构
        xml_template = f"""<ROOT>
    <MoxyOrder 
        SecType='{sec_type}' 
        Symbol='{symbol}' 
        Quantity='{quantity}' 
        PaydownFactor='{paydown_factor}' 
        GoodThroughDate='{date_str}'
        Transaction='{transaction}'
    />
</ROOT>"""
        
        return xml_template
    
    def validate_order_xml(self, order_params):
        """
        验证订单XML格式是否正确
        
        Parameters:
        order_params: 订单参数字典
        
        Returns:
        bool: XML是否有效
        """
        try:
            xml_content = self._build_order_xml(order_params)
            # 尝试解析XML来验证格式
            ET.fromstring(xml_content)
            return True
        except ET.ParseError as e:
            print(f"XML格式错误: {e}")
            return False
    
    def close(self):
        """清理资源"""
        if self.moxy:
            self.moxy = None
        pythoncom.CoUninitialize()
        print("资源已清理")
    
    def __del__(self):
        self.close()

def parse_arguments():
    """解析命令行参数"""
    parser = argparse.ArgumentParser(
        description='Moxy交易订单执行工具',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    # 添加命令行参数
    parser.add_argument('--symbol', help='债券代码')
    parser.add_argument('--quantity', type=int, help='数量')
    parser.add_argument('--paydown_factor', type=float, help='偿付因子')
    parser.add_argument('--good_through_date', help='订单有效日期 (MM/DD/YYYY)')
    parser.add_argument('--sec_type', default='mbus', help='证券类型 (默认: mbus)')
    parser.add_argument('--transaction', default='by', choices=['by', 'sl'], help='交易类型 (by=买入, sl=卖出, 默认: by)')
    parser.add_argument('--json_params', help='JSON格式的订单参数')
    
    return parser.parse_args()

def create_order_params_from_args(args):
    """从命令行参数创建订单参数字典"""
    if args.json_params:
        # 如果提供了JSON参数，优先使用
        try:
            # 处理命令行中的JSON字符串
            json_str = args.json_params.strip()
            
            # 处理Windows命令行可能添加的额外引号
            if json_str.startswith('"') and json_str.endswith('"'):
                json_str = json_str[1:-1]
            if json_str.startswith("'") and json_str.endswith("'"):
                json_str = json_str[1:-1]
                
            # 替换单引号为双引号（如果用户使用了单引号）
            json_str = json_str.replace("'", '"')
                
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"JSON参数解析错误: {e}")
            print(f"接收到的JSON字符串: {args.json_params}")
            sys.exit(1)
    
    # 检查是否提供了必要的单独参数
    required_params = ['symbol', 'quantity', 'paydown_factor', 'good_through_date']
    missing_params = [param for param in required_params if getattr(args, param) is None]
    
    if missing_params:
        print(f"缺少必要参数: {', '.join(missing_params)}")
        sys.exit(1)
    
    # 使用单独的参数
    return {
        'sec_type': args.sec_type,
        'symbol': args.symbol,
        'quantity': args.quantity,
        'paydown_factor': args.paydown_factor,
        'good_through_date': args.good_through_date,
        'transaction': args.transaction
    }

def execute_order(order_params):
    """执行订单的主函数"""
    trader = MoxyTrader()
    
    if trader.moxy is None:
        print("Moxy初始化失败，程序退出")
        return False
    
    print(f"开始处理订单，参数: {order_params}")
    
    # 验证订单XML
    is_valid = trader.validate_order_xml(order_params)
    if not is_valid:
        print("订单XML验证失败!")
        trader.close()
        return False
    
    print("订单XML验证成功，开始执行订单...")
    success = trader.place_bond_order(order_params)
    
    trader.close()
    return success

def test_json_parsing():
    """测试JSON解析功能"""
    test_json = '{"sec_type": "mbus", "symbol": "TEST123", "quantity": 5, "paydown_factor": 1.2, "good_through_date": "12/31/2023", "transaction": "by"}'
    
    # 模拟命令行参数
    class Args:
        json_params = test_json
    
    args = Args()
    order_params = create_order_params_from_args(args)
    print(f"测试JSON解析结果: {order_params}")
    return order_params

# 使用示例（保留用于测试）
def main():
    """原有的测试用例"""
    print("运行测试用例...")
    
    # 测试JSON解析
    test_params = test_json_parsing()
    
    trader = MoxyTrader()
    
    if trader.moxy is None:
        print("Moxy初始化失败，程序退出")
        return
    
    # 示例1: 买入订单参数
    buy_order_params = {
        'sec_type': 'csus',
        'symbol': 'advs',
        'quantity': 1,
        'paydown_factor': 2.0,
        'good_through_date': '10/01/2023',
        'transaction': 'by'  # 买入交易
    }
    
    print("执行买入订单...")
    success = trader.place_bond_order(buy_order_params)
    
    if success:
        print("买入订单执行成功!")
    else:
        print("买入订单执行失败!")
    
    trader.close()

if __name__ == "__main__":
    # 如果有命令行参数，则作为外部调用处理
    if len(sys.argv) > 1:
        try:
            args = parse_arguments()
            order_params = create_order_params_from_args(args)
            
            print(f"接收到的订单参数: {order_params}")
            
            result = execute_order(order_params)
            print(f"订单执行结果: {'成功' if result else '失败'}")
            sys.exit(0 if result else 1)
        except Exception as e:
            print(f"程序执行出错: {e}")
            import traceback
            traceback.print_exc()
            sys.exit(1)
    else:
        # 没有参数时运行测试用例
        print("没有提供外部参数，运行测试用例...")
        main()