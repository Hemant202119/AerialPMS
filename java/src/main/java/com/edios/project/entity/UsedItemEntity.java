package com.edios.project.entity;


import javax.persistence.*;
import com.edios.cdf.entity.AbstractEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Setter  @Getter @NoArgsConstructor
@Entity
@Table(name="used_items")
@NamedQuery(name="UsedItem.findAll", query="SELECT u FROM UsedItemEntity u")

public class UsedItemEntity extends AbstractEntity {
	
	
	private static final long serialVersionUID = -1927929276565140322L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="USED_ITEM_ID")
	private Long usedItemId;

	@Column(name="CREATED_BY")
	private Long createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="IP_ADDRESS")
	private String ipAddress;

	@Column(name="ITEM_QUANTITY_USED")
	private Float itemQuantityUsed;

	@Column(name="ITEM_QUANTITY_WASTED")
	private Float itemQuantityWasted;

	@Column(name="LAST_MODIFIED_BY")
	private Long lastModifiedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="LAST_MODIFIED_DATE")
	private Date lastModifiedDate;

	@Column(name="NOTES")
	private String notes;

	@Column(name="RECORD_TYPE")
	private Character recordType;

	@Column(name="TRANSACTION_COUNT")
	private Long transactionCount;

	@Column(name="USAGE_TYPE")
	private String usageType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="USED_DATE")
	private Date usedDate;

	//bi-directional many-to-one association to Project
	@ManyToOne
	@JoinColumn(name="PROJECT_ID")
	private ProjectsEntity project;

	//bi-directional many-to-one association to Contact
	@ManyToOne
	@JoinColumn(name="CONTACT_ID")
	private ContactsEntity contact;
	
	@ManyToOne
	@JoinColumn(name="STOCK_ITEM_ID")
	private StockItemsEntity stockItemId;

	
}