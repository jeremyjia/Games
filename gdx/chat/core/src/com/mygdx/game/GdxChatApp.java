package com.mygdx.game;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.CheckBox;
import com.badlogic.gdx.scenes.scene2d.ui.TextArea;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.ui.TextField;
import com.badlogic.gdx.scenes.scene2d.utils.ChangeListener;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Align;
import com.badlogic.gdx.utils.Timer;
import com.badlogic.gdx.utils.viewport.StretchViewport;
import com.mygdx.game.net.JavaWebSocketClient;

import org.java_websocket.WebSocket;

import java.net.URISyntaxException;

public class GdxChatApp implements IGdxGame {

    private static final String version = "v:0.0.8";
    public Stage stage;
    public boolean bIsWs = false;
    private Camera camera;
    private TextArea textArea;
    private TextField textField;
    private TextButton btnSend;
    private TextButton btnClear;
    private SpriteBatch batch;
    private BitmapFont font;
    private BitmapFont fontFromFile;
    private Pixmap pixmapArea;
    private Pixmap pixmapField;
    private Pixmap pixmapCur;
    private Pixmap pixmapBtnUp;
    private Texture textureBtnUp;
    // 复选框选中状态的纹理
    private Texture checkboxOnTexture;
    private Texture checkboxOffTexture;
    private BitmapFont bitmapFont;
    private Pixmap pixmapCheckBoxOn;
    private Pixmap pixmapCheckBoxOff;
    private CheckBox checkBox;
    private JavaWebSocketClient wsClient = null;
    private Timer timer;
    private String strAllMsg = "";
    private String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526806470";
    private String userName;

    @Override
    public void create() {

        camera = new OrthographicCamera();
        stage = new Stage(new StretchViewport(640, 480, camera));

        batch = new SpriteBatch();
        font = new BitmapFont();
        font.setColor(Color.PINK);
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
        pixmapBtnUp = new Pixmap(63, 50, Pixmap.Format.RGB888);
        pixmapBtnUp.setColor(Color.BLUE);
        pixmapBtnUp.fill();

        pixmapCheckBoxOn = new Pixmap(15, 15, Pixmap.Format.RGB888);
        pixmapCheckBoxOn.setColor(Color.GREEN);
        pixmapCheckBoxOn.fill();
        pixmapCheckBoxOff = new Pixmap(15, 15, Pixmap.Format.RGB888);
        pixmapCheckBoxOff.setColor(Color.YELLOW);
        pixmapCheckBoxOff.fill();


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

        textArea = new TextArea("", textAreaStyle);
        textArea.setSize(500, 360);
        textArea.setPosition(50, 100);

        textField = new TextField("", textFieldStyle);
        textField.setSize(350, 50);
        textField.setPosition(50, 40);
        Gdx.app.log("TAG", "Width=" + textField.getPrefWidth() + "Height=" + textField.getPrefHeight());
        textField.setMessageText("Enter MSG");
        textField.setAlignment(Align.left);

        textureBtnUp = new Texture(pixmapBtnUp);
        TextureRegionDrawable btn_Up = new TextureRegionDrawable(new TextureRegion(textureBtnUp));
        TextButton.TextButtonStyle btnStyle = new TextButton.TextButtonStyle(btn_Up, null, null,
                new BitmapFont());
        btnSend = new TextButton("Send", btnStyle);
        btnClear = new TextButton("Clear", btnStyle);
        btnSend.setPosition(410, 40);
        btnClear.setPosition(485, 40);


        bitmapFont = new BitmapFont();
        checkboxOnTexture = new Texture(pixmapCheckBoxOn);
        checkboxOffTexture = new Texture(pixmapCheckBoxOff);
        CheckBox.CheckBoxStyle style = new CheckBox.CheckBoxStyle();
        style.checkboxOn = new TextureRegionDrawable(new TextureRegion(checkboxOnTexture));
        style.checkboxOff = new TextureRegionDrawable(new TextureRegion(checkboxOffTexture));
        style.font = bitmapFont;
        style.fontColor = new Color(1, 0, 0, 1);
        checkBox = new CheckBox("ws", style);
        checkBox.setPosition(560, 430);

        stage.addActor(textArea);
        stage.addActor(textField);
        stage.setKeyboardFocus(textField);
        stage.addActor(btnSend);
        stage.addActor(btnClear);
        stage.addActor(checkBox);

        checkBox.addListener(new ChangeListener() {
            @Override
            public void changed(ChangeEvent event, Actor actor) {
                bIsWs = checkBox.isChecked();
                Gdx.app.log("TAG", "复选框是否被选中: " + bIsWs);

                if (bIsWs) {
                    timer.stop();
                    try {
                        wsClient = new JavaWebSocketClient("ws://127.0.0.1:9090", textArea);
                        wsClient.connect();
                        Thread.sleep(2000);
                        if (!wsClient.getReadyState().equals(WebSocket.READYSTATE.OPEN)) {
                            System.out.println("Server is not ready yet!");
                            wsClient = null;
                        } else {
                            System.out.println("Created connection with WS Server.");
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    if (wsClient != null) {
                        wsClient.close();
                        wsClient = null;
                    }
                    timer.start();
                }
            }
        });

        textField.setTextFieldListener(new TextField.TextFieldListener() {
            @Override
            public void keyTyped(TextField textField, char c) {
                if ((int) c == 13 || (int) c == 10) {
                    btnSendMsg();
                    Gdx.input.setOnscreenKeyboardVisible(true);

                }
            }
        });

        btnSend.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                btnSendMsg();
                Gdx.input.setOnscreenKeyboardVisible(false);
            }
        });

        btnClear.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                btnClearMsg();
                Gdx.input.setOnscreenKeyboardVisible(false);
            }
        });

        userName = PBZUtils.generateUserID();
        System.out.println("username " + userName);

        //SetTimer for reading Msg
        timer = new Timer();
        timer.scheduleTask(new Timer.Task() {
            @Override
            public void run() {
                readMsg();
                textArea.setText(strAllMsg);

            }
        }, 1f, 3f);
        timer.stop();
        Gdx.input.setInputProcessor(stage);

    }

    @Override
    public void resize(int width, int height) {

    }

    private void readMsg() {
        PBZUtils.readMessage(url, new PBZUtils.IResponseListener() {
            @Override
            public void notify(String message) {
                strAllMsg = message;
            }

            @Override
            public void onError(Throwable e) {
            }
        });
    }

    private void btnSendMsg() {
        String s = textField.getText();
        if (bIsWs) {
            if (wsClient != null) {
                wsClient.send("{\"message\":\"" + s + "\"}");
                textField.setText("");
            }
        } else {
            if (!s.trim().equals("")) {
                String strMsg = strAllMsg + "\n" + PBZUtils.getCurrentTime() + "\n" + userName + ":" + s;
                strMsg = strMsg.replaceAll("\n", "\\\\n");
                PBZUtils.sendMessage(url, strMsg);
                textField.setText("");
            }
        }
    }

    private void btnClearMsg() {
        String s = "Let's chat";
        PBZUtils.sendMessage(url, s);
    }

    @Override
    public void render() {
        Gdx.gl.glClearColor(66 / 255f, 55 / 255f, 88 / 255f, 0.5f);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        stage.act();
        stage.draw();

        batch.begin();
        font.draw(batch, version, Gdx.graphics.getWidth() / 2, 30);
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
        pixmapArea.dispose();
        pixmapField.dispose();
        pixmapCur.dispose();
        pixmapBtnUp.dispose();
        pixmapCheckBoxOn.dispose();
        pixmapCheckBoxOff.dispose();

        batch.dispose();
        font.dispose();
        fontFromFile.dispose();
        timer.stop();
        timer.clear();
    }

    @Override
    public void notifyBefore() {
        timer.stop();
    }

    @Override
    public void notifyAfter() {
        userName = PBZUtils.getLoginUser();
        timer.start();

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

    @Override
    public void initGame(GdxGameAdapter adapter) {
        create();
        adapter.registerStage(stage);
    }
}
