package com.pbz.scriptengine;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class App {

	private final static int w = 800;
	private final static int h = 600;
	private ScriptEngine m_engine = new ScriptEngineManager().getEngineByName("JavaScript");
	private JFrame jframe;
	private ImagePanel jp;
	private BufferedImage image;
	private Graphics2D g2;
	private boolean bStartPlay;
	private int iframe = 0;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new App();
	}

	public App() {
		jframe = new JFrame();
		jp = new ImagePanel();
		JLabel label = new JLabel("插件列表");
		JComboBox<String> combo = new JComboBox<String>();
		combo.addItem("--请选择插件--");
		List<File> plugins = getPluginFiles();
		for (File plugin : plugins) {
			combo.addItem(plugin.getName());
		}
		combo.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String plugin = (String) combo.getSelectedItem();
				try {
					iframe = 0;
					loadPlugin(plugin);
				} catch (Exception ex) {
					ex.printStackTrace();
				}
				System.out.println(plugin);
			}
		});

		JButton button = new JButton("播放");
		button.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				if (bStartPlay == false) {
					button.setText("停止");
					bStartPlay = true;
					Thread thread = new Thread(() -> {
						while (bStartPlay) {
							try {
								invokePluginFunction(iframe++);
								Thread.sleep(100);
							} catch (Exception e1) {
								e1.printStackTrace();
							}
						}
					});
					thread.start();
				} else {
					button.setText("播放");
					bStartPlay = false;
				}
			}
		});
		
		jp.add(label);
		jp.add(combo);
		jp.add(button);
		jframe.add(jp);
		jframe.setVisible(true);
		Dimension screensize = Toolkit.getDefaultToolkit().getScreenSize();
		int width = (int) screensize.getWidth();
		int height = (int) screensize.getHeight();
		jframe.setSize(width / 10 * 7, height / 10 * 8);
		jframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public void loadPlugin(String pluginName) throws FileNotFoundException, ScriptException, NoSuchMethodException {
		image = new BufferedImage(w, h, BufferedImage.TYPE_INT_BGR);
		g2 = (Graphics2D) image.getGraphics();
		g2.setBackground(Color.WHITE);

		m_engine.put("document", new JSGraphEngine(g2));
		StringBuffer sb = new StringBuffer();
		sb.append("function alert(msg) {print(msg); document.showMessage(msg);}");
		sb.append("function Image() { return document.getImageObj()}");
		m_engine.eval(sb.toString());

		File pluginFile = new File("./plugin/" + pluginName);
		if (!pluginFile.exists()) {
			pluginFile = new File("../plugin/" + pluginName);
		}
		File f = new File(pluginFile.getAbsolutePath());
		Reader r = new InputStreamReader(new FileInputStream(f));
		m_engine.eval(r);

		Invocable inv = (Invocable) m_engine;
		inv.invokeFunction("animateFrame", new Object[] { iframe });
		saveImage(image);
	}

	public void saveImage(BufferedImage image) {
		File file = new File("./sample.gif");
		try {
			ImageIO.write(image, "GIF", file);
			jp.setImage(image);
			jp.repaint();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void invokePluginFunction(int frameNumber) throws Exception {
		Invocable inv = (Invocable) m_engine;
		inv.invokeFunction("animateFrame", new Object[] { frameNumber });

		Font font = new Font("宋体", Font.PLAIN, 25);
		g2.setFont(font);
		g2.setColor(new Color(0, 220, 200));
		String index = Integer.toString(frameNumber);
		g2.drawString(index, w / 10 * 9, 40);

		jp.setImage(image);
		jp.repaint();
	}

	public static List<File> getPluginFiles() {
		List<File> plugins = new ArrayList<>();
		File dir = new File("./plugin");
		if (!dir.exists()) {
			dir = new File("../plugin");
		}
		File[] dirFiles = dir.listFiles();
		for (File file : dirFiles) {
			if (file.isFile() && file.getAbsolutePath().endsWith(".js")) {
				plugins.add(file);
			}
		}
		return plugins;
	}

	public class ImagePanel extends JPanel {
		private static final long serialVersionUID = 205213029553909353L;
		private BufferedImage image;

		public BufferedImage getImage() {
			return image;
		}

		public void setImage(BufferedImage image) {
			this.image = image;
		}

		public ImagePanel() {
			try {
				image = ImageIO.read(new File("_sample.gif"));
			} catch (IOException e) {
			}
		}

		@Override
		public void paintComponent(Graphics g) {
			g.drawImage(image, 0, 0, null);
		}

	}

}
