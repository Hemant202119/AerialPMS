package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.ContractorPOEntityTo;


public interface ContractorPODao extends BaseDao<PurchaseOrdersEntity> {
	List<ContractorPOEntityTo> fetchContractorDetails();	
	Long addContractorPOs(PurchaseOrdersEntity purchaseOrdersEntity);
	 PurchaseOrdersEntity findContractorPOById(Long poID);
	 boolean updateContractorPO(PurchaseOrdersEntity purchaseOrdersEntity);
	PurchaseOrdersBean fetchContractorPOById(Long poID);
	boolean isPONumberExists(String poNo);
	boolean isPONumberExistsForEdit(String poNo,Long poID);
	String getCircleName(long projectID);
	boolean updatePoNumberOfPO(String poNumber,Long poID);
}
