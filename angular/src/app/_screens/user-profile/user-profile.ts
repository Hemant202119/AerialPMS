export class UserProfile{
    // User Information Tab
    userID:any;
    accountID:any;
    loginName:any;
    title: String;
    firstName:String;
    middleName:String;
    lastName:String;
    gender:any;
    userType:any;
    userStatus:any;
    birthDate:Date;

    // Contact Information Tab
    address1:any;
    address2:any;
    city:String;
    state:String;
    otherState:String;
    ZIPCode:any;
    country:String;
    homePhone:any;
    mobilePhone:any;
    workPhone:any;
    faxPhone: any;
    emailAddress:any;

    // Credentials Information

    password:String;
    currentPassword:String
    newPassword:String;
    confirmNewPassword:String;
    changePasswordflag:boolean;

    // Security Question
    securityQuestion:String;
    securityAnswer:String

    // Change Default Settings
    defaultRoleID:any;
    defaultSiteID:any;
    defaultMenuID:any;
    defaultTheme:any;
    
    //For Internal Details
    customValue1:String;
    customValue2:String;
    customValue3:String;
    customValue4:String;
    transactionCount:any;
    userIPAddress:any;
    recordType: String;
    createdBy: Date ;
    createdDate: Date;
    lastModifiedBy: any;
    lastModifiedDate: Date;
}

export class UserProfileTO{
    accountID:any;
    accountName:String;
    roleID:any;
    roleName:any;
    siteID:any;
    siteName:any;

}