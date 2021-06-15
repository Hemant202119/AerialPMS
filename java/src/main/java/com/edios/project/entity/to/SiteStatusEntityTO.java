package com.edios.project.entity.to;


import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
public class SiteStatusEntityTO {
	private String circleName;
	private String customerName;
	private String siteID;
	private String siteType;
	private Date allocationDate;
	private String projectStatus;
	private Date statusDate;
	private Long customerPOAmount;
	private Long supplierPOAmount;
	private Long contractorPOAmount;
	private Long totalPOAmount;
	private Long contractorFRAmount;
	private Long supplierFRAmount;
	private Long totalFRAmount;
	private Long supplierBoqTotal;	
}
