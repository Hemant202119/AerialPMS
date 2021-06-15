package com.edios.project.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.edios.cdf.entity.AbstractEntity;
import com.edios.cdf.entity.common.ApplicationParameterEntity;
import com.edios.cdf.entity.common.ApplicationParameterListEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "asset_items")
@Setter @Getter @NoArgsConstructor
public class AssetSubCategoryItemEnitity extends AbstractEntity{
	private static final long serialVersionUID = 4418464484775491796L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ASSET_ITEM_ID")
	private Long assetItemID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ASSET_SUB_CATEGORY_ID")
	private AssetSubCategoryEnitity assetSubCategoryID;
	
	@Column(name="ITEM_CODE")
	private String itemCode;
	
	@Column(name="ITEM_NAME")
	private String itemName;
	
	@Column(name="ITEM_DESCRIPTION")
	private String itemDescription;
	
	@Column(name="ITEM_TYPE")
	private String itemType;
	
	@Column(name="ITEM_UNIT")
	private String itemUnit;
	
	@Column(name="ITEM_STATUS")
	private String itemStatus;
	
	@Column(name="TRANSACTION_COUNT")
	private Long transactionCount;
	
	@Column(name="IP_ADDRESS")
	private String ipAddress;

	@Column(name="RECORD_TYPE")
	private Character recordType;
	
	@Column(name="CREATED_BY")
	private Long createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATED_DATE")
	private Date createdDate;
	
	@Column(name="LAST_MODIFIED_BY")
	private Long lastModifiedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="LAST_MODIFIED_DATE")
	private Date lastModifiedDate;
}
