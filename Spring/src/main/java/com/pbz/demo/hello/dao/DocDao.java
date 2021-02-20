package com.pbz.demo.hello.dao;

import java.util.List;

import com.pbz.demo.hello.entity.DocEntity;

/**
 * 描述: MongoDB增删改查
 *
 * @author Jeremyjia
 **/

public interface DocDao {
	void saveDoc(DocEntity demoEntity);

	void removeDoc(Long id);

	void updateDoc(DocEntity demoEntity);

	DocEntity findDocById(Long id);
	
	List<DocEntity> findDocById(String id);
	
	List<DocEntity> findDocByTitle(String title);
	
	List<DocEntity> findDocByAuthor(String author);

	public List<DocEntity> getAllDocs();

	boolean testDBConnection();
}
