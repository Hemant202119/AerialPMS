package com.edios.project.bean;

import java.util.Date;

import com.edios.cdf.bean.AbstractBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ContactsBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long contactID;

	private String contactType;

	private String contactStatus;

	private String entityType;

	private String businessName;

	private String businessID;

	private String webSite;

	private String firstName;

	private String lastName;

	private String Position;

	private String emailAddress;

	private String phoneNo;

	private String mobileNo;

	private String faxNo;

	private String postalAddress1;

	private String postalAddress2;

	private String postalCity;

	private String postalState;

	private String postalCountry;

	private String postalPincode;

	private String billingAddress1;

	private String billingAddress2;

	private String billingCity;

	private String billingState;

	private String billingCountry;

	private String billingPincode;

	private String notes;

	private String bankName;

	private String branchAddress;

	private String ifscCode;

	private String accountNo;

	private String accountHolderName;

	private String panNo;

	private String gstNo;

	private String aadharNo;

	private Long transactionCount;

	private Long userActivityID;

	private String userIPAddress;

	private Character recordType;

	private Integer createdBy;

	private Date createdDate;

	private Integer lastModifiedBy;

	private Date lastModifiedDate;
}
