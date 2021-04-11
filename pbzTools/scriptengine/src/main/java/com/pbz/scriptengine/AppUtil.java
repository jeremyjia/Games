package com.pbz.scriptengine;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

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

}
