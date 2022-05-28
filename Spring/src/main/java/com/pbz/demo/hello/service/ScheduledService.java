package com.pbz.demo.hello.service;

import java.io.File;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.controller.ImageController;
import com.pbz.demo.hello.util.FileUtil;
import com.pbz.demo.hello.util.NetAccessUtil;

@Service
public class ScheduledService {

	@Autowired
	private ImageController VideoOperator = null;

	@Value("${github.config.active}")
	private boolean bConfigGitHubMonitor;

	/**
	 * 定时任务
	 * 
	 * @throws Exception
	 */
	@Scheduled(fixedRate = 10000)
	public void scheduledTask() throws Exception {
		if (!bConfigGitHubMonitor) {
			return;
		}

		String time = FileUtil.getCurrentTime();
		System.out.println(time + ": Server " + FileUtil.getFQDN() + " is processing scheduled task!");

		int rq = getRqStatus();
		System.out.println(rq);
		if (rq == -1) {
			System.out.println("Network error!");
			return;
		}

		if (rq == 2) {
			System.out.println("Server is processing a task!");
			return;
		}

		if (rq == 1) {
			doTaskOfSetRq(2);
			String docStr = doTaskOfReadDocStrOnGitHub();
			try {
				doTaskOfCreateVideo(docStr);
			} catch (Exception e) {
				System.out.println(e.getMessage());
				doTaskOfSetRq(0); // If error reset the status.
				return;
			}
			doTaskOfSubmitVideoToGitHub();
			doTaskOfSetRq(0);
		}
	}

	private void doTaskOfSubmitVideoToGitHub() {
		String targetPath = System.getProperty("user.dir");
		String videoName = "SampleOnGithub.mp4";
		File mp4File = new File(targetPath + "/" + videoName);
		String strBase64DocStr = FileUtil.encryptToBase64(mp4File.getAbsolutePath());

		try {
			DataStreamStoreService.saveStreamData("743", "data:video/mp4;base64,", strBase64DocStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("******The video data are all submitted to GitHub!******");

	}

	private void doTaskOfSetRq(int value) {
		String updateString = "{\\\"rq\\\":" + value + "}";
		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/939645512";
		NetAccessUtil.doPostOnGitHub(url, "POST", updateString);
	}

	private String doTaskOfReadDocStrOnGitHub() {
		String jsonStr = "";
		String docLink = "https://api.github.com/repos/jeremyjia/Games/issues/comments/939612362";
		String resultString = NetAccessUtil.doGetOnGitHub(docLink, "");
		if (!resultString.isEmpty()) {
			int s = resultString.indexOf("body");
			int e = resultString.indexOf("reactions");
			jsonStr = resultString.substring(s + 7, e - 3);

			jsonStr = jsonStr.replace("\\n", "$DOLLAR$");
			// jsonStr = jsonStr.replaceAll("(\\\\r\\\\n|\\\\r|\\\\n|\\\\t)", "");
			jsonStr = jsonStr.replaceAll("\\\\", "");
			jsonStr = jsonStr.replace("$DOLLAR$", "\\n");
		}
		return jsonStr;
	}

	private void doTaskOfCreateVideo(String jsonStr) throws Exception {
		String fileName = "SampleOnGithub.json";
		String videoName = "SampleOnGithub.mp4";
		if (jsonStr.toLowerCase().startsWith("http")) {
			String tempFile = FileUtil.downloadFile(jsonStr);
			jsonStr = FileUtil.readAllBytes(tempFile);
		}

		FileUtil.saveJsonString2File(jsonStr, fileName);
		VideoOperator.generateVideoByscenario(fileName, videoName);

		String targetPath = System.getProperty("user.dir");
		File mp4File = new File(targetPath + "/" + videoName);
		if (mp4File.exists()) {
			System.out.println("The video is generated:" + mp4File);
		}

	}

	private int getRqStatus() throws Exception {
		int rqStatus = -1;
		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/939645512";
		String resultString = NetAccessUtil.doGetOnGitHub(url, "");

		if (!resultString.isEmpty()) {
			int s = resultString.indexOf("body");
			int e = resultString.indexOf("reactions");
			String readString = resultString.substring(s + 7, e - 3);
			readString = readString.replaceAll("\\\\", "");
			JSONObject jsonObj = new JSONObject(readString);
			rqStatus = jsonObj.getInt("rq");
		}
		return rqStatus;
	}

}
