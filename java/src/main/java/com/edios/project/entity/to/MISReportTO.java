package com.edios.project.entity.to;

import java.util.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
public class MISReportTO {
	private String circleName ;
	private String customerName;
	private String siteName ;
	private String siteID ;
	private String siteType ;
	private Date allocationDate ;
	private Date statusDate ;
	private String projectStatus ;
	private Long customerPOTotal ;
	private Long customerInvoiceAmount;
	private Long supplierBudgetTotal;
	private Long supplierPOTotal;
	private Long supplierPendingBudgetUtilisation;
	private Long contractorPOTotal;
	private Long poTotal;
	private Long fundRequestedTotal;
	private Long fundReleasedTotal;
	private Long fundNotReleased;
	private Long fundReleasedInvoicePending;	
	private Long invoiceBasicAmount;
	private Long invoiceGSTAmount;
}
