package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.graphics.GL20;

import java.util.Random;


public class GdxGameAdapter extends ApplicationAdapter implements InputProcessor {

    ApplicationAdapter  app = null;
    @Override
    public void create () {

        int number = new Random().nextInt(10);
        if (number%2 == 0){
            app = new GdxChatApp();
        }else{
            app = new GdxFiveChessApp();
        }
       app.create();
    }

    @Override
    public void render () {
        Gdx.gl.glClearColor(66/255f, 55/255f, 88/255f, 0.5f);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        app.render();
    }

    @Override
    public void dispose () {
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
}
