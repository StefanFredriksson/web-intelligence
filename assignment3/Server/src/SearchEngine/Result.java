package SearchEngine;

public class Result implements Comparable<Result> {
	public String url;
	public double content = 0, location = 0, score = 0, rank = 0;
	
	public Result(String url, double score, double content, double location) {
		this.url = url;
		this.score = score;
		this.content = content;
		this.location = location;
	}
	
	public Double GetScore() {
		return this.score;
	}

	@Override
	public int compareTo(Result o) {
		return GetScore().compareTo(o.GetScore());
	}
}
