interface parameter {
    name: string;
    
  }

  export interface Statuses {
    statusName?: string;
    statusId: any;
    statusCode?: string;
    statusType?: string;
   
}

export class Applicationparameter {
    parameterID:any;
    accountID:any;  
    parameterStatusID:any;
    parameterTypeStatusId:any;  
    parameterDataTypeStatusId:any;
    parameterName: string;
    parameterCode:string;
    parameterDesc:string;
    parameterLength:string;
    parameterMinvalue:string;
    parameterMaxvalue:string;
    parameterDecimalLength:string;
    parameterDateFormat:string;
    submitted:boolean = false;
    parameterDataTypeValue:Statuses;
    parameterTypeValue:Statuses;
    parameterStatus:Statuses;
    transactionCount:any;
    recordType:any;
    createdBy:any;
    createdDate:any;
    lastModifiedBy:any;
    lastModifiedDate:any; 
    }



