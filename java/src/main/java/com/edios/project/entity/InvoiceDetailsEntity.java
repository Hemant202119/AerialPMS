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
@Table(name = "INVOICE_DETAILS")
@Getter @Setter @NoArgsConstructor
public class InvoiceDetailsEntity extends AbstractEntity {
	
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_ID")
	private Long idID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PO_ID")
	private PurchaseOrdersEntity poID;
	
	@Column(name = "INVOICE_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date invoiceDate;
	
	@Column(name = "INVOICE_AMOUNT")
	private Double invoiceAmount;	
	
	@Column(name = "GST")
	private Double gst;
	
	@Column(name = "TOTAL_AMOUNT")
	private Double totalAmount;	
	
	@Column(name = "INVOICE_NO")
	private String invoiceNo;
	
	@Column(name = "NOTES")
	private String notes;
	
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
