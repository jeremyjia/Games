package com.pbz.demo.hello.util;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.awt.image.CropImageFilter;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;

public class ImageUtil {

	public final static BufferedImage cutImage(BufferedImage sourceImage, int x, int y, int width, int height) {
		try {
			int srcWidth = sourceImage.getWidth();
			int srcHeight = sourceImage.getHeight();
			if (srcWidth > 0 && srcHeight > 0) {
				Image image = sourceImage.getScaledInstance(srcWidth, srcHeight, Image.SCALE_SMOOTH);
				ImageFilter cropFilter = new CropImageFilter(x, y, width, height);
				Image img = Toolkit.getDefaultToolkit()
						.createImage(new FilteredImageSource(image.getSource(), cropFilter));
				BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
				Graphics g = tag.getGraphics();
				g.drawImage(img, 0, 0, width, height, null);
				g.dispose();
				return tag;

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sourceImage;
	}

	public final static BufferedImage scaleImage(BufferedImage src, int width, int height) {
		Image image = src.getScaledInstance(width, height, Image.SCALE_SMOOTH);
		BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics g = tag.getGraphics();
		g.drawImage(image, 0, 0, null);
		g.dispose();
		return tag;
	}

	public static Color applayColor(String fillStyle) {
		if (fillStyle != null && fillStyle.trim().length() > 0) {
			if (fillStyle.startsWith("#")) {
				int color = Integer.parseInt(fillStyle.substring(1), 16);
				return new Color(color);
			}

			String[] colors = fillStyle.split(",");
			if (colors.length == 3) {
				int red = Integer.parseInt(colors[0]);
				int green = Integer.parseInt(colors[1]);
				int blue = Integer.parseInt(colors[2]);
				return new Color(red, green, blue);
			}

			if ("blue".equalsIgnoreCase(fillStyle)) {
				return new Color(0, 0, 255);
			} else if ("red".equalsIgnoreCase(fillStyle)) {
				return new Color(255, 0, 0);
			} else if ("yellow".equalsIgnoreCase(fillStyle)) {
				return new Color(255, 255, 0);
			} else if ("green".equalsIgnoreCase(fillStyle)) {
				return new Color(0, 255, 0);
			} else if ("white".equalsIgnoreCase(fillStyle)) {
				return new Color(255, 255, 255);
			} else if ("black".equalsIgnoreCase(fillStyle)) {
				return new Color(0, 0, 0);
			} else if ("lightblue".equalsIgnoreCase(fillStyle)) {
				return new Color(193, 210, 240);
			} else if ("skyblue".equalsIgnoreCase(fillStyle)) {
				return new Color(135,206,235);
			}
		}
		return new Color(200, 200, 200);
	}
	
    public static String convertToColorCode(Color color) {
        int r = color.getRed();
        int g = color.getGreen();
        int b = color.getBlue();
        return convertToColorCode(r, g, b);
    }

    public static String convertToColorCode(int red, int green, int blue) {
        String redHex = Integer.toHexString(red);
        String greenHex = Integer.toHexString(green);
        String blueHex = Integer.toHexString(blue);
        if (redHex.length() < 2) {
            redHex = "0" + redHex;
        }
        if (greenHex.length() < 2) {
            greenHex = "0" + greenHex;
        }
        if (blueHex.length() < 2) {
            blueHex = "0" + blueHex;
        }
        return redHex + greenHex + blueHex;
    }
    
    public static BufferedImage rotateImage(BufferedImage originalImage, double angle) {
        // 计算旋转后的图片大小
        double radians = Math.toRadians(angle);
        double sin = Math.abs(Math.sin(radians));
        double cos = Math.abs(Math.cos(radians));
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int newWidth = (int) Math.floor(width * cos + height * sin);
        int newHeight = (int) Math.floor(height * cos + width * sin);
        if(newWidth == 0 || newHeight==0) {
            return originalImage; //Error: Width (0) and height (0) must be > 0
        }
        // 创建一个新的图片缓冲区
        BufferedImage rotatedImage = new BufferedImage(newWidth, newHeight, originalImage.getType());
        Graphics2D graphics2D = rotatedImage.createGraphics();
        // 应用旋转
        AffineTransform at = new AffineTransform();
        at.rotate(radians, newWidth / 2, newHeight / 2);
        graphics2D.drawRenderedImage(originalImage, at);

        return rotatedImage;
    }

}
