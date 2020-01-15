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

import java.util.ArrayList;
import java.util.List;

public class GdxGameAdapter extends ApplicationAdapter implements InputProcessor {

    private ApplicationAdapter  app = null;  //Current App handle
    private Pixmap pixMapBtn;
    private ButtonGroup buttonGroup = new ButtonGroup();
    private InputMultiplexer inputMultiplexer = new InputMultiplexer();
    private List<ApplicationAdapter> allApps = new ArrayList<ApplicationAdapter>();
    private List<Stage> allStages = new ArrayList<Stage>();
    private String appNames[] = {"Chat","FiveChess"};


    @Override
    public void create () {

        pixMapBtn = new Pixmap(20, 20, Pixmap.Format.RGBA4444);
        pixMapBtn.setColor(Color.VIOLET);
        pixMapBtn.fill();
        Texture textureBtnUp = new Texture(pixMapBtn);
        TextureRegionDrawable region = new TextureRegionDrawable(new TextureRegion(textureBtnUp));
        TextButton.TextButtonStyle btnStyle = new TextButton.TextButtonStyle(region, null, null,
                new BitmapFont());

        buttonGroup.setMaxCheckCount(1);

        for (int i = 0; i < appNames.length;i++){
            String name = appNames[i];
            String num = String.valueOf(i);
            TextButton textBtn = new TextButton(num, btnStyle);
            textBtn.setName(name);
            textBtn.setPosition(20+i*22, 10);
            textBtn.addListener(new ClickListener(){
                @Override
                public void clicked(InputEvent event, float x, float y) {
                    String appName = event.getListenerActor().getName();
                    if (appName.equalsIgnoreCase("Chat")){
                        System.out.println(appName);
                        app = allApps.get(0);
                        Stage stage = allStages.get(0);

                        changeStage(stage);
                        Gdx.input.setInputProcessor(stage);

                    }else if (appName.equalsIgnoreCase("FiveChess")){
                        System.out.println(appName);
                        app = allApps.get(1);
                        Stage stage = allStages.get(1);

                        changeStage(stage);
                        inputMultiplexer.clear();
                        inputMultiplexer.addProcessor(stage);
                        inputMultiplexer.addProcessor((InputProcessor) app);
                        Gdx.input.setInputProcessor(inputMultiplexer);

                    }else{

                    }
                }
            });

            buttonGroup.add(textBtn);
        }

        GdxChatApp one = new GdxChatApp();
        one.init(this);
        allApps.add(one);

        GdxFiveChessApp two = new GdxFiveChessApp();
        two.init(this);
        allApps.add(two);

        app = two;

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
        app.dispose();
    }

    @Override
    public boolean keyDown(int keycode) {
        return ((InputProcessor)app).keyDown(keycode);
    }

    @Override
    public boolean keyUp(int keycode) {
        return ((InputProcessor)app).keyUp(keycode);
    }

    @Override
    public boolean keyTyped(char character) {
        return ((InputProcessor)app).keyTyped(character);
    }

    @Override
    public boolean touchDown(int screenX, int screenY, int pointer, int button) {
        return ((InputProcessor)app).touchDown(screenX, screenY, pointer, button);
    }

    @Override
    public boolean touchUp(int screenX, int screenY, int pointer, int button) {
        return ((InputProcessor)app).touchUp(screenX, screenY, pointer, button);
    }

    @Override
    public boolean touchDragged(int screenX, int screenY, int pointer) {
        return ((InputProcessor)app).touchDragged(screenX, screenY, pointer);
    }

    @Override
    public boolean mouseMoved(int screenX, int screenY) {
        return ((InputProcessor)app).mouseMoved(screenX, screenY);
    }

    @Override
    public boolean scrolled(int amount) {
        return ((InputProcessor)app).scrolled(amount);
    }

    public void setButtonBar(Stage stage){
        allStages.add(stage);
        changeStage(stage);
    }

    public void changeStage(Stage stage){
        Array<TextButton> allBtn = buttonGroup.getButtons();
        for (TextButton btn:allBtn)
        {
            stage.addActor(btn);
        }
    }
}
