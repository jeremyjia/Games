package com.pbz.demo.hello.util.music;
import java.awt.Graphics2D;

public class MusicNote {
    public void draw_1_note(Graphics2D g,int left, int top,String note,int time, int tone) { 
        int dy = 50;
        int x = left;
        int y = top;
        g.drawString("1 note",x,y);
        y+=dy;
        g.drawString(note,x,y);
        y+=dy;
        g.drawString("tm="+time,x,y);
        y+=dy;
        g.drawString("tn="+tone,x,y);
	}
    
}
