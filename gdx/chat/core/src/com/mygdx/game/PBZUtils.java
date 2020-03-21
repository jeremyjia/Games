package com.mygdx.game;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Net;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.freetype.FreeTypeFontGenerator;

import org.json.JSONArray;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class PBZUtils {

    private static String userName = null;
    private static boolean m_Finished;
    private static FreeTypeFontGenerator generator;
    private static BitmapFont font;

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

    public static String getLoginUser(){
        if (userName != null)
            return userName;
        return generateUserID();
    }
    public static void resetLoginUser(String strUser){
        userName = strUser;
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

    public synchronized static void readMessage(String url, final IResponseListener listener) {
        Net.HttpRequest httpRequest = new Net.HttpRequest(Net.HttpMethods.GET);
        httpRequest.setUrl(url);
        httpRequest.setHeader("Content-Type", "text/plain");
        httpRequest.setHeader("charset", "UTF-8");
        httpRequest.setHeader("Cache-Control", "no-store");
        httpRequest.setHeader("Cache-Control", "no-cache");
        httpRequest.setContent(null);

        m_Finished = false;
        Gdx.net.sendHttpRequest(httpRequest, new Net.HttpResponseListener() {
            public void handleHttpResponse(Net.HttpResponse httpResponse) {
                int statusCode = httpResponse.getStatus().getStatusCode();
                System.out.println(listener.toString()+" readMessage() HTTP Request status: " + statusCode);
                String response = httpResponse.getResultAsString();
                int i = response.indexOf("body");
                if (i != -1) {
                    String rs = response.substring(i + 7, response.length() - 2);
                    String jsonString = rs.replaceAll("\\\\n", "\n");
                    listener.notify(jsonString);
                    m_Finished = true;
                }
            }
            public void failed(Throwable e) {
                System.out.println("HTTP request failed! " + e.getMessage());
                listener.onError(e);
                m_Finished = true;
            }
            @Override
            public void cancelled() {
            }
        });

        while (m_Finished == false){
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void sendMessage(String url, String strMsg) {

        if (!strMsg.trim().equals("")) {
            System.out.println("Will be sending message " + strMsg);
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
                    System.out.println("sendMessage() HTTP Request status: " + statusCode);
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

    public static interface IResponseListener {
        public void notify (String jsonString);
        public void onError(Throwable e);
    }

    //This method is not ready yet
    public static BitmapFont getGlobalFont() {
        if (font == null) {
            generator = new FreeTypeFontGenerator(Gdx.files.internal("cc.ttf"));
            FreeTypeFontGenerator.FreeTypeFontParameter parameter = new FreeTypeFontGenerator.FreeTypeFontParameter();
            parameter.characters += "口罩北京";
            parameter.size = 12;
            font = generator.generateFont(parameter);
        }
        return font;
    }
}
