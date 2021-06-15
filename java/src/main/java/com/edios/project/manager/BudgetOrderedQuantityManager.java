package com.edios.project.manager;
import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.BoqBean;
import com.edios.project.entity.to.BoqTO;
import com.edios.project.entity.to.DrawingItemsTO;

public interface BudgetOrderedQuantityManager extends AbstractManager {

	public List<BoqTO> fetchBoqRecords(Long projectID);
	public List<DrawingItemsTO>fetchBoqDrawingItems(Long projectID,Long drawingID);
	public List<DrawingItemsTO>fetchBoqDrawingItemsByID(Long boqID);
	String addPorjectBoq(BoqBean boq);
     BoqBean findBoqById(Long boqID);
}
