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
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.StringTokenizer;

import org.jaudiotagger.audio.mp3.MP3AudioHeader;
import org.jaudiotagger.audio.mp3.MP3File;

public class FileUtil {

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

	public static String getAudioDuration(String filePath) throws Exception {
		MP3File file = new MP3File(filePath);
		MP3AudioHeader audioHeader = (MP3AudioHeader) file.getAudioHeader();
		int len = audioHeader.getTrackLength(); // Second
		return Integer.toString(len);
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
}
