export class ReportBean {
    allocationDate: Date;
    completionDate: Date;
    contactID: any;
    contact:any;
    circle:any;
    circleID: any;
    siteType:any;  
    siteTypeID:any;
    userID:any;

}export class ReportTo{
    circleName:string;
    customerName: string;
    siteID: string;
    siteType: string;
    allocationDate: Date;
    projectStatus: string;
    statusDate: Date;
    customerPOAmount: any;
    supplierPOAmount: any;
    contractorPOAmount: any;
    totalPOAmount: any;
    contractorFRAmount: any;
    supplierFRAmount: any;
    totalFRAmount: any;
    supplierBoqTotal: any;
}

export class MISReportTO{
circleName:string;
customerName:string;
siteName:string;
siteID:string;
siteType:string;
allocationDate:Date;
statusDate:Date;
projectStatus:String;
customerPOTotal:any;
customerInvoiceAmount:any;
supplierBudgetTotal:any;
supplierPOTotal:any;
supplierPendingBudgetUtilisation:any;
contractorPOTotal:any;
pototal:any;
fundRequestedTotal:any;
fundReleasedTotal:any;
fundNotReleased:any;
fundReleasedInvoicePending:any;
invoiceGSTAmount:any;
invoiceBasicAmount:any;
}

