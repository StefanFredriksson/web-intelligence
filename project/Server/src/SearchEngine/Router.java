package SearchEngine;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.google.gson.Gson;
import com.sun.net.httpserver.*;

public class Router implements HttpHandler {

	@Override
	public void handle(HttpExchange he) throws IOException {
		long start = System.nanoTime();
		String query = he.getRequestURI().getQuery();
		List<Result> recs = QueryLogic.GetRecommendations(query.toUpperCase());
		long end = System.nanoTime();
		long duration = TimeUnit.MILLISECONDS.convert(end - start, TimeUnit.NANOSECONDS);
		Response res = new Response(DataLogic.GetSubList(recs), recs.size(), duration / 1000.0);
		Gson json = new Gson();
		String jsonString = json.toJson(res);

		he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        he.sendResponseHeaders(200, jsonString.length());
        OutputStream os = he.getResponseBody();
        os.write(jsonString.getBytes());
        os.close();
	}
}
