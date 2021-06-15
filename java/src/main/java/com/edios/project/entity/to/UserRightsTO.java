package com.edios.project.entity.to;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRightsTO implements Serializable {

	private static final long serialVersionUID = 1L;

	Long userRightsID;

	Long userID;
	
	Long circleID;
	
	Long contactID;

	String loginName;

	String businessName;

	String circleName;

}
