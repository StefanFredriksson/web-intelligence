package SearchEngine;

import java.io.*;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class Scraper {
	private static String rootDir = System.getProperty("user.dir") + "/src/SearchEngine/Data/RawHtml/";
	
	public static void Scrape(String url) {
		WebClient client = new WebClient();
		client.getOptions().setCssEnabled(false);
		client.getOptions().setJavaScriptEnabled(false);
		Scrape(client, url);
	}
	
	private static void Scrape(WebClient client, String url) {
		String fileName = rootDir + ExtractFileName(url);
		
		try {
			HtmlPage page = client.getPage(url);
			String rawHtml = page.asXml();
			SaveFile(fileName, rawHtml);
			
			int startIndex = 0;

			do {
				startIndex = rawHtml.indexOf("<a", startIndex);
				if (startIndex == -1 || Finished()) {
					break;
				}

				int endIndex = rawHtml.indexOf("</a>", startIndex);
				String link = rawHtml.substring(startIndex, endIndex);
				int aStart = link.indexOf("href=\"") + 6;
				int aEnd = link.indexOf('"', aStart);
				
				if (aEnd - aStart < 6) {
					startIndex = endIndex;
					continue;
				}
				String ref = link.substring(aStart, aEnd);
				String wikiCheck = ref.substring(0, 6);
				int hashIndex = ref.indexOf('#');
				
				if (hashIndex != -1) {
					ref = ref.substring(0, hashIndex);
				}
				
				if (wikiCheck.equals("/wiki/") && !ref.contains(":")) {
					String newUrl = "https://en.wikipedia.org" + ref;
					page = client.getPage(newUrl);
					String content = page.asXml();
					String path = rootDir + ExtractFileName(newUrl);
					SaveFile(path, content);
				}
				startIndex = endIndex;
			} while (startIndex != -1);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	
	private static String ExtractFileName(String url) {
		int index = url.lastIndexOf('/');
		return url.substring(index + 1);
	}
	
	private static boolean Finished() {
		File folder = new File(rootDir);
		File[] files = folder.listFiles();
		
		return files.length >= 200;
	}
	
	private static void SaveFile(String path, String content) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(path));
			writer.write(content);
			writer.close();
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
