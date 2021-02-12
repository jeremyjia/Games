package com.pbz.demo.hello.entity;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * 描述: DocEntity
 *
 * @author Jeremyjia
 **/
@Document(collection = "doc_collection")
public class DocEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Long id;

	private String title;
	private String description;
	@Field("author")
	private String by;
	private String content;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBy() {
		return by;
	}

	public void setBy(String by) {
		this.by = by;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String toString() {
		StringBuffer out = new StringBuffer();
		out.append("DocEntity=").append(id).append(";").append(title).append(";").append(description).append(";")
				.append(by).append(";").append(content);
		return out.toString();
	}

}