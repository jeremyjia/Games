package com.pbz.demo.hello.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.StringTokenizer;

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
