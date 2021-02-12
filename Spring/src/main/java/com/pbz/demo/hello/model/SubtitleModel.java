package com.pbz.demo.hello.model;

public class SubtitleModel {
	public int num;
	public int star;
	public int end;
	public String contextEng = "";
	public String contextCh = "";

	public String toString() {
		StringBuilder out = new StringBuilder();
		out.append(num).append(":").append("(").append(star).append(",").append(end).append(") ").append(contextEng)
				.append(contextCh);
		return out.toString();
	}
}
