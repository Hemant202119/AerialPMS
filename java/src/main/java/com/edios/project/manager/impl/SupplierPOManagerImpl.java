package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.project.bean.DrawingTypeItemsBean;
import com.edios.project.bean.PurchaseOrderItemBean;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.SupplierPODao;
import com.edios.project.entity.PurchaseOrderItemEntity;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.DrawingItemsTO;
import com.edios.project.entity.to.SupplierPOEntityTO;
import com.edios.project.manager.SupplierPOManager;

@Service
public class SupplierPOManagerImpl  extends AbstractManagerImpl<PurchaseOrdersBean, PurchaseOrdersEntity> implements SupplierPOManager {
	
	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

	private static final Character RECORDTYPE_UPDATE = 'U';
	@Autowired 
	SupplierPODao supplierDao;
	
	@Override
	@Transactional	
	public List<SupplierPOEntityTO> fetchSuppliers(String customerName) {
		List<SupplierPOEntityTO> supplierTO = null;
		try {
			supplierTO = supplierDao.fetchSupplierDetails(customerName);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return supplierTO;

	}

	@Override
	@Transactional	
	public String addSupplierPOs(PurchaseOrdersBean purchaseOrdersBean) {
		String resultString = "";
		boolean resultFlag = false;			
		setAuditInfo(purchaseOrdersBean,"newFlag");
		//setAuditInfo(purchaseOrdersBean);
		List<DrawingTypeItemsBean> listOfDrawingItems=purchaseOrdersBean.getPurchaseOrderItemList();
		
		//Check PO number is exists or not...
	    	/*boolean poExistsFlag=supplierDao.isPONumberExists(purchaseOrdersBean.getPoNo());
	    	if(poExistsFlag) {
	    		return "PO_EXISTS";
	    	}*/
		
		PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean,PurchaseOrdersEntity.class);
		Long pkOfPO = supplierDao.addSuppplierPOs(purchaseOrdersEntity);		
		for(DrawingTypeItemsBean obOfDrawingTypeItemsBean: listOfDrawingItems){
			PurchaseOrderItemBean obOfPurchaseOrderItem=new PurchaseOrderItemBean();
			obOfPurchaseOrderItem.getItemID().setItemID(obOfDrawingTypeItemsBean.getItemID());
			obOfPurchaseOrderItem.getPoID().setPoID(pkOfPO);		
			obOfPurchaseOrderItem.setItemQty(obOfDrawingTypeItemsBean.getNewProcurementQty());		
			obOfPurchaseOrderItem.setItemUnitRate(obOfDrawingTypeItemsBean.getCurrentUnitRate());			
			obOfPurchaseOrderItem.setItemUnitTax(obOfDrawingTypeItemsBean.getCurrentUnitGST());		
			obOfPurchaseOrderItem.setTotalAmount(obOfDrawingTypeItemsBean.getAmount());
			//System.out.println("********* "+purchaseOrdersBean.getLastModifiedBy() );
			obOfPurchaseOrderItem.setCreatedBy(purchaseOrdersBean.getCreatedBy());
			obOfPurchaseOrderItem.setLastModifiedBy(purchaseOrdersBean.getCreatedBy());
			setAuditInfoPOItems(obOfPurchaseOrderItem,"newFlag");
			PurchaseOrderItemEntity purchaseOrderItemsEntity = mapper.map(obOfPurchaseOrderItem,PurchaseOrderItemEntity.class);
			resultFlag=supplierDao.addSupplierPoItems(purchaseOrderItemsEntity);
		}
		String circleName=supplierDao.getCircleName(purchaseOrdersBean.getProjectID().getProjectID());
		String poNumber="";
		if(!circleName.isEmpty())
			poNumber=circleName.concat("-").concat(pkOfPO.toString());
		resultFlag= supplierDao.updatePoNumberOfPO(poNumber,pkOfPO);
		if (resultFlag) {			
			resultString= "ADDED "+poNumber;			
		}
		return resultString;
	}
	private void setAuditInfoPOItems(PurchaseOrderItemBean purchaseOrderItemsBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			purchaseOrderItemsBean.setTransactionCount(TRANSACTION_BEGIN);
			purchaseOrderItemsBean.setRecordType(RECORDTYPE_INSERT);						
			purchaseOrderItemsBean.setCreatedDate(new Date());
		}else {
			purchaseOrderItemsBean.setTransactionCount(purchaseOrderItemsBean.getTransactionCount()+TRANSACTION_BEGIN);
			purchaseOrderItemsBean.setRecordType(RECORDTYPE_UPDATE);
			//purchaseOrderItemsBean.setLastModifiedBy(1);
			purchaseOrderItemsBean.setLastModifiedDate(new Date());
		}
	}
	private void setAuditInfo(PurchaseOrdersBean purchaseOrdersBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			purchaseOrdersBean.setTransactionCount(TRANSACTION_BEGIN);
			purchaseOrdersBean.setRecordType(RECORDTYPE_INSERT);
			//System.out.println("created By " + purchaseOrdersBean.getCreatedBy());
//			purchaseOrdersBean.setCreatedBy(1);
			purchaseOrdersBean.setCreatedDate(new Date());
		}else {
			//System.out.println("created By " + purchaseOrdersBean.getLastModifiedBy());
			purchaseOrdersBean.setTransactionCount(purchaseOrdersBean.getTransactionCount()+TRANSACTION_BEGIN);
			purchaseOrdersBean.setRecordType(RECORDTYPE_UPDATE);
//			purchaseOrdersBean.setLastModifiedBy(1);
			purchaseOrdersBean.setLastModifiedDate(new Date());
		}
	}
	/*private void setAuditInfo(PurchaseOrdersBean purchaseOrdersBean ) {
		purchaseOrdersBean.setPoStatus("Pending");
		purchaseOrdersBean.setFrStatus("None");
		purchaseOrdersBean.setPaymentStatus("None");
		purchaseOrdersBean.setInvoiceStatus("None");
	}*/
	@Override
	@Transactional
	public String updateSupplierPO(PurchaseOrdersBean purchaseOrdersBean) {
		String resultString = "";
		boolean resultFlag = false;
		/*boolean poExistsFlag=supplierDao.isPONumberExistsForEdit(purchaseOrdersBean.getPoNo(),purchaseOrdersBean.getPoID());
    	if(poExistsFlag) {
    		return "PO_EXISTS";
    	}*/
		PurchaseOrdersBean latestData = supplierDao.fetchSupplierPOById(purchaseOrdersBean.getPoID());
		if (latestData.getTransactionCount() > (purchaseOrdersBean.getTransactionCount())) {
			purchaseOrdersBean = latestData;			
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			purchaseOrdersBean = latestData;			
			return "recordDeleted";
		}
		setAuditInfo(purchaseOrdersBean,"editFlag");
		List<DrawingTypeItemsBean> listOfDrawingItems=purchaseOrdersBean.getPurchaseOrderItemList();
		PurchaseOrdersEntity purchaseOrdersEntity = mapper.map(purchaseOrdersBean,PurchaseOrdersEntity.class);
		resultFlag = supplierDao.updateSupplierPO(purchaseOrdersEntity);
		
		boolean deletePOItems=supplierDao.deletePOItems(purchaseOrdersBean.getPoID());
		if(deletePOItems) {
			for(DrawingTypeItemsBean obOfDrawingTypeItemsBean: listOfDrawingItems){
				PurchaseOrderItemBean obOfPurchaseOrderItem=new PurchaseOrderItemBean();
				obOfPurchaseOrderItem.getItemID().setItemID(obOfDrawingTypeItemsBean.getItemID());
				obOfPurchaseOrderItem.getPoID().setPoID(purchaseOrdersBean.getPoID());			
				obOfPurchaseOrderItem.setItemQty(obOfDrawingTypeItemsBean.getNewProcurementQty());		
				obOfPurchaseOrderItem.setItemUnitRate(obOfDrawingTypeItemsBean.getCurrentUnitRate());			
				obOfPurchaseOrderItem.setItemUnitTax(obOfDrawingTypeItemsBean.getCurrentUnitGST());		
				obOfPurchaseOrderItem.setTotalAmount(obOfDrawingTypeItemsBean.getAmount());
			//System.out.println("********* "+purchaseOrdersBean.getLastModifiedBy() );		
				obOfPurchaseOrderItem.setCreatedBy(purchaseOrdersBean.getLastModifiedBy());
				obOfPurchaseOrderItem.setLastModifiedBy(purchaseOrdersBean.getLastModifiedBy());
				
					
				setAuditInfoPOItems(obOfPurchaseOrderItem,"newFlag");
				PurchaseOrderItemEntity purchaseOrderItemsEntity = mapper.map(obOfPurchaseOrderItem,PurchaseOrderItemEntity.class);
				resultFlag=supplierDao.addSupplierPoItems(purchaseOrderItemsEntity);
			}
		}
		//System.out.println("resultFlag==" + resultFlag);
		if (resultFlag) {
			resultString= "UPDATED";
		}
		return resultString;
	}
	@Override
	@Transactional	
	public List<DrawingItemsTO> fetchSupplierDrawingItems( Long drawingID,Long projectID) {
		List<DrawingItemsTO> drawingItemTo = null;
		try {			
			drawingItemTo = supplierDao.fetchSupplierDrawingItems(drawingID,projectID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return drawingItemTo;
	}

	@Override
	@Transactional	
	public List<DrawingItemsTO> fetchsupplierPOItems(List<String> drawingID, Long poID,Long projectID) {	
		List<DrawingItemsTO> drawingItemTO = null;
		try {
			drawingItemTO = supplierDao.fetchsupplierPOItems(drawingID,poID,projectID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return drawingItemTO;
	}

	@Override
	@Transactional	
	public List<String> fetchDrawingItemsID(Long drawingID) {
	
		List<String> listOfDrawingItemID = null;
		try {
			listOfDrawingItemID = supplierDao.fetchDrawingItemsID(drawingID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return listOfDrawingItemID;
	}
}
