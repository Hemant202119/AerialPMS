package com.edios.project.entity.to;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor 
public class ProjectStatusTO {
	
	private Long projectStatusID;
	private String statusName;
	private Date statusDate;
	private String notes;

}
