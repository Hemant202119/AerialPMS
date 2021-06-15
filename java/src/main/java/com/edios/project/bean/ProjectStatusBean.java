package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;
import com.edios.cdf.display.ParameterDropDownBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ProjectStatusBean extends AbstractBean {

	private static final long serialVersionUID = 2239418781760189765L;

	private Long projectStatusID;

	private ProjectBean projectID;

	private ParameterDropDownBean statusListID;

	private Date statusDate;

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
