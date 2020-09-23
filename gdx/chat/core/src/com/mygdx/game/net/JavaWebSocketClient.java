package com.mygdx.game.net;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;

public class JavaWebSocketClient extends WebSocketClient {

    public static Object object = null;

    public JavaWebSocketClient(String url, Object obj) throws URISyntaxException {
        super(new URI(url));
        object = obj;

    }

    @Override
    public void onOpen(ServerHandshake shake) {
        System.out.println("ServerHandshake...");
        for (Iterator<String> it = shake.iterateHttpFields(); it.hasNext(); ) {
            String key = it.next();
            System.out.println(key + ":" + shake.getFieldValue(key));
        }
    }

    @Override
    public void onMessage(String paramString) {
        System.out.println("Received message:" + paramString);
        if (object instanceof com.badlogic.gdx.scenes.scene2d.ui.TextArea) {
            ((com.badlogic.gdx.scenes.scene2d.ui.TextArea) object).setText(paramString);
        }

    }

    @Override
    public void onClose(int paramInt, String paramString, boolean paramBoolean) {
        System.out.println("Close...");
    }

    @Override
    public void onError(Exception e) {
        System.out.println("Error:" + e.getMessage());

    }
}
