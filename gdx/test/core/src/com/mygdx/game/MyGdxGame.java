package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;

import java.util.ArrayList;
import java.util.List;

public class MyGdxGame extends ApplicationAdapter {
	private  SpriteBatch batch;
	//Draw a button
	private Texture textureBtnUp;
	private Texture textureBtnDown;
	private Pixmap pixmapBtnUp;
	private Pixmap pixmapBtnDown;
    private TextButton AIBtn;
    private Stage  stage;
    private  boolean bIsSearching;

	private ArrayList<Texture> Ts = new ArrayList<Texture>();
	private ArrayList<Sprite> Ss = new ArrayList<Sprite>();
	private GameM gm = new GameM();
	private Sound wavSound;

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
				(iBox/3==i8InBox/3)&&(iBox-i8InBox==1 || -1==iBox-i8InBox))
		{
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

	private void myAISearch(){
        GameAIHelper helper = new GameAIHelper(gm.B);
        GameAIHelper.MyNode node = helper.AISearch();

        int nStep = 0;
        GameAIHelper.MyNode preNode = null;
        List<Integer> res = new ArrayList<Integer>();
        while (node != null) {
            if (nStep == 0) {
                preNode = node;
            } else {
                int diffNum = helper.getDiff(preNode.getData(), node.getData());
                if (diffNum != -1) {
                    res.add(new Integer(diffNum));
                }
                preNode = node;
            }
            helper.printNodeData(node);
            node = node.getParent();
            nStep++;
        }

        int nSize = res.size();
        System.out.println("nSize:"+nSize);
        while (nSize > 0) {
            int x = res.get(nSize - 1).intValue();
            System.out.println("8->" + x);
            try {
                gm.xdSwap(Ss,x,8);
                wavSound.play();
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            nSize--;
        }
    }
	@Override
	public void create () {
		batch = new SpriteBatch();
		//textureBtnUp = new Texture("badlogic.jpg");
        pixmapBtnDown = new Pixmap(100,50, Pixmap.Format.RGB888);
		pixmapBtnDown.setColor(Color.BLUE);
		pixmapBtnDown.fill();

		pixmapBtnUp = new Pixmap(100,50, Pixmap.Format.RGB888);
		pixmapBtnUp.setColor(Color.RED);
		pixmapBtnUp.fill();

		textureBtnDown = new Texture(pixmapBtnDown);
		textureBtnUp = new Texture(pixmapBtnUp);
		pixmapBtnUp.dispose();
		pixmapBtnDown.dispose();
		TextureRegionDrawable btn_Up = new TextureRegionDrawable(new TextureRegion(textureBtnUp));
		TextureRegionDrawable btn_Down= new TextureRegionDrawable(new TextureRegion(textureBtnDown));

		wavSound = Gdx.audio.newSound(Gdx.files.internal("data/APiano.wav"));
		w = Gdx.graphics.getWidth();
		h = Gdx.graphics.getHeight();

		gm.pbInit(Ss,Ts);

		bIsSearching = false;
        BitmapFont bf = new BitmapFont();
        TextButton.TextButtonStyle ts = new TextButton.TextButtonStyle(btn_Up, btn_Down,btn_Up,bf);
		AIBtn = new TextButton("AI Search",ts);
		AIBtn.setSize(100, 50);
		stage = new Stage();
		AIBtn.setPosition(520,300, 0);
		AIBtn.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                Gdx.app.log("INFO", "Button is clicked!");
				if(bIsSearching){
					Gdx.app.log("INFO", "Searching now!");
					return;
				}
                for (int i:gm.B){
                    Gdx.app.log("INFO", Integer.toString(i));
                }

                MyThread thread = new MyThread();
                thread.setName("AI Thread");
                thread.start();

            }
        });

        Gdx.input.setInputProcessor(stage);
		stage.addActor(AIBtn);
	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(0, 255, 255, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		if(Gdx.input.isButtonPressed(Input.Buttons.LEFT)){
			xdF2(Ss,Gdx.input.getX(),Gdx.input.getY());
		}
		batch.begin();
		gm.pbDraw(batch,Ss);
		batch.end();

        stage.act();
        stage.draw();
	}
	
	@Override
	public void dispose () {
		batch.dispose();
		textureBtnUp.dispose();
		textureBtnDown.dispose();
		wavSound.dispose();

		for(int i=0;i<Ts.size();i++){
			Ts.get(i).dispose();
		}
	}

    public class MyThread extends Thread {
        @Override
        public void run() {
			bIsSearching = true;
            myAISearch();
			bIsSearching = false;
        }
    }
}
