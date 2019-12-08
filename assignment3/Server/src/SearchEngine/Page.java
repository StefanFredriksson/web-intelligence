package SearchEngine;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;

public class Page {
	public String url;
	public List<Integer> words;
	public HashSet<String> links = new LinkedHashSet<String>();
	public double pageRank = 0;
	
	public Page(String url, List<Integer> words) {
		this.url = url;
		this.words = words;
	}
	
	public void SetLinks (HashSet<String> links) {
		this.links = links;
	}
	
	public boolean HasLinkTo(Page p) {
		return this.links.contains(p.url);
	}
}
