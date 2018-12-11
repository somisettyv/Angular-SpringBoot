package mock;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import mock.service.MockTestService;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MockController {
	
	@org.springframework.beans.factory.annotation.Autowired
	private MockTestService mockTestService;

	@RequestMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}
	
	@RequestMapping("/resource")
	public Map<String,Object> home() {
		Map<String,Object> model = new HashMap<String,Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World");
		return model;
	}

	@RequestMapping(value = "/scenario/{scenarioName}", method = RequestMethod.GET)
	public Map readScenorio(@PathVariable("scenarioName") String scenarioName) throws FileNotFoundException {
		return mockTestService.readScenorio(scenarioName);
	}

	@RequestMapping(value = "/scenario/{scenarioName}/response/{responseName}", method = RequestMethod.GET)
	@ResponseBody
	public String fetchResponse(@PathVariable("scenarioName") String scenarioName, @PathVariable("responseName") String responseName) throws FileNotFoundException {
		String response = mockTestService.fetchResponse(scenarioName,responseName);
		System.out.println(response);
		return response;
	}
	
	@RequestMapping(value = "/scenario/{scenarioName}/response/{responseName}", method = RequestMethod.POST,  consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	@ResponseBody
	public String createResponse(@PathVariable("responseName") String responseName, String responseData) {
		System.out.println(responseData);
		return mockTestService.createResponse(responseName, responseData);
	}
	
	@RequestMapping(value = "/scenario/{scenarioName}/response/{responseName}", method = RequestMethod.PUT)
	@ResponseBody
	public String saveResponse(@PathVariable("responseName") String responseName, String responseData) {
		return mockTestService.saveResponse(responseName, responseData);
	}

}
