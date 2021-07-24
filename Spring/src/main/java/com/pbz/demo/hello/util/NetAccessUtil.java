package com.pbz.demo.hello.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class NetAccessUtil {

	public static String doPostOnGitHub(String urlStr, String jsonStr) {
		String result = "";
		BufferedReader reader = null;
		try {
			URL url = new URL(urlStr);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setUseCaches(false);
			conn.setRequestProperty("Connection", "Keep-Alive");
			conn.setRequestProperty("Charset", "UTF-8");
			conn.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
			conn.setRequestProperty("accept", "application/json");
			conn.setRequestProperty("Authorization", "token " + getToken());

			if (jsonStr != null && !jsonStr.isEmpty()) {
				String requestContent = "{\"body\":\"" + jsonStr + "\"}";

				byte[] writebytes = requestContent.getBytes();
				conn.setRequestProperty("Content-Length", String.valueOf(writebytes.length));
				OutputStream outwritestream = conn.getOutputStream();
				outwritestream.write(requestContent.getBytes());
				outwritestream.flush();
				outwritestream.close();
			}
			int code = conn.getResponseCode();
			System.out.println(code);
			if (code == 200 || code == 201) {
				reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				result = reader.readLine();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	public static String getToken() {
		return "dcf9dc260a" + "1f2f9a7e9c" + "05198d95f0" + "b143f1a7bd";// Jeremyjia's
	}

}
