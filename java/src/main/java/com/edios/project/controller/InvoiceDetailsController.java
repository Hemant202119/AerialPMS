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
import com.edios.project.bean.InvoiceDetailsBean;
import com.edios.project.entity.to.InvoiceDetailsTO;
import com.edios.project.manager.InvoiceDetailsManager;

@RestController
public class InvoiceDetailsController extends AbstractController {

	@Autowired
	MessageSource messageSource;
	
	@Autowired
	InvoiceDetailsManager invoiceDetailsManager;
	
	
	@GetMapping("/invoice-details/{poID}")
	public ResponseEntity<List<InvoiceDetailsTO>> fetchInvoiceDetails(@PathVariable("poID") Long poID) {
		List<InvoiceDetailsTO> invoiceDetailsTO=null;
		try {
		invoiceDetailsTO = invoiceDetailsManager.fetchInvoiceDetails(poID);
		
		}catch(Exception e) {
			return new ResponseEntity<List<InvoiceDetailsTO>>(invoiceDetailsTO, HttpStatus.CONFLICT);	
		}
		return new ResponseEntity<List<InvoiceDetailsTO>>(invoiceDetailsTO, HttpStatus.OK);

	}
	
	@PostMapping("/add-invoice")
	public BaseResponse  addInvoice(@RequestBody InvoiceDetailsBean invoiceDetailsBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			
			invoiceDetailsBean.setUserIPAddress(request.getRemoteAddr());
			String result=invoiceDetailsManager.addInvoiceDetails(invoiceDetailsBean);
			if (result.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else if (result.equalsIgnoreCase("PO_EXISTS")) {
				baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED",
						messageSource.getMessage("duplicateFieldMessage", new Object[] { "Invoice No." }, "", Locale.US));
			} else {
				baseResponse = new BaseResponse(HttpStatus.CONFLICT, "EXCEPTION", "Some Thing went wrong! please try later.");
			} 
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
	@GetMapping(path = { "edit-invoice/{idID}" })
	public ResponseEntity<InvoiceDetailsBean> findOne(@PathVariable("idID") Long idID) {		
		InvoiceDetailsBean invoiceDetailsBean = invoiceDetailsManager.findInvoiceDetailsById(idID);
		return new ResponseEntity<InvoiceDetailsBean>(invoiceDetailsBean, HttpStatus.OK); 
	}
	
	@PutMapping("/update-invoice-details")
	public BaseResponse updateInvoiceDetails(@RequestBody InvoiceDetailsBean invoiceDetailsBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			
			invoiceDetailsBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = invoiceDetailsManager.updateInvoiceDetails(invoiceDetailsBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
			}else if (resultString.equalsIgnoreCase("PO_EXISTS")) {
				baseResponse = new BaseResponse(HttpStatus.ALREADY_REPORTED, "ALREADY_REPORTED",
						messageSource.getMessage("duplicateFieldMessage", new Object[] { "Invoice No." }, "", Locale.US));
			} else if (resultString.equalsIgnoreCase("TransactionFailed")) {
				baseResponse = new BaseResponse(HttpStatus.BAD_REQUEST, "BAD_REQUEST",
				messageSource.getMessage("transactionFailedUpdateMessage", null, "", Locale.US));
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
}
