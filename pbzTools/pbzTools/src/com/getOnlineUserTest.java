package com;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class getOnlineUserTest {

	public static void main(String[] args) {
		System.out.println("Begin test:");

		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/543738078";
		// String param = "access_token=" + NetUtil.getToken(); //Old method
		String jsonResponseString = NetUtil.sendGetRequest(url, "");
		System.out.println("json response:" + jsonResponseString);
		List<String> ls = getOnlineUsers(jsonResponseString);
		System.out.println("The online user:" + ls.size());
		for (String user : ls) {
			System.out.println(user);
		}

		writeComment();
		url = "https://api.github.com/repos/jeremyjia/Games/issues/525/comments";
		String allJson = NetUtil.sendGetRequest(url, "");
		System.out.println("all json response:" + allJson);
		try {
			parserFun(allJson);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println("End of test:");
	}

	private static void parserFun(String allJson) throws Exception {
		// TODO Auto-generated method stub
		JSONArray jsonAllObj = new JSONArray(allJson);

		int count = jsonAllObj.length();
		for (int i = 0; i < count; i++) {
			JSONObject jsonObj = jsonAllObj.getJSONObject(i);
			Object bodyString = jsonObj.get("body");
			if (bodyString instanceof String) {
				String bodyJson = ((String) bodyString).replaceAll("\t|\r|\n", "");
				System.out.println("comment:" + bodyJson);
			}

		}

	}

	private static List<String> getOnlineUsers(String jsonString) {
		List<String> userls = new ArrayList<String>();
		JSONObject jsonObj = new JSONObject(jsonString);
		Object bodyString = jsonObj.get("body");
		if (bodyString instanceof String) {
			String bodyJson = ((String) bodyString).replaceAll("\t|\r|\n", "");
			JSONObject bodyObj = new JSONObject(bodyJson);
			JSONArray users = bodyObj.getJSONArray("users");
			int count = users.length();
			System.out.println("The total user:" + count);
			for (int i = 0; i < count; i++) {
				JSONObject docObj = users.getJSONObject(i);
				boolean bOnline = docObj.getBoolean("isLogin");
				if (bOnline) {
					String name = docObj.getString("name");
					userls.add(name);
				}
			}
		}
		return userls;
	}

	private static void writeComment() {

		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/866848695";// update
		url = "https://api.github.com/repos/jeremyjia/Games/issues/437/comments";

		url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/939628092";

		String jsonResponseString = NetUtil.doPost(url, "{\\\"server\\\":\\\"false\\\"}");
		System.out.println("json response:" + jsonResponseString);

	}

}
