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
@Table(name = "asset_categories")
@Setter @Getter @NoArgsConstructor
public class AssetCategoryEnitity extends AbstractEntity{
	private static final long serialVersionUID = 4418464484775491796L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ASSET_CATEGORY_ID")
	private Long assetCategoryID;
	
	@Column(name="CATEGORY_CODE")
	private String categoryCode;
	
	@Column(name="CATEGORY_NAME")
	private String categoryName;
	
	@Column(name="CATEGORY_DESCRIPTION")
	private String categoryDescription;
	
	@Column(name="CATEGORY_STATUS")
	private String categoryStatus;
	
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
