package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class DrawingTypeItemsBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long itemID;
	private Long poItemID;

	private Long drawingTypeID;

	private String itemName;

	private String itemHead;

	private String itemUnit;
	private Long approvedQty; 
	private Double itemQty;

	private String itemWeight;

	private Double itemUnitRate;

	private Double itemtotalRate;

	private String itemStatusID;

	private Long transactionCount;

	private String userIPAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;

	private Date lastModifiedDate;
	
	private Double  newProcurementQty ;
	
	private Double itemUnitTax;
	
	private Double amount;
	
	private Double currentUnitGST;
	
	private Double currentUnitRate;
	
	private Double budgetAmount;
	
}
