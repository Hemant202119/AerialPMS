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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "DRAWING_TYPE_ITEMS")
@Getter @Setter @NoArgsConstructor
public class DrawingTypeItemsEntity extends AbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ITEM_ID")
	private Long itemID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "DRAWING_TYPE_ID")
	private DrawingTypeEntity drawingTypeID;

	@Column(name = "ITEM_NAME")
	private String itemName;
	
	@Column(name = "ITEM_HEAD")
	private String itemHead;
	
	@Column(name = "ITEM_UNIT")
	private String itemUnit;
	
	@Column(name = "ITEM_QTY")
	private Double itemQty;
	
	@Column(name = "ITEM_WEIGHT")
	private String itemWeight;
	
	@Column(name = "ITEM_UNIT_RATE")
	private Double itemUnitRate;
	
	@Column(name = "ITEM_TOTAL_RATE")
	private Double itemtotalRate;
	
	@Column(name = "ITEM_STATUS")
	private String itemStatusID;

	@Column(name = "TRANSACTION_COUNT")
	private Long transactionCount;

	@Column(name = "USER_ACTIVITY_ID")
	private Long userActivityID;

	@Column(name = "IP_ADDRESS")
	private String userIPAddress;

	@Column(name = "RECORD_TYPE")
	private Character recordType;

	@Column(name = "CREATED_BY")
	private Integer createdBy;

	@Column(name = "CREATED_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdDate;

	@Column(name = "LAST_MODIFIED_BY")
	private Integer lastModifiedBy;

	@Column(name = "LAST_MODIFIED_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModifiedDate;
}

