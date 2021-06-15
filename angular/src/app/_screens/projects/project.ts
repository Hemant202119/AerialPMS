
import { DateFormatPipe } from "../../_core/date-format";

export interface Statuses {
    statusName?: string;
    statusId: any;
    statusCode?: string;
    statusType?: string;

}

export class InvoiceDetails {
    idID: any;
    poID: any;
    invoiceDate: Date;
    invoiceAmount: any;
    gst: any;
    totalAmount: any;
    invoiceNo: string;
    notes: string;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;

}

export class InvoiceDetailsTO {
    idID: any;
    invoiceDate: Date;
    invoiceAmount: any;
    totalAmount: any;
    gst: any;
    invoiceNo: string;
    notes: string;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;

}

export class CustomerPOs {
    poID: any;
    projectID: any;
    contactID: any;
    customerName: string;
    poNo: string;
    poDate: Date;
    activityType: String;
    basicAmount: any;
    taxAmount: any;
    totalAmount: any;
    invoiceStatus: string;
    poStatus: string;
    activityTypeListID: any;
    notes: string;
}

export class ContractorPOs {
    poID: any;
    projectID: any;
    contactID: any;
    businessName: string;
    poDate: Date;
    poNo: string;
    basicAmount: any;
    taxAmount: any;
    totalAmount: any;
    poStatus: string;
    frStatus: string;
    paymentStatus: string;
    invoiceStatus: string;

    //customerName:string;
    // circleName:string;
    // siteName:string;
    // siteID:any;
    notes: string;
    activityTypeListID: any;
    //for v2.2
    boqItemName: string;
}



export class ProjectStatus {
    projectStatusID: any;
    projectID: any;
    statusListID: any;
    statusDate: Date;
    notes: string;
    statusName: string;
    newStatusdate: any;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
}



export class Project {
    projectID: any;
    contactID: any;
    circleID: any;
    projectName: string;
    customerName: string;
    circleName: string;
    categoryName: string;
    execModelName: string;
    drawingTypeName: string;
    categoryID: any;
    execModelID: any;
    drawingTypeID: any;
    siteName: string;
    siteID: string;
    allocationDate: Date;
    completionDate: Date;
    statusDate: Date;
    statusListID: any;
    siteTypeListID: any;
    zone: string;
    status: string;
    address: string;
    city: string;
    district: string;
    longitude: string;
    latitude: string;
    height: string;
    atAgency: string;
    notes: string;

    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
}

//Supplier PO Class
export class SupplierPOs {
    poID: any;
    projectID: any;
    contactID: any;
    businessName: string;
    activityType: String;
    activityTypeListID: any;
    poDate: Date;
    poNo: string;
    drawingTypeName: string;
    basicAmount: any;
    taxAmount: any;
    totalAmount: any;
    poStatus: string;
    invoiceNo: string;
    invoiceStatus: string;
    frStatus: string;
    paymentStatus: string;
    notes: string;
    createdBy: any;
    lastModifiedBy: any;
    purchaseOrderItemList: any[];
    //for v2.2
    boqItemName: string;

}

//DrawingItems PO Class
export class DrawingItems {
    itemID: any;
    poItemID: any;
    itemName: String;
    itemQty: any;
    itemUnitRate: any;
    itemUnitTax: any;
    itemUnit: string;
    qtyApprovedforProcurement: string;
    newProcurementQty: any;
    budgetAmount: any;
    alreadySpent: any;
    currentUnitRate: any;
    currentUnitGST: any;
    amount: any;
    NewQtyFieldValue: any;
    createdBy: any;
    lastModifiedBy: any;
}
export class FRDetails {
    frID: any;
    poID: any;
    frDate: Date;
    frAmount: any;
    emailAddresses: string;
    notes: string;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;

}
export class FRDetailsTO {
    frID: any;
    poID: any;
    frDate: Date;
    frAmount: any;
    notes: string;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;

}
export class PaymentDetails {
    pdID: any;
    poID: any;
    paymentDate: Date;
    paymentAmount: any;
    paymentTypeListID: any;
    paymentParticulars: string;
    notes: string;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;

}

export class PaymentDetailsTO {
    pdID: any;
    poID: any;
    paymentDate: Date;
    paymentAmount: any;
    paymentTypeValue: string;
    notes: string;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
    addition:any;

}

export class BOQBean {
    projectID: any;
    boqID: any;
    boqdate: Date;
    boqUserName: string;
    totalBoqAmount: any;
    grandTotalOfBOQ: any;
    boqNotes: string;
    transactionCount: any;
    recordType: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
    purchaseOrderItemList: any[];

}

