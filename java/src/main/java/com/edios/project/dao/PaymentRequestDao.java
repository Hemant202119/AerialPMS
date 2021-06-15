package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.entity.PaymentRequestsEntity;
import com.edios.project.entity.to.PaymentRequestsTO;

public interface PaymentRequestDao extends BaseDao<PaymentRequestsEntity> {

	List<PaymentRequestsTO> fetchPaymentRequestDetails(Long poID);

	Long addPaymentRequestDetails(PaymentRequestsEntity fundRequestsEntity);

	Object findPaymentRequestDetailsById(Long idID);

	boolean updatePaymentRequestDetails(PaymentRequestsEntity fundRequestsEntity);
	
	List<PaymentRequestsTO> fetchPaymentSum(Long poID);

}
