import { Statuses } from "../../_models/applicationparameter";

export class ApplicationParameter {
    parameterID: any;
    //accountID:any;  
    parameterStatus: String;
    parameterType: String;
    parameterDataType: String;
    parameterName: String;
    parameterCode: String;
    parameterDesc: String;
    parameterLength: any;
    parameterMinValue: any;
    parameterMaxValue: any;
    parameterDecimalLength: any;
    parameterDateFormat: any;
    submitted: boolean = false;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
}

export class ApplicationParameterEntityTO {
    parameterID: any;
    // accountID:any;  
    parameterStatus: String;
    parameterType: String;
    parameterDataType: String;
    parameterName: String;
    parameterCode: String;
    transactionCount: any;
}

export class ParameterListBean {
    parameterListID: any;
    parameterID: any;
    parameterListCode: String;
    parameterListValue: String;
    parameterListDesc: String;
    parameterListSequence: String;
    customValue1: String;
    customValue2: String;
    customValue3: String;
    customValue4: String;
    parameterListStatus: String;
    remarks: any;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
}

export class ParameterListEntityTO {
    parameterListID:any;
    parameterID:any;
    parameterListCode:String;
    parameterListValue:String;
    parameterListStatus:String;
    transactionCount:any;
}

export class ParameterValueBean {
    parameterValueID: any;
    parameterID: any;
    parameterValue: String;
    parameterBinaryValue: String;
    parameterListID: any;
    parameterValueDescription: String;
    parameterValueStatus: any;
    customValue1: String;
    customValue2: String;
    customValue3: String;
    customValue4: String;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
}

export class ParameterValueTO {
    parameterValueID: any;
    parameterValue: string;
    parameterBinaryValue: String;
    parameterValueDescription: String;
    customValue1:String;
    customValue2:String;
}



