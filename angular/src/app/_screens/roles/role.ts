export class RoleBean{

    roleID:any;
	accountID:any;
	roleName: string;
	roleDesc:string;
	roleStatus:string;
    transactionCount:any;
    recordType:any;
    createdBy:any;
    createdDate:any;
    lastModifiedBy:any;
    lastModifiedDate:any;

    roleRightList:any;
}

export class roleEntityTO{

    roleID:any;
    roleName:String;
    roleDesc:String;
    roleStatus:String;
    transactionCount:any;

}

export class addRoleEntityTO{

    roleID:any;
    roleName:String;
    roleDescription:String;
    roleStatusValue:String;
    transactionCount:any;

}



