package com.pbz.demo.hello.controller;

import java.io.File;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Semaphore;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.pbz.demo.hello.model.VideoDoc;
import com.pbz.demo.hello.service.VideoDocService;
import com.pbz.demo.hello.util.ExecuteCommand;
import com.pbz.demo.hello.util.FileUtil;
import com.pbz.demo.hello.util.NetAccessUtil;

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

	@Autowired
	private VideoDocService videoDocService;

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

	@RequestMapping(value = "/comments/add", method = RequestMethod.POST)
	@ResponseBody
	public String addOneNewComment(@RequestParam("issueId") Long issueId, @RequestBody String jsonString)
			throws Exception {

		jsonString = URLEncoder.encode(jsonString, "UTF-8");
		jsonString = URLDecoder.decode(jsonString, "UTF-8");
		System.out.println("addOneNewComment:" + jsonString);

		String url = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments";
		String jsonResponseString = NetAccessUtil.doPostOnGitHub(url, "POST", jsonString);
		String newCommentId = "";
		if (jsonResponseString != "") {
			int index = jsonResponseString.indexOf(",");
			jsonResponseString = jsonResponseString.substring(0, index - 1);
			index = jsonResponseString.lastIndexOf("/");
			newCommentId = jsonResponseString.substring(index + 1);
		}
		System.out.println("newCommentId:" + newCommentId);

		return newCommentId;
	}

	@RequestMapping(value = "/comments/update", method = RequestMethod.POST)
	@ResponseBody
	public String updateOneComment(@RequestParam("commentId") Long commentId, @RequestBody String updateString)
			throws Exception {
		updateString = URLEncoder.encode(updateString, "UTF-8");
		updateString = URLDecoder.decode(updateString, "UTF-8");
		System.out.println("updateOneComment:" + updateString);

		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
		String jsonResponseString = NetAccessUtil.doPostOnGitHub(url, "POST", updateString);
		return jsonResponseString;
	}

	@RequestMapping(value = "/comments/read", method = RequestMethod.GET)
	@ResponseBody
	public String readOneComment(@RequestParam("commentId") Long commentId) throws Exception {

		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
		String resultString = NetAccessUtil.doGetOnGitHub(url, "");

		String readString = "";
		if (!resultString.isEmpty()) {
			resultString = resultString.substring(resultString.indexOf("body") + 7);
			int index = resultString.lastIndexOf(",");
			readString = resultString.substring(0, index - 1);
		}
		return readString;
	}

	@RequestMapping(value = "/comments/delete", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteOneComment(@RequestParam("commentId") Long commentId) throws Exception {

		String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
		String resultString = NetAccessUtil.doPostOnGitHub(url, "DELETE", "");
		return resultString;
	}

	@RequestMapping(value = "/videodocs/findAll", method = RequestMethod.GET)
	public ModelAndView findAllDocsOnGithub(@RequestParam(name = "issueId", defaultValue = "525") String issueId) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("videodocs.html");
		List<VideoDoc> videoDocs = videoDocService.findAll(issueId);

		String issueLink = "https://github.com/jeremyjia/Games/issues/" + issueId;
		mv.addObject("videoDocs", videoDocs);
		mv.addObject("issue_link", issueLink);
		mv.addObject("short_link", "#" + issueId);
		return mv;
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
