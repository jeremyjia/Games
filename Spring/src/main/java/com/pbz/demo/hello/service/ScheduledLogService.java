package com.pbz.demo.hello.service;

import java.io.File;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.util.FileUtil;
import com.pbz.demo.hello.util.NetAccessUtil;

@Service
public class ScheduledLogService {

	@Value("${github.config.active}")
	private boolean bConfigGitHubMonitor;

	private boolean bForceDisabled = true;

	@Scheduled(fixedRate = 60000)
	public void scheduledTask() throws Exception {
		if (bForceDisabled || !bConfigGitHubMonitor) {
			return;
		}

		String targetPath = System.getProperty("user.dir");
		File logFile = new File(targetPath + "/serverlog.log");
		if (!logFile.exists()) {
			return;
		}

		// Read the last N lines of the serverlog.log file.
		List<String> log = FileUtil.readLastLine(logFile.getAbsolutePath(), StandardCharsets.UTF_8, 30);
		String logContent = FileUtil.listToString(log);

		submitServerLog(logContent);

	}

	private void submitServerLog(String updateString) throws Exception {
		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/1139435588"; // issue 760

		updateString = URLEncoder.encode(updateString, "UTF-8");
		updateString = URLDecoder.decode(updateString, "UTF-8");
		NetAccessUtil.doPostOnGitHub(url, "POST", updateString);
	}

}
