package com.pbz.demo.hello.util;

import java.util.HashMap;

public class MacroResolver {

	private static HashMap<String, String> resolver = new HashMap<>();

	public static void setProperty(String key, String value) {
		resolver.put(key, value);
	}

	public static String getProperty(String key) {
		return resolver.get(key);
	}

	public static boolean hasMacro(String string) {
		if (string == null)
			return false;
		int index = string.indexOf("${");
		return index != -1 ? true : false;
	}

	public static String resolve(String string) {
		if (string == null)
			return null;
		int index = string.indexOf("${");

		while (index != -1) {
			int nextIndex = string.indexOf("}", index);
			if (nextIndex != -1) {
				String variable = string.substring(index + 2, nextIndex);
				String value = resolver.get(variable);
				if (value == null)
					value = "";
				String newString = string.replaceFirst("\\$\\{" + variable + "\\}", "");
				string = new StringBuffer(newString).insert(index, value).toString();
				index = string.indexOf("${");
			}
		}
		return string;
	}

}
