package com.pbz.demo.hello.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.model.VideoDoc;
import com.pbz.demo.hello.util.FileUtil;
import com.pbz.demo.hello.util.JsonSriptParser;
import com.pbz.demo.hello.util.NetAccessUtil;

@Component
@Service
public class VideoDocServiceImpl implements VideoDocService {

	@Value("${server.port}")
	private String app_port;

	@Override
	public List<VideoDoc> findAll(String issueId) {
		try {
			long start = System.currentTimeMillis();
			String gitUrl = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments";
			String allComments = NetAccessUtil.doGetOnGitHub(gitUrl, "");

			JSONArray jsonObjArray = new JSONArray(allComments);
			int docCount = jsonObjArray.length();
			List<VideoDoc> videoDocList = new ArrayList<>();
			for (int i = 0; i < docCount; i++) {
				JSONObject jsonObj = jsonObjArray.getJSONObject(i);
				Object bodyString = jsonObj.get("body");
				if (bodyString instanceof String) {
					String jsonStr = ((String) bodyString).replaceAll("\t", "");// "\t|\r|\n"
					String index = String.valueOf(i + 1);
					String baseName = "sample_" + index;
					String fileName = baseName + ".json";
					FileUtil.saveJsonString2File(jsonStr, fileName);
					String videoName = baseName + ".mp4";
					String videoLink = "http://localhost:" + app_port + "/" + fileName;
					String videoPage = "http://localhost:" + app_port + "/image/json2video?script=" + fileName
							+ "&video=" + videoName;

					String des = getDescription(jsonStr);
					if (des == null || des.length() == 0) {
						des = baseName;
					}
					VideoDoc vDoc = new VideoDoc(index, des, jsonStr, videoLink, videoPage);
					videoDocList.add(vDoc);
				}
			}

			long end = System.currentTimeMillis();
			System.out.println("Task：" + (end - start) + "ms");
			return videoDocList;
		} catch (Exception e) {
			return Collections.emptyList();
		}
	}

	private String getDescription(String jsonStr) {
		String des = "";
		JSONObject jsonObj = new JSONObject(jsonStr);
		JSONObject requestObj = JsonSriptParser.getJsonObjectbyName(jsonObj, "request");
		des = requestObj.optString("description");
		return des;
	}

}