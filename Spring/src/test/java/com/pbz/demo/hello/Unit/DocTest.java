package com.pbz.demo.hello.Unit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.pbz.demo.hello.controller.DocController;
import com.pbz.demo.hello.entity.DocEntity;

@ExtendWith(SpringExtension.class)
@SpringBootTest()
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DocTest {

	@Autowired
	private DocController docOperator = null;

	private Long id1 = (long) 365;
	private Long id2 = (long) 366;
	private Long id = (long) 1000;
	private Long notExistId = (long) 0;
	private String title = "TestTitle";
	private String description = "TestDescription";
	private String author = "TestAuthor";
	private String jsonString = "{\"Test\" = \"This is a test json string\"}";

	@BeforeAll
	public static void setup() throws Exception {

	}

	@AfterAll
	public static void teardown() throws Exception {

	}

	@Test
	@Order(1)
	void testSaveJsonDoc2DataBase() throws Exception {
		assertEquals(jsonString, docOperator.saveJsonDoc2DataBase(id, title, description, author, jsonString));
	}

	@Test
	@Order(2)
	void testGetDocByID() throws Exception {
		ResponseEntity<DocEntity> docEntity = null;

		// Positive
		docEntity = docOperator.getDocByID(id);
		assertEquals(id, docEntity.getBody().getId());
		assertEquals(title, docEntity.getBody().getTitle());
		assertEquals(description, docEntity.getBody().getDescription());
		assertEquals(author, docEntity.getBody().getBy());
		assertEquals(jsonString, docEntity.getBody().getContent());

		// Negative
		docEntity = null;
		docEntity = docOperator.getDocByID(notExistId);
		assertEquals(HttpStatus.NOT_FOUND, docEntity.getStatusCode());
		assertEquals(null, docEntity.getBody());
	}

	@Test
	@Order(3)
	void testGetAllDocs() throws Exception {
		docOperator.saveJsonDoc2DataBase(id1, title, description, author, jsonString);
		docOperator.saveJsonDoc2DataBase(id2, title, description, author, jsonString);

		List<Long> expectIds = new ArrayList<Long>();
		List<Long> returnedIds = new ArrayList<Long>();
		expectIds.add(id);
		expectIds.add(id1);
		expectIds.add(id2);

		List<DocEntity> docEntityList = docOperator.getAllDocs();
		for (DocEntity doc : docEntityList) {
			returnedIds.add(doc.getId());
		}
		assertTrue(returnedIds.containsAll(expectIds));
	}

	@Test
	@Order(4)
	void testSearchDocByParam() throws Exception {
		ResponseEntity<List<DocEntity>> docEntityList;

		// Positive
		// By id
		docEntityList = docOperator.searchDocByParam("id", id.toString());
		assertEquals(1, docEntityList.getBody().size());
		assertEquals(id, docEntityList.getBody().get(0).getId());
		assertEquals(title, docEntityList.getBody().get(0).getTitle());
		assertEquals(description, docEntityList.getBody().get(0).getDescription());
		assertEquals(author, docEntityList.getBody().get(0).getBy());
		assertEquals(jsonString, docEntityList.getBody().get(0).getContent());
		// By title
		docEntityList = docOperator.searchDocByParam("title", title);
		assertEquals(3, docEntityList.getBody().size());
		assertEquals(title, docEntityList.getBody().get(0).getTitle());
		assertEquals(title, docEntityList.getBody().get(1).getTitle());
		assertEquals(title, docEntityList.getBody().get(2).getTitle());
		// By author
		docEntityList = docOperator.searchDocByParam("author", author);
		assertEquals(3, docEntityList.getBody().size());
		assertEquals(author, docEntityList.getBody().get(0).getBy());
		assertEquals(author, docEntityList.getBody().get(1).getBy());
		assertEquals(author, docEntityList.getBody().get(2).getBy());

		// Negative
		// By id
		docEntityList = docOperator.searchDocByParam("id", notExistId.toString());
		assertEquals(HttpStatus.NOT_FOUND, docEntityList.getStatusCode());
		assertEquals(null, docEntityList.getBody());
		// By title
		docEntityList = docOperator.searchDocByParam("title", "NotExistTitle");
		assertEquals(HttpStatus.NOT_FOUND, docEntityList.getStatusCode());
		assertEquals(null, docEntityList.getBody());
		// By author
		docEntityList = docOperator.searchDocByParam("author", "NotExistAutor");
		assertEquals(HttpStatus.NOT_FOUND, docEntityList.getStatusCode());
		assertEquals(null, docEntityList.getBody());
		// Not support type
		docEntityList = docOperator.searchDocByParam("NotSpportType", "NotSpportType");
		assertEquals(HttpStatus.BAD_REQUEST, docEntityList.getStatusCode());
		assertEquals(null, docEntityList.getBody());
	}

	@Test
	@Order(5)
	void testDeteleDocByID() throws Exception {
		ResponseEntity<DocEntity> docEntity = null;

		// Positive
		docEntity = docOperator.deteleDocByID(id);
		assertEquals(HttpStatus.NO_CONTENT, docEntity.getStatusCode());
		assertEquals(null, docEntity.getBody());
		docEntity = docOperator.getDocByID(id);
		assertEquals(HttpStatus.NOT_FOUND, docEntity.getStatusCode());
		// delete id1 & id2
		docEntity = docOperator.deteleDocByID(id1);
		assertEquals(HttpStatus.NO_CONTENT, docEntity.getStatusCode());
		assertEquals(null, docEntity.getBody());
		docEntity = docOperator.getDocByID(id1);
		assertEquals(HttpStatus.NOT_FOUND, docEntity.getStatusCode());
		docEntity = docOperator.deteleDocByID(id2);
		assertEquals(HttpStatus.NO_CONTENT, docEntity.getStatusCode());
		assertEquals(null, docEntity.getBody());
		docEntity = docOperator.getDocByID(id2);
		assertEquals(HttpStatus.NOT_FOUND, docEntity.getStatusCode());

		// Negative
		docEntity = null;
		docEntity = docOperator.deteleDocByID(notExistId);
		assertEquals(HttpStatus.NOT_FOUND, docEntity.getStatusCode());
	}

}
