package SearchEngine;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import com.google.gson.Gson;
import com.sun.net.httpserver.*;

public class Router implements HttpHandler {

	@Override
	public void handle(HttpExchange he) throws IOException {
		String response = "<h1>Server start success</h1>";
		String query = he.getRequestURI().getQuery();
		
		DataLogic.SetPages();
		List<Result> recs = QueryLogic.GetRecommendations(query);
		recs = recs.subList(0, 5);
		Gson json = new Gson();
		String jsonString = json.toJson(recs);
		System.out.println(jsonString);
		he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        he.sendResponseHeaders(200, jsonString.length());
        OutputStream os = he.getResponseBody();
        os.write(jsonString.getBytes());
        os.close();
	}

}
