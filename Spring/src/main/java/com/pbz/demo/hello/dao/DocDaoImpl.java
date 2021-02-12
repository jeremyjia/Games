package com.pbz.demo.hello.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.pbz.demo.hello.entity.DocEntity;
import com.pbz.demo.hello.util.ExecuteCommand;

@Service
public class DocDaoImpl implements DocDao {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public void saveDoc(DocEntity demoEntity) {
		mongoTemplate.save(demoEntity);
	}

	@Override
	public void removeDoc(Long id) {
		DocEntity docEntity = new DocEntity();
		docEntity.setId(id);
		mongoTemplate.remove(docEntity);
	}

	@Override
	public void updateDoc(DocEntity docEntity) {
		Query query = new Query(Criteria.where("id").is(docEntity.getId()));
		Update update = new Update();
		update.set("title", docEntity.getTitle());
		update.set("description", docEntity.getDescription());
		update.set("by", docEntity.getBy());
		update.set("content", docEntity.getContent());
		mongoTemplate.updateFirst(query, update, DocEntity.class);
	}

	@Override
	public DocEntity findDocById(Long id) {
		Query query = new Query(Criteria.where("id").is(id));
		DocEntity docEntity = mongoTemplate.findOne(query, DocEntity.class);
		return docEntity;
	}
	
	@Override
	public List<DocEntity> findDocById(String id) {
		Query query = new Query(Criteria.where("id").is(Long.parseLong(id)));
		List<DocEntity> docEntity = mongoTemplate.find(query, DocEntity.class);
		return docEntity;
	}
	
	@Override
	public List<DocEntity> findDocByTitle(String title) {
		Query query = new Query(Criteria.where("title").is(title));
		List<DocEntity> docEntity = mongoTemplate.find(query, DocEntity.class);
		return docEntity;
	}
	
	@Override
	public List<DocEntity> findDocByAuthor(String author) {
		Query query = new Query(Criteria.where("author").is(author));
		List<DocEntity> docEntity = mongoTemplate.find(query, DocEntity.class);
		return docEntity;
	}

	@Override
	public boolean testDBConnection() {
		String dbName = mongoTemplate.getDb().getName();
		System.out.println("数据库名为：" + dbName);
		boolean isConnect = ExecuteCommand.isLocalPortUsing(27017);
		return isConnect;
	}

	@Override
	public List<DocEntity> getAllDocs() {
		return mongoTemplate.findAll(DocEntity.class);
	}

}