export class UserBean{
    userID:any;	
	title:any;	
	userName:any;
	firstName:String;	
	middleName:String;
	lastName:String;
	accountID:any;	
	siteID:any;
	roleID:any;
	//private WidgetFieldValueBean maritalStatusValueID;	
	gender:any;	
	birthDate:any;	
	//private WidgetFieldValueBean bloodGroupValueID;	
	address1:String;
	address2:String;
	city:String;	
	state:String;
	country:String;	
	ZIPCode:any;	
	homePhone:any;	
	workPhone:any;	
	mobilePhone:any;	
	faxPhone:any;	
	emailAddress:String;	
	loginName:any;	
	password:any;	
	confirmPassword:any;
	passwordResetFlag:any;	
	loginFlag:any;	
	securityQuestion:any;	
	securityAnswer:any;	
	loginFailedTries:any;
	
	defaultSiteID:any;
	defaultRoleID:any;
	
	defaultMenuID:any;	
	defaultThemeValueID:any;	
	passwordExpiryDays:any;	
	passwordExpiryDate:any;	
	passwordChangedDate:any;	

	sessionTimeoutMin:any;	
	userType:any;	
	transactionCount:any;	
	userIPAddress:any;	
	recordType:any;	
	createdBy:any;
	createdDate:any;
	lastModifiedBy:any;
	lastModifiedDate:any;
	sessionID:any;
	otherState:String;
	userStatus:string;
	manuale:any;
	userRoleList:any[];
	defaultTheme:any;
	emailCredentials:boolean;
	emailCredentialsFlag:boolean;
	customValue1:String;
}

export class UserEntityTO{
    userID:any;
	firstName:String;	
	middleName:String;
	lastName:String;
	accountID:any;		
	emailAddress:String;	
	loginName:any;	
	userStatus:String;
	
}
