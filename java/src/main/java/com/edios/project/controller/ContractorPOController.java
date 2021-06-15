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
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.to.ContractorPOEntityTo;
import com.edios.project.manager.ContractorPOManager;

@RestController
public class ContractorPOController extends AbstractController {
	
	@Autowired
	MessageSource messageSource;

	@Autowired
	ContractorPOManager contractorManager;
	
	
	
	/*@GetMapping("/search-po/{projectID}/{customerName}")
	public ResponseEntity<List<PurchaseOrderTO>> fetchPurchaseOrderDetails(@PathVariable("projectID") Long projectID,@PathVariable("customerName") String customerName) {
		List<PurchaseOrderTO> purchaseOrderTO = purchaseOrderManager.fetchPurchaseOrdersDetails(projectID,customerName);
		if (purchaseOrderTO.size() == 0) {
			return new ResponseEntity<List<PurchaseOrderTO>>(purchaseOrderTO, HttpStatus.OK);
		} else {
			
			return new ResponseEntity<List<PurchaseOrderTO>>(purchaseOrderTO, HttpStatus.OK);
		}
	}
	
	@PostMapping("/add-customer-po")
	public BaseResponse  addProjectStatus(@RequestBody PurchaseOrdersBean purchaseOrdersBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			purchaseOrdersBean.setUserIPAddress(request.getRemoteAddr());			
			String resultString =purchaseOrderManager.addCustomerPOs(purchaseOrdersBean);
			if (resultString.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else {
				baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
			} 
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
	@GetMapping(path = { "edit-customer-po/{id}" })
	public ResponseEntity<PurchaseOrdersBean> findOne(@PathVariable("id") Long id) {
		PurchaseOrdersBean purchaseOrdersBean=null;
		try {
			purchaseOrdersBean = purchaseOrderManager.findCustomerPOById(id);		
		}catch(Exception exception) {
			exception.printStackTrace();
			return new ResponseEntity<PurchaseOrdersBean>(purchaseOrdersBean, HttpStatus.OK); 
		}
		return new ResponseEntity<PurchaseOrdersBean>(purchaseOrdersBean, HttpStatus.OK);
	}
	
	@PutMapping("/update-customer-po")
	public BaseResponse updateCustomerPO(@RequestBody PurchaseOrdersBean purchaseOrdersBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			purchaseOrdersBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = purchaseOrderManager.updateCustomerPO(purchaseOrdersBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "BAD_REQUEST",
				messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			} else if (resultString.equalsIgnoreCase("recordDeleted")) {
					baseResponse = new BaseResponse(HttpStatus.OK, "BAD_REQUEST",
					messageSource.getMessage("transactionFailedDeleteMessage", null, "", Locale.US));
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}	*/
	
	@GetMapping("/contractor-autoLookUp/{customerName}")
	public ResponseEntity<List<ContractorPOEntityTo>> contractorAutoLookUp() {
		List<ContractorPOEntityTo> contractorAutoCompleteTO = contractorManager.fetchContractors();
		if (contractorAutoCompleteTO.size() == 0) {
			return new ResponseEntity<List<ContractorPOEntityTo>>(contractorAutoCompleteTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<ContractorPOEntityTo>>(contractorAutoCompleteTO, HttpStatus.OK);
		}
	}
	//Update Contractor po
	@PutMapping("/update-contractor-po")
	public BaseResponse updateContractorPO(@RequestBody PurchaseOrdersBean purchaseOrdersBean, HttpServletRequest request) {		
		BaseResponse baseResponse = null;
		try {
			purchaseOrdersBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = contractorManager.updateContractorPO(purchaseOrdersBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "BAD_REQUEST",
				messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			} else if (resultString.equalsIgnoreCase("PO_EXISTS")) {
				baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED",
						messageSource.getMessage("duplicateFieldMessage", new Object[] { "PO No." }, "", Locale.US));
			}else if (resultString.equalsIgnoreCase("recordDeleted")) {
					baseResponse = new BaseResponse(HttpStatus.OK, "BAD_REQUEST",
					messageSource.getMessage("transactionFailedDeleteMessage", null, "", Locale.US));
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
	
	//Edit Contractor
	@GetMapping(path = { "edit-contractor-po/{id}" })
	public ResponseEntity<PurchaseOrdersBean> findOne(@PathVariable("id") Long id) {
		PurchaseOrdersBean purchaseOrdersBean=null;
		try {
			purchaseOrdersBean = contractorManager.findContractorPOById(id);		
		}catch(Exception exception) {
			exception.printStackTrace();
			return new ResponseEntity<PurchaseOrdersBean>(purchaseOrdersBean, HttpStatus.OK); 
		}
		return new ResponseEntity<PurchaseOrdersBean>(purchaseOrdersBean, HttpStatus.OK);
	}
	
	
	//add Conatrcator
		@PostMapping("/add-contractor-po")
		public BaseResponse  addContractorPOs(@RequestBody PurchaseOrdersBean purchaseOrdersBean, HttpServletRequest request) {
			BaseResponse baseResponse = null;
			try {
				purchaseOrdersBean.setUserIPAddress(request.getRemoteAddr());
				
				String resultString =contractorManager.addContractorPOs(purchaseOrdersBean);
				if (resultString.contains("ADDED")) {
					baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", messageSource.getMessage("autoGeneratedPONumber", new Object[] {resultString.substring(resultString.indexOf(" ")) }, "", Locale.US));
				} else if (resultString.equalsIgnoreCase("PO_EXISTS")) {
					baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED",
							messageSource.getMessage("duplicateFieldMessage", new Object[] { "PO No." }, "", Locale.US));
				}else {
					baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
				} 
				return baseResponse;
			} catch (Exception e) {
				e.printStackTrace();
				return baseResponse;
			}
		}
}
