package com.edios.project.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.edios.cdf.controller.SendMailUsingAuthentication;
import com.edios.cdf.validator.BaseResponse;
import com.edios.project.bean.FundRequestBean;
import com.edios.project.entity.to.FundRequestsTO;
import com.edios.project.entity.to.InvoiceDetailsTO;
import com.edios.project.entity.to.PaymentRequestsTO;
import com.edios.project.manager.FundRequestManager;

@RestController
public class FundRequestsController extends AbstractController {
	
	@Autowired
	MessageSource messageSource;

	@Autowired
	FundRequestManager fundRequestManager;
	
	Double amount;
	@GetMapping("/fr-details/{poID}")
	public ResponseEntity<List<FundRequestsTO>> fetchFundRequestDetails(@PathVariable("poID") Long poID) {
		List<FundRequestsTO> fundRequestsTO = null;
		try {
			fundRequestsTO = fundRequestManager.fetchFundRequestDetails(poID);
		} catch (Exception e) {
			return new ResponseEntity<List<FundRequestsTO>>(fundRequestsTO, HttpStatus.OK);
		}
		return new ResponseEntity<List<FundRequestsTO>>(fundRequestsTO, HttpStatus.OK);

	}

	@PostMapping("/add-fr")
	public BaseResponse addFundRequestDetails(@RequestBody FundRequestBean fundRequestBean,
			HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			fundRequestBean.setUserIPAddress(request.getRemoteAddr());
			String result = fundRequestManager.addFundRequestDetails(fundRequestBean);
			if (result.equalsIgnoreCase("ADDED")) {
				baseResponse = new BaseResponse(HttpStatus.OK, "ADDED", "");
			} else {
				baseResponse = new BaseResponse(HttpStatus.CONFLICT, "EXCEPTION",
						"Some Thing went wrong! please try later.");
			}
			return baseResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return baseResponse;
		}
	}

	@GetMapping(path = { "edit-fr/{idID}" })
	public ResponseEntity<FundRequestBean> findOne(@PathVariable("idID") Long idID) {
		FundRequestBean fundRequestBean = fundRequestManager.findFundRequestDetailsById(idID);
		return new ResponseEntity<FundRequestBean>(fundRequestBean, HttpStatus.OK);
	}

	@PutMapping("/update-fr-details")
	public BaseResponse updateFundRequestDetails(@RequestBody FundRequestBean fundRequestBean,
			HttpServletRequest request) {
		BaseResponse baseResponse = null;
		try {
			fundRequestBean.setUserIPAddress(request.getRemoteAddr());
			String resultString = fundRequestManager.updateFundRequestDetails(fundRequestBean);
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

	@GetMapping("sendMail/{mail}/{pdID}")
	public void addFundRequestDetails(@PathVariable("mail") String mail, @PathVariable("pdID") Long pdID) {
		String emailCCRecipientsAddress = "";

		String[] emailRecipients = mail.split(",");
		List<PaymentRequestsTO> fundrequestData = fundRequestManager.getDataForContractorEmail(pdID);
		SendMailUsingAuthentication sendMail = new SendMailUsingAuthentication();
//		if (!fundrequestData.isEmpty()) {
//			emailCCRecipientsAddress = fundrequestData.get(0).getUserEmailAddress();
//		}
		try {
			sendMail.postMail(emailRecipients, emailCCRecipientsAddress, createHtmlForEmail(fundrequestData),
					"New Payment Update Generated");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String formatDate(Date frDate) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
		String date = simpleDateFormat.format(frDate);
		return date;
	}

	private String createHtmlForEmail(List<PaymentRequestsTO> fundrequestData) {
		StringBuilder tableBuilder = new StringBuilder();
		try {
			for (PaymentRequestsTO fundRequest : fundrequestData) {
				String bankName = fundRequest.getBankName() == null ? "" : fundRequest.getBankName();
				String accountNo = (fundRequest.getAccountNo() == null ? "" : fundRequest.getAccountNo());
				String branchaddress = fundRequest.getBranchAddress() == null ? "" : fundRequest.getBranchAddress();
				String accountholdername = (fundRequest.getAccountHolderName() == null ? ""
						: fundRequest.getAccountHolderName());
				String ifsccode = (fundRequest.getIfscCode() == null ? "" : fundRequest.getIfscCode());
				String pannumber = (fundRequest.getPanNumber() == null ? "" : fundRequest.getPanNumber());
				String gstno = fundRequest.getGstNo() == null ? "" : fundRequest.getGstNo();
				String aadharno = fundRequest.getAadharNo() == null ? "" : fundRequest.getAadharNo();
				String notes = fundRequest.getNotes() == null ? "" : fundRequest.getNotes();
				String date = formatDate(fundRequest.getPaymentDate());

				tableBuilder.append("<body style=\"font-family:Arial\"> "
						+ "<STYLE TYPE=\"text/css\"> * {  font-family: Arial;  }  table { table-layout:fixed;	word-break:break-all;}"
						+ " TH{font-family: Arial; font-size:14;}TD{font-family: Arial; font-size: 14; } p{font-family: Arial; font-size: 14;}"
						+ "</STYLE> Automated Payment Update Generated for Purchase Order Number "
						+ fundRequest.getPoID()
						+ " <BR/><BR/><table border=\"1\" cellpadding=\"3\" cellspacing=\"2\"> <tr><td width =\"250px\">"
						+ "<b>Circle Name</b></td>" + "<td  width =\"700px\">" + fundRequest.getCircleName()
						+ "</td></tr><tr><td width =\"250px\"><b>Customer Name</b></td>" + "<td  width =\"700px\">"
						+ fundRequest.getCustomerName() + "</td></tr><tr><td width =\"250px\"><b>Site Name</b></td>"
						+ "<td  width =\"700px\">" + fundRequest.getSiteName()
						+ "</td></tr><tr><td width =\"250px\"><b>Site Id</b></td>" + "<td  width =\"700px\">"
						+ fundRequest.getSiteID() + "</td></tr><tr><td width =\"250px\"><b>Site Status</b></td>"
						+ "<td  width =\"700px\">" + fundRequest.getStatusName()
						+ "</td></tr><tr><td width =\"250px\"><b>Status Date</b></td>" + "<td  width =\"700px\">"
						+ formatDate(fundRequest.getProjectStatusDate())
						+ "</td></tr><tr><td width =\"250px\"><b>PO Activity</b></td>"
						+ "<td  width =\"700px\">" + fundRequest.getParameterListValue() + "</td></tr>"
						+ "<tr><td  width =\"250px\">" + "<b>Contractor/Supplier Name</b></td><td  width =\"700px\">"
						+ fundRequest.getBusinessName() + " </td> </tr>" + "<tr><td  width =\"250px\">"
						+ "<b>Payment Complete Date</b></td><td  width =\"700px\">" + date + " </td> </tr>"
						+ "<tr><td  width =\"250px\">" + "<b>Payment Request Amount(Rs.)</b></td><td  width =\"700px\">"
						+ fundRequest.getPaymentAmount() + " </td> </tr>" + "<tr><td  width =\"250px\">"
						+ "<b>Payment Request Notes</b></td><td  width =\"700px\">" + notes + " </td> </tr>"
//						+ "<tr><td  width =\"250px\">" + "<b>Payment Request Raised By</b></td><td  width =\"700px\">"
//						+ fundRequest.getUserName() + " </td> </tr>" + "<tr><td width =\"250px\">"
						+ "<b>Account Info</b></td><td  width =\"700px\">" + "Bank Name:" + bankName + "<br/>"
						+ "Branch Address:" + branchaddress + "<br/>" + "Account Number:" + accountNo + "<br/>"
						+ "Account Holder Name:" + accountholdername + "<br/>" + "IFSC Code: " + ifsccode + "<br/>"
						+ "PAN Number:" + pannumber + "<br/>" + "GST Number:" + gstno + "<br/>" + "Aadhar Number:"
						+ aadharno + "<br/>" + "</td></tr></table></body>");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return tableBuilder.toString();
	}
	@GetMapping("reminderMail/{mail}/{pdID}")
	public void addReminderDetails(@PathVariable("mail") String mail, @PathVariable("pdID") Long pdID) {
		String emailCCRecipientsAddress = "";

		String[] emailRecipients = mail.split(",");
		List<InvoiceDetailsTO> fundrequestData = fundRequestManager.getDataForReminderEmail(pdID);
		 amount=fundRequestManager.getTotalAmount(pdID);
		SendMailUsingAuthentication sendMail = new SendMailUsingAuthentication();
		try {
			sendMail.postMail(emailRecipients, emailCCRecipientsAddress, createHtmlForReminderEmail(fundrequestData),
					"New Pending Invoice Reminder");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	private String createHtmlForReminderEmail(List<InvoiceDetailsTO> fundrequestData) {
		StringBuilder tableBuilder = new StringBuilder();
		try {
			for (InvoiceDetailsTO fundRequest : fundrequestData) {
				String bankName = fundRequest.getBankName() == null ? "" : fundRequest.getBankName();
				String accountNo = (fundRequest.getAccountNo() == null ? "" : fundRequest.getAccountNo());
				String branchaddress = fundRequest.getBranchAddress() == null ? "" : fundRequest.getBranchAddress();
				String accountholdername = (fundRequest.getAccountHolderName() == null ? ""
						: fundRequest.getAccountHolderName());
				String ifsccode = (fundRequest.getIfscCode() == null ? "" : fundRequest.getIfscCode());
				String pannumber = (fundRequest.getPanNumber() == null ? "" : fundRequest.getPanNumber());
				String gstno = fundRequest.getGstNo() == null ? "" : fundRequest.getGstNo();
				String aadharno = fundRequest.getAadharNo() == null ? "" : fundRequest.getAadharNo();
				String notes = fundRequest.getNotes() == null ? "" : fundRequest.getNotes();
				String date = formatDate(fundRequest.getInvoiceDate());
				Double pendingAmount =fundRequest.getTotalAmount1()-amount;
				tableBuilder.append("<body style=\"font-family:Arial\"> "
						+ "<STYLE TYPE=\"text/css\"> * {  font-family: Arial;  }  table { table-layout:fixed;	word-break:break-all;}"
						+ " TH{font-family: Arial; font-size:14;}TD{font-family: Arial; font-size: 14; } p{font-family: Arial; font-size: 14;}"
						+ "</STYLE> Automated Invoice pending for Purchase Order Number "
						+ fundRequest.getPoID()
						+ " <BR/><BR/><table border=\"1\" cellpadding=\"3\" cellspacing=\"2\"> <tr><td width =\"250px\">"
						+ "<b>Circle Name</b></td>" + "<td  width =\"700px\">" + fundRequest.getCircleName()
						+ "</td></tr><tr><td width =\"250px\"><b>Customer Name</b></td>" + "<td  width =\"700px\">"
						+ fundRequest.getCustomerName() + "</td></tr><tr><td width =\"250px\"><b>Site Name</b></td>"
						+ "<td  width =\"700px\">" + fundRequest.getSiteName()
						+ "</td></tr><tr><td width =\"250px\"><b>Site Id</b></td>" + "<td  width =\"700px\">"
						+ fundRequest.getSiteID() + "</td></tr><tr><td width =\"250px\"><b>Site Status</b></td>"
						+ "<td  width =\"700px\">" + fundRequest.getStatusName()
						+ "</td></tr><tr><td width =\"250px\"><b>Status Date</b></td>" + "<td  width =\"700px\">"
						+ formatDate(fundRequest.getProjectStatusDate())
						+ "</td></tr><tr><td width =\"250px\"><b>PO Total Amount</b></td>" + "<td  width =\"700px\">"
						+ fundRequest.getTotalAmount1() + "</td></tr><tr><td width =\"250px\"><b>PO Activity</b></td>"
						+ "<td  width =\"700px\">" + fundRequest.getParameterListValue() + "</td></tr>"
						+ "<tr><td  width =\"250px\">" + "<b>Contractor/Supplier Name</b></td><td  width =\"700px\">"
						+ fundRequest.getBusinessName() + " </td> </tr>" + "<tr><td  width =\"250px\">"
						+ "<b>Payment Request Date</b></td><td  width =\"700px\">" + date + " </td> </tr>"
						+ "<tr><td  width =\"250px\">" + "<b>Pending Invoice Amount(Rs.)</b></td><td  width =\"700px\">"
						+  + pendingAmount+" </td> </tr>" + "<tr><td  width =\"250px\">"
						+ "<b>Payment Request Notes</b></td><td  width =\"700px\">" + notes + " </td> </tr>"
//						+ "<tr><td  width =\"250px\">" + "<b>Payment Request Raised By</b></td><td  width =\"700px\">"
//						+ fundRequest.getUserName() + " </td> </tr>" + "<tr><td width =\"250px\">"
						+ "<b>Account Info</b></td><td  width =\"700px\">" + "Bank Name:" + bankName + "<br/>"
						+ "Branch Address:" + branchaddress + "<br/>" + "Account Number:" + accountNo + "<br/>"
						+ "Account Holder Name:" + accountholdername + "<br/>" + "IFSC Code: " + ifsccode + "<br/>"
						+ "PAN Number:" + pannumber + "<br/>" + "GST Number:" + gstno + "<br/>" + "Aadhar Number:"
						+ aadharno + "<br/>" + "</td></tr></table></body>");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return tableBuilder.toString();
	}
}
