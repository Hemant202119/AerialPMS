package com.edios.cdf.entity.to;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserEntityTO implements Serializable {

	private static final long serialVersionUID = 1L;

	Long userID;

	String loginName;

	String firstName;

	String lastName;

	String userStatus;

	String emailAddress;

	Long transactionCount;

}
