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
import com.edios.cdf.entity.common.ApplicationParameterListEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PURCHASE_ORDER_ITEMS")
@Setter @Getter @NoArgsConstructor
public class PurchaseOrderItemEntity extends AbstractEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -294895886341277504L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PO_ITEM_ID")
	private Long poItemID;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PO_ID")
	private PurchaseOrdersEntity poID;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITEM_ID")
	private DrawingTypeItemsEntity itemID;	
		
	@Column(name = "ITEM_QTY")
	private Double itemQty;
	
	@Column(name = "APPROVED_QTY")
	private Long approvedQty;
	
	
	@Column(name = "ITEM_UNIT_RATE")
	private Double itemUnitRate;
	
	@Column(name = "ITEM_UNIT_TAX")
	private Double itemUnitTax;
	
	@Column(name = "TOTAL_AMOUNT")
	private Double totalAmount;	
	
	@Column(name = "TRANSACTION_COUNT")
	private Long transactionCount;

	@Column(name = "USER_ACTIVITY_ID")
	private Long userActivityID;

	@Column(name = "IP_ADDRESS")
	private String userIPAddress;

	@Column(name = "RECORD_TYPE")
	private Character recordType;

	@Column(name = "CREATED_BY")
	private Long createdBy;

	@Column(name = "CREATED_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdDate;

	@Column(name = "LAST_MODIFIED_BY")
	private Long lastModifiedBy;

	@Column(name = "LAST_MODIFIED_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModifiedDate;

}
