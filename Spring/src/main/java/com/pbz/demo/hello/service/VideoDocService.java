package com.pbz.demo.hello.service;

import java.util.List;

import com.pbz.demo.hello.model.VideoDoc;

public interface VideoDocService {

	List<VideoDoc> findAll(String issueId);

}
