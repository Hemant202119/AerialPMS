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
@Table(name = "PAYMENT_DETAILS")
@Getter @Setter @NoArgsConstructor
public class PaymentRequestsEntity extends AbstractEntity {
	
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PD_ID")
	private Long pdID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PO_ID")
	private PurchaseOrdersEntity poID;
	
	@Column(name = "PAYMENT_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date paymentDate;
	
	@Column(name = "PAYMENT_AMOUNT")
	private Double paymentAmount;	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PAYMENT_TYPE_LIST_ID", nullable = false)
	private ApplicationParameterListEntity paymentTypeListID;
	
	@Column(name = "PAYMENT_PARTICULARS")
	private String paymentParticulars;
	
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
