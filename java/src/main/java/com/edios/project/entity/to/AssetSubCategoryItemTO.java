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
public class AssetSubCategoryItemTO {
		
private Long assetItemID;

private String itemCode;

private String itemName;

private String itemUnit;

private String itemDescription;

private String itemType;

private String itemStatus;

private Long transactionCount;

private String subCategoryName;



}
