package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.entity.common.ApplicationParameterValuesEntity;
import com.edios.cdf.util.TransactionData;
import com.edios.project.entity.AssetCategoryEnitity;
import com.edios.project.entity.to.AssetCategoryTO;


public interface AssetCategoryDao extends BaseDao<AssetCategoryEnitity> {
	List<AssetCategoryTO> fetchCategories(String status);
	
	boolean checkCategoryNameExists(Long assetCategoryID,String categoryName);
	
	boolean checkCategoryCodeExists(Long assetCategoryID,String categoryCode);
	
	boolean addCategory(AssetCategoryEnitity assetCategoryEnitity);
	
	AssetCategoryEnitity findCategoryById(Long id);
	
	TransactionData fetchTransactionDataById(Long id);
	
	boolean updateCategory(AssetCategoryEnitity assetCategoryEnitity);
	
	boolean deleteCategory(Long id, Long modifiedBy);
}
