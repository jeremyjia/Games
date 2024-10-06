package com.pbz.demo.hello.service;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.model.SubtitleModel;
import com.pbz.demo.hello.util.FileUtil;

@Component
@Service
public class SubtitleImageService {
	private final static int oneSecond = 1000;
	private final static int oneMinute = 60 * oneSecond;
	private final static int oneHour = 60 * oneMinute;
	private final static Font font = new Font("微软雅黑", Font.BOLD, 30);
	private final static Color colorBackground = new Color(0xDCDCDC);
	private final static String regexExpressofSRT = "\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d --> \\d\\d:\\d\\d:\\d\\d,\\d\\d\\d";
	private final static String regexExpressofLRC = "\\[(\\d{1,2}):(\\d{1,2}).(\\d{1,3})\\]";  //d{1,3}匹配1到三位

	public int saveSubtitleToImageFile(String filePath, int width, int height, String strImgFile) throws IOException {
		List<SubtitleModel> ls = readLocalFile(filePath);
		if (ls != null) {
			ls.forEach(e -> System.out.println(e.toString()));
		} else {
			return 0;
		}

		String strTitle = "";
		if (filePath.endsWith(".lrc")) {
			strTitle = getTitleFromLRCFile(filePath);
		}
		int index = 0;
		for (int i = 0; i < ls.size(); i++) {
			SubtitleModel info = ls.get(i);
			String strSubtitle = info.contextEng;
			int nSecondsOfSubtitle = (info.end - info.star) / 1000;
			if ((info.end - info.star) % 1000 > 500) {
				nSecondsOfSubtitle++;
			}
			int red = (int) (Math.random() * 255);
			int green = (int) (Math.random() * 255);
			int blue = (int) (Math.random() * 255);

			Image bgImg = null;
			if (strImgFile != null && strImgFile.length() > 0) {
				String srcImageFile = strImgFile;
				srcImageFile = FileUtil.downloadFileIfNeed(srcImageFile);
				File imgfile = new File(srcImageFile);
				if (imgfile.exists()) {
					bgImg = ImageIO.read(imgfile);
				}
			}

			for (int j = 0; j < nSecondsOfSubtitle; j++) {
				String destImageFile = System.getProperty("user.dir") + "/" + Integer.toString(index + 1) + ".jpg";
				BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
				Graphics2D g = image.createGraphics();

				g.setColor(colorBackground);
				g.fillRect(0, 0, width, height);
				if (bgImg != null) {
					g.drawImage(bgImg, width / 4, (height / 4) + 20, width / 2, height / 2, null);
				}
				if (strTitle.trim().length() > 0) {
					g.setColor(new Color(255, 69, 0));
					g.setFont(new Font("黑体", Font.BOLD, 50));
					int y = 120;
					for (String line : strTitle.split("\\\\n")) {
						g.drawString(line, 50, y);
						y += g.getFontMetrics().getHeight();
					}
				}
				g.setColor(new Color(red, green, blue));
				g.setFont(font);
				g.drawString(strSubtitle, 20, height - 100); // 绘制文本

				g.setColor(new Color(65, 105, 225));
				g.drawString(Integer.toString(index + 1), 10, 50); // 绘制帧号
				g.dispose();
				ImageIO.write((BufferedImage) image, "JPEG", new File(destImageFile));
				index++;
			}
		}
		return index;
	}

	public List<SubtitleModel> readLocalFile(String subtitleFile) {
		if (subtitleFile.toLowerCase().endsWith(".srt")) {
			return readSRTFile(subtitleFile);
		} else if (subtitleFile.toLowerCase().endsWith(".lrc")) {
			return readLRCFile(subtitleFile);
		}
		return null;
	}

	private List<SubtitleModel> readSRTFile(String subtitleFile) {
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
				if (Pattern.matches(regexExpressofSRT, line)) {
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

	private static List<SubtitleModel> readLRCFile(String filePath) {
		List<SubtitleModel> subtitleList = new ArrayList<SubtitleModel>();
		try {
			File file = new File(filePath);
			if (!file.isFile() || !file.exists()) {
				System.out.println("Can't find the file: " + filePath);
				return null;
			}
			InputStreamReader read = new InputStreamReader(new FileInputStream(file), "UTF-8");//GBK导致中文歌词乱码，改用UTF-8
			BufferedReader bufferedReader = new BufferedReader(read);
			Pattern pattern = Pattern.compile(regexExpressofLRC);
			String lineStr = null;
			SubtitleModel lastObj = null;
			while ((lineStr = bufferedReader.readLine()) != null) {
				Matcher matcher = pattern.matcher(lineStr);
                if (matcher.find()) {
                    // [01:20.76]He said such vehicles are expected
                    String min = matcher.group(1);
                    String sec = matcher.group(2);
                    String mill = matcher.group(3);
                    long time = getLongTime(min, sec, mill + "0");
                    if (mill.length() == 3)
                        time = getLongTime(min, sec, mill); // [01:22.220]年轻时为你写的歌恐怕你早已忘了吧
                    String text = lineStr.substring(matcher.end());
                    SubtitleModel curObj = new SubtitleModel();
                    curObj.star = (int) time;
                    curObj.contextEng = text;
                    curObj.contextCh = text;
                    curObj.num = subtitleList.size() + 1;
                    subtitleList.add(curObj);
                    if (lastObj != null) {
                        lastObj.end = (int) time;
                        
                        lastObj.nextText = text;
                        curObj.lastText = lastObj.contextCh;
                    }
                    lastObj = curObj;
                }else {
				    System.out.println("Not match time format:"+lineStr);
				}
			}
			if (lastObj != null) {
				lastObj.end = lastObj.star + 2000; // 最后一个显示2秒
			}
			read.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return subtitleList;
	}

	public String getTitleFromLRCFile(String filePath) {
		String lrc = FileUtil.readAllBytes(filePath);
		String text = getCenterText("[ti:", "]", lrc);
		text = FileUtil.addLinefeeds(text, 25);
		return text;
	}

	private static String getCenterText(String start, String end, String s) {
		if (start.isEmpty() || end.isEmpty() || s.isEmpty()) {
			return "";
		}
		int i = s.indexOf(start);
		int i1 = s.indexOf(end, i);
		if (i == -1 || i1 == -1)
			return "";
		String s1 = s.substring(i + start.length(), i1);
		return s1;
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

	private static long getLongTime(String min, String sec, String mill) {
		int m = Integer.parseInt(min);
		int s = Integer.parseInt(sec);
		int ms = Integer.parseInt(mill);
		long time = m * 60 * 1000 + s * 1000 + ms;
		return time;
	}
}
