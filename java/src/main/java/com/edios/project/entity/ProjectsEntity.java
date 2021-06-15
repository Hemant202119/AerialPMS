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

import org.hibernate.annotations.DynamicUpdate;

import com.edios.cdf.entity.AbstractEntity;
import com.edios.cdf.entity.common.ApplicationParameterListEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PROJECTS")
@Getter @Setter @NoArgsConstructor
@DynamicUpdate
public class ProjectsEntity extends AbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROJECT_ID")
	private Long projectID;	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CONTACT_ID")
	private ContactsEntity contactID;	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CIRCLE_ID")
	private CircleEntity circleID;	
	
	@Column(name = "PROJECT_NAME")
	private String projectName;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CATEGORY_ID")
	private ProjectCategoriesEntity categoryID;	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "EXEC_MODEL_ID")
	private ExecutionModelsEntity execModelID;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "DRAWING_TYPE_ID")
	private DrawingTypeEntity drawingTypeID;
	

	@Column(name = "SITE_NAME")
	private String siteName;
	
	@Column(name = "SITE_ID")
	private String siteID;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "ALLOCATION_DATE")
	private Date allocationDate;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "COMPLETION_DATE")
	private Date completionDate;	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "STATUS_DATE")
	private Date statusDate;
	
	
	@ManyToOne(fetch = FetchType.EAGER)	
	@JoinColumn(name = "STATUS_LIST_ID")
	private ApplicationParameterListEntity statusListID;
	
	
	@ManyToOne(fetch = FetchType.EAGER)	
	@JoinColumn(name = "SITE_TYPE_LIST_ID")
	private ApplicationParameterListEntity siteTypeListID;
	
	@Column(name = "ZONE")
	private String zone;
	
	@Column(name = "ADDRESS")
	private String address;
	
	@Column(name = "CITY")
	private String city;
	
	@Column(name = "DISTRICT")
	private String district;
	
	@Column(name = "LONGITUDE")
	private String longitude;
	
	@Column(name = "LATITUDE")
	private String latitude;
	
	@Column(name = "HEIGHT")
	private String height;
	
	@Column(name = "AT_AGENCY")
	private String atAgency;
	
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

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATED_DATE")	
	private Date createdDate;

	@Column(name = "LAST_MODIFIED_BY")
	private Integer lastModifiedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "LAST_MODIFIED_DATE")	
	private Date lastModifiedDate;

}

