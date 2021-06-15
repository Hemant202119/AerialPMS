package com.edios.project.controller;

import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.ProjectStatusBean;
import com.edios.project.entity.to.ProjectStatusTO;
import com.edios.project.manager.ProjectStatusManager;

@RestController
public class ProjectStatusController extends AbstractController {

	@Autowired
	MessageSource messageSource;
	
	@Autowired
	ProjectStatusManager projectStatusManager;
	
	
	@GetMapping("/project-statuses/{projectID}")
	public ResponseEntity<List<ProjectStatusTO>> fetchProjectStatusDetails(@PathVariable("projectID") Long projectID) {
		List<ProjectStatusTO> projectStatusTO = projectStatusManager.fetchProjectStatusDetails(projectID);
		if (projectStatusTO.size() == 0) {
			return new ResponseEntity<List<ProjectStatusTO>>(projectStatusTO, HttpStatus.CONFLICT);
		} else {
			
			return new ResponseEntity<List<ProjectStatusTO>>(projectStatusTO, HttpStatus.OK);
		}
	}
	
	@PostMapping("/add-project-status")
	public BaseResponse  addProjectStatus(@RequestBody ProjectStatusBean projectStatusBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			projectStatusBean.setUserIPAddress(request.getRemoteAddr());
			String resultString =projectStatusManager.addProjectStatus(projectStatusBean);
			if (resultString.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else {
				baseResponse = new BaseResponse(HttpStatus.CONFLICT, "EXCEPTION", "Some Thing went wrong! please try later.");
			} 
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
	@GetMapping(path = { "editProjectStatus/{id}" })
	public ResponseEntity<ProjectStatusBean> findOne(@PathVariable("id") Long id) {
		ProjectStatusBean projectStatusBean=null;
		try {
		 projectStatusBean = projectStatusManager.findProjectStatusById(id);		
		}catch(Exception exception) {
			exception.printStackTrace();
			return new ResponseEntity<ProjectStatusBean>(projectStatusBean, HttpStatus.CONFLICT); 
		}
		return new ResponseEntity<ProjectStatusBean>(projectStatusBean, HttpStatus.OK);
	}
	
	@PutMapping("/update-project-status")
	public BaseResponse updateProject(@RequestBody ProjectStatusBean projectStatusBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			projectStatusBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = projectStatusManager.updateProjectStatus(projectStatusBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.BAD_REQUEST, "BAD_REQUEST",
				messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
}
