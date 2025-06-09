#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
图片文字添加工具 - 修复文字显示不全问题
"""

from PIL import Image, ImageDraw, ImageFont
import random
import textwrap
import os
import argparse
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 预设颜色方案（文字颜色，阴影颜色）
COLOR_PALETTES = [
    [(255, 255, 255), (70, 130, 180)],  # 0: 白+钢蓝
    [(255, 215, 0), (139, 0, 0)],       # 1: 金+深红
    [(220, 240, 220), (0, 100, 0)],     # 2: 浅绿+深绿
    [(255, 255, 200), (178, 34, 34)],   # 3: 米黄+砖红
    [(230, 230, 255), (25, 25, 112)],   # 4: 浅蓝+午夜蓝
    [(0, 0, 0), (169, 169, 169)],       # 5: 黑+灰色
    [(255, 255, 255), (0, 0, 0)],       # 6: 白+黑
    [(255, 255, 0), (255, 0, 0)]        # 7: 黄+红
]

# 常见中文字体列表（跨平台）
COMMON_CHINESE_FONTS = [
    "msyh.ttc",          # 微软雅黑 (Windows)
    "simhei.ttf",        # 黑体 (Windows)
    "STHeiti Medium.ttc", # 华文黑体 (Mac)
    "PingFang.ttc",      # 苹方 (Mac)
    "NotoSansCJK-Regular.ttc",  # 思源黑体 (Linux)
    "SourceHanSansSC-Regular.otf",  # 思源黑体
    "DroidSansFallback.ttf",  # Android字体
    "FZSTK.TTF"         # 方正舒体
]

def add_text_to_image(
    image_path, 
    output_path, 
    text, 
    font_path=None, 
    region=None, 
    font_size=None, 
    text_color=None, 
    shadow_color=None, 
    color_scheme=None, 
    line_spacing=1.5, 
    margin=20,
    align="center",
    valign="center",
    auto_shrink=False
):
    """
    在图片上添加文字的核心函数
    
    参数:
        auto_shrink (bool): 当文字太多时自动缩小字体以适应区域
    """
    try:
        image = Image.open(image_path).convert("RGBA")
    except Exception as e:
        raise ValueError(f"无法打开图片文件: {e}")

    # 确定文字区域
    img_width, img_height = image.size
    if region is None:
        region = (0, 0, img_width, img_height)
    else:
        region = (
            max(0, min(region[0], img_width-1)),
            max(0, min(region[1], img_height-1)),
            max(0, min(region[2], img_width)),
            max(0, min(region[3], img_height))
        )

    # 创建透明文字层
    txt_layer = Image.new("RGBA", image.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(txt_layer)

    # 初始字体大小
    region_width = region[2] - region[0]
    region_height = region[3] - region[1]
    if font_size is None:
        font_size = min(region_width, region_height) // 10

    # 加载字体
    font = load_font(font_path, font_size)

    # 设置颜色
    if color_scheme is not None and 0 <= color_scheme < len(COLOR_PALETTES):
        text_color, shadow_color = COLOR_PALETTES[color_scheme]
    elif text_color is None or shadow_color is None:
        text_color, shadow_color = random.choice(COLOR_PALETTES)

    # 自动调整字体大小直到文字能完全显示
    if auto_shrink:
        font_size = find_optimal_font_size(
            text, font_path, 
            region_width-2*margin, 
            region_height-2*margin,
            line_spacing,
            initial_size=font_size
        )
        font = load_font(font_path, font_size)

    # 处理文字布局
    wrapped_text, total_height = wrap_text(
        text, font, region_width-2*margin, line_spacing
    )

    # 检查文字是否能完全显示
    if total_height > region_height - 2*margin:
        if auto_shrink:
            raise ValueError("文字内容过多，即使缩小字体也无法完全显示")
        else:
            print("⚠ 警告: 文字内容可能无法完全显示，建议启用auto_shrink或调整区域大小")

    # 绘制文字
    draw_text_with_shadow(
        draw, font, wrapped_text, 
        region, margin, 
        text_color, shadow_color,
        align, valign,
        line_spacing, total_height
    )

    # 合并并保存图片
    try:
        Image.alpha_composite(image, txt_layer)\
            .convert("RGB")\
            .save(output_path)
        print(f"✓ 图片已保存到: {output_path} (字体大小: {font_size}px)")
    except Exception as e:
        raise ValueError(f"保存图片失败: {e}")

def find_optimal_font_size(text, font_path, max_width, max_height, line_spacing, initial_size=40):
    """自动寻找能完全显示文字的合适字体大小"""
    font_size = initial_size
    min_size = 8  # 最小字体大小
    
    while font_size >= min_size:
        # 尝试加载字体
        try:
            font = load_font(font_path, font_size)
        except:
            font_size -= 1
            continue
        
        # 测试文字布局
        try:
            wrapped_text, total_height = wrap_text(text, font, max_width, line_spacing)
            if total_height <= max_height:
                return font_size
        except:
            pass
        
        font_size -= 1  # 减小字体大小再次尝试
    
    return min_size  # 返回最小可用字体大小

def load_font(font_path, font_size):
    """加载字体文件"""
    if font_path and os.path.exists(font_path):
        try:
            return ImageFont.truetype(font_path, font_size)
        except Exception as e:
            print(f"⚠ 无法加载指定字体: {e}")

    # 尝试加载系统字体
    for font_name in COMMON_CHINESE_FONTS:
        try:
            return ImageFont.truetype(font_name, font_size)
        except:
            continue

    print("⚠ 未找到中文字体，使用默认字体（可能不支持中文）")
    return ImageFont.load_default()

def wrap_text(text, font, max_width, line_spacing):
    """自动换行处理并计算总高度"""
    # 先尝试不换行的情况
    if font.getlength(text) <= max_width:
        return text, get_text_height(font, text, line_spacing)
    
    # 需要换行处理
    words = list(text)
    lines = []
    current_line = []
    
    for word in words:
        test_line = ''.join(current_line + [word])
        if font.getlength(test_line) <= max_width:
            current_line.append(word)
        else:
            if not current_line:  # 单个字符就超长
                current_line.append(word)
                lines.append(''.join(current_line))
                current_line = []
            else:
                lines.append(''.join(current_line))
                current_line = [word]
    
    if current_line:
        lines.append(''.join(current_line))
    
    wrapped_text = '\n'.join(lines)
    total_height = sum(get_text_height(font, line, line_spacing) for line in lines)
    
    return wrapped_text, total_height

def get_text_height(font, text, line_spacing):
    """获取单行文字高度（考虑行间距）"""
    bbox = font.getbbox(text)
    return int((bbox[3] - bbox[1]) * line_spacing)

def draw_text_with_shadow(
    draw, font, text, 
    region, margin, 
    text_color, shadow_color,
    align, valign,
    line_spacing, total_height
):
    """绘制带阴影的文字"""
    lines = text.split('\n')
    region_x, region_y, region_w, region_h = region
    
    # 计算垂直起始位置
    if valign == "center":
        y = region_y + margin + (region_h - 2*margin - total_height) // 2
    elif valign == "bottom":
        y = region_y + region_h - margin - total_height
    else:  # top
        y = region_y + margin

    # 绘制每行文字
    for line in lines:
        line_width = font.getlength(line)
        line_height = get_text_height(font, line, 1.0)  # 实际行高不考虑行间距
        
        # 计算水平位置
        if align == "center":
            x = region_x + margin + (region_w - 2*margin - line_width) // 2
        elif align == "right":
            x = region_x + region_w - margin - line_width
        else:  # left
            x = region_x + margin
        
        # 绘制阴影（多个偏移实现立体效果）
        for dx, dy in [(2, 2), (2, 0), (0, 2), (-2, 2), (2, -2)]:
            draw.text((x+dx, y+dy), line, font=font, fill=shadow_color)
        
        # 绘制主文字
        draw.text((x, y), line, font=font, fill=text_color)
        
        y += line_height * line_spacing

def parse_region(region_str):
    """解析区域字符串"""
    if not region_str:
        return None
    try:
        parts = list(map(int, region_str.split(',')))
        if len(parts) == 4:
            return parts
    except ValueError:
        pass
    print("⚠ 区域格式应为'x1,y1,x2,y2'，将使用整张图片")
    return None

def parse_color(color_str):
    """解析颜色字符串"""
    if not color_str:
        return None
    try:
        parts = list(map(int, color_str.split(',')))
        if len(parts) == 3 and all(0 <= p <= 255 for p in parts):
            return tuple(parts)
    except ValueError:
        pass
    print("⚠ 颜色格式应为'R,G,B'（0-255），将使用默认颜色")
    return None

def main():
    parser = argparse.ArgumentParser(
        description="图片文字添加工具 - 修复文字显示不全问题",
        formatter_class=argparse.RawTextHelpFormatter
    )
    
    # 必需参数
    parser.add_argument("-i", "--input", required=True, help="输入图片路径")
    parser.add_argument("-o", "--output", required=True, help="输出图片路径")
    parser.add_argument("-t", "--text", required=True, help="要添加的文字内容（支持换行符\\n）")
    
    # 字体参数
    parser.add_argument("-f", "--font", help="自定义字体文件路径")
    parser.add_argument("-s", "--font_size", type=int, help="字体大小（默认自动计算）")
    
    # 区域参数
    parser.add_argument("-r", "--region", help="文字区域 'x1,y1,x2,y2'（默认整张图片）")
    parser.add_argument("-m", "--margin", type=int, default=20, help="文字区域边距（像素，默认20）")
    parser.add_argument("--align", choices=["left", "center", "right"], default="center",
                       help="文字水平对齐方式（默认居中）")
    parser.add_argument("--valign", choices=["top", "center", "bottom"], default="center",
                       help="文字垂直对齐方式（默认居中）")
    
    # 颜色参数组
    color_group = parser.add_mutually_exclusive_group()
    color_group.add_argument("-tc", "--text_color", help="文字颜色 'R,G,B'（如'255,255,255'）")
    color_group.add_argument("-sc", "--shadow_color", help="阴影颜色 'R,G,B'")
    color_group.add_argument("-cs", "--color_scheme", type=int,
                            choices=range(len(COLOR_PALETTES)),
                            help=f"预设颜色方案 0-{len(COLOR_PALETTES)-1}")
    
    # 其他参数
    parser.add_argument("-ls", "--line_spacing", type=float, default=1.5,
                       help="行间距倍数（默认1.5）")
    parser.add_argument("--auto_shrink", action="store_true",
                       help="当文字太多时自动缩小字体以适应区域")
    
    args = parser.parse_args()
    
    try:
        add_text_to_image(
            image_path=args.input,
            output_path=args.output,
            text=args.text,
            font_path=args.font,
            region=parse_region(args.region),
            font_size=args.font_size,
            text_color=parse_color(args.text_color),
            shadow_color=parse_color(args.shadow_color),
            color_scheme=args.color_scheme,
            line_spacing=args.line_spacing,
            margin=args.margin,
            align=args.align,
            valign=args.valign,
            auto_shrink=args.auto_shrink
        )
    except Exception as e:
        print(f"❌ 错误: {e}")
        exit(1)

if __name__ == "__main__":
    main()