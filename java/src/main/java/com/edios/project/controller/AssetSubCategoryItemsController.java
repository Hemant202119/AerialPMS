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
import com.edios.project.bean.AssetSubCategoryBean;
import com.edios.project.bean.AssetSubCategoryItemBean;
import com.edios.project.entity.to.AssetSubCategoryItemTO;
import com.edios.project.manager.AssetSubCategoryItemsManager;




@RestController
public class AssetSubCategoryItemsController extends AbstractController {
	
	@Autowired
	AssetSubCategoryItemsManager assetSubCategoryItemsManager;
	
	@Autowired
	MessageSource messageSource;
	
	@PostMapping("/fetch-sub-category-items")
	public ResponseEntity<List<AssetSubCategoryItemTO>> fetchSubCategoryItems(@RequestBody PayloadBean payloadBean)
	{
		List<AssetSubCategoryItemTO> assetSubCategoryTOList=null;
		
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null,"",Locale.US))) {
			assetSubCategoryTOList=assetSubCategoryItemsManager.fetchSubCategoryItems(payloadBean.getSearchParameter(),payloadBean.getId());
			return new ResponseEntity<List<AssetSubCategoryItemTO>>(assetSubCategoryTOList, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
	}
	
	@PostMapping("/fetch-all-sub-category-items")
	public ResponseEntity<List<AssetSubCategoryItemTO>> fetchAllSubCategoryItems(@RequestBody PayloadBean payloadBean)
	{
		List<AssetSubCategoryItemTO> assetSubCategoryTOList=null;
		
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null,"",Locale.US))) {
			assetSubCategoryTOList=assetSubCategoryItemsManager.fetchAllSubCategoryItems(payloadBean.getSearchParameter(),payloadBean.getId());
			return new ResponseEntity<List<AssetSubCategoryItemTO>>(assetSubCategoryTOList, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
	}
	
	@PostMapping("/add-sub-category-item")
	public BaseResponse addSubCategoryItem(@RequestBody AssetSubCategoryItemBean assetSubCategoryItemBean, HttpServletRequest request) {
		BaseResponse baseResponse=null;
		try {
			assetSubCategoryItemBean.setIpAddress(request.getRemoteAddr());
			String resultOutput=assetSubCategoryItemsManager.addSubCategoryItem(assetSubCategoryItemBean);
			if (resultOutput.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else if (resultOutput.equalsIgnoreCase("NameAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Sub Category Name" }, "", Locale.US));
			} else if (resultOutput.equalsIgnoreCase("CodeAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Sub Category Code" }, "", Locale.US));
			}
		}catch(Exception exception) {
			exception.printStackTrace();
			return baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
		}
		return baseResponse;
	}
	
	@PostMapping("/edit-sub-category-item")
	public ResponseEntity<AssetSubCategoryItemBean> findSubCategoryById(@RequestBody PayloadBean payloadBean) {
		AssetSubCategoryItemBean assetSubCategoryItemBean=null;
		AssetSubCategoryBean assetSubCategoryBean=new AssetSubCategoryBean();
		
		if (payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			assetSubCategoryItemBean = assetSubCategoryItemsManager.findSubCategoryItemById(payloadBean.getId());
			
			assetSubCategoryBean.setAssetSubCategoryID(assetSubCategoryItemBean.getAssetSubCategoryID().getAssetSubCategoryID());
			assetSubCategoryBean.setSubCategoryName(assetSubCategoryItemBean.getAssetSubCategoryID().getSubCategoryName());
			assetSubCategoryBean.setSubCategoryCode(assetSubCategoryItemBean.getAssetSubCategoryID().getSubCategoryCode());
			assetSubCategoryBean.setSubCategoryDescription(assetSubCategoryItemBean.getAssetSubCategoryID().getSubCategoryDescription());
			assetSubCategoryBean.setSubCategoryStatus(assetSubCategoryItemBean.getAssetSubCategoryID().getSubCategoryStatus());
			assetSubCategoryBean.setTransactionCount(assetSubCategoryItemBean.getAssetSubCategoryID().getTransactionCount());
			
			assetSubCategoryItemBean.setAssetSubCategoryID(assetSubCategoryBean);
			
			return new ResponseEntity<AssetSubCategoryItemBean>(assetSubCategoryItemBean, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}
	
	@PutMapping("/update-sub-category-item")
	public BaseResponse updateSubCategoryItem(@RequestBody AssetSubCategoryItemBean assetSubCategoryItemBean,
			HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			assetSubCategoryItemBean.setIpAddress(request.getRemoteAddr());
			String resultOutput=assetSubCategoryItemsManager.updateSubCategoryItem(assetSubCategoryItemBean);
			if (resultOutput.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultOutput.equalsIgnoreCase("NameAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Item Name" }, "", Locale.US));
			} else if (resultOutput.equalsIgnoreCase("CodeAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Item Code" }, "", Locale.US));
			}else if (resultOutput.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "TRANSACTION_FAILED",
						messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			}
		}catch(Exception exception) {
			exception.printStackTrace();
			return baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
		}
		return baseResponse;
		
	}

	@PostMapping("/delete-sub-category-item")
	public BaseResponse deleteSubCategoryItem(@RequestBody DeleteRecords deleteRecords) {
		BaseResponse baseResponse = null;
		try {
			String resultString = assetSubCategoryItemsManager.deleteSubCategoryItem(deleteRecords);
			if (resultString.equalsIgnoreCase("DELETED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "DELETED", "");
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
	}
}
