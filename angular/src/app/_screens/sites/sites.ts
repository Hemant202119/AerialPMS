export class SiteBean{
    siteID:any;
	accountID:any;
	siteName: String;
	siteCode:String;
	siteTypeListID:any;
	siteStatus:any;
	address1:String;
    address2:String;
    city:String;
    state:String;
    country:String;
    zipCode:String;
    workPhone:String;
    faxPhone:String;
    emailID:String;
    parentSiteID:any;
    notes:String;
    transactionCount:any;
    recordType:any;
    createdBy:any;
    createdDate:any;
    lastModifiedBy:any;
    lastModifiedDate:any;
}

export class SiteEntityTO{
    siteID:any;
	siteName: String;
	siteCode:String;
    city:String;
    state:String;
    country:String;
    siteTypeValue:String;   
    siteStatus:String;
    transactionCount:any;
   
}
