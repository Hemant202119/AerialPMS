package com.edios.project.entity.to;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
public class PurchaseOrderTO {
	
	private Long poID;
	
	private String businessName;
	
	private Date poDate;
	
    private String poNo;
    
    private String activityType;	
	
	private Long basicAmount;
	
	private Long taxAmount;
	
	private Long totalAmount;
	
	private String invoiceStatus;
	
	private String poStatus;
	
	private String frStatus;
	
	private String paymentStatus;
	//for v2.2
	private String boqItemName;
	
}
