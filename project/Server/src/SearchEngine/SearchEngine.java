package SearchEngine;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.List;
import com.sun.net.httpserver.*;

public class SearchEngine {

	public static void main(String[] args) {
		String shortArticles = "Clancier";
		String regularArticles = "Web_intelligence";
		Scraper.Scrape("https://en.wikipedia.org/wiki/" + regularArticles);
		Parser.ParseData();
		InitServer();
		DataLogic.SetData();
		QueryLogic.CalculatePageRank();
	}
	
	private static void InitServer() {
		int port = 5000;
		HttpServer server;
		try {
			server = HttpServer.create(new InetSocketAddress(port), 0);
			System.out.println("server started at port " + port);
			server.createContext("/", new Router());
			server.start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
