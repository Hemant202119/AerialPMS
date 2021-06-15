package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.entity.BudgetOrderedQuantityEntity;
import com.edios.project.entity.BudgetOrderedQuantityItemsEntity;
import com.edios.project.entity.to.BoqTO;
import com.edios.project.entity.to.DrawingItemsTO;


public interface BoqDao extends BaseDao<BudgetOrderedQuantityEntity> {
	List<BoqTO> fetchBoqRecords(Long projectID);
	List<DrawingItemsTO> fetchBoqDrawingItems(Long projectID, Long drawingID);
	List<DrawingItemsTO> fetchBoqDrawingItemsByID(Long boqID);
	Long addBoq(BudgetOrderedQuantityEntity boq);
	boolean addBoqItems(BudgetOrderedQuantityItemsEntity boqItems);
	BudgetOrderedQuantityEntity findBoqById(Long boqID);
}
