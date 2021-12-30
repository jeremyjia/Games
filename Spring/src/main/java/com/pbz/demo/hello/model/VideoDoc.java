package com.pbz.demo.hello.model;

public class VideoDoc {
	public VideoDoc(String index, String des, String cs, String link, String page) {
		id = index;
		description = des;
		content = cs;
		video_link = link;
		video_page = page;
	}

	public String id;
	public String description;
	public String content;
	public String video_link;
	public String video_page;

}
