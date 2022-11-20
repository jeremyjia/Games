package com.pbz.scriptengine;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Toolkit;
import java.awt.Transparency;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import javax.imageio.ImageIO;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class App {

	private final static int w = 1024;
	private final static int h = 768;
	private ScriptEngine m_engine = new ScriptEngineManager().getEngineByName("JavaScript");
	private JFrame jframe;
	private ImagePanel jp;
	private BufferedImage image;
	private Graphics2D g2;
	private boolean bStartPlay;
	private boolean bIsSelected = true;
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
		List<File> plugins = AppUtil.getPluginFiles();
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
								Thread.sleep(40);
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
		JCheckBox checkBox = new JCheckBox("去除底色");
		checkBox.setSelected(bIsSelected);
		checkBox.addItemListener(new ItemListener() {
			public void itemStateChanged(ItemEvent e) {
				if (checkBox.isSelected()) {
					bIsSelected = true;
				} else {
					bIsSelected = false;
				}
			}
		});
		jp.add(label);
		jp.add(combo);
		jp.add(button);
		jp.add(checkBox);
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

		// ---------- 使得背景透明 -----------------
		if (bIsSelected) {
			image = g2.getDeviceConfiguration().createCompatibleImage(w, h, Transparency.TRANSLUCENT);
			g2 = image.createGraphics();
		}
		g2.setBackground(Color.white);
		// ---------- 背景透明结束 -----------------

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
		try {
			if (bIsSelected) {
				AppUtil.convertToTransparencyImage(image);
			}
			ImageIO.write(image, "png", new File("./sample.png"));
			jp.setImage(image);
			jp.repaint();
		} catch (IOException e) {
			e.printStackTrace();
		}
		File fromFile = new File("./sample.png");
		File toFile = new File("./sample1.png");
		AppUtil.resizeImage(fromFile, toFile, w / 2, h / 2, false);
		AppUtil.convertImageToAlpha(new File("./sample1.png"), "./sample2.png");

	}

	public void invokePluginFunction(int frameNumber) throws Exception {
		g2.clearRect(0, 0, w, h);
		Invocable inv = (Invocable) m_engine;
		inv.invokeFunction("animateFrame", new Object[] { frameNumber });

		Font font = new Font("宋体", Font.PLAIN, 25);
		g2.setFont(font);
		g2.setColor(new Color(0, 220, 200));
		String index = Integer.toString(frameNumber);
		g2.drawString(index, w / 10 * 9, 40);

		if (bIsSelected) {
			AppUtil.convertToTransparencyImage(image);
		}
		jp.setImage(image);
		jp.repaint();
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
