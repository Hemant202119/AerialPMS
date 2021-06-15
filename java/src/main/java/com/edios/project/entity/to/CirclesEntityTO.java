package com.edios.project.entity.to;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CirclesEntityTO implements Serializable{

	private static final long serialVersionUID = 3961409324722899586L;

	private Long circleID;

	private String circleName;

	private String circleStatus;

	private Long transactionCount;
}
