
import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URL;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Hacker {

	public static final String url = "https://jiqie.zhenbi.com/a/m14.htm";

	public static void main(String[] args) throws Exception {
		String imgName, text, color, font;
		if (args != null && args.length == 4) {
			imgName = args[0];
			text = args[1];
			color = args[2];
			font = args[3];
		} else {
			// default values
			text = "Jeremy";
			color = "#0E6608";
			font = "1.黑体";
			imgName = "signature.jpg";
		}

		System.out.print("Starting\n");
		savePictureBySelenium(imgName, text, color, font);
		System.out.print("Finished!\n");

	}

	public static void savePictureBySelenium(String imgName, String Name, String Color, String Font) throws Exception {
		
		System.setProperty("webdriver.chrome.driver", "../bin/chromedriver.exe");
		
		ChromeOptions options = new ChromeOptions();
		options.addArguments("-headless");// silent execution
		WebDriver driver = new ChromeDriver(options);
		driver.get(url);
		try {
			WebElement nameElement = driver.findElement(By.name("id"));
			WebElement colorElement = driver.findElement(By.name("id3"));
			WebElement fontElement = driver.findElement(By.name("id1"));
			WebElement bottonElement = driver.findElement(By.name("up"));

			nameElement.sendKeys(Keys.CONTROL, "a"); // Cytl+a
			nameElement.sendKeys(Name);
			fontElement.sendKeys(Font);
			colorElement.sendKeys(Keys.CONTROL, "a");
			colorElement.sendKeys(Color);
			bottonElement.click();
			// Wait
			new WebDriverWait(driver, Duration.ofSeconds(5))
					.until(ExpectedConditions.elementToBeClickable(By.name("up")));

			WebElement pictureElement = driver.findElement(By.xpath("/html/body/div[1]/span[2]/img"));
			String imgURL = pictureElement.getAttribute("src");
			downloadImg(imgURL, imgName);

		} catch (org.openqa.selenium.NoSuchElementException e) {
			System.out.print(e.getMessage());
		} catch (TimeoutException e) {
			System.out.print(e.getMessage());
		}

		driver.quit();
	}

	public static void downloadImg(String strUrl, String strImgName) throws Exception {
		URL url = null;
		url = new URL(strUrl);
		DataInputStream dis = new DataInputStream(url.openStream());
		String imageName = System.getProperty("user.dir") + File.separator + strImgName;
		FileOutputStream fos = new FileOutputStream(new File(imageName));
		byte[] buffer = new byte[1024];
		int length;
		while ((length = dis.read(buffer)) > 0) {
			fos.write(buffer, 0, length);
		}
		dis.close();
		fos.close();
	}

}
