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
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.CircleBean;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.manager.CircleManager;

@RestController
public class CircleController extends AbstractController {

	@Autowired
	CircleManager circleManager;

	@Autowired
	MessageSource messageSource;

	@GetMapping("/search-circle")
	public ResponseEntity<List<CirclesEntityTO>> fetchCircles() {
		List<CirclesEntityTO> circlesentityTO = circleManager.fetchCircles();
		return new ResponseEntity<List<CirclesEntityTO>>(circlesentityTO, HttpStatus.OK);
	}

	@PostMapping("/add-circle")
	public BaseResponse addCircle(@RequestBody CircleBean circleBean) {
		BaseResponse baseResponse = null;
		try {
			String resultString = circleManager.addCircle(circleBean);
			if (resultString.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else if (resultString.equalsIgnoreCase("NameAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Circle Name" }, "", Locale.US));
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}

	}

	@GetMapping("/load-circles/{circleStatus}")
	public ResponseEntity<List<CirclesEntityTO>> fetchCircleDetail(@PathVariable("circleStatus") String circleStatus,
			Principal principal) {
		List<CirclesEntityTO> circlesentityTO = circleManager.fetchCircleDetail(circleStatus);
		if (circlesentityTO.size() == 0) {
			return new ResponseEntity<List<CirclesEntityTO>>(circlesentityTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<CirclesEntityTO>>(circlesentityTO, HttpStatus.OK);
		}

	}

	@GetMapping(path = { "edit-circle/{id}" })
	public ResponseEntity<CircleBean> editCircle(@PathVariable("id") Long id, Principal principal) {

		CircleBean circleBean = circleManager.editCircle(id);
		return new ResponseEntity<CircleBean>(circleBean, HttpStatus.OK);
	}

	@PutMapping("update-circle")
	public BaseResponse updateCircle(@RequestBody CircleBean circleBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			circleBean.setIpAddress(request.getRemoteAddr());
			String resultString = circleManager.updateCircle(circleBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultString.equalsIgnoreCase("NameAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.CONFLICT, "CONFLICT", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Circle Name" }, "", Locale.US));
			}else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "TRANSACTION_FAILED",
						messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			} else if (resultString.equalsIgnoreCase("recordDeleted")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "TRANSACTION_FAILED",
						messageSource.getMessage("transactionFailedDeleteMessage", null, "", Locale.US));
			}

			return baseResponse;
		}

		catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}

	@PostMapping("/delete-circle")
	public BaseResponse deleteCircle(@RequestBody DeleteRecords deleteRecords) {
		BaseResponse baseResponse = null;
		try {
			String resultString = circleManager.deleteCircle(deleteRecords);
			if (resultString.equalsIgnoreCase("DELETED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "DELETED", "");
			}else if (resultString.equalsIgnoreCase("NOT_DELETED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "NOT_DELETED",
						messageSource.getMessage("transactionFailedNotDeletedMessage", null, "", Locale.US));
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
