package com.pbz.demo.hello.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

public class NetAccessUtil {

	public static String doPostOnGitHub(String urlStr, String method, String jsonStr) {
		String result = "";
		BufferedReader reader = null;
		try {
			URL url = new URL(urlStr);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod(method); // "POST"
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setUseCaches(false);
			conn.setRequestProperty("Connection", "Keep-Alive");
			conn.setRequestProperty("Charset", "UTF-8");
			conn.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
			// conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("accept", "application/json");
			conn.setRequestProperty("Authorization", "token " + getGitHubToken());

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
			System.out.println("NetAccessUtil::ResponseCode:" + code);
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

	public static String doGetOnGitHub(String url, String param) {
		String result = "";
		BufferedReader in = null;
		try {
			String urlString = url;
			if (param != null && param.trim().length() != 0) {
				urlString += "?" + param;
			}
			URL realUrl = new URL(urlString);
			URLConnection connection = realUrl.openConnection();
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			connection.setRequestProperty("Authorization", "token " + getGitHubToken());
			connection.connect();
			Map<String, List<String>> map = connection.getHeaderFields();
			for (String key : map.keySet()) {
				System.out.println(key + "--->" + map.get(key));
			}
			in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("Error when sending GET request！" + e);
			e.printStackTrace();
		} finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	
    public static String getAnswerbyChatGPT(String question) throws Exception {
        String url = "https://api.openai.com/v1/completions";
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer " + getGPTToken());

        JSONObject data = new JSONObject();
        data.put("model", "text-davinci-003");
        data.put("prompt", question);
        data.put("max_tokens", 4000);
        data.put("temperature", 1.0);

        con.setDoOutput(true);
        con.getOutputStream().write(data.toString().getBytes());

        String output = new BufferedReader(new InputStreamReader(con.getInputStream())).lines()
                .reduce((a, b) -> a + b).get();

        String answer = new JSONObject(output).getJSONArray("choices").getJSONObject(0).getString("text");
        System.out.println(answer);
        return answer;
    }

    public static String getGPTToken() {
        String tk = "sk-yeesop6IW7" + "cwfnyfIXogT" + "3BlbkFJMiDuqpZ" + "ncO2f94F6NMuT";// Wangxu's
        return tk;
    }

    public static String getGitHubToken() {
        return "ghp_Od6GW3" + "J2NiP01Zsz" + "g9JQV0amzn" + "UxhF33iBES"; // Jeremyjia's
    }

}
