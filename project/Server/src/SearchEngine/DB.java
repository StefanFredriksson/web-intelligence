package SearchEngine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * Represents a simulated database.
 */
public class DB {
	public static HashMap<String, Integer> map = new LinkedHashMap<String, Integer>();
	public static List<Page> pages = new ArrayList<Page>();

	public static int GetIdForWord (String word) {
		if (map.containsKey(word)) {
			return map.get(word);
		} else {
			int id = map.size();
			map.put(word, id);
			
			return id;
		}
	}
}
