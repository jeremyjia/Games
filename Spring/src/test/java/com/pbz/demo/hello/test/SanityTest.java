package com.pbz.demo.hello.test;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SanityTest.class)
public class SanityTest {

	@BeforeClass
	public static void setup() throws Exception {

	}

	@AfterClass
	public static void teardown() throws Exception {

	}

	@Ignore
	@Test
	public void Test1() throws Exception {
		RestTemplate restTemplate = new RestTemplate();
		String url = "http://localhost:8080/getResourceOnServer?filetype=json";
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
		String body = responseEntity.getBody();
		System.out.println(body);
		Assert.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
