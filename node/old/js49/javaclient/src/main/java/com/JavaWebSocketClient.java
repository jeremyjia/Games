package com;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.Properties;

import org.java_websocket.WebSocket;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

public class JavaWebSocketClient extends WebSocketClient {
	private static int n=0;
	public static Properties properties = null;	
	static {
		properties = new Properties();
		try {
			properties.load(JavaWebSocketClient.class.getClassLoader().getResourceAsStream("serverinfo.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public JavaWebSocketClient(String url) throws URISyntaxException {
		super(new URI(url));
	}

	@Override
	public void onOpen(ServerHandshake shake) {
		System.out.println("ServerHandshake...");
		for (Iterator<String> it = shake.iterateHttpFields(); it.hasNext();) {
			String key = it.next();
			System.out.println(key + ":" + shake.getFieldValue(key));
		}
	}

	@Override
	public void onMessage(String paramString) {
		//System.out.println("Received message:" + paramString);
		System.out.format("%32s%10d%16s", "abc", 11, "222 \n");

		n++;
		String s = "{";
		s+="\"";
		s+="method";
		s+="\"";
		s+=":";
		s+="\"";
		s+="javaTest";
		s+="\"";
		
		s+=",";

		s+="\"";
		s+="msg";
		s+="\"";
		s+=":";
		s+="\"";
		s+="msg..." +n;
		s+="\"";
		s+="}";
		this.send(s); 
	}

	@Override
	public void onClose(int paramInt, String paramString, boolean paramBoolean) {
		System.out.println("Close...");
	}

	@Override
	public void onError(Exception e) {
		System.out.println("Error:" + e.getMessage());

	}

	public static void main(String[] args) {
		try {
			System.out.println("client v0.22");
			String serverUrl = properties.getProperty("sever.url");
			JavaWebSocketClient jwsc = new JavaWebSocketClient(serverUrl);
			jwsc.connect();
			while (!jwsc.getReadyState().equals(WebSocket.READYSTATE.OPEN)) {
				Thread.sleep(1000);
				System.out.println("Server is not ready yet!");
			}
			System.out.println("Created WebSocket connection with server.");
			jwsc.send("{\"message\":\"Jeremyjia sent test data\"}");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}