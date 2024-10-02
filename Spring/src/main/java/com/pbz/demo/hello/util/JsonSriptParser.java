package com.pbz.demo.hello.util;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.FileUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.apache.poi.xwpf.usermodel.UnderlinePatterns;
import org.json.JSONArray;
import org.json.JSONObject;

import com.deepoove.poi.data.FilePictureRenderData;
import com.deepoove.poi.data.HyperlinkTextRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.deepoove.poi.data.Texts;
import com.deepoove.poi.data.style.Style;
import com.pbz.demo.hello.model.AOIArea;
import com.pbz.demo.hello.model.AudioParam;
import com.pbz.demo.hello.model.ScriptEngineWrapper;
import com.pbz.demo.hello.model.SubtitleModel;
import com.pbz.demo.hello.service.SubtitleImageService;
import com.pbz.demo.hello.service.VOAService;
import com.pbz.demo.hello.util.engine.JSGraphEngine;
import com.pbz.demo.hello.util.music.MusicNote;

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
    
    private static Map<String, ScriptEngineWrapper> engineMap = new HashMap<>();
    private static MusicNote mNote = new MusicNote();
    private static Random random = new Random();
    private static final Color[] COLORS = {Color.RED, Color.GREEN, Color.BLUE, Color.MAGENTA, Color.ORANGE, Color.PINK, Color.CYAN, Color.YELLOW};
    private static final String currentScript = "VAR_CURRENT_SCRIPT";
    public static final String current_Subtitle_Script = "VAR_CURRENT_SUBTITLE_SCRIPT";
    public static HashMap<String, String> spriteScriptMap = new HashMap<>();  //防止精灵对象的脚本被重复加载
   
    private static SubtitleImageService subtitleImageService = new SubtitleImageService();
    public static List<SubtitleModel> subtitleList = null;
    private static String titleOfLRC = "";
    private static String VAR_TIME = "VAR_TIME";// s
    private static String VAR_FRAMES = "VAR_FRAMES";
    private static String VAR_RATE = "VAR_RATE";

    private static String VAR_CHESS_LOG_TEXT = "VAR_CHESS_LOG_TEXT";
    private static String VAR_CHESS_LOG_TEXT_FIXED = "VAR_CHESS_LOG_TEXT_FIXED";
    private static String VAR_CHESS_LOG_FRAME_NUMBER = "VAR_CHESS_LOG_FRAME_NUMBER";
    private static String VAR_CHESS_LOG_AUDIO_OBJECTS = "VAR_CHESS_LOG_AUDIO_OBJECTS";

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
                        filterSpecificVariable(varName, varValue, rate);
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

    private static String filterSpecificVariable(String varName, String varValue, String rate) {
        String filteredValue = varValue;

        if (VAR_CHESS_LOG_TEXT.equalsIgnoreCase(varName)) {
            filteredValue = FileUtil.getChessLog(varValue);
            System.out.println("filtered chesslog value:" + filteredValue);
            MacroResolver.setProperty(varName + "_FIXED", filteredValue);

            int nStep = filteredValue.split(" ").length; // 总共下了多少步棋
            int num = nStep * 10;
            MacroResolver.setProperty(VAR_CHESS_LOG_FRAME_NUMBER, Integer.toString(num));
            // Chess Audio objects
            String strChessAudio = getChessAudioObjString(rate);
            MacroResolver.setProperty(VAR_CHESS_LOG_AUDIO_OBJECTS, strChessAudio);
        }
        return filteredValue;
    }

    private static String getChessAudioObjString(String rate) {
        String strAudioObjects = "";
        String sChessLog = MacroResolver.getProperty(VAR_CHESS_LOG_TEXT_FIXED);
        if (sChessLog == null || sChessLog.trim().length() == 0) {
            return "{\"start\": \"5\", \"audioFile\": \"tts:bzll.mp3}";
        }
        int r = Integer.parseInt(rate);
        int interval = 10 / r;
        if (interval == 0) {
            interval = 25;
        }
        String chessLogAttr[] = sChessLog.split(" ");
        int iSt = 0;
        for (int i = 0; i < chessLogAttr.length; i++) {
            String sText = chessLogAttr[i].trim();
            String oAudio = "{\"start\": \"" + iSt + "\"," + "\"audioFile\": \"tts:" + sText + "\"}";
            oAudio = StringEscapeUtils.escapeJson(oAudio);
            strAudioObjects += oAudio + ",";
            iSt += interval;
        }
        strAudioObjects = strAudioObjects.substring(0, strAudioObjects.length() - 1);

        return strAudioObjects;
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
            if (!inputFile.startsWith("string-")) {
                inputFile = FileUtil.downloadFileIfNeed(inputFile); //string-代表输入参数为一个字符串，不是文件不需要下载
            }
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
            
            if (outputFile.endsWith(".txt")) {
                String filePath = System.getProperty("user.dir") + "/" + outputFile;
                strValue = FileUtil.readAllBytes(filePath);
                strValue = strValue.replace("\n", FileUtil.linedelimiter); // 替换文件的换行符，因为JSON中不能用换行，使用特殊的字符串代表换行，绘制的时候使用

            } else {
                strValue = outputFile;
            }
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
        engineMap.clear();
        MacroResolver.setProperty(currentScript, "");
        MacroResolver.setProperty(current_Subtitle_Script, "");
        MacroResolver.setProperty("VAR_BGAUDIO", "");
        spriteScriptMap.clear();
        titleOfLRC = "";

        initMap(requestObj);
        initJSEngineMap();
        String version = requestObj.getString("version");
        System.out.println("剧本版本:" + version);
        int width = requestObj.getInt("width");
        int height = requestObj.getInt("height");
        MacroResolver.setProperty("VIDEO_WIDTH", String.valueOf(width));
        MacroResolver.setProperty("VIDEO_HEIGHT", String.valueOf(height));
        
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

        //如果没有提供场景参数frames时index为0 ，此时生成默认的视频，只需要提供一些基本的参数，如视频宽，高，时间秒数，背景颜色等
        if (index == 0) {            
            if(time == null || time.trim().length() == 0) {
                time = "10";
                System.out.println("Warning: Not provide time attribute, will use the defult value 10 seconds.");
            }
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
            if (index == 0) {
                secondOfAudio = Long.parseLong(time);
            } else {
                throw new Exception("The rate " + dRate + " is large than the total frame times " + index);
            }
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
        boolean hasOverlayVideo = false;        
        if(requestObj.has("overlay")) {
            hasOverlayVideo = true;
        }
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

            String videoName = hasOverlayVideo? "TMP_"+final_video_name:final_video_name;
            // Combine silent video and audio to a final video
            String[] cmds = { ffmpegPath, "-y", "-i", subtitle_video_name, "-i", tmpAudioFile, videoName };
            bRunScript = ExecuteCommand.executeCommand(cmds, null, new File("."), null);
            
            //实现画中画效果
            if(requestObj.has("overlay")) {
                overlayVideo(requestObj.getJSONObject("overlay"), videoName, final_video_name);
            }                        
        }
        
        boolean bGif = true; // TODO
        if (bGif) {
            String[] createGifCmd = { ffmpegPath, "-y", "-i", final_video_name, "vFinal.gif" };
            bRunScript = ExecuteCommand.executeCommand(createGifCmd, null, new File("."), null);
            MacroResolver.setProperty("VAR_GIF_ENABLED", "true");
        }
        return bRunScript;
    }

    //画中画API
    private static void overlayVideo(JSONObject overlayObj, String sourceVideo, String outputVideo) throws Exception {
        //python3 overlayVideo.py -i source.mp4 -v ov.mp4 -s 3 -e 18 -o out.mp4     
        String script = overlayObj.getString("script"); //Python脚本     
        String inputFile = sourceVideo; //背景视频    
        String outputFile = outputVideo; //最终视频
        String ov = overlayObj.getString("video");; //要叠加的小视频       
        String left = overlayObj.getString("left");
        String top = overlayObj.getString("top");
        String start = overlayObj.getString("start");
        String end = overlayObj.getString("end");
        
        script = FileUtil.downloadFileIfNeed(script);
        List<String> cmds = new ArrayList<String>();
        if (isWindows) {
            cmds.add("python");
        } else {
            cmds.add("python3");
        }
        cmds.add(script);
        cmds.add("-i");
        cmds.add(inputFile);
        
        cmds.add("-v");
        cmds.add(ov);
        cmds.add("-s");
        cmds.add(start);
        cmds.add("-e");
        cmds.add(end);
        
        if(!left.equalsIgnoreCase("-1")) {
            cmds.add("-l");
            cmds.add(left);    
        }
        if(!top.equalsIgnoreCase("-1")) {
            cmds.add("-t");
            cmds.add(top);    
        }
        
        cmds.add("-o");
        cmds.add(outputFile);

        String[] commands = cmds.toArray(new String[] {});
        ExecuteCommand.executeCommandOnServer(commands);       
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

            // 获取所有的超级对象，排序并绘制
            List<JSONObject> superObjs = getSuperObjectsByframeNumber(i + 1);
            superObjs.sort(new Comparator<JSONObject>() {
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
            for (JSONObject obj : superObjs) {
                drawSupperObjects(obj, g, i + 1);
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
        } else if (obj.has("hyperlink")) {
            String text = obj.getString("hyperlink");
            int x = obj.getInt("x");
            int y = obj.getInt("y");
            int size = obj.getInt("size");
            String c = obj.getString("color");
            Color color = getColor(c);
            System.out.println(text);
            g.setColor(color);
            Font font = new Font("黑体", Font.BOLD, size);
            g.setFont(font);
            g.drawString(text, x, y);
            g.drawLine(x, y + 2, x + g.getFontMetrics(font).stringWidth(text), y + 2); // Underlined text
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
                        if (audio instanceof String) {
                            String s = audio.toString();
                            parseAudioSubObjects(s);
                            System.out.println("audioSubObjects:" + s);
                        }
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

    private static void parseAudioSubObjects(String s) {
        String updateString = "";
        try {
            updateString = URLEncoder.encode(s, "UTF-8");
            updateString = URLDecoder.decode(updateString, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = new JSONObject(updateString);
        JSONArray audioArray = (JSONArray) jsonObject.get("audioSubObjects");
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

    private static void initJSEngineMap() throws Exception {
        for (Map<String, Object> map : supperObjectsMapList) {
            JSONObject jsonObj = new JSONObject(map);
            String type = jsonObj.getString("type");
            if ("javascript".equalsIgnoreCase(type)) {

                JSONObject attributeObj = jsonObj.getJSONObject("attribute");
                String striptFile = attributeObj.getString("script");
                striptFile = FileUtil.downloadFileIfNeed(striptFile);

                // 每一个JS类型的超级对象拥有一个自己的脚本引擎包装器
                ScriptEngineWrapper scriptEgWrapperObj = new ScriptEngineWrapper();
                ScriptEngine scriptEngine = scriptEgWrapperObj.getEngine();
                scriptEngine.put("document", scriptEgWrapperObj.getGraphEngine());

                StringBuffer preDefined = new StringBuffer();
                preDefined.append("function Image() { return document.getImageObj()}");
                scriptEgWrapperObj.getEngine().eval(preDefined.toString());
                File f = new File(striptFile);
                Reader r = new InputStreamReader(new FileInputStream(f));
                scriptEgWrapperObj.getEngine().eval(r);

                // TODO
                if (attributeObj.has("chess")) {
                    String setChesslogFunName = attributeObj.getString("chess");
                    Invocable invoke = (Invocable) scriptEngine;
                    String filteredChessLog = MacroResolver.getProperty(VAR_CHESS_LOG_TEXT_FIXED);// "炮二平六 马8进7";
                    invoke.invokeFunction(setChesslogFunName, new Object[] { filteredChessLog });
                }

                // Initialize parameters for JS Plug-in
                setPlugInArgs(attributeObj, scriptEngine);

                engineMap.put(striptFile, scriptEgWrapperObj);
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

            // 进一步判断是否在要求的子集中
            List<Integer> numbers = getValidframeNumbers(jsonObj, sf, ef, nFactor);
            if (num >= (sf * nFactor) && num <= (ef * nFactor)) {
                if (numbers == null || numbers.size() == 0) {
                    superObjects.add(jsonObj);
                } else {
                    if (numbers.contains(num)) {
                        superObjects.add(jsonObj);
                    }
                }
            }
        }
        return superObjects;
    }

    private static List<Integer> getValidframeNumbers(JSONObject jsonObj, int start, int end, int nFactor) {
        if (!jsonObj.has("frameSubset")) {
            return null;
        }

        String rangeValue = jsonObj.getString("frameSubset");
        String rangeArray[] = rangeValue.split(",");
        String s = rangeArray[0].substring(1);
        String e = rangeArray[1].substring(0, rangeArray[1].length() - 1);
        int m = Integer.parseInt(s);
        int n = Integer.parseInt(e);

        int nSubType = 0;
        if (jsonObj.has("subtype")) {
            nSubType = jsonObj.getInt("subtype");
        }

        if (m <= 0 || n <= 0) {
            System.out.println("Parameter of frameSubset is zero, will follow up frameRange attrubute!");
            return null;
        }

        if (nSubType == 0) {
            // 黄老师要求的算法：以m帧为一组，一组中画n帧
            if (n >= m) {
                return null;
            }
            m = m - n;
        } else {
            // 画n帧，空m帧，循环
        }

        List<Integer> list = new ArrayList<>();
        int p = 0;
        int q = 0;
        // 收集每隔m帧画n帧(m,n)合法集合
        for (int i = start; i <= end; i++) {
            if (p < n) {
                list.add(i * nFactor);
                p++;
            } else {
                q++;
                if (q >= m) {
                    p = 0;
                    q = 0;
                }
            }
        }
        return list;
    }

    private static void drawSupperObjects(JSONObject jObj, Graphics2D gp2d, int number) throws Exception {
        String type = jObj.getString("type");
        if (type.equalsIgnoreCase("javascript")) {
            drawJavaScriptObjectEx(jObj, gp2d, number);
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
        if (actionTrace.toLowerCase().startsWith("function")) {
            X = x1 + (number - sfNum) * step; // 得到对象的起始X坐标
            Y = calTraceByJS(X, actionTrace);
        } else if (actionTrace.toLowerCase().startsWith("x")) {
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

        // 绘制超级对象的足迹（脚印），可以定义脚印的图片或者简单绘制圆点
        if (actionObj.has("footprint")) {
            JSONObject footPrintObj = actionObj.getJSONObject("footprint");
            String footPrintType = footPrintObj.getString("type");
            JSONObject footPrintAttrObj = footPrintObj.getJSONObject("attribute");
            String footSrc = footPrintAttrObj.getString("src");
            int footWidthAttr = footPrintAttrObj.getInt("width");
            int footHeightAttr = footPrintAttrObj.getInt("height");
            int footDyAttr = footPrintAttrObj.getInt("dy");
            int footStepAttr = footPrintAttrObj.getInt("step");
            if (footStepAttr <= 0) {
                footStepAttr = 1;
            }
            for (int i = sfNum; i <= number; i = i + footStepAttr) {
                float printX = x1 + (i - sfNum) * step;
                float printY = calYCoordinate(actionTrace, printX, i, x1, y1, sfNum, step);
                float printX1 = x1 + (i + 1 - sfNum) * step;
                float printY1 = calYCoordinate(actionTrace, printX1, i + 1, x1, y1, sfNum, step);

                if ("circle".equalsIgnoreCase(footPrintType)) {
                    gp2d.fillOval((int) printX, (int) printY, footWidthAttr, footHeightAttr);
                } else if ("picture".equalsIgnoreCase(footPrintType)) {
                    // 绘制脚印的图片，图片会根据运动轨迹的方向进行旋转
                    double degrees;
                    double dSlope;
                    if (printX1 - printX == 0) {
                        degrees = 90; // 斜率不存在
                    } else {
                        dSlope = (printY1 - printY) / (printX1 - printX);
                        double radians = Math.atan(dSlope);
                        degrees = Math.toDegrees(radians);
                    }
                    String footPic = FileUtil.downloadFileIfNeed(footSrc);
                    File imgFile = new File(footPic);
                    if (imgFile.exists()) {
                        BufferedImage originalImage = ImageIO.read(imgFile);
                        BufferedImage rotatedImage = ImageUtil.rotateImage(originalImage, 90 - degrees);
                        int left = (int) printX;
                        int top = (int) printY + footDyAttr;
                        int w = footWidthAttr;
                        int h = footHeightAttr;
                        gp2d.drawImage(rotatedImage, left, top, w, h, null);
                    }
                }
            }
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
            name = name.replace(FileUtil.linedelimiter, "\n");
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
                    System.out.println(aLine);
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

    private static float calYCoordinate(String actionTrace, float printX, int i, int x1, int y1, int sfNum, float step) throws Exception {
        float printY;
        if (actionTrace.toLowerCase().startsWith("function")) {
            printY = calTraceByJS(printX, actionTrace);
        } else if (actionTrace.toLowerCase().startsWith("x")) {
            String xValue = actionTrace.substring(2);
            printX = Integer.parseInt(xValue);
            printY = y1 + (i - sfNum) * step;
        } else {
            String parm[] = actionTrace.split("\\+");
            float a1 = Float.parseFloat(parm[0].substring(2, parm[0].indexOf("*")));
            float b1 = Float.parseFloat(parm[1].substring(0, parm[1].indexOf("*")));
            float c1 = Float.parseFloat(parm[2]);
            printY = (float) (a1 * printX * printX + b1 * printX + c1);
        }
        return printY;
    }
    private static float calTraceByJS(float x, String actionTrace) throws Exception {
        engine.eval(actionTrace);
        Invocable invocable = (Invocable) engine;
        Object result = invocable.invokeFunction("trace", x);
        float y = Float.parseFloat(result.toString());
        return y;
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
        
        //绘制歌曲标题，如果LRC中有定义的话
        if (titleOfLRC.trim().length() > 0) {
            gp2d.setColor(new Color(255, 169, 0));
            gp2d.setFont(new Font("黑体", Font.BOLD, 50));
            int y = 120;
            for (String line : titleOfLRC.split("\\\\n")) {
                gp2d.drawString(line, 50, y);
                y += gp2d.getFontMetrics().getHeight();
            }
        }
        
        //随机绘制字幕文字
        if (attributeObj.has("random") && "true".equalsIgnoreCase(attributeObj.getString("random"))) {
            for(int i=0; i<10;i++) {
                drawRandomWord(gp2d, strSubtitle);   
            }
        } 
        //固定的位置绘制字幕
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

    @Deprecated
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
        boolean bRefreshArgs = false;
        if (attributeObj.has("refreshArgs")) {
            if ("true".equalsIgnoreCase(attributeObj.getString("refreshArgs"))) {
                bRefreshArgs = true;
            }
        }

        graphEngine.setGraphics(gp2d);
        engine.put("document", graphEngine);

        if (isReLoadScript) {
            StringBuffer preDefined = new StringBuffer();
            preDefined.append("function Image() { return document.getImageObj()}");
            engine.eval(preDefined.toString());

            File f = new File(striptFile);
            Reader r = new InputStreamReader(new FileInputStream(f));
            engine.eval(r);

            // Only for ChessLog used，TODO:废除这段临时代码
            if (attributeObj.has("chess")) {
                String setChesslogFunName = attributeObj.getString("chess");
                Invocable invoke = (Invocable) engine;
                String filteredChessLog = MacroResolver.getProperty(VAR_CHESS_LOG_TEXT_FIXED);// "炮二平六 马8进7";
                invoke.invokeFunction(setChesslogFunName, new Object[] { filteredChessLog });
            }
            // Initialize parameters for JS Plug-in
            setPlugInArgs(attributeObj, engine);
        }

        if (bRefreshArgs) {
            setPlugInArgs(attributeObj, engine);
        }

        Invocable invoke = (Invocable) engine;
        invoke.invokeFunction(functionName, new Object[] { number - start });
    }

    private static void drawJavaScriptObjectEx(JSONObject jObj, Graphics2D gp2d, int number) throws Exception {
        JSONObject attributeObj = jObj.getJSONObject("attribute");
        String striptFile = attributeObj.getString("script");
        striptFile = FileUtil.downloadFileIfNeed(striptFile);

        ScriptEngineWrapper sew = engineMap.get(striptFile);
        sew.getGraphEngine().setGraphics(gp2d);
        sew.getEngine().put("document", sew.getGraphEngine());

        String functionName = attributeObj.getString("function");
        int start = attributeObj.getInt("start");
        boolean bRefreshArgs = false;
        if (attributeObj.has("refreshArgs")) {
            if ("true".equalsIgnoreCase(attributeObj.getString("refreshArgs"))) {
                bRefreshArgs = true;
            }
        }

        if (bRefreshArgs) {
            setPlugInArgs(attributeObj, sew.getEngine());
        }
        Invocable invoke = (Invocable) sew.getEngine();
        invoke.invokeFunction(functionName, new Object[] { number - start });
    }
    private static void setPlugInArgs(JSONObject attributeObj, ScriptEngine engine) throws Exception {
        if (attributeObj != null && attributeObj.has("initArgs")) {
            JSONObject argObj = attributeObj.getJSONObject("initArgs");
            String argsFunName = argObj.getString("function");
            JSONArray argsArray = argObj.getJSONArray("args");
            List<String> objs = new ArrayList<>();
            for (Object object : argsArray) {
                objs.add((String) object);
            }
            Object[] objectAttry = objs.toArray(new String[] {});
            Invocable invoke = (Invocable) engine;
            invoke.invokeFunction(argsFunName, objectAttry);
        }
    }

    private static void drawGraphic(JSONObject jObj, Graphics2D gp2d) {
        String graphicType = jObj.getString("graphic");
        JSONObject attrObj = jObj.getJSONObject("attribute");

        if ("sprite".equalsIgnoreCase(graphicType)) {
            try {
                drawSpriteObject(attrObj, gp2d);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return;
        }
        
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
        } else if ("musicNote".equalsIgnoreCase(graphicType)) {
            gp2d.setColor(color);
            gp2d.setFont(new Font("黑体", Font.BOLD, 30));

            String note = attrObj.getString("note");
            if (note.length() == 1) {
              //绘制单音符
                float time = attrObj.getFloat("time");
                int tone = attrObj.getInt("tone");
                mNote.draw_1_note(gp2d, left, top, note, time, tone);
            } else {
                // "note": "1/2/"
                int dx = 25;
                String regexPattern1 = "(\\d+)/(\\d+)/"; // 1/2/
                String regexPattern2 = "(\\d+)/(\\d+)//(\\d+)//"; // 1/2//3//
                String regexPattern3 = "(\\d+)//(\\d+)//(\\d+)/"; // 1//2//3/
                String regexPattern4 = "(\\d+)//(\\d+)//(\\d+)//(\\d+)//"; // 1//2//3//4//
                Matcher matcher1 = Pattern.compile(regexPattern1).matcher(note);
                Matcher matcher2 = Pattern.compile(regexPattern2).matcher(note);
                Matcher matcher3 = Pattern.compile(regexPattern3).matcher(note);
                Matcher matcher4 = Pattern.compile(regexPattern4).matcher(note);

                if (matcher4.find()) {
                    System.out.println("matcher4");
                    String note1 = matcher4.group(1);
                    String note2 = matcher4.group(2);
                    String note3 = matcher4.group(3);
                    String note4 = matcher4.group(4);
                    mNote.draw_1_note(gp2d, left, top, note1, (float) 0.25, 0);
                    mNote.draw_1_note(gp2d, left + dx, top, note2, (float) 0.25, 0);
                    mNote.draw_1_note(gp2d, left + dx * 2, top, note3, (float) 0.25, 0);
                    mNote.draw_1_note(gp2d, left + dx * 3, top, note4, (float) 0.25, 0);

                } else if (matcher3.find()) {
                    System.out.println("matcher3");
                    String note1 = matcher3.group(1);
                    String note2 = matcher3.group(2);
                    String note3 = matcher3.group(3);
                    mNote.draw_1_note(gp2d, left, top, note1, (float) 0.25, 0);
                    mNote.draw_1_note(gp2d, left + dx, top, note2, (float) 0.25, 0);
                    mNote.draw_1_note(gp2d, left + dx * 2, top, note3, (float) 0.5, 0);

                } else if (matcher2.find()) {
                    System.out.println("matcher2");
                    String note1 = matcher2.group(1);
                    String note2 = matcher2.group(2);
                    String note3 = matcher2.group(3);
                    mNote.draw_1_note(gp2d, left, top, note1, (float) 0.5, 0);
                    mNote.draw_1_note(gp2d, left + dx, top, note2, (float) 0.25, 0);
                    mNote.draw_1_note(gp2d, left + dx * 2, top, note3, (float) 0.25, 0);

                } else if (matcher1.find()) {
                    System.out.println("matcher1");
                    String note1 = matcher1.group(1);
                    String note2 = matcher1.group(2);
                    mNote.draw_1_note(gp2d, left, top, note1, (float) 0.5, 0);
                    mNote.draw_1_note(gp2d, left + dx, top, note2, (float) 0.5, 0);
                } else {
                    gp2d.drawString("NOT SUPPORT!", left, top); // TODO待定需求
                }
            }

        } else if ("arc".equalsIgnoreCase(graphicType)) {
            gp2d.setColor(color);
            gp2d.setFont(new Font("黑体", Font.BOLD, 30));

            int x1 = left;
            int y1 = top;
            int x2 = attrObj.getInt("right");
            int y2 = attrObj.getInt("bottom");
            int dh = attrObj.getInt("dh"); // 控制圆弧与音符头顶的距离
            int dy = attrObj.getInt("dy"); // 控制圆弧的弯曲程度
            mNote.draw_1_arc(gp2d, x1, y1, x2, y2, dh, dy);
        } 
    }

    private static void drawSpriteObject(JSONObject attributeObj, Graphics2D gp2d) throws Exception {
        String scriptKey = attributeObj.getString("script");
        boolean isReLoadScript = false;

        String spriteScriptFile = spriteScriptMap.get(scriptKey);
        if (spriteScriptFile == null || spriteScriptFile.trim().equalsIgnoreCase("")) {
            isReLoadScript = true;
        }

        String functionName = "animateFrame";
        if (attributeObj.has("function")) {
            functionName = attributeObj.getString("function");
        }

        graphEngine.setGraphics(gp2d);
        engine.put("document", graphEngine);
        if (isReLoadScript) {
            StringBuffer preDefined = new StringBuffer();
            preDefined.append("function Image() { return document.getImageObj()}");
            engine.eval(preDefined.toString());

            String striptFile = FileUtil.downloadFileIfNeed(scriptKey);
            spriteScriptMap.put(scriptKey, striptFile);

            File f = new File(striptFile);
            Reader r = new InputStreamReader(new FileInputStream(f));
            engine.eval(r);
        }
        Invocable invoke = (Invocable) engine;
        invoke.invokeFunction(functionName, new Object[] {});
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

    private static void drawRandomWord(Graphics2D g2d, String word) {
        int fontSize = random.nextInt(20) + 20; // 随机字体大小，范围 20-40        
        int width = Integer.parseInt(MacroResolver.getProperty("VIDEO_WIDTH"));
        int height = Integer.parseInt(MacroResolver.getProperty("VIDEO_HEIGHT"));
        int x = random.nextInt(width);
        int y = random.nextInt(height);
        Color color = COLORS[random.nextInt(COLORS.length)];
        int rotationDegree = random.nextInt(360); // 随机旋转角度，范围 0-360

        Font font = new Font("Arial", Font.BOLD, fontSize);//黑体，Arial
        g2d.setFont(font);
        g2d.setColor(color);
        AffineTransform originalTransform = g2d.getTransform();
        AffineTransform transform = new AffineTransform();
        transform.rotate(Math.toRadians(rotationDegree), x, y);
        g2d.setTransform(transform);
        g2d.drawString(word, x, y);
        g2d.setTransform(originalTransform); // 恢复原始变换
    }
    // 根据剧本, 调用POI-TLd的API生成Word文档
    public static Map<String, Object> createDataMapforDocTemplate(String scriptFile) throws Exception {

        String jsonString = getJsonString(scriptFile);
        JSONObject jsonObj = new JSONObject(jsonString);
        JSONObject requestObj = JsonSriptParser.getJsonObjectbyName(jsonObj, "request");
        int width = requestObj.getInt("width");
        int height = requestObj.getInt("height");
        String version = requestObj.getString("version");

        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("version", new TextRenderData("8A2BE2", version));
        dataMap.put("address", new HyperlinkTextRenderData("website", "https://jeremyjia.github.io/Games"));
        dataMap.put("width", width);
        dataMap.put("height", height);

        JSONArray frameArray = (JSONArray) requestObj.get("frames");
        List<Map<String, Object>> dataList = new ArrayList<>();

        int i = 0;
        for (Object frame : frameArray) {
            if (!(frame instanceof JSONObject)) {
                continue;
            }
            i++;
            String s = "This is scenario " + i;
            Map<String, Object> scenario = new HashMap<>();
            scenario.put("textTag", Texts.of(s).create());
            dataList.add(scenario);

            JSONObject frameObj = (JSONObject) frame;
            if (frameObj != null) {
                JSONArray objectArray = frameObj.getJSONArray("objects");
                for (Object object : objectArray) {
                    JSONObject obj = (JSONObject) object;
                    if (obj.has("text")) {
                        String text = obj.getString("text");
                        float fontSize = obj.getFloat("size");
                        String c = obj.getString("color");
                        Color color = getColor(c);
                        c = ImageUtil.convertToColorCode(color);
                        Map<String, Object> data = new HashMap<>();
                        data.put("textTag", Texts.of(text).color(c).fontSize(fontSize).create());
                        dataList.add(data);
                    } else if (obj.has("hyperlink")) {
                        String text = obj.getString("hyperlink");
                        String link = obj.optString("link");
                        float fontSize = obj.getFloat("size");
                        String c = obj.getString("color");
                        Color color = getColor(c);
                        c = ImageUtil.convertToColorCode(color);
                        Map<String, Object> data = new HashMap<>();
                        Style style = Style.builder().buildColor(c).buildUnderlinePatterns(UnderlinePatterns.SINGLE)
                                .build();
                        data.put("textTag", Texts.of(text).style(style).fontSize(fontSize).link(link).create());
                        dataList.add(data);
                    } else if (obj.has("picture")) {
                        String picFile = obj.getString("picture");
                        picFile = FileUtil.downloadFileIfNeed(picFile);
                        File imgFile = new File(picFile);
                        if (imgFile.exists()) {
                            int w = obj.getInt("width");
                            int h = obj.getInt("heigth");
                            Map<String, Object> data = new HashMap<>();
                            data.put("pictureTag", new FilePictureRenderData(w, h, picFile));
                            dataList.add(data);
                        }
                    }
                }
            }
        }

        dataMap.put("itemTags", dataList); // 区块对LOOP
        return dataMap;
    }

    public static void main(String[] args) {
        System.out.println("UTest begin");
        serverStatusConfig(false);

        String s = "tts:I am a student, who are you,欢迎来到这里，请给出指导建议";
        try {
            s = URLEncoder.encode(s, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if (s.startsWith("tts:")) {
            s = s.substring(4);
        }
        String url = "https://tts.baidu.com/text2audio?tex=" + s
                + "&cuid=baike&lan=ZH&ctp=1&pdt=301&vol=10&rate=4&spd=5";
        // Use SouGo instead
        url = "https://fanyi.sogou.com/reventondc/synthesis?text=" + s
                + "&speed=1&lang=zh-CHS&from=translateweb&speaker=6";
        FileUtil.downloadFile(url, FileUtil.randomFileName() + ".mp3");

        System.out.println("UTest end");
    }

}
