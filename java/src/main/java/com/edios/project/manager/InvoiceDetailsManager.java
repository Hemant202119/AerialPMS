package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.InvoiceDetailsBean;
import com.edios.project.entity.to.InvoiceDetailsTO;

public interface InvoiceDetailsManager extends AbstractManager {

	List<InvoiceDetailsTO> fetchInvoiceDetails(Long poID);

	String addInvoiceDetails(InvoiceDetailsBean invoiceDetailsBean);

	InvoiceDetailsBean findInvoiceDetailsById(Long idID);

	String updateInvoiceDetails(InvoiceDetailsBean invoiceDetailsBean);

}
