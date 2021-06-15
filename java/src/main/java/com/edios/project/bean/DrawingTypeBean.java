package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class DrawingTypeBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long drawingTypeID;

	private ExecutionModelsBean execModelID;

	private String drawingTypeName;

	private String drawingTypeStatus;

	private Long transactionCount;

	private String userIPAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;

	private Date lastModifiedDate;
}
