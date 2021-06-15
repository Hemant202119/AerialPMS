package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.AppConstants;
import com.edios.project.bean.InvoiceDetailsBean;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.InvoiceDetailsDao;
import com.edios.project.dao.PurchaseOrderDao;
import com.edios.project.entity.InvoiceDetailsEntity;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.InvoiceDetailsTO;
import com.edios.project.manager.InvoiceDetailsManager;

@Service
public class InvoiceDetailsManagerImpl extends AbstractManagerImpl<InvoiceDetailsBean, InvoiceDetailsEntity>
implements InvoiceDetailsManager {
	
	@Autowired
	InvoiceDetailsDao invoiceDetailsDao;
	
	@Autowired
	PurchaseOrderDao purchaseOrderDao;

	@Override
	@Transactional
	public List<InvoiceDetailsTO> fetchInvoiceDetails(Long poID) {
		List<InvoiceDetailsTO> invoiceDetailsTO = null;
		try {			
			invoiceDetailsTO = invoiceDetailsDao.fetchInvoiceDetails(poID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return invoiceDetailsTO;
	}
	
	@Override
	@Transactional
	public String addInvoiceDetails(InvoiceDetailsBean invoiceDetailsBean) {
		String addresult="";
		Long idID=null;
		//Check PO number is exists or not...
    	boolean poExistsFlag=invoiceDetailsDao.isPONumberExists(invoiceDetailsBean.getInvoiceNo());
    	if(poExistsFlag) {
    		return "PO_EXISTS";
    	}
		setAuditInfo(invoiceDetailsBean,"newFlag");
		InvoiceDetailsEntity invoiceDetailsEntity=	 mapper.map(invoiceDetailsBean, InvoiceDetailsEntity.class);	
		idID=invoiceDetailsDao.addInvoiceDetails(invoiceDetailsEntity);
		
		if(idID!=null) {
			boolean updateResultFlag=false;
			PurchaseOrdersBean purchaseOrdersBean=null;		
			purchaseOrdersBean = mapper.map(purchaseOrderDao.findCustomerPOById(invoiceDetailsBean.getPoID().getPoID()),
					PurchaseOrdersBean.class);			
			purchaseOrdersBean.setInvoiceStatus("Partial");
			PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean,PurchaseOrdersEntity.class);			
			updateResultFlag = purchaseOrderDao.updateCustomerPO(purchaseOrdersEntity);			
			if(updateResultFlag) {
			System.out.println(" Invoice Details  added successfully");
			addresult="ADDED";
		   }
		}		
		// TODO Auto-generated method stub
		return addresult;
	}

	
	private void setAuditInfo(InvoiceDetailsBean invoiceDetailsBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			invoiceDetailsBean.setTransactionCount(AppConstants.TRANSACTION_BEGIN);
			invoiceDetailsBean.setRecordType(AppConstants.RECORDTYPE_INSERT);
			invoiceDetailsBean.setCreatedDate(new Date());
		}else {
			invoiceDetailsBean.setTransactionCount(invoiceDetailsBean.getTransactionCount()+AppConstants.TRANSACTION_BEGIN);
			invoiceDetailsBean.setRecordType(AppConstants.RECORDTYPE_UPDATE);
			invoiceDetailsBean.setLastModifiedDate(new Date());
		}
	}

	@Override
	@Transactional
	public InvoiceDetailsBean findInvoiceDetailsById(Long idID) {
		InvoiceDetailsBean invoiceDetailsBean =null;
		invoiceDetailsBean = mapper.map(invoiceDetailsDao.findInvoiceDetailsById(idID),
				InvoiceDetailsBean.class);
		return invoiceDetailsBean;
	}

	@Override
	@Transactional
	public String updateInvoiceDetails(InvoiceDetailsBean invoiceDetailsBean) {		
			// TODO Auto-generated method stub		
				String resultString = "";
				boolean resultFlag = false;
				boolean poExistsFlag=invoiceDetailsDao.isPONumberExistsForEdit(invoiceDetailsBean.getInvoiceNo(),invoiceDetailsBean.getIdID());
		    	if(poExistsFlag) {
		    		return "PO_EXISTS";
		    	}
				InvoiceDetailsBean latestData =findInvoiceDetailsById(invoiceDetailsBean.getIdID());
				if (latestData.getTransactionCount() > (invoiceDetailsBean.getTransactionCount())) {
					invoiceDetailsBean = latestData;
					// sessionManager.getLogging().logDebugInfo("Transaction Failed", "INFO");
					return "TransactionFailed";
				}
				if (latestData.getRecordType() == 'D') {
					invoiceDetailsBean = latestData;
					// sessionManager.getLogging().logDebugInfo("Transaction Failed due to record is
					// already deleted", "INFO");
					return "recordDeleted";
				}
				setAuditInfo(invoiceDetailsBean,"editFlag");
				InvoiceDetailsEntity invoiceDetailsEntity = mapper.map(invoiceDetailsBean,InvoiceDetailsEntity.class);
				resultFlag = invoiceDetailsDao.updateInvoiceDetails(invoiceDetailsEntity);
				System.out.println("resultFlag==" + resultFlag);
				if (resultFlag) {
					resultString= "UPDATED";
				}
				return resultString;
			
		}
	
}
