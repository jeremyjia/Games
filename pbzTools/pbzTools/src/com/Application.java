package com;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.util.BytePictureUtils;

public class Application {
	public static void main(String[] args) throws Exception {

		Map<String, Object> map = new HashMap<>();
		InputStream in = null;
		String filePath = "data.properties";
		Properties properties = new Properties();
		try {
			in = new BufferedInputStream(new FileInputStream(new File(filePath)));
			properties.load(new InputStreamReader(in, "utf-8"));
		} catch (Exception e) {
			e.printStackTrace();
		}

		Set<Object> keys = properties.keySet();
		for (Object key : keys) {
			String k = key.toString();
			String v = (String) properties.get(k);
			System.out.println(k + "=" + v);
			if (v != null && v.trim().startsWith("http") && v.trim().endsWith(".jpg")) {
				map.put(k, new PictureRenderData(400, 300, ".jpg", BytePictureUtils.getUrlByteArray(v)));
			} else if (v != null && v.trim().endsWith(".jpg")) {
				map.put(k, new PictureRenderData(400, 300, v));
			} else {
				map.put(k, v);
			}
		}

		File file = new File("./template.docx");
		XWPFTemplate template = XWPFTemplate.compile(file).render(map);
		FileOutputStream out = new FileOutputStream(new File("./output.docx"));
		template.write(out);
		out.flush();
		out.close();
		template.close();
	}
}
