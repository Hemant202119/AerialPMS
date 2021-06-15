package com.edios.project.controller;

import java.security.Principal;
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
import com.edios.cdf.display.ParameterDropDownTO;
import com.edios.cdf.entity.to.StatusEntityTO;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.ProjectBean;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.ContactsEntityTO;
import com.edios.project.entity.to.DrawingTypeEnityTO;
import com.edios.project.entity.to.ExecutionModelsEntityTO;
import com.edios.project.entity.to.ProjectCategoriesEntityTO;
import com.edios.project.entity.to.ProjectsTO;
import com.edios.project.manager.ProjectManager;

@RestController
public class ProjectController extends AbstractController {
	
	@Autowired
	MessageSource messageSource;
	
	@Autowired
	ProjectManager projectManager;

	
	@GetMapping("/projects/{userID}")
	public ResponseEntity<List<ProjectsTO>> fetchProjectDetails(@PathVariable("userID") Long userID) {
		List<ProjectsTO> projectsTO = projectManager.fetchProjectDetails(userID);
			return new ResponseEntity<List<ProjectsTO>>(projectsTO, HttpStatus.OK);
	}
	
	
	@GetMapping("/project/{status}/{userID}")
	public ResponseEntity<List<ProjectsTO>> projectDetail(@PathVariable("status") String statusCode,@PathVariable("userID") Long userID) {		
		 List<ProjectsTO> projectsTO = projectManager.projectDetails(statusCode,userID);
		 return new ResponseEntity<List<ProjectsTO>>(projectsTO, HttpStatus.OK);
	}
	
	@GetMapping(path = { "/project-status/{statusType}"})
	public ResponseEntity<List<StatusEntityTO>> projectStatusDropdown(
			@PathVariable("statusType") String statusType, Principal principal) {
		List<StatusEntityTO> statusEntityTO = projectManager.projectStatus(statusType);
			return new ResponseEntity<List<StatusEntityTO>>(statusEntityTO, HttpStatus.OK);
	}
	
	@GetMapping(path = { "/parameter-list/{listType}"})
	public ResponseEntity<List<ParameterDropDownTO>> parameterListDropdown(
			@PathVariable("listType") String listType, Principal principal) {
		List<ParameterDropDownTO> applicationParameterListTO = projectManager.parameterListDropdown(listType);
			return new ResponseEntity<List<ParameterDropDownTO>>(applicationParameterListTO, HttpStatus.OK);
	}

	@GetMapping(path = { "/contact-autolookup/{userID}"})
	public ResponseEntity<List<ContactsEntityTO>> contactAutoLookup(@PathVariable("userID") Long userID) {
		List<ContactsEntityTO> autoCompleteTO = projectManager.contactAutoLookup(userID);
			return new ResponseEntity<List<ContactsEntityTO>>(autoCompleteTO, HttpStatus.OK);
	}
	
	@GetMapping(path = { "/circle-autolookup/{contactID}/{userID}"})
	public ResponseEntity<List<CirclesEntityTO>> circleAutoLookup(@PathVariable("contactID") Long contactID,@PathVariable("userID") Long userID) {
		List<CirclesEntityTO> autoCompleteTO = projectManager.circleAutoLookup(contactID,userID);
			return new ResponseEntity<List<CirclesEntityTO>>(autoCompleteTO, HttpStatus.OK);
	}
	
	@GetMapping(path = { "/category-autolookup"})
	public ResponseEntity<List<ProjectCategoriesEntityTO>> projectCategoryAutoLookup() {
		List<ProjectCategoriesEntityTO> autoCompleteTO = projectManager.projectCategoryAutoLookup();
			return new ResponseEntity<List<ProjectCategoriesEntityTO>>(autoCompleteTO, HttpStatus.OK);
	}
	
	@GetMapping(path = { "/execution-model-autolookup"})
	public ResponseEntity<List<ExecutionModelsEntityTO>> executionModelAutoLookup() {
		List<ExecutionModelsEntityTO> autoCompleteTO = projectManager.executionModelAutoLookup();
			return new ResponseEntity<List<ExecutionModelsEntityTO>>(autoCompleteTO, HttpStatus.OK);
	}
	
	
	@GetMapping(path = { "/drawing-type-autolookup/{executionModelID}"})
	public ResponseEntity<List<DrawingTypeEnityTO>> drawingTypeAutoLookup(@PathVariable("executionModelID") Long executionModelID) {
		List<DrawingTypeEnityTO> autoCompleteTO = projectManager.drawingTypeAutoLookup(executionModelID);
			return new ResponseEntity<List<DrawingTypeEnityTO>>(autoCompleteTO, HttpStatus.OK);
	}
	
	@PostMapping("/add-project")
	public BaseResponse addProject(@RequestBody ProjectBean projectBean) {
		BaseResponse baseResponse = null;
		try {
			System.out.println("in add Project"+projectBean.toString());
			String resultString=projectManager.addProject(projectBean);
			if(resultString.equalsIgnoreCase("PROJECT_EXIST")) {
				System.out.println("PROJECT EXIST");
				baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Site Name" }, "", Locale.US));
			
			}
			else if(resultString.equalsIgnoreCase("ADDED"))
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			
		}catch (Exception e) {
					return baseResponse; 
		}
		return baseResponse;
	}
	
	@GetMapping(path = { "editProject/{id}" })
	public ResponseEntity<ProjectBean> findOne(@PathVariable("id") Long id) {
		ProjectBean projectBean = projectManager.findProjectById(id);
		return new ResponseEntity<ProjectBean>(projectBean, HttpStatus.OK); 
	}
	
	@PutMapping("/update-project")
	public BaseResponse updateProject(@RequestBody ProjectBean projectBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			projectBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = projectManager.updateProject(projectBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.BAD_REQUEST, "BAD_REQUEST",
						messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			} else if (resultString.equalsIgnoreCase("recordDeleted")) {
				baseResponse = new BaseResponse(HttpStatus.BAD_REQUEST, "BAD_REQUEST",
						messageSource.getMessage("transactionFailedDeleteMessage", null, "", Locale.US));
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
	@PostMapping("/delete-project")
	public BaseResponse deleteProject(@RequestBody DeleteRecords deleteRecords) {
		BaseResponse baseResponse = null;
		try {
		    String resultString = projectManager.deleteProject(deleteRecords);
			if (resultString.equalsIgnoreCase("DELETED")) {
			   baseResponse = new BaseResponse(HttpStatus.OK, "DELETED", ""); 
			} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "TRANSACTION_FAILED",
						messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			} else if (resultString.equalsIgnoreCase("recordDeleted")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "TRANSACTION_FAILED",
						messageSource.getMessage("transactionFailedDeleteMessage", null, "", Locale.US));
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
}
