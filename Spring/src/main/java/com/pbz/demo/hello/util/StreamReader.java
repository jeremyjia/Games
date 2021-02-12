package com.pbz.demo.hello.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class StreamReader extends Thread {
	public StreamReader(InputStream stream, String type) {
		this(stream, type, null);
	}

	public StreamReader(InputStream stream, String type, String logFilePath) {
		_stream = stream;
		_type = type;
		initializeLogWriter(logFilePath);
	}

	public void run() {
		BufferedReader reader = null;
		try {
			// use a buffered reader since most stdout has line endings
			reader = new BufferedReader(new InputStreamReader(_stream));
			String line;
			while ((line = reader.readLine()) != null) {
				log(line);
			}
		} catch (IOException ioexception) {
			System.out.println(ioexception.getMessage());
		} finally {
			try {
				if (reader != null) {
					reader.close();
				}
				closeLogWriter();
			} catch (IOException e) {
				System.out.println(e.getMessage());
			}
		}
	}

	private void closeLogWriter() throws IOException {
		if (_logWriter != null) {
			_logWriter.close();
		}
	}

	private void initializeLogWriter(String logFilePath) {
		try {
			if (logFilePath != null && logFilePath.length() > 0) {
				_logWriter = new BufferedWriter(new FileWriter(new File(logFilePath)));
			}
		} catch (IOException e) {
			System.out.println(e.getMessage());
			_logWriter = null;
		}
	}

	private void log(String line) throws IOException {
		if (_logWriter != null) {
			_logWriter.write(_type + ": " + line);
			_logWriter.newLine();
		} else {
			System.out.println(_type + ": " + line);
		}
	}

	private InputStream _stream;
	private String _type;
	private BufferedWriter _logWriter;

}
