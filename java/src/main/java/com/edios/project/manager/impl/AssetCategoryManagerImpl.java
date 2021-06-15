package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.bean.common.ApplicationParameterListBean;
import com.edios.cdf.entity.common.ApplicationParameterListEntity;
import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.AppConstants;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.AssetCategoryBean;
import com.edios.project.dao.AssetCategoryDao;
import com.edios.project.entity.AssetCategoryEnitity;
import com.edios.project.entity.to.AssetCategoryTO;
import com.edios.project.manager.AssetCategoryManager;


@Service("assetCategoryManager")
public class AssetCategoryManagerImpl extends AbstractManagerImpl<AssetCategoryBean, AssetCategoryEnitity> implements AssetCategoryManager {

	@Autowired
	AssetCategoryDao assetCategoryDao;

	@Override
	@Transactional
	public List<AssetCategoryTO> fetchCategories(String status) {
		// TODO Auto-generated method stub
		return  assetCategoryDao.fetchCategories(status);
	}

	@Override
	@Transactional
	public String addCategory(AssetCategoryBean assetCategoryBean) {
		String resultString = "";
		boolean resultFlag = false;

		resultFlag = assetCategoryDao.checkCategoryNameExists(
				assetCategoryBean.getAssetCategoryID(),
				assetCategoryBean.getCategoryName());
		if (resultFlag) {
			return "NameAlreadyExist";
		}

		resultFlag = assetCategoryDao.checkCategoryCodeExists(assetCategoryBean.getAssetCategoryID(),
				assetCategoryBean.getCategoryCode());
		if (resultFlag) {
			return "CodeAlreadyExist";
		}

		setAuditInfo(assetCategoryBean, "newFlag");
		AssetCategoryEnitity assetCategoryEnitity = mapper.map(assetCategoryBean,
				AssetCategoryEnitity.class);
		resultFlag = assetCategoryDao.addCategory(assetCategoryEnitity);
		if (resultFlag) {
			return "ADDED";
		}
		return resultString;
	}
	private void setAuditInfo(AssetCategoryBean assetCategoryBean, String string) {
		if (string.equalsIgnoreCase("newFlag")) {
			assetCategoryBean.setTransactionCount(AppConstants.TRANSACTION_BEGIN);
			assetCategoryBean.setRecordType(AppConstants.RECORDTYPE_INSERT);
			assetCategoryBean.setCreatedDate(new Date());
		} else {
			assetCategoryBean.setTransactionCount(
					assetCategoryBean.getTransactionCount() + AppConstants.TRANSACTION_BEGIN);
			assetCategoryBean.setRecordType(AppConstants.RECORDTYPE_UPDATE);
			assetCategoryBean.setLastModifiedDate(new Date());
		}
	}
	
	@Override
	@Transactional
	public AssetCategoryBean findCategoryById(Long catgoeryID) {
		AssetCategoryBean assetCategoryBean = null;
		assetCategoryBean = mapper.map(assetCategoryDao.findCategoryById(catgoeryID),
				AssetCategoryBean.class);
		return assetCategoryBean;
	}
	
	@Override
	@Transactional
	public String updateCategory(AssetCategoryBean assetCategoryBean) {
		String resultString = "";
		boolean resultFlag = false;

		resultFlag = assetCategoryDao.checkCategoryNameExists(
				assetCategoryBean.getAssetCategoryID(),
				assetCategoryBean.getCategoryName());
		if (resultFlag) {
			return "NameAlreadyExist";
		}

		resultFlag = assetCategoryDao.checkCategoryCodeExists(assetCategoryBean.getAssetCategoryID(),
				assetCategoryBean.getCategoryCode());
		if (resultFlag) {
			return "CodeAlreadyExist";
		}

		TransactionData latestData = assetCategoryDao.fetchTransactionDataById(assetCategoryBean.getAssetCategoryID());
		if (latestData.getTransactionCount() > (assetCategoryBean.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}

		setAuditInfo(assetCategoryBean, "editFlag");
		AssetCategoryEnitity assetCategoryEnitity = mapper.map(assetCategoryBean,
				AssetCategoryEnitity.class);
		resultFlag = assetCategoryDao.updateCategory(assetCategoryEnitity);
		if (resultFlag) {
			return "UPDATED";
		}
		return resultString;
	}
	
	@Override
	@Transactional
	public String deleteCategory(DeleteRecords deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;

		TransactionData latestData = assetCategoryDao.fetchTransactionDataById(deleteRecords.getId());
		if (latestData.getTransactionCount() > (deleteRecords.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		resultFlag = assetCategoryDao.deleteCategory(deleteRecords.getId(),deleteRecords.getModifiedBy().longValue());
		if(resultFlag)
			return "DELETED";
		
		return resultString;
	}

}
