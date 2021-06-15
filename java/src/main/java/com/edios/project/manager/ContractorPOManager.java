
package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.to.ContractorPOEntityTo;

public interface ContractorPOManager extends AbstractManager {
	List<ContractorPOEntityTo>  fetchContractors();
    String addContractorPOs(PurchaseOrdersBean purchaseOrdersBean);
    PurchaseOrdersBean findContractorPOById(Long id)	;
    String updateContractorPO(PurchaseOrdersBean purchaseOrdersBean);
	
	
}