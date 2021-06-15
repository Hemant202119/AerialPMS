package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.entity.FundRequestsEntity;
import com.edios.project.entity.to.FundRequestsTO;
import com.edios.project.entity.to.InvoiceDetailsTO;
import com.edios.project.entity.to.PaymentRequestsTO;

public interface FundRequestDao extends BaseDao<FundRequestsEntity> {

	List<FundRequestsTO> fetchFundRequestDetails(Long poID);

	Long addFundRequestDetails(FundRequestsEntity fundRequestsEntity);

	Object findFundRequestDetailsById(Long idID);

	boolean updateFundRequestDetails(FundRequestsEntity fundRequestsEntity);

	List<FundRequestsTO> getDataForEmail(Long idID);


	List<PaymentRequestsTO> getDataForContractorEmail(Long pdID) ;
	List<InvoiceDetailsTO> getDataForReminderEmail(Long pdID) ;

	Double getTotalAmount(Long id);

}
