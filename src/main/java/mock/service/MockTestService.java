package mock.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.stereotype.Component;

@Component("MockTestService")
public class MockTestService {

	private final String AUTHORIZE_TEMPLATE_PATH = "/Applications/projects/mock";

	public Map readScenorio(String scenarioName) throws FileNotFoundException {
		return loadScenoio("/Applications/projects/mock/" + scenarioName
				+ "/scenario.request");
	}

	public String fetchResponse(String scenarioName, String responseName) throws FileNotFoundException {
		String path = AUTHORIZE_TEMPLATE_PATH + "/" + scenarioName + "/" + responseName + ".response";
		System.out.println("Full path  is " + path);
		return loadTemplate(path);
	}

	public String createResponse(String responseName, String responseData) {
		return "method7 with id=" + responseData;
	}

	public String saveResponse(String responseName, String responseData) {
		return "method7 with id=" + responseName;
	}

	public String fetchResponse() {
		return "Greetings from Spring Boot!";
	}

	public String loadTemplate(String path) throws FileNotFoundException {
		File file = new File(path);

		InputStream fis = new FileInputStream(file);
		BufferedReader br = new BufferedReader(new InputStreamReader(fis));

		StringBuilder out = new StringBuilder();
		String line1;
		try {
			while ((line1 = br.readLine()) != null) {
				out.append(line1.trim() + "\n");
			}
			br.close();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return out.toString();
	}

	public Map loadScenoio(String path) throws FileNotFoundException {
		File file = new File(path);
		Map scenoioDataMap = new HashMap();

		InputStream fis = new FileInputStream(file);
		BufferedReader br = new BufferedReader(new InputStreamReader(fis));

		StringBuilder out = new StringBuilder();
		String line1;
		try {
			while ((line1 = br.readLine()) != null) {
				out.append(line1.trim() + "\n");
				//System.out.println("line1.trim() ====" + line1.trim());
				if (line1.trim().indexOf("CONFIGURATION") == -1 && line1.trim().indexOf("REQUEST") == -1) {
					if (line1.trim().indexOf("=") != -1) {
						StringTokenizer objStrToken = new StringTokenizer(line1.trim(), "=");

						if (objStrToken.countTokens() == 2) {
							while (objStrToken.hasMoreTokens()) {
								System.out.println("line1.trim() ====" + objStrToken.nextToken());
								System.out.println("line1.trim() ====" + objStrToken.nextToken());
								String[] strArray = commaDelimetedStringToArray (line1.trim());
								scenoioDataMap.put(strArray[0],
										strArray[1]);
							}
						}
					}
				}
			}
			br.close();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		System.out.println(scenoioDataMap);
		return scenoioDataMap;
	}
	
	   public String[] commaDelimetedStringToArray (String str) {
		   System.out.println(" stringToArray  :: " + str);
		   String[] strArray = null;
		   if (str != null && str.trim().length() > 0) {
		    StringTokenizer objStrToken = new StringTokenizer(str, "=");
		    strArray = new String[objStrToken.countTokens() + 1];
		    int i = 0;
		    while (objStrToken.hasMoreTokens()) {
		     strArray[i] = objStrToken.nextToken();
		     // System.out.println(objStrToken.nextToken());
		     i++;
		    }

		   }
		   return strArray;
		  }
		 

}
