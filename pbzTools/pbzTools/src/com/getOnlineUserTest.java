package com;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class getOnlineUserTest {

	public static void main(String[] args) {
		System.out.println("Begin test:");

		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/543738078";
		String param = "access_token=" + NetUtil.getToken();
		String jsonResponseString = NetUtil.sendGetRequest(url, param);
		System.out.println("json response:" + jsonResponseString);
		List<String> ls = getOnlineUsers(jsonResponseString);
		System.out.println("The online user:" + ls.size());
		for (String user : ls) {
			System.out.println(user);
		}

		System.out.println("End of test:");
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

}
