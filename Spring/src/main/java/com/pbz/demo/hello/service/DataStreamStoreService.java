package com.pbz.demo.hello.service;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.util.NetAccessUtil;

@Component
@Service
public class DataStreamStoreService {

	public static final int CELL_LENGTH = 146000;

	public static void saveStreamData(String issueId, String type, String base64Stream) throws Exception {

		// delete all comments, sometimes not deleted totally.
		int nMaxTry = 10;
		int nC = 1;
		while (nC > 0 && nMaxTry > 0) {
			clearAllComments(issueId);
			nC = getCountofComment(issueId);
			nMaxTry--;
		}

		// divide string
		List<String> strComments = cutStringByCharNumber(base64Stream, CELL_LENGTH);

		// add type as the first comment
		String url = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments";
		NetAccessUtil.doPostOnGitHub(url, "POST", type);

		// add base64 data as others comments
		addComments(issueId, strComments);

	}

	private static void addComments(String issueId, List<String> comments) throws Exception {

		if (comments.size() > 100) {
			throw new Exception(
					"The generated video evaluated " + comments.size() + " comments to store, >100 is not allowed!");
		}

		for (int i = 0; i < comments.size(); i++) {
			String strOne = comments.get(i);
			String jsonString = URLEncoder.encode(strOne, "UTF-8");
			jsonString = URLDecoder.decode(jsonString, "UTF-8");

			String url = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments";
			NetAccessUtil.doPostOnGitHub(url, "POST", jsonString);
			int index = i + 1;
			System.out.println("adding " + index + " comment");
			System.out.println(jsonString);
		}
	}

	private static List<String> cutStringByCharNumber(String str, int number) {
		List<String> list = new ArrayList<>();
		StringBuffer sbOne = new StringBuffer();
		for (int i = 0; i < str.length(); i++) {
			char p = str.charAt(i);
			if ((i + 1) % number == 0) {
				sbOne.append(p);
				list.add(sbOne.toString().trim());
				sbOne.setLength(0);
			} else {
				sbOne.append(p);
			}
		}
		list.add(sbOne.toString().trim());

		return list;
	}

	private static void clearAllComments(String issueId) {
		String issueUrl = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments?per_page=100";
		String allComments = NetAccessUtil.doGetOnGitHub(issueUrl, "");

		JSONArray jsonObjArray = new JSONArray(allComments);
		int docCount = jsonObjArray.length();
		for (int i = 0; i < docCount; i++) {
			JSONObject jsonObj = jsonObjArray.getJSONObject(i);
			Long commentId = jsonObj.getLong("id");
			String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
			NetAccessUtil.doPostOnGitHub(url, "DELETE", "");
		}

	}

	private static int getCountofComment(String issueId) {
		String issueUrl = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments?per_page=100";
		String allComments = NetAccessUtil.doGetOnGitHub(issueUrl, "");
		JSONArray jsonObjArray = new JSONArray(allComments);
		int docCount = jsonObjArray.length();
		return docCount;
	}

	public static void main(String[] args) {
		System.out.println("Begin test");

		String type = "data:video/mp4;base64,";
		String base64Stream = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

		try {
			saveStreamData("743", type, base64Stream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("End of Test!");
	}

}
