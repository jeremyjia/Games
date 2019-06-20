package com.util;

public class MyNode {

	public MyNode(int x, int y, int index, MyNode parent) {

		this.pos = new Position(x, y);
		this.index = index;
		this.parent = parent;
	}

	public MyNode getParent() {
		return this.parent;
	}

	public Position pos;
	public int index;
	public MyNode parent = null;

}
