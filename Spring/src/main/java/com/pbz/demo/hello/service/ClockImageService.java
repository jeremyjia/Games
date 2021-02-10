package com.pbz.demo.hello.service;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public class ClockImageService {
	private Font font1 = new Font("微软雅黑", Font.BOLD, 40);
	private Font font2 = new Font("微软雅黑", Font.BOLD, 15);

	@PostConstruct
	public void init() {
	}

	public void drawImage(Graphics g, int width, int height, String time) {
		int hour = Integer.parseInt(time.split("\\:")[0]);
		int min = Integer.parseInt(time.split("\\:")[1]);
		int sec = Integer.parseInt(time.split("\\:")[2]);

		drawBackground(g, width, height);
		drawClock(g, hour, min, sec);
		drawText(g, time);
	}

	private void drawText(Graphics g, String sTime) {
		int red = (int) (Math.random() * 255);
		int green = (int) (Math.random() * 255);
		int blue = (int) (Math.random() * 255);
		g.setColor(new Color(red, green, blue));
		g.setFont(font1);
		g.drawString(sTime, 120, 360);

	}

	private void drawBackground(Graphics g, int width, int height) {
		g.setColor(new Color(0xDCDCDC));
		g.fillRect(0, 0, width, height);
	}

	private double[] draw_Dot(double angle) {
		double[] co = new double[2];
		co[0] = 115 * Math.cos(angle);// 横坐标
		co[1] = 115 * Math.sin(angle);// 纵坐标
		return co;
	}

	private void draw_HourPointer(int second, Graphics2D g) {// second表示当前时间的时针相对00:00:00走了多少秒
		double x, y, angle;
		angle = second * Math.PI / 21600;// 时针的速度为PI/21600 (rad/s)
		x = 200 + 60 * Math.sin(angle);
		y = 165 - 60 * Math.cos(angle);
		g.setStroke(new BasicStroke(5, BasicStroke.CAP_BUTT, BasicStroke.JOIN_ROUND));
		g.setPaint(new GradientPaint(200, 165, Color.red, 260, 165, Color.blue, true));
		g.drawLine(200, 165, (int) x, (int) y);
	}

	private void draw_MinutePointer(int second, Graphics2D g) {// second表示当前时间的分针相对00:00:00走了多少秒
		double x, y, angle;
		angle = second * Math.PI / 1800;// 分针的速度为PI/1800 (rad/s)
		x = 200 + 80 * Math.sin(angle);
		y = 165 - 80 * Math.cos(angle);
		g.setStroke(new BasicStroke(3, BasicStroke.CAP_BUTT, BasicStroke.JOIN_ROUND));
		g.setPaint(new GradientPaint(200, 165, Color.magenta, 280, 165, Color.blue, true));
		g.drawLine(200, 165, (int) x, (int) y);
	}

	private void draw_SecondPointer(int second, Graphics2D g) {// second表示当前时间的秒针相对00:00:00走了多少秒
		double x, y, x1, y1, x2, y2, x3, y3, angle;
		double cos = 90 / Math.sqrt(8125);// 90*90+5*5
		double sin = 5 / Math.sqrt(8125);
		angle = second * Math.PI / 30;// 时针的速度为PI/30 (rad/s)
		x = 200 + 95 * Math.sin(angle);
		y = 165 - 95 * Math.cos(angle);
		x1 = 200 + 20 * Math.sin(angle + Math.PI);
		y1 = 165 - 20 * Math.cos(angle + Math.PI);
		x2 = 200 + Math.sqrt(8125) * (Math.sin(angle) * cos - Math.cos(angle) * sin); // sin(a-b)
		y2 = 165 - Math.sqrt(8125) * (Math.cos(angle) * cos + Math.sin(angle) * sin); // cos(a-b)
		x3 = 200 + Math.sqrt(8125) * (Math.sin(angle) * cos + Math.cos(angle) * sin); // sin(a+b)
		y3 = 165 - Math.sqrt(8125) * (Math.cos(angle) * cos - Math.sin(angle) * sin); // cos(a+b)
		g.setStroke(new BasicStroke(2, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL));
		g.setPaint(new GradientPaint(180, 165, Color.CYAN, 295, 165, Color.MAGENTA, true));
		g.drawLine((int) x1, (int) y1, (int) x, (int) y);
		g.drawLine((int) x2, (int) y2, (int) x, (int) y);
		g.drawLine((int) x3, (int) y3, (int) x, (int) y);
	}

	private void drawClock(Graphics g1, int hour, int min, int sec) {
		double x, y;
		Graphics2D g = (Graphics2D) g1;
		// 反锯齿开关开
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		// 画表盘
		g.setPaint(new GradientPaint(5, 40, Color.blue, 15, 50, Color.yellow, true));
		g.setStroke(new BasicStroke(3, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL));
		g.drawOval(75, 40, 250, 250);
		g.fillOval(195, 160, 10, 10);
		g.setColor(Color.black);

		// 画60个点
		for (int i = 0; i < 60; i++) {
			double[] co = new double[2];
			co = draw_Dot(i * 2 * Math.PI / 60);
			x = co[0];
			y = co[1];
			if (i == 0 || i == 15 || i == 30 || i == 45)// 画3,6,9,12四个大点
			{
				g.fillOval((int) (x - 5 + 200), (int) (y - 5 + 165), 10, 10);
			} else// 其他小点
			{
				g.fillOval((int) (x - 2.5 + 200), (int) (y - 2.5 + 165), 5, 5);
			}
		}

		// 画四个数字
		g.setFont(font2);
		g.drawString("3", 300, 171);
		g.drawString("6", 195, 273);
		g.drawString("9", 91, 171);
		g.drawString("12", 190, 68);

		// 画时针，分针，秒针
		draw_HourPointer(hour * 3600 + min * 60 + sec, g);// 时针走过的秒数
		draw_MinutePointer(min * 60 + sec, g);// 分针走过的秒数
		draw_SecondPointer(sec, g);// 秒针走过的秒数
	}
}
