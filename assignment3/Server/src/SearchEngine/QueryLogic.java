package SearchEngine;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class QueryLogic {

	public static List<Result> GetRecommendations (String query) {
		Score score = new Score();
		List<Result> results = new ArrayList<Result>();

		for (Page page : DB.pages) {
			score.content.add(GetFrequencyScore(query, page));
			score.location.add(GetLocationScore(query, page));
		}
		
		Normalize(score.content, false);
		Normalize(score.location, true);
		
		for (int i = 0; i < DB.pages.size(); i++) {
			Page p = DB.pages.get(i);
			
			if (score.content.get(i) > 0) {
				double finalScore = score.content.get(i) + 0.8 * score.location.get(i);
				results.add(new Result(p.url, finalScore, score.content.get(i), score.location.get(i)));
			}
		}
		
		Collections.sort(results);
		Collections.reverse(results);
		
		return results;
	}
	
	private static double GetFrequencyScore(String query, Page page) {
		String[] qws = query.split(" ");
		double score = 0;
		
		for (String q : qws) {
			int id = DB.GetIdForWord(q);
			for (int word : page.words) {
				if (id == word) {
					score++;
				}
			}
		}
		
		return score;
	}
	
	private static double GetLocationScore (String query, Page page) {
		String[] qws = query.split(" ");
		double score = 0;
		
		for (String q : qws) {
			boolean found = false;
			int id = DB.GetIdForWord(q);
			for (int i = 0; i < page.words.size(); i++) {
				if (page.words.get(i) == id) {
					score += i + 1;
					found = true;
					break;
				}
			}
			
			if (!found) {
				score += 100000;
			}
		}
		
		return score;
	}
	
	private static void Normalize (List<Double> scores, boolean smallIsBetter) {
		if (smallIsBetter) {
			double min = Min(scores);
			
			for (int i = 0; i < scores.size(); i++) {
				scores.set(i, min / Math.max(scores.get(i), 0.00001));
			}
		} else {
			double max = Max(scores);
			max = Math.max(max, 0.00001);
			
			for (int i = 0; i < scores.size(); i++) {
				scores.set(i, scores.get(i) / max);
			}
		}
	}
	
	private static double Min (List<Double> scores) {
		double min = Double.MAX_VALUE;
		
		for (double score : scores) {
			if (score < min) {
				min = score;
			}
		}
		
		return min;
	}
	
	private static double Max (List<Double> scores) {
		double max = Double.MIN_VALUE;
		
		for (double score : scores) {
			if (score > max) {
				max = score;
			}
		}
		
		return max;
	}
}
