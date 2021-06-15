package com.edios.project.entity.to;

import com.edios.cdf.bean.AbstractBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ContactsEntityTO extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long contactID;

	private String contactType;

	private String businessName;
		
	private String contactStatus;
	
	private String firstName;

	private String lastName;
	
	private Long transactionCount;
}
