package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;
import com.edios.cdf.display.ParameterDropDownBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter @NoArgsConstructor @ToString
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ProjectBean extends AbstractBean{	
	
	private static final long serialVersionUID = 1L;

	private Long projectID;	

	private ContactsBean contactID;	

	private CircleBean circleID;	

	private String projectName;
	
	private ProjectCategoriesBean categoryID;	
	
	private ExecutionModelsBean execModelID;

	private DrawingTypeBean drawingTypeID;
	
	private String siteName;
	
	private String siteID;

	private Date allocationDate;

	private Date completionDate;	

	private Date statusDate;
	
	private ParameterDropDownBean statusListID;
	
	private ParameterDropDownBean siteTypeListID;
	
	private String zone;
	
	private String address;
	
	private String city;

	private String district;
	
	private String longitude;
	
	private String latitude;
	
	private String height;
	
	private String atAgency;
	
	private String notes;	
	
	private Long transactionCount;

	private Long userActivityID;

	private String userIPAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;

	private Date lastModifiedDate;

}
