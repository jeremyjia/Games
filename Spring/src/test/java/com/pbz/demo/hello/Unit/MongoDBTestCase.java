package com.pbz.demo.hello.Unit;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.pbz.demo.hello.dao.DocDao;
import com.pbz.demo.hello.entity.DocEntity;

@ExtendWith(SpringExtension.class)
@SpringBootTest()
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class MongoDBTestCase {

	@Autowired
	public DocDao docDao;
	public static boolean isConnect = false;

	@BeforeAll
	public static void setup() throws Exception {
	}

	@AfterAll
	public static void teardown() throws Exception {
	}

	@Test
	@Order(1)
	public void DBConnectionTest() {
		System.out.println("Test mongo");
		isConnect = docDao.testDBConnection();
		if (!isConnect) {
			System.out.println("Can't detect the mongodb port is running! Will ignore all test cases of MongoDB!");
		}
	}

	@Test
	@Order(2)
	public void saveDocTest() {
		if (!isConnect)
			return;

		DocEntity docEntity = new DocEntity();
		docEntity.setId(1L);
		docEntity.setTitle("Spring Boot中使用MongoDB");
		docEntity.setDescription("关注漂泊者乐园");
		docEntity.setBy("Jeremyjia");
		docEntity.setContent("{}");
		docDao.saveDoc(docEntity);

		docEntity = new DocEntity();
		docEntity.setId(2L);
		docEntity.setTitle("Test title");
		docEntity.setDescription("Test descritpiton");
		docEntity.setBy("maomaof");
		docEntity.setContent("{\"name\":\"maomao\"}");
		docDao.saveDoc(docEntity);
	}

	@Test
	@Order(3)
	public void updateDocTest() {
		if (!isConnect)
			return;

		DocEntity docEntity = new DocEntity();
		docEntity.setId(1L);
		docEntity.setTitle("Spring Boot中使用MongoDB");
		docEntity.setDescription("关注漂泊者乐园, 这里有开发技术的研究与知识分享");
		docEntity.setBy("littleflute");
		docEntity.setContent("{\"name\":\"jeremy\"}");
		docDao.updateDoc(docEntity);
	}

	@Test
	@Order(4)
	public void findDocByIdTest() {
		if (!isConnect)
			return;

		DocEntity demoEntity = docDao.findDocById(1L);
		System.out.println(demoEntity.toString());
	}

	@Test
	@Order(5)
	public void removeDocTest() {
		if (!isConnect)
			return;
		docDao.removeDoc(2L);
	}

}
