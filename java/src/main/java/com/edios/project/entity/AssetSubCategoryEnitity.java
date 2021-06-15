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
@Table(name = "asset_sub_categories")
@Setter @Getter @NoArgsConstructor
public class AssetSubCategoryEnitity extends AbstractEntity{
	private static final long serialVersionUID = 4418464484775491796L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ASSET_SUB_CATEGORY_ID")
	private Long assetSubCategoryID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ASSET_CATEGORY_ID")
	private AssetCategoryEnitity assetCategoryID;
	
	@Column(name="SUB_CATEGORY_CODE")
	private String subCategoryCode;
	
	@Column(name="SUB_CATEGORY_NAME")
	private String subCategoryName;
	
	@Column(name="SUB_CATEGORY_DESCRIPTION")
	private String subCategoryDescription;
	
	@Column(name="SUB_CATEGORY_STATUS")
	private String subCategoryStatus;
	
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
