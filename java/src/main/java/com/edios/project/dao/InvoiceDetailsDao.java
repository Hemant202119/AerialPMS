package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.entity.InvoiceDetailsEntity;
import com.edios.project.entity.to.InvoiceDetailsTO;

public interface InvoiceDetailsDao extends BaseDao<InvoiceDetailsEntity> {

	List<InvoiceDetailsTO> fetchInvoiceDetails(Long poID);

	Long addInvoiceDetails(InvoiceDetailsEntity invoiceDetailsEntity);

	Object findInvoiceDetailsById(Long idID);

	boolean updateInvoiceDetails(InvoiceDetailsEntity invoiceDetailsEntity);
	
	boolean isPONumberExists(String invoiceNo);
	boolean isPONumberExistsForEdit(String invoiceNo,Long InvoiceID);
}
