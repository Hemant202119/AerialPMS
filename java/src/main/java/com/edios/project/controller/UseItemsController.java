package com.edios.project.controller;

import java.util.List;
import java.util.Locale;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.util.PayloadBean;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.UseItemBean;
import com.edios.project.bean.UseItemsBean;
import com.edios.project.entity.to.UseItemsTO;
import com.edios.project.manager.UseItemsManager;

@RestController
public class UseItemsController extends AbstractController {

	@Autowired UseItemsManager useItemsManager;
	@Autowired MessageSource messageSource;
	
	@PostMapping("/received-items-useList")
	public ResponseEntity<List<UseItemsTO>> searchReceivedItems(@RequestBody UseItemsBean useItemsBean){
		List<UseItemsTO> useItemsTO=null;
		if(useItemsBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			useItemsTO=useItemsManager.searchReceivedItems(useItemsBean);
			return new ResponseEntity<List<UseItemsTO>>(useItemsTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
			}	
	}
	
	@PostMapping("/fetch-useItem")
	public ResponseEntity<UseItemsTO> editUseItems(@RequestBody PayloadBean payloadBean){
		UseItemsTO useItemsTO=null;
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			useItemsTO=useItemsManager.editUseItems(payloadBean);
			return new ResponseEntity<UseItemsTO>(useItemsTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
			}	
	}
	
	@PostMapping("/insertUpdate-useItem")
	public BaseResponse insertupdateUseItems(@RequestBody  UseItemBean useItemBean,HttpServletRequest request) {		
		BaseResponse baseResponse = null;
		try {
			useItemBean.setIpAddress(request.getRemoteAddr());
			String resultString = useItemsManager.insertupdateUseItems(useItemBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "UPDATED");
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
}
