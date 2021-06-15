package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.util.TransactionData;
import com.edios.project.entity.AssetSubCategoryItemEnitity;
import com.edios.project.entity.to.AssetSubCategoryItemTO;


public interface AssetSubCategoryItemDao extends BaseDao<AssetSubCategoryItemEnitity> {
	List<AssetSubCategoryItemTO> fetchSubCategoryItems(String status,Long assetCategoryID);
	
	boolean checkItemNameExists(Long assetCategoryID,String subCategoryName);
	
	boolean checkItemCodeExists(Long assetCategoryID,String subCategoryCode);
	
	boolean addSubCategoryItem(AssetSubCategoryItemEnitity assetSubCategoryItemEnitity);
	
	AssetSubCategoryItemEnitity findSubCategoryItemById(Long id);
	
	TransactionData fetchTransactionDataById(Long id);
	
	boolean updateSubCategoryItem(AssetSubCategoryItemEnitity assetSubCategoryItemEnitity);
	
	boolean deleteSubCategoryItem(Long id, Long modifiedBy);
	
	List<AssetSubCategoryItemTO> fetchAllSubCategoryItems(String status,Long catID);
}
