package com.pbz.demo.hello.service;

import java.io.File;
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

	@Scheduled(fixedRate = 10000)
	public void scheduledTask() throws Exception {
		if (!bConfigGitHubMonitor) {
			return;
		}

		String targetPath = System.getProperty("user.dir");
		File logFile = new File(targetPath + "/serverlog.log");
		if (!logFile.exists()) {
			return;
		}

		List<String> log = FileUtil.readLastLine(logFile.getAbsolutePath(), StandardCharsets.UTF_8, 10);
		String logContent = FileUtil.listToString(log, File.separatorChar);
		submitServerLog(logContent);

	}

	private void submitServerLog(String str) {
		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/1139435588"; // issue 760
		NetAccessUtil.doPostOnGitHub(url, "POST", str);
	}

}
