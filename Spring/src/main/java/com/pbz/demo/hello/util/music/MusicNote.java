package com.pbz.demo.hello.util.music;

import java.awt.BasicStroke;
import java.awt.Graphics2D;

public class MusicNote {
    // 音符名称，音符的时间、音调属性
    public void draw_1_note(Graphics2D g, int left, int top, String note, float time, int tone) {

        if (time == 0) {
            System.out.println("The time is zero so don't draw anything");
            return;
        }
        int x = left;
        int y = top;
        int dy = 10;
        // 绘制音符
        g.drawString(note, x, y);

        // 绘制音符的时间，1/2，1/4，1/8，3/4
        int nDLine = 20;// 下划线的长度
        BasicStroke bs = new BasicStroke(2, BasicStroke.CAP_ROUND, BasicStroke.JOIN_BEVEL);
        g.setStroke(bs);

        int Nm = 0;
        int Nm1 = 0;
        if (time == 0.5) {
            Nm = 1;
        } else if (time == 0.25) {
            Nm = 2;
        } else if (time == 0.125) {
            Nm = 3;
        } else if (time == 0.75) {
            // 这个情况比较特殊
            g.drawLine(left - 5, top + dy, left + 40, top + dy);
            g.fillOval(left + 30, top - dy, 5, 5);
        } else if (time == 1 || time == 2 || time == 3 || time == 4) {
            Nm1 = (int) time - 1;
        }
        for (int i = 0; i < Nm; i++) {
            g.drawLine(left - 5, top + dy + i * 10, left + nDLine, top + dy + i * 10);
        }
        // 绘制音符右侧的- - -
        for (int i = 1; i <= Nm1; i++) {
            g.drawLine(left + i * 30, top - dy, left + i * 30 + 10, top - dy);
        }

        if (time == 0.75) {
            Nm = 1;
        }

        // 绘制音符的音调小圆点，高音在上方，低音在下方，在下方的时候要画到下划线的下面
        int Nn = Math.abs(tone);
        if (tone < 0) {
            for (int i = 0; i < Nn; i++) {
                g.fillOval(left + 5, top + dy + Nm * 10 + i * 15, 5, 5);
            }
        } else {
            for (int i = 0; i < Nn; i++) {
                g.fillOval(left + 5, top - 35 - i * 15, 5, 5);
            }
        }
    }

    public void draw_1_arc(Graphics2D gp2d, int x1, int y1, int x2, int y2, int dh, int dy) {
        // 在两个音符之间，绘制一条弧线     
        gp2d.getFontMetrics().getHeight();    
        int d = x2 - x1; // (x1,y1) (x2,y2)的距离
        int X = x1 + 10;
        int Y = y1 - dy - dh;
        int w = d;
        int h = 2 * dy;
        gp2d.drawArc(X, Y, w, h, 0, 180);  //API
    }

}
