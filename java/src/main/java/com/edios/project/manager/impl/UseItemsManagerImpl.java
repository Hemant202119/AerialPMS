package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.PayloadBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.UseItemBean;
import com.edios.project.bean.UseItemsBean;
import com.edios.project.dao.UseItemsDao;
import com.edios.project.entity.UsedItemEntity;
import com.edios.project.entity.to.UseItemsTO;
import com.edios.project.manager.UseItemsManager;

@Service
public class UseItemsManagerImpl extends AbstractManagerImpl<UseItemsBean, UsedItemEntity> implements UseItemsManager {

	
	@Autowired
	UseItemsDao useItemsDao;
	
	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

	private static final Character RECORDTYPE_UPDATE = 'U';
	
	@Override
	@Transactional
	public List<UseItemsTO> searchReceivedItems(UseItemsBean useItemsBean) {
		return (List<UseItemsTO>) useItemsDao.searchReceivedItems(useItemsBean);
	}

	@Override
	@Transactional
	public UseItemsTO editUseItems(PayloadBean payloadBean) {
		return (UseItemsTO) useItemsDao.editUseItems(payloadBean);
	}

	@Override
	@Transactional
	public String insertupdateUseItems(UseItemBean useItemBean) {
		String resultString = "";
		ItemsInformationBean latestData = useItemsDao.fetchTransactionData(useItemBean.getStockItemidpk());
		
		if (latestData.getTransactionCount() > (useItemBean.getTransactionCount())) {		
			return "TransactionFailed";
		}
		else if (latestData.getRecordType() == 'D') {			
			return "recordDeleted";
		}		
		setAuditInfo(useItemBean,"editFlag");
		
		Long stockID= useItemsDao.updateUseItems(useItemBean);
		setAuditInfo(useItemBean,"newFlag");
		
		UsedItemEntity usedItemEntity = mapper.map(useItemBean, UsedItemEntity.class);
		Boolean	resultFlag = useItemsDao.addUseItem(usedItemEntity);
		if (resultFlag==true) {
			resultString= "UPDATED";
		}	
		
		return resultString;
	}
	private void setAuditInfo(UseItemBean useItemBean, String stringValue) {
		if (stringValue.equalsIgnoreCase("newFlag")) {
			useItemBean.setTransactionCount(TRANSACTION_BEGIN);
			useItemBean.setRecordType(RECORDTYPE_INSERT);
			useItemBean.setCreatedDate(new Date());
			useItemBean.setLastModifiedDate(null);
			useItemBean.setLastModifiedBy(null);
		} else {
			useItemBean.setTransactionCount(useItemBean.getTransactionCount() + TRANSACTION_BEGIN);
			useItemBean.setRecordType(RECORDTYPE_UPDATE);
			useItemBean.setLastModifiedDate(new Date());
		}
	}
	

}
