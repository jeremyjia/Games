package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Net;
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
import com.badlogic.gdx.scenes.scene2d.ui.TextArea;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.ui.TextField;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Align;
import com.badlogic.gdx.utils.Timer;
import com.badlogic.gdx.utils.viewport.StretchViewport;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class GdxChatGame extends ApplicationAdapter {

	private Stage stage;
	private Camera camera;
	private TextArea textArea;
	private TextField textField;
	private TextButton btnSend;

	private Pixmap  pixmapArea;
	private Pixmap  pixmapField;
	private Pixmap  pixmapCur;
	private Pixmap  pixmapBtnUp;
	private Texture textureBtnUp;

	private Timer timer;
	private String strAllMsg="";
	private String url;
	private String userName;

	@Override
	public void create () {

		camera = new OrthographicCamera();
		stage = new Stage(new StretchViewport(640, 480, camera));

		pixmapArea = new Pixmap(150,100, Pixmap.Format.RGB888);
		pixmapArea.setColor(Color.CORAL);
		pixmapArea.fill();

		pixmapField = new Pixmap(150,100, Pixmap.Format.RGB888);
		pixmapField.setColor(Color.GRAY);
		pixmapField.fill();

		pixmapCur = new Pixmap(3,100, Pixmap.Format.RGB888);
		pixmapCur.setColor(Color.GREEN);
		pixmapCur.fill();
		pixmapBtnUp = new Pixmap(80,50, Pixmap.Format.RGB888);
		pixmapBtnUp.setColor(Color.BLUE);
		pixmapBtnUp.fill();


		TextField.TextFieldStyle textAreaStyle = new TextField.TextFieldStyle(new BitmapFont(),
				Color.BLACK, new TextureRegionDrawable(new TextureRegion(
				new Texture(pixmapCur))),
				new TextureRegionDrawable(new TextureRegion(new Texture(pixmapArea))),
				new TextureRegionDrawable(new TextureRegion(new Texture(
						pixmapArea))));

		TextField.TextFieldStyle textFieldStyle = new TextField.TextFieldStyle(new BitmapFont(),
				Color.BLACK, new TextureRegionDrawable(new TextureRegion(
				new Texture(pixmapCur))),
				new TextureRegionDrawable(new TextureRegion(new Texture(pixmapField))),
				new TextureRegionDrawable(new TextureRegion(new Texture(
						pixmapField))));

		textArea = new TextArea("", textAreaStyle);
		textArea.setSize(500,360);
		textArea.setPosition(50, 100);

		textField = new TextField("", textFieldStyle);
		textField.setSize(400, 50);
		textField.setPosition(50, 40);
		Gdx.app.log("TAG", "preWidth=" + textField.getPrefWidth() + "preHeight=" + textField.getPrefHeight());
		textField.setMessageText("Enter ps");
		textField.setAlignment(Align.left);

		textureBtnUp = new Texture(pixmapBtnUp);
		TextureRegionDrawable btn_Up = new TextureRegionDrawable(new TextureRegion(textureBtnUp));
		TextButton.TextButtonStyle btnStyle = new TextButton.TextButtonStyle(btn_Up, null, null,
				new BitmapFont());
		btnSend = new TextButton("Send", btnStyle);
		btnSend.setPosition(460, 40);

		Gdx.input.setInputProcessor(stage);
		stage.addActor(textArea);
		stage.addActor(textField);
		stage.setKeyboardFocus(textField);
		stage.addActor(btnSend);

		textField.setTextFieldListener(new TextField.TextFieldListener(){
			@Override
			public void keyTyped(TextField textField, char c){
				if((int)c == 13 || (int)c == 10) {
					sendMsg();
					Gdx.input.setOnscreenKeyboardVisible(true);

				}
			}
		});

		btnSend.addListener(new ClickListener(){
			@Override
			public void clicked(InputEvent event, float x, float y){
				sendMsg();
				Gdx.input.setOnscreenKeyboardVisible(false);
			}
		});

		url="https://api.github.com/repos/jeremyjia/Games/issues/comments/515761823?access_token="+getToken();
		userName = generateUserID();
		System.out.println("username "+userName);

		//SetTimer for reading Msg
		timer = new Timer();
		timer.scheduleTask(new Timer.Task() {
			@Override
			public void run() {
				readMsg();
				textArea.setText(strAllMsg);

			}
		},1f,3f);


	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(66/255f, 55/255f, 88/255f, 0.5f);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

		stage.act();
		stage.draw();

	}

	public void sendMsg(){
		String s = textField.getText();
		if(!s.trim().equals("")){
			System.out.println("Will send message "+s);
			String strMsg = strAllMsg+"\n"+getCurrentTime()+"\n"+userName+":"+s;
			strMsg = strMsg.replaceAll("\n","\\\\n");
			String requestContent = "{\"body\":\""+strMsg+"\"}";

			Net.HttpRequest httpRequest = new Net.HttpRequest(Net.HttpMethods.POST);
			httpRequest.setUrl(url);
			httpRequest.setHeader("Content-Type", "text/plain");
			httpRequest.setHeader("Cache-Control", "no-store");
			httpRequest.setHeader("Cache-Control", "no-cache");
			httpRequest.setContent(requestContent);

			Gdx.net.sendHttpRequest(httpRequest, new Net.HttpResponseListener() {
				public void handleHttpResponse(Net.HttpResponse httpResponse) {
					int statusCode = httpResponse.getStatus().getStatusCode();
					System.out.println("sendMsg() HTTP Request status: " + statusCode);
				}
				public void failed(Throwable t) {
					System.out.println("HTTP request failed!");
				}
				@Override
				public void cancelled() {
				}

			});

			textField.setText("");
		}
	}

	public void readMsg(){
		Net.HttpRequest httpRequest = new Net.HttpRequest(Net.HttpMethods.GET);
		httpRequest.setUrl(url);

		httpRequest.setHeader("Content-Type", "text/plain");
		httpRequest.setHeader("charset", "UTF-8");
		//Jeremy Debug
		httpRequest.setHeader("Cache-Control", "no-store");
		httpRequest.setHeader("Cache-Control", "no-cache");
        //httpRequest.setHeader("If-Modified-Since", "0");
		//httpRequest.setHeader("Cache-Control", "max-age=0");
		httpRequest.setContent(null);

		Gdx.net.sendHttpRequest(httpRequest, new Net.HttpResponseListener() {
			public void handleHttpResponse(Net.HttpResponse httpResponse) {
				int statusCode = httpResponse.getStatus().getStatusCode();
				System.out.println("readMsg() HTTP Request status: " + statusCode);
				System.out.println("Content:");
				String s = httpResponse.getResultAsString();
				System.out.println(s);

				int i = s.indexOf("body");
				if (i!=-1){
					String sc = s.substring(i+7, s.length()-2);
					strAllMsg = sc.replaceAll("\\\\n","\n");
				}
			}
			public void failed(Throwable t) {
				System.out.println("HTTP request failed!");
			}
			@Override
			public void cancelled() {
			}
		});
	}

	private String getToken(){
		return "f89b0eccf7"+"4c65a65513"+"60062c3e47"+"98d0df4577";
	}

	public String getCurrentTime()
	{
		Date date = new Date();
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(date);

	}

	public String generateUserID(){
		String str="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		StringBuilder sb=new StringBuilder(6);
		for(int i=0;i<6;i++)
		{
			char ch=str.charAt(new Random().nextInt(str.length()));
			sb.append(ch);
		}
		return sb.toString();
	}

	@Override
	public void dispose () {
		pixmapArea.dispose();
		pixmapField.dispose();
		pixmapCur.dispose();
		pixmapBtnUp.dispose();
	}
}
