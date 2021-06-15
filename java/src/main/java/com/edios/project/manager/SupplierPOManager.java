package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.to.DrawingItemsTO;
import com.edios.project.entity.to.SupplierPOEntityTO;

public interface SupplierPOManager extends AbstractManager {
	List<SupplierPOEntityTO>  fetchSuppliers(String customerName);
    String addSupplierPOs(PurchaseOrdersBean purchaseOrdersBean);
    List<DrawingItemsTO> fetchSupplierDrawingItems(Long drawingID,Long projectID);	
    String updateSupplierPO(PurchaseOrdersBean purchaseOrdersBean);
    List<String> fetchDrawingItemsID(Long drawingID);
    List<DrawingItemsTO> fetchsupplierPOItems(List<String> drawingID,Long poID,Long projectID);	
    
}
