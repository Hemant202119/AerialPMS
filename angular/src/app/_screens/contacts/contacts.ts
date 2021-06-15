export class Contacts{
    contactID:any
    contactStatus:String;
    contactType:any;
    entityType:any;
    businessName:string;
    businessID:any;
    webSite:string;
    firstName:string;
    lastName:string;
    Position:string;
    emailAddress:any;
    phoneNo:number;
    mobileNo:Number;
    faxNo:any;
    postalAddress1:any;
    postalAddress2:any;
    postalCity:string;
    postalState:string;
    postalCountry:string;
    postalPincode:string;
    billingAddress1:any;
    billingAddress2:any;
    billingCity:string;
    billingState:string;
    billingCountry:string;
    billingPincode:string;
    notes:string;
    bankName:string;
    branchAddress:string;
    ifscCode:string;
    accountNo:any;
    accountHolderName:string;
    panNo:any;
    gstNo:any;
    aadharNo:any;
    transactionCount:any
    userActivityID:any;
    userIPAddress:any;
    recordType:any;
    createdBy:any;
    createdDate:any;
    lastModifiedBy:any;
    lastModifiedDate:any;
   
}

export class ContactsEntityTO{
    contactID:any
    contactStatus:String;
    contactType:any;
    businessName:String;
    firstName:String;
    lastName:String;
    transactionCount:any;
    
}
export class DeleteRecords{
    id:any;
    modifiedBy:any;
    transactionCount: any;

  }


