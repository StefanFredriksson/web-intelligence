package SearchEngine;

import java.util.List;

public class Response {
	public List<Result> results;
	public int recCount;
	public double time;
	
	public Response (List<Result> results, int recCount, double time) {
		this.results = results;
		this.recCount = recCount;
		this.time = time;
	}
}
