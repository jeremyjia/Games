package com.seleniumTest.seleniumDemo;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Hello world!
 *
 */
public class SeleniumDemo {
	WebDriver driver;

	 public void initDrvier() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		driver = new ChromeDriver();
	}

	public void quitDrvier() {
		if (null != driver) {
			driver.quit();
		}
	}

	public void waitForSecond(int sec) {
		try {
			Thread.sleep(sec * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	//打开百度首页->搜索“selenium”关键字->打开搜索结果中百度百科界面
	public void searchInBaidu() {
		openURL("https://www.baidu.com");

		WebDriverWait wait1 = new WebDriverWait(driver, 5);
		wait1.until(ExpectedConditions.visibilityOfElementLocated(By.id("kw")));
		driver.findElement(By.id("kw")).sendKeys("selenium");
		driver.findElement(By.id("su")).click();
		waitForSecond(5);
		driver.findElement(By.partialLinkText("百度百科")).click();
		waitForSecond(5);
	}

	public void openURL(String URL) {
		driver.get(URL);
	}

	public static void main(String stuff[]) {
		SeleniumDemo demo = new SeleniumDemo();
		demo.initDrvier();
		demo.searchInBaidu();
		demo.quitDrvier();
		System.out.println("Done!");
	}
}
