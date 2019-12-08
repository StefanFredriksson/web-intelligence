package SearchEngine;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import com.google.gson.Gson;
import com.sun.net.httpserver.*;

public class BadRouter implements HttpHandler {

	@Override
	public void handle(HttpExchange he) throws IOException {
		String query = he.getRequestURI().getQuery();
		DataLogic.SetPages();
		List<Result> recs = QueryLogic.GetBadRecommendations(query.toUpperCase());
		Response res = new Response(DataLogic.GetSubList(recs), recs.size());
		Gson json = new Gson();
		String jsonString = json.toJson(res);

		he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        he.sendResponseHeaders(200, jsonString.length());
        OutputStream os = he.getResponseBody();
        os.write(jsonString.getBytes());
        os.close();
	}
}
