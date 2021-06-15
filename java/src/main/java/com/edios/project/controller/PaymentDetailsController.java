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
import com.edios.project.bean.PaymentRequestBean;
import com.edios.project.entity.to.PaymentRequestsTO;
import com.edios.project.manager.PaymentRequestManager;

@RestController
public class PaymentDetailsController extends AbstractController {

	@Autowired
	MessageSource messageSource;
	
	@Autowired
	PaymentRequestManager paymentRequestManager;
	
	
	@GetMapping("/payment-details/{poID}")
	public ResponseEntity<List<PaymentRequestsTO>> fetchPaymentDetails(@PathVariable("poID") Long poID) {
		List<PaymentRequestsTO> fundRequestsTO=null;
		try {
			System.out.println("Purchase order id is ::::"+poID);
			fundRequestsTO = paymentRequestManager.fetchPaymentRequestDetails(poID);
		System.out.println("dsadasdas"+fundRequestsTO.size());
		}catch(Exception e) {
			return new ResponseEntity<List<PaymentRequestsTO>>(fundRequestsTO, HttpStatus.OK);	
		}
		return new ResponseEntity<List<PaymentRequestsTO>>(fundRequestsTO, HttpStatus.OK);

	}
	
	@PostMapping("/add-payment")
	public BaseResponse  addPaymentRequestDetails(@RequestBody PaymentRequestBean paymentRequestBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			paymentRequestBean.setUserIPAddress(request.getRemoteAddr());
			String result=paymentRequestManager.addPaymentRequestDetails(paymentRequestBean);
			String [] data=result.split(",");

			if (data[0].equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", ""+data[1]);
			} else {
				baseResponse = new BaseResponse(HttpStatus.CONFLICT, "EXCEPTION", "Some Thing went wrong! please try later.");
			} 
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}
	
	@GetMapping(path = { "edit-payment/{idID}" })
	public ResponseEntity<PaymentRequestBean> findOne(@PathVariable("idID") Long idID) {		
		PaymentRequestBean paymentRequestBean = paymentRequestManager.findPaymentRequestDetailsById(idID);
		return new ResponseEntity<PaymentRequestBean>(paymentRequestBean, HttpStatus.OK); 
	}
	
	@PutMapping("/update-payment-details")
	public BaseResponse updatePaymentRequestDetails(@RequestBody PaymentRequestBean paymentRequestBean, HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			paymentRequestBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = paymentRequestManager.updatePaymentRequestDetails(paymentRequestBean);
			if (resultString.equalsIgnoreCase("UPDATED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
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
	@GetMapping("/sum/{poID}")
	public ResponseEntity<List<PaymentRequestsTO>> fetchPaymentSum(@PathVariable("poID") Long poID) {
		List<PaymentRequestsTO> fundRequestsTO=null;
		try {
			System.out.println("Purchase order id is ::::"+poID);
			fundRequestsTO = paymentRequestManager.fetchPaymentSum(poID);
		System.out.println("dsadasdas"+fundRequestsTO.size());
		}catch(Exception e) {
			return new ResponseEntity<List<PaymentRequestsTO>>(fundRequestsTO, HttpStatus.OK);	
		}
		return new ResponseEntity<List<PaymentRequestsTO>>(fundRequestsTO, HttpStatus.OK);

	}
}
