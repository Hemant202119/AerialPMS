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

import com.edios.cdf.bean.common.ApplicationParameterListBean;
import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.entity.to.RoleEntityTO;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.util.PayloadBean;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.AssetCategoryBean;
import com.edios.project.bean.AssetSubCategoryBean;
import com.edios.project.entity.to.AssetSubCategoryTO;
import com.edios.project.manager.AssetSubCategoryManager;



@RestController
public class AssetSubCategoryController extends AbstractController {
	
	@Autowired
	AssetSubCategoryManager assetSubCategoryManager;
	
	@Autowired
	MessageSource messageSource;
	
	@PostMapping("/fetch-sub-categories")
	public ResponseEntity<List<AssetSubCategoryTO>> fetchSubCategories(@RequestBody PayloadBean payloadBean)
	{
		List<AssetSubCategoryTO> assetSubCategoryTOList=null;
		
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null,"",Locale.US))) {
			assetSubCategoryTOList=assetSubCategoryManager.fetchSubCategories(payloadBean.getSearchParameter(),payloadBean.getId());
			return new ResponseEntity<List<AssetSubCategoryTO>>(assetSubCategoryTOList, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
	}
	
	@PostMapping("/add-sub-category")
	public BaseResponse addSubCategory(@RequestBody AssetSubCategoryBean assetSubCategoryBean, HttpServletRequest request) {
		BaseResponse baseResponse=null;
		try {
			assetSubCategoryBean.setIpAddress(request.getRemoteAddr());
			String resultOutput=assetSubCategoryManager.addSubCategory(assetSubCategoryBean);
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
	
	@PostMapping("/edit-sub-category")
	public ResponseEntity<AssetSubCategoryBean> findSubCategoryById(@RequestBody PayloadBean payloadBean) {
		AssetSubCategoryBean assetSubCategoryBean=null;
		AssetCategoryBean assetCategoryBean=new AssetCategoryBean();
		
		if (payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			assetSubCategoryBean = assetSubCategoryManager.findSubCategoryById(payloadBean.getId());
			
			assetCategoryBean.setAssetCategoryID(assetSubCategoryBean.getAssetCategoryID().getAssetCategoryID());
			assetCategoryBean.setCategoryName(assetSubCategoryBean.getAssetCategoryID().getCategoryName());
			assetCategoryBean.setCategoryCode(assetSubCategoryBean.getAssetCategoryID().getCategoryCode());
			assetCategoryBean.setCategoryDescription(assetSubCategoryBean.getAssetCategoryID().getCategoryDescription());
			assetCategoryBean.setCategoryStatus(assetSubCategoryBean.getAssetCategoryID().getCategoryStatus());
			assetCategoryBean.setTransactionCount(assetSubCategoryBean.getAssetCategoryID().getTransactionCount());
			
			assetSubCategoryBean.setAssetCategoryID(assetCategoryBean);
			
			return new ResponseEntity<AssetSubCategoryBean>(assetSubCategoryBean, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}
	
	@PutMapping("/update-sub-category")
	public BaseResponse updateSubCategory(@RequestBody AssetSubCategoryBean assetSubCategoryBean,
			HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			assetSubCategoryBean.setIpAddress(request.getRemoteAddr());
			String resultOutput=assetSubCategoryManager.updateSubCategory(assetSubCategoryBean);
			if (resultOutput.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultOutput.equalsIgnoreCase("NameAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Sub Category Name" }, "", Locale.US));
			} else if (resultOutput.equalsIgnoreCase("CodeAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Sub Category Code" }, "", Locale.US));
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

	@PostMapping("/delete-sub-category")
	public BaseResponse deleteSubCategory(@RequestBody DeleteRecords deleteRecords) {
		BaseResponse baseResponse = null;
		try {
			String resultString = assetSubCategoryManager.deleteSubCategory(deleteRecords);
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
