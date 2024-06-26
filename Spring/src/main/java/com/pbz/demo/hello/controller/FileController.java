package com.pbz.demo.hello.controller;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.pbz.demo.hello.util.FileUtil;
import com.pbz.demo.hello.util.JsonSriptParser;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "文件操作接口")
public class FileController {

	@Value("${server.port}")
	private String app_port;

	@ApiIgnore
	@RequestMapping("/uploadpage")
	public ModelAndView index() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("upload.html");
		String strHomePageUrl = "http://localhost:" + app_port;
		mv.addObject("home_page_url", strHomePageUrl);
		return mv;
	}

	@ApiOperation(value = "上传文件", notes = "上传文件接口")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "file", value = "file size less 100M", paramType = "form", required = true, dataType = "__file") })
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public Object uploadFile(@RequestParam("file") MultipartFile myfile, HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> resMap = new HashMap<String, Object>();
		if (myfile.getSize() > 1024 * 1024 * 100) {
			resMap.put("code", 500);
			resMap.put("message", "文件过大，请上传100M以内的图片");
			System.out.println("文件上传失败");
			return resMap;
		}
		String path = request.getContextPath();
		String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
		if (myfile != null) {
			String realPathOnServer = System.getProperty("user.dir") + "/";// e.g, Users/jjia/uploadFiles/
			if (myfile.isEmpty()) {
				resMap.put("code", 400);
				resMap.put("message", "未选择文件");
			} else {
				String originalFilename = myfile.getOriginalFilename();
				try {
					FileUtils.copyInputStreamToFile(myfile.getInputStream(),
							new File(realPathOnServer, originalFilename));
					resMap.put("code", 200);
					resMap.put("message", "上传成功");
					resMap.put("filename", originalFilename);
					resMap.put("path", basePath + "/static/image/" + originalFilename);
				} catch (IOException e) {
					resMap.put("code", 500);
					String eMsg = "文件上传失败";
					System.out.println(eMsg);
					resMap.put("message", eMsg);
					e.printStackTrace();
				}
			}
		}
		return resMap;
	}

	@ApiOperation(value = "保存JSON到文件", notes = "保存JSON到指定文件")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "fileName", value = "xx.json", paramType = "query", required = true, dataType = "string", defaultValue = "example.json"),
			@ApiImplicitParam(name = "jsonString", value = "json string", paramType = "body", required = true, dataType = "string") })
	@RequestMapping(value = "/json", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String saveJson2File(@RequestParam("fileName") String fileName, @RequestBody String jsonString)
			throws Exception {
		return FileUtil.saveJsonString2File(jsonString, fileName);
	}

	@ApiOperation(value = "下载文件", notes = "下载文件接口")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "url", value = "source url", paramType = "query", required = true, dataType = "string", defaultValue = "https://sports.163.com/20/0802/21/FJ2BRHEC0005877V.html"),
			@ApiImplicitParam(name = "filename", value = "save file name", paramType = "query", required = true, dataType = "string", defaultValue = "163news.html") })
	@RequestMapping(value = "/download", method = RequestMethod.GET)
	@ResponseBody
	public Object downLoadFileToServer(@RequestParam("url") String url, @RequestParam("filename") String outputFileName)
			throws Exception {
		Map<String, Object> resMap = new HashMap<String, Object>();
		int index = url.lastIndexOf("/");
		String sourceFileName = "";
		if (index > 0) {
			sourceFileName = url.substring(index + 1);
		}
		if (sourceFileName.trim().length() == 0 || sourceFileName.indexOf(".") == -1) {
			// resMap.put("error", "The url " + url + " is not correct!");
			// return resMap;
		}
		if (outputFileName.indexOf(".") == -1) {
			resMap.put("error", "The output file name " + outputFileName + " is not correct!");
			return resMap;
		}

		String downloadFilePath = outputFileName;
		if (!outputFileName.matches("([a-zA-Z]:)?(\\\\[a-zA-Z0-9_.-]+)+\\\\?")) {
			downloadFilePath = System.getProperty("user.dir") + "/" + outputFileName;
		}
		long s = System.currentTimeMillis();
		url = url.replaceAll(" ", "%20");
		URL httpUrl = new URL(url);
		FileUtils.copyURLToFile(httpUrl, new File(downloadFilePath));
		long e = System.currentTimeMillis();
		resMap.put("code", 200);
		resMap.put("message", "文件下载成功, 花费时间:" + (e - s) + "ms");
		resMap.put("filename", outputFileName);
		resMap.put("pathOnServer", downloadFilePath);

		return resMap;
	}

	@ApiOperation(value = "将json文件保存为Microsoft Word文件", notes = "将json文件保存为Microsoft Word文件")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "url", value = "url", paramType = "query", required = false, dataType = "string", defaultValue = "video1.json"),
			@ApiImplicitParam(name = "optional", value = "optional", paramType = "query", required = true, dataType = "string", defaultValue = "optional"),
			@ApiImplicitParam(name = "fileName", value = "xxx.docx", paramType = "query", required = false, dataType = "string", defaultValue = "d1.docx") })
	@RequestMapping(value = "/json2word", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> json2word(@RequestParam("url") String url, @RequestParam("optional") String optional,
			@RequestParam("fileName") String fileName) throws Exception {

		Map<String, Object> resMap = new HashMap<String, Object>();
		String outputFile = System.getProperty("user.dir") + "/" + fileName;
		
		if (url.toLowerCase().startsWith("http")) {
			url = FileUtil.downloadFile(url);
		}
		String txtFromURL = JsonSriptParser.getJsonString(url);
		JSONObject jsonObj = new JSONObject(txtFromURL);
		JSONObject requestObj = JsonSriptParser.getJsonObjectbyName(jsonObj, "request");	 
		JSONArray frameArray = (JSONArray) requestObj.get("frames");
		String s = frameArray.toString(); 
		s += "\n";
		s += "保存ok";
		s += "\n";
		s += "v0.12";


		boolean bResult = FileUtil.json2word(url,s,outputFile);
		if (bResult) {
			resMap.put("code", 200);
			resMap.put("message", "保存docx成功");
			resMap.put("pathOnServer", outputFile);
		} else {
			resMap.put("code", 500);
			resMap.put("message", "保存docx失败");
		}
		return resMap;
	}

	@ApiOperation(value = "保存为Microsoft Word文件", notes = "把一个标题和一段文本保存为一个docx文件")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "title", value = "title", paramType = "query", required = false, dataType = "string", defaultValue = "Document Title"),
			@ApiImplicitParam(name = "text", value = "text", paramType = "query", required = true, dataType = "string", defaultValue = "Document Paragraph Text"),
			@ApiImplicitParam(name = "fileName", value = "xxx.docx", paramType = "query", required = false, dataType = "string", defaultValue = "example1.docx") })
	@RequestMapping(value = "/save2word", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> save2Word(@RequestParam("title") String title, @RequestParam("text") String text,
			@RequestParam("fileName") String fileName) throws Exception {

		Map<String, Object> resMap = new HashMap<String, Object>();
		String outputFile = System.getProperty("user.dir") + "/" + fileName;
		boolean bResult = FileUtil.createAWordDoc(title, text, outputFile);
		if (bResult) {
			resMap.put("code", 200);
			resMap.put("message", "保存docx成功");
			resMap.put("pathOnServer", outputFile);
		} else {
			resMap.put("code", 500);
			resMap.put("message", "保存docx失败");
		}
		return resMap;
	}


	@RequestMapping(value =  "/signature", method = RequestMethod.GET)
	public ModelAndView signature() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("signature.html");
		return mv;
	}
		
	@ApiOperation(value = "获取文件资源列表", notes = "获取指定文件类型列表")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "filetype", value = "json/mp3/...", paramType = "query", required = true, dataType = "string", defaultValue = "json") })
	@RequestMapping(value = "/getResourceOnServer", method = RequestMethod.GET)
	@ResponseBody
	public Object getResourceOnServer(@RequestParam("filetype") String filetype) {
		Map<String, Object> responseMap = new HashMap<String, Object>();

		List<String> list = new ArrayList<String>();
		String curDir = System.getProperty("user.dir");
		File f = new File(curDir);
		File[] fs = f.listFiles();
		for (int i = 0; i < fs.length; ++i) {
			File file = fs[i];
			String name = file.getName();
			if (name.endsWith(filetype)) {
				list.add(name);
			}
		}
		responseMap.put("resource", list);
		return responseMap;
	}

}
