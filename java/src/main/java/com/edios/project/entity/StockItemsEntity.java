package com.edios.project.entity;


import javax.persistence.*;
import com.edios.cdf.entity.AbstractEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name="stock_items")
@NamedQuery(name="StockItem.findAll", query="SELECT s FROM StockItemsEntity s")
public class StockItemsEntity extends AbstractEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="STOCK_ITEM_ID")
	private Long stockItemId;

	@Column(name="CREATED_BY")
	private Long createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="IP_ADDRESS")
	private String ipAddress;

	@Column(name="ITEM_QUANTITY")
	private Float itemQuantity;
	
	@Column(name="ITEM_QUANTITY_RECEIVED")
	private Float itemQuantityReceived;
	
	@Column(name="ITEM_QUANTITY_USED")
	private Float itemQuantityUsed;
	
	@Column(name="ITEM_QUANTITY_BALANCE")
	private Float itemQuantityBalance;
	
	@Column(name="ITEM_QUANTITY_WASTED")
	private Float itemQuantityWasted;

	@Column(name="LAST_MODIFIED_BY")
	private Integer lastModifiedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="LAST_MODIFIED_DATE")
	private Date lastModifiedDate;

	private String notes;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="RECEIVED_DATE")
	private Date receivedDate;

	@Column(name="RECORD_TYPE")
	private Character recordType;

	/*@Column(name="STOCK_ITEM_STATUS")
	private String stockItemStatus;*/

	@Column(name="TRANSACTION_COUNT")
	private Long transactionCount;

	@Column(name="TRANSACTION_NUMBER")
	private String transactionNumber;

	@Column(name="TRANSACTION_TYPE")
	private String transactionType;

	//bi-directional many-to-one association to AssetItem
	@ManyToOne
	@JoinColumn(name="ASSET_ITEM_ID")
	private AssetSubCategoryItemEnitity assetItemId;

	//bi-directional many-to-one association to Contact
	@ManyToOne
	@JoinColumn(name="CONTACT_ID")
	private ContactsEntity contact;

	//bi-directional many-to-one association to Project
	@ManyToOne
	@JoinColumn(name="PROJECT_ID")
	private ProjectsEntity project;


}