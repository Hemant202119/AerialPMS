package com.edios.cdf.entity.to;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
public class ReportBean implements Serializable{

	private static final long serialVersionUID = -176476403307312248L;
	
	Date allocationDate;
	Date completionDate;	
	Long contactID;
	Long circleID;
	Long siteTypeID;
	String allocationDateString;
	String completionDateString;
	Long userID;
	
}
