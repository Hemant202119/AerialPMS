export class PurchaseOrdersBean{
    
    poID:any;
	
	 projectID:any;
	
	 contactID:any;	
	
	 poNo:String;
	
	 poDate:Date;
	
	basicAmount:Number;
	
	 taxAmount:Number;
	
	totalAmount:Number;
	
	 poStatus:String;
	
	 frStatus:String;
	
	 invoiceStatus:String;
	
	 notes:String;
	
	activityTypeListID:any;
	
	 transactionCount:any;

	userActivityID:any;

	 userIPAddress:String;

	 recordType:any;

	 createdBy:Number;

	 createdDate:Date;

	 lastModifiedBy:Number;
	
	 lastModifiedDate:Date;
}

export class POApprovalTo{
	projectID:any;	
	contactID:any;	
	poID:any;
	poItemID:any;
    contactType:any;
    businessName:String;
    circleName:any;
    activity:any;
    poDate:Date;
    poAmount:any;
    poApprovalStatus:any;
	userName:String;
	startDate:Date;
	projectName:any;
	category:any;
	poStatus:any;
	notes:string;
	itemID : any;
    approvedQty: any;
    itemName : String;
	itemQty : any;
	siteID:any;
	sum_itemQty:any;
	sum_approvedQty:any;
	purchaseOrderItemList:any[]=[];
}
