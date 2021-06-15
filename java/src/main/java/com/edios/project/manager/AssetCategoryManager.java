package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.AssetCategoryBean;


public interface AssetCategoryManager extends AbstractManager {
	List<com.edios.project.entity.to.AssetCategoryTO> fetchCategories(String status);
	
	String addCategory(AssetCategoryBean assetCategoryBean);
	
	AssetCategoryBean findCategoryById(Long catgoeryID);
	
	String updateCategory(AssetCategoryBean assetCategoryBean);
	
	String deleteCategory(DeleteRecords deleteRecords);
}
