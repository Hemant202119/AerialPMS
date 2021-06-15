package com.edios.project.controller;


import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.util.PayloadBean;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.ContactsBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.ProjectBean;
import com.edios.project.entity.to.ItemReceivedTO;
import com.edios.project.manager.ReceivedItemManager;
;

@RestController
public class ReceivedIemsController extends AbstractController {
	@Autowired ReceivedItemManager receivedItemManager;
	@Autowired MessageSource messageSource;
	
	
	@PostMapping("/received-items-list")
	public ResponseEntity<List<ItemReceivedTO>> searchReceivedItems(@RequestBody PayloadBean payloadBean){
		List<ItemReceivedTO> itemReceivedTO=null;
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			itemReceivedTO=receivedItemManager.searchReceivedItems(payloadBean);
			return new ResponseEntity<List<ItemReceivedTO>>(itemReceivedTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
			}	
	}
		
	@PostMapping("/project_autoLookUp")
	public ResponseEntity<List<ProjectBean>> fetchProjectAutoLookUpListReceivedItems(@RequestBody PayloadBean payloadBean){
		List<ProjectBean> projectList=null;
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			projectList=receivedItemManager.fetchProjectAutoLookUpListReceivedItems();
			return new ResponseEntity<List<ProjectBean>>(projectList, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
		}	
				
	@PostMapping("/contacts_autoLookUp")
	public ResponseEntity<List<ContactsBean>> fetchContactAutoLookUpListReceivedItems(@RequestBody PayloadBean payloadBean){
			List<ContactsBean> projectList=null;
			if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
				projectList=receivedItemManager.fetchContactAutoLookUpListReceivedItems();
				return new ResponseEntity<List<ContactsBean>>(projectList, HttpStatus.OK);
				} else {
					return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
				}							
	}
	
	@PostMapping("/search_asset_items")
public ResponseEntity<List<ItemReceivedTO>> searchAssestItems(@RequestBody PayloadBean payloadBean){
		List<ItemReceivedTO> itemReceivedTO=null;
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			itemReceivedTO=receivedItemManager.searchAssestItemAutoLookUp(payloadBean);
			return new ResponseEntity<List<ItemReceivedTO>>(itemReceivedTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
			}		
	}
	@PostMapping("/search-items-data-onCriteria")
	public ResponseEntity<List<ItemReceivedTO>> searchItemDataOnCriteria(@RequestBody PayloadBean payloadBean){
		List <ItemReceivedTO> itemReceivedTO=null;
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey",null,"",Locale.US))) {
			itemReceivedTO=receivedItemManager.searchItemDataOnCriteria(payloadBean);
			System.out.println("Prohect STcok is = "+ itemReceivedTO.get(0).getCurrentProjectItemStock());
			return new ResponseEntity<List<ItemReceivedTO>>(itemReceivedTO,HttpStatus.OK);
		}
		else 
			return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
			
	}
	@PostMapping("/add-received-items")
	public BaseResponse addReceivedIitems(@RequestBody  ItemsInformationBean itemsInformationBean,HttpServletRequest request){
		BaseResponse baseResponse = null;
		try {
			itemsInformationBean.setIpAddress(request.getRemoteAddr());			
			String resultString =receivedItemManager.addReceivedItems(itemsInformationBean);
			if (resultString.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			}		
			else {
				baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
			} 
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	
	}
	@PostMapping("/edit-received-item")
	public ResponseEntity<ItemsInformationBean> editReceivedItems(@RequestBody PayloadBean payloadBean) {
		ItemsInformationBean itemInformationBean=null;
		try {
			if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
				itemInformationBean = receivedItemManager.findReceivedItems(payloadBean.getId());	
			}
				
		}catch(Exception exception) {
			exception.printStackTrace();
			return new ResponseEntity<ItemsInformationBean>(itemInformationBean, HttpStatus.OK); 
		}
		return new ResponseEntity<ItemsInformationBean>(itemInformationBean, HttpStatus.OK);
	}

@PutMapping("/update-received-items")
public BaseResponse updateVendor(@RequestBody  ItemsInformationBean itemsInformationBean,HttpServletRequest request) {		
	BaseResponse baseResponse = null;
	try {
		itemsInformationBean.setIpAddress(request.getRemoteAddr());
		String resultString = receivedItemManager.updateReceivedItems(itemsInformationBean);
		if (resultString.equalsIgnoreCase("UPDATED")) {
			baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
		} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
			baseResponse = new BaseResponse(HttpStatus.OK, "BAD_REQUEST",
			messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
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
@PostMapping("/delete-receive-item")
public BaseResponse deleteParameter(@RequestBody DeleteRecords deleteRecords) {
BaseResponse baseResponse = null;
try {
    String resultString = receivedItemManager.deleteReceivedItems(deleteRecords);
	if (resultString.equalsIgnoreCase("DELETED")) {
	   baseResponse = new BaseResponse(HttpStatus.OK, "DELETED", ""); 
	}
	else if (resultString.equalsIgnoreCase("ITEM_IN_USE")) {
		baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED",
				messageSource.getMessage("itemInUserFieldMessage", new Object[] { "Received Item" }, "", Locale.US));
	}else if (resultString.equalsIgnoreCase("TransactionFailed")) {
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
