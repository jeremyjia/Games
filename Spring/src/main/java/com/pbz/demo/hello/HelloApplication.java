package com.pbz.demo.hello;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.pbz.demo.hello.util.FileUtil;
import com.pbz.demo.hello.util.JsonSriptParser;
import com.pbz.demo.hello.util.NetAccessUtil;

@RestController
@EnableAutoConfiguration
@EnableScheduling
@SpringBootApplication
public class HelloApplication {

	@Value("${server.port}")
	private String app_port;

	@Value("${server.version}")
	private String app_version;

	@RequestMapping("/")
	public ModelAndView index() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("homepage.html");

		String swagger_url = "http://localhost:" + app_port + "/swagger-ui.html";
		String upload_url = "http://localhost:" + app_port + "/uploadpage";
		String video_url = "http://localhost:" + app_port + "/image/json2video?script=video.json";
		String demo_url = "http://localhost:" + app_port + "/1.html";
		mv.addObject("swagger_url", swagger_url);
		mv.addObject("upload_url", upload_url);
		mv.addObject("video_url", video_url);
		mv.addObject("demo_url", demo_url);
		mv.addObject("server_version", app_version);

		return mv;
	}

	public static void main(String[] args) throws Exception {
		ApplicationContext ctx = SpringApplication.run(HelloApplication.class, args);

		// Copy resource files to current directory.
		String applicationDir = System.getProperty("user.dir");
		String rescourceFolder = applicationDir + "/" + "script";
		if (!new File(rescourceFolder).exists()) {
			rescourceFolder = applicationDir + "/" + "../script";
			if (!new File(rescourceFolder).exists()) {
				rescourceFolder = "";
			}
		}
		if (rescourceFolder != "") {
			System.out.println("Copy resource files");
			FileUtil.copyDirectory(new File(rescourceFolder), new File(applicationDir));
			FileUtil.copyDirectory(new File(rescourceFolder + "/" + "plx"), new File(applicationDir));
		}

		boolean isWindows = System.getProperty("os.name").startsWith("Windows");
		if (!isWindows) {
			String scriptPath = applicationDir + "/" + "jpg2video.sh";
			FileUtil.chmod("755 " + scriptPath);
			System.out.println("Chmod file " + scriptPath);
		}
		System.out.println("I am ready!");

		Environment environment = ctx.getBean(Environment.class);
		String bConfigGitHubMonitor = environment.getProperty("github.config.active");
		if ("true".equalsIgnoreCase(bConfigGitHubMonitor)) {
			setServerConfig();
		} else {
			// clear server log
			String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/1139435588";
			NetAccessUtil.doPostOnGitHub(url, "POST", "No logging");
		}

	}

	private static void setServerConfig() throws Exception {
		JsonSriptParser.serverStatusConfig(true);
	}

}