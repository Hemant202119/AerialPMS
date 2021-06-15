package com.edios.project.entity.to;

import java.util.Date;

import javax.persistence.Column;

import com.edios.cdf.bean.common.ApplicationParameterListBean;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AssetCategoryTO {
		
private Long assetCategoryID;

private String categoryCode;

private String categoryName;

private String categoryDescription;

private String categoryStatus;

private Long transactionCount;

}
