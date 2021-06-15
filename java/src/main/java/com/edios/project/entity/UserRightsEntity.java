package com.edios.project.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.edios.cdf.entity.AbstractEntity;
import com.edios.cdf.entity.security.UserEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name="user_rights")
@Getter
@Setter
@NoArgsConstructor
public class UserRightsEntity extends AbstractEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column (name= "USER_RIGHT_ID")
	private Long userRightsID;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "CONTACT_ID")
	private ContactsEntity contactID;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "CIRCLE_ID")
	private CircleEntity circleID;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "USER_ID")
	private UserEntity userID;
}
