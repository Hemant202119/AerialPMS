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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.to.POApprovalTo;
import com.edios.project.manager.POApprovalManager;
@RestController
public class POApprovalController extends AbstractController{
	
	@Autowired
	POApprovalManager poApprovalManager;
	
	@Autowired
	MessageSource messageSource;
	
	@GetMapping("/search-po-approval/{POStatus}/{customerName}")
	public ResponseEntity<List<POApprovalTo>> fetchPOApprovalDetails(@PathVariable("POStatus") String poStatus,@PathVariable("customerName") String customerName) {
		
		List<POApprovalTo> poApprovalTo = poApprovalManager.fetchPOApprovalDetails(poStatus,customerName);
		if (poApprovalTo.size() == 0) {
			return new ResponseEntity<List<POApprovalTo>>(poApprovalTo, HttpStatus.OK);
		} else {
			
			return new ResponseEntity<List<POApprovalTo>>(poApprovalTo, HttpStatus.OK);
		}
	}
	@GetMapping("search-po-items/{id}")
	public ResponseEntity<List<POApprovalTo>> fetchPOItemDetails(@PathVariable("id") Long poIkID) {
		
		List<POApprovalTo> poApprovalTo = poApprovalManager.fetchItemDetails(poIkID);
		if (poApprovalTo.size() == 0) {
			return new ResponseEntity<List<POApprovalTo>>(poApprovalTo, HttpStatus.OK);
		} else {
			
			return new ResponseEntity<List<POApprovalTo>>(poApprovalTo, HttpStatus.OK);
		}
	}
	
	@GetMapping(path = { "search-for-edit-Approval-po/{id}" })
	public ResponseEntity<POApprovalTo> findOne(@PathVariable("id") Long poPkID) {
		POApprovalTo poApprovalBean=null;
		try {
			poApprovalBean = poApprovalManager.findPOTypeById(poPkID);		
		}catch(Exception exception) {
			exception.printStackTrace();
			return new ResponseEntity<POApprovalTo>(poApprovalBean, HttpStatus.OK); 
		}
		return new ResponseEntity<POApprovalTo>(poApprovalBean, HttpStatus.OK);
	}	
	
	@PutMapping("/update-approval")
	public BaseResponse updatePoApproval(@RequestBody PurchaseOrdersBean purchaseOrdersBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			System.out.println("purchaseOrdersBeacxzcxcn=="+purchaseOrdersBean.getPoStatus());
			System.out.println("purchaseOrdersBean=="+purchaseOrdersBean.getPurchaseOrderItemList());
			purchaseOrdersBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = poApprovalManager.updatePoApproval(purchaseOrdersBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "TRANSACTION_FAILED",
				messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			} else if (resultString.equalsIgnoreCase("recordDeleted")) {
					baseResponse = new BaseResponse(HttpStatus.OK, "TRANSACTION_FAILED",
					messageSource.getMessage("transactionFailedDeleteMessage", null, "", Locale.US));
			}else if (resultString.equalsIgnoreCase("LESS_AMOUNT")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "LESS_AMOUNT",
				messageSource.getMessage("lessAmount", null, "", Locale.US));
		}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	
	
}
}