package com.edios.project.entity.to;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AssetSubCategoryTO {
		
private Long assetSubCategoryID;

private String subCategoryCode;

private String subCategoryName;

private String subCategoryDescription;

private String subCategoryStatus;

private Long transactionCount;

private String categoryName;

}
