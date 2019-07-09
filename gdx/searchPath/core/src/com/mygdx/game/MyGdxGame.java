package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Image;


public class MyGdxGame extends ApplicationAdapter implements InputProcessor {
    public SpriteBatch batch;
    Texture img;
    Texture dashboard;
    boolean bPressed = false;
    Pixmap pixmap;
    Stage stage;
    TextureRegion region;
    Image image;

    GameMgr gameMgr;

    @Override
    public void create() {
        batch = new SpriteBatch();
        img = new Texture("badlogic.jpg");
        pixmap = new Pixmap(512, 512, Pixmap.Format.RGBA8888);
        pixmap.setColor(Color.WHITE);
        dashboard = new Texture(pixmap);
        stage = new Stage();
        region = new TextureRegion(dashboard, 800, 480);
        image = new Image(region);
        stage.addActor(image);

        gameMgr = new GameMgr(pixmap, dashboard);

        Gdx.input.setInputProcessor(this);  //Adding by Jeremyjia

    }

    @Override
    public void render() {
        Gdx.gl.glClearColor(0, 1, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        batch.begin();
        if(bPressed)
        {
            //batch.draw(img, X, Y);
        }

       gameMgr.onDraw();

        stage.act();
        stage.draw();

        batch.end();

    }

    @Override
    public void dispose() {
        batch.dispose();
        img.dispose();
    }

    @Override
    public boolean keyDown(int keycode) {
        Gdx.app.log("MyTag", "KeyDown: " + keycode);
        return false;
    }

    @Override
    public boolean keyUp(int keycode) {
        Gdx.app.log("MyTag", "keyUp: " + keycode);
        return false;
    }

    @Override
    public boolean keyTyped(char character) {
        return false;
    }

    @Override
    public boolean touchDown(int screenX, int screenY, int pointer, int button) {
        bPressed = true;
        Gdx.app.log("MyTag", "touchDown: (" + screenX+","+screenY+")");
        gameMgr.updatePlane(screenX, screenY);

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
}
