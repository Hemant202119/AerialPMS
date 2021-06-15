package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.ContractorPODao;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.ContractorPOEntityTo;
import com.edios.project.manager.ContractorPOManager;


@Service
public class ContractorPOManagerImpl  extends AbstractManagerImpl<PurchaseOrdersBean, PurchaseOrdersEntity> implements ContractorPOManager {
	
	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';


	private static final Character RECORDTYPE_UPDATE = 'U';
	@Autowired 
	ContractorPODao contractorDao;
	
	@Override
	@Transactional	
	public List<ContractorPOEntityTo> fetchContractors() {
		List<ContractorPOEntityTo> supplierTO = null;
		try {
			supplierTO = contractorDao.fetchContractorDetails();
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return supplierTO;

	}

	@Override
	@Transactional	
	public String addContractorPOs(PurchaseOrdersBean purchaseOrdersBean) {
		String resultString = "";
		boolean resultFlag = false;	
		//Check PO number is exists or not...
    	/*boolean poExistsFlag=contractorDao.isPONumberExists(purchaseOrdersBean.getPoNo());
    	if(poExistsFlag) {
    		return "PO_EXISTS";
    	}*/
		setAuditInfo(purchaseOrdersBean,"newFlag");
		setAuditInfo(purchaseOrdersBean);
		PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean,PurchaseOrdersEntity.class);
		Long poPK= contractorDao.addContractorPOs(purchaseOrdersEntity);		
		//resultFlag = contractorDao.addContractorPOs(purchaseOrdersEntity);
		String circleName=contractorDao.getCircleName(purchaseOrdersBean.getProjectID().getProjectID());
		String poNumber="";
		if(!circleName.isEmpty())
			poNumber=circleName.concat("-").concat(poPK.toString());
		resultFlag= contractorDao.updatePoNumberOfPO(poNumber,poPK);
		if (resultFlag) {			
			resultString= "ADDED "+poNumber;			
		}
		return resultString;
	}
	private void setAuditInfo(PurchaseOrdersBean purchaseOrdersBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			purchaseOrdersBean.setTransactionCount(TRANSACTION_BEGIN);
			purchaseOrdersBean.setRecordType(RECORDTYPE_INSERT);
			purchaseOrdersBean.setCreatedBy(1);
			purchaseOrdersBean.setCreatedDate(new Date());
		}else {
			purchaseOrdersBean.setTransactionCount(purchaseOrdersBean.getTransactionCount()+TRANSACTION_BEGIN);
			purchaseOrdersBean.setRecordType(RECORDTYPE_UPDATE);
			purchaseOrdersBean.setLastModifiedBy(1);
			purchaseOrdersBean.setLastModifiedDate(new Date());
		}
	}
	private void setAuditInfo(PurchaseOrdersBean purchaseOrdersBean ) {
		purchaseOrdersBean.setPoStatus("Pending");
		purchaseOrdersBean.setFrStatus("None");
		purchaseOrdersBean.setPaymentStatus("None");
		purchaseOrdersBean.setInvoiceStatus("None");
	}
	
	@Override
	@Transactional
	public PurchaseOrdersBean findContractorPOById(Long id) {
		PurchaseOrdersBean purchaseOrdersBean =null;
		purchaseOrdersBean = mapper.map(contractorDao.findContractorPOById(id),
				PurchaseOrdersBean.class);
		return purchaseOrdersBean;
	}
	
	//Update ContractorPPO
	@Override
	@Transactional
	public String updateContractorPO(PurchaseOrdersBean purchaseOrdersBean) {
		String resultString = "";
		boolean resultFlag = false;
		/*boolean poExistsFlag=contractorDao.isPONumberExistsForEdit(purchaseOrdersBean.getPoNo(),purchaseOrdersBean.getPoID());
    	if(poExistsFlag) {
    		return "PO_EXISTS";
    	}*/
		PurchaseOrdersBean latestData = contractorDao.fetchContractorPOById(purchaseOrdersBean.getPoID());
		if (latestData.getTransactionCount() > (purchaseOrdersBean.getTransactionCount())) {
			purchaseOrdersBean = latestData;
			// sessionManager.getLogging().logDebugInfo("Transaction Failed", "INFO");
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			purchaseOrdersBean = latestData;
			// sessionManager.getLogging().logDebugInfo("Transaction Failed due to record is
			// already deleted", "INFO");
			return "recordDeleted";
		}
		setAuditInfo(purchaseOrdersBean,"editFlag");
		PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean,PurchaseOrdersEntity.class);
		resultFlag = contractorDao.updateContractorPO(purchaseOrdersEntity);
		System.out.println("resultFlag==" + resultFlag);
		if (resultFlag) {
			resultString= "UPDATED";
		}
		return resultString;
	}
	
	
}
