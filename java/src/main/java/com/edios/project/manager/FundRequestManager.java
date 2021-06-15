package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.FundRequestBean;
import com.edios.project.entity.to.FundRequestsTO;
import com.edios.project.entity.to.InvoiceDetailsTO;
import com.edios.project.entity.to.PaymentRequestsTO;

public interface FundRequestManager extends AbstractManager{

	List<FundRequestsTO> fetchFundRequestDetails(Long poID);

	String addFundRequestDetails(FundRequestBean fundRequestDetailsBean);

	FundRequestBean findFundRequestDetailsById(Long idID);

	String updateFundRequestDetails(FundRequestBean invoiceDetailsBean);
	
	List<PaymentRequestsTO> getDataForContractorEmail(Long pdID) ;
	
	List<InvoiceDetailsTO> getDataForReminderEmail(Long pdID) ;

	Double getTotalAmount(Long id);

}
