package com.pbz.demo.hello.service;

import java.io.IOException;
import java.util.Iterator;

import javax.annotation.PostConstruct;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.util.FileUtil;

@Component
@Service
public class VOAService {

	@PostConstruct
	public void init() {
	}

	public String getText(String url, String rule, String charset, Integer i) {
		try {
			String text = parseTextFromHTML(url, rule, charset);
			text = addLinefeeds(text, i);
			return text;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "ERROR";
	}

	public String getTitle(String url) {
		try {
			String title = parseTitleFromHTML(url);
			title = addLinefeeds(title, 30);
			return title;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "ERROR";
	}

	private String parseTitleFromHTML(String url) throws IOException {
		String htmlText = FileUtil.getHTMLContentByUrl(url, "utf-8");
		Document doc = Jsoup.parse(htmlText);
		Elements eles = doc.getElementsByTag("title");
		Element titleElm = eles.get(0);
		System.out.println("Title:" + titleElm.text());
		return titleElm.text();
	}

	private String parseTextFromHTML(String url, String rule, String charset) throws IOException {
		String htmlText = FileUtil.getHTMLContentByUrl(url, charset);
		String endTag = "_______";
		if (htmlText != null) {
			Document doc = Jsoup.parse(htmlText);
			Elements elements = (Elements) doc.getElementsByTag(rule);
			StringBuffer buffer = new StringBuffer();
			Iterator<Element> it = elements.iterator();
			while (it.hasNext()) {
				Element element = it.next();
				if (element.className() != null && element.className() != "") {
					continue;
				}
				String p = element.text().trim();
				if (p.contains(endTag)) {
					break;
				}
				buffer.append(p);
			}
			return buffer.toString().trim();
		}
		return "";
	}

	// 将文本分割为多行
	private String addLinefeeds(String text, int number) {
		StringBuffer buffer = new StringBuffer();
		int index = 0;
		for (int i = 0; i < text.length(); i++) {
			char p = text.charAt(i);
			if (index == number) {
				if (p != ' ') {
					buffer.append(p);
					continue;
				}
				buffer.append("\\n");
				buffer.append(p);
				index = 0;
			} else {
				buffer.append(p);
				index++;
			}
		}
		return buffer.toString().trim();
	}
}
