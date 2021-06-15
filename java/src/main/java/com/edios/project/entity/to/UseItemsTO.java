package com.edios.project.entity.to;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UseItemsTO {

	private String projectName; 
	private Long projectID;
	private Long contactID;
   	private Long useItemID;
   	private Long stockItemId;
   	private String businessName;
   	private String itemName;
   	private String transactionType;
   	private Long transactionCount;
   	private String receivedDate;
   	private Float itemQuantityReceived;
   	private Float itemQuantityUsed;
   	private Float itemQuantityWasted;
   	private Float itemQuantityBalance;
 	private Float quantityReceived;
   	private Float quantityUsed;
   	private Float quantityWasted;
   	private Float quantityBalance;
   	private String itemUnit;
   	private String itemNameUnit;
   	private String usageType;
	
}
