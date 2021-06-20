package com.pbz.demo.hello.controller;

import java.io.File;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.Semaphore;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pbz.demo.hello.util.ExecuteCommand;
import com.pbz.demo.hello.util.FileUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "通用功能接口")
public class CommonController {
	private static Semaphore semaphore = new Semaphore(1);
	private static final boolean isWindows = System.getProperty("os.name").startsWith("Windows");

	@Value("${server.version}")
	private String app_version;

	@ApiOperation(value = "执行服务器端命令", notes = "执行服务器端命令")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "cmd", value = "Dos/Shell Command. More format refer java Runtime.getRuntime().exec usage but need use comma instead of space. Example: sh,-c,ls%20*.jpg  mkdir,dir1", paramType = "query", required = true, dataType = "string", defaultValue = "cmd,/c,dir") })
	@RequestMapping(value = "/command", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> processCommandOnServer(String[] cmd) throws Exception {
		Map<String, Object> status = new HashMap<String, Object>();
		File logFile = new File("./Cmdlog.txt");
		if (logFile.exists()) {
			logFile.delete();
		}
		logFile.createNewFile();

		try {
			ExecuteCommand.executeCommand(cmd, null, new File("."), logFile.getAbsolutePath());
		} catch (Exception e) {
			String cmd0 = "sh";
			String cmd1 = "-c";
			if (isWindows) {
				cmd0 = "cmd";
				cmd1 = "/c";
			}
			String[] cmds = new String[cmd.length + 2];
			cmds[0] = cmd0;
			cmds[1] = cmd1;
			for (int i = 0; i < cmd.length; i++) {
				cmds[i + 2] = cmd[i];
			}
			ExecuteCommand.executeCommand(cmds, null, new File("."), logFile.getAbsolutePath());
		}
		Thread.sleep(100);
		String strOut = FileUtil.readAllBytes(logFile.getAbsolutePath());
		status.put("Status", "OK!");
		status.put("Message", strOut);

		return status;
	}

	@ApiIgnore
	@RequestMapping("/api/v1/test")
	public Map<String, Object> authenticated(HttpServletRequest request) {
		Map<String, Object> ret = new HashMap<String, Object>();
		ret.put("message", "call method");

		int availablePermits = semaphore.availablePermits();
		if (availablePermits > 0) {
			System.out.println("抢到资源 " + availablePermits);
		} else {
			System.out.println("资源已被占用，稍后再试");
			ret.put("message", "I am busy!");
			return ret;
		}
		try {
			// 请求占用一个资源
			semaphore.acquire(1);
			System.out.println("资源正在被使用");
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			semaphore.release(1);// 释放一个资源
			System.out.println("-----------释放资源包----------");
		}

		return ret;
	}

	@RequestMapping(value = "/commit2github", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> commitFiles2GitHub(@RequestParam(name = "files") String files,
			@RequestParam(name = "comments", defaultValue = "add files") String comments) throws Exception {

		Map<String, Object> status = new HashMap<String, Object>();

		String gitPath = "git";
		if (!isWindows) {
			gitPath = "/usr/bin/git";
		}

		String[] addCmd = { gitPath, "add", files };
		boolean bRes = ExecuteCommand.executeCommand(addCmd, null, new File("."), null);

		String[] commitCmd = { gitPath, "commit", "-m", comments };
		bRes = ExecuteCommand.executeCommand(commitCmd, null, new File("."), null);

		String[] pushCmd = { gitPath, "push" };
		bRes = ExecuteCommand.executeCommand(pushCmd, null, new File("."), null);

		if (bRes) {
			status.put("Status", "OK!");
		} else {
			status.put("Status", "Failed!");
		}
		return status;
	}

	@ApiOperation(value = "获取版本信息", notes = "获取应用版本、服务器等信息")
	@RequestMapping(value = "/getServerInfo", method = RequestMethod.GET)
	@ResponseBody
	public LinkedHashMap<String, Object> getServerInfo() {
		LinkedHashMap<String, Object> ret = new LinkedHashMap<String, Object>();
		ret.put("Application Version", app_version);

		String app_path = System.getProperty("user.dir");
		ret.put("Application Path", app_path);

		String os_name = System.getProperty("os.name");
		ret.put("OS Name", os_name);

		String os_version = System.getProperty("os.version");
		ret.put("OS Version", os_version);

		String os_arch = System.getProperty("os.arch");
		ret.put("OS Architecture", os_arch);

		String java_version = System.getProperty("java.version");
		ret.put("Java Runtime Version", java_version);

		return ret;
	}
}
