package com.mygdx.game;

import com.badlogic.gdx.InputProcessor;

public interface IGdxGame extends InputProcessor {
    public void initGame(GdxGameAdapter adapter);
    public void create ();
    public void resize (int width, int height);
    public void render ();
    public void pause ();
    public void resume ();
    public void dispose();

    public void notifyBefore();
    public void notifyAfter();
}
