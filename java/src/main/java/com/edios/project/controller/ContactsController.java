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
import com.edios.project.bean.ContactsBean;
import com.edios.project.entity.to.ContactsEntityTO;
import com.edios.project.manager.ContactsManager;

@RestController
public class ContactsController extends AbstractController {

	@Autowired
	ContactsManager contactManager;

	@Autowired
	MessageSource messageSource;

	@GetMapping("/search-contact")
	public ResponseEntity<List<ContactsEntityTO>> searchContacts() {
		List<ContactsEntityTO> contactsEntityTO = contactManager.searchContacts();

		return new ResponseEntity<List<ContactsEntityTO>>(contactsEntityTO, HttpStatus.OK);
	}

	@GetMapping(path = { "/search-contact-on-criteria/{contactStatus}" })
	public ResponseEntity<List<ContactsEntityTO>> fetchContactDetails(
			@PathVariable("contactStatus") String contactStatus, Principal principal) {
		List<ContactsEntityTO> contactsEntityTO = contactManager.fetchContactDetails(contactStatus);
		if (contactsEntityTO.size() == 0) {
			return new ResponseEntity<List<ContactsEntityTO>>(contactsEntityTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<ContactsEntityTO>>(contactsEntityTO, HttpStatus.OK);
		}
	}

	@PostMapping("/add-contact")
	BaseResponse addContacts(@RequestBody ContactsBean contactsBean) {
		BaseResponse baseResponse = null;
		try {

			String resultString = contactManager.addContacts(contactsBean);
			if (resultString.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			}
			// else if (resultString.equalsIgnoreCase("NameAlreadyExist")) {
			// baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED,
			// "ALREADY_REPORTED", messageSource
			// .getMessage("duplicateFieldMessage", new Object[] { "Circle Name" }, "",
			// Locale.US));
			// }
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}

	}

	@GetMapping(path = { "edit-contact/{id}" })
	public ResponseEntity<ContactsBean> editContact(@PathVariable("id") Long id, Principal principal) {

		ContactsBean contactsBean = contactManager.editContact(id);
		return new ResponseEntity<ContactsBean>(contactsBean, HttpStatus.OK);
	}

	@PutMapping("update-contact")
	public BaseResponse updateContact(@RequestBody ContactsBean contactsBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			contactsBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = contactManager.updateContact(contactsBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
				// } else if (resultString.equalsIgnoreCase("NameAlreadyExist")) {
				// baseResponse = new BaseResponse(HttpStatus.CONFLICT, "CONFLICT",
				// messageSource
				// .getMessage("duplicateFieldMessage", new Object[] { "Circle Name" }, "",
				// Locale.US));
				// }
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

	@PostMapping("/delete-contact")
	public BaseResponse deleteContact(@RequestBody DeleteRecords deleteRecords) {
		BaseResponse baseResponse = null;
		try {
			String resultString = contactManager.deleteContact(deleteRecords);
			if (resultString.equalsIgnoreCase("DELETED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "DELETED", "");
			}else if (resultString.equalsIgnoreCase("NOT_DELETED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "NOT_DELETED",
						messageSource.getMessage("transactionFailedNotDeletedMessage", null, "", Locale.US));
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
