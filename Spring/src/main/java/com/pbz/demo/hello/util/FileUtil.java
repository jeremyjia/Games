package com.pbz.demo.hello.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSessionContext;

import org.jaudiotagger.audio.mp3.MP3AudioHeader;
import org.jaudiotagger.audio.mp3.MP3File;

public class FileUtil {

	private static String zhPattern = "[\\u4e00-\\u9fa5]";
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
				is = fileUrl.openStream();
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
			System.out.println("Error:" + e.getMessage());
		}
	}

	public static String getAudioDuration(String filePath) throws Exception {
		MP3File file = new MP3File(filePath);
		MP3AudioHeader audioHeader = (MP3AudioHeader) file.getAudioHeader();
		int len = audioHeader.getTrackLength(); // Second
		return Integer.toString(len);
	}

	public static String downloadFileIfNeed(String file) throws IOException {
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

	public static void main(String[] args) {

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
		System.out.println("OK!");
	}
}
