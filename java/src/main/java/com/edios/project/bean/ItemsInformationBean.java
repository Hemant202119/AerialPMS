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

public class ItemsInformationBean extends AbstractBean {
	private static final long serialVersionUID = 1L;

	private Long stockItemId;
	private Long assetItemIDD;
	private String itemCode;
	private String itemType;
	private String itemDescription;
	private String categoryDescription;
	private String caregoryName;
    private String subCategoryName;
	private Date receivedDate;
	private String stockItemStatus;
	private Float itemQuantity;	
	private String vendorName;
	private Long transactionCount;
	private String transactionType;
	private String ipAddress;
	private Character recordType;
	private Integer createdBy;
	private Date createdDate;
	private Integer lastModifiedBy;
	private Date lastModifiedDate;	
	private String notes;	
	private String invoiceNumber;
	private String transactionNumber;
	private Float itemQuantityReceived;
	private Float itemQuantityUsed;
	private Float itemQuantityBalance;
	private Float itemQuantityWasted;
	private AssetSubCategoryItemBean assetItemId;
	private ContactsBean contact;
	private ProjectBean project;
	private Date usedDate;
	private String usageType;
	
	
}
