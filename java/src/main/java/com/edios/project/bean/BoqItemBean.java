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
public class BoqItemBean  extends AbstractBean{	

	private static final long serialVersionUID = 1L;
	
	
	private Long boqItemID;
	
	private BoqBean boqID;
	
	private DrawingTypeItemsBean itemID;	
	
	private Double itemQty;
	
	private String itemName;

	private String itemHead;

	private String itemUnit;

	private String itemWeight;
	
	private String itemStatusID;
	
	private Double itemUnitRate;

	private Double itemtotalRate;
		
	private Long transactionCount;
	
	private Long userActivityID;
	
	private String userIPAddress;
	
	private Character recordType;

    private Integer createdBy;
	
	private Date createdDate;
	
	private Integer lastModifiedBy;
	
	private Date lastModifiedDate;

	public BoqBean getBoqID() {
		return boqID==null?boqID= new BoqBean() :boqID;
	}

	public void setPoID(BoqBean boqID) {
		this.boqID = boqID;
	}

	public DrawingTypeItemsBean getItemID() {
		return itemID==null?itemID= new DrawingTypeItemsBean() :itemID;
	}

	public void setItemID(DrawingTypeItemsBean itemID) {
		this.itemID = itemID;
	}

	

}