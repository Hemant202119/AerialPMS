package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.util.PayloadBean;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.ContactsBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.ProjectBean;
import com.edios.project.dao.ReceivedItemDao;
import com.edios.project.entity.StockItemsEntity;
import com.edios.project.entity.to.ItemReceivedTO;
import com.edios.project.manager.ReceivedItemManager;


@Service
public class ReceivedItemManagerImpl extends AbstractManagerImpl<ItemsInformationBean, StockItemsEntity> implements ReceivedItemManager {
	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

	private static final Character RECORDTYPE_UPDATE = 'U';
	
	@Autowired ReceivedItemDao receivedItemDao;
	@Autowired MessageSource messageSource;
	
	
	@Override
	@Transactional
	public List<ItemReceivedTO> searchAssestItemAutoLookUp(PayloadBean payloadBean) {
	
		return (List<ItemReceivedTO>) receivedItemDao.searchAssestItemAutoLookUp(payloadBean.getSearchParameter());
	}
	@Override
	@Transactional
	public List<ItemReceivedTO> searchItemDataOnCriteria(PayloadBean payloadBean) {
		return (List<ItemReceivedTO>) receivedItemDao.searchItemDataOnCriteria(payloadBean.getId());
	}
	@Override
	@Transactional
	public String addReceivedItems(ItemsInformationBean itemsInformationBean) {
	
		setAuditInfo(itemsInformationBean, "newFlag");
		boolean resultFlag=false;
//		String[] serialNumberArray=itemsInformationBean.getItemSerialNumber().split(",");
//		for(String serialNumber:serialNumberArray) {
//			itemsInformationBean.setItemSerialNumber(serialNumber);
		StockItemsEntity itemsInformationEntity = mapper.map(itemsInformationBean, StockItemsEntity.class);
		resultFlag = receivedItemDao.addReceievedItem(itemsInformationEntity);
//		}
		if (resultFlag) {
			return "ADDED";
		}
		return null;
	}
	private void setAuditInfo(ItemsInformationBean itemsInformationBean, String stringValue) {
		if (stringValue.equalsIgnoreCase("newFlag")) {
			itemsInformationBean.setTransactionCount(TRANSACTION_BEGIN);
			itemsInformationBean.setRecordType(RECORDTYPE_INSERT);
			itemsInformationBean.setCreatedDate(new Date());
		} else {
			itemsInformationBean.setTransactionCount(itemsInformationBean.getTransactionCount() + TRANSACTION_BEGIN);
			itemsInformationBean.setRecordType(RECORDTYPE_UPDATE);
			itemsInformationBean.setLastModifiedDate(new Date());
		}
	}
	@Override
	@Transactional
	public List<ItemReceivedTO> searchReceivedItems(PayloadBean payloadBean) {
		return (List<ItemReceivedTO>) receivedItemDao.searchReceivedItems(payloadBean.getSearchParameter(),payloadBean.getId());
	}
	@Override
	@Transactional
	public ItemsInformationBean findReceivedItems(Long receivedItemId) {		
		ItemsInformationBean itemsInformationBean = mapper.map(receivedItemDao.findReceivedItemsById(receivedItemId),ItemsInformationBean.class);
		return itemsInformationBean;
	
	}
	@Override
	@Transactional
	public String updateReceivedItems(ItemsInformationBean itemsInformationBean) {
		

		String resultString = "";
		boolean resultFlag = false;	
		ItemsInformationBean latestData = receivedItemDao.fetchReceivedItems(itemsInformationBean.getStockItemId());
		
		if (latestData.getTransactionCount() > (itemsInformationBean.getTransactionCount())) {
			itemsInformationBean = latestData;			
			return "TransactionFailed";
		}
		else if (latestData.getRecordType() == 'D') {
			itemsInformationBean = latestData;			
			return "recordDeleted";
		}		
		setAuditInfo(itemsInformationBean,"editFlag");
		StockItemsEntity vendorEntity = mapper.map(itemsInformationBean,StockItemsEntity.class);
		resultFlag = receivedItemDao.updateReceivedItems(vendorEntity);
		System.out.println("resultFlag==" + resultFlag);
		if (resultFlag) {
			resultString= "UPDATED";
		}
		return resultString;
	
	}
	@Override
	@Transactional
	public String deleteReceivedItems(DeleteRecords deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;
		Float itemUsed=receivedItemDao.checkReceivedItems(deleteRecords.getId());
		if(itemUsed!=0) {		
			return "ITEM_IN_USE";
		}
			TransactionData latestData = receivedItemDao.fetchTransactionDataById(deleteRecords.getId());
		if (latestData.getTransactionCount() > (deleteRecords.getTransactionCount())) {
			return "TransactionFailed";
		}
		else if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		resultFlag = receivedItemDao.deleteReceiveItems(deleteRecords.getId(), deleteRecords.getModifiedBy());
		if (resultFlag)
			return "DELETED";

		return resultString;
	
	
	
	}
	@Override
	@Transactional
	public List<ProjectBean> fetchProjectAutoLookUpListReceivedItems() {
		return (List<ProjectBean>) receivedItemDao.fetchProjectAutoLookUpListReceivedItems();
	}
	@Override
	@Transactional
	public List<ContactsBean> fetchContactAutoLookUpListReceivedItems() {
		return (List<ContactsBean>) receivedItemDao.fetchContactAutoLookUpListReceivedItems();
	}

}
