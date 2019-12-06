package SearchEngine;

import java.util.List;

public class Page {
	public String url;
	public List<Integer> words;
	
	public Page(String url, List<Integer> words) {
		this.url = url;
		this.words = words;
	}
}
