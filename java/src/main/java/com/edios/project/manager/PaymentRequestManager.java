package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.PaymentRequestBean;
import com.edios.project.entity.to.PaymentRequestsTO;

public interface PaymentRequestManager extends AbstractManager{

	List<PaymentRequestsTO> fetchPaymentRequestDetails(Long poID);

	String addPaymentRequestDetails(PaymentRequestBean fundRequestDetailsBean);

	PaymentRequestBean findPaymentRequestDetailsById(Long idID);

	String updatePaymentRequestDetails(PaymentRequestBean invoiceDetailsBean);
	List<PaymentRequestsTO> fetchPaymentSum(Long poID);

}
