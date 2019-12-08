package SearchEngine;

import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Scanner;

public class DataLogic {
	private static String rootDir = System.getProperty("user.dir") + "/src/SearchEngine";
	private static String wordDestination = rootDir + "/Data/Words";
	private static String linkDestination = rootDir + "/Data/Links";

	public static void SetPages () {
		List<String> games = GetFiles(wordDestination + "/Games");
		List<String> progs = GetFiles(wordDestination + "/Programming");
		List<String> gLinks = GetFiles(linkDestination + "/Games");
		List<String> pLinks = GetFiles(linkDestination + "/Programming");
		SetPages(games, progs);
		SetLinks(gLinks, pLinks);
		
		for (Page p : DB.pages) {
			if (p.links.size() == 0) {
				System.out.println(p.url);
			}
		}
	}
	
	private static List<String> GetFiles (String path) {
		File folder = new File(path);
		List<String> files = new ArrayList<String>();
		
		for (File file : folder.listFiles()) {
			files.add(BreakOutName(file.toString()));
		}
		
		return files;
	}
	
	private static String BreakOutName (String file) {
		int index = file.lastIndexOf("\\");
		return file.substring(index + 1);
	}
	
	private static void SetPages (List<String> games, List<String> progs) {
		DB.pages.clear();
		for (String game : games) {
			if (!UrlExists(game)) {
				String data = ReadFile(wordDestination + "/Games/" + game);
				String[] words = data.split(" ");
				List<Integer> ids = new ArrayList<Integer>();
				
				for (String word : words) {
					ids.add(DB.GetIdForWord(word.toUpperCase()));
				}
				
				DB.pages.add(new Page(game, ids));
			}
		}
		
		for (String prog : progs) {
			if (!UrlExists(prog)) {
				String data = ReadFile(wordDestination + "/Programming/" + prog);
				String[] words = data.split(" ");
				List<Integer> ids = new ArrayList<Integer>();
				
				for (String word : words) {
					ids.add(DB.GetIdForWord(word.toUpperCase()));
				}
				
				DB.pages.add(new Page(prog, ids));
			}
		}
	}
	
	private static boolean UrlExists (String url) {
		for (Page p : DB.pages) {
			if (p.url.equals(url)) {
				return true;
			}
		}
		
		return false;
	}
	
	private static void SetLinks (List<String> games, List<String> progs) {
		for (String game : games) {
			String data = ReadFile(linkDestination + "/Games/" + game);
			String[] links = data.split("\n");
			HashSet<String> set = new LinkedHashSet<String>();
			
			for (int i = 0; i < links.length; i++) {
				if (links[i].length() > 0) {
					set.add(links[i].substring(6));
				}
			}
			
			for (Page page : DB.pages) {
				if (page.url.equals(game) && page.links.size() == 0) {
					page.SetLinks(set);
					break;
				}
			}
		}
		
		for (String prog : progs) {
			String data = ReadFile(linkDestination + "/Programming/" + prog);
			String[] links = data.split("\n");
			HashSet<String> set = new LinkedHashSet<String>();
			
			
			
			for (int i = 0; i < links.length; i++) {
				if (links[i].length() > 0) {
					set.add(links[i].substring(6));
				}
			}

			for (Page page : DB.pages) {
				if (prog.equals(page.url) && page.links.size() == 0) {
					page.SetLinks(set);
					break;
				}
			}
		}
	}
	
	private static String ReadFile (String path) {
		File file = new File(path);
		Scanner reader = null;
		try {		
			reader = new Scanner(file);
		} catch (Exception e) {
			System.out.println(e);
		}
		String data = "";
		
		while (reader.hasNextLine()) {
			data += reader.nextLine();
			if (reader.hasNextLine()) {
				data += "\n";
			}
		}
		return data;
	}
	
	public static List<Result> GetSubList (List<Result> results) {
		int MAX_RESULTS = 5;
		return results.size() >= MAX_RESULTS ? results.subList(0, MAX_RESULTS) : results.subList(0, results.size());
	}
}
