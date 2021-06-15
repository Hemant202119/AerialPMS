package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter@Setter@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class StockItemsBean extends AbstractBean {

	

	/**
	 * 
	 */
	private static final long serialVersionUID = 4784269728385967709L;
	private Long stockItemId;
	private Long createdBy;
	private Date createdDate;
	private String ipAddress;
	private Float itemQuantity;
	private Float itemQuantityReceived;
	private Float itemQuantityUsed;
	private Float itemQuantityBalance;
	private Float itemQuantityWasted;
	private Integer lastModifiedBy;
	private Date lastModifiedDate;
	private String notes;
	private Date receivedDate;
	private Character recordType;
	private Long transactionCount;
	private String transactionNumber;
	private String transactionType;
	//private AssetSubCategoryItemEnitity assetItemId;
	private ContactsBean contact;
	private ProjectBean project;
	
}
