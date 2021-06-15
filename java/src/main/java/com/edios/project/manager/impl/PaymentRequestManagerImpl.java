package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.AppConstants;
import com.edios.project.bean.PaymentRequestBean;
import com.edios.project.dao.PaymentRequestDao;
import com.edios.project.dao.PurchaseOrderDao;
import com.edios.project.entity.PaymentRequestsEntity;
import com.edios.project.entity.to.PaymentRequestsTO;
import com.edios.project.manager.PaymentRequestManager;
@Service
public class PaymentRequestManagerImpl extends AbstractManagerImpl<PaymentRequestBean, PaymentRequestsEntity>
implements PaymentRequestManager {
	
	@Autowired
	PaymentRequestDao paymentRequestDao;
	
	@Autowired
	PurchaseOrderDao purchaseOrderDao;

	@Override
	@Transactional
	public List<PaymentRequestsTO> fetchPaymentRequestDetails(Long poID) {
		List<PaymentRequestsTO> fundRequestsTO = null;
		try {
			fundRequestsTO = paymentRequestDao.fetchPaymentRequestDetails(poID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return fundRequestsTO;
	}
	
	@Override
	@Transactional
	public String addPaymentRequestDetails(PaymentRequestBean fundRequestBean) {
		String addresult="";
		Long idID=null;
		setAuditInfo(fundRequestBean,"newFlag");
		PaymentRequestsEntity fundRequestsEntity=	 mapper.map(fundRequestBean, PaymentRequestsEntity.class);	
		idID=paymentRequestDao.addPaymentRequestDetails(fundRequestsEntity);
		
		if(idID!=null) {
			/*boolean updateResultFlag=false;
			PurchaseOrdersBean purchaseOrdersBean=null;		
			purchaseOrdersBean = mapper.map(purchaseOrderDao.findCustomerPOById(fundRequestBean.getPoID().getPoID()),
					PurchaseOrdersBean.class);			
			purchaseOrdersBean.setFrStatus("Partial");
			PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean,PurchaseOrdersEntity.class);			
			updateResultFlag = purchaseOrderDao.updateCustomerPO(purchaseOrdersEntity);			
			if(updateResultFlag) {
			System.out.println(" Invoice Details  added successfully");*/
			addresult="ADDED,"+idID;
		   //}
		}		
		// TODO Auto-generated method stub
		return addresult;
	}

	
	private void setAuditInfo(PaymentRequestBean fundRequestBean, String string) {
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
	public PaymentRequestBean findPaymentRequestDetailsById(Long idID) {
		PaymentRequestBean fundRequestBean =null;
		fundRequestBean = mapper.map(paymentRequestDao.findPaymentRequestDetailsById(idID),
				PaymentRequestBean.class);
		return fundRequestBean;
	}

	@Override
	@Transactional
	public String updatePaymentRequestDetails(PaymentRequestBean fundRequestBean) {		
			// TODO Auto-generated method stub		
				String resultString = "";
				boolean resultFlag = false;

				PaymentRequestBean latestData =findPaymentRequestDetailsById(fundRequestBean.getPdID());
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
				PaymentRequestsEntity fundRequestsEntity = mapper.map(fundRequestBean,PaymentRequestsEntity.class);
				resultFlag = paymentRequestDao.updatePaymentRequestDetails(fundRequestsEntity);
				System.out.println("resultFlag==" + resultFlag);
				if (resultFlag) {
					resultString= "UPDATED";
				}
				return resultString;
			
		}

	@Override
	@Transactional
	public List<PaymentRequestsTO> fetchPaymentSum(Long poID) {
		List<PaymentRequestsTO> fundRequestsTO = null;
		try {
			fundRequestsTO = paymentRequestDao.fetchPaymentSum(poID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return fundRequestsTO;
	}
	
}
