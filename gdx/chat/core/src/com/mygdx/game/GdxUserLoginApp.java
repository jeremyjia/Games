package com.mygdx.game;

import com.badlogic.gdx.Application;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.TextField;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Align;
import com.badlogic.gdx.utils.viewport.StretchViewport;

import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GdxUserLoginApp implements IGdxGame {

    public Stage stage;
    private Camera camera;
    private static final float WORLD_WIDTH = 640;
    private static final float WORLD_HEIGHT = 480;

    private Texture upTextureLogin;
    private Texture downTextureLogin;
    private Button btnLogin;
    private Texture upTextureLogout;
    private Texture downTextureLogout;
    private Button btnLogout;
    private Label labelLoginUserName;
    private Label labelLoginPassword;
    private Label labelInfo;

    //TextFile for UserName and Password:
    private TextField textFieldUserName;
    private TextField textFieldPassword;
    private Pixmap pixmapArea;
    private Pixmap pixmapField;
    private Pixmap pixmapCur;
    private BitmapFont fontFromFile;

    private Map<String, String> regUserMap = new HashMap<String, String>();
    private String curLoginUser = "";
    private String curLoginUserPwd = "";
    private String urlRegUsers = "https://api.github.com/repos/jeremyjia/Games/issues/comments/595100384";
    private String urlLogUsers = "https://api.github.com/repos/jeremyjia/Games/issues/comments/592918032";

    @Override
    public void initGame(GdxGameAdapter adapter) {
        create();

    }

    @Override
    public void create() {

        Gdx.app.setLogLevel(Application.LOG_INFO);
        camera = new OrthographicCamera();
        stage = new Stage(new StretchViewport(WORLD_WIDTH, WORLD_HEIGHT, camera));

        BitmapFont font = new BitmapFont();
        font.getData().markupEnabled = true;
        labelLoginUserName = new Label("[YELLOW]UserName:" + "",
                new Label.LabelStyle(font, null));
        labelLoginUserName.setPosition(50, 400);

        labelLoginPassword = new Label("[YELLOW]Password:" + "",
                new Label.LabelStyle(font, null));
        labelLoginPassword.setPosition(50, 300);

        labelInfo = new Label("", new Label.LabelStyle(font, null));
        labelInfo.setPosition(50, 250);


        fontFromFile = new BitmapFont(Gdx.files.internal("chat.fnt"), Gdx.files.internal("chat.png"), false);
        pixmapArea = new Pixmap(150, 100, Pixmap.Format.RGB888);
        pixmapArea.setColor(Color.CORAL);
        pixmapArea.fill();

        pixmapField = new Pixmap(150, 100, Pixmap.Format.RGB888);
        pixmapField.setColor(Color.GRAY);
        pixmapField.fill();

        pixmapCur = new Pixmap(3, 100, Pixmap.Format.RGB888);
        pixmapCur.setColor(Color.GREEN);
        pixmapCur.fill();

        TextField.TextFieldStyle textAreaStyle = new TextField.TextFieldStyle(fontFromFile,
                Color.BLACK, new TextureRegionDrawable(new TextureRegion(
                new Texture(pixmapCur))),
                new TextureRegionDrawable(new TextureRegion(new Texture(pixmapArea))),
                new TextureRegionDrawable(new TextureRegion(new Texture(
                        pixmapArea))));

        TextField.TextFieldStyle textFieldStyle = new TextField.TextFieldStyle(fontFromFile,
                Color.BLACK, new TextureRegionDrawable(new TextureRegion(
                new Texture(pixmapCur))),
                new TextureRegionDrawable(new TextureRegion(new Texture(pixmapField))),
                new TextureRegionDrawable(new TextureRegion(new Texture(
                        pixmapField))));

        textFieldUserName = new TextField("", textFieldStyle);
        textFieldUserName.setSize(350, 50);
        textFieldUserName.setPosition(150, 400);
        textFieldUserName.setMessageText("Enter UserName");
        textFieldUserName.setAlignment(Align.left);

        textFieldPassword = new TextField("", textFieldStyle);
        textFieldPassword.setSize(350, 50);
        textFieldPassword.setPosition(150, 300);
        textFieldPassword.setMessageText("Enter Password");
        textFieldUserName.setAlignment(Align.left);
        textFieldPassword.setPasswordMode(true);
        textFieldPassword.setPasswordCharacter('*');

        upTextureLogin = new Texture(Gdx.files.internal("login1.png"));
        downTextureLogin = new Texture(Gdx.files.internal("login2.png"));
        final Button.ButtonStyle styleLogin = new Button.ButtonStyle();
        styleLogin.up = new TextureRegionDrawable(new TextureRegion(upTextureLogin));
        styleLogin.down = new TextureRegionDrawable(new TextureRegion(downTextureLogin));
        btnLogin = new Button(styleLogin);
        btnLogin.setPosition(150, 50);
        btnLogin.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                Gdx.app.log("Login:", "xddbg...");
                curLoginUser = textFieldUserName.getText();
                curLoginUserPwd = textFieldPassword.getText();
                if (!validateUserInpute()) {
                    return;
                }
                logOn();
            }
        });

        upTextureLogout = new Texture(Gdx.files.internal("logout1.png"));
        downTextureLogout = new Texture(Gdx.files.internal("logout2.png"));
        Button.ButtonStyle styleLogout = new Button.ButtonStyle();
        styleLogout.up = new TextureRegionDrawable(new TextureRegion(upTextureLogout));
        styleLogout.down = new TextureRegionDrawable(new TextureRegion(downTextureLogout));
        btnLogout = new Button(styleLogout);
        btnLogout.setPosition(150, 50);
        btnLogout.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                Gdx.app.log("Logout:", "按钮被点击了");
                logOut();
            }
        });

        stage.addActor(btnLogin);
        stage.addActor(labelInfo);
        stage.addActor(labelLoginUserName);
        stage.addActor(textFieldUserName);
        stage.addActor(labelLoginPassword);
        stage.addActor(textFieldPassword);
        //Set input to Stage to make sure response for the button click event.
        Gdx.input.setInputProcessor(stage);

    }

    private boolean validateUserInpute() {
        if ("".equalsIgnoreCase(curLoginUser)) {
            String errorMessage = "Please input UserName";
            labelInfo.setText("[YELLOW]Error: [][MAROON]" + errorMessage);
            return false;
        }
        if ("".equalsIgnoreCase(curLoginUserPwd)) {
            String errorMessage = "Please input Password";
            labelInfo.setText("[YELLOW]Error: [][MAROON]" + errorMessage);
            return false;
        }

        boolean bRegistered = false;
        String password = "";
        for (Map.Entry<String, String> me : regUserMap.entrySet()) {
            if (curLoginUser.equalsIgnoreCase(me.getKey())) {
                password = me.getValue();
                bRegistered = true;
            }
        }
        if (!bRegistered) {
            String errorMessage1 = "User " + curLoginUser + " not register! You can use below link to register:";
            String errorMessage2 = "\n https://jeremyjia.github.io/Games/issues/4/register.html";
            labelInfo.setText("[YELLOW]Error: [][MAROON]" + errorMessage1 + "[][GREEN]" + errorMessage2);
            return false;
        }

        if (!curLoginUserPwd.equals(password)) {
            String errorMessage = "The password is not correct!";
            labelInfo.setText("[YELLOW]Error: [][MAROON]" + errorMessage);
            return false;
        }
        return true;
    }


    @Override
    public void resize(int width, int height) {

    }

    @Override
    public void render() {
        stage.act();
        stage.draw();
    }

    @Override
    public void pause() {

    }

    @Override
    public void resume() {

    }

    @Override
    public void dispose() {
        upTextureLogin.dispose();
        downTextureLogin.dispose();
        upTextureLogout.dispose();
        downTextureLogout.dispose();
        stage.dispose();
    }

    @Override
    public void notifyBefore() {

    }

    @Override
    public void notifyAfter() {
       //etRegisteredUser();
        getMockRegisteredUser();
    }

    @Override
    public boolean keyDown(int keycode) {
        return false;
    }

    @Override
    public boolean keyUp(int keycode) {
        return false;
    }

    @Override
    public boolean keyTyped(char character) {
        return false;
    }

    @Override
    public boolean touchDown(int screenX, int screenY, int pointer, int button) {
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

    private void getRegisteredUser() {
        PBZUtils.readMessage(urlRegUsers, new PBZUtils.IResponseListener() {
            @Override
            public void notify(String str) {
                JSONObject jsonObj = new JSONObject(str);
                JSONArray users = jsonObj.getJSONArray("users");
                for (int i = 0; i < users.length(); i++) {
                    JSONObject jb = users.getJSONObject(i);
                    String name = jb.getString("name");
                    String password = jb.getString("password");
                    regUserMap.put(name, password);
                }
            }

            @Override
            public void onError(Throwable e) {
            }
        });

    }

    private void getMockRegisteredUser() {
        String s = "{\"users\":[{\"name\":\"u1\",\"password\":\"u1\",\"registerTime\":\"2020-03-05 22:06:28\"},{\"name\":\"贾鹏\",\"password\":\"password\",\"registerTime\":\"2020-03-05 22:50:57\"},{\"name\":\"Jeremy\",\"password\":\"Install@bj1\",\"registerTime\":\"2020-03-05 23:48:16\"},{\"name\":\"测试\",\"password\":\"123456\",\"registerTime\":\"2020-03-06 01:04:52\"},{\"name\":\"xd\",\"password\":\"xd12345\",\"registerTime\":\"2020-03-06 09:55:46\"},{\"name\":\"xy\",\"password\":\"123456\",\"registerTime\":\"2020-03-08 10:14:55\"}]}";

        JSONObject jsonObj = new JSONObject(s);
        JSONArray users = jsonObj.getJSONArray("users");
        for (int i = 0; i < users.length(); i++) {
            JSONObject jb = users.getJSONObject(i);
            String name = jb.getString("name");
            String password = jb.getString("password");
            regUserMap.put(name, password);
        }
    }


    private void logOut() {
        PBZUtils.readMessage(urlLogUsers, new PBZUtils.IResponseListener() {
            @Override
            public void notify(String str) {
                JSONArray userArray = new JSONObject(str).getJSONArray("users");

                List<JSONObject> newJsonObjList = new ArrayList<JSONObject>();
                for (int i = 0; i < userArray.length(); i++) {
                    JSONObject jb = userArray.getJSONObject(i);
                    String name = jb.getString("name");
                    if (name.equalsIgnoreCase(curLoginUser)) {
                        jb.put("isLogin", false);
                    }
                    newJsonObjList.add(jb);
                }

                Map<String, Object> map = new HashMap<String, Object>();
                map.put("users", newJsonObjList);
                String jString = new JSONObject(map).toString();
                System.out.println(jString);
                String newJson = StringEscapeUtils.escapeJava(jString);
                PBZUtils.sendMessage(urlLogUsers, newJson);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                //Update UI
                PBZUtils.resetLoginUser(null);
                btnLogout.remove();
                labelInfo.setText("");
                stage.addActor(btnLogin);
                stage.addActor(labelLoginUserName);
                stage.addActor(textFieldUserName);
                stage.addActor(labelLoginPassword);
                stage.addActor(textFieldPassword);

            }

            @Override
            public void onError(Throwable e) {
            }
        });

    }

    private void logOn() {
        PBZUtils.readMessage(urlLogUsers, new PBZUtils.IResponseListener() {
            @Override
            public void notify(String str) {
                JSONArray userArray = new JSONObject(str).getJSONArray("users");

                boolean bExist = false;
                List<JSONObject> newJsonObjList = new ArrayList<JSONObject>();
                for (int i = 0; i < userArray.length(); i++) {
                    JSONObject jb = userArray.getJSONObject(i);
                    String name = jb.getString("name");
                    if (name.equalsIgnoreCase(curLoginUser)) {
                        bExist = true;
                        jb.put("LastloginTime", PBZUtils.getCurrentTime());
                        jb.put("isLogin", true);
                    }
                    newJsonObjList.add(jb);
                }
                if (!bExist) {
                    JSONObject newObj = new JSONObject();
                    newObj.put("name", curLoginUser);
                    newObj.put("LastloginTime", PBZUtils.getCurrentTime());
                    newObj.put("isLogin", true);
                    newJsonObjList.add(newObj);
                }

                //Prepare a new jsonString
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("users", newJsonObjList);
                String jString = new JSONObject(map).toString();
                System.out.println(jString);
                String newJson = StringEscapeUtils.escapeJava(jString);
                PBZUtils.sendMessage(urlLogUsers, newJson);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                labelInfo.setText("[YELLOW]Current LoginUser: [][MAROON]" + curLoginUser);
                PBZUtils.resetLoginUser(curLoginUser);
                btnLogin.remove();
                labelLoginUserName.remove();
                labelLoginPassword.remove();
                textFieldUserName.remove();
                textFieldPassword.remove();
                stage.addActor(btnLogout);
            }

            @Override
            public void onError(Throwable e) {
            }
        });
    }
}
