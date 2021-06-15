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
public class UseItemBean  extends AbstractBean {
	
	private static final long serialVersionUID = 2414375466866958959L;

	private Long usedItemId;
	private Long createdBy;
	private Date createdDate;
	private String ipAddress;
	private Float itemQuantityUsed;
	private Float itemQuantityWasted;
	private Float itemQuantityBalance;
	private Long lastModifiedBy;
	private Date lastModifiedDate;
	private String notes;
	private Character recordType;
	private Long transactionCount;
	private String usageType;
	private Long stockItemidpk;
	private Date usedDate;
	private ProjectBean project;
	private ContactsBean contact;
	//private ItemsInformationBean stockitemId;
	private StockItemsBean stockItemId;
	
	
	
	
}
