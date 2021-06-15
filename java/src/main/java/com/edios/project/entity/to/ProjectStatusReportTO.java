package com.edios.project.entity.to;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
public class ProjectStatusReportTO {
	private String circleName;
	private String customerName;
	private String name;
	
	private String siteName;
	private String siteID;
	private Date allocationDate;
	private String projectStatus;
	private String projectCategory;
	private Date statusDate;
	private Double customerPOAmount;
	private Double customerInvoiceAmount;
	private String suplConame;
	private String activityName;
	private String poNumber;
	private Date poDate;
	private Long poAmount;
	private Long frAmount;
	private Long paymentAmount;
	private Long invoiceAmount;
}
