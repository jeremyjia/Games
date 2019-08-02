package com.mygdx.game;


import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;

public class GameMgr
{
    private Pixmap pixmap;
    private Texture dashboard;


    private static final int LEFT_BUTTON = 1;
    private static final int RIGHT_BUTTON = 3;
    private static final int YES = 1;
    private static final int NO = 0;
    private static final int UP = 1;
    private static final int DOWN = 2;
    private static final int LEFT = 3;
    private static final int RIGHT = 4;

    private int nCell = 40; // cell size
    private int nX = 0; // start X position

    // 1:wall,2:ball,3:path
    private static final int NUM = 10;
    private static final int nY = 20;
    private int[][] allChess = new int[NUM][NUM];
    private int[][] maze = new int[NUM][NUM];
    private int[][] pathIndex = new int[NUM][NUM];
    public static final String[] algorithmArray = { "→↓←↑", "←↓→↑", "↑←↓→",
            "↓→↑←", "Breadth First Search", "Recursion" };

    public GameMgr() {
        initUI();
    }

    public GameMgr(Pixmap pixmap, Texture t) {
        this.pixmap = pixmap;
        this.dashboard = t;
        initUI();
    }

    private void initUI() {
        for (int i=0; i<10;i++){
            pixmap.drawLine(10+i*40, nY, 10+i*40, nY+9*40);
            pixmap.drawLine(10, nY+i*40, 10+9*40, nY+i*40);
        }

        pixmap.setColor(Color.RED);
        pixmap.fillCircle(70, 120, 20);
    }

    public void onDraw(){
    for (int i=0; i < NUM-1; i++) {
        for (int j=0; j < NUM-1; j++) {
            if (this.allChess[i][j] == 1) {
                pixmap.setColor(Color.RED);
                pixmap.fillCircle(10+ i*40+20, nY+j*40+20,20);
                dashboard.draw(pixmap,0,0);

            }else {
                pixmap.setColor(Color.YELLOW);
                pixmap.fillCircle(10+ i*40+20, nY+j*40+20,20);
                dashboard.draw(pixmap,0,0);
            }
        }
      }
    }

    public void updatePlane(int screenX, int screenY){

        int x = (screenX - 10)/40;
        int y =  (screenY - 10 - nY)/40;
        Gdx.app.log("MyTag", "touchDown: (" + x+","+y+")");
        allChess[x][y] = 1;
    }


}

