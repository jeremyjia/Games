package com.mygdx.game;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.ui.TextField;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Align;
import com.badlogic.gdx.utils.viewport.StretchViewport;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GdxJDSpiderApp implements IGdxGame{

    private Stage stage;
    private Camera camera;
    private TextButton.TextButtonStyle btnStyle;
    private TextureRegionDrawable drawable;
    private Pixmap pixmapBtn;
    private Pixmap pixmapCursor;
    private TextButton btnSearch;
    private TextField textField;
    private BitmapFont font;
    private List<Label> m_Lables = new ArrayList<Label>();

    @Override
    public void initGame(GdxGameAdapter adapter) {

        create();
        adapter.registerStage(stage);
    }

    @Override
    public void create() {

        camera = new OrthographicCamera();
        ((OrthographicCamera) camera).rotate(90);
        stage = new Stage(new StretchViewport(640, 480, camera));
        ((OrthographicCamera) camera).position.add(-70f,-70f,0);

        pixmapBtn = new Pixmap(70, 30, Pixmap.Format.RGB888);
        pixmapBtn.setColor(Color.CORAL);
        pixmapBtn.fill();
        drawable = new TextureRegionDrawable(new TextureRegion(new Texture(pixmapBtn)));
        btnStyle = new TextButton.TextButtonStyle(drawable, null, null, new BitmapFont());
        btnSearch = new TextButton("Search", btnStyle);

        //font = new BitmapFont();
        //font = PBZUtils.getGlobalFont();
        font = new BitmapFont(Gdx.files.internal("chat.fnt"), Gdx.files.internal("chat.png"), false);
        font.getData().markupEnabled = true;

        pixmapCursor = new Pixmap(3, 100, Pixmap.Format.RGB888);
        pixmapCursor.setColor(Color.GREEN);
        pixmapCursor.fill();
        TextField.TextFieldStyle textFieldStyle = new TextField.TextFieldStyle(font, Color.BLACK, new TextureRegionDrawable(new TextureRegion(new Texture(pixmapCursor))), new TextureRegionDrawable(new TextureRegion(new Texture(pixmapBtn))), new TextureRegionDrawable(new TextureRegion(new Texture(pixmapBtn))));
        textField = new TextField("kouzhaon95", textFieldStyle);
        textField.setAlignment(Align.left);
        textField.setSize(250, 30);
        textField.setPosition(2*20, 22*20);

        btnSearch.setPosition(15*20, 22*20);
        btnSearch.addListener(new ClickListener() {
            @Override
            public void clicked(InputEvent event, float x, float y) {
                System.out.println("btnSearch");
                for (Label lb:m_Lables){
                    stage.getRoot().removeActor(lb);
                }
                try {
                    searchGoodsOnJDWebSite(textField.getText());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        stage.setKeyboardFocus(textField);
        stage.addActor(btnSearch);
        stage.addActor(textField);
        Gdx.input.setInputProcessor(stage);
    }

    @Override
    public void resize(int width, int height) {
        stage.setViewport(new StretchViewport(width, height, camera));
    }

    @Override
    public void render() {
        Gdx.gl.glClearColor(110 / 255f, 150 / 255f, 130 / 255f, 0.5f);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        stage.act();
        stage.draw();
    }

    @Override
    public void pause() {
    }

    @Override
    public void resume() {
    }

    @Override
    public void dispose() {
        pixmapCursor.dispose();
        pixmapBtn.dispose();
    }

    @Override
    public void notifyBefore() {
    }

    @Override
    public void notifyAfter() {

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
        return true;
    }

    private void searchGoodsOnJDWebSite(String keyWord) throws IOException {

        String url = "https://search.jd.com/Search?keyword="+keyWord+"&enc=utf-8";
        Document doc = Jsoup.connect(url).maxBodySize(0).get();
        Elements ulList = doc.select("ul[class='gl-warp clearfix']");
        Elements liList = ulList.select("li[class='gl-item']");
        int i=0;
        for (Element item : liList) {
            if (!item.select("span[class='p-promo-flag']").text().trim().equals("广告")) {
                Elements div = item.select("div[class='p-name p-name-type-2']");
                String name = div.select("em").text();
                System.out.println(name);
                Elements aElm = div.select("a");
                String href = "https:"+aElm.attr("href");
                System.out.println(href);

                Elements divStock = item.select("div[class='p-stock']");
                String stockText = "OK";
                if(!divStock.text().isEmpty()){
                    stockText = "X";
                }
                System.out.println(stockText);

                Label lName = new Label("", new Label.LabelStyle(font, null));
                lName.setText("[CYAN]Name: [][PURPLE]"+name);
                lName.setPosition(20*2, (21-i*3)*20);
                Label lLink = new Label("", new Label.LabelStyle(font, null));
                lLink.setText("[YELLOW]Link: [][BLUE]"+href+"[][MAROON]"+"  "+stockText);
                lLink.setPosition(20*2, (21-i*3-1)*20);

                stage.addActor(lName);
                stage.addActor(lLink);
                m_Lables.add(lName);
                m_Lables.add(lLink);
                i++;
                if (i>=7) break;
                System.out.println("===================================");
            }
        }
    }

}
