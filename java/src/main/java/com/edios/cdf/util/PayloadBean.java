package com.edios.cdf.util;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS)
public class PayloadBean implements Serializable{

	private static final long serialVersionUID = 2832385012847929536L;

	Long id;

	Integer accountId;

	String signatureKey;

	String searchParameter;
	
	String customParameter;
}
