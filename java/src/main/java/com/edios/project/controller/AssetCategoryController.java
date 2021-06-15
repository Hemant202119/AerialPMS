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
import com.edios.project.entity.to.AssetCategoryTO;
import com.edios.project.manager.AssetCategoryManager;


@RestController
public class AssetCategoryController extends AbstractController {
	
	@Autowired
	AssetCategoryManager assetCategoryManager;
	
	@Autowired
	MessageSource messageSource;
	
	@PostMapping("/fetch-categories")
	public ResponseEntity<List<AssetCategoryTO>> fetchCategories(@RequestBody PayloadBean payloadBean)
	{		
		List<com.edios.project.entity.to.AssetCategoryTO> assetCategoryTOList=null;
		
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null,"",Locale.US))) {
			assetCategoryTOList=assetCategoryManager.fetchCategories(payloadBean.getSearchParameter());
			return new ResponseEntity<List<AssetCategoryTO>>(assetCategoryTOList, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
	}
	
	@PostMapping("/add-category")
	public BaseResponse addCategory(@RequestBody com.edios.project.bean.AssetCategoryBean assetCategoryBean, HttpServletRequest request) {
		BaseResponse baseResponse=null;
		try {
			assetCategoryBean.setIpAddress(request.getRemoteAddr());
			String resultOutput=assetCategoryManager.addCategory(assetCategoryBean);
			if (resultOutput.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else if (resultOutput.equalsIgnoreCase("NameAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Category Name" }, "", Locale.US));
			} else if (resultOutput.equalsIgnoreCase("CodeAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Category Code" }, "", Locale.US));
			}
		}catch(Exception exception) {
			exception.printStackTrace();
			return baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
		}
		return baseResponse;
	}
	
	@PostMapping("/edit-category")
	public ResponseEntity<com.edios.project.bean.AssetCategoryBean> findCategoryById(@RequestBody PayloadBean payloadBean) {
		com.edios.project.bean.AssetCategoryBean assetCategoryBean=null;
		if (payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			assetCategoryBean = assetCategoryManager.findCategoryById(payloadBean.getId());
			return new ResponseEntity<com.edios.project.bean.AssetCategoryBean>(assetCategoryBean, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}
	
	@PutMapping("/update-category")
	public BaseResponse updateCategory(@RequestBody AssetCategoryBean assetCategoryBean,
			HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			assetCategoryBean.setIpAddress(request.getRemoteAddr());
			String resultOutput=assetCategoryManager.updateCategory(assetCategoryBean);
			if (resultOutput.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			} else if (resultOutput.equalsIgnoreCase("NameAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Category Name" }, "", Locale.US));
			} else if (resultOutput.equalsIgnoreCase("CodeAlreadyExist")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ALREADY_REPORTED", messageSource
						.getMessage("duplicateFieldMessage", new Object[] { "Category Code" }, "", Locale.US));
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

	@PostMapping("/delete-category")
	public BaseResponse deleteCategory(@RequestBody DeleteRecords deleteRecords) {
		BaseResponse baseResponse = null;
		try {
			String resultString = assetCategoryManager.deleteCategory(deleteRecords);
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
