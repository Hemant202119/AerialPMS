package com.edios.project.bean;
import java.util.Date;
import java.util.List;

import com.edios.cdf.bean.AbstractBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BoqBean extends AbstractBean {
	private static final long serialVersionUID = 1L;
	private Long boqID;
	
	private ProjectBean projectID;
	
	private String boqNotes;
	
	private Date boqdate;
	
	private Long transactionCount;

	private Long userActivityID;

	private String userIPAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;
	
	private Date lastModifiedDate;
	private List<DrawingTypeItemsBean> purchaseOrderItemList;

}
