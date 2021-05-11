package com.pbz.demo.hello.util;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
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

}
