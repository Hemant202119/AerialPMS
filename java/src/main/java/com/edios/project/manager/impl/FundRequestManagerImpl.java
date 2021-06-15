package com.edios.project.manager.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.controller.SendMailUsingAuthentication;
import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.AppConstants;
import com.edios.project.bean.FundRequestBean;
import com.edios.project.dao.FundRequestDao;
import com.edios.project.dao.PurchaseOrderDao;
import com.edios.project.entity.FundRequestsEntity;
import com.edios.project.entity.to.FundRequestsTO;
import com.edios.project.entity.to.InvoiceDetailsTO;
import com.edios.project.entity.to.PaymentRequestsTO;
import com.edios.project.manager.FundRequestManager;

@Service
public class FundRequestManagerImpl extends AbstractManagerImpl<FundRequestBean, FundRequestsEntity>
implements FundRequestManager {
	
	@Autowired
	FundRequestDao fundRequestDao;
	
	@Autowired
	PurchaseOrderDao purchaseOrderDao;

	@Override
	@Transactional
	public List<FundRequestsTO> fetchFundRequestDetails(Long poID) {
		List<FundRequestsTO> fundRequestsTO = null;
		try {
			fundRequestsTO = fundRequestDao.fetchFundRequestDetails(poID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return fundRequestsTO;
	}
	
	@Override
	@Transactional
	public String addFundRequestDetails(FundRequestBean fundRequestBean) {
		String emailCCRecipientsAddress="";
		String addresult="";
		Long idID=null;
		setAuditInfo(fundRequestBean,"newFlag");
		FundRequestsEntity fundRequestsEntity=	 mapper.map(fundRequestBean, FundRequestsEntity.class);	
		idID=fundRequestDao.addFundRequestDetails(fundRequestsEntity);
		
		if(idID!=null) {
		String[]emailRecipients=fundRequestBean.getEmailAddresses().split(",");
		List<FundRequestsTO>fundrequestData= fundRequestDao.getDataForEmail(idID);
		SendMailUsingAuthentication sendMail=new SendMailUsingAuthentication();
		if(!fundrequestData.isEmpty()) {
			emailCCRecipientsAddress=fundrequestData.get(0).getUserEmailAddress();
		}
		try {				
		     sendMail.postMail(emailRecipients,emailCCRecipientsAddress,createHtmlForEmail(fundrequestData),"New Fund Request Generated");
		 }
		 catch (Exception e) {
		e.printStackTrace();
		}
			addresult="ADDED";
		
		}		
		// TODO Auto-generated method stub
		return addresult;
	}

	
	private String createHtmlForEmail(List<FundRequestsTO> fundrequestData ) {
		StringBuilder tableBuilder=new StringBuilder();
		try {		
				for(FundRequestsTO fundRequest:fundrequestData) {
					String bankName=fundRequest.getBankName()==null?"":fundRequest.getBankName();
					String accountNo=(fundRequest.getAccountNo()==null?"":fundRequest.getAccountNo());
					String branchaddress=fundRequest.getBranchAddress()==null?"":fundRequest.getBranchAddress();
					String accountholdername=(fundRequest.getAccountHolderName()==null?"":fundRequest.getAccountHolderName());
					String ifsccode=(fundRequest.getIfscCode()==null?"":fundRequest.getIfscCode());
					String pannumber=(fundRequest.getPanNumber()==null?"":fundRequest.getPanNumber());
					String gstno=fundRequest.getGstNo()==null?"":fundRequest.getGstNo();
					String aadharno=fundRequest.getAadharNo()==null?"":fundRequest.getAadharNo();
					String notes=fundRequest.getNotes()==null?"":fundRequest.getNotes();
					String date=formatDate(fundRequest.getFrDate());
					
		tableBuilder.append("<body style=\"font-family:Arial\"> "
                + "<STYLE TYPE=\"text/css\"> * {  font-family: Arial;  }  table { table-layout:fixed;	word-break:break-all;}"
                + " TH{font-family: Arial; font-size:14;}TD{font-family: Arial; font-size: 14; } p{font-family: Arial; font-size: 14;}"
                + "</STYLE> Automated Fund Request Generated for Purchase Order Number "+fundRequest.getPoID()+" <BR/><BR/><table border=\"1\" cellpadding=\"3\" cellspacing=\"2\"> <tr><td width =\"250px\">" +
						"<b>Circle Name</b></td>"                		
						+ "<td  width =\"700px\">"+fundRequest.getCircleName()+"</td></tr><tr><td width =\"250px\"><b>Customer Name</b></td>"
						+ "<td  width =\"700px\">"+fundRequest.getCustomerName()+"</td></tr><tr><td width =\"250px\"><b>Site Name</b></td>"
						+ "<td  width =\"700px\">"+fundRequest.getSiteName()+"</td></tr><tr><td width =\"250px\"><b>Site Id</b></td>"
						+ "<td  width =\"700px\">"+fundRequest.getSiteID()+"</td></tr><tr><td width =\"250px\"><b>Site Status</b></td>"
						+ "<td  width =\"700px\">"+fundRequest.getStatusName()+"</td></tr><tr><td width =\"250px\"><b>Status Date</b></td>"
						+ "<td  width =\"700px\">"+formatDate(fundRequest.getProjectStatusDate())+"</td></tr><tr><td width =\"250px\"><b>PO Activity</b></td>"
						+ "<td  width =\"700px\">"+fundRequest.getParameterListValue()+"</td></tr>"
						+ "<tr><td  width =\"250px\">"
				        + "<b>Contractor/Supplier Name</b></td><td  width =\"700px\">"+fundRequest.getBusinessName()+" </td> </tr>"	
						+ "<tr><td  width =\"250px\">"
		                + "<b>Fund Request Date</b></td><td  width =\"700px\">"+date+" </td> </tr>"		                       	
					    + "<tr><td  width =\"250px\">"
			            + "<b>Fund Request Amount(Rs.)</b></td><td  width =\"700px\">"+fundRequest.getFrAmount()+" </td> </tr>"
			            + "<tr><td  width =\"250px\">"
						+ "<b>Fund Request Notes</b></td><td  width =\"700px\">"+notes+" </td> </tr>" 
//						+ "<tr><td  width =\"250px\">"
//						+ "<b>Fund Request Raised By</b></td><td  width =\"700px\">"+fundRequest.getUserName()+" </td> </tr>"
						+"<tr><td width =\"250px\">"						
                        +"<b>Account Info</b></td><td  width =\"700px\">"
                        + "Bank Name:"+bankName+"<br/>"
                        + "Branch Address:"+branchaddress+"<br/>"
                        + "Account Number:"+accountNo+"<br/>"
                        + "Account Holder Name:"+accountholdername+"<br/>"
                        + "IFSC Code: "+ifsccode+"<br/>"
                        + "PAN Number:"+pannumber+"<br/>"
                        + "GST Number:"+gstno+"<br/>"
                        + "Aadhar Number:"+aadharno+"<br/>"
                        + "</td></tr></table></body>");
				}
		}catch(Exception e) {
			e.printStackTrace();
		}			
		return tableBuilder.toString();
	}

	private String formatDate(Date frDate) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
		String date = simpleDateFormat.format(frDate);	
		return date;
	}

	private void setAuditInfo(FundRequestBean fundRequestBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
		
			fundRequestBean.setTransactionCount(AppConstants.TRANSACTION_BEGIN);
			fundRequestBean.setRecordType(AppConstants.RECORDTYPE_INSERT);
			fundRequestBean.setCreatedDate(new Date());
		}else {	
			fundRequestBean.setTransactionCount(fundRequestBean.getTransactionCount()+AppConstants.TRANSACTION_BEGIN);
			fundRequestBean.setRecordType(AppConstants.RECORDTYPE_UPDATE);
			fundRequestBean.setLastModifiedDate(new Date());
		}
	}

	@Override
	@Transactional
	public FundRequestBean findFundRequestDetailsById(Long idID) {
		FundRequestBean fundRequestBean =null;
		fundRequestBean = mapper.map(fundRequestDao.findFundRequestDetailsById(idID),
				FundRequestBean.class);
		return fundRequestBean;
	}

	@Override
	@Transactional
	public String updateFundRequestDetails(FundRequestBean fundRequestBean) {		
			// TODO Auto-generated method stub		
				String resultString = "";
				String emailCCRecipients="";
				boolean resultFlag = false;

				FundRequestBean latestData =findFundRequestDetailsById(fundRequestBean.getFrID());
				if (latestData.getTransactionCount() > (fundRequestBean.getTransactionCount())) {
					fundRequestBean = latestData;
					// sessionManager.getLogging().logDebugInfo("Transaction Failed", "INFO");
					return "TransactionFailed";
				}
				if (latestData.getRecordType() == 'D') {
					fundRequestBean = latestData;
					// sessionManager.getLogging().logDebugInfo("Transaction Failed due to record is
					// already deleted", "INFO");
					return "recordDeleted";
				}
				setAuditInfo(fundRequestBean,"editFlag");
				FundRequestsEntity fundRequestsEntity = mapper.map(fundRequestBean,FundRequestsEntity.class);
				resultFlag = fundRequestDao.updateFundRequestDetails(fundRequestsEntity);
				if(resultFlag) {
				String[]emailRecipients=fundRequestBean.getEmailAddresses().split(",");
				List<FundRequestsTO>fundrequestData= fundRequestDao.getDataForEmail(fundRequestBean.getFrID());
				SendMailUsingAuthentication sendMail=new SendMailUsingAuthentication();
				if(!fundrequestData.isEmpty())
					emailCCRecipients=fundrequestData.get(0).getUserEmailAddress();
				try {				
				     sendMail.postMail(emailRecipients,emailCCRecipients,createHtmlForEmail(fundrequestData),"Updated Fund Request Generated");
				 }
				 catch (Exception e) {
				e.printStackTrace();
				}
				}
				System.out.println("resultFlag==" + resultFlag);
				if (resultFlag) {
					resultString= "UPDATED";
				}
				return resultString;
			
		}

	@Override
	@Transactional
	public List<PaymentRequestsTO> getDataForContractorEmail(Long pdID) {
				return fundRequestDao.getDataForContractorEmail(pdID);
	}

	@Override
	@Transactional
	public List<InvoiceDetailsTO> getDataForReminderEmail(Long pdID) {
		return fundRequestDao.getDataForReminderEmail(pdID);	}
		
	@Override
	@Transactional
	public Double getTotalAmount(Long id) {
		return fundRequestDao.getTotalAmount(id);	}
}
