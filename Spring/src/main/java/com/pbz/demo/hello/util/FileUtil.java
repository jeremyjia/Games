package com.pbz.demo.hello.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSessionContext;

import org.apache.commons.io.input.ReversedLinesFileReader;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.jaudiotagger.audio.mp3.MP3AudioHeader;
import org.jaudiotagger.audio.mp3.MP3File;
import org.json.JSONObject;

public class FileUtil {

	private static String zhPattern = "[\\u4e00-\\u9fa5]";
	public static final String delString = "1234567890.黑胜红和局()";
	private static final String replaceString = "raw.githubusercontent.com";

	public static void copyDirectory(File sourceDir, File targetDir) throws IOException {

		if (sourceDir.isDirectory()) {
			if (!targetDir.exists()) {
				createDir(targetDir.getAbsolutePath());
			}

			String[] children = sourceDir.list();
			for (int i = 0; i < children.length; i++) {
				if (!(sourceDir.getAbsolutePath() + File.separator + children[i])
						.equalsIgnoreCase(targetDir.getAbsolutePath())) {
					copyDirectory(new File(sourceDir, children[i]), new File(targetDir, children[i]));
				}
			}
		} else {

			InputStream in = new FileInputStream(sourceDir);
			OutputStream out = new FileOutputStream(targetDir);

			// Copy the bits from instream to outstream
			byte[] buf = new byte[1024];
			int len;
			while ((len = in.read(buf)) > 0) {
				out.write(buf, 0, len);
			}
			in.close();
			out.close();
		}
	}

	public static void copyFile(String source, String destination, boolean overwrite) throws Exception {
		File src_f = new File(source);
		File dst_f = new File(destination);

		if (!src_f.exists() || !src_f.canRead()) {
			throw new Exception("common.error.cannotFindFile" + src_f.getName());
		} else if (dst_f.exists() && !overwrite) {
			throw new Exception("common.error.destinationFileExists" + dst_f.getName());
		}
		if (overwrite)
			dst_f.delete();

		dst_f.getParentFile().mkdirs();

		try {
			FileInputStream src = new FileInputStream(src_f);
			FileOutputStream dst = new FileOutputStream(dst_f);
			byte[] buffer = new byte[4096];

			while (true) {
				int count = src.read(buffer);
				if (count == -1) {
					break;
				}

				dst.write(buffer, 0, count);
			}

			src.close();
			dst.close();
		} catch (IOException e) {
			if (dst_f.exists()) {
				dst_f.delete();
			}

			throw new Exception("Error during copy: " + e.getMessage());
		}
	}

	public static void createDir(String path) {
		StringTokenizer st = new StringTokenizer(path, File.separator);
		String tmpPath = "";
		while (st.hasMoreElements()) {
			tmpPath = tmpPath + File.separator + st.nextToken();
			if (!new File(tmpPath).exists()) {
				new File(tmpPath).mkdir();
			}
		}
	}

	public static String readAllBytes(String filePath) {
		String content = "";
		try {
			content = new String(Files.readAllBytes(Paths.get(filePath)));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return content;
	}

	public static void writeStringToFile(String filename, String contents) throws Exception {
		try {
			FileWriter file = new FileWriter(filename);
			file.write(contents);
			file.close();
		} catch (Exception exception) {
			throw new Exception(exception);
		}
	}

	/**
	 * 读取日志最后N行
	 */
	public static List<String> readLastLine(String path, Charset s, int numLastLineToRead) {
		File file = new File(path);
		List<String> result = new ArrayList<>();
		try (ReversedLinesFileReader reader = new ReversedLinesFileReader(file, s)) {
			String line = "";
			while ((line = reader.readLine()) != null && result.size() < numLastLineToRead) {
				if (line.contains("--->")) {
					continue;
				}
				result.add(line);
			}
			Collections.reverse(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public static String listToString(List<String> list) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < list.size(); i++) {
			sb.append(list.get(i));
		}
		return clearStr(sb.toString());
	}

	public static String clearStr(String str) {
		String resultStr = str.replaceAll("\n", "").replaceAll("\t", "").replaceAll("\r", "");
		return resultStr.trim();
	}

	public static String getCurrentTime() {
		SimpleDateFormat sdf = new SimpleDateFormat();
		sdf.applyPattern("yyyy-MM-ddHH:mm:ssa");
		Date date = new Date();
		return sdf.format(date);
	}

	public static String getFQDN() {
		String defaultFQDN = "";
		System.setProperty("java.net.preferIPv4Stack", "true");
		try {
			InetAddress address = InetAddress.getLocalHost();
			String host = address.getHostName();
			String ip = address.getHostAddress();
			defaultFQDN = address.getCanonicalHostName();
			if (defaultFQDN.equals(ip)) {
				defaultFQDN = host;
			}
		} catch (Exception e) {
			System.out.println("  " + e);
		}
		return defaultFQDN;
	}

	public static String getHTMLContentByUrl(String url, String charset) throws IOException {
		URLConnection urlCon = new URL(url).openConnection();
		InputStream is = urlCon.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(is, charset));// GBK, utf-8
		StringBuilder sb = new StringBuilder();
		String line = "";
		try {
			while ((line = reader.readLine()) != null) {
				sb.append(line);
				sb.append("\\n");// Jeremy
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		reader.close();
		return sb.toString();
	}

	public static void downloadFile(String url, String saveFilePath) {
		try {
			url = fixUrl(url);
			URL fileUrl = new URL(url);
			InputStream is = null;
			// Proxy
			boolean b = false;
			if (b) {
				javax.net.ssl.TrustManager[] trustAllCerts = { new TrustAllTrustManager() };
				SSLContext sc = SSLContext.getInstance("SSL");
				SSLSessionContext sslsc = sc.getServerSessionContext();
				sslsc.setSessionTimeout(0);
				sc.init(null, trustAllCerts, null);
				HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
				HttpsURLConnection.setDefaultHostnameVerifier(new NullHostnameVerifier());
				Proxy proxy = new Proxy(Proxy.Type.SOCKS, new InetSocketAddress("localhost", 4567));
				HttpURLConnection urlc = (HttpURLConnection) fileUrl.openConnection(proxy);
				is = urlc.getInputStream();
			} else {
				// is = fileUrl.openStream();
				HttpURLConnection conn = (HttpURLConnection) fileUrl.openConnection();
				conn.setConnectTimeout(2 * 60 * 1000);
				conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
				is = conn.getInputStream();
			}
			OutputStream os = new FileOutputStream(saveFilePath);
			byte bf[] = new byte[1024];
			int length = 0;
			while ((length = is.read(bf, 0, 1024)) != -1) {
				os.write(bf, 0, length);
			}
			is.close();
			os.close();
		} catch (Exception e) {
			System.out.println("download error:" + e.getMessage());
		}
	}

	public static String getAudioDuration(String filePath) throws Exception {
		MP3File file = new MP3File(filePath);
		MP3AudioHeader audioHeader = (MP3AudioHeader) file.getAudioHeader();
		int len = audioHeader.getTrackLength(); // Second
		return Integer.toString(len);
	}

    public static String downloadFileIfNeed(String file) throws IOException {

        if (file.startsWith("commentID:")) {
            return savePlugInToJSFile(file);
        }
        
        if (file.startsWith("tts:")) {
            return saveTextToAudioFile(file);
        }

        String fileName = file;
        if (fileName.contains("/")) {
            fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        }
        String saveFile = System.getProperty("user.dir") + "/" + fileName;
        if (!new File(saveFile).exists()) {
            long begintime = System.currentTimeMillis();
            System.out.println("Downloading file: " + file);
            FileUtil.downloadFile(file, saveFile);
            long endtime = System.currentTimeMillis();
            System.out.println("Download file Time:" + (endtime - begintime));
        }
        return fileName;
    }

    private static String saveTextToAudioFile(String file) throws IOException {
        // tts:hello
        String text = file.substring(4);
        String textOfAudio = URLEncoder.encode(text, "UTF-8");

        String url = "https://tts.baidu.com/text2audio?tex=" + text;
        if (url.indexOf("ctp=1") == -1) {
            url += "&cuid=baike&lan=ZH&ctp=1&pdt=301&vol=10&rate=4&spd=5"; // Default parameters
        }
        // Fixed url, use sogou instead of baidu.
        url = "https://fanyi.sogou.com/reventondc/synthesis?text=" + textOfAudio
                + "&speed=1&lang=zh-CHS&from=translateweb&speaker=6";
        // Fixed url, use google instead of sogou.
        url = "https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q="
                + textOfAudio + "&tl=zh-CN";

        String downloadFileName = FileUtil.randomFileName() + ".mp3";
        FileUtil.downloadFile(url, downloadFileName);

        String targetPath = System.getProperty("user.dir");
        File mp3File = new File(targetPath + "/" + downloadFileName);
        if (!mp3File.exists()) {
            System.out.println("The map3 file is NOT generated:" + mp3File);
            return "A_Sax.wav";
        }
        return downloadFileName;
    }

    private static String savePlugInToJSFile(String strInput) throws IOException {
        // commentID:1234
        String commentID = strInput.substring(strInput.indexOf(":") + 1);
        String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentID;
        String resultString = NetAccessUtil.doGetOnGitHub(url, "");
        int s = resultString.indexOf("body");
        int e = resultString.indexOf("reactions");
        String plugInContentStr = resultString.substring(s + 7, e - 3);

        String fileName = "plx_"+commentID + ".js";
        String fullPath = System.getProperty("user.dir") + "/" + fileName;
               
        FileWriter fw2 = new FileWriter(fullPath);
        BufferedWriter bw = new BufferedWriter(fw2);    
        plugInContentStr = plugInContentStr.replace("\\r\\n", "\r\n");
        plugInContentStr = plugInContentStr.replace("\\", "");
        bw.write(plugInContentStr); 
        bw.close();

        System.out.println(plugInContentStr);
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
		FileUtil.downloadFile(fileUrl, savedFilePath);
		long endtime = System.currentTimeMillis();
		System.out.println("download file time:" + (endtime - begintime));

		return new File(savedFilePath).getName();
	}

	private static String fixUrl(String url) throws IOException {
		url = encodeString(url, "UTF-8");
		if (url.contains(replaceString)) {
			// https://raw.githubusercontent.com/littleflute/cchess/master/blCChess.json ->
			// https://littleflute.github.io/cchess/blCChess.json
			String sIn = new String(url);
			int index = sIn.indexOf(replaceString);
			index = index + replaceString.length() + 1;
			String temp = sIn.substring(index);
			int index2 = temp.indexOf("/");
			String firstWord = temp.substring(0, index2);
			String leftWords = temp.substring(index2);
			String result = "https://" + firstWord + ".github.io" + leftWords;
			result = result.replaceAll("master/", "");
			System.out.println("fixed url:" + result);
			return result;
		} else {
			System.out.println("encoded url:" + url);
			return url;
		}
	}

	public static String encodeString(String str, String charset) throws UnsupportedEncodingException {
		Pattern p = Pattern.compile(zhPattern);
		Matcher m = p.matcher(str);
		StringBuffer b = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(b, URLEncoder.encode(m.group(0), charset));
		}
		m.appendTail(b);
		return b.toString();
	}

	public static void removeTempFiles() {
		int index = 1;
		while (true) {
			String jpgFilePath = System.getProperty("user.dir") + "/" + Integer.toString(index) + ".jpg";
			File jpgFile = new File(jpgFilePath);

			String jpegFilePath = System.getProperty("user.dir") + "/" + Integer.toString(index) + ".jpeg";
			File jpegFile = new File(jpegFilePath);

			if (!jpgFile.exists() && !jpegFile.exists()) {
				break;
			}
			if (jpgFile.exists()) {
				jpgFile.delete();

			}
			if (jpegFile.exists()) {
				jpegFile.delete();
			}
			index++;
		}

		clearWorkSpace(System.getProperty("user.dir"));

	}

	public static void clearWorkSpace(String workSpace) {
		File fileDir = new File(workSpace);
		if (fileDir.exists()) {
			delete_File(fileDir);
		}
	}

	private static void delete_File(File file) {
		if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (int i = 0; i < files.length; i++) {
				delete_File(files[i]);
			}
		}
		String fileName = file.getName().toLowerCase();
		if (fileName.startsWith("tmp") && fileName.endsWith("mp3")) {
			file.delete();
		}
	}

	// 将文本分割为多行,考虑中文文章没有空格的情况也会强制分行
	public static String addLinefeeds(String text, int number) {
		StringBuffer buffer = new StringBuffer();
		int index = 0;
		for (int i = 0; i < text.length(); i++) {
			char p = text.charAt(i);
			if (index >= number && number>0) {
				if (p != ' ' && (index-number)<=3) {
					buffer.append(p);
					index++;
					continue;
				}
				buffer.append("\\n");
				buffer.append(p);
				index = 0;
			} else {
				buffer.append(p);
				index++;
			}
		}
		return buffer.toString().trim();
	}

    public static String getChessLog(String strFromWeb) {
        String str = removeNoNeedChar(strFromWeb, delString);
        String array[] = str.split(" ");
        StringBuffer sbf = new StringBuffer("");
        for (String s : array) {
            if (s != " " && !s.isEmpty()) {
                sbf.append(s).append(" ");
            }
        }
        str = sbf.toString();
        str = str.replaceAll("\r|\n|\t", "");
        str = str.replace("\\n", "");
        return str;
    }

    public static String removeNoNeedChar(String str, String delString) {
        StringBuffer sbf = new StringBuffer("");
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            boolean bFind = false;
            for (int j = 0; j < delString.length(); j++) {
                char delChar = delString.charAt(j);
                if (c == delChar) {
                    bFind = true;
                }
            }
            if (!bFind) {
                sbf.append(c);
            }
        }
        return sbf.toString().trim();
    }
	    
	public static String saveJsonString2File(String jsonString, String fileName) throws Exception {
		jsonString = URLEncoder.encode(jsonString, "UTF-8");
		jsonString = URLDecoder.decode(jsonString, "UTF-8");

		String file = System.getProperty("user.dir") + "/" + fileName;
		OutputStreamWriter ops = null;
		ops = new OutputStreamWriter(new FileOutputStream(file));
		if (!jsonString.startsWith("{") && !jsonString.endsWith("}")) {
			jsonString = jsonString.substring(1, jsonString.length() - 1);
		}
		ops.write(jsonString);
		ops.close();
		System.out.println(jsonString);
		return jsonString;
	}

	public static String encryptToBase64(String filePath) {
		if (filePath == null) {
			return null;
		}
		try {
			byte[] b = Files.readAllBytes(Paths.get(filePath));
			return Base64.getEncoder().encodeToString(b);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static String dencryptFromBase64(String base64Str) {
		return new String(Base64.getDecoder().decode(base64Str));
	}

	public static int chmod(String args) throws Exception {
		int result = -1;
		try {
			Process process = Runtime.getRuntime().exec("chmod " + args);
			process.waitFor();
			result = process.exitValue();
		} catch (Exception exception) {
			throw new Exception(exception);
		}
		return result;

	}

	public static String ReplaceString(String inputString, String regex, String replaceString) {
		Pattern r = Pattern.compile(regex);
		Matcher m = r.matcher(inputString);
		m.reset();
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, replaceString);
		}
		m.appendTail(sb);
		return sb.toString();
	}

	public void inputStreamToWord(InputStream is, OutputStream os) throws IOException {
		POIFSFileSystem fs = new POIFSFileSystem();
		// org.apache.poi.hdf.extractor.WordDocument
		fs.createDocument(is, "WordDocument");
		fs.writeFilesystem(os);
		os.close();
		is.close();
	}

	public static boolean createAWordDoc(String title, String text, String fileName) {
		try {
			// Create a empty document
			XWPFDocument document = new XWPFDocument();
			File file = new File(fileName);
			if (file.exists()) {
				file.delete();
			}
			FileOutputStream outStream = new FileOutputStream(file);
			XWPFParagraph titleParagraph = document.createParagraph();
			titleParagraph.setAlignment(ParagraphAlignment.CENTER);
			XWPFRun titleParagraphRun = titleParagraph.createRun();
			titleParagraphRun.setText(title);
			titleParagraphRun.setColor("0000FF");
			titleParagraphRun.setFontSize(20);
			// Create a paragraph
			for (String line : text.split("\n")) {
				XWPFParagraph paragraph = document.createParagraph();
				XWPFRun run = paragraph.createRun();
				run.setText(line + "\r\n");
			}
			document.write(outStream);
			outStream.close();
			System.out.println("Create a word docx " + fileName + " successfully!");
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean json2word(String title, String optional, String fileName) {
		try {
			// Create a empty document
			XWPFDocument document = new XWPFDocument();
			File file = new File(fileName);
			if (file.exists()) {
				file.delete();
			}
			FileOutputStream outStream = new FileOutputStream(file);
			XWPFParagraph titleParagraph = document.createParagraph();
			titleParagraph.setAlignment(ParagraphAlignment.CENTER);
			XWPFRun titleParagraphRun = titleParagraph.createRun();
			titleParagraphRun.setText(title);
			titleParagraphRun.setColor("0000FF");
			titleParagraphRun.setFontSize(20);
			// Create a paragraph
			for (String line : optional.split("\n")) {
				XWPFParagraph paragraph = document.createParagraph();
				XWPFRun run = paragraph.createRun();
				run.setText(line + "\r\n");
			}
			document.write(outStream);
			outStream.close();
			System.out.println("Create a word docx " + fileName + " successfully!");
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


    public static String randomFileName() {
        Date date = new Date(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String fileName = simpleDateFormat.format(date);
        return fileName;
    }
	public static void main(String[] args) {

		String path = "C:\\jiaGameAll\\Games\\Spring\\target";
		clearWorkSpace(path);
		// 全局代理
		// Properties prop = System.getProperties();
		// prop.setProperty("socksProxyHost", "localhost");
		// prop.setProperty("socksProxyPort", "4567");

		// https://learningenglish.voanews.com/z/3521&filename=AsItIs.html
		String strUrl = "https://learningenglish.voanews.com/z/3521";
		// strUrl = "http://news.baidu.com";
		// strUrl = "https://www.google.com";
		// ProxySelector.getDefault();
		// System.setProperty("java.net.preferIPv4Stack", "true");
		// System.setProperty("jdk.tls.useExtendedMasterSecret", "false");
		downloadFile(strUrl, "/Users/jeremy/temp/asItis.html");
		try {
			URL url = new URL(strUrl);
			InetSocketAddress addr = new InetSocketAddress("localhost", 4567);
			Proxy proxy = new Proxy(Proxy.Type.SOCKS, addr); // Socket 代理
			URLConnection conn = url.openConnection(proxy);
			InputStream is = conn.getInputStream();
			OutputStream os = new FileOutputStream("/Users/jeremy/temp/download1.html");
			byte bf[] = new byte[1024];
			int length = 0;
			while ((length = is.read(bf, 0, 1024)) != -1) {
				os.write(bf, 0, length);
			}
			is.close();
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}

		String title = "Document Title";
		String strText = "生成一段文本! Create a paragraph!";
		createAWordDoc(title, strText, "/Users/jeremy/temp/1.docx");
		System.out.println("OK!");
	}
}
