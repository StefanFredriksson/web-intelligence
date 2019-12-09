package SearchEngine;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.List;
import com.sun.net.httpserver.*;

public class SearchEngine {

	public static void main(String[] args) {
		InitServer();
	}
	
	private static void InitServer() {
		int port = 5000;
		HttpServer server;
		try {
			server = HttpServer.create(new InetSocketAddress(port), 0);
			System.out.println("server started at " + port);
			server.createContext("/", new Router());
			server.createContext("/bad", new BadRouter());
			server.start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
