# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import random
import textwrap
import os

def add_text_to_image(image_path, output_path, text, font_path=None):
    """
    在图片上添加美观的中文字体
    
    参数:
        image_path: 原始图片路径
        output_path: 输出图片路径
        text: 要添加的文字(UTF-8编码)
        font_path: 中文字体文件路径(强烈推荐指定)
    """
    # 打开原始图片
    try:
        image = Image.open(image_path).convert("RGBA")
    except IOError:
        print("无法打开图片文件")
        return
    
    # 创建一个透明层用于文字
    txt_layer = Image.new("RGBA", image.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(txt_layer)
    
    # 设置字体（强烈推荐指定中文字体文件）
    font_size = min(image.size) // 10  # 根据图片大小动态调整字体大小
    
    if font_path and os.path.exists(font_path):
        # 使用用户指定的字体文件
        font = ImageFont.truetype(font_path, font_size)
    else:
        # 尝试系统中可能存在的常见中文字体
        common_chinese_fonts = [
            "msyh.ttc",  # 微软雅黑
            "simhei.ttf", # 黑体
            "STHeiti Medium.ttc",  # Mac华文黑体
            "PingFang.ttc",  # 苹果苹方
            "NotoSansCJK-Regular.ttc"  # Google思源黑体
        ]
        
        font = None
        for font_name in common_chinese_fonts:
            try:
                font = ImageFont.truetype(font_name, font_size)
                print(f"使用字体: {font_name}")
                break
            except IOError:
                continue
        
        if font is None:
            print("警告: 未找到中文字体，将使用默认字体(可能显示乱码)")
            font = ImageFont.load_default()
    
    # 计算文字位置（居中）
    margin = 20
    max_width = image.size[0] - 2 * margin
    
    # 中文字符宽度估算
    avg_char_width = font_size  # 中文字符通常比英文字符宽
    max_chars_per_line = int(max_width / avg_char_width)
    
    # 自动换行（处理中文换行）
    wrapped_text = textwrap.fill(text, width=max_chars_per_line)
    
    # 计算文字总高度
    lines = wrapped_text.split('\n')
    line_height = int(font_size * 1.5)  # 中文行距稍大
    total_text_height = len(lines) * line_height
    
    # 文字位置（垂直居中）
    y = (image.size[1] - total_text_height) // 2
    
    # 漂亮的文字颜色组合（适合中文）
    color_palettes = [
        [(255, 255, 255), (70, 130, 180)],  # 白+钢蓝
        [(255, 215, 0), (139, 0, 0)],       # 金+深红
        [(220, 240, 220), (0, 100, 0)],     # 浅绿+深绿
        [(255, 255, 200), (178, 34, 34)],   # 米黄+砖红
        [(230, 230, 255), (25, 25, 112)]    # 浅蓝+午夜蓝
    ]
    
    # 随机选择一个配色方案
    text_color, shadow_color = random.choice(color_palettes)
    
    # 添加文字（带阴影效果）
    for line in lines:
        line_width = font.getlength(line)
        x = (image.size[0] - line_width) // 2
        
        # 先绘制阴影（多个偏移实现立体效果）
        for dx, dy in [(2, 2), (2, 0), (0, 2), (-2, 2), (2, -2)]:
            draw.text((x+dx, y+dy), line, font=font, fill=shadow_color)
        
        # 再绘制主文字
        draw.text((x, y), line, font=font, fill=text_color)
        
        y += line_height
    
    # 合并文字层和原图
    combined = Image.alpha_composite(image, txt_layer)
    
    # 保存结果
    combined.convert("RGB").save(output_path)
    print(f"图片已保存到: {output_path}")

# 使用示例
if __name__ == "__main__":
    # 替换为你的图片路径
    input_image = "input.jpg"
    output_image = "output_with_text.jpg"
    
    # 要添加的中文文字
    text = "人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。"
    
    # 强烈推荐指定一个中文字体文件路径
    font_path = None  # 如果不指定，会尝试查找系统字体
    
    # Windows用户可以使用微软雅黑（通常位于C:/Windows/Fonts/msyh.ttc）
    # font_path = "C:/Windows/Fonts/msyh.ttc"
    
    # Mac用户可以使用苹方或华文黑体
    # font_path = "/System/Library/Fonts/PingFang.ttc"
    
    add_text_to_image(input_image, output_image, text, font_path)