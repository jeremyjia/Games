import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class CrawlNetEaseSongs {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		CrawlFolkSongs();
		// crawlSearched();

		System.out.println("End of Crawling");

	}

	private static void crawlSearched() {
		String strUrl = "https://music.163.com//search/m/?id=1901371647&s=东方红&type=1";
		strUrl = "https://music.163.com/search?d=1901371647&s=东方红";
		CloseableHttpClient hc = HttpClients.createDefault();
		HttpGet hg = new HttpGet(strUrl);
		try {
			HttpResponse response = hc.execute(hg);
			HttpEntity entity = response.getEntity();
			InputStream htm_in = null;
			if (entity != null) {
				htm_in = entity.getContent();
				String htm_str = InputStream2String(htm_in, "utf-8");
				Document doc = Jsoup.parse(htm_str);

				Elements links = doc.select("div[class=g-bd]").select("div[class=g-wrap n-srch]");
				/*
				 * Elements links =
				 * doc.select("div[class=g-bd]").select("div[class=g-wrap n-srch]")
				 * .select("div[id=m-search]").select("div[class=ztag j-flag").select(
				 * "div[class=n-srchrst") .select("div[class=srchsongst");
				 */

				for (Element link : links) {
					Elements lin = link.select("a");
					String description = lin.attr("title");
					String href = lin.attr("href");
					href = "http://music.163.com" + href;
					System.out.println(description + "-" + href);
				}

			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private static void CrawlFolkSongs() {
		String strUrl = "http://music.163.com/discover/playlist/?order=hot&cat=民谣&limit=35&offset=35";
		// http://music.163.com/#/discover/playlist/?order=hot&cat=民谣&limit=35&offset=35
		CloseableHttpClient hc = HttpClients.createDefault();
		HttpGet hg = new HttpGet(strUrl);
		try {
			HttpResponse response = hc.execute(hg);
			HttpEntity entity = response.getEntity();
			InputStream htm_in = null;
			if (entity != null) {
				htm_in = entity.getContent();
				String htm_str = InputStream2String(htm_in, "utf-8");
				Document doc = Jsoup.parse(htm_str);
				Elements links = doc.select("div[class=g-bd]").select("div[class=g-wrap p-pl f-pr]")
						.select("ul[class=m-cvrlst f-cb]").select("div[class=u-cover u-cover-1");
				for (Element link : links) {
					Elements lin = link.select("a");
					String description = lin.attr("title");
					String href = lin.attr("href");
					href = "http://music.163.com" + href;
					System.out.println(description + "-" + href);
				}

			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public static String InputStream2String(InputStream in_st, String charset) throws IOException {
		BufferedReader buff = new BufferedReader(new InputStreamReader(in_st, charset));
		StringBuffer res = new StringBuffer();
		String line = "";
		while ((line = buff.readLine()) != null) {
			res.append(line);
		}
		return res.toString();
	}

}
