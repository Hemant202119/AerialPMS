package com.edios.cdf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.bean.common.ApplicationParameterListBean;
import com.edios.cdf.display.ParameterDropDownTO;
import com.edios.cdf.entity.to.ApplicationParameterValueTO;
import com.edios.cdf.manager.DisplayManager;

@RestController
public class DisplayController extends AbstractController {

	@Autowired
	private DisplayManager displayManager;


	@GetMapping(path = { "/parameter-list-drop-down/{parameterCode}" })
	public ResponseEntity<List<ParameterDropDownTO>> parameterListDropdown(@PathVariable("parameterCode") String parameterCode) {
		List<ParameterDropDownTO> applicationParameterListTO = displayManager.parameterListDropdown(parameterCode);
			return new ResponseEntity<List<ParameterDropDownTO>>(applicationParameterListTO, HttpStatus.OK);
	}
	
	@GetMapping(path = { "/parameter-values/{parameterCode}" })
	public ResponseEntity<ApplicationParameterValueTO> parameterValues(@PathVariable("parameterCode") String parameterCode) {
		    ApplicationParameterValueTO parameterValueTO = displayManager.parameterValues(parameterCode);
			return new ResponseEntity<ApplicationParameterValueTO>(parameterValueTO, HttpStatus.OK);
	}
	
	@GetMapping(path = { "/fetch-Parameter-details/{parameterCode}" })
	public ResponseEntity<List<ApplicationParameterListBean>>fetchParameterDetails(@PathVariable("parameterCode") String parameterCode) {
		List<ApplicationParameterListBean> applicationParameterListTO = displayManager.fetchParameterDetails(parameterCode);
			return new ResponseEntity<List<ApplicationParameterListBean>>(applicationParameterListTO, HttpStatus.OK);
	}
	
	
}
