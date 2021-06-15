package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.PurchaseOrderDao;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.PurchaseOrderTO;
import com.edios.project.manager.PurchaseOrderManager;

@Service
public class PurchaseOrderManagerImpl extends AbstractManagerImpl<PurchaseOrdersBean, PurchaseOrdersEntity>
		implements PurchaseOrderManager {

	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

//	private static final Character RECORDTYPE_DELETE = 'D';

	private static final Character RECORDTYPE_UPDATE = 'U';

	@Autowired
	PurchaseOrderDao purchaseOrderDao;

	@Override
	@Transactional
	public List<PurchaseOrderTO> fetchPurchaseOrdersDetails(Long projectID, String customerName) {
		List<PurchaseOrderTO> purchaseOrderTO = null;
		try {
			purchaseOrderTO = purchaseOrderDao.fetchPurchaseOrdersDetails(projectID, customerName);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return purchaseOrderTO;
	}

	@Override
	@Transactional
	public String addCustomerPOs(PurchaseOrdersBean purchaseOrdersBean) {
		String resultString = "";
		//boolean resultFlag = false;
		//Check PO number is exists or not...
    	boolean poExistsFlag=purchaseOrderDao.isPONumberExists(purchaseOrdersBean.getPoNo());
    	if(poExistsFlag) {
    		return "PO_EXISTS";
    	}     	
	setAuditInfo(purchaseOrdersBean, "newFlag");
		PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean, PurchaseOrdersEntity.class);
		Long pkOfPO = purchaseOrderDao.addCustomerPOs(purchaseOrdersEntity);
		if(pkOfPO!=null)
			resultString= "ADDED";			
		
//		String circleName=purchaseOrderDao.getCircleName(purchaseOrdersBean.getProjectID().getProjectID());
//		String poNumber="";
//		if(!circleName.isEmpty())
//			poNumber=circleName.concat("-").concat(pkOfPO.toString());
//		resultFlag= purchaseOrderDao.updatePoNumberOfPO(poNumber,pkOfPO);	
		return resultString;
	}

	private void setAuditInfo(PurchaseOrdersBean purchaseOrdersBean, String string) {
		if (string.equalsIgnoreCase("newFlag")) {
			purchaseOrdersBean.setTransactionCount(TRANSACTION_BEGIN);
			purchaseOrdersBean.setRecordType(RECORDTYPE_INSERT);
			purchaseOrdersBean.setCreatedBy(1);
			purchaseOrdersBean.setCreatedDate(new Date());
		} else {
			purchaseOrdersBean.setTransactionCount(purchaseOrdersBean.getTransactionCount() + TRANSACTION_BEGIN);
			purchaseOrdersBean.setRecordType(RECORDTYPE_UPDATE);
			purchaseOrdersBean.setLastModifiedBy(1);
			purchaseOrdersBean.setLastModifiedDate(new Date());
		}
	}

	@Override
	@Transactional
	public PurchaseOrdersBean findCustomerPOById(Long id) {
		PurchaseOrdersBean purchaseOrdersBean = null;
		purchaseOrdersBean = mapper.map(purchaseOrderDao.findCustomerPOById(id), PurchaseOrdersBean.class);
		return purchaseOrdersBean;
	}

	@Override
	@Transactional
	public String updateCustomerPO(PurchaseOrdersBean purchaseOrdersBean) {
		String resultString = "";
		boolean resultFlag = false;
		boolean poExistsFlag=purchaseOrderDao.isPONumberExistsForEdit(purchaseOrdersBean.getPoNo(),purchaseOrdersBean.getPoID());
    	if(poExistsFlag) {
    		return "PO_EXISTS";
    	}
		PurchaseOrdersBean latestData = purchaseOrderDao.fetchCustomerPOById(purchaseOrdersBean.getPoID());
		if (latestData.getTransactionCount() > (purchaseOrdersBean.getTransactionCount())) {
			purchaseOrdersBean = latestData;
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			purchaseOrdersBean = latestData;
			return "recordDeleted";
		}

		Double basicAmount = purchaseOrderDao.checkPOAmount(purchaseOrdersBean.getPoID());
		System.out.println(purchaseOrdersBean.getTotalAmount() +"********basicAmountbasicAmount==" + basicAmount);
		if (basicAmount != null) {
			if (purchaseOrdersBean.getTotalAmount() < basicAmount) {
				return "LESS_AMOUNT";
			}else if(purchaseOrdersBean.getTotalAmount()>basicAmount){
				purchaseOrdersBean.setInvoiceStatus("Partial");
			}else {
				purchaseOrdersBean.setInvoiceStatus("Completed");
			}
			
		}

		setAuditInfo(purchaseOrdersBean, "editFlag");
		PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean, PurchaseOrdersEntity.class);
		resultFlag = purchaseOrderDao.updateCustomerPO(purchaseOrdersEntity);
		System.out.println("resultFlag==" + resultFlag);
		if (resultFlag) {
			resultString = "UPDATED";
		}
		return resultString;
	}

	@Override
	@Transactional
	public String addContractorPOs(PurchaseOrdersBean purchaseOrdersBean) {
		String resultString = "";
		boolean resultFlag = false;
		setAuditInfo(purchaseOrdersBean, "newFlag");
		PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean, PurchaseOrdersEntity.class);
		resultFlag = purchaseOrderDao.addContractorPOs(purchaseOrdersEntity);
		if (resultFlag) {
			resultString = "ADDED";

		}
		return resultString;
	}

	@Override
	@Transactional
	public String updatePOStatus(PurchaseOrdersBean purchaseOrdersBean) {
//		TransactionData latestData = purchaseOrderDao.fetchTransactionDataById2(purchaseOrdersBean.getPoID());
//		if (latestData.getTransactionCount() >= (purchaseOrdersBean.getTransactionCount())) {
//			return "TransactionFailed";
//		}
//		if (latestData.getRecordType() == 'D') {
//			return "recordDeleted";
//		}

		String resultString = "";
		boolean resultFlag = false;	
				resultFlag =purchaseOrderDao.updatePOStatus(purchaseOrdersBean) ;
				if (resultFlag) {
					return "UPDATED";
				}
				return resultString;
	}
	
}
