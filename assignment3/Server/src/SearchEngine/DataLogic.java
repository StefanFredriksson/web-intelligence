package SearchEngine;

import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

public class DataLogic {
	private static String wordDestination = "I:/Documents/java_courses/2dv600/src/search_engine/Data/Words";

	public static void SetPages () {
		List<String> games = GetGameFiles(wordDestination + "/Games");
		List<String> progs = GetProgFiles(wordDestination + "/Programming");
		SetPages(games, progs);
	}
	
	private static List<String> GetGameFiles (String path) {
		File folder = new File(path);
		List<String> files = new ArrayList<String>();
		
		for (File file : folder.listFiles()) {
			files.add(BreakOutName(file.toString()));
		}
		
		return files;
	}
	
	private static List<String> GetProgFiles (String path) {
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
			String data = ReadFile(wordDestination + "/Games/" + game);
			String[] words = data.split(" ");
			List<Integer> ids = new ArrayList<Integer>();
			
			for (String word : words) {
				ids.add(DB.GetIdForWord(word));
			}
			
			DB.pages.add(new Page(game, ids));
		}
		
		for (String prog : progs) {
			String data = ReadFile(wordDestination + "/Programming/" + prog);
			String[] words = data.split(" ");
			List<Integer> ids = new ArrayList<Integer>();
			
			for (String word : words) {
				ids.add(DB.GetIdForWord(word));
			}
			
			DB.pages.add(new Page(prog, ids));
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
		}
		return data;
	}
}
