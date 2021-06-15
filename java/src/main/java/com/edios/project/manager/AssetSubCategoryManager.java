package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.AssetSubCategoryBean;
import com.edios.project.entity.to.AssetSubCategoryTO;


public interface AssetSubCategoryManager extends AbstractManager {
	List<AssetSubCategoryTO> fetchSubCategories(String status,Long assetCategoryID);
	
	String addSubCategory(AssetSubCategoryBean assetSubCategoryBean);
	
	AssetSubCategoryBean findSubCategoryById(Long catgoeryID);
	
	String updateSubCategory(AssetSubCategoryBean assetSubCategoryBean);
	
	String deleteSubCategory(DeleteRecords deleteRecords);
}
