package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.PurchaseOrderItemEntity;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.DrawingItemsTO;
import com.edios.project.entity.to.SupplierPOEntityTO;

public interface SupplierPODao extends BaseDao<PurchaseOrdersEntity> {
	List<SupplierPOEntityTO> fetchSupplierDetails(String customerName);	
	Long addSuppplierPOs(PurchaseOrdersEntity purchaseOrdersEntity);
	List<DrawingItemsTO> fetchSupplierDrawingItems(Long drawingID,Long projectID);
	PurchaseOrdersBean fetchSupplierPOById(Long poID);
	boolean updateSupplierPO(PurchaseOrdersEntity purchaseOrdersEntity);	
	boolean addSupplierPoItems(PurchaseOrderItemEntity purchaseOrderItemsEntity);
	boolean updateSupplierPoItems(PurchaseOrderItemEntity purchaseOrderItemsEntity);
	List<DrawingItemsTO> fetchsupplierPOItems(List<String> drawingID,Long poID,Long projectID);
	List<String> fetchDrawingItemsID(Long drawingID);
	boolean deletePOItems(Long poID);
	boolean isPONumberExists(String poNo);
	boolean isPONumberExistsForEdit(String poNo,Long poID);
	String getCircleName(long projectID);
	boolean updatePoNumberOfPO(String poNumber,Long poID);
	
	
}
