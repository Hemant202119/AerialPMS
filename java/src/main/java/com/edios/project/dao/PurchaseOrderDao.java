package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.PurchaseOrderTO;

public interface PurchaseOrderDao extends BaseDao<PurchaseOrdersEntity> {

	List<PurchaseOrderTO> fetchPurchaseOrdersDetails(Long projectID,String customerName);

	Long addCustomerPOs(PurchaseOrdersEntity purchaseOrdersEntity);

	PurchaseOrdersEntity findCustomerPOById(Long id);

	boolean updateCustomerPO(PurchaseOrdersEntity purchaseOrdersEntity);

	PurchaseOrdersBean fetchCustomerPOById(Long poID);

	public boolean addContractorPOs(PurchaseOrdersEntity purchaseOrdersEntity);

	Double checkPOAmount(Long PoID);
	boolean isPONumberExists(String poNo);
	boolean isPONumberExistsForEdit(String poNo,Long poID);
	String getCircleName(long projectID);
	boolean updatePoNumberOfPO(String poNumber,Long poID);
	boolean updatePOStatus(PurchaseOrdersBean purchaseOrdersBean);
	public TransactionData fetchTransactionDataById2(Long id) ;

}
