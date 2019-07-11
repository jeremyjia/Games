package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

import java.util.ArrayList;
// Run -> Edit configuartions...


public class MyGdxGame extends ApplicationAdapter {
	SpriteBatch batch;
	Texture img;

	private ArrayList<Texture> Ts = new ArrayList<Texture>();
	private ArrayList<Sprite> Ss = new ArrayList<Sprite>();
	GameM gm = new GameM();

	Sound wavSound;

	private float xdD = 120.0f;
	private float xdX = 120.0f;
	private float xdY = 120.0f;

	private float w = 0;
	private float h = 0;
	private BitmapFont xdFont;
	private String xdStrV = "v0.0.12: " ;
	private String xdMsg = xdStrV;

	private void xdHit(ArrayList<Sprite> sl,int iBox){

		int iSprite = gm.xdGetSpriteNoByBoxNo(sl,iBox);
		int i8InBox = xdGetBoxNoBySpriteNo(8);

		xdMsg = "box:" + iBox + " iSprite:" + iSprite + "i8InBox:"+i8InBox;
		if(iBox-i8InBox==3 || -3==iBox-i8InBox ||
				(iBox/3==i8InBox/3)&&(  iBox-i8InBox==1 || -1==iBox-i8InBox)
		){
			gm.xdSwap(sl,iSprite,8);
			wavSound.play();

		}
	}
	private int xdGetBoxNoBySpriteNo(int iSprite){
		float x = Ss.get(iSprite).getX()+xdD/2;
		float y = h - Ss.get(iSprite).getY()-xdD/2;
		int iBox = -1;
		iBox = gm.xdGetBoxNoByXY(x,y,xdX,xdY,xdD);
		return iBox;
	}

	private void xdF2(ArrayList<Sprite> sl,float x,float y){
		int i = gm.xdGetBoxNoByXY(x,y,xdX,xdY,xdD);
		if(-1!=i) xdHit(sl,i);
	}

	@Override
	public void create () {
		batch = new SpriteBatch();
		img = new Texture("badlogic.jpg");
		wavSound = Gdx.audio.newSound(Gdx.files.internal("data/APiano.wav"));

		w = Gdx.graphics.getWidth();
		h = Gdx.graphics.getHeight();

		gm.pbInit(Ss,Ts);
	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		if(Gdx.input.isButtonPressed(Input.Buttons.LEFT)){
			xdF2(Ss,Gdx.input.getX(),Gdx.input.getY());
		}
		batch.begin();
		gm.pbDraw(batch,Ss);
		batch.end();
	}
	
	@Override
	public void dispose () {
		batch.dispose();
		img.dispose();
		wavSound.dispose();

		for(int i=0;i<Ts.size();i++){
			Ts.get(i).dispose();
		}
	}
}
