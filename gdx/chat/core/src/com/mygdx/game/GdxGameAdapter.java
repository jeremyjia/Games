package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;

public class GdxGameAdapter extends ApplicationAdapter  {
    private SpriteBatch batch;
    private Skin skin;
    private Stage stage;


    private Texture upTextureLogin;
    private Texture downTextureLogin;
    private Button btnLogin;

    @Override
    public void create() {
        batch = new SpriteBatch();
        stage = new Stage();

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
            }
        });

        stage.addActor(btnLogin);

        Gdx.input.setInputProcessor(stage);
    }
    @Override
    public void dispose() {
        batch.dispose();
    }
    @Override
    public void render() {
        Gdx.gl.glClearColor(1, 1, 1, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        batch.begin();
        stage.draw();
        batch.end();
    }
    @Override
    public void resize(int width, int height) {
    }
    @Override
    public void pause() {
    }
    @Override
    public void resume() {
    }
}
