package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CircleBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long circleID;

	private String circleName;

	private String circleStatus;

	private Long transactionCount;

	private String ipAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;

	private Date lastModifiedDate;

}
