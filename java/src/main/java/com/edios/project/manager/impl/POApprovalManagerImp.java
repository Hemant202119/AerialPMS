package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.project.bean.DrawingTypeItemsBean;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.POApprovalDao;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.POApprovalTo;
import com.edios.project.manager.POApprovalManager;
@Service
public class POApprovalManagerImp 
	extends AbstractManagerImpl<PurchaseOrdersBean, PurchaseOrdersEntity>
	implements POApprovalManager {

private static final Long TRANSACTION_BEGIN = 1l;

private static final Character RECORDTYPE_INSERT = 'I';

private static final Character RECORDTYPE_DELETE = 'D';

private static final Character RECORDTYPE_UPDATE = 'U';

@Autowired
POApprovalDao poApprovalDao;

@Override
@Transactional
public List<POApprovalTo>  fetchPOApprovalDetails(String poStatus, String customerName) {
	List<POApprovalTo> poApprovalTo= null;
	try {
		poApprovalTo = poApprovalDao.fetchPOApprovalDetails(poStatus, customerName);
	} catch (Exception exception) {
		exception.printStackTrace();
	}
	return poApprovalTo;
}

@Override
@Transactional
public List<POApprovalTo>  fetchItemDetails(Long id) {
	List<POApprovalTo> poApprovalTo= null;
	try {
		poApprovalTo = poApprovalDao.fetchItemDetails(id);
	} catch (Exception exception) {
		exception.printStackTrace();
	}
	return poApprovalTo;
}
@Override
@Transactional
public  POApprovalTo findPOTypeById(Long id) {
	 POApprovalTo poApprovalTo=  poApprovalDao.findPOTypeById(id);
	return poApprovalTo;

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
public String updatePoApproval(PurchaseOrdersBean purchaseOrdersBean) {
	String resultString = "";
	boolean resultFlag = false;
	List<DrawingTypeItemsBean> listOfDrawingItems=purchaseOrdersBean.getPurchaseOrderItemList();


//	PurchaseOrdersBean latestData = poApprovalDao.fetchApprovalStatusById(purchaseOrdersBean.getPoID());
//	if (latestData.getTransactionCount() > (purchaseOrdersBean.getTransactionCount())) {
//		purchaseOrdersBean = latestData;
//		return "TransactionFailed";
//	}
//	if (latestData.getRecordType() == 'D') {
//		purchaseOrdersBean = latestData;
//		return "recordDeleted";
//	}
//
//setAuditInfo(purchaseOrdersBean, "editFlag");
//PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean, PurchaseOrdersEntity.class);
	
	
resultFlag= poApprovalDao.updatePoApproval(purchaseOrdersBean.getPoID(),purchaseOrdersBean.getPoStatus(),purchaseOrdersBean.getNotes());
for(DrawingTypeItemsBean obOfDrawingTypeItemsBean: listOfDrawingItems){			
	resultFlag = poApprovalDao.updatePoItemApproval(obOfDrawingTypeItemsBean.getPoItemID(),obOfDrawingTypeItemsBean.getApprovedQty());
}
System.out.println("resultFlag==" + resultFlag);
if (resultFlag) {
	resultString = "UPDATED";
}
return resultString;
}
}
