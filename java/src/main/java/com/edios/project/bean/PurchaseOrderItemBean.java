package com.edios.project.bean;

import java.util.Date;

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
public class PurchaseOrderItemBean  extends AbstractBean{	

	private static final long serialVersionUID = 1L;
	
	
	private Long poItemID;
	
	private PurchaseOrdersBean poID;
	
	private DrawingTypeItemsBean itemID;	
	
	private Double itemQty;
	
	private Long approvedQty;
	
	private Double itemUnitRate;	
		
	private Double itemUnitTax;
		
	private Double totalAmount;	
		
	private Long transactionCount;
	
	private Long userActivityID;
	
	private String userIPAddress;
	
	private Character recordType;

    private Integer createdBy;
	
	private Date createdDate;
	
	private Integer lastModifiedBy;
	
	private Date lastModifiedDate;

	public PurchaseOrdersBean getPoID() {
		return poID==null?poID= new PurchaseOrdersBean() :poID;
	}

	public void setPoID(PurchaseOrdersBean poID) {
		this.poID = poID;
	}

	public DrawingTypeItemsBean getItemID() {
		return itemID==null?itemID=new DrawingTypeItemsBean():itemID;
	}

	public void setItemID(DrawingTypeItemsBean itemID) {
		this.itemID = itemID;
	}
	
	
	

}
