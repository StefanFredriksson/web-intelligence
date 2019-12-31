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

	/**
	 * Generates the pages for the simulated database.
	 */
	public static void SetPages () {
		List<String> games = GetFiles(wordDestination + "/Games");
		List<String> progs = GetFiles(wordDestination + "/Programming");
		List<String> gLinks = GetFiles(linkDestination + "/Games");
		List<String> pLinks = GetFiles(linkDestination + "/Programming");
		SetPages(games, progs);
		SetLinks(gLinks, pLinks);
		//QueryLogic.CalculatePageRank();
	}
	
	/**
	 * Gets all the files in the specified folder.
	 * @param path Path to the folder.
	 * @return The files in the folder.
	 */
	private static List<String> GetFiles (String path) {
		File folder = new File(path);
		List<String> files = new ArrayList<String>();
		
		for (File file : folder.listFiles()) {
			files.add(BreakOutName(file.toString()));
		}
		
		return files;
	}
	
	/**
	 * Removes the path from the file name.
	 * @param file The file to remove the path from.
	 * @return The name of the file.
	 */
	private static String BreakOutName (String file) {
		int index = file.lastIndexOf("\\");
		return file.substring(index + 1);
	}
	
	/**
	 * Adds a page to the simulated database for every file name in the lists.
	 * @param games Game file names.
	 * @param progs Programming file names.
	 */
	private static void SetPages (List<String> games, List<String> progs) {

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
	
	/**
	 * Checks if a page with the same url already exists in the database.
	 * @param url The url to check.
	 * @return True if url exists, false if it doesn't.
	 */
	private static boolean UrlExists (String url) {
		for (Page p : DB.pages) {
			if (p.url.equals(url)) {
				return true;
			}
		}
		
		return false;
	}
	
	/**
	 * Sets the links for every page in the simulated database.
	 * @param games Game file names.
	 * @param progs Programming file names.
	 */
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
	
	/**
	 * Reads the data of the specified file.
	 * @param path Path to the file.
	 * @return Data contained inside the file.
	 */
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
	
	/**
	 * Returns the first few elements of the specified list.
	 * @param results The whole list.
	 * @return The sub list.
	 */
	public static List<Result> GetSubList (List<Result> results) {
		int MAX_RESULTS = 5;
		return results.size() >= MAX_RESULTS ? results.subList(0, MAX_RESULTS) : results.subList(0, results.size());
	}
}
