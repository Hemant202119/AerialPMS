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
@Table(name = "FUND_REQUESTS")
@Getter @Setter @NoArgsConstructor
public class FundRequestsEntity extends AbstractEntity {
	
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FR_ID")
	private Long frID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PO_ID")
	private PurchaseOrdersEntity poID;
	
	@Column(name = "FR_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date frDate;
	
	@Column(name = "FR_AMOUNT")
	private Double frAmount;	
	
	@Column(name = "EMAIL_ADDRESSES")
	private String emailAddresses;
	
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
