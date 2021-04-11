package com.pbz.demo.hello.util.engine;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;

public class JSGraphEngine {

	private CanvasObj canvas = new CanvasObj();
	private ContextObj context = new ContextObj();
	private ImageObj image = new ImageObj();

	private Graphics2D graphics = null;

	public Graphics2D getGraphics() {
		return graphics;
	}

	public void setGraphics(Graphics2D graphics) {
		this.graphics = graphics;
	}

	public JSGraphEngine() {
	}

	public JSGraphEngine(Graphics2D g2d) {
		graphics = g2d;
	}

	public CanvasObj getElementById(String id) {
		System.out.println("getElementById:" + id);
		return canvas;
	}

	public void showMessage(String msg) {
		System.out.println(msg);
	}

	public ImageObj getImageObj() {
		return image;
	}

	// Inner Class
	public class CanvasObj {
		public ContextObj getContext(String ctx) {
			return context;
		}
	}

	public class ContextObj {
		public String fillStyle = "";
		public String strokeStyle = "";
		public String font = "30px Arial";
		public int lineWidth = 1;
		public int from;
		public int to;

		public void fillRect(int x, int y, int width, int height) {
			applayColor();
			graphics.fillRect(x, y, width, height);
		}

		public void clearRect(int x, int y, int width, int height) {
			graphics.clearRect(x, y, width, height);

		}

		public void fillText(String text, float x, float y) {
			applayColor();
			applayFont();
			graphics.drawString(text, x, y);
		}

		public void arc(int x, int y, int r, float startfAngle, float endfAngle, boolean b) {
			double startAngle = (int) Math.toDegrees(startfAngle); // 弧度转为角度
			double arcAngle = Math.toDegrees(endfAngle - startfAngle);
			graphics.setStroke(new BasicStroke(r));
			if (strokeStyle.trim().length() > 0) {
				graphics.setStroke(new BasicStroke(lineWidth));
				applayStrokeColor();
				graphics.drawArc(x - r, y - r, 2 * r, 2 * r, (int) startAngle, (int) arcAngle); // 绘制圆弧（含整圆）
				strokeStyle = "";
			} else {
				applayColor();
				graphics.fillArc(x - r, y - r, 2 * r, 2 * r, (int) startAngle, (int) arcAngle);
			}
			// 记录圆弧终点的坐标, 作为下次调用lineTo的起点
			from = (int) (r * Math.cos(startfAngle) + x);
			to = (int) (r * Math.sin(endfAngle) + y);
		}

		public void arc(int x, int y, int r, float startAngle, float arcAngle) {
			arc(x, y, r, startAngle, arcAngle, false);
		}

		public void drawImage(Object o, int x, int y) {
			ImageObj obj = (ImageObj) o;
			System.out.println(obj.src);

		}

		public void moveTo(int x, int y) {
			from = x;
			to = y;
		}

		public void lineTo(int x, int y) {
			graphics.drawLine(from, to, x, y);
			from = x;
			to = y;
		}

		private void applayColor() {
			if (fillStyle.trim().length() > 0) {
				if ("Blue".equalsIgnoreCase(fillStyle)) {
					graphics.setColor(new Color(0, 0, 255));
				} else if ("Red".equalsIgnoreCase(fillStyle)) {
					graphics.setColor(new Color(255, 0, 0));
				} else if ("Yellow".equalsIgnoreCase(fillStyle)) {
					graphics.setColor(new Color(255, 255, 0));
				} else if ("Green".equalsIgnoreCase(fillStyle)) {
					graphics.setColor(new Color(0, 255, 0));
				} else if ("White".equalsIgnoreCase(fillStyle)) {
					graphics.setColor(new Color(255, 255, 255));
				} else if ("Black".equalsIgnoreCase(fillStyle)) {
					graphics.setColor(new Color(0, 0, 0));
				} else {
					graphics.setColor(new Color(220, 0, 0));
				}
			}
		}

		private void applayStrokeColor() {
			if (strokeStyle.trim().length() > 0) {
				if ("Blue".equalsIgnoreCase(strokeStyle)) {
					graphics.setColor(new Color(0, 0, 255));
				} else if ("Red".equalsIgnoreCase(strokeStyle)) {
					graphics.setColor(new Color(255, 0, 0));
				} else if ("Yellow".equalsIgnoreCase(strokeStyle)) {
					graphics.setColor(new Color(255, 255, 0));
				} else if ("Green".equalsIgnoreCase(strokeStyle)) {
					graphics.setColor(new Color(0, 255, 0));
				} else if ("White".equalsIgnoreCase(strokeStyle)) {
					graphics.setColor(new Color(255, 255, 255));
				} else if ("Black".equalsIgnoreCase(strokeStyle)) {
					graphics.setColor(new Color(0, 0, 0));
				} else {
					graphics.setColor(new Color(220, 220, 0));
				}
			}
		}

		private void applayFont() {
			if (font != null && font.trim().length() > 0) {
				String[] attr = font.split("\\ ");
				String fontSize = attr[0];
				String fontName = attr[1];
				int index = fontSize.indexOf("pt");
				if (index == -1) {
					index = fontSize.indexOf("px");
				}
				fontSize = fontSize.substring(0, index);
				float fSzie = Float.parseFloat(fontSize);
				Font font = new Font(fontName, Font.BOLD, (int) fSzie);
				graphics.setFont(font);
			} else {
				Font font = new Font("黑体", Font.BOLD, 10);
				graphics.setFont(font);
			}
		}

		public void beginPath() {
		}

		public void closePath() {
		}

		public void fill() {
		}

		public void stroke() {
		}

	}

	public class ImageObj {
		public String src = "";
	}
}
