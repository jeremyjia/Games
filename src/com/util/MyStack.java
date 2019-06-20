package com.util;

import java.util.LinkedList;

public class MyStack {

	private LinkedList<MyObj> list = null;

	public MyStack() {
		list = new LinkedList<MyObj>();
	}

	public void Push(MyObj obj) {
		list.addFirst(obj);
	}

	public boolean isEmpty() {
		return list.isEmpty();
	}

	public MyObj Pop() {

		if (!list.isEmpty()) {
			return list.removeFirst();
		}
		return null;
	}

	public void clear() {
		list.clear();
	}

	public MyObj getTop() {
		if (!list.isEmpty()) {

			MyObj o = new MyObj();
			o.direction = list.getFirst().direction;
			o.index = list.getFirst().index;
			o.seat = list.getFirst().seat;

			return o;
		}
		return null;
	}

}
