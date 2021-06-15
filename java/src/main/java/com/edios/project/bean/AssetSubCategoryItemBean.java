package com.edios.project.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.edios.cdf.bean.AbstractBean;
import com.edios.cdf.bean.common.ApplicationParameterListBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AssetSubCategoryItemBean extends AbstractBean{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6182132273602683774L;

	private Long assetItemID;
	
	private AssetSubCategoryBean assetSubCategoryID;
	
	private String itemCode;
	
	private String itemName;
	
	private String itemDescription;
	
	private String itemType;
	
	private String itemUnit;
	
	private String itemStatus;
	
	private Long transactionCount;
	
	private String ipAddress;

	private Character recordType;
	
	private Long createdBy;

	private Date createdDate;
	
	private Long lastModifiedBy;

	private Date lastModifiedDate;

}
