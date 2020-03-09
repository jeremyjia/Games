package com.mygdx.game;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Timer;
import com.badlogic.gdx.utils.viewport.StretchViewport;

import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import static com.badlogic.gdx.Gdx.*;


public class GdxFiveChessApp implements IGdxGame {

    private Stage stage;
    private Camera camera;
    private SpriteBatch batch;
    private Texture dashboard;
    private Pixmap pixmap;
    private Pixmap pixmapBtn;
    private TextureRegion region;
    private Image image;

    private Label labelLoginUser;
    private Label labelBlackUser;
    private Label labelWhiteuser;
    private TextButton btnJoin;
    private TextButton btnLeave;
    private TextButton btnClearAll;
    private TextButton.TextButtonStyle btnGrayStyle;
    private TextButton.TextButtonStyle btnStyle;
    private TextureRegionDrawable drawable;

    private static final int NUM = 19;
    private static final int nY = 20;
    private static final int nX = 20;
    private static final int nCell = 20;
    private static final int nRadius = nCell/2-1;
    private int[][] allChess = new int[NUM][NUM];

    private String blackUser="";
    private String whiteUser="";
    private String loginUser = "";
    private String userDone = "";
    private int nWidth, nHeight;
    private boolean isBlackRun;
    private String m_curPosKey;
    private int m_x,m_y;
    private Timer timer;
    private String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526778839?access_token="+PBZUtils.getToken();

    @Override
    public void create() {
        batch = new SpriteBatch();
        camera = new OrthographicCamera();
        stage = new Stage(new StretchViewport(640, 480, camera));

        pixmap = new Pixmap(640, 480, Pixmap.Format.RGBA8888);
        dashboard = new Texture(pixmap);
        Gdx.input.setInputProcessor(this);
        region = new TextureRegion(dashboard, 640, 480);
        image = new Image(region);
        stage.addActor(image);

        nWidth = Gdx.graphics.getWidth();
        nHeight = Gdx.graphics.getHeight();
        System.out.println(nWidth+","+nHeight);

        loginUser = PBZUtils.generateUserID();
        isBlackRun = true;
        timer = new Timer();
        timer.scheduleTask(new Timer.Task() {
            @Override
            public void run() {
                readMsg();

                labelBlackUser.setText("[BLACK]BlackUser: [][MAROON]"+blackUser);
                labelWhiteuser.setText("[WHITE]WhiteUser: [][MAROON]"+whiteUser);

                //Join button status
                if ((blackUser.isEmpty() && !loginUser.equalsIgnoreCase(whiteUser))
                        ||(whiteUser.isEmpty()&& !loginUser.equalsIgnoreCase(blackUser)))
                {
                    btnJoin.setDisabled(false);
                    btnJoin.setStyle(btnStyle);
                }else{
                    btnJoin.setDisabled(true);
                    btnJoin.setStyle(btnGrayStyle);
                }

                //Leave button status
                if ((!blackUser.isEmpty() && loginUser.equalsIgnoreCase(blackUser))
                        || (!whiteUser.isEmpty()&&loginUser.equalsIgnoreCase(whiteUser))){
                    btnLeave.setDisabled(false);
                    btnLeave.setStyle(btnStyle);
                }else{
                    btnLeave.setDisabled(true);
                    btnLeave.setStyle(btnGrayStyle);
                }

            }
        }, 1f, 2f);

        timer.stop();
        pixmapBtn = new Pixmap(70, 30, Pixmap.Format.RGB888);
        pixmapBtn.setColor(Color.CORAL);
        pixmapBtn.fill();
        drawable = new TextureRegionDrawable(new TextureRegion(new Texture(pixmapBtn)));
        btnStyle = new TextButton.TextButtonStyle(drawable, null, null,
                new BitmapFont());

        pixmapBtn.setColor(Color.GRAY);
        pixmapBtn.fill();
        TextureRegionDrawable gray = new TextureRegionDrawable(new TextureRegion(new Texture(pixmapBtn)));
        btnGrayStyle = new TextButton.TextButtonStyle(gray, null, null,
                new BitmapFont());

        btnJoin = new TextButton("Join", btnStyle);
        btnJoin.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                if (!btnJoin.isDisabled()){
                    System.out.println("btnJoin");

                    String arr = PBZUtils.convertArray2Json(allChess);
                    String json= "";
                    if (blackUser.isEmpty()){
                        json = createJsonByMap(isBlackRun, m_curPosKey, loginUser, arr, loginUser, whiteUser);
                    }else {
                        json = createJsonByMap(isBlackRun, m_curPosKey, loginUser, arr, blackUser, loginUser);
                    }
                    String newJson = StringEscapeUtils.escapeJava(json);
                    PBZUtils.sendMessage(url, newJson);
                }
            }
        });

        btnLeave = new TextButton("Leave", btnStyle);
        btnLeave.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                if (!btnLeave.isDisabled()){
                    System.out.println("btnLeave");

                    String arr = PBZUtils.convertArray2Json(allChess);
                    String json= "";
                    if (loginUser.equalsIgnoreCase(blackUser)){
                        json = createJsonByMap(isBlackRun, m_curPosKey, loginUser, arr, "", whiteUser);
                    }else {
                        json = createJsonByMap(isBlackRun, m_curPosKey, loginUser, arr, blackUser, "");
                    }
                    String newJson = StringEscapeUtils.escapeJava(json);
                    PBZUtils.sendMessage(url, newJson);
                }
            }
        });

        btnClearAll = new TextButton("Clear All", btnStyle);
        btnClearAll.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                    System.out.println("ClearAll");
                    int[][] emptyData = new int[NUM][NUM];
                    for (int i = 0; i < NUM; i++) {
                        for (int j = 0; j < NUM; j++){
                            emptyData[i][j]= 0;
                       }
                    }
                    String arr = PBZUtils.convertArray2Json(emptyData);
                    String json = createJsonByMap(true, m_curPosKey, loginUser, arr, "", "");
                    String newJson = StringEscapeUtils.escapeJava(json);
                    PBZUtils.sendMessage(url, newJson);

            }
        });

        btnJoin.setDisabled(true);
        btnJoin.setStyle(btnGrayStyle);
        btnLeave.setDisabled(true);
        btnLeave.setStyle(btnGrayStyle);

        BitmapFont font = new BitmapFont();
        font.getData().markupEnabled = true;
        labelLoginUser = new Label("[YELLOW]LoginUser: [][MAROON]"+loginUser,
                new Label.LabelStyle(font, null));

        labelBlackUser = new Label("[BLACK]BlackUser: [][MAROON]",
                new Label.LabelStyle(font, null));

        labelWhiteuser = new Label("[WHITE]WhiteUser: [][MAROON]",
                new Label.LabelStyle(font, null));

        //Set position
        labelLoginUser.setPosition(22*nCell, 22*nCell);
        labelBlackUser.setPosition(22*nCell, 20*nCell);
        labelWhiteuser.setPosition(22*nCell, 18*nCell);
        btnJoin.setPosition(22*nCell, 15*nCell);
        btnLeave.setPosition(26*nCell, 15*nCell);
        btnClearAll.setPosition(22*nCell, 4*nCell);

        stage.addActor(labelLoginUser);
        stage.addActor(labelBlackUser);
        stage.addActor(labelWhiteuser);
        stage.addActor(btnJoin);
        stage.addActor(btnLeave);
        stage.addActor(btnClearAll);

        stage.setActionsRequestRendering(true);
        InputMultiplexer inputMultiplexer = new InputMultiplexer();
        inputMultiplexer.addProcessor(stage);
        inputMultiplexer.addProcessor(this);
        Gdx.input.setInputProcessor(inputMultiplexer);

    }

    @Override
    public void render() {
        Gdx.gl.glClearColor(66 / 255f, 155 / 255f, 88 / 255f, 0.5f);
        gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        batch.begin();
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

                    if (m_x == i && m_y == j)
                    {
                        pixmap.setColor(Color.RED);
                        pixmap.drawRectangle(nX+ i*nCell, nY+j*nCell, nCell,nCell);

                    }
                    dashboard.draw(pixmap,0,0);
                }else if (this.allChess[i][j] == 2){
                    pixmap.setColor(Color.WHITE);
                    pixmap.fillCircle(nX + i*nCell+nCell/2, nY+j*nCell+nCell/2,nRadius);

                    if (m_x == i && m_y == j)
                    {
                        pixmap.setColor(Color.GREEN);
                        pixmap.drawRectangle(nX+ i*nCell, nY+j*nCell, nCell,nCell);
                    }
                    dashboard.draw(pixmap,0,0);
                }
            }
        }

        stage.act();
        stage.draw();
        batch.end();

    }

    @Override
    public void pause() {

    }

    @Override
    public void resume() {
    }

    @Override
    public void dispose() {
        pixmap.dispose();
        pixmapBtn.dispose();
        batch.dispose();
        timer.stop();
        timer.clear();
    }

    @Override
    public void notifyBefore() {
        timer.stop();
    }

    @Override
    public void notifyAfter() {
        timer.start();
    }

    @Override
    public void resize (int width, int height) {
        app.log("MyTag", "resize: " +width+","+ height);
        nWidth = width;
        nHeight = height;
        region.setRegionWidth(nWidth);
        region.setRegionHeight(nHeight);
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

        float xx = (float) ((640.0/(float)nWidth)*(float)screenX);
        float yy = (float) ((480.0/(float)nHeight)*(float)screenY);
        int newScreenX = (int) xx;
        int newScreenY = (int) yy;
        int x = (newScreenX - nX)/nCell;
        int y =  (newScreenY - nY)/nCell;

        if (x>NUM-1||y>NUM-1)
            return false;

        if(btnLeave.isDisabled()){
            System.out.println("Not join yet!");
            return false;
        }

        if (allChess[x][y]==1 || allChess[x][y] == 2) return false;
        app.log("MyTag", "touchDown: (" + x+","+y+")");

        if (loginUser.equalsIgnoreCase(whiteUser) && isBlackRun) return false;
        if (loginUser.equalsIgnoreCase(blackUser) && !isBlackRun) return false;

        if (isBlackRun){
            allChess[x][y]=1;
        }
        else{
            allChess[x][y]=2;
        }
        isBlackRun = !isBlackRun;

        String curPos = x+","+y;
        String arr = PBZUtils.convertArray2Json(allChess);
        String json = createJsonByMap(isBlackRun, curPos,loginUser,arr, blackUser, whiteUser);
        System.out.println("JSON:"+json);
        String newJson = StringEscapeUtils.escapeJava(json);
        PBZUtils.sendMessage(url, newJson);

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

    private void readMsg() {
        PBZUtils.readMessage(url, new PBZUtils.IResponseListener() {
            @Override
            public void notify(String jsonString) {
                getChessData(jsonString);
            }

            @Override
            public void onError(Throwable e) {
            }
        });
    }

    private void getChessData(String strMsg) {
        String jsonString = StringEscapeUtils.unescapeJson(strMsg);
        JSONObject jsonObj = new JSONObject(jsonString);
        userDone = jsonObj.getString("user");
        Object obj = jsonObj.get("isBlackRunKey");
        if(obj instanceof Integer){
            this.isBlackRun = true;
        }else if(obj instanceof Boolean){
            this.isBlackRun = ((Boolean) obj).booleanValue();
        }
        m_curPosKey = jsonObj.getString("curPosKey");
        String[] point = m_curPosKey.split(",");
        m_x = Integer.parseInt(point[0]);
        m_y = Integer.parseInt(point[1]);

        blackUser = jsonObj.getString("blackUser");
        whiteUser = jsonObj.getString("whiteUser");

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

    private String createJsonByMap(boolean isBlackRun, String curPos, String user, String arr, String blackUser, String whiteUser) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isBlackRunKey",isBlackRun);
        map.put("curPosKey", curPos);
        map.put("user", user);
        map.put("blackUser",blackUser);
        map.put("whiteUser", whiteUser);
        map.put("arrayDataKey", arr);
        JSONObject jsonObj = new JSONObject(map);
        return jsonObj.toString();
    }

    @Override
    public void initGame(GdxGameAdapter adapter) {
        create();
        adapter.registerStage(stage);
    }
}
