export class ItemsInformationBean {
    stockItemId: any;
    assetItemId: any;
    itemName: String;
    itemCode: String;
    itemType: String;
    itemDescription: String;
    categoryDescription: String;
    categoryName: String;
    subCategoryName: String;    
    receivedDate: Date;
    //stockItemStatus: String;
    itemQuantity: any;    
    vendorName: any;
    // purchasedDate: any;
    // purchasePrice: any;
    // guarantyEndDate: Date;
    // warrantyEndDate: Date;
    // purchasedRemarks: String;
    // rentStartDate: Date;
    // rentEndDate: Date;
    // rentRemarks: String;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
    ip_Address: String;    
    // itemManufacture: String;
    // itemModel : String;
    // itemLotNo: any;
    mrnSRN: String;
    transactionNumber:String;
    transactionType: String;
    notes: String;    
    itemStatus : String;
    // invoiceNumber: String;
    // rentalSecurity: any;
    // rentalAmount: any;
    // rentalFrequency: String;
    project:any;
    contact:any;
    itemUnit:String;
    itemQuantityReceived:any;
	itemQuantityUsed:any;
    itemQuantityBalance:any;
    itemQuantityWasted:any;
    currentProjectItemStock:number;
}

export class ItemEntityTO {
    assestItemID:any;
	assestItemName:string;
	itemCode:string;
	itemType:string;
	itemStatus:string;
	itemDescription:string;
	categoryName:string;
    subCategoryName:string;
    itemUnit:string;
    currentProjectItemStock:number;
}

export class AutoLookUpList{
    projectID:number;
    projectName: string;
    contactID:number;
    businessName:string;
}