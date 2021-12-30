package com.pbz.demo.hello;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.pbz.demo.hello.util.NetAccessUtil;

@Component
public class ExitApp implements DisposableBean {

	@Value("${github.config.active}")
	private boolean bConfigGitHubMonitor;

	@Override
	public void destroy() throws Exception {
		System.out.println("Byby!");

		if (bConfigGitHubMonitor) {
			setServerConfig();
		}

	}

	private void setServerConfig() throws Exception {
		String updateString = "{\\\"server\\\":\\\"false\\\"}";
		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/939628092";
		NetAccessUtil.doPostOnGitHub(url, "POST", updateString);
	}

}
