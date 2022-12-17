package com.pbz.demo.hello.util;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.FileUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.pbz.demo.hello.model.AOIArea;
import com.pbz.demo.hello.model.AudioParam;
import com.pbz.demo.hello.model.SubtitleModel;
import com.pbz.demo.hello.service.SubtitleImageService;
import com.pbz.demo.hello.service.VOAService;
import com.pbz.demo.hello.util.engine.JSGraphEngine;

public final class JsonSriptParser {
	private static final String subtitle_video_name = "vSubtitle.mp4";
	private static final boolean isWindows = System.getProperty("os.name").startsWith("Windows");

	private static List<Map<String, Object>> supperObjectsMapList = new ArrayList<Map<String, Object>>();
	private static Map<Integer, AOIArea> aoiMap = new HashMap<>();
	private static List<AudioParam> audioList = new ArrayList<>();
	private static VOAService service = new VOAService();

	private static ScriptEngineManager mgr = new ScriptEngineManager();
	private static ScriptEngine engine = mgr.getEngineByName("JavaScript");
	private static JSGraphEngine graphEngine = new JSGraphEngine();
	private static final String currentScript = "VAR_CURRENT_SCRIPT";
	public static final String current_Subtitle_Script = "VAR_CURRENT_SUBTITLE_SCRIPT";

	private static SubtitleImageService subtitleImageService = new SubtitleImageService();
	public static List<SubtitleModel> subtitleList = null;
	private static String titleOfLRC = "";
	private static String VAR_TIME = "VAR_TIME";// s
	private static String VAR_FRAMES = "VAR_FRAMES";
	private static String VAR_RATE = "VAR_RATE";

	public static void setMacros(String scriptFilePath) throws Exception {
		String jsonString = getJsonString(scriptFilePath);
		JSONObject jsonObj = new JSONObject(jsonString);
		JSONObject requestObj = getJsonObjectbyName(jsonObj, "request");
		String audioFilePath = requestObj.optString("audio");
		if (audioFilePath == null || audioFilePath.trim().length() == 0) {
			audioFilePath = requestObj.optString("music");
		}
		String rate = requestObj.getString("rate");
		// Resolve all macros
		Iterator<String> keys = requestObj.keys();
		while (keys.hasNext()) {
			String key = keys.next();
			if (key.equalsIgnoreCase("Macros")) {
				JSONArray macrosArray = (JSONArray) requestObj.get(key);
				for (Object object : macrosArray) {
					if (!(object instanceof JSONObject)) {
						continue;
					}
					JSONObject macroObj = (JSONObject) object;
					String varName = macroObj.optString("name");
					String varValue = "";
					Object obj = macroObj.get("value");
					if (obj instanceof JSONObject) {
						varValue = parseVariableValue(obj);
					} else {
						varValue = (String) obj;
					}
					MacroResolver.setProperty(varName, varValue);
				}
			}
		}
		// SetTime of video
		audioFilePath = MacroResolver.resolve(audioFilePath);
		String audioFile = FileUtil.downloadFileIfNeed(audioFilePath);
		String saveFile = System.getProperty("user.dir") + "/" + audioFile;
		String audioTime = FileUtil.getAudioDuration(saveFile);
		System.out.println("Audio file " + saveFile + " seconds:" + audioTime);
		MacroResolver.setProperty(VAR_TIME, audioTime);
		MacroResolver.setProperty(VAR_RATE, rate);
		int s = Integer.parseInt(audioTime);
		int r = Integer.parseInt(rate);
		int frames = s * r;
		MacroResolver.setProperty(VAR_FRAMES, String.valueOf(frames));

	}

	private static String parseVariableValue(Object obj) throws Exception {
		String strValue = "";
		JSONObject valObj = (JSONObject) obj;
		String type = valObj.optString("type");

		if ("python".equalsIgnoreCase(type)) {
			JSONObject attrObj = valObj.getJSONObject("attribute");
			String script = attrObj.getString("script");
			String inputFile = attrObj.getString("input");
			String outputFile = attrObj.getString("output");
			String opts = attrObj.optString("opts");
			script = FileUtil.downloadFileIfNeed(script);
			inputFile = FileUtil.downloadFileIfNeed(inputFile);
			List<String> cmds = new ArrayList<String>();
			if (isWindows) {
				cmds.add("python");
			} else {
				cmds.add("python3");
			}
			cmds.add(script);
			cmds.add("-i");
			cmds.add(inputFile);
			cmds.add("-o");
			cmds.add(outputFile);

			if (opts != null && opts.trim().length() != 0) {
				String[] parameters = opts.split("\\s+");
				for (String opt : parameters) {
					cmds.add(opt);
				}
			}
			String[] commands = cmds.toArray(new String[] {});
			ExecuteCommand.executeCommandOnServer(commands);
			strValue = outputFile;
		} else if ("svg".equalsIgnoreCase(type)) {

			JSONObject attrObj = valObj.getJSONObject("attribute");
			String inputFile = attrObj.getString("input");
			String outputFile = attrObj.getString("output");
			inputFile = FileUtil.downloadFileIfNeed(inputFile);

			TranscoderInput input_svg_image = new TranscoderInput(inputFile);
			OutputStream png_ostream = new FileOutputStream(System.getProperty("user.dir") + "/" + outputFile);
			TranscoderOutput output_png_image = new TranscoderOutput(png_ostream);
			PNGTranscoder my_converter = new PNGTranscoder();
			my_converter.transcode(input_svg_image, output_png_image);
			png_ostream.flush();
			png_ostream.close();
			strValue = outputFile;

		} else {
			// Parse the text from web link
			String href = valObj.getString("href");
			String rule = valObj.getString("rule");
			String number = valObj.getString("number");
			String charset = valObj.getString("charset");
			System.out.println("Get text from url: " + href);
			strValue = service.getText(href, rule, charset, Integer.valueOf(number));
		}
		return strValue;
	}

	public static boolean generateVideoByScriptFile(String scriptFilePath) throws Exception {
		String jsonString = getJsonString(scriptFilePath);
		return generateVideo(jsonString);
	}

	private static boolean generateVideo(String jsonString) throws Exception {
		JSONObject jsonObj = new JSONObject(jsonString);
		JSONObject requestObj = getJsonObjectbyName(jsonObj, "request");
		supperObjectsMapList.clear();
		aoiMap.clear();
		audioList.clear();
		MacroResolver.setProperty(currentScript, "");
		MacroResolver.setProperty(current_Subtitle_Script, "");
		MacroResolver.setProperty("VAR_BGAUDIO", "");
		titleOfLRC = "";

		initMap(requestObj);
		String version = requestObj.getString("version");
		System.out.println("剧本版本:" + version);
		int width = requestObj.getInt("width");
		int height = requestObj.getInt("height");
		String audioFilePath = requestObj.optString("audio");
		if (audioFilePath == null || audioFilePath.trim().length() == 0) {
			audioFilePath = requestObj.optString("music");
		}
		String videoFilePath = requestObj.optString("video");
		String rate = requestObj.getString("rate");
		MacroResolver.setProperty(VAR_RATE, rate);
		String time = requestObj.optString("time");
		String bgColor = requestObj.optString("backgroundColor");

		int index = 0;
		extractInfoFromVideo(videoFilePath, rate);

		Iterator<String> keys = requestObj.keys();
		while (keys.hasNext()) {
			String key = keys.next();
			if (key.equalsIgnoreCase("frames")) {
				JSONArray frameArray = (JSONArray) requestObj.get(key);
				for (Object frame : frameArray) {
					if (!(frame instanceof JSONObject)) {
						continue;
					}
					JSONObject frameObj = (JSONObject) frame;
					String strTime = frameObj.optString("time");
					int times = Integer.parseInt(strTime);

					Color colorBackground = null;
					if (frameObj.has("backgroundColor")) {
						String color = frameObj.getString("backgroundColor");
						colorBackground = getColor(color);
					}
					Image bgImg = null;
					if (frameObj.has("backgroundPicture")) {
						String srcImageFile = frameObj.getString("backgroundPicture");
						srcImageFile = FileUtil.downloadFileIfNeed(srcImageFile);
						File img = new File(srcImageFile);
						if (img.exists()) {
							bgImg = ImageIO.read(img);
						} else {
							System.out.println("WARNING: The file " + img.getName() + " doesn't exist!");
						}
					}
					for (int j = 0; j < times; j++) {
						String destImageFile = System.getProperty("user.dir") + "/" + Integer.toString(index + 1)
								+ ".jpg";
						BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
						Graphics2D g = image.createGraphics();
						if (colorBackground != null) {
							g.setColor(colorBackground);
							g.fillRect(0, 0, width, height);
							g.setBackground(colorBackground);
						}
						if (bgImg != null) {
							g.drawImage(bgImg, 0, 0, width, height, null);
						}

						String jpegFile = System.getProperty("user.dir") + "/" + Integer.toString(index + 1) + ".jpeg";
						File file = new File(jpegFile);
						if (file.exists()) {
							Image videoImage = ImageIO.read(file);
							g.drawImage(videoImage, 0, 0, width, height, null);
						}

						JSONArray objectArray = frameObj.getJSONArray("objects");
						List<JSONObject> objs = getSuperObjectsByframeNumber(index + 1);

						List<JSONObject> allSortedObjects = new ArrayList<>();
						for (Object object : objectArray) {
							allSortedObjects.add((JSONObject) object);
						}
						allSortedObjects.addAll(objs);
						allSortedObjects.sort(new Comparator<JSONObject>() {
							@Override
							public int compare(JSONObject o1, JSONObject o2) {
								int x = 0;
								int y = 0;
								if (o1.has("layer")) {
									x = o1.getInt("layer");
								}
								if (o2.has("layer")) {
									y = o2.getInt("layer");
								}
								return x - y;
							}
						});
						// Draw all objects
						for (JSONObject obj : allSortedObjects) {
							if (obj.has("frameRange")) {
								drawSupperObjects(obj, g, index + 1);
							} else {
								drawOrdinaryObjects(obj, g);
							}
						}

						AOIArea area = aoiMap.get(index + 1);
						if (area != null) {
							BufferedImage cutImage = ImageUtil.cutImage(image, area.left, area.top, area.width,
									area.height);
							BufferedImage resultImage = ImageUtil.scaleImage(cutImage, width, height);
							Graphics grs = resultImage.getGraphics();
							grs.setColor(new Color(0, 191, 255));
							grs.setFont(new Font("黑体", Font.BOLD, 30));
							grs.drawString(Integer.toString(index + 1), width - 100, 50);// 显示帧号
							grs.dispose();
							ImageIO.write((BufferedImage) resultImage, "JPEG", new File(destImageFile));
						} else {
							g.setColor(new Color(0, 0, 255));// 帧号颜色
							g.setFont(new Font("黑体", Font.BOLD, 40));
							g.drawString(Integer.toString(index + 1), width - 100, 50);// 显示帧号
							ImageIO.write((BufferedImage) image, "JPEG", new File(destImageFile));
						}
						g.dispose();
						index++;
					}
				}
			}
		}

		if (index == 0) {
			createDefaultVideo(width, height, time, rate, bgColor);
		}
		String suffix = isWindows ? ".bat" : ".sh";
		String cmd = System.getProperty("user.dir") + "/" + "jpg2video" + suffix;
		String[] args = { Integer.toString(width), Integer.toString(height), rate };
		ExecuteCommand.executeCommand(cmd, args);
		String ffmpegPath = "ffmpeg";
		if (!isWindows) {
			ffmpegPath = "/usr/bin/ffmpeg";
			if (!new File(ffmpegPath).exists()) {
				ffmpegPath = "/usr/local/bin/ffmpeg";
			}
		}

		double dRate = Double.parseDouble(rate);
		long secondOfAudio = (long) ((double) index / dRate);
		if (secondOfAudio == 0) {
			secondOfAudio = Long.parseLong(time);
		}
		secondOfAudio += 2;
		combineAudios(ffmpegPath, secondOfAudio);

		String audioFile = MacroResolver.getProperty("VAR_BGAUDIO");
		if (audioFile != null && audioFile.trim().length() != 0) {
			audioFile = MacroResolver.getProperty("VAR_BGAUDIO");
		} else {
			audioFile = FileUtil.downloadFileIfNeed(audioFilePath);
		}

		boolean bRunScript = false;
		String final_video_name = MacroResolver.getProperty("video_name");
		if (!new File(audioFile).exists()) {
			if (index == 0) {
				File srcFile = new File(System.getProperty("user.dir") + "/" + subtitle_video_name);
				File destFile = new File(System.getProperty("user.dir") + "/" + final_video_name);
				FileUtils.copyFile(srcFile, destFile);
				return true;
			}
			throw new Exception("The audio file " + audioFile + " doesn't exist!");
		} else {
			String tmpAudioFile = "tmpAudio.mp3";
			String endTime = milliSecondToTime(secondOfAudio * 1000);
			// Cut the audio
			String[] cutAudioCmd = { ffmpegPath, "-y", "-i", audioFile, "-ss", "0:0:0", "-to", endTime, "-c", "copy",
					tmpAudioFile };
			ExecuteCommand.executeCommand(cutAudioCmd, null, new File("."), null);

			// Combine silent video and audio to a final video
			String[] cmds = { ffmpegPath, "-y", "-i", subtitle_video_name, "-i", tmpAudioFile, final_video_name };
			bRunScript = ExecuteCommand.executeCommand(cmds, null, new File("."), null);
		}

		boolean bGif = true; // TODO
		if (bGif) {
			String[] createGifCmd = { ffmpegPath, "-y", "-i", final_video_name, "vFinal.gif" };
			bRunScript = ExecuteCommand.executeCommand(createGifCmd, null, new File("."), null);
			MacroResolver.setProperty("VAR_GIF_ENABLED", "true");
		}
		return bRunScript;
	}

	private static void createDefaultVideo(int width, int height, String time, String rate, String bgColor)
			throws Exception {
		int t = Integer.parseInt(time);
		int r = Integer.parseInt(rate);
		Color colorBackground = getColor(bgColor);

		for (int i = 0; i < t * r; i++) {
			String destImageFile = System.getProperty("user.dir") + "/" + Integer.toString(i + 1) + ".jpg";
			BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			Graphics2D g = image.createGraphics();
			if (colorBackground != null) {
				g.setColor(colorBackground);
				g.fillRect(0, 0, width, height);
				g.setBackground(colorBackground);
			}

			String jpegFile = System.getProperty("user.dir") + "/" + Integer.toString(i + 1) + ".jpeg";
			File file = new File(jpegFile);
			if (file.exists()) {
				Image videoImage = ImageIO.read(file);
				g.drawImage(videoImage, 0, 0, width, height, null);
			}
			g.setColor(new Color(30, 80, 200));
			g.setFont(new Font("黑体", Font.BOLD, 40));
			g.drawString(Integer.toString(i + 1), width - 100, 50);// 显示帧号
			ImageIO.write((BufferedImage) image, "JPEG", new File(destImageFile));
			g.dispose();
		}

	}

	private static void combineAudios(String ffmpegPath, long secondsOfAudio) throws Exception {

		int audioSize = audioList.size();
		if (audioSize <= 0)
			return;

		String emptyMP3 = "tmpEmptyAduio.mp3";
		String[] createEmptyAudioCmd = { ffmpegPath, "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t",
				"0:0:0", "-t", String.valueOf(secondsOfAudio), "-q:a", "9", "-acodec", "libmp3lame", emptyMP3 };
		ExecuteCommand.executeCommand(createEmptyAudioCmd, null, new File("."), null);
		Thread.sleep(100);

		List<String> combineCmdlist = new ArrayList<String>();
		if (isWindows) {
			combineCmdlist.add(ffmpegPath);
		}
		combineCmdlist.add("-y");

		String tmpMusicMP3 = "tmpMusic.mp3";
		String dir = System.getProperty("user.dir") + "/";
		for (int i = 0; i < audioSize; i++) {
			AudioParam audioObj = audioList.get(i);
			String start = audioObj.start;
			String aduioFilePath = audioObj.audioFile;
			String aduioFile = FileUtil.downloadFileIfNeed(aduioFilePath);
			String tmpAudio = "tmp_" + Integer.toString(i + 1) + ".mp3";

			if (isWindows) {
				String[] insertAudioCmd = { ffmpegPath, "-y", "-i", emptyMP3, "-i", aduioFile, "-filter_complex",
						"\"aevalsrc=0:d= " + start + " [s1];[s1][1:a]concat=n=2:v=0:a=1[aout]\"", "-c:v", "copy",
						"-map", "0:v?", "-map", "[aout]", tmpAudio };
				ExecuteCommand.executeCommand(insertAudioCmd, null, new File("."), null);
				combineCmdlist.add("-i");
				combineCmdlist.add(tmpAudio);
			} else {
				String[] insertAudioCmd = { "-y", "-i", dir + emptyMP3, "-i", dir + aduioFile, "-filter_complex",
						"aevalsrc=0:d= " + start + " [s1];[s1][1:a]concat=n=2:v=0:a=1[aout]", "-c:v", "copy", "-map",
						"0:v?", "-map", "[aout]", dir + tmpAudio };
				ExecuteCommand.executeCommand(ffmpegPath, insertAudioCmd);
				combineCmdlist.add("-i");
				combineCmdlist.add(dir + tmpAudio);
			}
		}

		if (isWindows) {
			combineCmdlist.add("-filter_complex");
			combineCmdlist.add("\"amix=inputs=" + audioSize + ":duration=longest:dropout_transition=0, volume=2\"");
			combineCmdlist.add(tmpMusicMP3);
			String[] combineCmd = combineCmdlist.toArray(new String[combineCmdlist.size()]);
			ExecuteCommand.executeCommand(combineCmd, null, new File("."), null);
		} else {
			combineCmdlist.add("-filter_complex");
			combineCmdlist.add("amix=inputs=" + audioSize + ":duration=longest:dropout_transition=0, volume=2");
			combineCmdlist.add(dir + tmpMusicMP3);
			String[] combineCmd = combineCmdlist.toArray(new String[combineCmdlist.size()]);
			ExecuteCommand.executeCommand(ffmpegPath, combineCmd);
		}

		MacroResolver.setProperty("VAR_BGAUDIO", tmpMusicMP3);
	}

	private static void extractInfoFromVideo(String videoFilePath, String rate) throws Exception {
		if (videoFilePath == null || videoFilePath.trim().length() == 0) {
			return;
		}
		String ffmpegPath = "ffmpeg";
		if (!isWindows) {
			ffmpegPath = "/usr/bin/ffmpeg";
			if (!new File(ffmpegPath).exists()) {
				ffmpegPath = "/usr/local/bin/ffmpeg";
			}
		}

		String videoFile = FileUtil.downloadFileIfNeed(videoFilePath);
		if (!new File(videoFile).exists()) {
			throw new Exception("The video file " + videoFile + " doesn't exist!");
		}
		String[] extractPicturesCmd = { ffmpegPath, "-y", "-i", videoFile, "-r", rate, "-f", "image2", "%d.jpeg" };
		ExecuteCommand.executeCommand(extractPicturesCmd, null, new File("."), null);

		String extractMP3 = "extractAudio.mp3";
		String[] extractAudioCmd = { ffmpegPath, "-y", "-i", videoFile, extractMP3 };
		ExecuteCommand.executeCommand(extractAudioCmd, null, new File("."), null);
		MacroResolver.setProperty("VAR_BGAUDIO", extractMP3);
	}

	private static void drawOrdinaryObjects(JSONObject obj, Graphics2D g) throws IOException {
		// Picture
		if (obj.has("picture")) {
			String picFile = obj.getString("picture");
			picFile = FileUtil.downloadFileIfNeed(picFile);
			File imgFile = new File(picFile);
			if (imgFile.exists()) {
				Image img = ImageIO.read(imgFile);
				int left = obj.getInt("x");
				int top = obj.getInt("y");
				int w = obj.getInt("width");
				int h = obj.getInt("heigth");
				g.drawImage(img, left, top, w, h, null);
			} else {
				System.out.println("WARNING: The file " + imgFile.getName() + " doesn't exist!");
			}
		}
		// Text
		if (obj.has("text")) {
			String text = obj.getString("text");
			int x = obj.getInt("x");
			int y = obj.getInt("y");
			int size = obj.getInt("size");
			String c = obj.getString("color");
			Color color = getColor(c);
			System.out.println(text);
			g.setColor(color);
			Font font = new Font("黑体", Font.BOLD, size);
			g.setFont(font);
			float nY = y;
			for (String aLine : text.split("\n")) {
				g.drawString(aLine, x, nY);
				nY += g.getFontMetrics().getHeight();
			}
		}
		// Graphic
		if (obj.has("graphic")) {
			drawGraphic(obj, g);
		}
	}

	public static String getJsonString(String scriptFilePath) throws IOException {
		String jsonString = new String(Files.readAllBytes(new File(scriptFilePath).toPath()));
		// Fix input JSON string
		int s = jsonString.indexOf("{");
		if (s > 0) {
			jsonString = jsonString.substring(s);
			int e = jsonString.lastIndexOf("}");
			jsonString = jsonString.substring(s - 1, e + 1);
			jsonString = jsonString.replaceAll("\\\\", "");
			System.out.println("Fix for this input JSON string");
		}
		return jsonString;
	}

	private static void initMap(JSONObject requestObj) {
		Iterator<String> keys = requestObj.keys();
		while (keys.hasNext()) {
			String key = keys.next();
			if (key.equalsIgnoreCase("superObjects")) {
				JSONArray objectsArray = (JSONArray) requestObj.get(key);
				for (Object object : objectsArray) {
					if (!(object instanceof JSONObject)) {
						continue;
					}
					JSONObject superObj = (JSONObject) object;
					supperObjectsMapList.add(superObj.toMap());
				}
			} else if (key.equalsIgnoreCase("aois")) {
				JSONArray aoiArray = (JSONArray) requestObj.get(key);
				for (Object aoi : aoiArray) {
					if (!(aoi instanceof JSONObject)) {
						continue;
					}
					JSONObject aoiObj = (JSONObject) aoi;
					String rangeValue = aoiObj.getString("range");
					String rangeArray[] = rangeValue.split(",");
					String s = rangeArray[0].substring(1);
					String e = rangeArray[1].substring(0, rangeArray[1].length() - 1);
					int nStart = Integer.parseInt(s);
					int nEnd = Integer.parseInt(e);
					JSONObject areaObj = aoiObj.getJSONObject("area");
					int x1 = areaObj.getInt("left");
					int y1 = areaObj.getInt("top");
					int x2 = areaObj.getInt("width");
					int y2 = areaObj.getInt("height");
					for (int i = nStart; i <= nEnd; i++) {
						AOIArea area = new AOIArea(x1, y1, x2, y2);
						aoiMap.put(i, area);
					}
				}
			} else if (key.equalsIgnoreCase("audioObjects")) {
				JSONArray audioArray = (JSONArray) requestObj.get(key);
				for (Object audio : audioArray) {
					if (!(audio instanceof JSONObject)) {
						continue;
					}
					JSONObject audioObj = (JSONObject) audio;
					String startTime = audioObj.getString("start");
					String audioFile = audioObj.getString("audioFile");
					AudioParam audioParam = new AudioParam(startTime, audioFile);
					audioList.add(audioParam);
				}
			}
		}
	}

	private static List<JSONObject> getSuperObjectsByframeNumber(int num) {
		List<JSONObject> superObjects = new ArrayList<JSONObject>();
		for (Map<String, Object> map : supperObjectsMapList) {
			JSONObject jsonObj = new JSONObject(map);
			String rangeValue = jsonObj.getString("frameRange");
			String rangeArray[] = rangeValue.split(",");
			String s = rangeArray[0].substring(1);
			String e = rangeArray[1].substring(0, rangeArray[1].length() - 1);
			int sf = Integer.parseInt(s);
			int ef = Integer.parseInt(e);
            System.out.println(sf + "," + ef);
            int nFactor = 1;
            if (jsonObj.has("unit")) {
                if (jsonObj.getInt("unit") == 1) {
                    String rate = MacroResolver.getProperty(VAR_RATE);
                    nFactor = Integer.parseInt(rate);
                }
            }
            if (num >= (sf * nFactor) && num <= (ef * nFactor)) {
                superObjects.add(jsonObj);
            }
		}
		return superObjects;
	}

	private static void drawSupperObjects(JSONObject jObj, Graphics2D gp2d, int number) throws Exception {
		String type = jObj.getString("type");
		if (type.equalsIgnoreCase("javascript")) {
			drawJavaScriptObject(jObj, gp2d, number);
			return;
		} else if (type.equalsIgnoreCase("subtitle")) {
			drawSubtitleObject(jObj, gp2d, number);
			return;
		}
		JSONObject attributeObj = jObj.getJSONObject("attribute");
		int x1 = attributeObj.getInt("x1");// 初始X1坐标
		int y1 = attributeObj.getInt("y1");
		int x2 = attributeObj.getInt("x2");
		int y2 = attributeObj.getInt("y2");

		String name = attributeObj.getString("name");
		float fSize = attributeObj.getFloat("size");

		if (attributeObj.has("color")) {
			String cr = attributeObj.getString("color");
			if (cr != null) {
				Color color = getColor(cr);
				gp2d.setColor(color);
			}
		}
		JSONObject areaObj = null;
		if (attributeObj.has("area")) {
			areaObj = attributeObj.getJSONObject("area");
		}
		JSONObject actionObj = jObj.getJSONObject("action");
		String actionTrace = actionObj.getString("trace"); // 目前只按照二次函数曲线来解析 Y=aX^2+bX+c Or X=100
		float step = actionObj.getFloat("step");

		String rangeValue = jObj.getString("frameRange");
		String rangeArray[] = rangeValue.split(",");
		String startFrameNumber = rangeArray[0].substring(1);
		int sfNum = Integer.parseInt(startFrameNumber);

		float X = 0, a = 0, b = 0, c = 0, Y = 0;
		if (actionTrace.toLowerCase().startsWith("x")) {
			String xValue = actionTrace.substring(2);
			X = Integer.parseInt(xValue);
			Y = y1 + (number - sfNum) * step;
		} else {
			X = x1 + (number - sfNum) * step;
			String parm[] = actionTrace.split("\\+");
			a = Float.parseFloat(parm[0].substring(2, parm[0].indexOf("*")));
			b = Float.parseFloat(parm[1].substring(0, parm[1].indexOf("*")));
			c = Float.parseFloat(parm[2]);
			Y = (float) (a * X * X + b * X + c);
		}

		if (name != null && !name.trim().isEmpty()) {
			if (!"text".equalsIgnoreCase(type) && !"picture".equalsIgnoreCase(type)) {
				gp2d.drawString(name, X, Y);
			}
		}

		if ("rayline".equalsIgnoreCase(type)) {
			if (attributeObj.has("size")) {
				BasicStroke bs = new BasicStroke(fSize, BasicStroke.CAP_ROUND, BasicStroke.JOIN_BEVEL);
				gp2d.setStroke(bs);
			}
			gp2d.drawLine((int) X, (int) Y, x2, y2);

		} else if ("line".equalsIgnoreCase(type)) {
			float XX = x2 + (number - sfNum) * step;
			float YY = (float) (a * XX * XX + b * XX + c + y2 - y1);
			if (attributeObj.has("size")) {
				BasicStroke bs = new BasicStroke(fSize, BasicStroke.CAP_ROUND, BasicStroke.JOIN_BEVEL);
				gp2d.setStroke(bs);
			}
			gp2d.drawLine((int) X, (int) Y, (int) XX, (int) YY);

		} else if ("circle".equalsIgnoreCase(type)) {
			gp2d.fillOval((int) X, (int) Y, x2, y2);
		} else if ("rect".equalsIgnoreCase(type)) {
			gp2d.fill3DRect((int) X, (int) Y, x2, y2, false);
		} else if ("text".equalsIgnoreCase(type)) {
			Font font = new Font("黑体", Font.BOLD, (int) fSize);
			gp2d.setFont(font);
			float nY = Y;
			int fontH = gp2d.getFontMetrics().getHeight();
			for (String aLine : name.split("\n")) {
				if (areaObj != null) {
					int l = areaObj.getInt("left");
					int t = areaObj.getInt("top");
					int w = areaObj.getInt("width");
					int h = areaObj.getInt("height");
					if (X > l && X < (l + w) && (nY - fontH) > t && nY < (t + h)) {
						gp2d.drawString(aLine, X, nY);
					}
				} else {
					gp2d.drawString(aLine, X, nY);
				}
				nY += fontH;
			}

		} else if ("picture".equalsIgnoreCase(type)) {
			String picFile = name;
			if (actionObj.has("loop")) {
				JSONArray loopArray = actionObj.getJSONArray("loop");
				int index = (number - sfNum) % loopArray.length();
				picFile = (String) loopArray.get(index);
			}
			picFile = FileUtil.downloadFileIfNeed(picFile);
			File imgFile = new File(picFile);
			if (imgFile.exists()) {
				Image img = null;
				try {
					img = ImageIO.read(imgFile);
				} catch (IOException e) {
					e.printStackTrace();
				}
				int w = x2;
				int h = y2;
				gp2d.drawImage(img, (int) X, (int) Y, w, h, null);
			} else {
				System.out.println("WARNING: The file " + imgFile.getName() + " doesn't exist!");
			}
		}
	}

	private static void drawSubtitleObject(JSONObject jObj, Graphics2D gp2d, int number) throws Exception {
		JSONObject attributeObj = jObj.getJSONObject("attribute");
		String subtitleFile = attributeObj.getString("script");
		boolean isReLoadScript = false;
		if (!subtitleFile.equalsIgnoreCase(MacroResolver.getProperty(current_Subtitle_Script))) {
			MacroResolver.setProperty(current_Subtitle_Script, subtitleFile);
			isReLoadScript = true;
		}
		subtitleFile = FileUtil.downloadFileIfNeed(subtitleFile);
		if (isReLoadScript) {
			subtitleList = subtitleImageService.readLocalFile(subtitleFile);
			if (subtitleList != null) {
				subtitleList.forEach(e -> System.out.println(e.toString()));
				if (subtitleFile.endsWith(".lrc")) {
					titleOfLRC = subtitleImageService.getTitleFromLRCFile(subtitleFile);
				}
			} else {
				throw new Exception("The subtitle file is not correct!");
			}
		}

		String strSubtitle = getSubTitleByFrame(subtitleList, number);
		if (attributeObj.has("replace")) {
			JSONArray objectArray = attributeObj.getJSONArray("replace");
			for (Object object : objectArray) {
				JSONObject replaceObj = (JSONObject) object;
				String regex = replaceObj.getString("regex");
				String target = replaceObj.getString("target");
				strSubtitle = FileUtil.ReplaceString(strSubtitle, regex, target);
			}
		}

		if (titleOfLRC.trim().length() > 0) {
			gp2d.setColor(new Color(255, 169, 0));
			gp2d.setFont(new Font("黑体", Font.BOLD, 50));
			int y = 120;
			for (String line : titleOfLRC.split("\\\\n")) {
				gp2d.drawString(line, 50, y);
				y += gp2d.getFontMetrics().getHeight();
			}
		}
		int x1 = attributeObj.getInt("x1");
		int y1 = attributeObj.getInt("y1");
		float fSize = attributeObj.getFloat("size");
		if (attributeObj.has("color")) {
			String cr = attributeObj.getString("color");
			if (cr != null) {
				Color color = getColor(cr);
				gp2d.setColor(color);
			}
		}
		Font font = new Font("黑体", Font.BOLD, (int) fSize);
		gp2d.setFont(font);
		gp2d.drawString(strSubtitle, x1, y1);
	}

	private static String getSubTitleByFrame(List<SubtitleModel> ls, int number) {
		String rate = MacroResolver.getProperty(VAR_RATE);
		int r = Integer.parseInt(rate);
		int s = number / r;

		for (SubtitleModel info : ls) {
			String strSubtitle = info.contextEng;
			if (s >= info.star / 1000 && s <= info.end / 1000) {
				return strSubtitle;
			}
		}
		return "";
	}

	private static void drawJavaScriptObject(JSONObject jObj, Graphics2D gp2d, int number) throws Exception {
		JSONObject attributeObj = jObj.getJSONObject("attribute");
		String striptFile = attributeObj.getString("script");
		boolean isReLoadScript = false;
		if (!striptFile.equalsIgnoreCase(MacroResolver.getProperty(currentScript))) {
			MacroResolver.setProperty(currentScript, striptFile);
			isReLoadScript = true;
		}
		striptFile = FileUtil.downloadFileIfNeed(striptFile);
		String functionName = attributeObj.getString("function");
		int start = attributeObj.getInt("start");
		graphEngine.setGraphics(gp2d);
		engine.put("document", graphEngine);

		if (isReLoadScript) {
			StringBuffer preDefined = new StringBuffer();
			preDefined.append("function Image() { return document.getImageObj()}");
			engine.eval(preDefined.toString());

			File f = new File(striptFile);
			Reader r = new InputStreamReader(new FileInputStream(f));
			engine.eval(r);
		}
		Invocable invoke = (Invocable) engine;
		invoke.invokeFunction(functionName, new Object[] { number - start });
	}

	private static void drawGraphic(JSONObject jObj, Graphics2D gp2d) {
		String graphicType = jObj.getString("graphic");
		JSONObject attrObj = jObj.getJSONObject("attribute");
		int left = attrObj.getInt("left");
		int top = attrObj.getInt("top");
		String c = attrObj.getString("color");
		Color color = getColor(c);
		if ("line".equalsIgnoreCase(graphicType)) {
			int right = attrObj.getInt("right");
			int bottom = attrObj.getInt("bottom");
			if (attrObj.has("size")) {
				float fSize = attrObj.getFloat("size");
				BasicStroke bs = new BasicStroke(fSize, BasicStroke.CAP_ROUND, BasicStroke.JOIN_BEVEL);
				gp2d.setStroke(bs);
			}
			gp2d.setColor(color);
			gp2d.drawLine(left, top, right, bottom);
		} else if ("circle".equalsIgnoreCase(graphicType)) {
			int width = 10;
			int height = 10;
			if (attrObj.has("width") && attrObj.has("height")) {
				width = attrObj.getInt("width");
				height = attrObj.getInt("height");
			} else {
				int right = attrObj.getInt("right");
				int bottom = attrObj.getInt("bottom");
				width = right - left;
				height = bottom - top;
			}
			gp2d.setColor(color);
			gp2d.fillOval(left, top, width, height);
		} else if ("rect".equalsIgnoreCase(graphicType)) {
			int width = 10;
			int height = 10;
			if (attrObj.has("width") && attrObj.has("height")) {
				width = attrObj.getInt("width");
				height = attrObj.getInt("height");
			} else {
				int right = attrObj.getInt("right");
				int bottom = attrObj.getInt("bottom");
				width = right - left;
				height = bottom - top;
			}
			gp2d.setColor(color);
			gp2d.fill3DRect(left, top, width, height, false);
		}
	}

	private static Color getColor(String color) {
		return ImageUtil.applayColor(color);
	}

	private static String milliSecondToTime(long millSecond) {
		long second = millSecond / 1000;
		second = second % 86400;
		long hours = second / 3600;
		second = second % 3600;
		long minutes = second / 60;
		second = second % 60;
		String s = String.format("%01d:%01d:%01d", hours, minutes, second);
		return s;
	}

	public static JSONObject getJsonObjectbyName(JSONObject jsonObj, String name) {
		if (jsonObj == null) {
			return null;
		}
		String[] names = JSONObject.getNames(jsonObj);
		if (names == null) {
			return null;
		}
		for (String s : names) {
			if (s.equalsIgnoreCase(name)) {
				return jsonObj.getJSONObject(s);
			}
		}
		return null;
	}

	public static void serverStatusConfig(boolean isLogin) {
		String serverConfigLink = "https://api.github.com/repos/jeremyjia/Games/issues/comments/1287654931"; // 827
		String resultString = NetAccessUtil.doGetOnGitHub(serverConfigLink, "");
		String jsonString = new JSONObject(resultString).getString("body");
		System.out.println(jsonString);

		JSONObject jsonObj = new JSONObject(jsonString);
		JSONArray serverArray = (JSONArray) jsonObj.get("servers");

		String hostName = FileUtil.getFQDN();
		String currentTime = FileUtil.getCurrentTime();
		boolean bRegistered = false;
		for (int i = 0; i < serverArray.length(); i++) {
			JSONObject jsonItem = new JSONObject(serverArray.get(i).toString());
			if (jsonItem.getString("name").equals(hostName)) {
				bRegistered = true;
				jsonItem.put("isLogin", isLogin);
				if (isLogin) {
					jsonItem.put("LastloginTime", currentTime);
				}
				serverArray.put(i, jsonItem);
				break;
			}
		}

		if (isLogin && !bRegistered) {
			JSONObject jsonNewItem = new JSONObject();
			jsonNewItem.put("name", hostName);
			jsonNewItem.put("isLogin", isLogin);
			jsonNewItem.put("LastloginTime", currentTime);
			serverArray.put(jsonNewItem);
		}

		String newJsonString = jsonObj.toString();
		newJsonString = StringEscapeUtils.escapeJson(newJsonString);
		System.out.println(newJsonString);
		NetAccessUtil.doPostOnGitHub(serverConfigLink, "POST", newJsonString);

	}

	public static void main(String[] args) {
		System.out.println("UTest begin");
		serverStatusConfig(true);
		System.out.println("UTest end");
	}

}
