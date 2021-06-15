package com.edios.project.entity.to;

import java.io.Serializable;
import java.util.Date;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class InvoiceDetailsTO implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
    private Long idID;	
	
	private Date invoiceDate;	
	
	private Double invoiceAmount;	
	
	private Double totalAmount;
	
	private String invoiceNo;	
	
	private String notes;
	
	private Double gst;

	
	private Long poID;

	
	
	private String userName;
	
	private String businessName;
	
	private String bankName;
	
	private String branchAddress;
	
	private String accountNo;
	
	private String accountHolderName;
	
	private String ifscCode;
	
	private String panNumber;
	
	private String gstNo;
	
	private String aadharNo;
	
	private String userEmailAddress;
	
	private String siteName;
	
	private String siteID;
	
	private String circleName;
	
	private String parameterListValue;
	
	
	private String customerName;
	
	private String statusName;
	private Long projectID;
	private Long totalAmount1;
	private Date projectStatusDate;
}
