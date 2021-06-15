package com.edios.project.entity;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.edios.cdf.entity.AbstractEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "contacts")
@Getter
@Setter
@NoArgsConstructor
public class ContactsEntity extends AbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CONTACT_ID")
	private Long contactID;

	@Column(name = "CONTACT_TYPE")
	private String contactType;

	@Column(name = "CONTACT_STATUS")
	private String contactStatus;

	@Column(name = "ENTITY_TYPE")
	private String entityType;

	@Column(name = "BUSINESS_NAME")
	private String businessName;

	@Column(name = "BUSINESS_ID")
	private String businessID;

	@Column(name = "WEB_SITE")
	private String webSite;

	@Column(name = "PC_FIRST_NAME")
	private String firstName;

	@Column(name = "PC_LAST_NAME")
	private String lastName;

	@Column(name = "PC_POSITION")
	private String Position;

	@Column(name = "EMAIL_ADDRESS")
	private String emailAddress;

	@Column(name = "PHONE_NO")
	private String phoneNo;

	@Column(name = "MOBILE_NO")
	private String mobileNo;

	@Column(name = "FAX_NO")
	private String faxNo;

	@Column(name = "POSTAL_ADDRESS_1")
	private String postalAddress1;

	@Column(name = "POSTAL_ADDRESS_2")
	private String postalAddress2;

	@Column(name = "POSTAL_CITY")
	private String postalCity;

	@Column(name = "POSTAL_STATE")
	private String postalState;

	@Column(name = "POSTAL_COUNTRY")
	private String postalCountry;

	@Column(name = "POSTAL_PINCODE")
	private String postalPincode;

	@Column(name = "BILLING_ADDRESS_1")
	private String billingAddress1;

	@Column(name = "BILLING_ADDRESS_2")
	private String billingAddress2;

	@Column(name = "BILLING_CITY")
	private String billingCity;

	@Column(name = "BILLING_STATE")
	private String billingState;

	@Column(name = "BILLING_COUNTRY")
	private String billingCountry;

	@Column(name = "BILLING_PINCODE")
	private String billingPincode;

	@Column(name = "NOTES")
	private String notes;

	@Column(name = "BANK_NAME")
	private String bankName;

	@Column(name = "BRANCH_ADDRESS")
	private String branchAddress;

	@Column(name = "IFSC_CODE")
	private String ifscCode;

	@Column(name = "ACCOUNT_NUMBER")
	private String accountNo;

	@Column(name = "ACCOUNT_HOLDER_NAME")
	private String accountHolderName;

	@Column(name = "PAN_NUMBER")
	private String panNo;

	@Column(name = "GST_NUMBER")
	private String gstNo;

	@Column(name = "AADHAR_NUMBER")
	private String aadharNo;

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
