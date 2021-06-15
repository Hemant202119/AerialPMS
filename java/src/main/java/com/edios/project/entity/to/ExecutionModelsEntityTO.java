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
public class ExecutionModelsEntityTO extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long execModelID;

	private String execModelName;

}
