package com.pbz.demo.hello.service;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import com.sun.jna.Native;
import com.sun.jna.platform.win32.User32;
import com.sun.jna.platform.win32.WinDef.HWND;

@Service
public class DeepseekServiceImpl implements IDeepseekService {

    @Override
    public String processAutoInput(String autoInputText) {

        String targetTitle = "DeepSeek";
        String url = "https://chat.deepseek.com";
        
        try {
            String os = System.getProperty("os.name").toLowerCase();
            boolean isWindows = os.contains("win");
            boolean isMac = os.contains("mac");
            boolean isLinux = os.contains("nux") || os.contains("nix");

            // 检测或打开窗口
            if (isWindows) {
                handleWindows(targetTitle, url);
            } else if (isMac) {
                handleMacOS(targetTitle, url);
            } else if (isLinux) {
                handleLinux(targetTitle, url);
            } else {
                throw new UnsupportedOperationException("不支持的操作系统: " + os);
            }
            // 输入中文
            inputChineseWithRobot(autoInputText);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "OK";
    }

    // ============== Windows 实现 ==============//
    private static void handleWindows(String title, String url) throws Exception {
        HWND hwnd = findWindowByPartialTitleWindows(title);
        if (hwnd == null) {
            Runtime.getRuntime().exec(new String[] { "cmd", "/c", "start", "chrome", "--new-window", url });
            Thread.sleep(5000);
        } else {
            setForegroundWindowWindows(hwnd);
            Thread.sleep(1000);
        }
    }

    private static HWND findWindowByPartialTitleWindows(String partialTitle) {
        User32 user32 = User32.INSTANCE;
        HWND hwnd = user32.FindWindow(null, null);
        char[] buffer = new char[1024];
        while (hwnd != null) {
            user32.GetWindowText(hwnd, buffer, buffer.length);
            String windowTitle = Native.toString(buffer);
            if (windowTitle.contains(partialTitle))
                return hwnd;
            hwnd = user32.FindWindowEx(null, hwnd, null, null);
        }
        return null;
    }

    private static void setForegroundWindowWindows(HWND hwnd) {
        User32 user32 = User32.INSTANCE;
        user32.ShowWindow(hwnd, User32.SW_RESTORE);
        user32.SetForegroundWindow(hwnd);
    }

    // ============== macOS 实现 ==============//
    private static void handleMacOS(String title, String url) throws Exception {
        if (!isWindowOpenMacOS(title)) {
            Runtime.getRuntime().exec(new String[] { "open", "-a", "Google Chrome", url });
            Thread.sleep(5000);
        } else {
            activateWindowMacOS(title);
            Thread.sleep(1000);
        }
    }

    private static boolean isWindowOpenMacOS(String targetWindowTitle) throws IOException {
        try {
            String script = "tell application \"Google Chrome\" to get the name of every window";
            Process process = Runtime.getRuntime().exec(new String[] { "osascript", "-e", script });
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            System.out.println(output);
            if (output.toString().contains(targetWindowTitle)) {
                System.out.println("Target Windows is Open！");
                return true;
            } else {
                System.out.println("Not found target Windows");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private static void activateWindowMacOS(String title) throws IOException {
        try {
            String script = "tell application \"Google Chrome\"\n" +
                    "    set targetWindow to null\n" +
                    "    repeat with aWindow in windows\n" +
                    "        if title of aWindow contains \"DeepSeek\" then\n" +
                    "            set targetWindow to aWindow\n" +
                    "            exit repeat\n" +
                    "        end if\n" +
                    "    end repeat\n" +
                    "    if targetWindow is not null then\n" +
                    "        activate\n" +
                    "        set index of targetWindow to 1\n" +
                    "        tell application \"System Events\"\n" +
                    "            tell process \"Google Chrome\"\n" +
                    "                set frontmost to true\n" +
                    "                perform action \"AXRaise\" of (window 1 whose title contains \"DeepSeek\")\n" +
                    "            end tell\n" +
                    "        end tell\n" +
                    "    else\n" +
                    "        display dialog \"未找到目标窗口。\"\n" +
                    "    end if\n" +
                    "end tell";

            Process process = Runtime.getRuntime().exec(new String[] { "osascript", "-e", script });

            // 打印输出和错误
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            while ((line = errorReader.readLine()) != null) {
                System.err.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ============== Linux 实现 ==============//
    private static void handleLinux(String title, String url) throws Exception {
        if (!isWindowOpenLinux(title)) {
            Runtime.getRuntime().exec(new String[] { "xdg-open", url });
            Thread.sleep(5000);
        } else {
            activateWindowLinux(title);
            Thread.sleep(1000);
        }
    }

    private static boolean isWindowOpenLinux(String title) throws IOException {
        Process process = Runtime.getRuntime().exec("wmctrl -l");
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains(title))
                    return true;
            }
            return false;
        } finally {
            if (reader != null)
                reader.close();
        }
    }

    private static void activateWindowLinux(String title) throws IOException {
        Runtime.getRuntime().exec(new String[] { "wmctrl", "-a", title });
    }

    // ============== 中文输入逻辑 ==============//
    private static void inputChineseWithRobot(String text) throws AWTException {
        Robot robot = new Robot();
        robot.delay(10);

        setClipboardText(text);

        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("mac")) {
            //robot.mousePress(InputEvent.BUTTON1_DOWN_MASK); // 按下左键
            //robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK); // 释放左键

            robot.keyPress(KeyEvent.VK_META); // Command+V
            robot.keyPress(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_META);

        } else {
            robot.keyPress(KeyEvent.VK_CONTROL); // Control+V
            robot.keyPress(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_CONTROL);
        }
        robot.delay(10);
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);
    }

    private static void setClipboardText(String text) {
        StringSelection selection = new StringSelection(text);
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        clipboard.setContents(selection, null);
    }

}
