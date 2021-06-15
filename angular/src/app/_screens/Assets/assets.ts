export class AssetCategoryBean{
    assetCategoryID:any;
    
      categoryCode:string;
    
      categoryName:string;
    
      categoryDescription:string;
    
      categoryStatus:string;
    
      transactionCount:any;
	
	  ipAddress:string;

	  recordType:any;
	
	  createdBy:any;

	  createdDate:Date;
	
	  lastModifiedBy:any;

	  lastModifiedDate:Date;




}


export class AssetCategoryTO {
	
      assetCategoryID:any;
    
      categoryCode:string;
    
      categoryName:string;
    
      categoryDescription:string;
    
      categoryStatus:string;
    
      transactionCount:any;
}

export class AssetSubCategoryTO {
	
    assetSubCategoryID:any;
  
    subCategoryCode:string;
  
    subCategoryName:string;
  
    subCategoryDescription:string;
  
    subCategoryStatus:string;
  
    transactionCount:any;

    categoryCode:string;
}

export class AssetSubCategoryBean{

      assetSubCategoryID:any;

      assetCategoryID:any;

      subCategoryCode:string;
    
      subCategoryName:string;
    
      subCategoryDescription:string;
    
      subCategoryStatus:string;
    
      transactionCount:any;
	
	  ipAddress:string;

	  recordType:any;
	
	  createdBy:any;

	  createdDate:Date;
	
	  lastModifiedBy:any;

	  lastModifiedDate:Date;




}

export class SubCategoryBean{
    categoryName:String;
    subCategoryName:String;
    subCategoryCode:String;
    subCategoryStatus:String;
    subCategoryDesc:String;

}
export class SubCategoryEntityTO{
    categoryName:String;
    subCategoryName:String;
    subCategoryCode:String;
    subCategoryStatus:String;
    subCategoryDesc:String;

}
export class SubCategoryItemBean{
    assetItemID:any;

    assetSubCategoryID:any;

    itemCode:string;
  
    itemName:string;

    itemUnit:String;
  
    itemDescription:string;

    itemType:string;
  
    itemStatus:string;
  
    transactionCount:any;
  
    ipAddress:string;

    recordType:any;
  
    createdBy:any;

    createdDate:Date;
  
    lastModifiedBy:any;

    lastModifiedDate:Date;
}
export class SubCategoryItemTO{
    assetItemID:any;
  
    itemCode:string;

    itemUnit:string;
  
    itemName:string;
  
    itemDescription:string;
  
    itemType:string;

    itemStatus:string;
  
    transactionCount:any;

    subCategoryName:string;
}
