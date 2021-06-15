package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.POApprovalTo;

public interface POApprovalDao extends BaseDao<PurchaseOrdersEntity> {

	List<POApprovalTo> fetchPOApprovalDetails(String poStatus,String customerName);
	POApprovalTo findPOTypeById(Long id);
	List<POApprovalTo> fetchItemDetails(Long poID);
	//boolean updatePoApproval(PurchaseOrdersEntity purchaseOrdersEntity);

	PurchaseOrdersBean fetchApprovalStatusById(Long poID);
	boolean updatePoApproval(Long poID, String poStatus,String notes);
	boolean updatePoItemApproval(Long itemID, Long approvedQty);

}
