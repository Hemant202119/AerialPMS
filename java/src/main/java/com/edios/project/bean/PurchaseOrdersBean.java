package com.edios.project.bean;

import java.util.Date;
import java.util.List;

import com.edios.cdf.bean.AbstractBean;
import com.edios.cdf.display.ParameterDropDownBean;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PurchaseOrdersBean extends AbstractBean{	

	private static final long serialVersionUID = 1L;
	
	private Long poID;
	
	private ProjectBean projectID;
	
	private ContactsBean contactID;	
	
	private String poNo;
	
	private Date poDate;
	
	private Long basicAmount;
	
	private Long taxAmount;
	
	private Long totalAmount;
	
	private String poStatus;
	
	private String frStatus;
	
	private String paymentStatus;
	
	private String invoiceStatus;
	
	private String notes;
	
	private ParameterDropDownBean activityTypeListID;
	
	private Long transactionCount;

	private Long userActivityID;

	private String userIPAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;
	
	private Date lastModifiedDate;
	private List<DrawingTypeItemsBean> PurchaseOrderItemList;
}
