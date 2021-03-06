package com.edios.cdf.entity.security;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.edios.cdf.entity.AbstractEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "USERS")
public class UserEntity extends AbstractEntity {

	private static final long serialVersionUID = -628047280900532133L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USER_ID")
	private Long userID;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "DEFAULT_ACCOUNT_ID")
	private AccountEntity accountID;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "userID")
	private List<AccountUserEntity> accountUserList = new ArrayList<>();
	
	@Column(name = "DEFAULT_ROLE_ID")
	private Long defaultRoleID;

	@Column(name = "DEFAULT_SITE_ID")
	private Long defaultSiteID;
	
	@Column(name = "DEFAULT_MENU_ID")
	private Integer defaultMenuID;

	@Column(name = "DEFAULT_THEME")
	private String defaultTheme;

	@Column(name = "TITLE")
	private String title;

	@Column(name = "FIRST_NAME")
	private String firstName;

	@Column(name = "MIDDLE_NAME")
	private String middleName;

	@Column(name = "LAST_NAME")
	private String lastName;

	@Column(name = "MARITAL")
	private String marital;

	@Column(name = "GENDER")
	private String gender;

	@Column(name = "BIRTH_DATE")
	private Date birthDate;

	@Column(name = "BLOOD_GROUP")
	private String bloodGroup;

	@Column(name = "ADDRESS1")
	private String address1;

	@Column(name = "ADDRESS2")
	private String address2;

	@Column(name = "CITY")
	private String city;

	@Column(name = "STATE")
	private String state;
	
	@Column(name = "OTHER_STATE")
	private String otherState;
	
	@Column(name = "COUNTRY")
	private String country;

	@Column(name = "ZIP_CODE")
	private String ZIPCode;

	@Column(name = "HOME_PHONE")
	private String homePhone;

	@Column(name = "WORK_PHONE")
	private String workPhone;

	@Column(name = "MOBILE_PHONE")
	private String mobilePhone;

	@Column(name = "FAX_PHONE")
	private String faxPhone;

	@Column(name = "EMAIL_ADDRESS")
	private String emailAddress;

	@Column(name = "LOGIN_NAME")
	private String loginName;

	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "PASSWORD_RESET_FLAG")
	private Integer passwordResetFlag;

	@Column(name = "LOGIN_FLAG")
	private Integer loginFlag;

	@Column(name = "SECURITY_QUESTION")
	private String securityQuestion;

	@Column(name = "SECURITY_ANSWER")
	private String securityAnswer;

	@Column(name = "LOGIN_FAILED_TRIES")
	private Integer loginFailedTries;

//	@Column(name = "ESIGN")
//	private String esign;
//
//	@Column(name = "ESIGN_RESET_FLAG")
//	private Integer esignResetFlag;
	
	@Column(name = "PASSWORD_EXPIRY_DAYS")
	private Integer passwordExpiryDays;

	@Column(name = "PASSWORD_EXPIRY_DATE")
	private Date passwordExpiryDate;

	@Column(name = "PASSWORD_CHANGED_DATE")
	private Date passwordChangedDate;

//	@Column(name = "ESIGN_EXPIRY_DAYS")
//	private Integer esignExpiryDays;
//
//	@Column(name = "ESIGN_EXPIRY_DATE")
//	private Date esignExpiryDate;
//
//	@Column(name = "ESIGN_CHANGED_DATE")
//	private Date esignChangedDate;

	/*@Column(name = "LOGIN_VALID_START_DATE")
	private Date loginValidStartDate;

	@Column(name = "LOGIN_VALID_END_DATE")
	private Date loginValidEndDate;*/

	@Column(name = "SESSION_TIMEOUT_MIN")
	private Integer sessionTimeoutMin;

	@Column(name = "USER_TYPE")
	private String userType;

/*	@Column(name = "USER_HIDDEN")
	private String userHidden;*/

	@Column(name = "USER_STATUS")
	private String userStatus;

	@Column(name = "CUSTOM_VALUE_1")
	private String customValue1;

	@Column(name = "CUSTOM_VALUE_2")
	private String customValue2;

	@Column(name = "CUSTOM_VALUE_3")
	private String customValue3;

	@Column(name = "CUSTOM_VALUE_4")
	private String customValue4;

	@Column(name = "TRANSACTION_COUNT")
	private Long transactionCount;

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
