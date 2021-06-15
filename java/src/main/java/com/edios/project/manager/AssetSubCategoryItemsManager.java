package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.AssetSubCategoryItemBean;
import com.edios.project.entity.to.AssetSubCategoryItemTO;


public interface AssetSubCategoryItemsManager extends AbstractManager {
	List<AssetSubCategoryItemTO> fetchSubCategoryItems(String status,Long assetSubCategoryID);
	
	String addSubCategoryItem(AssetSubCategoryItemBean assetSubCategoryItemBean);
	
	AssetSubCategoryItemBean findSubCategoryItemById(Long catgoeryID);
	
	String updateSubCategoryItem(AssetSubCategoryItemBean assetSubCategoryItemBean);
	
	String deleteSubCategoryItem(DeleteRecords deleteRecords);
	
	List<AssetSubCategoryItemTO> fetchAllSubCategoryItems(String status,Long catID);
}
