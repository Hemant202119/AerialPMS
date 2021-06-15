package com.edios.project.manager.impl;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.project.bean.BoqBean;
import com.edios.project.bean.BoqItemBean;
import com.edios.project.bean.CircleBean;
import com.edios.project.bean.DrawingTypeItemsBean;
import com.edios.project.dao.BoqDao;
import com.edios.project.entity.BudgetOrderedQuantityEntity;
import com.edios.project.entity.BudgetOrderedQuantityItemsEntity;
import com.edios.project.entity.CircleEntity;
import com.edios.project.entity.to.BoqTO;
import com.edios.project.entity.to.DrawingItemsTO;
import com.edios.project.manager.BudgetOrderedQuantityManager;

@Service
public class BudgetOrderQuantityManagerImpl extends AbstractManagerImpl<CircleBean, CircleEntity> implements BudgetOrderedQuantityManager   {
	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

	private static final Character RECORDTYPE_DELETE = 'D';

	private static final Character RECORDTYPE_UPDATE = 'U';
@Autowired
BoqDao boqDao;
	@Override
	@Transactional
	public List<BoqTO> fetchBoqRecords(Long projectID) {
		List<BoqTO> boqTOList = null;
		try {
			boqTOList = boqDao.fetchBoqRecords( projectID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return boqTOList;
	}
	@Override
	@Transactional
	public List<DrawingItemsTO> fetchBoqDrawingItems(Long projectID,Long DrawingID) {
		List<DrawingItemsTO> boqTOList = null;
		try {
			boqTOList = boqDao.fetchBoqDrawingItems( projectID,DrawingID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return boqTOList;
	}
	
	@Override
	@Transactional
	public String addPorjectBoq(BoqBean boqBean) {		
		String resultString = "";
		boolean resultFlag = false;			
		setAuditInfo(boqBean,"newFlag");
		//setAuditInfo(purchaseOrdersBean);
		List<DrawingTypeItemsBean> listOfDrawingItems=boqBean.getPurchaseOrderItemList();
		System.out.println(listOfDrawingItems);
		BudgetOrderedQuantityEntity boqEntity = mapper.map(boqBean,BudgetOrderedQuantityEntity.class);
		Long pkOfBoq = boqDao.addBoq(boqEntity);	
		System.out.println("&&&&&&&&&&& "+pkOfBoq);
		
		for(DrawingTypeItemsBean obOfDrawingTypeItemsBean: listOfDrawingItems){		
			BoqItemBean obOBoqItem=new BoqItemBean();
			obOBoqItem.getItemID().setItemID(obOfDrawingTypeItemsBean.getItemID());
			obOBoqItem.getBoqID().setBoqID(pkOfBoq);		
			obOBoqItem.setItemQty(obOfDrawingTypeItemsBean.getNewProcurementQty());	
			obOBoqItem.setItemName(obOfDrawingTypeItemsBean.getItemName());				
			obOBoqItem.setItemUnitRate(obOfDrawingTypeItemsBean.getItemUnitRate());	
			obOBoqItem.setItemHead(obOfDrawingTypeItemsBean.getItemHead());
			obOBoqItem.setItemWeight(obOfDrawingTypeItemsBean.getItemWeight());
			obOBoqItem.setItemStatusID(obOfDrawingTypeItemsBean.getItemStatusID());
			obOBoqItem.setItemUnit(obOfDrawingTypeItemsBean.getItemUnit());
			obOBoqItem.setItemtotalRate(obOfDrawingTypeItemsBean.getBudgetAmount());			
//			obOBoqItem.setItemUnitTax(obOfDrawingTypeItemsBean.getCurrentUnitGST());		
//			obOBoqItem.setTotalAmount(obOfDrawingTypeItemsBean.getAmount());
			System.out.println("********* "+boqBean.getCreatedBy() );
			obOBoqItem.setCreatedBy(boqBean.getCreatedBy());
//			obOBoqItem.setLastModifiedBy(boqBean.getLastModifiedBy());
			setAuditInfoBoqItems(obOBoqItem,"newFlag");
			BudgetOrderedQuantityItemsEntity boqItemEntity = mapper.map(obOBoqItem,BudgetOrderedQuantityItemsEntity.class);
			resultFlag=boqDao.addBoqItems(boqItemEntity);
		}
		if (resultFlag) {			
			resultString= "ADDED";			
			
		}
		return resultString;
		
	}
	
	private void setAuditInfo(BoqBean boq, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			boq.setTransactionCount(TRANSACTION_BEGIN);
			boq.setRecordType(RECORDTYPE_INSERT);
			System.out.println("created By " + boq.getCreatedBy());
//			purchaseOrdersBean.setCreatedBy(1);
			boq.setCreatedDate(new Date());
		}else {
			System.out.println("created By " + boq.getLastModifiedBy());
			boq.setTransactionCount(boq.getTransactionCount()+TRANSACTION_BEGIN);
			boq.setRecordType(RECORDTYPE_UPDATE);
//			purchaseOrdersBean.setLastModifiedBy(1);
			boq.setLastModifiedDate(new Date());
		}
	}
	private void setAuditInfoBoqItems(BoqItemBean boqItemBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			boqItemBean.setTransactionCount(TRANSACTION_BEGIN);
			boqItemBean.setRecordType(RECORDTYPE_INSERT);						
			boqItemBean.setCreatedDate(new Date());
//			boqItemBean.setCreatedBy(boqItemBean.getCreatedBy());
		}else {
			boqItemBean.setTransactionCount(boqItemBean.getTransactionCount()+TRANSACTION_BEGIN);
			boqItemBean.setRecordType(RECORDTYPE_UPDATE);
//			boqItemBean.setLastModifiedBy(boqItemBean.getLastModifiedBy());
			boqItemBean.setLastModifiedDate(new Date());
		}
	}
	@Override
	@Transactional
	public BoqBean findBoqById(Long boqID) {
		BoqBean boqBean = null;
		boqBean = mapper.map(boqDao.findBoqById(boqID), BoqBean.class);
		return boqBean;
	
	}
	@Override
	@Transactional
	public List<DrawingItemsTO> fetchBoqDrawingItemsByID( Long boqID) {
		List<DrawingItemsTO> boqTOList = null;
		try {
			boqTOList = boqDao.fetchBoqDrawingItemsByID(boqID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return boqTOList;
	}
}
