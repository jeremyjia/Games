package com.pbz.demo.hello.util;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

public final class ExecuteCommand {

	private static final boolean isWindows = System.getProperty("os.name").startsWith("Windows");

	public static boolean executeCommand(String command, String[] args) throws Exception {
		return executeCommand(command, args, null, null);
	}

	public static boolean executeCommand(String command, String[] args, String[] env, String logFilePath)
			throws Exception {
		final File startIn = new File(command).getParentFile();
		String[] cmds = new String[args.length + 1];
		cmds[0] = command;
		for (int i = 0; i < args.length; i++) {
			cmds[i + 1] = args[i];
		}
		return executeCommand(cmds, env, startIn, logFilePath);
	}

	public static boolean executeCommand(String[] commands, String[] env, File startIn, String logFilePath)
			throws Exception {
		Runtime runtime = Runtime.getRuntime();
		final Process childProcess;
		try {
			childProcess = runtime.exec(commands, env, startIn);
			runtime.addShutdownHook(new Thread() {
				public void run() {
					if (childProcess != null)
						childProcess.destroy();
				}
			});
			StreamReader errorStream = new StreamReader(childProcess.getErrorStream(), "STDERR", logFilePath);
			StreamReader outputStream = new StreamReader(childProcess.getInputStream(), "STDOUT", logFilePath);
			errorStream.start();
			outputStream.start();
			childProcess.waitFor();
			if (childProcess.exitValue() != 0)
				throw new Exception("Runtime execution failed with child process \"" + commands[0] + "\" exit code of "
						+ childProcess.exitValue());
		} catch (Exception e) {
			throw new Exception(e);
		}
		return true;
	}

	public static boolean isPortUsing(String host, int port) throws UnknownHostException {
		boolean flag = false;
		InetAddress Address = InetAddress.getByName(host);
		try {
			Socket socket = new Socket(Address, port);
			flag = true;
		} catch (IOException e) {

		}
		return flag;
	}

	public static boolean isLocalPortUsing(int port) {
		boolean flag = true;
		try {
			flag = isPortUsing("127.0.0.1", port);
		} catch (Exception e) {
		}
		return flag;
	}

	public static Map<String, Object> executeCommandOnServer(String[] cmd) throws Exception {
		Map<String, Object> status = new HashMap<String, Object>();
		File logFile = new File("./Cmdlog.txt");
		if (logFile.exists()) {
			logFile.delete();
		}
		logFile.createNewFile();

		try {
			ExecuteCommand.executeCommand(cmd, null, new File("."), logFile.getAbsolutePath());
		} catch (Exception e) {
			String cmd0 = "sh";
			String cmd1 = "-c";
			if (isWindows) {
				cmd0 = "cmd";
				cmd1 = "/c";
			}
			String[] cmds = new String[cmd.length + 2];
			cmds[0] = cmd0;
			cmds[1] = cmd1;
			for (int i = 0; i < cmd.length; i++) {
				cmds[i + 2] = cmd[i];
			}
			ExecuteCommand.executeCommand(cmds, null, new File("."), logFile.getAbsolutePath());
		}
		Thread.sleep(100);
		String strOut = FileUtil.readAllBytes(logFile.getAbsolutePath());
		status.put("Status", "OK!");
		status.put("Message", strOut);

		return status;
	}

}
