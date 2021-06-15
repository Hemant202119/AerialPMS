package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.entity.common.ApplicationParameterValuesEntity;
import com.edios.cdf.util.TransactionData;
import com.edios.project.entity.AssetSubCategoryEnitity;


public interface AssetSubCategoryDao extends BaseDao<AssetSubCategoryEnitity> {
	List<com.edios.project.entity.to.AssetSubCategoryTO> fetchSubCategories(String status,Long assetCategoryID);
	
	boolean checkSubCategoryNameExists(Long assetCategoryID,String subCategoryName);
	
	boolean checkSubCategoryCodeExists(Long assetCategoryID,String subCategoryCode);
	
	boolean addSubCategory(AssetSubCategoryEnitity assetSubCategoryEnitity);
	
	AssetSubCategoryEnitity findSubCategoryById(Long id);
	
	TransactionData fetchTransactionDataById(Long id);
	
	boolean updateSubCategory(AssetSubCategoryEnitity assetSubCategoryEnitity);
	
	boolean deleteSubCategory(Long id, Long modifiedBy);
}
