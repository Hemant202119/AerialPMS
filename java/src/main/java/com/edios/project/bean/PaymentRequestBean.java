package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;
import com.edios.cdf.display.ParameterDropDownBean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class PaymentRequestBean extends AbstractBean {

	
	private static final long serialVersionUID = 1L;

	
    private Long pdID;	
	
	private PurchaseOrdersBean poID;	
	
	private Date paymentDate;	
	
	private Double paymentAmount;	
	
	private ParameterDropDownBean paymentTypeListID;
	
	private String paymentParticulars;
	
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
