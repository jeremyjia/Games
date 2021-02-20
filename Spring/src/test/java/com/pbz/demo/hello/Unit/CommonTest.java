package com.pbz.demo.hello.Unit;

import java.io.File;
import java.util.Map;

import org.junit.Assert;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.pbz.demo.hello.controller.CommonController;

@ExtendWith(SpringExtension.class)
@SpringBootTest()
public class CommonTest {

	@Autowired
	private CommonController commonOperator = null;

	private static String FILENAME_LOG = "Cmdlog.txt";
	private static final boolean isWindows = System.getProperty("os.name").startsWith("Windows");

	@BeforeAll
	public static void setup() throws Exception {
	}

	@AfterAll
	public static void teardown() throws Exception {
		File logFile = new File(System.getProperty("user.dir") + "/" + FILENAME_LOG);
		logFile.delete();
	}

	@Test
	public void TEST_processCommandOnServer() throws Exception {

		String[] cmd = { "cmd", "/c", "dir" };// cmd,/c,dir sh,-c,ls
		if (!isWindows) {
			cmd[0] = "sh";
			cmd[1] = "-c";
			cmd[2] = "ls";
		}
		Map<String, Object> respObject = (Map<String, Object>) commonOperator.processCommandOnServer(cmd);

		Assert.assertEquals("OK!", respObject.get("Status").toString());
	}

}
