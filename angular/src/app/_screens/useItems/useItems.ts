export class ReceivedItemsList{
    projectName:string;
    businessName:string;
    itemName:string;
    transactionType:string;
    receivedDate:string;
    stockItemId:number;
    itemQuantityReceived:number;
    itemQuantityUsed:number;
    itemQuantityWasted:number;
    itemQuantityBalance:number;
}

export class ManageUseItemsTO{
    project:any;
    assetItemId:any;
    signatureKey:any;

}


export class ItemsInformationBean{
    stockItemId: any;
    assetItemId: any; 
    receivedDate: String;   
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
    ip_Address: String;    
    notes: String;    
    project:any;
    contact:any;
    itemUnit:String;
    itemQuantityReceived:number;
	itemQuantityUsed:number;
    itemQuantityBalance:number;
    itemQuantityWasted:number;
    projectName:string;
    projectID:number;
    contactID:number;
    businessName:string;
    itemNameUnit:string;
    usedDate:Date;
    usageType:string;
    usedTransferReturn:number;
    wastedPercentage:number;
    quantityReceived:any;
	quantityUsed:any;
    quantityBalance:any;
    quantityWasted:any;
}

export class InsertUpdateUseItemBean{
    itemQuantityUsed:number;
    stockItemId: any;
    stockItemidpk:number;
    itemQuantityBalance:number;
    itemQuantityWasted:number;
    project:any;
    contact:any;
    usedDate:Date;
    usageType:string;
    lastModifiedBy:number;
    createdBy: any;
    transactionType:string;
    notes: String;
    signatureKey:any; 
    transactionCount: any;
}

