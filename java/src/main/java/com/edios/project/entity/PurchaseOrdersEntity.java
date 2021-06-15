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
@Table(name = "PURCHASE_ORDERS")
@Setter @Getter @NoArgsConstructor
public class PurchaseOrdersEntity extends AbstractEntity {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4948934658861277504L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PO_ID")
	private Long poID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PROJECT_ID")
	private ProjectsEntity projectID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CONTACT_ID")
	private ContactsEntity contactID;	
	
	@Column(name = "PO_NO")
	private String poNo;
	
	@Column(name = "PO_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date poDate;
	
	@Column(name = "BASIC_AMOUNT")
	private Long basicAmount;
	
	@Column(name = "TAX_AMOUNT")
	private Long taxAmount;
	
	@Column(name = "TOTAL_AMOUNT")
	private Long totalAmount;
	
	@Column(name = "PO_STATUS")
	private String poStatus;
	
	@Column(name = "FR_STATUS")
	private String frStatus;
	
	@Column(name = "INVOICE_STATUS")
	private String invoiceStatus;
	
	@Column(name = "PAYMENT_STATUS")
	 private String paymentStatus;
	
	@Column(name = "NOTES")
	private String notes;
	
	@ManyToOne(fetch = FetchType.EAGER)	
	@JoinColumn(name = "ACTIVITY_TYPE_LIST_ID")
	private ApplicationParameterListEntity activityTypeListID;
	
	
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
