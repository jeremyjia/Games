package com.pbz.demo.hello.service;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.model.SubtitleModel;

@Component
@Service
public class SubtitleImageService {
	private final static int oneSecond = 1000;
	private final static int oneMinute = 60 * oneSecond;
	private final static int oneHour = 60 * oneMinute;
	private final static Font font = new Font("微软雅黑", Font.BOLD, 20);
	private final static Color colorBackground = new Color(0xDCDCDC);
	private final static String equalStringExpress = "\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d --> \\d\\d:\\d\\d:\\d\\d,\\d\\d\\d";

	public int saveSubtitleToImageFile(String filePath, int width, int height) throws IOException {
		List<SubtitleModel> ls = readLocalFile(filePath);
		if (ls != null) {
			ls.forEach(e -> System.out.println(e.toString()));
		} else
			return 0;

		int index = 0;
		for (int i = 0; i < ls.size(); i++) {
			SubtitleModel info = ls.get(i);
			String strSubtitle = info.contextEng;
			int nSecondsOfSubtitle = (info.end - info.star) / 1000;
			int red = (int) (Math.random() * 255);
			int green = (int) (Math.random() * 255);
			int blue = (int) (Math.random() * 255);
			for (int j = 0; j < nSecondsOfSubtitle; j++) {
				String destImageFile = System.getProperty("user.dir") + "/" + Integer.toString(index + 1) + ".jpg";
				BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
				Graphics2D g = image.createGraphics();
				g.setColor(colorBackground);
				g.fillRect(0, 0, width, height);
				g.setColor(new Color(red, green, blue));
				g.setFont(font);
				g.drawString(strSubtitle, 50, height - 50);
				g.setColor(new Color(0, 0, 0));
				g.drawString(Integer.toString(index + 1), width / 2, height / 2);
				g.dispose();
				ImageIO.write((BufferedImage) image, "JPEG", new File(destImageFile));
				index++;
			}
		}
		return index;
	}

	private List<SubtitleModel> readLocalFile(String subtitleFile) {
		String line;
		FileInputStream is;
		File subtitlesFile = new File(subtitleFile);
		BufferedReader in = null;
		if (!subtitlesFile.exists() || !subtitlesFile.isFile()) {
			System.out.println(SubtitleImageService.class + ":Open subtitle file failed");
			return null;
		}
		List<SubtitleModel> subtitleList = new ArrayList<SubtitleModel>();
		try {
			is = new FileInputStream(subtitlesFile);
			in = new BufferedReader(new InputStreamReader(is, "UTF-8"));
			assert in != null;
			while ((line = in.readLine()) != null) {
				if (Pattern.matches(equalStringExpress, line)) {
					SubtitleModel sm = new SubtitleModel();
					sm.star = getTime(line.substring(0, 12));
					sm.end = getTime(line.substring(17, 29));
					sm.contextEng = in.readLine();
					sm.contextCh = in.readLine();
					sm.num = subtitleList.size() + 1;
					subtitleList.add(sm);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (subtitleList.size() > 0) {
			System.out.println(SubtitleImageService.class + ":Open subtitle file successfull");
			return subtitleList;
		}
		return null;
	}

	private static int getTime(String line) {
		try {
			return Integer.parseInt(line.substring(0, 2)) * oneHour + Integer.parseInt(line.substring(3, 5)) * oneMinute
					+ Integer.parseInt(line.substring(6, 8)) * oneSecond
					+ Integer.parseInt(line.substring(9, line.length()));
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
		return -1;
	}
}
