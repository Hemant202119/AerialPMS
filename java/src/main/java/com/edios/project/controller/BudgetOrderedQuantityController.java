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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.BoqBean;
import com.edios.project.entity.to.BoqTO;
import com.edios.project.entity.to.DrawingItemsTO;
import com.edios.project.manager.BudgetOrderedQuantityManager;

@RestController
public class BudgetOrderedQuantityController extends AbstractController {
	@Autowired
	MessageSource messageSource;
	@Autowired
	BudgetOrderedQuantityManager boqManager;

	@GetMapping("/fetch-boq-info/{projectID}")
	public ResponseEntity<List<BoqTO>> fetchBoqRecords(@PathVariable("projectID") Long projectID) {
		List<BoqTO> boqTO = boqManager.fetchBoqRecords(projectID);
		return new ResponseEntity<List<BoqTO>>(boqTO, HttpStatus.OK);
	}

	@GetMapping("/fetch-boq-drawing-items/{projectID}/{drawingItemID}")
	public ResponseEntity<List<DrawingItemsTO>> fetchBoqRecords(@PathVariable("projectID") Long projectID,
			@PathVariable("drawingItemID") Long DrawingID) {
		List<DrawingItemsTO> boqDrawingTO = boqManager.fetchBoqDrawingItems(projectID, DrawingID);
		return new ResponseEntity<List<DrawingItemsTO>>(boqDrawingTO, HttpStatus.OK);
	}

	@PostMapping("/add-project-boq-po")
	public BaseResponse addBoqPO(@RequestBody BoqBean boqBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			boqBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = boqManager.addPorjectBoq(boqBean);
			if (resultString.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else if (resultString.equalsIgnoreCase("PO_EXISTS")) {
				baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED",
						messageSource.getMessage("duplicateFieldMessage", new Object[] { "PO No." }, "", Locale.US));
			} else {
				baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}

	@GetMapping("/edit-project-boq/{boqID}")
	public ResponseEntity<BoqBean> findBoqById(@PathVariable("boqID") Long boqID) {
		BoqBean boqBean = null;
		try {
			boqBean = boqManager.findBoqById(boqID);
		} catch (Exception exception) {
			exception.printStackTrace();
			return new ResponseEntity<BoqBean>(boqBean, HttpStatus.OK);
		}
		return new ResponseEntity<BoqBean>(boqBean, HttpStatus.OK);
	}

	@GetMapping("/boq-drawing-selected-Items/{boqID}")
	public ResponseEntity<List<DrawingItemsTO>> findBoqItemID(@PathVariable("boqID") Long boqID) {
		List<DrawingItemsTO> boqDrawingTO = boqManager.fetchBoqDrawingItemsByID(boqID);
		return new ResponseEntity<List<DrawingItemsTO>>(boqDrawingTO, HttpStatus.OK);
	}

}
