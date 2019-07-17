package com.mygdx.game;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

import java.util.ArrayList;

public class GameM {

    //public int B[] = {0,1,2,3,4,5,6,7,8};
    //public int B[] = { 3, 0, 2, 8, 1, 4, 6, 7, 5 };//Jeremyjia Test data
    //public int B[] = { 6, 3, 2, 0, 8, 1, 7, 5, 4 };
    public int B[] = { 3, 2, 1, 6, 8, 4, 0, 5, 7 };
    public int A[] = {0,1,2,3,4,5,6,7,8};

    private float xdD = 120.0f;
    private float xdX = 120.0f;
    private float xdY = 120.0f;

    public void pbInit(ArrayList<Sprite> Ss, ArrayList<Texture> Ts){

        Ts.add(new Texture("1.jpg"));
        Ss.add(new Sprite(Ts.get(0)));
        Ts.add(new Texture("2.jpg"));
        Ss.add(new Sprite(Ts.get(1)));
        Ts.add(new Texture("3.jpg"));
        Ss.add(new Sprite(Ts.get(2)));

        Ts.add(new Texture("4.jpg"));
        Ss.add(new Sprite(Ts.get(3)));
        Ts.add(new Texture("5.jpg"));
        Ss.add(new Sprite(Ts.get(4)));
        Ts.add(new Texture("6.jpg"));
        Ss.add(new Sprite(Ts.get(5)));
        Ts.add(new Texture("7.jpg"));
        Ss.add(new Sprite(Ts.get(6)));
        Ts.add(new Texture("8.jpg"));
        Ss.add(new Sprite(Ts.get(7)));
        Ts.add(new Texture("9.jpg"));
        Ss.add(new Sprite(Ts.get(8)));
        //xdStart(A,B);  //need to make sure have a solution

        for(int i=0;i<Ss.size();i++){
            xdSetxy(Ss.get(B[i]),xdX+xdD*(i%3),xdY+xdD*(i/3), Gdx.graphics.getHeight());
        }
    }
    public void xdSwap(ArrayList<Sprite> sl,int i,int j){
        float xI = sl.get(i).getX();
        float yI = sl.get(i).getY();
        float xJ = sl.get(j).getX();
        float yJ = sl.get(j).getY();
        sl.get(i).setPosition(xJ,yJ);
        sl.get(j).setPosition(xI,yI);

    }
    public void xdSetxy(Sprite s,float x,float y,float h){
        s.setPosition(x-s.getWidth()/2,h-y-s.getHeight()/2);
    }
    public String xdStart(int a[],int b[]){
        String s = "b[]:";
        for(int i=0;i<b.length;i++){
            int n = (int)( Math.random()*11100);
            n%=9;
            while(a[n]==-1){
                n++;
                if(n>8) n=0;
            }
            b[i]=n;
            a[n]=-1;
        }
        for(int i=0;i<b.length;i++){
            s +=b[i] + "::";
        }
        return s;
    }
    public int xdGetBoxNoByXY(float x,float y,float x0,float y0,float d){
        int r = -1;
        int i = (int)((x-x0+d/2)/d);

        int j = (int)((y-y0+d/2)/d);

        if((i>=0&&i<=2)&&(j>=0&&j<=2)){
            r = j*3 + i;
        }
        return r;
    }
    public void pbDraw(SpriteBatch sb, ArrayList<Sprite> sl){
        for (int i = 0; i < sl.size(); i++) {
            sl.get(i).draw(sb);
        }
        String s = "";
        if((xdGetSpriteNoByBoxNo(sl,0)==0)
                &&(xdGetSpriteNoByBoxNo(sl,1)==1)
                &&(xdGetSpriteNoByBoxNo(sl,2)==2)
                &&(xdGetSpriteNoByBoxNo(sl,3)==3)
                &&(xdGetSpriteNoByBoxNo(sl,4)==4)
                &&(xdGetSpriteNoByBoxNo(sl,5)==5)
                &&(xdGetSpriteNoByBoxNo(sl,6)==6)
                &&(xdGetSpriteNoByBoxNo(sl,7)==7)){
            s += "You Win!";


        }
        BitmapFont f = new BitmapFont();

        f.setColor(Color.GREEN);
        f.draw(sb,"3x3Game:v0.1.2 \n -- " + s,450,400);
    }

    public int xdGetSpriteNoByBoxNo(ArrayList<Sprite>Ss,int iBox){
        int iRet = -1;
        for(int i=0;i<Ss.size();i++){
            float x = Ss.get(i).getX() + xdD/2;
            float y = Gdx.graphics.getHeight() - Ss.get(i).getY() -xdD/2;

            int ii = (int)((x-xdX+xdD/2)/xdD);
            int jj = (int)((y-xdY+xdD/2)/xdD);
            if(iBox==(jj*3+ii))
            {
                iRet = i;
            }
        }

        return iRet;
    }
}
