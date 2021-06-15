export const appConfig = {
  API_END_POINT: 'http://192.168.5.232:8080/ediosCDF/api/',
  //  API_END_POINT: 'http://192.168.5.51:8081/ediosCDF/api/',
  //  API_END_POINT: 'http://192.168.5.112:58080/ediosCDF/api/',
// API_END_POINT: 'http://192.168.5.81:58080/Aerial/api/',
 //API_END_POINT: 'http://103.27.232.18:58080/AerialTest/api/',
// API_END_POINT: 'http://103.27.232.18:58081/AerialProduction/api/',
  ALL_STATUS_LABEL: 'All',
  privateKey: "PfngA5S5H5"
};

export const messageConfig = {
  deleteWarning: 'Please select atleast one record.',
  deleteSuccess: 'Record deleted successfully.',
  AddSuccess: 'Record added successfully.',
  updateSuccess: 'Record updated successfully.',
  emailSuccess:"Email Sent successfully.",
  emailFailed:"Email Sending Failed."
};


export const appStatusConfig = {

  //For Project Version Number
   projectVersion: '2.4',
  //For Status
  activeId: '1',
  activeName: 'Active',
  activeCode: 'ACTIVE',

  inactiveId: '0',
  inactiveName: 'Inactive',
  inactiveCode: 'INACTIVE',

  allId: '2',
  allName: 'All',
  allCode: 'All',

  //For Parameter Type
  userParameter:'User Parameter',
  systemParameter:'System Parameter',

  //For Parameter Data Type
  binary:'Binary',
  date:'Date',
  double:'Double',
  list:'List',
  number:'Number',
  string:'String',
  time:'Time',
    //For PO Approval 
  contractor:'Contractor',
  supplier: 'Supplier',

   //For User Profile
   genderMale:'Male',
   genderFemale:'Female',
   userTypeSystem:'System',
   UserTypeNonSystem: 'Non System',
};

export const routeConfig = {
  //url : Menu Name (Hard Coded)

  siteMenu:'SITES',
  parameterMenu:'APP_PARAMETERS',
  circleMenu:'CIRCLES',
  contactMenu:'CONTACTS',
  roleMenu:"ROLES",
  userMenu:"USERS",
  addProjectMenu:"ADD_PROJECT",
  viewProjectMenu:"VIEW_PROJECT",
  siteStatusReport:"SITE_STATUS_REPORT",
projectStatusReport:"PROJECT_STATUS_REPORT",
assetMenu: "MANAGE_ASSETS",
recieveItemMenu: 'RECEIVE_ITEMS',
useItemsMenu: 'USE_ITEMS'
}

export class Constants {
  //for interpolation tag
  static readonly DATE_FMT = 'dd-MMM-yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm a`;
  //for ts file
  static readonly DATE_FMT_TS = 'dd-M-yy';
  static readonly DATE_TIME_FMT_TS = `${Constants.DATE_FMT_TS} hh:mm a`;
}

