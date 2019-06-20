package com.util;

public class MyObj {

	public MyObj() {
		index = 0;
		seat = new Position(0, 0);
		direction = 0;
	}

	public MyObj(int dex, Position pos, int dir) {
		index = dex;
		seat = new Position(pos.x, pos.y);
		direction = dir;

	}

	public int index;
	public Position seat;
	public int direction;

}
