package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.Net;
import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.utils.Timer;
import com.badlogic.gdx.utils.viewport.StretchViewport;

import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import static com.badlogic.gdx.Gdx.*;


public class GdxFiveChessApp extends ApplicationAdapter implements InputProcessor {

    private Camera camera;
    public SpriteBatch batch;
    Texture img;
    Texture dashboard;
    boolean bPressed = false;
    Pixmap pixmap;

    Stage stage;
    TextureRegion region;
    Image image;

    private static final int NUM = 19;
    private static final int nY = 20;
    private static final int nX = 20;
    private static final int nCell = 20;
    private  static final int nRadius = nCell/2-1;
    private int[][] allChess = new int[NUM][NUM];

    int nWidth, nHeight;
    boolean isBlackRun;
    String strMsg;
    private Timer timer;
    String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526778839?access_token="+getToken();

    @Override
    public void create() {
        batch = new SpriteBatch();
        img = new Texture("badlogic.jpg");
        camera = new OrthographicCamera();
        stage = new Stage(new StretchViewport(640, 480, camera));

        pixmap = new Pixmap(640, 480, Pixmap.Format.RGBA8888);

        dashboard = new Texture(pixmap);
        input.setInputProcessor(this);
        region = new TextureRegion(dashboard, 640, 480);
        image = new Image(region);
        stage.addActor(image);

        nWidth = Gdx.graphics.getWidth();
        nHeight = Gdx.graphics.getHeight();
        System.out.println(nWidth+","+nHeight);
        isBlackRun = true;
        strMsg = "";
        timer = new Timer();
        timer.scheduleTask(new Timer.Task() {
            @Override
            public void run() {
                readMsg();
            }
        }, 1f, 2f);
        stage.setActionsRequestRendering(true);

    }

    @Override
    public void render() {
        gl.glClearColor(0, 1, 0, 1);
        gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        batch.begin();
        if(bPressed)
        {
            //batch.draw(img, X, Y);
        }
        pixmap.setColor(Color.GRAY);
        pixmap.fillRectangle(nX,nY,nCell*NUM+5,nCell*NUM+5);
        dashboard.draw(pixmap, 0 ,0);

        pixmap.setColor(Color.BLUE);
        for (int i=0; i<NUM;i++){
            pixmap.drawLine(nX+i*nCell+nCell/2, nY+nCell/2, nX+i*nCell+nCell/2, nY+(NUM-1)*nCell+nCell/2);
            pixmap.drawLine(nX+nCell/2, nY+i*nCell+nCell/2, nX+(NUM-1)*nCell+nCell/2, nY+i*nCell+nCell/2);
            dashboard.draw(pixmap,0,0);
        }

        for (int i = 0; i < NUM; i++) {
            for (int j = 0; j < NUM; j++) {
                if (this.allChess[i][j] == 1) {
                    pixmap.setColor(Color.BLACK);
                    pixmap.fillCircle(nX+ i*nCell+nCell/2, nY+j*nCell+nCell/2,nRadius);
                    dashboard.draw(pixmap,0,0);

                }else if (this.allChess[i][j] == 2){
                    pixmap.setColor(Color.WHITE);
                    pixmap.fillCircle(nX + i*nCell+nCell/2, nY+j*nCell+nCell/2,nRadius);
                    dashboard.draw(pixmap,0,0);
                }
            }
        }

        //batch.draw(dashboard, 0, 0);
        stage.act();
        stage.draw();
        batch.end();

    }

    @Override
    public void dispose() {
        pixmap.dispose();
        batch.dispose();
        img.dispose();
        timer.stop();
    }

    @Override
    public void resize (int width, int height) {
        app.log("MyTag", "resize: " +width+","+ height);
        nWidth = width;
        nHeight = height;
        region.setRegionWidth(nWidth);
        region.setRegionHeight(height);
    }

    @Override
    public boolean keyDown(int keycode) {
        app.log("MyTag", "KeyDown: " + keycode);
        return false;
    }

    @Override
    public boolean keyUp(int keycode) {
        app.log("MyTag", "keyUp: " + keycode);
        return false;
    }

    @Override
    public boolean keyTyped(char character) {
        return false;
    }

    @Override
    public boolean touchDown(int screenX, int screenY, int pointer, int button) {
        bPressed = true;
        float xx = (float) ((640.0/(float)nWidth)*(float)screenX);
        float yy = (float) ((480.0/(float)nHeight)*(float)screenY);
        int newScreenX = (int) xx;
        int newScreenY = (int) yy;
        int x = (newScreenX - nX)/nCell;
        int y =  (newScreenY - nY)/nCell;

        if (allChess[x][y]==1 || allChess[x][y] == 2) return false;
        app.log("MyTag", "touchDown: (" + x+","+y+")");

        if (x>NUM-1||y>NUM-1)
            return false;

        if (isBlackRun){
            allChess[x][y]=1;
        }
        else{
            allChess[x][y]=2;
        }
        isBlackRun = !isBlackRun;

        String curPos = x+","+y;
        String user = "Jeremyjia"; //Hard code
        String arr = convertArray2Json(allChess);
        String json = createJsonByMap(isBlackRun, curPos,user,arr);
        System.out.println("JSON:"+json);
        String newJson = StringEscapeUtils.escapeJava(json);
        sendMsg(newJson);

        return false;
    }

    @Override
    public boolean touchUp(int screenX, int screenY, int pointer, int button) {
        return false;
    }

    @Override
    public boolean touchDragged(int screenX, int screenY, int pointer) {
        return false;
    }

    @Override
    public boolean mouseMoved(int screenX, int screenY) {
        return false;
    }

    @Override
    public boolean scrolled(int amount) {
        return false;
    }

    private String getToken() {
        return "f89b0eccf7" + "4c65a65513" + "60062c3e47" + "98d0df4577";
    }

    private void readMsg() {
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
                System.out.println("readMsg() HTTP Request status: " + statusCode);
                String s = httpResponse.getResultAsString();
                int i = s.indexOf("body");
                if (i != -1) {
                    String sc = s.substring(i + 7, s.length() - 2);
                    strMsg = sc.replaceAll("\\\\n", "\n");
                    getChessData(strMsg);
                }
            }
            public void failed(Throwable t) {
                System.out.println("HTTP request failed! "+t.getMessage());
            }
            @Override
            public void cancelled() {
            }
        });
    }

    private void sendMsg(String str) {

        if (!str.trim().equals("")) {
            System.out.println("Will send message " + str);
            String requestContent = "{\"body\":\"" + str + "\"}";
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
                public void failed(Throwable t) {
                    System.out.println("HTTP request failed!"+t.getMessage());
                }
                @Override
                public void cancelled() {
                }
            });
        }
    }

    private void getChessData(String strMsg) {
        String jsonString = StringEscapeUtils.unescapeJson(strMsg);
        JSONObject jsonObj = new JSONObject(jsonString);
        String user = jsonObj.getString("user");
        Object obj = jsonObj.get("isBlackRunKey");
        if(obj instanceof Integer){
            this.isBlackRun = true;
        }else if(obj instanceof Boolean){
            this.isBlackRun = ((Boolean) obj).booleanValue();
        }
        //Boolean isBlackRun = jsonObj.getBoolean("isBlackRunKey");
        String curPosKey = jsonObj.getString("curPosKey");
        System.out.println(user+" "+isBlackRun+" "+curPosKey);
        String array = jsonObj.getString("arrayDataKey");

        JSONArray w = new JSONArray(array);
        for(int i = 0; i < w.length(); i ++)
        {
            JSONArray h = w.getJSONArray(i);
            for(int j = 0; j < h.length(); j ++){
                allChess[i][j] = h.getInt(j);
            }
        }
        Gdx.graphics.requestRendering();
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

    public static String createJsonByMap(boolean isBlackRun, String curPos, String user, String arr) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isBlackRunKey",isBlackRun);
        map.put("curPosKey", curPos);
        map.put("user", user);
        map.put("arrayDataKey", arr);
        JSONObject jsonObj = new JSONObject(map);
        return jsonObj.toString();
    }

}
