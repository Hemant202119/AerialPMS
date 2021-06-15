export class User {
    _id: string;
    username: any;
    password: any;
    firstName: string;
    lastName: string;
}

export class CurrentUser {
  public accountID:any;
  public userID: any;
  public firstName: String;
  public lastName: String;
  public username: String;
  public defaultTheme:String;
  constructor() { }
}

export class AccountUsers{
  accountUserID:any;
	accountID:any;
	roleID:any;
	userID:any;
  siteID:any;
  accountName:String;
  roleName:String;
  loginName:String;
	 customValue1:string;

}


export class RoleRights{
  roleRightID:any;
	roleID:any;
	menuID:any;
  viewAccess:any;
	insertAccess:any;
	updateAccess:any;
	deleteAccess:any;
  printAccess:any;
  exportAccess:any;
  menuName:String;
  accountId:any;
}

export class PayloadBean {
   id:any;
   accountId: any;
   signatureKey: String;
   searchParameter:String;
   custom1:String;
   customParameter:String;
   
}



export interface DropDown {
  value: string;
}
  
  export class DrawingTypeEnityTO {
    drawingTypeID: any;
    drawingTypeName: string;  
  }

  export class ExecutionModelsEntityTO {
    execModelID: any;
    execModelName: string;  
  }
  export class ProjectCategories {
    categoryID: any;
    categoryName: string;  
  }

  export class Contacts {
    contactID: any;
    contactType: string;  
    businessName: string;  
  }

  export class AutoLookup {
    id: any;
    value: string;  
  }

  export class DeleteRecords{
    id:any;
    modifiedBy:any;
    transactionCount:any;
  }

  export class parameterListDropDown {
    id: any;
    value: string; 
    code:string; 
  }

  export class UserEntityTO{
    userID:any;
   loginName:String;
 }



