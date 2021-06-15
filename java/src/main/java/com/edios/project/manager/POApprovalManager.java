package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.to.POApprovalTo;


public interface POApprovalManager extends AbstractManager {
	List<POApprovalTo> fetchPOApprovalDetails(String poStatus,String customerName);
	List<POApprovalTo> fetchItemDetails(Long id);
	POApprovalTo findPOTypeById(Long id);
	String updatePoApproval(PurchaseOrdersBean purchaseOrdersBean);	
}
