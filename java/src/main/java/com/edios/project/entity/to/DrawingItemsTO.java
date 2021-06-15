package com.edios.project.entity.to;

import com.edios.cdf.bean.AbstractBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class DrawingItemsTO extends AbstractBean {
	private static final long serialVersionUID = 1L;
	
	private Long itemID;
	private String itemName;
	private String itemUnit;
	private Double ItemQty;
	private Double ItemUnitRate;
	private Long poItemID;
	private String itemHead;
	private String itemWeight;
	private String itemStatusID;
	private Long itemUnitTax;
	private Double qtyApprovedforProcurement ;
	private Double  newProcurementQty ;
	private Double budgetAmount;
	private Double alreadySpent;
	private Double currentUnitRate;
	private Double currentUnitGST;
	private Double amount; 
	 
	}