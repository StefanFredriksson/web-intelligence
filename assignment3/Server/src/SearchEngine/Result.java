package SearchEngine;

public class Result implements Comparable<Result> {
	public String url;
	public double content = 0, location = 0, score = 0, rank = 0;
	
	public Result(String url, double score, double content, double location, double rank) {
		this.url = url;
		this.score = score;
		this.content = content;
		this.location = location;
		this.rank = rank;
	}
	
	public Double GetScore() {
		return this.score;
	}
	
	public String GetUrl() {
		return this.url;
	}

	@Override
	public int compareTo(Result o) {
		if (GetScore().equals(o.GetScore())) {
			return o.GetUrl().compareTo(GetUrl());
		}

		return GetScore().compareTo(o.GetScore());
	}
}
