package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.AppConstants;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.AssetSubCategoryItemBean;
import com.edios.project.dao.AssetSubCategoryItemDao;
import com.edios.project.entity.AssetSubCategoryItemEnitity;
import com.edios.project.entity.to.AssetSubCategoryItemTO;
import com.edios.project.manager.AssetSubCategoryItemsManager;



@Service
public class AssetSubCategoryItemManagerImpl extends AbstractManagerImpl<AssetSubCategoryItemBean, AssetSubCategoryItemEnitity> implements AssetSubCategoryItemsManager {

	@Autowired
	AssetSubCategoryItemDao assetSubCategoryItemDao;

	@Override
	@Transactional
	public List<AssetSubCategoryItemTO> fetchSubCategoryItems(String status,Long assetCategoryID) {
		// TODO Auto-generated method stub
		return  assetSubCategoryItemDao.fetchSubCategoryItems(status,assetCategoryID);
	}
	
	@Override
	@Transactional
	public List<AssetSubCategoryItemTO> fetchAllSubCategoryItems(String status,Long catID) {
		// TODO Auto-generated method stub
		return  assetSubCategoryItemDao.fetchAllSubCategoryItems(status,catID);
	}

	@Override
	@Transactional
	public String addSubCategoryItem(AssetSubCategoryItemBean assetSubCategoryItemBean) {
		String resultString = "";
		boolean resultFlag = false;

		resultFlag = assetSubCategoryItemDao.checkItemNameExists(
				assetSubCategoryItemBean.getAssetItemID(),
				assetSubCategoryItemBean.getItemName());
		if (resultFlag) {
			return "NameAlreadyExist";
		}

		resultFlag = assetSubCategoryItemDao.checkItemCodeExists(assetSubCategoryItemBean.getAssetItemID(),
				assetSubCategoryItemBean.getItemCode());
		if (resultFlag) {
			return "CodeAlreadyExist";
		}

		setAuditInfo(assetSubCategoryItemBean, "newFlag");
		AssetSubCategoryItemEnitity assetSubCategoryItemEnitity = mapper.map(assetSubCategoryItemBean,
				AssetSubCategoryItemEnitity.class);
		resultFlag = assetSubCategoryItemDao.addSubCategoryItem(assetSubCategoryItemEnitity);
		if (resultFlag) {
			return "ADDED";
		}
		return resultString;
	}
	private void setAuditInfo(AssetSubCategoryItemBean assetSubCategoryItemBean, String string) {
		if (string.equalsIgnoreCase("newFlag")) {
			assetSubCategoryItemBean.setTransactionCount(AppConstants.TRANSACTION_BEGIN);
			assetSubCategoryItemBean.setRecordType(AppConstants.RECORDTYPE_INSERT);
			assetSubCategoryItemBean.setCreatedDate(new Date());
		} else {
			assetSubCategoryItemBean.setTransactionCount(
					assetSubCategoryItemBean.getTransactionCount() + AppConstants.TRANSACTION_BEGIN);
			assetSubCategoryItemBean.setRecordType(AppConstants.RECORDTYPE_UPDATE);
			assetSubCategoryItemBean.setLastModifiedDate(new Date());
		}
	}
	
	@Override
	@Transactional
	public AssetSubCategoryItemBean findSubCategoryItemById(Long catgoeryID) {
		AssetSubCategoryItemBean assetSubCategoryItemBean = null;
		assetSubCategoryItemBean = mapper.map(assetSubCategoryItemDao.findSubCategoryItemById(catgoeryID),
				AssetSubCategoryItemBean.class);
		return assetSubCategoryItemBean;
	}
	
	@Override
	@Transactional
	public String updateSubCategoryItem(AssetSubCategoryItemBean assetSubCategoryItemBean) {
		String resultString = "";
		boolean resultFlag = false;

		resultFlag = assetSubCategoryItemDao.checkItemNameExists(
				assetSubCategoryItemBean.getAssetItemID(),
				assetSubCategoryItemBean.getItemName());
		if (resultFlag) {
			return "NameAlreadyExist";
		}

		resultFlag = assetSubCategoryItemDao.checkItemCodeExists(assetSubCategoryItemBean.getAssetItemID(),
				assetSubCategoryItemBean.getItemCode());
		if (resultFlag) {
			return "CodeAlreadyExist";
		}

		TransactionData latestData = assetSubCategoryItemDao.fetchTransactionDataById(assetSubCategoryItemBean.getAssetItemID());
		if (latestData.getTransactionCount() > (assetSubCategoryItemBean.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}

		setAuditInfo(assetSubCategoryItemBean, "editFlag");
		AssetSubCategoryItemEnitity assetSubCategoryItemEnitity = mapper.map(assetSubCategoryItemBean,
				AssetSubCategoryItemEnitity.class);
		resultFlag = assetSubCategoryItemDao.updateSubCategoryItem(assetSubCategoryItemEnitity);
		if (resultFlag) {
			return "UPDATED";
		}
		return resultString;
	}
	
	@Override
	@Transactional
	public String deleteSubCategoryItem(DeleteRecords deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;

		TransactionData latestData = assetSubCategoryItemDao.fetchTransactionDataById(deleteRecords.getId());
		if (latestData.getTransactionCount() > (deleteRecords.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		resultFlag = assetSubCategoryItemDao.deleteSubCategoryItem(deleteRecords.getId(),deleteRecords.getModifiedBy().longValue());
		if(resultFlag)
			return "DELETED";
		
		return resultString;
	}

}
