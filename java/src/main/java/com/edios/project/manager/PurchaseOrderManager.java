package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.to.PurchaseOrderTO;

public interface PurchaseOrderManager extends AbstractManager {

	List<PurchaseOrderTO> fetchPurchaseOrdersDetails(Long projectID,String customerName);

	String addCustomerPOs(PurchaseOrdersBean purchaseOrdersBean);

	PurchaseOrdersBean findCustomerPOById(Long id);

	String updateCustomerPO(PurchaseOrdersBean purchaseOrdersBean);	
	
	public String addContractorPOs(PurchaseOrdersBean purchaseOrdersBean);
	
	String updatePOStatus(PurchaseOrdersBean purchaseOrdersBean);


}
