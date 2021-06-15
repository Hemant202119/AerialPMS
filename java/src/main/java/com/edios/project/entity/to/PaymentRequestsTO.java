package com.edios.project.entity.to;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter @Getter @NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PaymentRequestsTO {
	
    private Long pdID;	
	
	private Date paymentDate;	
	
	private Double paymentAmount;	
	
	private Long projectID;
	private Long poID;
	
	
	
	private String notes;	
	
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
	
	private Long totalAmount;
	
	private String customerName;
	
	private String statusName;
	
	private Date projectStatusDate;
	private Double addition;
}
