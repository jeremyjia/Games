package com.pbz.demo.hello.model;

public class VideoDoc {
	public VideoDoc(String index, String des, String cs, String link, String page, String url) {
		id = index;
		description = des;
		content = cs;
		video_link = link;
		video_page = page;
		comment_url = url;
	}

	public String id;
	public String description;
	public String content;
	public String video_link;
	public String video_page;
	public String comment_url;

}
