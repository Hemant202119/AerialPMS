package com.edios.project.entity.to;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ItemReceivedTO {
	private Long assetItemID;
	private Long stockItemId;	
	private String itemName;
	private String itemCode;
	private String itemSerialNumber;
	private Date receivedDate;
	private String transactionType;
	private String itemType;
	private String itemStatus;
	private String stockStatus;
	private String itemDescription;
	private String categoryName;
	private String subCategoryName;
	private Long transactionCount;	
	private Date issuedDate;
	private String mrnSRN;
	private String itemUnit;
	private Double currentProjectItemStock;
}
