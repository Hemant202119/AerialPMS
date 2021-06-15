package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InvoiceDetailsBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long idID;

	private PurchaseOrdersBean poID;

	private Date invoiceDate;

	private Double invoiceAmount;

	private Double gst;

	private Double totalAmount;

	private String invoiceNo;

	private String notes;

	private Long transactionCount;

	private Long userActivityID;

	private String userIPAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;

	private Date lastModifiedDate;
}
