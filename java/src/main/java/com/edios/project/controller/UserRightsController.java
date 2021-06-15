package com.edios.project.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.entity.to.UserEntityTO;
import com.edios.cdf.util.PayloadBean;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.entity.to.UserRightsTO;
import com.edios.project.manager.UserRightsManager;

@RestController
public class UserRightsController extends AbstractController {

	@Autowired
	MessageSource messageSource;
	@Autowired
	UserRightsManager userRightsManager;

	@GetMapping(path = { "/users-dropdown" })
	public ResponseEntity<List<UserDetailTO>> usersDropdown() {
		List<UserDetailTO> autoCompleteTO = userRightsManager.usersDropdown();
		return new ResponseEntity<List<UserDetailTO>>(autoCompleteTO, HttpStatus.OK);
	}

	@GetMapping(path = { "/users-list" })
	public ResponseEntity<List<UserEntityTO>> getUsersList() {
		try {
			List<UserEntityTO> userRightsTO = userRightsManager.getUsersList();
			return new ResponseEntity<List<UserEntityTO>>(userRightsTO, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@PostMapping("/search-users-on-criteria")
	public ResponseEntity<List<UserRightsTO>> fetchUsersOnCriteria(@RequestBody PayloadBean payloadBean) {

		List<UserRightsTO> userRightsTO = null;

		if (payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			userRightsTO = userRightsManager.fetchUsersOnCriteria(payloadBean.getSearchParameter(),
					payloadBean.getAccountId());
			return new ResponseEntity<List<UserRightsTO>>(userRightsTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/user-rights-on-basis-of-users")
	public ResponseEntity<List<UserRightsTO>> userRightsOnBasisOfUsers(@RequestBody PayloadBean payloadBean) {

		List<UserRightsTO> userRightsTO = null;
		if (payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			userRightsTO = userRightsManager.userRightsOnBasisOfUsers();
			return new ResponseEntity<List<UserRightsTO>>(userRightsTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/selected-user-rights-on-basis-of-users")
	public ResponseEntity<List<UserRightsTO>> selectedUserRightsOnBasisOfUsers(@RequestBody PayloadBean payloadBean) {

		List<UserRightsTO> userRightsTO = null;
		if (payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			userRightsTO = userRightsManager.selectedUserRightsOnBasisOfUsers(payloadBean.getAccountId(),
					payloadBean.getId());
			return new ResponseEntity<List<UserRightsTO>>(userRightsTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/save-user-rights")
	public BaseResponse saveUserRights(@RequestBody List<UserRightsTO> userRightsTO) {
		BaseResponse baseResponse = null;
		try {
			String resultString = userRightsManager.saveUserRights(userRightsTO);
			if (resultString.equalsIgnoreCase("success")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	@PostMapping("delete-user-right")
	public BaseResponse deleteUserRight(@RequestBody UserRightsTO deleteRecords) {
		BaseResponse baseResponse = null;
		try {
			String resultString = userRightsManager.deleteUserRight(deleteRecords);
			if (resultString.equalsIgnoreCase("DELETED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "DELETED", "");
			}else if (resultString.equalsIgnoreCase("NOT_DELETED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "NOT_DELETED",
						messageSource.getMessage("transactionFailedNotDeletedInUserRights", null, "", Locale.US));
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
}