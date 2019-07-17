package com.mygdx.game;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Created by Jeremyjia
 * on 2019/7/18
 */

public class GameAIHelper {

    public static Queue<MyNode> queue = new LinkedList<MyNode>();
    private int[] data;

    private static final int NUM = 3;
    private static final int BLANK = NUM * NUM - 1;
    private static final int TRY_TIMES = 10000000;

    private static final int UP = 1;
    private static final int DOWN = 2;
    private static final int LEFT = 3;
    private static final int RIGHT = 4;


    public GameAIHelper(int[] a) {
        this.data = new int[NUM * NUM];
        for (int i = 0; i < a.length; i++) {
            data[i] = a[i];
        }
    }

    public MyNode AISearch() {
        int i = 1;
        queue.add(new MyNode(this.data, null));

        while (!queue.isEmpty()) {
            MyNode curNode = queue.remove();
            if (isSuccess(curNode)) {
                System.out.println("Successfully find a solution! "+i);
                return curNode;
            }
            int dir = RIGHT;
            i++;
            while (dir > 0) {
                Position curPos = getBlankBoxPos(curNode.getData());
                Position newPos = nextPos(curPos, dir);
                if (canPass(newPos) && !isFromParentDir(curNode, newPos)) {
                    int[] data = getNewData(curNode.getData(), curPos, newPos);
                    queue.add(new MyNode(data, curNode));
                }
                dir--;
            }
            if (i > TRY_TIMES) {
                System.out.println("Trying many times but still can't find a solution!");
                break;
            }
        }
        return null;
    }

    private int[] getNewData(int[] curData, Position curPos, Position next) {
        int[] a = new int[NUM * NUM];
        for (int i = 0; i < curData.length; i++) {
            a[i] = curData[i];
        }
        int tmp = a[NUM * next.x + next.y];
        a[3 * next.x + next.y] = a[NUM * curPos.x + curPos.y];
        a[3 * curPos.x + curPos.y] = tmp;

        return a;
    }

    private Position nextPos(Position curpos, int dir) {
        Position nextpos = null;
        if (dir == RIGHT) {
            nextpos = new Position(curpos.x, curpos.y + 1);
        } else if (dir == DOWN) {
            nextpos = new Position(curpos.x + 1, curpos.y);
        } else if (dir == LEFT) {
            nextpos = new Position(curpos.x, curpos.y - 1);
        } else if (dir == UP) {
            nextpos = new Position(curpos.x - 1, curpos.y);
        }
        return nextpos;
    }

    private boolean isFromParentDir(MyNode o, Position nextDir) {
        if (o.getParent() != null) {
            MyNode father = o.getParent();
            Position pos = getBlankBoxPos(father.getData());
            if (pos.x == nextDir.x && pos.y == nextDir.y) {
                return true;
            }
        }
        return false;
    }

    private boolean canPass(Position pos) {
        int x = pos.x;
        int y = pos.y;
        if (x < 0 || x > NUM - 1 || y < 0 || y > NUM - 1) {
            return false;
        }
        return true;
    }

    private boolean isSuccess(MyNode nd) {
        int[] source = nd.getData();
        for (int i = 0; i < NUM; i++) {
            for (int j = 0; j < NUM; j++) {
                if (source[i * NUM + j] != i * NUM + j) {
                    return false;
                }
            }
        }
        return true;
    }

    private Position getBlankBoxPos(int a[]) {
        Position pt = null;
        for (int i = 0; i < NUM; i++) {
            for (int j = 0; j < NUM; j++) {
                if (a[i * NUM + j] == BLANK) {
                    pt = new Position(i, j);
                    break;
                }
            }
        }
        return pt;
    }

    public void printNodeData(MyNode o) {
        String s = new String("");
        for (int i : o.getData()) {
            s = s + " " + String.valueOf(i);
        }
        System.out.println(s);
    }

    public int getDiff(int[] a, int[] b) {
        for (int i = 0; i < NUM; i++) {
            for (int j = 0; j < NUM; j++) {
                if (a[i * NUM + j] != b[i * NUM + j]) {
                    return a[i * NUM + j] != BLANK ? a[i * NUM + j] : b[i * NUM + j];
                }
            }
        }
        return -1;
    }

    public class Position {
        private int x, y;
        public Position(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    public class MyNode {
        public MyNode(int[] a, MyNode parent) {
            int index = 0;
            data = new int[NUM * NUM];
            for (int i : a) {
                data[index++] = i;
            }
            this.parent = parent;
        }
        public MyNode getParent() {
            return this.parent;
        }
        public int[] getData() {
            return data;
        }
        private int data[];
        private MyNode parent = null;
    }
}

