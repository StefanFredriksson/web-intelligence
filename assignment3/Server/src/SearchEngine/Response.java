package SearchEngine;

import java.util.List;

public class Response {
	public List<Result> results;
	public int recCount;
	
	public Response (List<Result> results, int recCount) {
		this.results = results;
		this.recCount = recCount;
	}
}
