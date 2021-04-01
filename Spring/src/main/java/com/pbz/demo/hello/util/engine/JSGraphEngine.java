package com.pbz.demo.hello.util.engine;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;

public class JSGraphEngine {

	private CanvasObj canvas = new CanvasObj();
	private ContextObj context = new ContextObj();
	private ImageObj image = new ImageObj();

	private Graphics2D graphics = null;

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

		public void fillRect(int x, int y, int width, int height) {
			applayColor();
			graphics.fillRect(x, y, width, height);
		}

		public void clearRect(int x, int y, int width, int height) {
			graphics.clearRect(x, y, width, height);

		}

		public void beginPath() {
		}

		public void fill() {
		}

		public void arc(int x, int y, int r, float startAngle, float arcAngle, boolean b) {
			applayColor();
			graphics.setStroke(new BasicStroke(r));
			graphics.drawArc(x, y, r, r, (int) startAngle, (int) arcAngle);
		}

		public void drawImage(Object o, int x, int y) {
			ImageObj obj = (ImageObj) o;
			System.out.println(obj.src);

		}

		private void applayColor() {
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
			} else {
				graphics.setColor(new Color(220, 220, 220));
			}
		}
	}

	public class ImageObj {
		public String src = "";
	}
}
