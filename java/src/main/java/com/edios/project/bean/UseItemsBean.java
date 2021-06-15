package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class UseItemsBean extends AbstractBean{
	
	private static final long serialVersionUID = -585015550313034749L;

	private Long usedItemId;
	private Long createdBy;
	private Date createdDate;
	private String ipAddress;
	private Float itemQuantityUsed;
	private Float itemQuantityWasted;
	private Long lastModifiedBy;
	private Date lastModifiedDate;
	private String notes;
	private String recordType;
	private ReceiveItemBean assetItemId;
	private Long transactionCount;
	private String usageType;
	private Date usedDate;
	private ProjectBean project;
	private ContactsBean contact;
	private Long projectID;
	private Long contactID;
	private String signatureKey;
	private Long stockItemId;

}
