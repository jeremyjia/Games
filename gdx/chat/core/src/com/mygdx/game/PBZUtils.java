package com.mygdx.game;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Net;

import org.json.JSONArray;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class PBZUtils {

    public static String userName = null;
    public static String allMessage = "";

    public static String getToken() {
        return "f89b0eccf7" + "4c65a65513" + "60062c3e47" + "98d0df4577";
    }

    public static  String generateUserID() {
        if (userName != null) return userName;
        String str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            char ch = str.charAt(new Random().nextInt(str.length()));
            sb.append(ch);
        }
        userName = sb.toString();
        return userName;
    }

    public static  String getCurrentTime() {
        Date date = new Date();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return format.format(date);

    }

    public static String convertArray2Json(int[][] arr) {
        StringBuffer sb = new StringBuffer();
        boolean first = true;
        sb.append("[");
        for (int i = 0; i < arr.length; i++) {
            if (!first) {
                sb.append(",");
            }
            sb.append("[");
            for (int j=0;j<arr.length;j++)
            {
                sb.append(arr[i][j]+ ",");
            }
            sb.deleteCharAt(sb.length() - 1);
            sb.append("]");
            first = false;
        }
        sb.append("]");
        return sb.toString();
    }

    public static String[] toStringArray(JSONArray array) {
        if(array == null)
            return null;
        String[] arr = new String[array.length()];
        for(int i=0; i<arr.length; i++) {
            arr[i] = array.optString(i);
        }
        return arr;
    }

    public static String readMessage(String url) {
        Net.HttpRequest httpRequest = new Net.HttpRequest(Net.HttpMethods.GET);
        httpRequest.setUrl(url);
        httpRequest.setHeader("Content-Type", "text/plain");
        httpRequest.setHeader("charset", "UTF-8");
        httpRequest.setHeader("Cache-Control", "no-store");
        httpRequest.setHeader("Cache-Control", "no-cache");
        httpRequest.setContent(null);

        Gdx.net.sendHttpRequest(httpRequest, new Net.HttpResponseListener() {
            public void handleHttpResponse(Net.HttpResponse httpResponse) {
                int statusCode = httpResponse.getStatus().getStatusCode();
                System.out.println("readMessage() HTTP Request status: " + statusCode);
                String response = httpResponse.getResultAsString();
                int i = response.indexOf("body");
                if (i != -1) {
                    String sc = response.substring(i + 7, response.length() - 2);
                    allMessage = sc.replaceAll("\\\\n", "\n");
                }
            }
            public void failed(Throwable e) {
                System.out.println("HTTP request failed! " + e.getMessage());
            }
            @Override
            public void cancelled() {
            }
        });
        return allMessage;
    }

    public static void sendMessage(String url, String strMsg) {

        if (!strMsg.trim().equals("")) {
            System.out.println("Will send message " + strMsg);
            String requestContent = "{\"body\":\"" + strMsg + "\"}";
            Net.HttpRequest httpRequest = new Net.HttpRequest(Net.HttpMethods.POST);
            httpRequest.setUrl(url);
            httpRequest.setHeader("Content-Type", "text/plain");
            httpRequest.setHeader("Cache-Control", "no-store");
            httpRequest.setHeader("Cache-Control", "no-cache");
            httpRequest.setContent(requestContent);

            Gdx.net.sendHttpRequest(httpRequest, new Net.HttpResponseListener() {
                public void handleHttpResponse(Net.HttpResponse httpResponse) {
                    int statusCode = httpResponse.getStatus().getStatusCode();
                    System.out.println("sendMsg() HTTP Request status: " + statusCode);
                }
                public void failed(Throwable e) {
                    System.out.println("HTTP request failed!" + e.getMessage());
                }
                @Override
                public void cancelled() {
                }
            });
        }
    }
}
