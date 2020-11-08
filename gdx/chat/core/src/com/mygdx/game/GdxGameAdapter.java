package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Array;

import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GdxGameAdapter extends ApplicationAdapter implements InputProcessor {
    private IGdxGame  app = null;  //Current App instance
    private Pixmap pixMapBtn;
    private ButtonGroup buttonGroup = new ButtonGroup();
    private InputMultiplexer inputMultiplexer = new InputMultiplexer();
    private List<IGdxGame> allApps = new ArrayList<IGdxGame>();
    private List<Stage> allStages = new ArrayList<Stage>();
    private Map<String, Integer> appMap = new HashMap<String, Integer>();
    private String appInfoUrl = "https://api.github.com/repos/jeremyjia/Games/issues/comments/576489012";
    private String appClassNames[] = {};  //Getting the app class names from Github Server

    @Override
    public void create () {

        //getAppInfoFromServer();
        getMockAppInfoFromServer();

        int nWaitSeconds = 15;
        while (appClassNames.length == 0 && --nWaitSeconds>0){
            System.out.println("Waiting for loading app info from Github Server");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        if (nWaitSeconds <=0){
            System.out.println("Error:getAppInfoFromServer");
            Gdx.app.exit();
        }

        pixMapBtn = new Pixmap(20, 20, Pixmap.Format.RGBA4444);
        pixMapBtn.setColor(Color.VIOLET);
        pixMapBtn.fill();
        Texture textureBtnUp = new Texture(pixMapBtn);
        TextureRegionDrawable region = new TextureRegionDrawable(new TextureRegion(textureBtnUp));
        TextButton.TextButtonStyle btnStyle = new TextButton.TextButtonStyle(region, null, null,
                new BitmapFont());

        buttonGroup.setMaxCheckCount(1);
        for (int i = 0; i < appClassNames.length;i++){
            String name = appClassNames[i];
            String num = String.valueOf(i+1);
            TextButton textBtn = new TextButton(num, btnStyle);
            textBtn.setName(name);
            textBtn.setPosition(20+i*22, 10);
            textBtn.addListener(new ClickListener(){
                @Override
                public void clicked(InputEvent event, float x, float y) {
                    String appName = event.getListenerActor().getName();
                    int index = appMap.get(appName);
                    System.out.println("Clicked:("+appName+","+index+")");
                    if (index >= allApps.size()) {
                        return;
                    }
                    if (app == allApps.get(index)){
                        return;
                    }
                    app.notifyBefore();
                    app = allApps.get(index);
                    app.notifyAfter();

                    Stage stage = allStages.get(index);
                    addBtnBarOnStage(stage);
                    inputMultiplexer.clear();
                    inputMultiplexer.addProcessor(stage);
                    inputMultiplexer.addProcessor(app);
                    Gdx.input.setInputProcessor(inputMultiplexer);
                }
            });

            buttonGroup.add(textBtn);
            appMap.put(name, new Integer(i));
            IGdxGame instance = getAppInstance(name);
            if (instance == null){
                System.out.println("Class name error: "+name);
                continue;
            }
            allApps.add(instance);
            this.app = instance;
        }

    }

    @Override
    public void render () {
        Gdx.gl.glClearColor(66/255f, 55/255f, 88/255f, 0.5f);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        app.render();
    }

    @Override
    public void dispose () {
        pixMapBtn.dispose();
        for (IGdxGame gameInstance:allApps){
            gameInstance.dispose();
        }
    }

    @Override
    public boolean keyDown(int keycode) {
        return app.keyDown(keycode);
    }

    @Override
    public boolean keyUp(int keycode) {
        return app.keyUp(keycode);
    }

    @Override
    public boolean keyTyped(char character) {
        return app.keyTyped(character);
    }

    @Override
    public boolean touchDown(int screenX, int screenY, int pointer, int button) {
        return app.touchDown(screenX, screenY, pointer, button);
    }

    @Override
    public boolean touchUp(int screenX, int screenY, int pointer, int button) {
        return app.touchUp(screenX, screenY, pointer, button);
    }

    @Override
    public boolean touchDragged(int screenX, int screenY, int pointer) {
        return app.touchDragged(screenX, screenY, pointer);
    }

    @Override
    public boolean mouseMoved(int screenX, int screenY) {
        return app.mouseMoved(screenX, screenY);
    }

    @Override
    public boolean scrolled(int amount) {
        return app.scrolled(amount);
    }

    public void registerStage(Stage stage){
        allStages.add(stage);
        addBtnBarOnStage(stage);
    }

    private void addBtnBarOnStage(Stage stage){
        Array<TextButton> allBtn = buttonGroup.getButtons();
        for (TextButton btn:allBtn)
        {
            stage.addActor(btn);
        }
    }

    private IGdxGame getAppInstance(String className){
        Object myApp = null;
        try
        {
            Class<?> appClass = Class.forName("com.mygdx.game."+className);
            myApp = appClass.newInstance();
            Method initMethod = appClass.getDeclaredMethod("initGame", GdxGameAdapter.class);
            initMethod.setAccessible(true);
            initMethod.invoke(myApp, this);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
        return (IGdxGame) myApp;
    }

    private void getAppInfoFromServer(){
        PBZUtils.readMessage(appInfoUrl, new PBZUtils.IResponseListener() {
            @Override
            public void notify(String message) {
                JSONObject jsonObj = new JSONObject(message);
                JSONArray jsonArr = jsonObj.getJSONArray("appClassNamesKey");
                appClassNames = PBZUtils.toStringArray(jsonArr);
                for (String appName :appClassNames){
                    System.out.println(appName);
                }
            }
            @Override
            public void onError(Throwable e) {
            }
        });

    }

    private void getMockAppInfoFromServer() {
        String s = "{\n" +
               // "\"appClassNamesKey\": [\"GdxUserLoginApp\", \"GdxChatApp\",\"GdxFiveChessApp\",\"GdxJDSpiderApp\", \"GdxJSEngineApp\"],\n" +
                "\"appClassNamesKey\": [\"GdxUserLoginApp\"],\n" +
                "\"version\": \"1.0.0.2\"\n" +
                "}";
        JSONObject jsonObj = new JSONObject(s);
        JSONArray jsonArr = jsonObj.getJSONArray("appClassNamesKey");
        appClassNames = PBZUtils.toStringArray(jsonArr);
        for (String appName :appClassNames){
            System.out.println(appName);
        }
    }
}
