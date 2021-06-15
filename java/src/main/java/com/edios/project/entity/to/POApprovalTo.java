package com.edios.project.entity.to;
import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)

public class POApprovalTo implements Serializable {
   private static final long serialVersionUID = 6342094965674122373L;
   private Long poID;
   private Long poItemID;   
   private String contactType;
   private String siteID;
   private String businessName;
   private String circleName;
   private String activity;
   private Date  poDate;
   private Long poAmount;
   private String  poApprovalStatus;
   private String userName;
   private String projectName;
   private String category;
   private Date startDate;
   private String notes;
   private Long itemID;
   private String itemName;
   private Double itemQty;
   private Double approvedQty;
   private Long sum_itemQty;
   private Long sum_approvedQty;
}
