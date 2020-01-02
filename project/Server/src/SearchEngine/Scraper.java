package SearchEngine;

import java.io.*;
import java.util.*;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class Scraper {
	public static String rootDir = System.getProperty("user.dir") + "/src/SearchEngine/Data/RawHtml/";
	
	public static void Scrape(String url) {
		WebClient client = new WebClient();
		client.getOptions().setCssEnabled(false);
		client.getOptions().setJavaScriptEnabled(false);
		
		if (!Finished()) {
			Scrape(client, url);
		}
	}
	
	private static void Scrape(WebClient client, String url) {
		String fileName = rootDir + ExtractFileName(url);
		
		if (Finished()) {
			return;
		}
		
		try {
			HtmlPage page = client.getPage(url);
			String rawHtml = page.asXml();
			SaveFile(fileName, rawHtml);
			HashSet<String> links = Parser.ExtractLinks(page);
			
			for (String link : links) {
				if (Finished()) {
					break;
				}

				String newUrl = "https://en.wikipedia.org" + link;
				page = client.getPage(newUrl);
				String content = page.asXml();
				String path = rootDir + ExtractFileName(newUrl);
				SaveFile(path, content);
			}
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
	
	public static void SaveFile(String path, String content) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(path));
			writer.write(content);
			writer.close();
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
