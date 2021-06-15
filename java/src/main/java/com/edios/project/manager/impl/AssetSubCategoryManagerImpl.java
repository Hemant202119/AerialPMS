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
import com.edios.project.bean.AssetSubCategoryBean;
import com.edios.project.dao.AssetSubCategoryDao;
import com.edios.project.entity.AssetSubCategoryEnitity;
import com.edios.project.entity.to.AssetSubCategoryTO;
import com.edios.project.manager.AssetSubCategoryManager;


@Service
public class AssetSubCategoryManagerImpl extends AbstractManagerImpl<AssetSubCategoryBean, AssetSubCategoryEnitity> implements AssetSubCategoryManager {

	@Autowired
	AssetSubCategoryDao assetSubCategoryDao;

	@Override
	@Transactional
	public List<AssetSubCategoryTO> fetchSubCategories(String status,Long assetCategoryID) {
		// TODO Auto-generated method stub
		return  assetSubCategoryDao.fetchSubCategories(status,assetCategoryID);
	}

	@Override
	@Transactional
	public String addSubCategory(AssetSubCategoryBean assetSubCategoryBean) {
		String resultString = "";
		boolean resultFlag = false;

		resultFlag = assetSubCategoryDao.checkSubCategoryNameExists(
				assetSubCategoryBean.getAssetSubCategoryID(),
				assetSubCategoryBean.getSubCategoryName());
		if (resultFlag) {
			return "NameAlreadyExist";
		}

		resultFlag = assetSubCategoryDao.checkSubCategoryCodeExists(assetSubCategoryBean.getAssetSubCategoryID(),
				assetSubCategoryBean.getSubCategoryCode());
		if (resultFlag) {
			return "CodeAlreadyExist";
		}

		setAuditInfo(assetSubCategoryBean, "newFlag");
		AssetSubCategoryEnitity assetSubCategoryEnitity = mapper.map(assetSubCategoryBean,
				AssetSubCategoryEnitity.class);
		resultFlag = assetSubCategoryDao.addSubCategory(assetSubCategoryEnitity);
		if (resultFlag) {
			return "ADDED";
		}
		return resultString;
	}
	private void setAuditInfo(AssetSubCategoryBean assetSubCategoryBean, String string) {
		if (string.equalsIgnoreCase("newFlag")) {
			assetSubCategoryBean.setTransactionCount(AppConstants.TRANSACTION_BEGIN);
			assetSubCategoryBean.setRecordType(AppConstants.RECORDTYPE_INSERT);
			assetSubCategoryBean.setCreatedDate(new Date());
		} else {
			assetSubCategoryBean.setTransactionCount(
					assetSubCategoryBean.getTransactionCount() + AppConstants.TRANSACTION_BEGIN);
			assetSubCategoryBean.setRecordType(AppConstants.RECORDTYPE_UPDATE);
			assetSubCategoryBean.setLastModifiedDate(new Date());
		}
	}
	
	@Override
	@Transactional
	public AssetSubCategoryBean findSubCategoryById(Long catgoeryID) {
		AssetSubCategoryBean assetSubCategoryBean = null;
		assetSubCategoryBean = mapper.map(assetSubCategoryDao.findSubCategoryById(catgoeryID),
				AssetSubCategoryBean.class);
		return assetSubCategoryBean;
	}
	
	@Override
	@Transactional
	public String updateSubCategory(AssetSubCategoryBean assetSubCategoryBean) {
		String resultString = "";
		boolean resultFlag = false;

		resultFlag = assetSubCategoryDao.checkSubCategoryNameExists(
				assetSubCategoryBean.getAssetSubCategoryID(),
				assetSubCategoryBean.getSubCategoryName());
		if (resultFlag) {
			return "NameAlreadyExist";
		}

		resultFlag = assetSubCategoryDao.checkSubCategoryCodeExists(assetSubCategoryBean.getAssetSubCategoryID(),
				assetSubCategoryBean.getSubCategoryCode());
		if (resultFlag) {
			return "CodeAlreadyExist";
		}

		TransactionData latestData = assetSubCategoryDao.fetchTransactionDataById(assetSubCategoryBean.getAssetSubCategoryID());
		if (latestData.getTransactionCount() > (assetSubCategoryBean.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}

		setAuditInfo(assetSubCategoryBean, "editFlag");
		AssetSubCategoryEnitity assetSubCategoryEnitity = mapper.map(assetSubCategoryBean,
				AssetSubCategoryEnitity.class);
		resultFlag = assetSubCategoryDao.updateSubCategory(assetSubCategoryEnitity);
		if (resultFlag) {
			return "UPDATED";
		}
		return resultString;
	}
	
	@Override
	@Transactional
	public String deleteSubCategory(DeleteRecords deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;

		TransactionData latestData = assetSubCategoryDao.fetchTransactionDataById(deleteRecords.getId());
		if (latestData.getTransactionCount() > (deleteRecords.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		resultFlag = assetSubCategoryDao.deleteSubCategory(deleteRecords.getId(),deleteRecords.getModifiedBy().longValue());
		if(resultFlag)
			return "DELETED";
		
		return resultString;
	}

}
