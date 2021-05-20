package com.pbz.scriptengine;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

public class AppUtil {

	public static List<File> getPluginFiles() {
		List<File> plugins = new ArrayList<>();
		File dir = new File("./plugin");
		if (!dir.exists()) {
			dir = new File("../plugin");
		}
		File[] dirFiles = dir.listFiles();
		for (File file : dirFiles) {
			if (file.isFile() && file.getAbsolutePath().endsWith(".js")) {
				plugins.add(file);
			}
		}
		return plugins;
	}

	public static String downloadFileIfNeed(String file) {
		String fileName = file;
		if (fileName.contains("/")) {
			fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
		}
		String saveFile = System.getProperty("user.dir") + "/" + fileName;
		if (!new File(saveFile).exists()) {
			long begintime = System.currentTimeMillis();
			System.out.println("Downloading file: " + file);
			downloadFile(file, saveFile);
			long endtime = System.currentTimeMillis();
			System.out.println("Download file Time:" + (endtime - begintime));
		}
		return fileName;
	}

	public static String downloadFile(String fileUrl) throws Exception {
		if (!fileUrl.startsWith("http")) {
			throw new Exception("The file url is not correct!");
		}
		String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
		String savedFilePath = System.getProperty("user.dir") + "/" + fileName;
		if (new File(savedFilePath).exists()) {
			savedFilePath = System.getProperty("user.dir") + "/" + fileName + ".bak";
		}
		long begintime = System.currentTimeMillis();
		System.out.println("downloading file: " + fileUrl);
		downloadFile(fileUrl, savedFilePath);
		long endtime = System.currentTimeMillis();
		System.out.println("download file time:" + (endtime - begintime));

		return new File(savedFilePath).getName();
	}

	public static void downloadFile(String url, String saveFilePath) {
		try {
			URL fileUrl = new URL(url);
			InputStream is = fileUrl.openStream();
			OutputStream os = new FileOutputStream(saveFilePath);
			byte bf[] = new byte[1024];
			int length = 0;
			while ((length = is.read(bf, 0, 1024)) != -1) {
				os.write(bf, 0, length);
			}
			is.close();
			os.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	/**
	 * 裁剪图片
	 *
	 * @param sourceFile   源文件
	 * @param targetFile   裁剪后的文件
	 * @param outputWidth  裁剪宽度
	 * @param outputHeight 裁剪高度
	 * @param isProportion 是否是等比缩放
	 */
	public static void resizeImage(File sourceFile, File targetFile, int outputWidth, int outputHeight,
			boolean isProportion) {
		try {
			BufferedImage bi2 = ImageIO.read(sourceFile);
			int newWidth, newHeight;
			if (isProportion) {
				double rate1 = ((double) bi2.getWidth(null)) / (double) outputWidth + 0.1;
				double rate2 = ((double) bi2.getHeight(null)) / (double) outputHeight + 0.1;
				double rate = rate1 < rate2 ? rate1 : rate2;
				newWidth = (int) (((double) bi2.getWidth(null)) / rate);
				newHeight = (int) (((double) bi2.getHeight(null)) / rate);
			} else {
				newWidth = outputWidth;
				newHeight = outputHeight;
			}
			BufferedImage to = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
			Graphics2D g2d = to.createGraphics();
			to = g2d.getDeviceConfiguration().createCompatibleImage(newWidth, newHeight, Transparency.TRANSLUCENT);
			g2d.dispose();
			g2d = to.createGraphics();
			@SuppressWarnings("static-access")
			Image from = bi2.getScaledInstance(newWidth, newHeight, bi2.SCALE_AREA_AVERAGING);
			g2d.drawImage(from, 0, 0, null);
			g2d.dispose();
			ImageIO.write(to, "png", targetFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static boolean convertImageToAlpha(File file, String Path) {
		try {
			BufferedImage bi = ImageIO.read(new FileInputStream(file));
			ImageIcon imageIcon = new ImageIcon(bi);
			BufferedImage bufferedImage = new BufferedImage(imageIcon.getIconWidth(), imageIcon.getIconHeight(),
					BufferedImage.TYPE_4BYTE_ABGR);
			Graphics2D g2D = (Graphics2D) bufferedImage.getGraphics();
			g2D.drawImage(imageIcon.getImage(), 0, 0, imageIcon.getImageObserver());
			int alpha = 0;
			for (int j1 = bufferedImage.getMinY(); j1 < bufferedImage.getHeight(); j1++) {
				for (int j2 = bufferedImage.getMinX(); j2 < bufferedImage.getWidth(); j2++) {
					int rgb = bufferedImage.getRGB(j2, j1);
					int R = (rgb & 0xff0000) >> 16;
					int G = (rgb & 0xff00) >> 8;
					int B = (rgb & 0xff);
					if (((255 - R) < 30) && ((255 - G) < 30) && ((255 - B) < 30)) {
						rgb = ((alpha + 1) << 24) | (rgb & 0x00ffffff);
					}
					bufferedImage.setRGB(j2, j1, rgb);
				}
			}
			g2D.drawImage(bufferedImage, 0, 0, imageIcon.getImageObserver());
			ImageIO.write(bufferedImage, "png", new File(Path));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public static String convertRgbStr(int color) {
		int red = (color & 0xff0000) >> 16;// 获取R
		int green = (color & 0x00ff00) >> 8;// 获取G
		int blue = (color & 0x0000ff);// 获取B
		return red + "," + green + "," + blue;
	}

	public static void convertToTransparencyImage(BufferedImage image) {
		int alpha = 255;
		String removeRgb = "";
		for (int y = image.getMinY(); y < image.getHeight(); y++) {
			for (int x = image.getMinX(); x < image.getWidth(); x++) {
				int rgb = image.getRGB(x, y);
				// 取图片边缘颜色作为对比对象
				if (y == image.getMinY() && x == image.getMinX()) {
					removeRgb = convertRgbStr(rgb);
				}
				// 设置为透明背景
				if (removeRgb.equals(convertRgbStr(rgb))) {
					alpha = 0;
				} else {
					alpha = 255;
				}
				rgb = (alpha << 24) | (rgb & 0x00ffffff);
				image.setRGB(x, y, rgb);
			}
		}
	}

}
