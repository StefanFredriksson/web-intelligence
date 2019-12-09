package SearchEngine;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class QueryLogic {

	/**
	 * Only takes the word frequency into consideration when creating recommendations.
	 * @param query The search query from the client.
	 * @return The recommendations.
	 */
	public static List<Result> GetBadRecommendations (String query) {
		Score score = new Score();
		List<Result> results = new ArrayList<Result>();
		
		for (Page page : DB.pages) {
			score.content.add(GetFrequencyScore(query, page));
		}
		
		Normalize(score.content, false);
		
		for (int i = 0; i < DB.pages.size(); i++) {
			Page p = DB.pages.get(i);

			if (score.content.get(i) > 0) {
				double finalScore = score.content.get(i);
				results.add(new Result(p.url, finalScore, score.content.get(i), 0.0, 0.0));
			}
		}
		
		Collections.sort(results);
		Collections.reverse(results);
		
		return results;
	}
	
	/**
	 * Uses all metrics when calculating its recommendations.
	 * @param query Search query from the client.
	 * @return The recommendations.
	 */
	public static List<Result> GetRecommendations (String query) {
		Score score = new Score();
		List<Result> results = new ArrayList<Result>();
		
		for (Page page : DB.pages) {
			score.content.add(GetFrequencyScore(query, page));
			score.location.add(GetLocationScore(query, page));
		}

		//CalculatePageRank();
		Normalize(score.content, false);
		Normalize(score.location, true);
		
		for (int i = 0; i < DB.pages.size(); i++) {
			Page p = DB.pages.get(i);
			
			if (score.content.get(i) > 0) {
				double finalScore = score.content.get(i) + 0.8 * score.location.get(i) + 0.5 * p.pageRank;
				results.add(new Result(p.url, finalScore, score.content.get(i), score.location.get(i), p.pageRank));
			}
		}
		
		Collections.sort(results);
		Collections.reverse(results);
		
		return results;
	}
	
	/**
	 * Calculates the number of times each word in the query appears on the specified page.
	 * @param query The search query from the client.
	 * @param page The page to check.
	 * @return Number of times the search query appears on the page.
	 */
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
	
	/**
	 * Calculates how early on the specified page the search query appears.
	 * @param query The search query from the client.
	 * @param page The page to check.
	 * @return A value representing how early the search query appears on the page.
	 */
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
	
	/**
	 * Converts values so they are all inside the range 0 <= value <= 1.
	 * @param scores The scores to normalize.
	 * @param smallIsBetter Decides if small values are better than large values before the normalization.
	 */
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
	
	/**
	 * Finds the minimum value of the list.
	 * @param scores List containing all the values.
	 * @return The minimum value.
	 */
	private static double Min (List<Double> scores) {
		double min = Double.MAX_VALUE;
		
		for (double score : scores) {
			if (score < min) {
				min = score;
			}
		}
		
		return min;
	}
	
	/**
	 * Finds the maximum value of the list.
	 * @param scores List containing all the values.
	 * @return The maximum value.
	 */
	private static double Max (List<Double> scores) {
		double max = Double.MIN_VALUE;
		
		for (double score : scores) {
			if (score > max) {
				max = score;
			}
		}
		
		return max;
	}
	
	/**
	 * Calculates the pageRank based on how many other pages link to a page.
	 */
	public static void CalculatePageRank() {
		int MAX_ITERATIONS = 20;
		
		for (int i = 0; i < MAX_ITERATIONS; i++) {
			List<Double> ranks = new ArrayList<Double>();
			
			for (Page p : DB.pages) {
				ranks.add(IteratePageRank(p));
			}
			
			for (int j = 0; j < ranks.size(); j++) {
				DB.pages.get(j).pageRank = ranks.get(j);
			}
		}
		
		List<Double> ranks = new ArrayList<Double>();
		
		for (Page p : DB.pages) {
			ranks.add(p.pageRank);
		}
		
		Normalize(ranks, false);
		
		for (int i = 0; i < ranks.size(); i++) {
			DB.pages.get(i).pageRank = ranks.get(i);
		}
	}
	
	/**
	 * Calculates the page rank of the specified page.
	 * @param p Page to calculates page rank of.
	 * @return The page's page rank.
	 */
	private static double IteratePageRank (Page p) {
		double rank = 0;
		
		for (Page page : DB.pages) {
			if (page.HasLinkTo(p)) {
				rank += page.pageRank / page.links.size();
			}
		}
		
		return 0.85 * rank + 0.15;
	}
}
