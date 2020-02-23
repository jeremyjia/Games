package com.mygdx.game;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.utils.Timer;
import com.badlogic.gdx.utils.viewport.StretchViewport;
import com.mygdx.game.engine.JSGraphEngine;

import java.util.ArrayList;
import java.util.List;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import static com.badlogic.gdx.Gdx.gl;
import static org.apache.commons.lang3.StringEscapeUtils.unescapeJson;

public class GdxJSEngineApp implements IGdxGame{

    private Stage stage;
    private Camera camera;
    private Pixmap pixmap;
    private Texture dashboard;
    private TextureRegion region;
    private int nWidth, nHeight;
    private Image image;
    private Label labelMsg;

    private Timer timer;
    private List<Image> images = new ArrayList<Image>();
    private int mX,mY;
    private String pictureName;

    private String commentId = "586664803";//585806600,586664803,588250364
    private String url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/"+commentId+"?access_token="+PBZUtils.getToken();

    private ScriptEngineManager sem = new ScriptEngineManager();
    private ScriptEngine se = sem.getEngineByName("javascript");
    @Override
    public void initGame(GdxGameAdapter adapter) {
        create();
        adapter.registerStage(stage);
        se.put("document", new JSGraphEngine(pixmap,labelMsg,this));
        draw();
    }

    @Override
    public void create() {
        camera = new OrthographicCamera();
        stage = new Stage(new StretchViewport(640, 480, camera));
        pixmap = new Pixmap(640, 480, Pixmap.Format.RGBA8888);
        dashboard = new Texture(pixmap);
        region = new TextureRegion(dashboard, 640, 480);
        image = new Image(region);
        nWidth = Gdx.graphics.getWidth();
        nHeight = Gdx.graphics.getHeight();

        BitmapFont font = new BitmapFont();
        font.getData().markupEnabled = true;
        labelMsg = new Label("a", new Label.LabelStyle(font, null));
        labelMsg.setPosition(50, 50);
        stage.addActor(labelMsg);
        stage.addActor(image);

        InputMultiplexer inputMultiplexer = new InputMultiplexer();
        inputMultiplexer.addProcessor(stage);
        inputMultiplexer.addProcessor(this);
        Gdx.input.setInputProcessor(inputMultiplexer);

    }

    private void draw() {
        pixmap.setColor(Color.LIGHT_GRAY);
        pixmap.fillRectangle(0,0,640,400);
        dashboard.draw(pixmap, 0 ,0);
        for (Image img: images){
            img.remove();
        }

        PBZUtils.readMessage(url, new PBZUtils.IResponseListener() {
            @Override
            public void notify(String jsonString) {
                String scriptOnline = unescapeJson(jsonString);
                try {
                    StringBuffer sb = new StringBuffer();
                    sb.append("function alert(msg) {print(msg); document.showMessage(msg);}");
                    sb.append("function Image() { return document.getImageObj()}");
                    sb.append("var myObj = new Object();");
                    sb.append("myObj.hasOnclickMethod = function(o){return o.onclick;};");
                    sb.append("function bl$(id){ return myObj;}");
                    sb.append("function setInterval(a,b){document.setTimer(a,b);}");
                    sb.append("myObj.scheduleTask = function(o){o();};");
                    se.eval(sb.toString());
                    se.eval(scriptOnline);
                } catch (ScriptException e) {
                    e.printStackTrace();
                }
            }
            @Override
            public void onError(Throwable e) {
            }
        });
    }

    @Override
    public void resize(int width, int height) {

    }

    @Override
    public void render() {
        Gdx.gl.glClearColor(66 / 255f, 155 / 255f, 88 / 255f, 0.5f);
        gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        stage.act();
        stage.draw();
        dashboard.draw(pixmap, 0 ,0);

    }

    @Override
    public void pause() {
    }

    @Override
    public void resume() {
    }

    @Override
    public void dispose() {
        pixmap.dispose();
        dashboard.dispose();
        if (timer !=null) timer.stop();
    }

    @Override
    public void notifyBefore() {
        if (timer !=null) timer.stop();
    }

    @Override
    public void notifyAfter() {
        draw();
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

        System.out.println("touchDown:("+screenX+","+screenY+")");
        float fx = (float) ((640.0/(float)nWidth)*(float)screenX);
        float fy = (float) ((480.0/(float)nHeight)*(float)screenY);
        int newScreenX = (int) fx;
        int newScreenY = (int) fy;
        if (newScreenY>= 380) return false;
        MyPoint point = new MyPoint(newScreenX, newScreenY);

        Invocable invocable = (Invocable) se;
        Object obj = se.get("myObj");
        if (obj == null){
            System.out.println("The object myObj is null");
            return false;
        }

        Object hasOnClickObj=null;
        try {
            hasOnClickObj = invocable.invokeMethod(obj, "hasOnclickMethod",obj);
        } catch (ScriptException e) {
        } catch (NoSuchMethodException e) {
        }
        if (hasOnClickObj==null || hasOnClickObj.equals(false))
            return false;

        try {
            invocable.invokeMethod(obj, "onclick", point );
        } catch (ScriptException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

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

    public void drawImage(String url, int x, int y){
        mX = x;
        mY = y;
        pictureName = "br.gif";
        if (url.contains("/")){
            pictureName = url.substring(url.lastIndexOf("/")+1);
        }
        System.out.println("drawImage:"+pictureName);

        Gdx.app.postRunnable(new Runnable() {
            @Override
            public void run() {
                Texture texture = new Texture(Gdx.files.internal(pictureName));
                int w = texture.getWidth();
                int h = texture.getHeight();
                float scale = 0.7f;
                TextureRegion textureRegion = new TextureRegion(texture, 0,0, w, h);
                Image img = new Image(textureRegion);
                img.setScale(scale);
                img.setRotation(0);
                img.setOrigin(0, 0);
                //img.setPosition(mX-w*scale/2, 480-mY-h*scale/2);
                img.setPosition(mX, 480-h*scale-mY);
                stage.addActor(img);
                images.add(img);
            }
        });

    }

    public boolean setTimer(final Object functionObj, int interval){
        final Invocable invocable = (Invocable) se;
        final Object myObj = se.get("myObj");

        timer = new Timer();
        timer.scheduleTask(new Timer.Task() {
            @Override
            public void run() {
                try {
                    invocable.invokeMethod(myObj, "scheduleTask", functionObj );
                } catch (ScriptException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                }
            }
        }, 1f, interval/1000);

        return  true;
    }
    public class MyPoint{
        public MyPoint(int x, int y){
            offsetX = x;
            offsetY = y;
        }
        public int offsetX;
        public int offsetY;
    }
}
