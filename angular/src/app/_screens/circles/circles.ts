import { SelectItem } from "primeng/components/common/selectitem";

export class Circle{
    circleID: any;
    circleName: String;
    circleStatus:String;
    lastModifiedBy:any;
    createdBy:any;
    recordType:any;
    createdDate:any;
    lastModifiedDate:any;
    transactionCount:any;
}
export class CircleEntityTO{
    circleID: any;
    circleName: String;
    circleStatus:any;
    transactionCount:any;
}

export class DeleteRecords{
    id:any;
    modifiedBy:any;
    transactionCount: any;
  }