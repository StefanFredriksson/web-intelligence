package SearchEngine;

import java.net.URL;
import java.util.*;

import com.gargoylesoftware.htmlunit.*;
import com.gargoylesoftware.htmlunit.html.*;

public class Parser {
	private static String baseUrl = "https://en.wikipedia.org/wiki/";
	private static String wordDir = System.getProperty("user.dir") + "/src/SearchEngine/Data/Words/Project/";
	private static String linkDir = System.getProperty("user.dir") + "/src/SearchEngine/Data/Links/Project/";

	public static void ParseData() {
		WebClient client = new WebClient();
		client.getOptions().setCssEnabled(false);
		client.getOptions().setJavaScriptEnabled(false);
		ParseData(client);
	}
	
	private static void ParseData(WebClient client) {
		List<String> files = DataLogic.GetFiles(Scraper.rootDir);

		for (String file : files) {
			if (FileExists(file)) {
				continue;
			}
			
			String text = DataLogic.ReadFile(Scraper.rootDir + file);
			HtmlPage page = GetPage(file, text, client);
			
			if (page != null) {
				String words = ExtractWords(page);
				Scraper.SaveFile(wordDir + file, words);
				HashSet<String> links = ExtractLinks(page);
				String data = "";

				for (String link : links) {
					data += link + "\n";
				}
				
				Scraper.SaveFile(linkDir + file, data);
			}
		}
	}
	
	private static HtmlPage GetPage(String file, String text, WebClient client) {
		try {
			StringWebResponse res = new StringWebResponse(text, new URL(baseUrl + file));
			HtmlPage page = HTMLParser.parseHtml(res, client.getCurrentWindow());
			return page;
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return null;
	}
	
	private static String ExtractWords(HtmlPage page) {
		DomElement element = page.getElementById("mw-content-text");
		DomElement title = page.getElementById("firstHeading");
		String text = title.getTextContent() + element.getTextContent();
		String words = GetWords(text);
		return words;
	}
	
	private static String GetWords(String text) {
		String word = "";
		String allWords = "";
		
		char[] characters = text.toCharArray();
		
		for (char c : characters) {
			if (Character.isLetter(c) || Character.isDigit(c)) {
				word += c;
			} else if (c == ' ' && word.length() > 0) {
				allWords += word + " ";
				word = "";
			}
		}
		
		return allWords;
	}
	
	public static HashSet<String> ExtractLinks(HtmlPage page) {
		DomElement element = page.getElementById("mw-content-text");
		DomNodeList<HtmlElement> aTags = element.getElementsByTagName("a");
		HashSet<String> links = new LinkedHashSet<String>();
		
		for (HtmlElement a : aTags) {
			String href = a.getAttribute("href");
			
			if (href.length() > 6 && IsWikiLink(href) && LinkIsForAnArticle(href)) {
				int hashIndex = href.indexOf('#');
				
				if (hashIndex != -1) {
					href = href.substring(0, hashIndex);
				}

				links.add(href);
			}
		}
		
		return links;
	}
	
	private static boolean IsWikiLink(String link) {
		String wikiCheck = link.substring(0, 6);
		return wikiCheck.equals("/wiki/");
	}
	
	private static boolean LinkIsForAnArticle(String link) {
		return !link.contains(":");
	}
	
	private static boolean FileExists(String file) {
		List<String> wordFiles = DataLogic.GetFiles(wordDir);
		List<String> linkFiles = DataLogic.GetFiles(linkDir);
		
		return wordFiles.contains(file) && linkFiles.contains(file);
	}
}
