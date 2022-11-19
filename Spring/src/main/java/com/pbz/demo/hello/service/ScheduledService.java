package com.pbz.demo.hello.service;

import java.io.File;
import java.net.URLDecoder;
import java.net.URLEncoder;

import org.apache.commons.text.StringEscapeUtils;
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

    private String errorMessage = "";

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
        writeServerLog("is tracking scheduled task! " + errorMessage);

        int rq = getRqStatus();
        System.out.println(rq);
        if (rq == -1) {
            System.out.println("Network error!");
            writeServerLog("Network error!");
            return;
        }

        if (rq == 2) {
            System.out.println("Server is processing a task!");
            writeServerLog("checked that some server is processing a task!");
            return;
        }

        if (rq == 1) {
            doTaskOfSetRq(2);
            String docStr = doTaskOfReadDocStrOnGitHub();
            try {
                writeServerLog("is creating video");
                doTaskOfCreateVideo(docStr);

                writeServerLog("is submitting video");
                doTaskOfSubmitVideoToGitHub();
                errorMessage = "";

            } catch (Throwable e) {
                System.out.println(e.getMessage());
                errorMessage = e.getMessage(); // Recode the error message
            } finally {
                doTaskOfSetRq(0);// Reset the status.
            }
        }
    }

    private void doTaskOfSubmitVideoToGitHub() throws Exception {
        String targetPath = System.getProperty("user.dir");
        String videoName = "SampleOnGithub.mp4";
        File mp4File = new File(targetPath + "/" + videoName);
        String strBase64DocStr = FileUtil.encryptToBase64(mp4File.getAbsolutePath());

        DataStreamStoreService.saveStreamData("743", "data:video/mp4;base64,", strBase64DocStr);

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

    private static void writeServerLog(String message) throws Exception {
        String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/1139435588"; // issue 760
        message = FileUtil.clearStr(message);
        message = URLEncoder.encode(message, "UTF-8");
        message = URLDecoder.decode(message, "UTF-8");

        String newString = FileUtil.getCurrentTime() + "_Server_" + FileUtil.getFQDN() + "_" + message;

        String logString = NetAccessUtil.doGetOnGitHub(url, "");

        if (!logString.isEmpty()) {
            int s = logString.indexOf("body");
            int e = logString.indexOf("reactions");
            logString = logString.substring(s + 7, e - 3);
            System.out.println(logString);
        }

        String filter = ";";
        String res = getNewLongString(logString, FileUtil.getFQDN(), newString, filter);
        res = StringEscapeUtils.escapeJson(res);
        NetAccessUtil.doPostOnGitHub(url, "POST", res);
    }

    private static String getNewLongString(String logString, String serverName, String newString, String filter) {
        String[] arr = logString.split(filter);
        int i = 0;
        boolean b = false;
        for (String s : arr) {
            if (s.contains(serverName)) {
                arr[i] = newString;
                b = true;
            }
            i++;
        }

        String res = "";
        if (!b) {
            res += logString;
            if (res.length() > 0 && !res.endsWith(filter)) {
                res += filter;
            }
            res += newString;
        } else {
            for (String s1 : arr) {
                res += s1 + filter;
            }
            res = res.substring(0, res.lastIndexOf(";"));
        }

        return res;
    }

    public static void main(String[] args) {
        System.out.println("UTest begin");
        try {
            writeServerLog("hello");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("UTest eng");
    }

}
