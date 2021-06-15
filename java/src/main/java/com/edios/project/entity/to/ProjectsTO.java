package com.edios.project.entity.to;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
public class ProjectsTO {
	
	
    private Long projectID;		
	
	private String customerName;
	
	private String circleName;
	
    private String projectName;
	
	private String categoryName;
	
	private String execModelName;
	
	private String siteName;	
	
	private String siteID;	
	
	private Date allocationDate;	
	
	private String status;
	
	private Long transactionCount; 
	
	private Long boqAmount;
	
	private Long boqId;

}
