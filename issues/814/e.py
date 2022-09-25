import sys

if __name__ == '__main__':
    # 获取参数列表
    # 注意：sys.argv[0] 代表第一个参数，即：脚本名称「1_sys.argv.py」
    # 其他参数列表
    args = sys.argv[1:]

    # 参数个数
    args_length = len(sys.argv) if sys.argv else 0

    print("排除运行主文件参数，其他参数列表为:", args)

    print("参数总数：", args_length)
    
    print("p1=", args[0])
    print("p2=", args[1])

    from music21 import converter
    s = converter.parse(args[0])
    s.write('midi', fp=args[1])

# 使用
# python3 1_sys.argv.py arg1 arg2
# 排除运行主文件参数，其他参数列表为: [arg1, arg1]
# 参数总数：3