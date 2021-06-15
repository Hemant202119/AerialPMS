webpackJsonp(["viewProject.modules"],{

/***/ "./src/app/_screens/projects/add-project/add-project.component.css":
/***/ (function(module, exports) {

module.exports = ".bold-icon{\r\n    font-weight: bold;\r\n}\r\n.status-date{\r\n    width: 8.25em !important;\r\n    text-align: center !important;\r\n}\r\n.status-name{\r\n    width: 8.25em !important;\r\n    text-align: center !important;\r\n}\r\n.status-note{\r\n    width:20.25em !important;\r\n}\r\n.dialog-Control{\r\n    top:60px !important;    \r\n}\r\n.ui-table-scrollable-header.ui-widget-header{\r\n    margin-right: 17px !important; margin-left: 0px;\r\n}\r\n.custom-overlay{\r\n    width:100vw;\r\n    height:100vh;\r\n    top:0px;\r\n    left:0px;\r\n    bottom: 0px;\r\n    position: absolute;\r\n    pointer-events: none;\r\n    z-index:99999999;\r\n}\r\n.custom-overlay:before{\r\n    content:'';\r\n    width:100%;\r\n    height:100vh;\r\n    position:absolute;\r\n    top:0;\r\n    left:0;\r\n    bottom: 0px;\r\n    opacity:0.8;\r\n    pointer-events: auto;\r\n    background-color: #ccc;\r\n}\r\n.sendingEmail{\r\n    background-image: url('sending-mail.d067e0c6aeb4b7269667.gif');\r\n    width:244px;\r\n    height:127px;\r\n    z-index:9999999999;\r\n    position: absolute;\r\n    top:50%;\r\n    left:50%;\r\n    -webkit-transform:translate(-50%,-50%);\r\n            transform:translate(-50%,-50%);\r\n}\r\n/** Dialog for All **/\r\n/* p-dialog.dialog-Control.height-control .ui-dialog.ui-widget.ui-widget-content[role=\"dialog\"]{\r\n    top:15px !important;\r\n} */\r\n.dialog-Control.height-control .ui-dialog{\r\n    top:15px !important;\r\n}\r\n.ui-g-11.ui-md-2{\r\nheight: 2%\r\n}"

/***/ }),

/***/ "./src/app/_screens/projects/add-project/add-project.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12\">\n            <div class=\"ui-g-12\">\n                <div class=\"card no-margin\">\n                    <h1>{{breadLabel}}</h1>\n                    <p-tabView (onChange)=\"onTabChange($event)\">\n                        <!-- Edit Project Tab -->\n                        <p-tabPanel header=\"Projects\" id=\"pro\" leftIcon=\"fa-check\">\n                            <form novalidate #f=\"ngForm\" (ngSubmit)=\"addProjectData()\">\n                                <div class=\"ui-g form-group\">\n                                    <div class=\"ui-g-12 ui-md-6\">\n\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <div class=\"ui-g-12 ui-md-4\"></div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/projects\"></button>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <button type=\"submit\" pButton label=\"Save\" icon=\"fa fa-check\" [disabled]=\"editFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess)\"></button>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"customer-name\">Customer Name*</label>\n                                            <p-autoComplete [(ngModel)]=\"project.contactID\" [suggestions]=\"filteredContactsSingle\" (completeMethod)=\"filterContactSingle($event)\"\n                                                [size]=\"30\" [readonly]=\"editFlag\" [minLength]=\"1\" placeholder=\"Hint: type any letter\"\n                                                #customerName=\"ngModel\" field=\"businessName\" name=\"customerName\" dropdown=\"cagatay\"\n                                                [forceSelection]=\"true\" (onSelect)=\"circlesOfParticularCustomer($event)\">\n                                            </p-autoComplete>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"circle-name\">Circle Name*</label>\n                                            <p-autoComplete [(ngModel)]=\"project.circleID\" [suggestions]=\"filteredCirclesSingle\" (completeMethod)=\"filterCircleSingle($event)\"\n                                                [size]=\"30\" [readonly]=\"editFlag\" [minLength]=\"1\" placeholder=\"Hint: type any letter\"\n                                                #circleName=\"ngModel\" field=\"circleName\" name=\"circleName\" dropdown=\"cagatay\"\n                                                [forceSelection]=\"true\">\n                                            </p-autoComplete>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"project-name\">Project Name*</label>\n                                            <input id=\"project-name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.siteName\" #projectName=\"ngModel\"\n                                                [readonly]=\"true\" name=\"projectName\" maxlength=\"50\" ng-required=\"true\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"project-category\">Project Category*</label>\n                                            <p-autoComplete [(ngModel)]=\"project.categoryID\" [suggestions]=\"filteredProjectCategoriesSingle\" (completeMethod)=\"filterProjectCategorySingle($event)\"\n                                                [readonly]=\"editFlag\" [size]=\"30\" [minLength]=\"1\" placeholder=\"Hint: type any letter\"\n                                                dropdown=\"cagatay\" #categoryName=\"ngModel\" name=\"categoryName\" field=\"categoryName\"\n                                                [forceSelection]=\"true\">\n                                            </p-autoComplete>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"execution-model\">Execution Model*</label>\n                                            <p-autoComplete [(ngModel)]=\"project.execModelID\" [suggestions]=\"filteredExecutionModelsSingle\" (completeMethod)=\"filterExecutionModelSingle($event)\"\n                                                [size]=\"30\" [readonly]=\"editFlag\" [minLength]=\"1\" placeholder=\"Hint: type any letter\"\n                                                dropdown=\"cagatay\" #execModelName=\"ngModel\" field=\"execModelName\" name=\"execModelName\"\n                                                [forceSelection]=\"true\" (onSelect)=\"drawingTypeValues(project.execModelID)\">\n                                            </p-autoComplete>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"drawing-type\">Drawing type*</label>\n                                            <p-autoComplete [(ngModel)]=\"project.drawingTypeID\" [suggestions]=\"filteredDrawingTypesSingle\" (completeMethod)=\"filterDrawingTypeSingle($event)\"\n                                                [size]=\"30\" [readonly]=\"editFlag\" [minLength]=\"1\" placeholder=\"Hint: type any letter\"\n                                                dropdown=\"cagatay\" #drawingTypeName=\"ngModel\" field=\"drawingTypeName\" name=\"drawingTypeName\"\n                                                [forceSelection]=\"true\">\n                                            </p-autoComplete>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"site-ID\">Site ID*</label>\n                                            <input id=\"site-ID\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.siteID\" #siteID=\"ngModel\" name=\"siteID\"\n                                                maxlength=\"30\" ng-required=\"true\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"site-name\">Site Name*</label>\n                                            <input id=\"site-name\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.siteName\" #siteName=\"ngModel\"\n                                                name=\"siteName\" maxlength=\"50\" ng-required=\"true\">\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"allocation-date\">Allocation Date*</label>\n\n                                            <p-calendar id=\"allocation-date\" [dateFormat]=\"dateFormat\" readonlyInput=\"true\" placeholder=\"Date\" (onSelect)=\"setCurrentDateValue()\"\n                                                [(ngModel)]=\"project.allocationDate\" #allocationDate=\"ngModel\" name=\"allocationDate\"\n                                                [showIcon]=\"true\" [disabled]=\"editFlag\"></p-calendar>\n\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"completion-date\">Completion Date</label>\n                                            <p-calendar id=\"completion-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" readonlyInput=\"true\" [showIcon]=\"true\" [(ngModel)]=\"project.completionDate\"\n                                                #completionDate=\"ngModel\" name=\"completionDate\"></p-calendar>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"status-date\">Current Status Date*</label>\n                                            <p-calendar id=\"status-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" [disabled]=\"true\" [(ngModel)]=\"project.statusDate\"\n                                                #statusDate=\"ngModel\" [showIcon]=\"true\" name=\"statusDate\"></p-calendar>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"current-status\">Current Status*</label>\n                                            <p-dropdown autoWidth=\"false\" [options]=\"statusValueList\" [(ngModel)]=\"project.statusListID\" name=\"aaa\" optionLabel=\"parameterListValue\"\n                                                [autoWidth]=\"false\" [readonly]=\"true\" #aaa=\"ngModel\"></p-dropdown>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"site-type\">Site Type*</label>\n                                            <p-dropdown autoWidth=\"false\" [options]=\"siteTypeListv\" [(ngModel)]=\"project.siteTypeListID\" name=\"bbb\" optionLabel=\"parameterListValue\"\n                                                [autoWidth]=\"false\" #bbb=\"ngModel\" placeholder=\"Select an option\"></p-dropdown>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"zone\">Zone</label>\n                                            <input id=\"zone\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.zone\" #zone=\"ngModel\" name=\"zone\"\n                                                maxlength=\"30\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-6\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <label for=\"address\">Address</label>\n                                                <input id=\"address\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.address\" #address=\"ngModel\"\n                                                    name=\"address\" maxlength=\"100\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"city\">City</label>\n                                            <input id=\"city\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.city\" #city=\"ngModel\" name=\"city\"\n                                                maxlength=\"30\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"district\">District</label>\n                                            <input id=\"district\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.district\" #district=\"ngModel\"\n                                                name=\"district\" maxlength=\"30\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"longitude\">Longitude</label>\n                                            <input id=\"longitude\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.longitude\" #longitude=\"ngModel\"\n                                                name=\"longitude\" maxlength=\"20\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"latitude\">latitude</label>\n                                            <input id=\"latitude\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.latitude\" #latitude=\"ngModel\"\n                                                name=\"latitude\" maxlength=\"20\">\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"height\">Height</label>\n                                            <input id=\"height\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.height\" #height=\"ngModel\" name=\"height\"\n                                                maxlength=\"30\">\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-3\">\n                                            <label for=\"atAgency\">AT Agency</label>\n                                            <input id=\"atAgency\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"project.atAgency\" #atAgency=\"ngModel\"\n                                                name=\"atAgency\" maxlength=\"50\">\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-12\">\n                                            <label for=\"notes\">Notes</label>\n                                            <textarea id=\"notes\" [rows]=\"5\" [cols]=\"30\" pInputTextarea autoResize=\"autoResize\" [(ngModel)]=\"project.notes\" #notes=\"ngModel\"\n                                                autocomplete=\"off\" name=\"notes\" maxlength=\"500\"></textarea>\n                                        </div>\n                                    </div>\n                                </div>\n                            </form>\n\n                        </p-tabPanel>\n                        <!-- Budget Ordered Quantity Tab -->\n                        <p-tabPanel header=\"Project BOQ\" leftIcon=\"fa-check\" *ngIf=\"this.editFlag\" [disabled]=\"tabFlag1\">\n                            <div class=\"ui-g form-group\">\n\n                                <!-- <div class=\"ui-g-12 ui-md-12\">\n                                                        \n                                                </div> -->\n                                <div class=\"ui-g-12 ui-md-2\">\n\n                                </div>\n                                <div class=\"ui-g-12 ui-md-6\">\n                                    <h2 class=\"center-align\">{{project.contactID.businessName}}&nbsp;({{project.siteName}}-{{project.siteID}})&nbsp;{{project.categoryID.categoryName}}</h2>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/projects\"></button>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"submit\" pButton label=\"Add Project BOQ\" icon=\"fa fa-check\" (click)=\"showDialogToAddBOQ()\" [disabled]=\"!roleRightsGuard.roleRights.insertAccess\"></button>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class=\"ui-g form-group\">\n                                <div class=\"ui-g-12 ui-md-10\">\n                                </div>\n                                <div class=\"ui-g-12 ui-md-2\">\n                                    <label>Grand Total Amount :</label>\n                                    {{boqBeanObject.grandTotalOfBOQ}}\n                                </div>\n\n                            </div>\n                            <div class=\"card card-w-title\">\n                                <p-table #boq [value]=\"boqtableSearch\" scrollable=\"true\" scrollHeight=\"200px\" [columns]=\"boqCols\" [paginator]=\"true\" [rows]=\"5\"\n                                    [rowsPerPageOptions]=\"[5,10,15]\" [responsive]=\"true\">\n                                    <ng-template pTemplate=\"header\" let-columns>\n                                        <tr>\n                                            <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\" [ngClass]=\"col.class\">\n                                                {{col.header}}\n                                                <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                            </th>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                        <tr [pSelectableRow]=\"rowData\">\n                                            <td class=\"status-date\">\n                                                <button type=\"button\" title=\"View Project BOQ\" (click)=\"editProjectBOQ(rowData.boqID)\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.viewAccess\"\n                                                    pButton></button>&nbsp;&nbsp; {{rowData.boqdate | dateFormat}}\n                                            </td>\n                                            <td class=\"status-name \">{{rowData.totalBoqAmount}}</td>\n                                            <td class=\"status-name \">{{rowData.boqUserName}}</td>\n                                            <td class=\"status-note\">{{rowData.boqNotes}}</td>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"emptymessage\" let-columns>\n                                        <tr>\n                                            <td [attr.colspan]=\"columns.length\">\n                                                No records found\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n                                </p-table>\n                            </div>\n                            <p-dialog [header]=\"projectStatusDialogHeader\" [(visible)]=\"displayProjectBOQDialog\" [responsive]=\"true\" showEffect=\"fade\"\n                                [modal]=\"true\" [width]=\"1270\" [contentStyle]=\"{'max-height':'650px','height':'auto'}\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"addProjectBOQ()\" style=\"width:100%;\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-2\"></div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <h2 class=\"center-align\">{{project.contactID.businessName}}&nbsp;({{project.siteName}}-{{project.siteID}})&nbsp;{{project.categoryID.categoryName}}</h2>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"boqEditFlag\" [disabled]=\"boqEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess)\"></button>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"boq-date\">Date*</label>\n                                                    <p-calendar id=\"po-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"boqBeanObject.boqdate\"\n                                                        #boqdate=\"ngModel\" name=\"boqdate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-9\">\n                                                    <label for=\"status-notes\">Notes</label>\n                                                    <input id=\"invoice-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"boqBeanObject.boqNotes\" #boqNotes=\"ngModel\"\n                                                        name=\"boqNotes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <p-table [value]=\"boqDrawingItems\" scrollable=\"true\" scrollHeight=\"200px\" [columns]=\"boqcolsTwo\" dataKey=\"itemID\" [paginator]=\"true\"\n                                            [rows]=\"10\" [(selection)]=\"selectedboqDrawingItems\" [rowsPerPageOptions]=\"[10,20,30]\"\n                                            [responsive]=\"true\" (onRowSelect)=\"onBOQRowSelect()\" (onRowUnselect)=\"onBOQRowUnSelect($event)\">\n\n                                            <ng-template pTemplate=\"header\" let-columns>\n                                                <tr>\n                                                    <th style=\"width: 3.25em\" *ngIf=\"!boqEditFlag\">\n                                                    </th>\n                                                    <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                        {{col.header}}\n                                                        <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n\n                                                    </th>\n                                                </tr>\n                                            </ng-template>\n                                            <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                                <tr [pSelectableRow]=\"rowData\">\n                                                    <td style=\"width:46px;\" *ngIf=\"!boqEditFlag\">\n                                                        <p-tableCheckbox [value]=\"rowData\"></p-tableCheckbox>\n                                                    </td>\n                                                    <td>{{rowData.itemName}}</td>\n                                                    <td class=\"center-align \">{{rowData.itemUnit}}</td>\n                                                    <td class=\"center-align \">{{rowData.itemQty}}</td>\n                                                    <td *ngIf=\"boqEditFlag\" class=\"center-align \">{{rowData.itemUnitRate}} </td>\n                                                    <td pEditableColumn *ngIf=\"!boqEditFlag\">\n                                                        <p-cellEditor>\n                                                            <ng-template pTemplate=\"input\">\n                                                                <input type=\"text\" pInputText [(ngModel)]=\"rowData.itemUnitRate\" #itemUnitRate=\"ngModel\" autocomplete=\"off\" name=\"itemUnitRate\"\n                                                                    maxlength=\"20\" (keyup)=\"onBOQRowSelect()\" [readonly]=\"rowData.newProcurementQty==null\">\n                                                            </ng-template>\n                                                            <ng-template pTemplate=\"output\">\n                                                                <span style=\"line-height: 30px;\"> {{rowData.itemUnitRate}} </span>\n                                                                <button type=\"button\" title=\"Edit Suplier\" icon=\"fa fa-edit\" pButton></button>\n                                                            </ng-template>\n                                                        </p-cellEditor>\n                                                    </td>\n\n\n                                                    <td class=\"center-align \">{{rowData.budgetAmount}}</td>\n                                                    <!-- <td>{{rowData.qtyApprovedforProcurement}}</td>  \n                                                          <td>{{rowData.alreadySpent}}</td>   -->\n                                                    <td pEditableColumn *ngIf=\"!boqEditFlag\">\n                                                        <p-cellEditor>\n                                                            <ng-template pTemplate=\"input\">\n                                                                <input type=\"text\" pInputText [(ngModel)]=\"rowData.newProcurementQty\" #newProcurementQty=\"ngModel\" autocomplete=\"off\" name=\"newProcurementQty\"\n                                                                    maxlength=\"20\" (keyup)=\"onBOQRowSelect()\" [readonly]=\"rowData.newProcurementQty==null\">\n                                                            </ng-template>\n                                                            <ng-template pTemplate=\"output\">\n                                                                <span style=\"line-height: 30px;\"> {{rowData.newProcurementQty}} </span>\n                                                                <button type=\"button\" title=\"Edit Suplier\" icon=\"fa fa-edit\" pButton></button>\n                                                            </ng-template>\n                                                        </p-cellEditor>\n                                                    </td>\n                                                    <!-- <td>{{rowData.currentUnitRate}}</td>\n                                                            <td>{{rowData.currentUnitGST}}</td>\n                                                             <td>{{rowData.amount}}</td>New Amt -->\n                                                </tr>\n                                            </ng-template>\n                                            <ng-template pTemplate=\"emptymessage\" let-columns>\n                                                <tr>\n                                                    <td [attr.colspan]=\"columns.length\">\n                                                        No records found\n                                                    </td>\n                                                </tr>\n                                            </ng-template>\n                                        </p-table>\n\n\n                                    </form>\n                                </div>\n                            </p-dialog>\n                        </p-tabPanel>\n\n\n                        <!-- Project Status Tab                        -->\n                        <p-tabPanel header=\"Project Status\" leftIcon=\"fa-check\" *ngIf=\"this.editFlag\">\n                            <div class=\"ui-g form-group\">\n\n                                <!-- <div class=\"ui-g-12 ui-md-12\">\n                                                          \n                                                  </div> -->\n                                <div class=\"ui-g-12 ui-md-2\">\n\n                                </div>\n                                <div class=\"ui-g-12 ui-md-6\">\n                                    <h2 class=\"center-align\">{{project.contactID.businessName}}&nbsp;({{project.siteName}}-{{project.siteID}})&nbsp;{{project.categoryID.categoryName}}</h2>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/projects\"></button>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"submit\" pButton label=\"Add Project Status\" icon=\"fa fa-check\" (click)=\"showDialogToAdd()\" [disabled]=\"!roleRightsGuard.roleRights.insertAccess\"></button>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"card card-w-title\">\n                                <p-table #dt [value]=\"projectStatusesSearch\" [columns]=\"cols\" [paginator]=\"true\" [rows]=\"5\" scrollable=\"true\" scrollHeight=\"200px\"\n                                    [rowsPerPageOptions]=\"[5,10,15]\" [responsive]=\"true\">\n                                    <ng-template pTemplate=\"header\" let-columns>\n                                        <tr>\n                                            <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\" [ngClass]=\"col.class\">\n                                                {{col.header}}\n                                                <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                            </th>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                        <tr [pSelectableRow]=\"rowData\">\n\n                                            <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                <span *ngIf=\"idx == 0\">\n                                                    {{rowData[col.field] | dateFormat}}\n                                                </span>\n                                                <span *ngIf=\"idx > 0\">\n                                                    {{rowData[col.field]}}\n                                                </span>\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n\n                                </p-table>\n                            </div>\n                            <p-dialog [header]=\"projectStatusDialogHeader\" [(visible)]=\"displayProjectStatusDialog\" [responsive]=\"true\" showEffect=\"fade\"\n                                [modal]=\"true\" [width]=\"900\">\n\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"addProjectStatus()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"current-status-date\">Current Status Date*</label>\n                                                    <p-calendar id=\"current-status-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" [disabled]=\"editFlag\" [(ngModel)]=\"project.statusDate\"\n                                                        #currentStatusDate=\"ngModel\" [showIcon]=\"true\" readonlyInput=\"true\" name=\"currentStatusDate\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"current-status-project\">Current Status*</label>\n                                                    <p-dropdown autoWidth=\"false\" [options]=\"statusValueList\" [(ngModel)]=\"project.statusListID\" name=\"currentStatusValue\" optionLabel=\"parameterListValue\"\n                                                        [autoWidth]=\"false\" [readonly]=\"true\" #currentStatusValue=\"ngModel\"></p-dropdown>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"new-status-date\">New Status Date*</label>\n                                                    <p-calendar id=\"new-status-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" [(ngModel)]=\"projectStatuses.statusDate\" #newStatusDate=\"ngModel\"\n                                                        [showIcon]=\"true\" name=\"newStatusDate\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"new-status\">New Status*</label>\n                                                    <p-dropdown autoWidth=\"false\" [options]=\"statusValueList\" [(ngModel)]=\"projectStatuses.statusListID\" optionLabel=\"parameterListValue\"\n                                                        [autoWidth]=\"false\" name=\"newStatusValue\" #newStatusValue=\"ngModel\" placeholder=\"Select An Option\"></p-dropdown>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <label for=\"status-notes\">Notes</label>\n                                                    <textarea id=\"status-notes\" [rows]=\"5\" [cols]=\"30\" pInputTextarea autoResize=\"autoResize\" [(ngModel)]=\"projectStatuses.notes\"\n                                                        #statusNotes=\"ngModel\" name=\"statusNotes\" maxlength=\"500\"></textarea>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"editFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess)\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                            </p-dialog>\n                        </p-tabPanel>\n\n\n\n\n                        <!-- Customer POs Tab  -->\n                        <p-tabPanel header=\"Customer PO\" leftIcon=\"fa-check\" *ngIf=\"this.editFlag\" [disabled]=\"tabFlag2\">\n                            <div class=\"ui-g form-group\">\n                                <!-- <div class=\"ui-g-12 ui-md-12\">\n                                                          \n                                                     </div>                                                    -->\n                                <div class=\"ui-g-12 ui-md-2\">\n                                    <div class=\"ui-g-12\">\n                                        <!-- <button type=\"button\" pButton  label=\"Add Invoice\" icon=\"fa fa-check\" (click)=\"showAddInvoiceDialog()\"  ></button>  -->\n                                    </div>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-6\">\n                                    <h2 class=\"center-align\">{{project.contactID.businessName}}&nbsp;({{project.siteName}}-{{project.siteID}})&nbsp;{{project.categoryID.categoryName}}</h2>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/projects\"></button>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"submit\" pButton label=\"Add Customer PO\" icon=\"fa fa-check\" (click)=\"showPODialog()\" [disabled]=\"!roleRightsGuard.roleRights.insertAccess\"></button>\n                                    </div>\n                                </div>\n\n                            </div>\n\n\n                            <div class=\"card card-w-title\">\n                                <p-table #dt [value]=\"customerPOsearch\" [columns]=\"customerpocols\" scrollable=\"true\" scrollHeight=\"200px\" [paginator]=\"true\"\n                                    [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15]\" [responsive]=\"true\">\n                                    <ng-template pTemplate=\"header\" let-columns>\n                                        <tr>\n                                            <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                {{col.header}}\n                                                <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                            </th>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                        <tr [pSelectableRow]=\"rowData\">\n\n                                            <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                <span *ngIf=\"idx == 0\">\n                                                    <button type=\"button\" title=\"Edit Customer PO\" (click)=\"editCustomerPO(rowData[col.id])\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"\n                                                        pButton></button>&nbsp;&nbsp;{{rowData[col.field]}}\n                                                </span>\n                                                <span *ngIf=\"idx == 1\">\n                                                    {{rowData[col.field] | dateFormat}}\n                                                </span>\n                                                <span *ngIf=\"idx > 1 && idx != 6 \">\n                                                    {{rowData[col.field]}}\n                                                </span>\n                                                <span *ngIf=\"idx == 6\">\n                                                    <button type=\"button\" pButton icon=\"fa fa-edit\" [disabled]=\"oneTimeClick\" (click)=\"showAddInvoiceDialog(rowData)\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"></button>\n                                                    {{rowData[col.field]}}\n                                                </span>\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"emptymessage\" let-columns>\n                                        <tr>\n                                            <td [attr.colspan]=\"columns.length\">\n                                                No records found\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n                                </p-table>\n                            </div>\n\n                            <p-dialog header={{poDialogHeader}} [(visible)]=\"displayPODialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"AddPOs()\">\n                                        <div class=\"ui-g form-group\">\n\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"po-no\">PO No.*</label>\n                                                    <input id=\"po-no\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"customerPOs.poNo\" #poNo=\"ngModel\" name=\"poNo\"\n                                                        maxlength=\"20\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"po-date\">PO Date*</label>\n                                                    <p-calendar id=\"po-date\" [dateFormat]=\"dateFormat\" readonlyInput=\"true\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"customerPOs.poDate\"\n                                                        #poDate=\"ngModel\" name=\"poDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"basic-amount\">PO Amount*</label>\n                                                    <input id=\"basic-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"preparePOsTotal()\" [(ngModel)]=\"customerPOs.basicAmount\"\n                                                        #basicAmount=\"ngModel\" name=\"basicAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"gst\">GST Amount*</label>\n                                                    <input id=\"gst\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"customerPOs.taxAmount\" #gst=\"ngModel\" (keyup)=\"preparePOsTotal()\"\n                                                        name=\"gst\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"total-amount\">Total Amount</label>\n                                                    <input id=\"total-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"customerPOs.totalAmount\" #totalAmount=\"ngModel\"\n                                                        name=\"totalAmount\" maxlength=\"10\" pKeyFilter=\"int\" readonly>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"activity-type\">Activity Type*</label>\n                                                    <p-dropdown autoWidth=\"false\" [options]=\"activityTypeList\" [(ngModel)]=\"customerPOs.activityTypeListID\" optionLabel=\"parameterListValue\"\n                                                        [autoWidth]=\"false\" name=\"activityType\" #activityType=\"ngModel\" placeholder=\"Select An Option\"></p-dropdown>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <label for=\"po-notes\">Notes</label>\n                                                    <input id=\"po-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"customerPOs.notes\" #poNotes=\"ngModel\"\n                                                        name=\"poNotes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"CustomerPOsEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess)\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                            </p-dialog>\n                            <p-dialog header=\"{{invoiceDialogHeader}}\" [(visible)]=\"displayAddInvoiceDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\"\n                                [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"AddInvoice()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <h2 class=\"center-align\" *ngIf=\"this.poFlag\">\n                                                    <span></span>{{activityLabel}}&nbsp;(PO No.:{{customerPOs.poNo}} &nbsp;Dated:{{customerPOs.poDate\n                                                    | dateFormat}})</h2>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-no\">Invoice No.*</label>\n                                                    <input id=\"invoice-no\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.invoiceNo\" #invoiceNo=\"ngModel\"\n                                                        name=\"invoiceNo\" maxlength=\"20\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-date\">Invoice Date*</label>\n                                                    <p-calendar id=\"invoice-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.invoiceDate\"\n                                                        #invoiceDate=\"ngModel\" name=\"invoiceDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-amount\">Invoice Amount*</label>\n                                                    <input id=\"invoice-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"prepareInvoiceTotal()\" [(ngModel)]=\"invoiceDetails.invoiceAmount\"\n                                                        #invoiceAmount=\"ngModel\" name=\"invoiceAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"gst-amount\">GST Amount*</label>\n                                                    <input id=\"gst-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"prepareInvoiceTotal()\" [(ngModel)]=\"invoiceDetails.gst\"\n                                                        #invoiceGST=\"ngModel\" name=\"invoiceGST\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"tot-amount\">Total Amount</label>\n                                                    <input id=\"tot-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.totalAmount\" #invoiceTotal=\"ngModel\"\n                                                        readonly name=\"invoiceTotal\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-9\">\n                                                    <label for=\"invoice-notes\">Notes</label>\n                                                    <input id=\"invoice-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.notes\" #invoiceNotes=\"ngModel\"\n                                                        name=\"invoiceNotes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeInvoiceDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" [disabled]=\"(pendingInvoiceAmount=='0') || (InvoiceEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"\n                                                        label=\"Save\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <div class=\"ui-g\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total PO Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{customerPOs.totalAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Invoice Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{totalInvoiceAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Pending PO Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{pendingInvoiceAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"card card-w-title\">\n                                    <p-table #dt [value]=\"invoiceSearch\" [columns]=\"invoicecols\" scrollable=\"true\" scrollHeight=\"200px\" [paginator]=\"true\" [rows]=\"5\"\n                                        [rowsPerPageOptions]=\"[5,10,15]\" [responsive]=\"true\">\n                                        <ng-template pTemplate=\"header\" let-columns>\n                                            <tr>\n                                                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                    {{col.header}}\n                                                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                </th>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                            <tr [pSelectableRow]=\"rowData\">\n                                                <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                    <span *ngIf=\"idx == 0\">\n                                                        <button type=\"button\" title=\"Edit Invoice\" (click)=\"editInvoice(rowData[col.id])\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"\n                                                            pButton></button>&nbsp;&nbsp; {{rowData[col.field]}}\n                                                    </span>\n                                                    <span *ngIf=\"idx==1\">\n                                                        {{rowData[col.field] | dateFormat}}\n                                                    </span>\n                                                    <span *ngIf=\"idx > 1\">\n                                                        {{rowData[col.field]}}\n                                                    </span>\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"emptymessage\" let-columns>\n                                            <tr>\n                                                <td [attr.colspan]=\"columns.length\">\n                                                    No records found\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                    </p-table>\n                                </div>\n                                <div class=\"msg\">\n                                    <p-growl [value]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n                        </p-tabPanel>\n\n                        <!-- Contractor PO tab -->\n                        <p-tabPanel header=\"Contractor PO\" if=\"contractor-po\" leftIcon=\"fa-check\" *ngIf=\"this.editFlag\" [disabled]=\"tabFlag3\">\n                            <div class=\"ui-g form-group\">\n                                <!-- <div class=\"ui-g-12 ui-md-12\">\n                                                              \n                                                         </div>-->\n                                <div class=\"ui-g-12 ui-md-2\">\n                                    <div class=\"ui-g-12\">\n                                        <!-- <button type=\"button\" pButton  label=\"Add Invoice\" icon=\"fa fa-check\" (click)=\"showAddContractorPOInvoiceDialog()\"  ></button>  -->\n                                    </div>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-6\">\n                                    <h2 class=\"center-align bold-icon\">{{project.contactID.businessName}}&nbsp;({{project.siteName}}-{{project.siteID}})&nbsp;{{project.categoryID.categoryName}}</h2>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/projects\"></button>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"submit\" pButton label=\"Add Contractor PO\" icon=\"fa fa-check\" (click)=\"showContractorPODialog()\" [disabled]=\"!roleRightsGuard.roleRights.insertAccess\"></button>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"card card-w-title\">\n                                <p-table #dt [value]=\"contractorPOsearch\" [columns]=\"contractorpocols\" scrollable=\"true\" scrollHeight=\"200px\" [paginator]=\"true\"\n                                    [rows]=\"5\" [(selection)]=\"selectedContractorPOs\" [rowsPerPageOptions]=\"[5,10,15]\" [responsive]=\"true\">\n                                    <ng-template pTemplate=\"header\" let-columns>\n                                        <tr>\n                                            <!-- <th style=\"width: 3.25em\">                                                                                  \n                                                                                          </th>  -->\n\n                                            <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                {{col.header}}\n                                                <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                            </th>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                        <tr [pSelectableRow]=\"rowData\">\n\n                                            <td>\n                                                <button type=\"button\" title=\"Edit Contractor PO\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"editContractorPO(rowData.poID)\" icon=\"fa fa-edit\" pButton></button>&nbsp;&nbsp;{{rowData.businessName}}\n                                            </td>\n                                            <!-- <td>\n                                                <button type=\"button\" title=\"Edit Contractor PO\" [disabled]=\"rowData.poStatus=='Approved'||rowData.poStatus=='Partial Approved'||rowData.poStatus=='Rejected' || !roleRightsGuard.roleRights.updateAccess\"\n                                                    (click)=\"editContractorPO(rowData.poID)\" icon=\"fa fa-edit\" pButton></button>&nbsp;&nbsp;{{rowData.businessName}}\n                                            </td> -->\n                                            <td class=\"center-align\">\n                                                {{rowData.boqItemName }}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.poDate | dateFormat}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.poNo}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.basicAmount}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.taxAmount}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.totalAmount}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.poStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Generate Fund Request\" [disabled]=\"(rowData.poStatus!='Approved' && rowData.poStatus!='Partial Approved') || oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"showFRDialog(rowData.poID)\" icon=\"fa fa-edit\" pButton></button>\n                                                {{rowData.frStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Update Payment Details\" [disabled]=\"rowData.frStatus=='None'|| oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"showPaymentDetails(rowData.poID)\" icon=\"fa fa-edit\" pButton></button>\n                                                {{rowData.paymentStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Cancle PO\" [disabled]=\"oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"CancleStatus2(rowData.poID,rowData) \" icon=\"fa fa-edit\" pButton></button>\n                                                {{\"Cancel/Partial Cancel\"}}\n                                            </td>\n\n                                            <td>\n                                                <button type=\"button\" title=\"Update Invoice Details\" [disabled]=\"(rowData.poStatus!='Approved' && rowData.poStatus!='Partial Approved') || oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"showAddContractorPOInvoiceDialog(rowData.poID)\" icon=\"fa fa-edit\"\n                                                    pButton></button>\n                                                {{rowData.invoiceStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Mail Reminder\" [disabled]=\"oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled' || rowData.invoiceStatus=='Completed' || rowData.invoiceStatus=='None'\"\n                                                    (click)=\"reminderIcon(rowData.poID,rowData) \" icon=\"fa fa-edit\" pButton></button>\n                                                {{\"Mail Reminder\"}}\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"emptymessage\" let-columns>\n                                        <tr>\n                                            <td [attr.colspan]=\"columns.length\">\n                                                No records found\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n                                </p-table>\n                            </div>\n                            <!-- cancel poStatus -->\n                            <p-dialog header=\"{{paymentInvoiceDialogHeader}}\" [(visible)]=\"CancleDialog2\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\"\n                                [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"cancelPO2()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <div class=\"ui-g-12 ui-md-4\">\n                                                        <div class=\"ui-g-12 ui-md-8\">\n                                                            <label for=\"invoice-notes\">Total PO Amount:</label>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-4\">\n                                                            <span>{{totalPaymentAmount}}</span>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"ui-g-12 ui-md-4\">\n                                                        <div class=\"ui-g-12 ui-md-8\">\n                                                            <label for=\"invoice-notes\">Total Payment Amount:</label>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-4\">\n                                                            <span>{{addedPaymentAmount}}</span>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"ui-g-12 ui-md-4\">\n                                                        <div class=\"ui-g-12 ui-md-8\">\n                                                            <label for=\"invoice-notes\">Pending Payment Amount:</label>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-4\">\n                                                            <span>{{pendingPaymentAmount}}</span>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n\n\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <label for=\"payment-notes\">Po Status</label>\n                                                    <!-- <p-dropdown id=\"job-status\" [options]=\"poStatus\" [autoWidth]=\"false\" [(ngModel)]=\"purchaseOrdersBean.poStatus\" name=\"poStatus\"\n                        #poStatus=\"ngModel\" placeholder=\"Select an option\"></p-dropdown> -->\n                                                    <input id=\"payment-notes\" type=\"text\" disabled size=\"30\" pInputText [(ngModel)]=\"purchaseOrdersBean.poStatus\" #poStatus=\"ngModel\"\n                                                        name=\"poStatus\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <label for=\"payment-notes\">Cancel Notes</label>\n                                                    <input id=\"payment-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.notes\" #paymentNotes=\"ngModel\"\n                                                        name=\"paymentNotes\" maxlength=\"500\">\n                                                </div>\n                                                <div class=\"ui-g-11 ui-md-2\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeCancleStatusDialog2()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-11 ui-md-2\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingPaymentAmount=='0') || (paymentEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n                                                <div class=\"ui-g-12 ui-md-8\"></div>\n\n                                            </div>\n                                        </div>\n\n                                    </form>\n                                </div>\n\n\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n                            <!-- Reminder icon -->\n\n                            <p-dialog header=\"{{paymentInvoiceDialogHeader}}\" [(visible)]=\"reminderFlag\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\"\n                                [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"ReminderMails()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <label>Additional Email Address*</label>\n                                                    <input id=\"amountDue1\" type=\"text\" pInputText ng-required=\"true\" [(ngModel)]=payloadBean.searchParameter #searchParameter=\"ngModel\"\n                                                        name=\"searchParameter\" maxlength=\"500\" autocomplete=\"off\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeCancleReminderDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"\"></button>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n                                                <div class=\"ui-g-12 ui-md-8\"></div>\n\n                                            </div>\n                                        </div>\n\n                                    </form>\n                                </div>\n\n\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n                            <!-- end  -->\n                            <p-dialog header={{conPoDialogHeader}} [(visible)]=\"displayConPODialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\"\n                                [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"AddContractorPOs()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"contractor-name\">Contractor Name*</label>\n                                                    <p-autoComplete [(ngModel)]=\"contractorPOs.contactID\" [suggestions]=\"filteredContractorSingle\" (completeMethod)=\"filterContractorTypeSingle($event)\"\n                                                        [size]=\"30\" [minLength]=\"1\" placeholder=\"Hint: type any letter\" dropdown=\"cagatay\"\n                                                        #businessName=\"ngModel\" field=\"businessName\" name=\"businessName\" [forceSelection]=\"true\"\n                                                        [readonly]=\"ContractorPOsEditFlag\">\n                                                    </p-autoComplete>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"po-no\">PO No.*</label>\n                                                    <input id=\"po-no\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" placeholder=\"Auto Generated PO\" [readonly]=\"true\" [(ngModel)]=\"contractorPOs.poNo\"\n                                                        #poNo=\"ngModel\" name=\"poNo\" maxlength=\"20\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"po-date\">PO Date*</label>\n                                                    <p-calendar id=\"po-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" readonlyInput=\"true\" autocomplete=\"off\" [(ngModel)]=\"contractorPOs.poDate\"\n                                                        #poDate=\"ngModel\" name=\"poDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"basic-amount\">PO Amount*</label>\n                                                    <input id=\"basic-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"preparePOsTotal()\" [(ngModel)]=\"contractorPOs.basicAmount\"\n                                                        #basicAmount=\"ngModel\" name=\"basicAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"gst\">GST Amount*</label>\n                                                    <input id=\"taxAmount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"contractorPOs.taxAmount\" #gst=\"ngModel\"\n                                                        (keyup)=\"preparePOsTotal()\" name=\"gst\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"total-amount\">Total Amount</label>\n                                                    <input id=\"total-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"contractorPOs.totalAmount\" #totalAmount=\"ngModel\"\n                                                        name=\"totalAmount\" maxlength=\"10\" pKeyFilter=\"int\" readonly>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"activity-type\">BOQ Items*</label>\n                                                    <!-- <p-dropdown autoWidth=\"false\" [options]=\"activityTypeList\" [(ngModel)]=\"contractorPOs.activityTypeListID\" optionLabel=\"parameterListValue\"\n                                                        [autoWidth]=\"false\" name=\"activityType\" #activityType=\"ngModel\" placeholder=\"Select An Option\"  [readonly]=\"ContractorPOsEditFlag\"></p-dropdown>  -->\n                                                    <p-autoComplete id=\"driver-name\" [suggestions]=\"filteredActivity\" (completeMethod)=\"filteredActivityType($event)\" [minLength]=\"1\"\n                                                        placeholder=\"Hint: type any letter\" [(ngModel)]=\"contractorPOs.activityTypeListID\"\n                                                        [readonly]=\"ContractorPOsEditFlag\" #activityTypeListID=\"ngModel\" field=\"parameterListValue\"\n                                                        name=\"activityTypeListID\" dropdown=\"cagatay\" [forceSelection]=\"true\">\n                                                    </p-autoComplete>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\"></div>\n                                            </div>\n\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <label for=\"po-notes\">Notes</label>\n                                                    <input id=\"po-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"contractorPOs.notes\" #poNotes=\"ngModel\"\n                                                        name=\"poNotes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\" contractorPOs.poStatus=='Rejected' || (ContractorPOsEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                            </p-dialog>\n                            <p-dialog header=\"{{contractorPoInvoiceDialogHeader}}\" [(visible)]=\"displayContractorPOAddInvoiceDialog\" [responsive]=\"true\"\n                                showEffect=\"fade\" [modal]=\"true\" [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"AddContractorPOInvoice()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <h2 class=\"center-align bold-icon\" *ngIf=\"this.contractorPOFlag\">\n                                                    <span></span>{{activityLabel}}&nbsp;(PO No.:{{contractorPOs.poNo}} &nbsp;Dated:{{contractorPOs.poDate\n                                                    | dateFormat}})</h2>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-no\">Invoice No.*</label>\n                                                    <input id=\"invoice-no\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.invoiceNo\" #invoiceNo=\"ngModel\"\n                                                        name=\"invoiceNo\" maxlength=\"20\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-date\">Invoice Date*</label>\n                                                    <p-calendar id=\"invoice-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.invoiceDate\"\n                                                        #invoiceDate=\"ngModel\" name=\"invoiceDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-amount\">Invoice Amount*</label>\n                                                    <input id=\"invoice-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"prepareInvoiceTotal()\" [(ngModel)]=\"invoiceDetails.invoiceAmount\"\n                                                        #invoiceAmount=\"ngModel\" name=\"invoiceAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"gst-amount\">GST Amount*</label>\n                                                    <input id=\"gst-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"prepareInvoiceTotal()\" [(ngModel)]=\"invoiceDetails.gst\"\n                                                        #invoiceGST=\"ngModel\" name=\"invoiceGST\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"tot-amount\">Total Amount</label>\n                                                    <input id=\"tot-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.totalAmount\" #invoiceTotal=\"ngModel\"\n                                                        readonly name=\"invoiceTotal\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-9\">\n                                                    <label for=\"invoice-notes\">Notes</label>\n                                                    <input id=\"invoice-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.notes\" #invoiceNotes=\"ngModel\"\n                                                        name=\"invoiceNotes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeContractorInvoiceDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingInvoiceAmount=='0') || (InvoiceEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <div class=\"ui-g\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{totalFrAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total PO Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{contractorPOs.totalAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Invoice Received Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{addedContractorInvoice}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\"> Pending Invoice Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{pendingInvoiceAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <!-- <div class=\"ui-g-12 ui-md-3\">\n                                                                              \n                                                                      </div>   -->\n                                </div>\n                                <div class=\"card card-w-title\">\n                                    <p-table #dt [value]=\"invoiceSearch\" [columns]=\"invoicecols\" [paginator]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15]\"\n                                        [responsive]=\"true\">\n                                        <ng-template pTemplate=\"header\" let-columns>\n                                            <tr>\n                                                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                    {{col.header}}\n                                                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                </th>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                            <tr [pSelectableRow]=\"rowData\">\n\n                                                <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                    <span *ngIf=\"idx == 0\">\n                                                        <button type=\"button\" title=\"Edit Invoice\" (click)=\"editInvoice(rowData[col.id])\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"\n                                                            pButton></button>&nbsp;&nbsp; {{rowData[col.field]}}\n                                                    </span>\n                                                    <span *ngIf=\"idx==1\">\n                                                        {{rowData[col.field] | dateFormat}}\n                                                    </span>\n                                                    <span *ngIf=\"idx > 1\">\n                                                        {{rowData[col.field]}}\n                                                    </span>\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"emptymessage\" let-columns>\n                                            <tr>\n                                                <td [attr.colspan]=\"columns.length\">\n                                                    No records found\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                    </p-table>\n                                </div>\n                                <div class=\"msg\">\n                                    <p-growl [value]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n\n                            <!-- FR dialog -->\n                            <p-dialog header=\"{{frInvoiceDialogHeader}}\" [(visible)]=\"displayFrDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\"\n                                [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"AddFundRequest()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <h2 class=\"center-align bold-icon\" *ngIf=\"this.contractorPOFlag\">\n                                                    <span></span>{{CustomerName}}-{{activityLabel}}&nbsp;(PO No.:{{contractorPOs.poNo}}\n                                                    &nbsp;Dated:{{contractorPOs.poDate | dateFormat}})</h2>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"fr-amount\">FR Amount*</label>\n                                                    <input id=\"fr-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"frDetails.frAmount\" #frAmount=\"ngModel\"\n                                                        name=\"frAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"fr-date\">FR Date*</label>\n                                                    <p-calendar id=\"fr-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"frDetails.frDate\" #frDate=\"ngModel\"\n                                                        name=\"frDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <label for=\"email-addresses\">Email Addresses*</label>\n                                                    <input id=\"email-addresses\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"frDetails.emailAddresses\" #emailAddesses=\"ngModel\"\n                                                        name=\"emailAddesses\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <label for=\"fr-notes\">Notes</label>\n                                                    <input id=\"fr-notes\" type=\"text\" sclsdize=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"frDetails.notes\" #notes=\"ngModel\"\n                                                        name=\"notes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeFrDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingFrAmount=='0') || (FrEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess)) \"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <div class=\"ui-g\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total PO Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{contractorPOs.totalAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{totalFrAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Pending Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{pendingFrAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"card card-w-title\">\n                                    <p-table #dt [value]=\"frSearch\" [columns]=\"frcols\" [paginator]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15]\" [responsive]=\"true\">\n                                        <ng-template pTemplate=\"header\" let-columns>\n                                            <tr>\n                                                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                    {{col.header}}\n                                                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                </th>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                            <tr [pSelectableRow]=\"rowData\">\n                                                <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                    <span *ngIf=\"idx == 0\">\n                                                        <button type=\"button\" title=\"Edit Fund Request\" (click)=\"editFR(rowData[col.id])\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"\n                                                            pButton></button>&nbsp;&nbsp; {{rowData[col.field]}}\n                                                    </span>\n                                                    <span *ngIf=\"idx==1\">\n                                                        {{rowData[col.field] | dateFormat}}\n                                                    </span>\n                                                    <span *ngIf=\"idx > 1\">\n                                                        {{rowData[col.field]}}\n                                                    </span>\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"emptymessage\" let-columns>\n                                            <tr>\n                                                <td [attr.colspan]=\"columns.length\">\n                                                    No records found\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                    </p-table>\n                                </div>\n                                <div class=\"msg\">\n                                    <p-growl [value]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n\n                            <!-- End OF FR dialog -->\n\n                            <!-- Payment Details -->\n                            <p-dialog header=\"{{paymentInvoiceDialogHeader}}\" [(visible)]=\"displayPaymentDialog\" [responsive]=\"true\" showEffect=\"fade\"\n                                [modal]=\"true\" [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"AddPaymentDetails()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <h2 class=\"center-align bold-icon\" *ngIf=\"this.contractorPOFlag\">\n                                                    <span></span>{{activityLabel}}&nbsp;(PO No.:{{contractorPOs.poNo}} &nbsp;Dated:{{contractorPOs.poDate\n                                                    | dateFormat}})</h2>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"payment-amount\">Payment Amount*</label>\n                                                    <input id=\"payment-amount\" type=\"text\" size=\"10\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.paymentAmount\"\n                                                        #paymentAmount=\"ngModel\" name=\"paymentAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"payment-date\">Payment Date*</label>\n                                                    <p-calendar id=\"payment-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"paymentDetails.paymentDate\"\n                                                        #paymentDate=\"ngModel\" name=\"paymentDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"email-addresses\">Payment Mode*</label>\n                                                    <p-dropdown id=\"paymentMode-type\" autoWidth=\"false\" [options]=\"paymentTypeList\" [(ngModel)]=\"paymentDetails.paymentTypeListID\"\n                                                        name=\"paymentModeType\" optionLabel=\"parameterListValue\" [autoWidth]=\"false\"\n                                                        ng-required=\"true\" #paymentMode=\"ngModel\" placeholder=\"Select an option\"></p-dropdown>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"payment-particulars\">Payment Particulars</label>\n                                                    <input id=\"payment-particulars\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.paymentParticulars\"\n                                                        #paymentParticulars=\"ngModel\" name=\"paymentParticulars\" maxlength=\"20\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <label for=\"payment-notes\">Notes</label>\n                                                    <input id=\"payment-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.notes\" #paymentNotes=\"ngModel\"\n                                                        name=\"paymentNotes\" maxlength=\"500\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <label>Additional Email Address</label>\n                                                    <input id=\"amountDue1\" type=\"text\" pInputText ng-required=\"true\" [(ngModel)]=payloadBean.searchParameter #searchParameter=\"ngModel\"\n                                                        name=\"searchParameter\" maxlength=\"500\" autocomplete=\"off\">\n                                                </div>\n                                            </div>\n\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closePaymentDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingPaymentAmount=='0') || (paymentEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess)) \"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <div class=\"ui-g\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{totalPaymentAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Payment Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{addedPaymentAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Pending Payment Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{pendingPaymentAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <!-- <div class=\"ui-g-12 ui-md-3\">\n                                                                      \n                                                              </div>   -->\n                                </div>\n                                <div class=\"card card-w-title\">\n                                    <p-table #dt [value]=\"paymentSearch\" [columns]=\"paymentcols\" [paginator]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15]\"\n                                        [responsive]=\"true\">\n                                        <ng-template pTemplate=\"header\" let-columns>\n                                            <tr>\n                                                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                    {{col.header}}\n                                                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                </th>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                            <tr [pSelectableRow]=\"rowData\">\n\n                                                <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                    <span *ngIf=\"idx == 0\">\n                                                        <button type=\"button\" title=\"Edit Payment Details\" (click)=\"editPaymentDetails(rowData[col.id])\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"\n                                                            icon=\"fa fa-edit\" pButton></button>&nbsp;&nbsp; {{rowData[col.field]}}\n                                                    </span>\n                                                    <span *ngIf=\"idx==1\">\n                                                        {{rowData[col.field] | dateFormat}}\n                                                    </span>\n                                                    <span *ngIf=\"idx > 1\">\n                                                        {{rowData[col.field]}}\n                                                    </span>\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"emptymessage\" let-columns>\n                                            <tr>\n                                                <td [attr.colspan]=\"columns.length\">\n                                                    No records found\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                    </p-table>\n                                </div>\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n\n\n                        </p-tabPanel>\n\n                        <!-- End of Payment Details -->\n                        <!-- Supplier POs Tab  -->\n                        <p-tabPanel header=\"Supplier PO\" id=\"supplier-po\" leftIcon=\"fa-check\" *ngIf=\"this.editFlag\" [disabled]=\"tabFlag4\">\n                            <div class=\"ui-g form-group\">\n                                <div class=\"ui-g-12 ui-md-2\"> </div>\n                                <div class=\"ui-g-12 ui-md-6\">\n                                    <h2 class=\"center-align\">{{project.contactID.businessName}}&nbsp;({{project.siteName}}-{{project.siteID}})&nbsp;{{project.categoryID.categoryName}}</h2>\n                                </div>\n                                <div class=\"ui-g-12 ui-md-4\">\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"button\" pButton label=\"Cancel\" icon=\"fa fa-times\" routerLink=\"/projects\"></button>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-6\">\n                                        <button type=\"button\" pButton label=\"Add Supplier PO\" icon=\"fa fa-plus\" (click)=\"showSuplierPODialog()\" [disabled]=\"!roleRightsGuard.roleRights.insertAccess\"></button>\n                                    </div>\n\n                                </div>\n                            </div>\n\n                            <div class=\"card card-w-title\">\n                                <p-table #dt [value]=\"supplierPOSearch\" [scrollable]=\"true\" scrollHeight=\"250px\" [columns]=\"supplierpocolsOne\" [paginator]=\"true\"\n                                    [rows]=\"10\" [(selection)]=\"selectedSupplierPOs\" [rowsPerPageOptions]=\"[10,20,30]\" [responsive]=\"true\">\n\n                                    <ng-template pTemplate=\"header\" let-columns>\n                                        <tr>\n                                            <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                {{col.header}}\n                                                <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                            </th>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                        <tr [pSelectableRow]=\"rowData\">\n                                            <td>\n                                                <button type=\"button\" title=\"Edit Suplier PO\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"editSupplierPO(rowData.poID)\" icon=\"fa fa-edit\" pButton></button>&nbsp;&nbsp;{{rowData.businessName}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.boqItemName }}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.poDate | dateFormat}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.poNo}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.basicAmount}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.taxAmount}}\n                                            </td>\n                                            <td class=\"center-align\">\n                                                {{rowData.totalAmount}}\n                                            </td>\n                                            <td>\n                                                {{rowData.poStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Generate Fund Request\" [disabled]=\"(rowData.poStatus!='Approved' && rowData.poStatus!='Partial Approved') || oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"showSupplierFRDialog(rowData.poID)\" icon=\"fa fa-edit\" pButton></button>\n                                                {{rowData.frStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Update Payment Details\" [disabled]=\"rowData.frStatus=='None' || oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"showSupplierPaymentDetails(rowData.poID) \" icon=\"fa fa-edit\" pButton></button>\n                                                {{rowData.paymentStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Cancle PO\" [disabled]=\"oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled' \"\n                                                    (click)=\"CancleStatus(rowData.poID,rowData) \" icon=\"fa fa-edit\" pButton></button>\n                                                {{\"Cancel/Partial Cancel\"}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Update Invoice Details\" [disabled]=\"(rowData.poStatus!='Approved' && rowData.poStatus!='Partial Approved') || oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled'\"\n                                                    (click)=\"showAddSupplierPOInvoiceDialog(rowData.poID)\" icon=\"fa fa-edit\"\n                                                    pButton></button>\n                                                {{rowData.invoiceStatus}}\n                                            </td>\n                                            <td>\n                                                <button type=\"button\" title=\"Mail Reminder\" [disabled]=\"oneTimeClick || !roleRightsGuard.roleRights.updateAccess || rowData.poStatus=='Cancelled' || rowData.poStatus=='Partial Cancelled' || rowData.invoiceStatus=='Completed' || rowData.invoiceStatus=='None'\"\n                                                    (click)=\"reminderIcon1(rowData.poID,rowData) \" icon=\"fa fa-edit\" pButton></button>\n                                                {{\"Mail Reminder\"}}\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n                                    <ng-template pTemplate=\"emptymessage\" let-columns>\n                                        <tr>\n                                            <td [attr.colspan]=\"columns.length\">\n                                                No records found\n                                            </td>\n                                        </tr>\n                                    </ng-template>\n                                </p-table>\n                            </div>\n\n                            <p-dialog header=\"{{poheader}}\" ng-class=\"dialog-Control height-control\" [(visible)]=\"displaySupplierPODialog\" [responsive]=\"true\"\n                                showEffect=\"fade\" [modal]=\"true\" [width]=\"1270\" [contentStyle]=\"{'max-height':'650px'}\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"addSupplier()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-2\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <h2 class=\"center-align\">{{project.contactID.businessName}}&nbsp;({{project.siteName}}-{{project.siteID}})&nbsp;{{project.categoryID.categoryName}}</h2>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"supplierPos.poStatus=='Approved' || supplierPos.poStatus=='Rejected'||(supplierPOsEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"supplier-name\">Supplier Name*</label>\n                                                    <p-autoComplete [(ngModel)]=\"supplierPos.contactID\" [suggestions]=\"filteredSupplierSingle\" (completeMethod)=\"filteredSupplierSingleMethod($event)\"\n                                                        [size]=\"30\" [minLength]=\"1\" placeholder=\"Hint: type any letter\" dropdown=\"cagatay\"\n                                                        #businessName=\"ngModel\" field=\"businessName\" name=\"businessName\" [forceSelection]=\"true\"\n                                                        [readonly]=\"supplierPOsEditFlag\">\n                                                    </p-autoComplete>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"supplier-activity-type\">BOQ Items*</label>\n                                                    <!-- <p-dropdown autoWidth=\"false\" [options]=\"supplieractivityTypeList\" [(ngModel)]=\"supplierPos.activityTypeListID\" optionLabel=\"parameterListValue\"\n                                                        [autoWidth]=\"false\" name=\"supplierActivityType\" #supplierActivityType=\"ngModel\"\n                                                        placeholder=\"Select An Option\" [readonly]=\"supplierPOsEditFlag\"></p-dropdown> -->\n                                                    <p-autoComplete id=\"driver-name\" [suggestions]=\"supplierActivity\" (completeMethod)=\"supplierActivityType($event)\" [minLength]=\"1\"\n                                                        placeholder=\"Hint: type any letter\" [(ngModel)]=\"supplierPos.activityTypeListID\"\n                                                        #activityTypeListID=\"ngModel\" field=\"parameterListValue\" [readonly]=\"supplierPOsEditFlag\"\n                                                        name=\"activityTypeListID\" dropdown=\"cagatay\" [forceSelection]=\"true\">\n                                                    </p-autoComplete>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"supplier-po-date\">PO Date*</label>\n                                                    <p-calendar id=\"supplier-po-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" readonlyInput=\"true\" [(ngModel)]=\"supplierPos.poDate\"\n                                                        #supplierPODate=\"ngModel\" name=\"supplierPODate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"supplier-po-number\">PO No.*</label>\n\n                                                    <input id=\"supplier-po-number\" type=\"text\" size=\"30\" [readonly]=\"true\" placeholder=\"Auto Generated PO\" pInputText autocomplete=\"off\"\n                                                        [(ngModel)]=\"supplierPos.poNo\" #supplierpoNo=\"ngModel\" name=\"supplierpoNo\"\n                                                        maxlength=\"20\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <label for=\"supplier-po-notes\">Notes</label>\n                                                    <input id=\"supplier-po-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"supplierPos.notes\" #notes=\"ngModel\"\n                                                        name=\"notes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <p-table [value]=\"supplierDrawingItems\" [scrollable]=\"true\" scrollHeight=\"135px\" [columns]=\"supplierpocolsTwo\" [paginator]=\"true\"\n                                            [rows]=\"10\" [(selection)]=\"selectedSupplierdrawings\" [rowsPerPageOptions]=\"[10,20,30]\"\n                                            [responsive]=\"true\" (onRowSelect)=\"onRowSelect()\" (onRowUnselect)=\"onRowUnSelect($event)\">\n\n                                            <ng-template pTemplate=\"header\" let-columns>\n                                                <tr>\n                                                    <th style=\"width: 3.25em\">\n                                                    </th>\n                                                    <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                        {{col.header}}\n                                                        <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                    </th>\n                                                </tr>\n                                            </ng-template>\n                                            <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                                <tr [pSelectableRow]=\"rowData\">\n                                                    <td style=\"width:46px;\">\n                                                        <p-tableCheckbox [value]=\"rowData\"></p-tableCheckbox>\n                                                    </td>\n                                                    <td>{{rowData.itemName}}</td>\n                                                    <td>{{rowData.itemUnit}}</td>\n                                                    <td>{{rowData.itemQty}}</td>\n                                                    <td>{{rowData.budgetAmount}}</td>\n                                                    <td>{{rowData.qtyApprovedforProcurement}}</td>\n                                                    <td>{{rowData.alreadySpent}}</td>\n                                                    <td>{{rowData.itemUnitRate}}</td>\n                                                    <!-- <td *ngIf=\"rowData.alreadySpent==null\">{{0}}</td> Ord Qty\n                                                                          <td *ngIf=\"rowData.qtyApprovedforProcurement!=null\">{{rowData.qtyApprovedforProcurement}}</td>  \n                                                                          <td *ngIf=\"rowData.alreadySpent==null\">{{0}}</td> Ord Amt\n                                                                          <td *ngIf=\"rowData.alreadySpent!=null\">{{rowData.alreadySpent}}</td>  \n                                                                          <td *ngIf=\"rowData.itemUnitRate==null\">{{0}}</td>\n                                                                          <td *ngIf=\"rowData.itemUnitRate!=null\">{{rowData.itemUnitRate}}</td>    \n                                                                                                                                                   -->\n                                                    <td pEditableColumn>\n                                                        <p-cellEditor>\n                                                            <ng-template pTemplate=\"input\">\n                                                                <input type=\"text\" pInputText [(ngModel)]=\"rowData.newProcurementQty\" #newProcurementQty=\"ngModel\" autocomplete=\"off\" name=\"newProcurementQty\"\n                                                                    maxlength=\"20\" (keyup)=\"onRowSelect()\" [readonly]=\"rowData.newProcurementQty==null\">\n                                                            </ng-template>\n                                                            <ng-template pTemplate=\"output\">\n                                                                <span style=\"line-height: 30px;\"> {{rowData.newProcurementQty}} </span>\n                                                                <button type=\"button\" title=\"Edit Suplier\" icon=\"fa fa-edit\" pButton></button>\n                                                            </ng-template>\n                                                        </p-cellEditor>\n                                                    </td>\n                                                    <td pEditableColumn>\n                                                        <p-cellEditor>\n                                                            <ng-template pTemplate=\"input\">\n                                                                <input type=\"text\" pInputText [(ngModel)]=\"rowData.currentUnitRate\" #currentUnitRate=\"ngModel\" autocomplete=\"off\" name=\"currentUnitRate\"\n                                                                    maxlength=\"20\" (keyup)=\"onRowSelect()\" [readonly]=\"rowData.newProcurementQty==null\">\n                                                            </ng-template>\n                                                            <ng-template pTemplate=\"output\">\n                                                                <span style=\"line-height: 30px;\">{{rowData.currentUnitRate}}</span>\n                                                                <button type=\"button\" title=\"Edit Suplier\" icon=\"fa fa-edit\" pButton></button>\n                                                            </ng-template>\n                                                        </p-cellEditor>\n                                                    </td>\n                                                    <td pEditableColumn>\n                                                        <p-cellEditor>\n                                                            <ng-template pTemplate=\"input\">\n                                                                <input type=\"text\" pInputText [(ngModel)]=\"rowData.currentUnitGST\" #currentUnitGST=\"ngModel\" autocomplete=\"off\" name=\"currentUnitGST\"\n                                                                    maxlength=\"20\" (keyup)=\"onRowSelect()\" [readonly]=\"rowData.currentUnitGST==null\">\n                                                            </ng-template>\n                                                            <ng-template pTemplate=\"output\">\n                                                                <span style=\"line-height: 30px;\"> {{rowData.currentUnitGST}} </span>\n                                                                <button type=\"button\" title=\"Edit Suplier\" icon=\"fa fa-edit\" pButton></button>\n                                                            </ng-template>\n                                                        </p-cellEditor>\n                                                    </td>\n                                                    <td>{{rowData.amount}}</td>\n                                                    <!--New Amt-->\n\n                                                </tr>\n                                            </ng-template>\n                                            <ng-template pTemplate=\"emptymessage\" let-columns>\n                                                <tr>\n                                                    <td [attr.colspan]=\"columns.length\">\n                                                        No records found\n                                                    </td>\n                                                </tr>\n                                            </ng-template>\n                                        </p-table>\n                                        <div class=\"ui-g\">\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <label for=\"basic-amount\">Basic Amount:</label>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <span>{{supplierPos.basicAmount}}</span>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <label for=\"gst\">GST:</label>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <span>{{supplierPos.taxAmount}}</span>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <label for=\"invoice-notes\">Total Amount:</label>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <span>{{supplierPos.totalAmount}}</span>\n                                                </div>\n                                            </div>\n                                        </div>\n\n                                    </form>\n                                </div>\n                            </p-dialog>\n\n                            <!--Supplier FR Status Dialog-->\n\n\n                            <p-dialog header=\"{{frInvoiceDialogHeader}}\" [(visible)]=\"displaySupplierFRDialog\" [responsive]=\"true\" showEffect=\"fade\"\n                                [modal]=\"true\" [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"addSupplierFundRequest()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <h2 class=\"center-align bold-icon\">\n                                                    <span></span>{{CustomerName}}-{{activityLabel}}&nbsp;(PO No.:{{supplierPos.poNo}}\n                                                    &nbsp;Dated:{{supplierPos.poDate | dateFormat}})</h2>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"fr-amount\">FR Amount*</label>\n                                                    <input id=\"fr-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"frDetails.frAmount\" #frAmount=\"ngModel\"\n                                                        name=\"frAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"fr-date\">FR Date*</label>\n                                                    <p-calendar id=\"fr-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"frDetails.frDate\" #frDate=\"ngModel\"\n                                                        name=\"frDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <label for=\"email-addresses\">Email Addresses*</label>\n                                                    <input id=\"email-addresses\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"frDetails.emailAddresses\" #emailAddesses=\"ngModel\"\n                                                        name=\"emailAddesses\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <label for=\"fr-notes\">Notes</label>\n                                                    <input id=\"fr-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"frDetails.notes\" #notes=\"ngModel\" name=\"notes\"\n                                                        maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeSupplierFrDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingFrAmount=='0') || (FrEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <div class=\"ui-g\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total PO Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <!-- <span>{{supplierPos.basicAmount}}</span> -->\n                                                <span>{{supplierPos.totalAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{totalFrAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Pending Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{pendingFrAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"card card-w-title\">\n                                    <p-table #dt [value]=\"frSearch\" [columns]=\"frcols\" [paginator]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15]\" [responsive]=\"true\">\n                                        <ng-template pTemplate=\"header\" let-columns>\n                                            <tr>\n                                                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                    {{col.header}}\n                                                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                </th>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                            <tr [pSelectableRow]=\"rowData\">\n\n                                                <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                    <span *ngIf=\"idx == 0\">\n                                                        <button type=\"button\" title=\"Edit Fund Request\" (click)=\"editFR(rowData[col.id])\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"\n                                                            pButton></button>&nbsp;&nbsp; {{rowData[col.field]}}\n                                                    </span>\n                                                    <span *ngIf=\"idx==1\">\n                                                        {{rowData[col.field] | dateFormat}}\n                                                    </span>\n                                                    <span *ngIf=\"idx > 1\">\n                                                        {{rowData[col.field]}}\n                                                    </span>\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"emptymessage\" let-columns>\n                                            <tr>\n                                                <td [attr.colspan]=\"columns.length\">\n                                                    No records found\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                    </p-table>\n                                </div>\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n                            <!-- test -->\n                            <p-dialog header=\"{{paymentInvoiceDialogHeader}}\" [(visible)]=\"CancleDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\"\n                                [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"cancelPO()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <div class=\"ui-g-12 ui-md-4\">\n                                                        <div class=\"ui-g-12 ui-md-8\">\n                                                            <label for=\"invoice-notes\">Total PO Amount:</label>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-4\">\n                                                            <span>{{totalPaymentAmount}}</span>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"ui-g-12 ui-md-4\">\n                                                        <div class=\"ui-g-12 ui-md-8\">\n                                                            <label for=\"invoice-notes\">Total Payment Amount:</label>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-4\">\n                                                            <span>{{addedPaymentAmount}}</span>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"ui-g-12 ui-md-4\">\n                                                        <div class=\"ui-g-12 ui-md-8\">\n                                                            <label for=\"invoice-notes\">Pending Payment Amount:</label>\n                                                        </div>\n                                                        <div class=\"ui-g-12 ui-md-4\">\n                                                            <span>{{pendingPaymentAmount}}</span>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n\n\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <label for=\"payment-notes\">Po Status</label>\n                                                    <!-- <p-dropdown id=\"job-status\" [options]=\"poStatus\" [autoWidth]=\"false\" [(ngModel)]=\"purchaseOrdersBean.poStatus\" name=\"poStatus\"\n                                                        #poStatus=\"ngModel\" placeholder=\"Select an option\"></p-dropdown> -->\n                                                    <input id=\"payment-notes\" type=\"text\" disabled size=\"30\" pInputText [(ngModel)]=\"purchaseOrdersBean.poStatus\" #poStatus=\"ngModel\"\n                                                        name=\"poStatus\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <label for=\"payment-notes\">Cancel Notes</label>\n                                                    <input id=\"payment-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.notes\" #paymentNotes=\"ngModel\"\n                                                        name=\"paymentNotes\" maxlength=\"500\">\n                                                </div>\n                                                <div class=\"ui-g-11 ui-md-2\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeCancleStatusDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-11 ui-md-2\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingPaymentAmount=='0') || (paymentEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n                                                <div class=\"ui-g-12 ui-md-8\"></div>\n\n                                            </div>\n                                        </div>\n\n                                    </form>\n                                </div>\n\n\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n                            <!-- Reminder icon -->\n\n                            <p-dialog header=\"{{paymentInvoiceDialogHeader}}\" [(visible)]=\"reminderFlag1\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\"\n                                [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"ReminderMails1()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-12\">\n                                                    <label>Additional Email Address*</label>\n                                                    <input id=\"amountDue1\" type=\"text\" pInputText ng-required=\"true\" [(ngModel)]=payloadBean.searchParameter #searchParameter=\"ngModel\"\n                                                        name=\"searchParameter\" maxlength=\"500\" autocomplete=\"off\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeCancleReminderDialog1()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-2\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"\"></button>\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12\">\n                                                <div class=\"ui-g-12 ui-md-8\"></div>\n\n                                            </div>\n                                        </div>\n\n                                    </form>\n                                </div>\n\n\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n                            <!-- end  -->\n                            <!--Supplier payment Status Dialog-->\n\n                            <p-dialog header=\"{{paymentInvoiceDialogHeader}}\" [(visible)]=\"displaySupplierPaymentDialog\" [responsive]=\"true\" showEffect=\"fade\"\n                                [modal]=\"true\" [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"addSupplierPaymentDetails()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <h2 class=\"center-align bold-icon\">\n                                                    <span></span>{{activityLabel}}&nbsp;(PO No.:{{supplierPos.poNo}} &nbsp;Dated:{{supplierPos.poDate\n                                                    | dateFormat}})</h2>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"payment-amount\">Payment Amount*</label>\n                                                    <input id=\"payment-amount\" type=\"text\" size=\"10\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.paymentAmount\"\n                                                        #paymentAmount=\"ngModel\" name=\"paymentAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"payment-date\">Payment Date*</label>\n                                                    <p-calendar id=\"payment-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"paymentDetails.paymentDate\"\n                                                        #paymentDate=\"ngModel\" name=\"paymentDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"email-addresses\">Payment Mode*</label>\n                                                    <p-dropdown id=\"paymentMode-type\" autoWidth=\"false\" [options]=\"paymentTypeList\" [(ngModel)]=\"paymentDetails.paymentTypeListID\"\n                                                        name=\"paymentModeType\" optionLabel=\"parameterListValue\" [autoWidth]=\"false\"\n                                                        ng-required=\"true\" #paymentMode=\"ngModel\" placeholder=\"Select an option\"></p-dropdown>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"payment-particulars\">Payment Particulars</label>\n                                                    <input id=\"payment-particulars\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.paymentParticulars\"\n                                                        #paymentParticulars=\"ngModel\" name=\"paymentParticulars\" maxlength=\"20\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <label for=\"payment-notes\">Notes</label>\n                                                    <input id=\"payment-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"paymentDetails.notes\" #paymentNotes=\"ngModel\"\n                                                        name=\"paymentNotes\" maxlength=\"500\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n                                                    <label>Additional Email Address</label>\n                                                    <input id=\"amountDue1\" type=\"text\" pInputText ng-required=\"true\" [(ngModel)]=payloadBean.searchParameter #searchParameter=\"ngModel\"\n                                                        name=\"searchParameter\" maxlength=\"500\" autocomplete=\"off\">\n                                                </div>\n                                            </div>\n\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeSupplierPaymentDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingPaymentAmount=='0') || (paymentEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <div class=\"ui-g\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{totalPaymentAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Payment Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{addedPaymentAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Pending Payment Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{pendingPaymentAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"card card-w-title\">\n                                    <p-table #dt [value]=\"paymentSearch\" [columns]=\"paymentcols\" [paginator]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15]\"\n                                        [responsive]=\"true\">\n                                        <ng-template pTemplate=\"header\" let-columns>\n                                            <tr>\n                                                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                    {{col.header}}\n                                                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                </th>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                            <tr [pSelectableRow]=\"rowData\">\n\n                                                <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                    <span *ngIf=\"idx == 0\">\n                                                        <button type=\"button\" title=\"Edit Payment Details\" (click)=\"editPaymentDetails(rowData[col.id])\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.updateAccess\"\n                                                            pButton></button>&nbsp;&nbsp; {{rowData[col.field]}}\n                                                    </span>\n                                                    <span *ngIf=\"idx==1\">\n                                                        {{rowData[col.field] | dateFormat}}\n                                                    </span>\n                                                    <span *ngIf=\"idx > 1\">\n                                                        {{rowData[col.field]}}\n                                                    </span>\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"emptymessage\" let-columns>\n                                            <tr>\n                                                <td [attr.colspan]=\"columns.length\">\n                                                    No records found\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                    </p-table>\n                                </div>\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n\n                            <!--Supplier Invoice Status Dialog-->\n\n                            <p-dialog header=\"{{contractorPoInvoiceDialogHeader}}\" [(visible)]=\"displaySupplierPOAddInvoiceDialog\" [responsive]=\"true\"\n                                showEffect=\"fade\" [modal]=\"true\" [width]=\"1000\">\n                                <div class=\"ui-g ui-fluid\">\n                                    <form novalidate #f=\"ngForm\" (ngSubmit)=\"AddSupplierPOInvoice()\">\n                                        <div class=\"ui-g form-group\">\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <h2 class=\"center-align bold-icon\" *ngIf=\"this.contractorPOFlag\">\n                                                    <span></span>{{activityLabel}}&nbsp;(PO No.:{{supplierPos.poNo}} &nbsp;Dated:{{supplierPos.poDate\n                                                    | dateFormat}})</h2>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-no\">Invoice No.*</label>\n                                                    <input id=\"invoice-no\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.invoiceNo\" #invoiceNo=\"ngModel\"\n                                                        name=\"invoiceNo\" maxlength=\"20\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-date\">Invoice Date*</label>\n                                                    <p-calendar id=\"invoice-date\" [dateFormat]=\"dateFormat\" placeholder=\"Date\" autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.invoiceDate\"\n                                                        #invoiceDate=\"ngModel\" name=\"invoiceDate\" [showIcon]=\"true\"></p-calendar>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"invoice-amount\">Invoice Amount*</label>\n                                                    <input id=\"invoice-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"prepareInvoiceTotal()\" [(ngModel)]=\"invoiceDetails.invoiceAmount\"\n                                                        #invoiceAmount=\"ngModel\" name=\"invoiceAmount\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"gst-amount\">GST Amount*</label>\n                                                    <input id=\"gst-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" (keyup)=\"prepareInvoiceTotal()\" [(ngModel)]=\"invoiceDetails.gst\"\n                                                        #invoiceGST=\"ngModel\" name=\"invoiceGST\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-12\">\n                                                <div class=\"ui-g-12 ui-md-3\">\n                                                    <label for=\"tot-amount\">Total Amount</label>\n                                                    <input id=\"tot-amount\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.totalAmount\" #invoiceTotal=\"ngModel\"\n                                                        readonly name=\"invoiceTotal\" maxlength=\"10\" pKeyFilter=\"int\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-9\">\n                                                    <label for=\"invoice-notes\">Notes</label>\n                                                    <input id=\"invoice-notes\" type=\"text\" size=\"30\" pInputText autocomplete=\"off\" [(ngModel)]=\"invoiceDetails.notes\" #invoiceNotes=\"ngModel\"\n                                                        name=\"invoiceNotes\" maxlength=\"500\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12\">\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-6\">\n\n                                                </div>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-6\">\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"closeSupplierInvoiceDialog()\" label=\"Close\"></button>\n                                                </div>\n                                                <div class=\"ui-g-12 ui-md-4\">\n                                                    <button type=\"submit\" pButton icon=\"fa-check\" label=\"Save\" [disabled]=\"(pendingInvoiceAmount=='0') || (InvoiceEditFlag==true?(!roleRightsGuard.roleRights.updateAccess):(!roleRightsGuard.roleRights.insertAccess))\"></button>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </form>\n                                </div>\n                                <div class=\"ui-g\">\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Fund Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{totalFrAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-g-12 ui-md-12\">\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total PO Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{supplierPos.totalAmount}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Total Invoice Received Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{addedSupplierInvoice}}</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"ui-g-12 ui-md-4\">\n                                            <div class=\"ui-g-12 ui-md-8\">\n                                                <label for=\"invoice-notes\">Pending Invoice Amount:</label>\n                                            </div>\n                                            <div class=\"ui-g-12 ui-md-4\">\n                                                <span>{{pendingInvoiceAmount}}</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <!-- <div class=\"ui-g-12 ui-md-3\">\n                                                                            \n                                                                    </div>   -->\n                                </div>\n                                <div class=\"card card-w-title\">\n                                    <p-table #dt [value]=\"invoiceSearch\" [columns]=\"invoicecols\" [paginator]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15]\"\n                                        [responsive]=\"true\">\n                                        <ng-template pTemplate=\"header\" let-columns>\n                                            <tr>\n                                                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                                                    {{col.header}}\n                                                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                                                </th>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                                            <tr [pSelectableRow]=\"rowData\">\n\n                                                <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\">\n                                                    <span *ngIf=\"idx == 0\">\n                                                        <button type=\"button\" title=\"Edit Invoice\" (click)=\"editInvoice(rowData[col.id])\" icon=\"fa fa-edit\" pButton></button>&nbsp;&nbsp; {{rowData[col.field]}}\n                                                    </span>\n                                                    <span *ngIf=\"idx==1\">\n                                                        {{rowData[col.field] | dateFormat}}\n                                                    </span>\n                                                    <span *ngIf=\"idx > 1\">\n                                                        {{rowData[col.field]}}\n                                                    </span>\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                        <ng-template pTemplate=\"emptymessage\" let-columns>\n                                            <tr>\n                                                <td [attr.colspan]=\"columns.length\">\n                                                    No records found\n                                                </td>\n                                            </tr>\n                                        </ng-template>\n                                    </p-table>\n                                </div>\n                                <div class=\"msg\">\n                                    <p-growl [(value)]=\"dialogmsgs\"></p-growl>\n                                </div>\n                            </p-dialog>\n                        </p-tabPanel>\n                    </p-tabView>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"custom-overlay\" *ngIf=\"showSpinner\">\n    <div class=\"sendingEmail\"></div>\n</div>\n<div class=\"custom-overlay-all\" *ngIf=\"showPageSpinner\">\n    <div class=\"sendingEmail-all\"></div>\n</div>\n<div class=\"msg\">\n    <p-growl [(value)]=\"msgs\"></p-growl>\n</div>\n<!--<div class=\"loader\" *ngIf=\"showPageSpinner\">\n    <div>\n        <span></span>\n        <span></span>\n        <span></span>\n    </div>\n</div>-->\n<!-- <p-progressSpinner  *ngIf=\"showPageSpinner\" class=\"progress-bar\" [style]=\"{width: '50px', height: '50px'}\" strokeWidth=\"8\" fill=\"#EEEEEE\" animationDuration=\".5s\" ></p-progressSpinner> -->"

/***/ }),

/***/ "./src/app/_screens/projects/add-project/add-project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PO_Approval_POApproval__ = __webpack_require__("./src/app/_screens/PO Approval/POApproval.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_components_common_messageservice__ = __webpack_require__("./node_modules/primeng/components/common/messageservice.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_components_common_messageservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_components_common_messageservice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__project__ = __webpack_require__("./src/app/_screens/projects/project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__project_services__ = __webpack_require__("./src/app/_screens/projects/project-services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_date_format__ = __webpack_require__("./src/app/_core/date-format.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_crypto_js__ = __webpack_require__("./node_modules/crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__parameters_parameters__ = __webpack_require__("./src/app/_screens/parameters/parameters.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__guards_role_rights_guard__ = __webpack_require__("./src/app/_guards/role-rights.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};















var AddProjectComponent = (function () {
    function AddProjectComponent(httpRestClient, router, breadcrumbService, route, projectService, roleRightsGuard, dateFormatPipe) {
        var _this = this;
        this.httpRestClient = httpRestClient;
        this.router = router;
        this.breadcrumbService = breadcrumbService;
        this.route = route;
        this.projectService = projectService;
        this.roleRightsGuard = roleRightsGuard;
        this.dateFormatPipe = dateFormatPipe;
        this.user = new __WEBPACK_IMPORTED_MODULE_4__models_data_model__["g" /* User */]();
        this.addresponse = false;
        this.breadLabel = 'Add Project';
        this.activeTabIndex = 0;
        this.validateNumber = /[0-9]$/;
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_4__models_data_model__["c" /* CurrentUser */]();
        this.msgs = [];
        this.dialogmsgs = [];
        this.contactAutoLookupList = [];
        this.circleAutoLookupList = [];
        this.projectCategoryAutoLookupList = [];
        this.executionModelAutoLookupList = [];
        this.drawingtypeAutoLookupList = [];
        this.matchResult = false;
        this.project = new __WEBPACK_IMPORTED_MODULE_8__project__["h" /* Project */]();
        this.projectbean = new __WEBPACK_IMPORTED_MODULE_8__project__["h" /* Project */]();
        this.contactbean = new __WEBPACK_IMPORTED_MODULE_4__models_data_model__["b" /* Contacts */]();
        this.oneTimeClick = false;
        this.projectStatuses = new __WEBPACK_IMPORTED_MODULE_8__project__["i" /* ProjectStatus */]();
        this.CustomerPOsEditFlag = false;
        this.customerPOs = new __WEBPACK_IMPORTED_MODULE_8__project__["c" /* CustomerPOs */]();
        this.customerpocols = [];
        this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
        this.customerPOsBean = new __WEBPACK_IMPORTED_MODULE_8__project__["c" /* CustomerPOs */]();
        this.contractorpocols = [];
        this.contractorPOs = new __WEBPACK_IMPORTED_MODULE_8__project__["b" /* ContractorPOs */]();
        this.ContractorPOsEditFlag = false;
        this.contractorAutoLookupList = [];
        this.contractorPOsBean = new __WEBPACK_IMPORTED_MODULE_8__project__["b" /* ContractorPOs */]();
        this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
        this.parameterValueTO = new __WEBPACK_IMPORTED_MODULE_13__parameters_parameters__["d" /* ParameterValueTO */]();
        this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
        //Supplier PO  
        this.drawingItems = new __WEBPACK_IMPORTED_MODULE_8__project__["d" /* DrawingItems */]();
        this.supplierPOsEditFlag = false;
        this.displaySupplierPODialog = false;
        this.supplierPos = new __WEBPACK_IMPORTED_MODULE_8__project__["j" /* SupplierPOs */]();
        this.supplierpocolsOne = [];
        this.supplierpocolsTwo = [];
        this.supplierAutoLookupList = [];
        this.supplierDrawingItems = [];
        this.selectedSupplierdrawings = [];
        this.editSupplierFlag = true;
        // BOQ Variables
        this.boqCols = [];
        this.boqcolsTwo = [];
        this.boqBeanObject = new __WEBPACK_IMPORTED_MODULE_8__project__["a" /* BOQBean */]();
        this.displayProjectBOQDialog = false;
        this.boqEditFlag = false;
        this.boqDrawingItems = [];
        this.selectedboqDrawingItems = [];
        this.purchaseOrdersBean = new __WEBPACK_IMPORTED_MODULE_1__PO_Approval_POApproval__["b" /* PurchaseOrdersBean */];
        this.emailRecipients = [];
        this.payloadBean = new __WEBPACK_IMPORTED_MODULE_0__models_data_model__["e" /* PayloadBean */]();
        this.totalPaidAmount = 0;
        this.roleRightsGuard.hasAllRoles(__WEBPACK_IMPORTED_MODULE_11__app_config__["e" /* routeConfig */].addProjectMenu);
        this.breadcrumbService.setItems([
            { label: 'Aerial' },
            { label: 'Projects', routerLink: ['/projects'] },
            { label: 'Add Project', routerLink: ['/projects/add-project'] }
        ]);
        this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.httpRestClient.getData("contact-autolookup/" + this.currentuser.userID).subscribe(function (response) { _this.contactAutoLookupList = response; });
        this.httpRestClient.getData("category-autolookup").subscribe(function (response) { _this.projectCategoryAutoLookupList = response; });
        this.httpRestClient.getData("execution-model-autolookup").subscribe(function (response) { _this.executionModelAutoLookupList = response; });
        this.httpRestClient.getData("parameter-list/SITE_TYPE_LIST_ID").subscribe(function (response) {
            _this.siteTypeListv = response;
        });
        this.httpRestClient.getData("parameter-list/STATUS_LIST_ID").subscribe(function (response) {
            _this.statusValueList = response;
            for (var count = 0; count < _this.statusValueList.length; count++) {
                if (_this.statusValueList[count].parameterListCode == "NEW") {
                    _this.project.statusListID = _this.statusValueList[count];
                    break;
                }
            }
        });
        this.route.params.subscribe(function (params) { _this.params = params; });
        if (this.params['id'] != null || this.params['id'] != undefined) {
            this.showPageSpinner = true;
            var plaintext = __WEBPACK_IMPORTED_MODULE_12_crypto_js__["AES"].decrypt(this.params['id'].toString(), __WEBPACK_IMPORTED_MODULE_11__app_config__["b" /* appConfig */].privateKey);
            var decrypted = plaintext.toString(__WEBPACK_IMPORTED_MODULE_12_crypto_js__["enc"].Utf8);
            if (decrypted == '' || decrypted == null || decrypted == undefined) {
                this.router.navigate(['/projects']);
            }
            else {
                this.httpRestClient.getData("editProject/" + decrypted + "")
                    .subscribe(function (response) {
                    _this.project = response;
                    _this.dialogHeader = _this.project.contactID.businessName + " (" + _this.project.siteName + "-" + _this.project.siteID + ") " + _this.project.categoryID.categoryName;
                    _this.project.allocationDate = new Date(_this.project.allocationDate);
                    if (_this.project.completionDate != null && _this.project.completionDate != undefined)
                        _this.project.completionDate = new Date(_this.project.completionDate);
                    else {
                        _this.project.completionDate = null;
                    }
                    if (_this.project.contactID.entityType == 'Individual') {
                        _this.project.contactID.businessName = _this.project.contactID.firstName + ' ' + _this.project.contactID.lastName;
                    }
                    _this.project.statusDate = new Date(_this.project.statusDate);
                    _this.editFlag = true;
                    _this.breadLabel = 'Edit Project';
                    _this.breadcrumbService.setItems([
                        { label: 'Aerial' },
                        { label: 'Projects', routerLink: ['/projects'] },
                        { label: _this.breadLabel }
                    ]);
                    _this.showPageSpinner = false;
                });
                this.cols = [
                    { field: 'statusDate', header: 'Status Date', class: "status-date", id: 'projectStatusID' },
                    { field: 'statusName', header: 'Project Status', class: "status-name" },
                    { field: 'notes', header: 'Notes', class: "status-note" }
                ];
                this.projectService.setter(decrypted);
                //                       
            }
        }
        this.editFlag = false;
        this.breadcrumbService.setItems([
            { label: 'Aerial' },
            { label: 'Projects', routerLink: ['/projects'] },
            { label: this.breadLabel }
        ]);
    }
    AddProjectComponent.prototype.ngOnInit = function () {
        this.dateFormat = __WEBPACK_IMPORTED_MODULE_11__app_config__["a" /* Constants */].DATE_FMT_TS;
        this.displayAddInvoiceDialog = false;
        this.displayContractorPOAddInvoiceDialog = false;
        this.invoicecols = [
            { field: 'invoiceNo', header: 'Invoice No', id: 'idID' },
            { field: 'invoiceDate', header: 'Invoice Date', class: "center-align" },
            { field: 'invoiceAmount', header: 'Invoice Amount', class: "center-align" },
            { field: 'gst', header: 'GST Amount', class: "center-align" },
            { field: 'totalAmount', header: 'Total Amount', class: "center-align" }
        ];
        this.frcols = [
            { field: 'frAmount', header: 'FR Amount', class: "left-align", id: 'frID' },
            // { field: 'emailAddresses', header: 'Email Addresses' ,class:'center-align'},
            { field: 'frDate', header: 'FR Date', class: "center-align" },
            { field: 'notes', header: 'Notes', class: "center-align" },
        ];
        this.paymentcols = [
            { field: 'paymentAmount', header: 'Paid Amount', class: "left-align", id: 'pdID' },
            { field: 'paymentDate', header: 'Payment Date', class: "center-align" },
            { field: 'notes', header: 'Notes', class: "center-align" },
        ];
        this.tabData();
    };
    AddProjectComponent.prototype.circlesOfParticularCustomer = function (event) {
        var _this = this;
        this.httpRestClient.getData("circle-autolookup/" + event.contactID + "/" + this.currentuser.userID).subscribe(function (response) { _this.circleAutoLookupList = response; });
    };
    // Edit Project Tab Functions
    AddProjectComponent.prototype.drawingTypeValues = function (value) {
        var _this = this;
        this.project.drawingTypeID = null;
        this.httpRestClient.getData("drawing-type-autolookup/" + value.execModelID).subscribe(function (response) { _this.drawingtypeAutoLookupList = response; });
    };
    AddProjectComponent.prototype.filterContactSingle = function (event) {
        var query = event.query;
        this.filteredContactsSingle = this.filterDataForCustomer(query, this.contactAutoLookupList);
    };
    ;
    AddProjectComponent.prototype.filterCircleSingle = function (event) {
        var query = event.query;
        this.filteredCirclesSingle = this.filterDataForCircle(query, this.circleAutoLookupList);
    };
    ;
    AddProjectComponent.prototype.filterProjectCategorySingle = function (event) {
        var query = event.query;
        this.filteredProjectCategoriesSingle = this.filterDataForProjectCategory(query, this.projectCategoryAutoLookupList);
    };
    ;
    AddProjectComponent.prototype.filterExecutionModelSingle = function (event) {
        var query = event.query;
        this.filteredExecutionModelsSingle = this.filterDataForExecutionModel(query, this.executionModelAutoLookupList);
    };
    ;
    AddProjectComponent.prototype.filterDrawingTypeSingle = function (event) {
        var query = event.query;
        this.filteredDrawingTypesSingle = this.filterDataForDrawingType(query, this.drawingtypeAutoLookupList);
    };
    ;
    AddProjectComponent.prototype.filterContractorTypeSingle = function (event) {
        var query = event.query;
        this.filteredContractorSingle = this.filterDataForContractor(query, this.contractorAutoLookupList);
    };
    ;
    AddProjectComponent.prototype.filterDataForContractor = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.businessName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.filterDataForCustomer = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.businessName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.filterDataForCircle = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.circleName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.filterDataForProjectCategory = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.categoryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.filterDataForExecutionModel = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.execModelName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.filterDataForDrawingType = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.drawingTypeName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.addProjectData = function () {
        var _this = this;
        if (this.editFlag == true ? (this.roleRightsGuard.roleRights.updateAccess) : (this.roleRightsGuard.roleRights.insertAccess)) {
            this.msgs = [];
            if ((this.project.contactID == '' || this.project.contactID == undefined)) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Customer Name can't be blank!" });
            }
            else if ((this.project.circleID == '' || this.project.circleID == undefined)) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Circle Name can't be blank!" });
            }
            else if ((this.project.categoryID == undefined || this.project.categoryID == '')) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Project Category Name can't be blank!" });
            }
            else if ((this.project.execModelID == undefined || this.project.execModelID == '')) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Execution Model Name can't be blank!" });
            }
            else if ((this.project.drawingTypeID == undefined || this.project.drawingTypeID == '')) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Drawing type can't be blank!" });
            }
            else if ((this.project.siteID == undefined || this.project.siteID.trim() == '')) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Id can't be blank!" });
            }
            else if ((this.project.siteName == undefined || this.project.siteName.trim() == '')) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Name can't be blank!" });
            }
            else if (this.project.allocationDate == undefined || this.project.allocationDate == null) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Allocation Date can't be blank!" });
            }
            else if ((this.project.statusDate == undefined || this.project.statusDate == null)) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Current Status Date  can't be blank!" });
            }
            else if (!(this.project.allocationDate == undefined || this.project.allocationDate == null
                || this.project.completionDate == undefined || this.project.completionDate == null)
                && (new Date(this.project.allocationDate) > (new Date(this.project.completionDate)))) {
                this.project.completionDate = null;
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Allocation Date can't be greater than Completion Date!" });
            }
            else if ((this.project.statusListID == null || this.project.statusListID == undefined)) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Current Status can't be blank!" });
            }
            else if ((this.project.siteTypeListID == null || this.project.siteTypeListID == undefined)) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Site Type can't be blank!" });
            }
            else {
                this.project.projectName = this.project.siteName;
                if (!this.editFlag) {
                    this.project.createdBy = this.currentuser.userID;
                    this.httpRestClient.postData("add-project/", this.project).subscribe(function (response) {
                        _this.baseResponse = response;
                        if (_this.baseResponse['code'] == 'ADDED') {
                            sessionStorage.setItem("successMessage", "AddedSuccess");
                            _this.router.navigate(['./projects']);
                        }
                        else {
                            _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                        }
                    });
                }
                else {
                    this.project.lastModifiedBy = this.currentuser.userID;
                    this.httpRestClient.putData("update-project/", this.project).subscribe(function (response) {
                        _this.baseResponse = response;
                        if (_this.baseResponse['code'] == 'UPDATED') {
                            sessionStorage.setItem("successMessage", "UpdateSuccess");
                            _this.router.navigate(['/projects']);
                        }
                        else {
                            _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                        }
                    });
                }
            }
        }
    };
    AddProjectComponent.prototype.setCurrentDateValue = function () {
        this.project.statusDate = this.project.allocationDate;
    };
    // Tab Change Events 
    AddProjectComponent.prototype.onTabChange = function (event) {
        var _this = this;
        this.activeTabIndex = event.index;
        this.msgs = [];
        if (this.activeTabIndex == 0) {
            this.showPageSpinner = true;
            this.httpRestClient.getData("editProject/" + this.projectService.getter() + "")
                .subscribe(function (response) {
                _this.project = response;
                _this.project.allocationDate = new Date(_this.project.allocationDate);
                if (_this.project.completionDate != null && _this.project.completionDate != undefined)
                    _this.project.completionDate = new Date(_this.project.completionDate);
                else {
                    _this.project.completionDate = null;
                }
                _this.project.statusDate = new Date(_this.project.statusDate);
                _this.editFlag = true;
                _this.showPageSpinner = false;
            });
        }
        else if (this.activeTabIndex == 1) {
            this.showPageSpinner = true;
            this.boqCols = [
                { field: 'boqdate', header: 'Date', class: 'status-date', id: 'boqID' },
                { field: 'totalBoqAmount', header: 'BOQ Total Amount', class: 'status-name' },
                { field: 'userId', header: 'User', class: 'status-name' },
                { field: 'notes', header: 'Notes', class: 'status-note' }
            ];
            this.httpRestClient.getData("fetch-boq-info/" + this.projectService.getter() + "").subscribe(function (response) {
                _this.boqtableSearch = response;
                if (_this.boqtableSearch.length > 0) {
                    _this.boqBeanObject.grandTotalOfBOQ = _this.boqtableSearch[_this.boqtableSearch.length - 1].grandTotalOfBOQ;
                }
                else {
                    _this.boqBeanObject.grandTotalOfBOQ = 0;
                }
                _this.showPageSpinner = false;
            });
        }
        else if (this.activeTabIndex == 2) {
            this.showPageSpinner = true;
            this.projectStatusDialogHeader = "Add Project Status";
            this.httpRestClient.getData("project-statuses/" + this.projectService.getter() + "").subscribe(function (response) {
                _this.projectStatusesSearch = response;
                _this.showPageSpinner = false;
            });
        }
        else if (this.activeTabIndex == 3) {
            this.poFlag = true;
            this.showPageSpinner = true;
            this.poDialogHeader = "Add Customer  PO";
            this.httpRestClient.getData("parameter-list/ACTIVITY_TYPES").subscribe(function (response) {
                _this.activityTypeList = response;
            });
            this.customerpocols = [
                { field: 'poNo', header: 'PO No.', id: 'poID' },
                { field: 'poDate', header: 'PO Date', class: "center-align" },
                { field: 'activityType', header: 'Activity Type', class: "center-align" },
                { field: 'basicAmount', header: 'PO Amount', class: "center-align" },
                { field: 'taxAmount', header: 'GST Amount', class: "center-align" },
                { field: 'totalAmount', header: 'Total Amount', class: "center-align" },
                // { field: 'poStatus', header: 'PO Status'},
                { field: 'invoiceStatus', header: 'Invoice Status' }
            ];
            this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Customer").subscribe(function (response) {
                _this.customerPOsearch = response;
                _this.showPageSpinner = false;
            });
        }
        else if (this.activeTabIndex == 4) {
            this.showPageSpinner = true;
            this.forBOQAmountCheck();
            this.contractorPOFlag = true;
            this.poDialogHeader = "Add Contractor  PO";
            this.httpRestClient.getData("parameter-list/ACTIVITY_TYPES").subscribe(function (response) {
                _this.activityTypeList = response;
            });
            this.contractorpocols = [
                { field: 'businessName', header: 'Contractor Name.', id: 'poID' },
                { field: 'boqItemName', header: 'BOQ Item', class: "center-align" },
                { field: 'poDate', header: 'PO Date', class: "center-align" },
                { field: 'poNo', header: 'PO No.', id: 'poID' },
                { field: 'basicAmount', header: 'PO Amount', class: "center-align" },
                { field: 'taxAmount', header: 'GST', class: "center-align" },
                { field: 'totalAmount', header: 'Total Amount', class: "center-align" },
                { field: 'poStatus', header: 'PO Status', poStatus: 'poStatus' },
                { field: 'frStatus', header: 'FR Status', class: "center-align" },
                { field: 'paymentStatus', header: 'Payment Status', class: "center-align" },
                { field: 'paymentStatus', header: 'Cancle Status', class: "center-align" },
                { field: 'invoiceStatus', header: 'Invoice Status', class: "center-align" },
                { field: '', header: 'Mail Reminder', class: "center-align" },
            ];
            this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(function (response) {
                _this.contractorPOsearch = response;
                _this.showPageSpinner = false;
            });
            this.httpRestClient.getData("supplier-autoLookUp/Contractor").subscribe(function (response) { _this.contractorAutoLookupList = response; });
        }
        else if (this.activeTabIndex == 5) {
            this.showPageSpinner = true;
            this.forBOQAmountCheck();
            this.callingApisForSupplierPo();
            this.supplierpocolsOne = [
                { field: 'businessName', header: 'Supplier Name', id: 'poID' },
                { field: 'boqItemName', header: 'BOQ Item', class: "center-align" },
                { field: 'poDate', header: 'PO Date', class: "center-align" },
                { field: 'poNo', header: 'PO No.' },
                { field: 'basicAmount', header: 'Basic Amount' },
                { field: 'taxAmount', header: 'GST' },
                { field: 'totalAmount', header: 'Total Amount' },
                { field: 'poStatus', header: 'PO Status', class: "center-align" },
                { field: 'frStatus', header: 'FR Status', class: "center-align" },
                { field: 'paymentStatus', header: 'Payment Status', class: "center-align" },
                { field: 'paymentStatus', header: 'Cancle Status', class: "center-align" },
                { field: 'invoiceStatus', header: 'Invoice Status', class: "center-align" },
                { field: '', header: 'Mail Reminder', class: "center-align" },
            ];
            // this.supplierpocolsTwo = [
            //   { field: 'itemName', header: 'Item', id: 'itemID' },
            //   { field: 'itemUnit', header: 'Unit' },
            //   { field: 'itemQty', header: 'Qty' },
            //   { field: 'qtyApprovedforProcurement', header: 'Qty Appd' },
            //   { field: 'newProcurementQty', header: 'New Qty' },
            //   { field: 'budgetAmount', header: 'Amount' },
            //   { field: 'alreadySpent', header: 'Last Amt' },
            //   { field: 'itemUnitRate', header: 'Last Rate', class: "center-align" },
            //   { field: 'currentUnitRate', header: 'Curr Rate' },
            //   { field: 'currentUnitGST', header: 'Curr GST', class: "center-align" },
            //   { field: 'amount', header: 'Amount', class: "center-align" }
            // ];
            this.supplierpocolsTwo = [
                { field: 'itemName', header: 'Item', id: 'itemID' },
                { field: 'itemUnit', header: 'Unit' },
                { field: 'itemQty', header: 'BOQ Qty' },
                { field: 'budgetAmount', header: 'BOQ Amt' },
                { field: 'qtyApprovedforProcurement', header: ' Ord Qty' },
                { field: 'alreadySpent', header: 'Ord Amt' },
                { field: 'itemUnitRate', header: 'Last Rate', class: "center-align" },
                { field: 'newProcurementQty', header: 'New Qty', value: "NewQtyFieldValue" },
                { field: 'currentUnitRate', header: ' New Rate' },
                { field: 'currentUnitGST', header: 'New GST', class: "center-align" },
                { field: 'amount', header: 'New Amt', class: "center-align" }
            ];
        }
    };
    // Dialog Box Close & Open 
    AddProjectComponent.prototype.showDialogToAdd = function () {
        this.projectStatuses = new __WEBPACK_IMPORTED_MODULE_8__project__["i" /* ProjectStatus */]();
        this.projectStatuses.statusDate = new Date();
        this.displayProjectStatusDialog = true;
    };
    AddProjectComponent.prototype.showPODialog = function () {
        this.customerPOs = new __WEBPACK_IMPORTED_MODULE_8__project__["c" /* CustomerPOs */]();
        this.customerPOs.poDate = new Date();
        this.displayPODialog = true;
        this.poDialogHeader = "Add Customer PO";
        this.CustomerPOsEditFlag = false;
    };
    AddProjectComponent.prototype.closeDialog = function () {
        this.projectStatuses = new __WEBPACK_IMPORTED_MODULE_8__project__["i" /* ProjectStatus */]();
        this.displayProjectStatusDialog = false;
        this.displayPODialog = false;
        this.displayAddInvoiceDialog = false;
        this.displayConPODialog = false;
        this.ContractorPOsEditFlag = false;
        this.CustomerPOsEditFlag = false;
        this.displaySupplierPODialog = false;
        this.displayProjectBOQDialog = false;
    };
    AddProjectComponent.prototype.showContractorPODialog = function () {
        this.ContractorPOsEditFlag = false;
        this.contractorPOs = new __WEBPACK_IMPORTED_MODULE_8__project__["b" /* ContractorPOs */]();
        this.contractorPOs.poDate = new Date();
        this.displayConPODialog = true;
        this.conPoDialogHeader = "Add Contractor PO";
    };
    //  Project Status Tab 
    AddProjectComponent.prototype.addProjectStatus = function () {
        var _this = this;
        this.msgs = [];
        if (this.projectStatuses.statusDate == null || this.projectStatuses.statusDate == undefined) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Status Date can't be blank!" });
        }
        else if (this.projectStatuses.statusListID == null || this.projectStatuses.statusListID == undefined) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Status can't be blank!" });
        }
        else if (this.projectStatuses.statusListID.parameterListValue.toLowerCase().localeCompare(this.project.statusListID.parameterListValue.toLowerCase()) == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "New Status can't be same as Current Status" });
        }
        else {
            this.projectbean.projectID = this.projectService.getter();
            this.projectStatuses.projectID = this.projectbean;
            this.projectStatuses.createdBy = this.currentuser.userID;
            this.httpRestClient.postData("add-project-status/", this.projectStatuses).subscribe(function (response) {
                _this.baseResponse = response;
                if (_this.baseResponse['code'] == 'ADDED') {
                    _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                    _this.displayProjectStatusDialog = false;
                    _this.httpRestClient.getData("project-statuses/" + _this.projectService.getter() + "").subscribe(function (response) {
                        _this.projectStatusesSearch = response;
                    });
                    _this.httpRestClient.getData("editProject/" + _this.projectService.getter() + "")
                        .subscribe(function (response) {
                        _this.project = response;
                        _this.project.allocationDate = new Date(_this.project.allocationDate);
                        if (_this.project.completionDate != null && _this.project.completionDate != undefined)
                            _this.project.completionDate = new Date(_this.project.completionDate);
                        else {
                            _this.project.completionDate = null;
                        }
                        _this.project.statusDate = new Date(_this.project.statusDate);
                        _this.editFlag = true;
                    });
                }
                else {
                    _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                }
            });
        }
    };
    //  Customer POs Tab 
    AddProjectComponent.prototype.AddPOs = function () {
        var _this = this;
        this.msgs = [];
        if (this.customerPOs.poDate == undefined || this.customerPOs.poDate == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Date can't be blank!" });
        }
        else if (this.customerPOs.poNo == undefined || this.customerPOs.poNo.trim() == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO No. can't be blank!" });
        }
        else if (this.customerPOs.basicAmount == undefined || this.customerPOs.basicAmount == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Amount can't be blank" });
        }
        else if ((this.customerPOs.taxAmount == undefined || this.customerPOs.taxAmount.length == 0)) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount  can't be blank" });
        }
        else if (this.customerPOs.totalAmount == undefined || this.customerPOs.totalAmount == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Total Amount can't be blank" });
        }
        else if (this.customerPOs.activityTypeListID == null || this.customerPOs.activityTypeListID == undefined) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Activity Type can't be blank" });
        }
        else {
            this.projectbean.projectID = this.projectService.getter();
            this.contactbean.contactID = this.project.contactID.contactID;
            this.customerPOs.projectID = this.projectbean;
            this.customerPOs.contactID = this.contactbean;
            this.customerPOs.poStatus = 'Approved';
            if (!this.CustomerPOsEditFlag) {
                this.customerPOs.invoiceStatus = 'None';
                this.httpRestClient.postData("add-customer-po/", this.customerPOs).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                        _this.displayPODialog = false;
                        _this.httpRestClient.getData("search-po/" + _this.projectService.getter() + "/Customer").subscribe(function (response) {
                            _this.customerPOsearch = response;
                        });
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                });
            }
            else {
                this.httpRestClient.putData("update-customer-po/", this.customerPOs).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.displayPODialog = false;
                        _this.httpRestClient.getData("search-po/" + _this.projectService.getter() + "/Customer").subscribe(function (response) {
                            _this.customerPOsearch = response;
                        });
                        _this.CustomerPOsEditFlag = false;
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                });
            }
        }
    };
    AddProjectComponent.prototype.preparePOsTotal = function () {
        if (this.customerPOs.basicAmount != null && this.customerPOs.basicAmount != undefined && this.customerPOs.basicAmount != '' && this.customerPOs.taxAmount != null && this.customerPOs.taxAmount != undefined && this.customerPOs.taxAmount != '') {
            this.customerPOs.totalAmount = parseInt(this.customerPOs.basicAmount) + parseInt(this.customerPOs.taxAmount);
        }
        else if (this.customerPOs.basicAmount != null && this.customerPOs.basicAmount != undefined && this.customerPOs.basicAmount != '') {
            this.customerPOs.totalAmount = parseInt(this.customerPOs.basicAmount);
        }
        else if (this.customerPOs.taxAmount != null && this.customerPOs.taxAmount != undefined && this.customerPOs.taxAmount != '') {
            this.customerPOs.totalAmount = parseInt(this.customerPOs.taxAmount);
        }
        else {
            this.customerPOs.totalAmount = '';
        }
        //Contractor Po's total
        if (this.contractorPOs.basicAmount != null && this.contractorPOs.basicAmount != undefined && this.contractorPOs.basicAmount != '' && this.contractorPOs.taxAmount != null && this.contractorPOs.taxAmount != undefined && this.contractorPOs.taxAmount != '') {
            this.contractorPOs.totalAmount = parseInt(this.contractorPOs.basicAmount) + parseInt(this.contractorPOs.taxAmount);
        }
        else if (this.contractorPOs.basicAmount != null && this.contractorPOs.basicAmount != undefined && this.contractorPOs.basicAmount != '') {
            this.contractorPOs.totalAmount = parseInt(this.contractorPOs.basicAmount);
        }
        else if (this.contractorPOs.taxAmount != null && this.contractorPOs.taxAmount != undefined && this.contractorPOs.taxAmount != '') {
            this.contractorPOs.totalAmount = parseInt(this.contractorPOs.taxAmount);
        }
        else {
            this.contractorPOs.totalAmount = '';
        }
    };
    AddProjectComponent.prototype.editCustomerPO = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.CustomerPOsEditFlag = true;
        this.poDialogHeader = "Edit Customer PO ";
        this.httpRestClient.getData("edit-customer-po/" + poID + "")
            .subscribe(function (response) {
            _this.customerPOs = response;
            _this.customerPOs.poDate = new Date(_this.customerPOs.poDate);
            _this.showPageSpinner = false;
        });
        this.displayPODialog = true;
    };
    //Edit ContractorPO
    AddProjectComponent.prototype.editContractorPO = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.ContractorPOsEditFlag = true;
        this.conPoDialogHeader = "Edit Contractor PO ";
        this.httpRestClient.getData("edit-contractor-po/" + poID + "")
            .subscribe(function (response) {
            _this.contractorPOs = response;
            _this.contractorPOs.poDate = new Date(_this.contractorPOs.poDate);
            _this.showPageSpinner = false;
            if (_this.contractorPOs.contactID.entityType == 'Individual') {
                _this.contractorPOs.contactID.businessName = _this.contractorPOs.contactID.firstName + ' ' + _this.contractorPOs.contactID.lastName;
            }
        });
        this.displayConPODialog = true;
    };
    // Add Invoice Functions
    AddProjectComponent.prototype.showAddInvoiceDialog = function (event, event1) {
        var _this = this;
        this.showPageSpinner = true;
        this.oneTimeClick = true;
        this.selectedPOs = event;
        this.invoiceDialogHeader = "Add PO Invoice";
        this.InvoiceEditFlag = false;
        this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
        this.invoiceDetails.invoiceDate = new Date();
        this.msgs = [];
        this.totalInvoiceAmount = 0;
        this.pendingInvoiceAmount = 0;
        this.purcahseOrderId = this.selectedPOs.poID;
        if (this.selectedPOs == null || this.selectedPOs == undefined) {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
        }
        else if (this.selectedPOs.length != 0) {
            this.httpRestClient.getData("edit-customer-po/" + this.selectedPOs.poID + "")
                .subscribe(function (response) {
                _this.customerPOs = response;
                _this.customerPOs.poDate = new Date(_this.customerPOs.poDate);
                _this.activityLabel = _this.customerPOs.activityTypeListID.parameterListValue;
                _this.httpRestClient.getData("invoice-details/" + _this.selectedPOs.poID + "")
                    .subscribe(function (response) {
                    _this.invoiceSearch = response;
                    response.forEach(function (element) {
                        _this.totalInvoiceAmount = _this.totalInvoiceAmount + element.totalAmount;
                    });
                    _this.pendingInvoiceAmount = _this.customerPOs.totalAmount - _this.totalInvoiceAmount;
                    _this.displayAddInvoiceDialog = true;
                    _this.showPageSpinner = false;
                });
                setTimeout(function () {
                    _this.oneTimeClick = false;
                }, 100);
            });
        }
        else {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
            this.oneTimeClick = false;
        }
    };
    AddProjectComponent.prototype.AddInvoice = function () {
        var _this = this;
        if (this.pendingInvoiceAmount != 0) {
            this.dialogmsgs = [];
            this.customerPOsBean.poID = this.selectedPOs.poID;
            this.invoiceDetails.poID = this.customerPOsBean;
            this.invoiceDetails.createdBy = this.currentuser.userID;
            if ((this.invoiceDetails.invoiceDate == null || this.invoiceDetails.invoiceDate == undefined)) {
                this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Date can't be blank!" });
            }
            else if (this.invoiceDetails.invoiceNo == undefined || this.invoiceDetails.invoiceNo.trim() == '') {
                this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice No can't be blank!" });
            }
            else if ((this.invoiceDetails.invoiceAmount == undefined || this.invoiceDetails.invoiceAmount == '')) {
                this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Amount can't be blank!" });
            }
            else if (this.invoiceDetails.gst == undefined || this.invoiceDetails.gst == '') {
                this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount can't be blank!" });
            }
            else if ((!this.InvoiceEditFlag && this.invoiceDetails.totalAmount > this.pendingInvoiceAmount)) {
                this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Total Amount  can't be greater than Pending Amount" });
            }
            else if (this.InvoiceEditFlag && this.invoiceDetails.totalAmount > (this.maxEditTotalAmount + this.pendingInvoiceAmount)) {
                this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Total Amount  can't be greater than  " + (this.maxEditTotalAmount + this.pendingInvoiceAmount) });
            }
            else {
                this.showPageSpinner = true;
                this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
                    .subscribe(function (response) {
                    _this.customerPOs = response;
                    _this.customerPOs.poDate = new Date(_this.customerPOs.poDate);
                });
                if (!this.InvoiceEditFlag) {
                    this.httpRestClient.postData("add-invoice", this.invoiceDetails).subscribe(function (response) {
                        _this.baseResponse = response;
                        if (_this.baseResponse['code'] == 'ADDED') {
                            _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                            _this.httpRestClient.getData("invoice-details/" + _this.selectedPOs.poID + "")
                                .subscribe(function (response) {
                                _this.invoiceSearch = response;
                                _this.totalInvoiceAmount = 0;
                                _this.pendingInvoiceAmount = 0;
                                response.forEach(function (element) {
                                    _this.totalInvoiceAmount = _this.totalInvoiceAmount + element.totalAmount;
                                });
                                _this.pendingInvoiceAmount = _this.customerPOs.totalAmount - _this.totalInvoiceAmount;
                                if (_this.pendingInvoiceAmount == 0) {
                                    _this.customerPOs.invoiceStatus = "Completed";
                                    _this.httpRestClient.putData("update-contractor-po/", _this.customerPOs).subscribe(function (response) {
                                        _this.baseResponse = response;
                                        if (_this.baseResponse['code'] == 'UPDATED') {
                                            _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                        }
                                    });
                                }
                                else {
                                    _this.customerPOs.invoiceStatus = "Partial";
                                    _this.httpRestClient.putData("update-customer-po/", _this.customerPOs).subscribe(function (response) {
                                        _this.baseResponse = response;
                                        if (_this.baseResponse['code'] == 'UPDATED') {
                                            _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                        }
                                    });
                                }
                            });
                            _this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
                            _this.invoiceDetails.invoiceDate = new Date();
                        }
                        else {
                            _this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                        }
                        _this.showPageSpinner = false;
                    });
                }
                else {
                    this.httpRestClient.putData("update-invoice-details", this.invoiceDetails).subscribe(function (response) {
                        _this.baseResponse = response;
                        if (_this.baseResponse['code'] == 'UPDATED') {
                            _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                            _this.httpRestClient.getData("invoice-details/" + _this.selectedPOs.poID + "")
                                .subscribe(function (response) {
                                _this.invoiceSearch = response;
                                _this.totalInvoiceAmount = 0;
                                _this.pendingInvoiceAmount = 0;
                                response.forEach(function (element) {
                                    _this.totalInvoiceAmount = _this.totalInvoiceAmount + element.totalAmount;
                                });
                                _this.pendingInvoiceAmount = _this.customerPOs.totalAmount - _this.totalInvoiceAmount;
                                if (_this.pendingInvoiceAmount == 0) {
                                    _this.customerPOs.invoiceStatus = "Completed";
                                    _this.httpRestClient.putData("update-contractor-po/", _this.customerPOs).subscribe(function (response) {
                                        _this.baseResponse = response;
                                        if (_this.baseResponse['code'] == 'UPDATED') {
                                            _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                        }
                                    });
                                }
                                else {
                                    _this.customerPOs.invoiceStatus = "Partial";
                                    _this.httpRestClient.putData("update-contractor-po/", _this.customerPOs).subscribe(function (response) {
                                        _this.baseResponse = response;
                                        if (_this.baseResponse['code'] == 'UPDATED') {
                                            _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                        }
                                    });
                                }
                                _this.showPageSpinner = false;
                            });
                            _this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
                            _this.invoiceDetails.invoiceDate = new Date();
                            _this.InvoiceEditFlag = false;
                        }
                        else {
                            _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                        }
                    });
                }
            }
        }
    };
    //Add Contractor's invoie
    AddProjectComponent.prototype.AddContractorPOInvoice = function () {
        var _this = this;
        this.dialogmsgs = [];
        this.contractorPOsBean.poID = this.purcahseOrderId;
        this.invoiceDetails.poID = this.contractorPOsBean;
        this.invoiceDetails.createdBy = this.currentuser.userID;
        if (this.invoiceDetails.invoiceNo == undefined || this.invoiceDetails.invoiceNo.trim() == '') {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice No can't be blank!" });
        }
        else if ((this.invoiceDetails.invoiceDate == null || this.invoiceDetails.invoiceDate == undefined)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Date can't be blank!" });
        }
        else if ((this.invoiceDetails.invoiceAmount == undefined || this.invoiceDetails.invoiceAmount == '')) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Amount can't be blank!" });
        }
        else if (this.invoiceDetails.gst == undefined || this.invoiceDetails.gst == '') {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount can't be blank!" });
        }
        else if ((!this.InvoiceEditFlag && this.invoiceDetails.totalAmount > this.pendingInvoiceAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than  Total PO Amount" }); //("+this.pendingInvoiceAmount+")"});                
        }
        else if (this.InvoiceEditFlag && this.invoiceDetails.totalAmount > (this.maxEditTotalAmount + this.pendingInvoiceAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than  Total PO Amount" }); //("+(this.maxEditTotalAmount+this.pendingInvoiceAmount)});                
        }
        else {
            this.showPageSpinner = true;
            this.refreshPoStatus(this.purcahseOrderId);
            if (!this.InvoiceEditFlag) {
                this.httpRestClient.postData("add-invoice", this.invoiceDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                        _this.httpRestClient.getData("invoice-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.invoiceSearch = response;
                            _this.addedContractorInvoice = 0;
                            _this.totalInvoiceAmount = 0;
                            _this.pendingInvoiceAmount = 0;
                            response.forEach(function (element) {
                                _this.addedContractorInvoice = _this.addedContractorInvoice + element.totalAmount;
                            });
                            // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                            //   .subscribe(response => {
                            //     this.paymentSearch = response;
                            //     response.forEach((element) => {
                            //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;
                            //     });
                            _this.pendingInvoiceAmount = _this.contractorPOs.totalAmount - _this.addedContractorInvoice;
                            if (_this.pendingInvoiceAmount == 0) {
                                _this.contractorPOs.invoiceStatus = "Completed";
                            }
                            else {
                                _this.contractorPOs.invoiceStatus = "Partial";
                            }
                            _this.httpRestClient.putData("update-contractor-po/", _this.contractorPOs).subscribe(function (response) {
                                _this.baseResponse = response;
                                if (_this.baseResponse['code'] == 'UPDATED') {
                                    _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                }
                            });
                            // });
                        });
                        _this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
                        _this.invoiceDetails.invoiceDate = new Date();
                    }
                    else {
                        _this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
            else {
                this.httpRestClient.putData("update-invoice-details", this.invoiceDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.httpRestClient.getData("invoice-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.invoiceSearch = response;
                            _this.addedContractorInvoice = 0;
                            _this.totalInvoiceAmount = 0;
                            _this.pendingInvoiceAmount = 0;
                            response.forEach(function (element) {
                                _this.addedContractorInvoice = _this.addedContractorInvoice + element.totalAmount;
                            });
                            // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                            //   .subscribe(response => {
                            //     this.paymentSearch = response;
                            //     response.forEach((element) => {
                            //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;
                            //     });
                            _this.pendingInvoiceAmount = _this.contractorPOs.totalAmount - _this.addedContractorInvoice;
                            if (_this.pendingInvoiceAmount == 0) {
                                _this.contractorPOs.invoiceStatus = "Completed";
                            }
                            else {
                                _this.contractorPOs.invoiceStatus = "Partial";
                            }
                            _this.httpRestClient.putData("update-contractor-po/", _this.contractorPOs).subscribe(function (response) {
                                _this.baseResponse = response;
                                if (_this.baseResponse['code'] == 'UPDATED') {
                                    _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                }
                            });
                            //  });
                        });
                        _this.InvoiceEditFlag = false;
                        _this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
                        _this.invoiceDetails.invoiceDate = new Date();
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
        }
    };
    AddProjectComponent.prototype.prepareInvoiceTotal = function () {
        if (this.invoiceDetails.invoiceAmount != null && this.invoiceDetails.invoiceAmount != undefined && this.invoiceDetails.invoiceAmount != '' && this.invoiceDetails.gst != null && this.invoiceDetails.gst != undefined && this.invoiceDetails.gst != '') {
            this.invoiceDetails.totalAmount = parseInt(this.invoiceDetails.invoiceAmount) + parseInt(this.invoiceDetails.gst);
        }
        else if (this.invoiceDetails.invoiceAmount != null && this.invoiceDetails.invoiceAmount != undefined && this.invoiceDetails.invoiceAmount != '') {
            this.invoiceDetails.totalAmount = parseInt(this.invoiceDetails.invoiceAmount);
        }
        else if (this.invoiceDetails.gst != null && this.invoiceDetails.gst != undefined && this.invoiceDetails.gst != '') {
            this.invoiceDetails.totalAmount = parseInt(this.invoiceDetails.gst);
        }
        else {
            this.invoiceDetails.totalAmount = '';
        }
    };
    AddProjectComponent.prototype.closeContractorInvoiceDialog = function () {
        var _this = this;
        this.displayContractorPOAddInvoiceDialog = false;
        this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(function (response) {
            _this.contractorPOsearch = response;
        });
    };
    AddProjectComponent.prototype.closeInvoiceDialog = function () {
        var _this = this;
        this.displayAddInvoiceDialog = false;
        this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Customer").subscribe(function (response) {
            _this.customerPOsearch = response;
        });
    };
    AddProjectComponent.prototype.editInvoice = function (idID) {
        var _this = this;
        this.contractorPoInvoiceDialogHeader = "Edit Invoice Details";
        this.invoiceDialogHeader = "Edit PO Invoice";
        this.maxEditTotalAmount = 0;
        this.InvoiceEditFlag = true;
        this.httpRestClient.getData("edit-invoice/" + idID + "")
            .subscribe(function (response) {
            _this.invoiceDetails = response;
            _this.invoiceDetails.invoiceDate = new Date(_this.invoiceDetails.invoiceDate);
            // this.maxEditTotalAmount = this.invoiceDetails.invoiceAmount;
            _this.maxEditTotalAmount = _this.invoiceDetails.totalAmount;
        });
    };
    // Add ContractorPO Invoice Functions
    AddProjectComponent.prototype.showAddContractorPOInvoiceDialog = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.contractorPoInvoiceDialogHeader = "Add Invoice Details";
        this.InvoiceEditFlag = false;
        this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
        this.invoiceDetails.invoiceDate = new Date();
        this.msgs = [];
        this.totalInvoiceAmount = 0;
        this.pendingInvoiceAmount = 0;
        this.addedContractorInvoice = 0;
        if (poID == null || poID == undefined) {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
        }
        else if (poID.length != 0) {
            this.purcahseOrderId = poID;
            this.httpRestClient.getData("edit-contractor-po/" + poID + "")
                .subscribe(function (response) {
                _this.contractorPOs = response;
                _this.contractorPOs.poDate = new Date(_this.contractorPOs.poDate);
                _this.activityLabel = _this.contractorPOs.activityTypeListID.parameterListValue;
                _this.httpRestClient.getData("invoice-details/" + poID + "")
                    .subscribe(function (response) {
                    _this.invoiceSearch = response;
                    response.forEach(function (element) {
                        _this.addedContractorInvoice = _this.addedContractorInvoice + element.totalAmount;
                    });
                    // this.httpRestClient.getData("payment-details/" + poID + "")
                    //   .subscribe(response => {
                    //     this.paymentSearch = response;
                    //     response.forEach((element) => {
                    //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;
                    //     });         
                    _this.pendingInvoiceAmount = _this.contractorPOs.totalAmount - _this.addedContractorInvoice;
                    _this.displayContractorPOAddInvoiceDialog = true;
                    _this.httpRestClient.getData("fr-details/" + poID + "")
                        .subscribe(function (response) {
                        _this.frSearch = response;
                        _this.totalFrAmount = 0;
                        response.forEach(function (element) {
                            _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                        });
                    });
                    _this.showPageSpinner = false;
                });
                //});
                setTimeout(function () {
                    _this.oneTimeClick = false;
                }, 100);
            });
        }
        else {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
            this.oneTimeClick = false;
        }
    };
    //  Contractor POs Tab 
    AddProjectComponent.prototype.AddContractorPOs = function () {
        var _this = this;
        this.msgs = [];
        if (this.contractorPOs.poDate == undefined || this.contractorPOs.poDate == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Date can't be blank!" });
        }
        else if (this.contractorPOs.basicAmount == undefined || this.contractorPOs.basicAmount == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "PO Amount can't be blank" });
        }
        else if (this.contractorPOs.taxAmount == undefined || this.contractorPOs.taxAmount == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount  can't be blank" });
        }
        else if (this.contractorPOs.totalAmount == undefined || this.contractorPOs.totalAmount == '') {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Total Amount can't be blank" });
        }
        else if (this.contractorPOs.activityTypeListID == null || this.contractorPOs.activityTypeListID == undefined) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Activity Type can't be blank" });
        }
        else if (this.boqTotalAmount < this.contractorPOs.totalAmount) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Your PO cannot be greater then BOQ Remaning amount" });
        }
        else {
            this.showPageSpinner = true;
            this.projectbean.projectID = this.projectService.getter();
            //this.contactbean.contactID=this.project.contactID.contactID;
            this.contractorPOs.projectID = this.projectbean;
            // this.contractorPOs.contactID=this.contactbean;
            this.contractorPOs.invoiceStatus = 'None';
            this.contractorPOs.poStatus = 'Pending';
            if (!this.ContractorPOsEditFlag) {
                this.httpRestClient.postData("add-contractor-po/", this.contractorPOs).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: _this.baseResponse['message'] });
                        _this.displayConPODialog = false;
                        console.log("search-po/" + _this.projectService.getter() + "/Contractor");
                        _this.httpRestClient.getData("search-po/" + _this.projectService.getter() + "/Contractor").subscribe(function (response) {
                            _this.contractorPOsearch = response;
                        });
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
            else {
                this.httpRestClient.putData("update-contractor-po/", this.contractorPOs).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.displayConPODialog = false;
                        _this.httpRestClient.getData("search-po/" + _this.projectService.getter() + "/Contractor").subscribe(function (response) {
                            _this.contractorPOsearch = response;
                        });
                        _this.ContractorPOsEditFlag = false;
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
        }
    };
    // SUPPLIER PO Code
    AddProjectComponent.prototype.AddSupplierPOInvoice = function () {
        var _this = this;
        this.dialogmsgs = [];
        this.supplierPos.poID = this.purcahseOrderId;
        this.invoiceDetails.poID = this.supplierPos;
        this.invoiceDetails.createdBy = this.currentuser.userID;
        if (this.invoiceDetails.invoiceNo == undefined || this.invoiceDetails.invoiceNo.trim() == '') {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice No can't be blank!" });
        }
        else if ((this.invoiceDetails.invoiceDate == undefined || this.invoiceDetails.invoiceDate == null)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Date can't be blank!" });
        }
        else if ((this.invoiceDetails.invoiceAmount == undefined || this.invoiceDetails.invoiceAmount == '')) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Invoice Amount can't be blank!" });
        }
        else if (this.invoiceDetails.gst == undefined || this.invoiceDetails.gst == '') {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "GST Amount can't be blank!" });
        }
        else if ((!this.InvoiceEditFlag && this.invoiceDetails.totalAmount > this.pendingInvoiceAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than Total PO Amount" }); //("+this.pendingInvoiceAmount+")"});                
        }
        else if (this.InvoiceEditFlag && this.invoiceDetails.totalAmount > (this.maxEditTotalAmount + this.pendingInvoiceAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Invoice Amount  can't be greater than Total PO Amount" }); //("+(this.maxEditTotalAmount+this.pendingInvoiceAmount)});                
        }
        else {
            this.showPageSpinner = true;
            this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
                .subscribe(function (response) {
                _this.supplierPos = response;
                _this.supplierPos.poDate = new Date(_this.supplierPos.poDate);
            });
            if (!this.InvoiceEditFlag) {
                this.httpRestClient.postData("add-invoice", this.invoiceDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                        _this.httpRestClient.getData("invoice-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.invoiceSearch = response;
                            _this.addedSupplierInvoice = 0;
                            _this.totalInvoiceAmount = 0;
                            _this.pendingInvoiceAmount = 0;
                            response.forEach(function (element) {
                                //this.addedSupplierInvoice += element.invoiceAmount;
                                _this.addedSupplierInvoice += element.totalAmount;
                            });
                            // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                            //   .subscribe(response => {
                            //     this.paymentSearch = response;
                            //     response.forEach((element) => {
                            //       this.totalInvoiceAmount = this.totalInvoiceAmount + element.paymentAmount;
                            //     });
                            _this.pendingInvoiceAmount = _this.supplierPos.totalAmount - _this.addedSupplierInvoice;
                            // this.pendingInvoiceAmount = this.totalInvoiceAmount - this.addedSupplierInvoice;
                            if (_this.pendingInvoiceAmount == 0) {
                                _this.supplierPos.invoiceStatus = "Completed";
                            }
                            else {
                                _this.supplierPos.invoiceStatus = "Partial";
                            }
                            _this.httpRestClient.putData("update-contractor-po/", _this.supplierPos).subscribe(function (response) {
                                _this.baseResponse = response;
                                if (_this.baseResponse['code'] == 'UPDATED') {
                                    _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                }
                            });
                            //});
                        });
                        _this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
                        _this.invoiceDetails.invoiceDate = new Date();
                    }
                    else {
                        _this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
            else {
                this.httpRestClient.putData("update-invoice-details", this.invoiceDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.httpRestClient.getData("invoice-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.invoiceSearch = response;
                            _this.addedSupplierInvoice = 0;
                            _this.totalInvoiceAmount = 0;
                            _this.pendingInvoiceAmount = 0;
                            response.forEach(function (element) {
                                //this.addedSupplierInvoice += element.invoiceAmount;
                                _this.addedSupplierInvoice += element.totalAmount;
                            });
                            // this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
                            //   .subscribe(response => {
                            //     this.paymentSearch = response;
                            //     response.forEach((element) => {
                            //       this.totalInvoiceAmount += element.paymentAmount;
                            //     });
                            _this.pendingInvoiceAmount = _this.supplierPos.totalAmount - _this.addedSupplierInvoice;
                            if (_this.pendingInvoiceAmount == 0) {
                                _this.supplierPos.invoiceStatus = "Completed";
                            }
                            else {
                                _this.supplierPos.invoiceStatus = "Partial";
                            }
                            _this.httpRestClient.putData("update-contractor-po/", _this.supplierPos).subscribe(function (response) {
                                _this.baseResponse = response;
                                if (_this.baseResponse['code'] == 'UPDATED') {
                                    _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Invoice Status Updated successfully!" });
                                }
                            });
                            // });
                        });
                        _this.InvoiceEditFlag = false;
                        _this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
                        _this.invoiceDetails.invoiceDate = new Date();
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
        }
    };
    AddProjectComponent.prototype.closeSupplierInvoiceDialog = function () {
        var _this = this;
        this.displaySupplierPOAddInvoiceDialog = false;
        this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(function (response) {
            _this.supplierPOSearch = response;
        });
    };
    AddProjectComponent.prototype.showAddSupplierPOInvoiceDialog = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.contractorPoInvoiceDialogHeader = "Add Invoice Details";
        this.InvoiceEditFlag = false;
        this.invoiceDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["f" /* InvoiceDetails */]();
        this.invoiceDetails.invoiceDate = new Date();
        this.msgs = [];
        //this.totalInvoiceAmount = 0;
        this.pendingInvoiceAmount = 0;
        this.addedSupplierInvoice = 0;
        this.purcahseOrderId = poID;
        this.httpRestClient.getData("edit-contractor-po/" + poID + "")
            .subscribe(function (response) {
            _this.supplierPos = response;
            _this.supplierPos.poDate = new Date(_this.supplierPos.poDate);
            _this.activityLabel = _this.supplierPos.activityTypeListID.parameterListValue;
            _this.httpRestClient.getData("invoice-details/" + poID + "")
                .subscribe(function (response) {
                _this.invoiceSearch = response;
                response.forEach(function (element) {
                    _this.addedSupplierInvoice += element.totalAmount;
                });
                _this.pendingInvoiceAmount += parseInt(_this.supplierPos.totalAmount) - parseInt(_this.addedSupplierInvoice);
                _this.httpRestClient.getData("fr-details/" + poID + "")
                    .subscribe(function (response) {
                    _this.frSearch = response;
                    _this.totalFrAmount = 0;
                    response.forEach(function (element) {
                        _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                    });
                });
                _this.displaySupplierPOAddInvoiceDialog = true;
                _this.showPageSpinner = false;
            });
            setTimeout(function () {
                _this.oneTimeClick = false;
            }, 100);
        });
        //       this.httpRestClient.getData("invoice-details/" + poID + "")
        // .subscribe(response => {
        //   this.invoiceSearch = response;
        //   response.forEach((element) => {
        //     this.addedSupplierInvoice += element.invoiceAmount;
        //   });
        //   this.httpRestClient.getData("payment-details/" + poID + "")
        //     .subscribe(response => {
        //       this.paymentSearch = response;
        //       response.forEach((element) => {
        //         this.totalInvoiceAmount += element.paymentAmount;
        //       });
        //       this.pendingInvoiceAmount = this.totalInvoiceAmount - this.addedSupplierInvoice;
        //       this.displaySupplierPOAddInvoiceDialog = true;
        //     });
        // });
    };
    AddProjectComponent.prototype.closeSupplierPaymentDialog = function () {
        var _this = this;
        this.displaySupplierPaymentDialog = false;
        this.paymentEditFlag = false;
        this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(function (response) {
            _this.supplierPOSearch = response;
        });
    };
    //ADD Payment Details
    AddProjectComponent.prototype.addSupplierPaymentDetails = function () {
        var _this = this;
        this.dialogmsgs = [];
        this.supplierPos.poID = this.purcahseOrderId;
        this.paymentDetails.poID = this.supplierPos;
        this.paymentDetails.createdBy = this.currentuser.userID;
        if (this.paymentDetails.paymentAmount == undefined || this.paymentDetails.paymentAmount.trim() == '' || this.paymentDetails.paymentAmount.trim() == 0) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Amount can't be blank or 0!" });
        }
        else if ((this.paymentDetails.paymentDate == null || this.paymentDetails.paymentDate == undefined)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Date can't be blank!" });
        }
        else if ((this.paymentDetails.paymentTypeListID == null || this.paymentDetails.paymentTypeListID == undefined)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Mode can't be blank!" });
        }
        else if (!this.paymentEditFlag && this.paymentDetails.paymentAmount > this.pendingPaymentAmount) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" }); //+(this.pendingPaymentAmount)});                
        }
        else if (this.paymentEditFlag && this.paymentDetails.paymentAmount > (this.maxEditTotalAmount + this.pendingPaymentAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" }); //+(this.maxEditTotalAmount+this.pendingPaymentAmount)});                
        }
        else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });
        }
        else {
            this.showPageSpinner = true;
            this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
                .subscribe(function (response) {
                _this.supplierPos = response;
                _this.supplierPos.poDate = new Date(_this.supplierPos.poDate);
            });
            var id;
            if (!this.paymentEditFlag) {
                this.httpRestClient.postData("add-payment", this.paymentDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    id = _this.baseResponse.message;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                        _this.addedPaymentAmount = 0;
                        _this.httpRestClient.getData("payment-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.paymentSearch = response;
                            response.forEach(function (element) {
                                _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
                            });
                            _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                                .subscribe(function (response) {
                                _this.frSearch = response;
                                _this.totalPaymentAmount = 0;
                                _this.pendingPaymentAmount = 0;
                                response.forEach(function (element) {
                                    _this.totalPaymentAmount = _this.totalPaymentAmount + element.frAmount;
                                });
                                _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                                if (_this.pendingPaymentAmount == 0) {
                                    _this.supplierPos.paymentStatus = "Completed";
                                    _this.getInvoiceDetailMethod();
                                    if (_this.payloadBean.searchParameter != undefined && _this.payloadBean.searchParameter != '') {
                                        _this.httpRestClient.getData("sendMail/" + _this.payloadBean.searchParameter + "/" + id)
                                            .subscribe(function (response) {
                                            _this.paymentTypeMailList = response;
                                        });
                                        _this.payloadBean.searchParameter = undefined;
                                    }
                                }
                                else {
                                    _this.supplierPos.paymentStatus = "Partial";
                                    _this.getInvoiceDetailMethod();
                                }
                            });
                        });
                        _this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
                        _this.paymentDetails.paymentDate = new Date();
                    }
                    else {
                        _this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
            else {
                this.httpRestClient.putData("update-payment-details", this.paymentDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.addedPaymentAmount = 0;
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.httpRestClient.getData("payment-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.paymentSearch = response;
                            response.forEach(function (element) {
                                _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
                            });
                            _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                                .subscribe(function (response) {
                                _this.frSearch = response;
                                _this.totalPaymentAmount = 0;
                                _this.pendingPaymentAmount = 0;
                                response.forEach(function (element) {
                                    _this.totalPaymentAmount = _this.totalPaymentAmount + element.frAmount;
                                });
                                _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                                if (_this.pendingPaymentAmount == 0) {
                                    _this.supplierPos.paymentStatus = "Completed";
                                    _this.getInvoiceDetailMethod();
                                }
                                else {
                                    _this.supplierPos.paymentStatus = "Partial";
                                    _this.getInvoiceDetailMethod();
                                }
                            });
                            _this.showPageSpinner = false;
                        });
                        _this.paymentEditFlag = false;
                        _this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
                        _this.paymentDetails.paymentDate = new Date();
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                });
            }
        }
    };
    AddProjectComponent.prototype.getInvoiceDetailMethod = function () {
        this.updateSupplierPoStatuses("Payment");
        // let invoiceAmount = 0;
        // this.httpRestClient.getData("invoice-details/" + this.purcahseOrderId)
        //   .subscribe(response => {
        //     this.invoiceSearch = response;
        //     response.forEach((element) => {
        //       invoiceAmount += element.invoiceAmount;
        //     });
        //     if ((invoiceAmount != 0) && (invoiceAmount != this.totalPaymentAmount)) {
        //       this.supplierPos.invoiceStatus = "Partial";
        //     }
        //     this.updateSupplierPoStatuses("Payment");
        //   });
    };
    AddProjectComponent.prototype.updateSupplierPoStatuses = function (paymnetType) {
        var _this = this;
        this.httpRestClient.putData("update-contractor-po/", this.supplierPos).subscribe(function (response) {
            _this.baseResponse = response;
            if (_this.baseResponse['code'] == 'UPDATED') {
                _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: paymnetType + " Status Updated successfully!" });
            }
        });
    };
    //Show payment Dialog
    AddProjectComponent.prototype.showSupplierPaymentDetails = function (poID) {
        var _this = this;
        console.log("djbc");
        this.showPageSpinner = true;
        this.paymentInvoiceDialogHeader = "Add Payment Details";
        this.paymentEditFlag = false;
        this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
        this.paymentDetails.paymentDate = new Date();
        this.msgs = [];
        this.purcahseOrderId = poID;
        this.httpRestClient.getData("edit-contractor-po/" + poID + "")
            .subscribe(function (response) {
            _this.supplierPos = response;
            _this.supplierPos.poDate = new Date(_this.supplierPos.poDate);
            _this.activityLabel = _this.supplierPos.activityTypeListID.parameterListValue;
        });
        this.totalPaymentAmount = 0;
        this.addedPaymentAmount = 0;
        this.httpRestClient.getData("payment-details/" + poID + "")
            .subscribe(function (response) {
            _this.paymentSearch = response;
            response.forEach(function (element) {
                _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
            });
            _this.httpRestClient.getData("fr-details/" + poID + "")
                .subscribe(function (response) {
                _this.frSearch = response;
                response.forEach(function (element) {
                    _this.totalPaymentAmount = _this.totalPaymentAmount + element.frAmount;
                });
                _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                _this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
                    .subscribe(function (response) { _this.paymentTypeList = response; });
            });
            _this.showPageSpinner = false;
        });
        this.displaySupplierPaymentDialog = true;
        setTimeout(function () {
            _this.oneTimeClick = false;
        }, 100);
    };
    //close FR Dialog
    AddProjectComponent.prototype.closeSupplierFrDialog = function () {
        var _this = this;
        this.displaySupplierFRDialog = false;
        this.FrEditFlag = false;
        this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(function (response) { _this.supplierPOSearch = response; });
    };
    AddProjectComponent.prototype.validateEmail = function (email) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };
    AddProjectComponent.prototype.checkEmailMethod = function (email) {
        var emailArray;
        var validateEmailFlag = true;
        emailArray = email.split(",");
        for (var count = 0; count < emailArray.length; count++) {
            validateEmailFlag = this.validateEmail(emailArray[count]);
            if (!validateEmailFlag) {
                break;
            }
        }
        return validateEmailFlag;
    };
    //Add FR 
    AddProjectComponent.prototype.addSupplierFundRequest = function () {
        var _this = this;
        this.dialogmsgs = [];
        this.supplierPos.poID = this.purcahseOrderId;
        this.frDetails.poID = this.supplierPos;
        if (this.frDetails.frAmount == undefined || this.frDetails.frAmount == '' || this.frDetails.frAmount == 0) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Amount can't be blank or 0!" });
        }
        else if ((this.frDetails.frDate == null || this.frDetails.frDate == undefined)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Date can't be blank!" });
        }
        else if ((this.frDetails.emailAddresses == undefined || this.frDetails.emailAddresses.trim() == '')) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Addresses can't be blank!" });
        }
        else if (!(this.checkEmailMethod(this.frDetails.emailAddresses))) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Please Enter valid Email Address!" });
        }
        else if (!this.FrEditFlag && this.frDetails.frAmount > this.pendingFrAmount) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " }); //+(this.pendingFrAmount)});                
        }
        else if (this.FrEditFlag && this.frDetails.frAmount > (this.maxEditTotalAmount + this.pendingFrAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " }); //+(this.maxEditTotalAmount+this.pendingFrAmount)});                
        }
        else {
            this.httpRestClient.getData("edit-customer-po/" + this.purcahseOrderId + "")
                .subscribe(function (response) {
                _this.supplierPos = response;
                _this.supplierPos.poDate = new Date(_this.supplierPos.poDate);
            });
            this.showSpinner = true;
            if (!this.FrEditFlag) {
                this.frDetails.createdBy = this.currentuser.userID;
                this.httpRestClient.postData("add-fr", this.frDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                        _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.frSearch = response;
                            _this.totalFrAmount = 0;
                            _this.pendingFrAmount = 0;
                            response.forEach(function (element) {
                                _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                            });
                            //this.pendingFrAmount = parseInt(this.supplierPos.basicAmount) - parseInt(this.totalFrAmount);
                            _this.pendingFrAmount = parseInt(_this.supplierPos.totalAmount) - parseInt(_this.totalFrAmount);
                            if (_this.pendingFrAmount == 0) {
                                _this.supplierPos.frStatus = "Completed";
                                _this.getPaymentDetailsMethod();
                            }
                            else {
                                _this.supplierPos.frStatus = "Partial";
                                _this.getPaymentDetailsMethod();
                            }
                        });
                        _this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
                        _this.frDetails.frDate = new Date();
                        _this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                            .subscribe(function (response) {
                            _this.parameterValueTO = response;
                            _this.frDetails.emailAddresses = _this.parameterValueTO.parameterValue;
                            if (_this.parameterValueTO.customValue1 != undefined) {
                                _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue1;
                            }
                            if (_this.parameterValueTO.customValue2 != undefined) {
                                _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue2;
                            }
                        });
                    }
                    else {
                        _this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showSpinner = false;
                    setTimeout(function () {
                        _this.msgs = [];
                        _this.dialogmsgs = [];
                    }, 1500);
                });
            }
            else {
                this.frDetails.lastModifiedBy = this.currentuser.userID;
                this.httpRestClient.putData("update-fr-details", this.frDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.frSearch = response;
                            _this.totalFrAmount = 0;
                            _this.pendingFrAmount = 0;
                            response.forEach(function (element) {
                                _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                            });
                            // this.pendingFrAmount = parseInt(this.supplierPos.basicAmount) - parseInt(this.totalFrAmount);
                            _this.pendingFrAmount = parseInt(_this.supplierPos.totalAmount) - parseInt(_this.totalFrAmount);
                            if (_this.pendingFrAmount == 0) {
                                _this.supplierPos.frStatus = "Completed";
                                _this.getPaymentDetailsMethod();
                            }
                            else {
                                _this.supplierPos.frStatus = "Partial";
                                _this.getPaymentDetailsMethod();
                            }
                        });
                        _this.FrEditFlag = false;
                        _this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
                        _this.frDetails.frDate = new Date();
                        _this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                            .subscribe(function (response) {
                            _this.parameterValueTO = response;
                            _this.frDetails.emailAddresses = _this.parameterValueTO.parameterValue;
                        });
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showSpinner = false;
                    setTimeout(function () {
                        _this.msgs = [];
                        _this.dialogmsgs = [];
                    }, 1500);
                });
            }
        }
    };
    AddProjectComponent.prototype.getPaymentDetailsMethod = function () {
        var _this = this;
        var paymentAmount = 0;
        this.httpRestClient.getData("payment-details/" + this.purcahseOrderId + "")
            .subscribe(function (response) {
            _this.paymentSearch = response;
            response.forEach(function (element) {
                paymentAmount += element.paymentAmount;
            });
            if ((paymentAmount != 0) && (paymentAmount != _this.totalFrAmount)) {
                _this.supplierPos.paymentStatus = "Partial";
            }
            _this.updateSupplierPoStatuses("FR");
        });
    };
    // Add FR Invoice 
    AddProjectComponent.prototype.showSupplierFRDialog = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.frInvoiceDialogHeader = "Add Fund Request";
        this.FrEditFlag = false;
        this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
        this.msgs = [];
        this.purcahseOrderId = poID;
        this.httpRestClient.getData("edit-customer-po/" + poID + "")
            .subscribe(function (response) {
            _this.supplierPos = response;
            _this.supplierPos.poDate = new Date(_this.supplierPos.poDate);
            _this.frDetails.frDate = new Date();
            _this.activityLabel = _this.supplierPos.activityTypeListID.parameterListValue;
            if (_this.supplierPos.contactID.entityType == 'Individual') {
                _this.supplierPos.contactID.businessName = _this.supplierPos.contactID.firstName + ' ' + _this.supplierPos.contactID.lastName;
            }
            _this.CustomerName = _this.supplierPos.contactID.businessName;
            _this.totalFrAmount = 0;
            _this.pendingFrAmount = 0;
            _this.httpRestClient.getData("fr-details/" + poID + "")
                .subscribe(function (response) {
                _this.frSearch = response;
                response.forEach(function (element) {
                    _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                });
                _this.pendingFrAmount = parseInt(_this.supplierPos.totalAmount) - parseInt(_this.totalFrAmount);
                _this.showPageSpinner = false;
            });
            _this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                .subscribe(function (response) {
                _this.parameterValueTO = response;
                _this.frDetails.emailAddresses = _this.parameterValueTO.parameterValue;
                if (_this.parameterValueTO.customValue1 != undefined) {
                    _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue1;
                }
                if (_this.parameterValueTO.customValue2 != undefined) {
                    _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue2;
                }
            });
            _this.displaySupplierFRDialog = true;
            setTimeout(function () {
                _this.oneTimeClick = false;
            }, 100);
        });
    };
    AddProjectComponent.prototype.filteredSupplierSingleMethod = function (event) {
        var query = event.query;
        this.filteredSupplierSingle = this.filterDataForSupplier(query, this.supplierAutoLookupList);
    };
    ;
    AddProjectComponent.prototype.filterDataForSupplier = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.businessName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.callingApisForSupplierPo = function () {
        var _this = this;
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(function (response) {
            _this.supplierPOSearch = response;
            _this.showPageSpinner = false;
        });
        this.httpRestClient.getData("parameter-list/ACTIVITY_TYPES").subscribe(function (response) {
            _this.supplieractivityTypeList = response;
            console.log(_this.supplieractivityTypeList);
        });
        this.httpRestClient.getData("supplier-autoLookUp/Supplier").subscribe(function (response) { _this.supplierAutoLookupList = response; });
    };
    AddProjectComponent.prototype.showSuplierPODialog = function () {
        var _this = this;
        this.showPageSpinner = true;
        this.supplierPos = new __WEBPACK_IMPORTED_MODULE_8__project__["j" /* SupplierPOs */]();
        this.displaySupplierPODialog = true;
        this.selectedSupplierdrawings = [];
        this.poheader = "Add Supplier PO";
        this.supplierPos.poDate = new Date();
        this.projectStatusDialogHeader = "Add Project Status";
        this.supplierPOsEditFlag = false;
        this.httpRestClient.getData("supplier-drawing-Items/" + this.project.drawingTypeID.drawingTypeID + "/" + this.project.projectID).subscribe(function (response) {
            _this.supplierDrawingItems = response;
            _this.showPageSpinner = false;
        });
    };
    AddProjectComponent.prototype.editSupplierPO = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.displaySupplierPODialog = true;
        this.selectedSupplierdrawings = [];
        this.supplierPOsEditFlag = true;
        this.poheader = "Edit Supplier PO ";
        this.httpRestClient.getData("edit-customer-po/" + poID + "")
            .subscribe(function (response) {
            _this.supplierPos = response;
            if (_this.supplierPos.contactID.entityType == 'Individual') {
                _this.supplierPos.contactID.businessName = _this.supplierPos.contactID.firstName + ' ' + _this.supplierPos.contactID.lastName;
            }
            _this.supplierPos.poDate = new Date(_this.supplierPos.poDate);
        });
        this.httpRestClient.getData("supplier-drawing-Items/" + this.project.drawingTypeID.drawingTypeID + "/" + this.project.projectID).subscribe(function (response) {
            _this.supplierDrawingItems = response;
            _this.httpRestClient.getData("supplier-drawing-selected-Items/" + poID + "/" + _this.project.projectID).subscribe(function (response) {
                _this.selectedSupplierdrawings = response;
                for (var counterofDrawingItem = 0; counterofDrawingItem < _this.supplierDrawingItems.length; counterofDrawingItem++) {
                    for (var countOfSelectedDrawingItem = 0; countOfSelectedDrawingItem < _this.selectedSupplierdrawings.length; countOfSelectedDrawingItem++) {
                        if (_this.supplierDrawingItems[counterofDrawingItem].itemID == _this.selectedSupplierdrawings[countOfSelectedDrawingItem].itemID) {
                            _this.selectedSupplierdrawings[countOfSelectedDrawingItem].NewQtyFieldValue = _this.selectedSupplierdrawings[countOfSelectedDrawingItem].newProcurementQty;
                            _this.supplierDrawingItems[counterofDrawingItem] = _this.selectedSupplierdrawings[countOfSelectedDrawingItem];
                            // this.supplierDrawingItems[counterofDrawingItem].budgetAmount = this.supplierDrawingItems[counterofDrawingItem].newProcurementQty * this.supplierDrawingItems[counterofDrawingItem].currentUnitRate;
                            // this.selectedSupplierdrawings[counterofDrawingItem].newProcurementQty = (this.selectedSupplierdrawings[counterofDrawingItem].newProcurementQty != undefined ? this.selectedSupplierdrawings[counterofDrawingItem].newProcurementQty : 0);
                            // this.selectedSupplierdrawings[counterofDrawingItem].currentUnitGST = (this.selectedSupplierdrawings[counterofDrawingItem].currentUnitGST != undefined ? this.selectedSupplierdrawings[counterofDrawingItem].currentUnitGST : 0);
                        }
                    }
                }
                _this.showPageSpinner = false;
            });
        });
    };
    AddProjectComponent.prototype.addSupplier = function () {
        var _this = this;
        this.msgs = [];
        if (this.supplierPos.contactID == undefined || this.supplierPos.contactID == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Supplier Name can't be blank!" });
        }
        else if (this.supplierPos.activityTypeListID == undefined || this.supplierPos.activityTypeListID == null) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Activity Type can't be blank!" });
        }
        else if (this.supplierDrawingItems.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please firstly add project BOQs." });
        }
        else if (this.selectedSupplierdrawings == undefined || this.selectedSupplierdrawings.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please Select one Item." });
        }
        else if (this.boqTotalAmount < this.supplierPos.totalAmount) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Your PO cannot be greater then BOQ Remaning amount" });
        }
        else {
            for (var counter = 0; counter < this.selectedSupplierdrawings.length; counter++) {
                var orderQuantity = (this.selectedSupplierdrawings[counter].qtyApprovedforProcurement == null ? 0 : this.selectedSupplierdrawings[counter].qtyApprovedforProcurement);
                var budgetQuantity = (this.selectedSupplierdrawings[counter].itemQty == null ? 0 : this.selectedSupplierdrawings[counter].itemQty);
                var differenceOfItems = parseInt(budgetQuantity) - parseInt(orderQuantity);
                if (this.supplierPOsEditFlag && (differenceOfItems + parseInt(this.selectedSupplierdrawings[counter].NewQtyFieldValue) < this.selectedSupplierdrawings[counter].newProcurementQty)) {
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Qty  of "' + this.selectedSupplierdrawings[counter].itemName + '" is ' + (differenceOfItems == 0 ? 'already ordered.' : 'cannnot be greater than' + differenceOfItems) });
                    return;
                }
                else if (!this.supplierPOsEditFlag && differenceOfItems < this.selectedSupplierdrawings[counter].newProcurementQty) {
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Qty  of "' + this.selectedSupplierdrawings[counter].itemName + '" is ' + (differenceOfItems == 0 ? 'already ordered.' : 'cannnot be greater than' + differenceOfItems) });
                    return;
                }
                if (this.selectedSupplierdrawings[counter].newProcurementQty == undefined || this.selectedSupplierdrawings[counter].newProcurementQty == 0 || this.selectedSupplierdrawings[counter].newProcurementQty == 0) {
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Qty of "' + this.selectedSupplierdrawings[counter].itemName + '" cannot be empty or 0!' });
                    return;
                }
                else if (this.selectedSupplierdrawings[counter].currentUnitRate == undefined || this.selectedSupplierdrawings[counter].currentUnitRate == 0) {
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New Rate of "' + this.selectedSupplierdrawings[counter].itemName + '" cannot be empty or 0!' });
                    return;
                }
                else if (this.selectedSupplierdrawings[counter].currentUnitGST == undefined || this.selectedSupplierdrawings[counter].currentUnitGST.length == 0) {
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'New GST of "' + this.selectedSupplierdrawings[counter].itemName + '" cannot be empty!' });
                    return;
                }
            }
            this.supplierPos.invoiceStatus = 'None';
            this.supplierPos.poStatus = 'Pending';
            this.supplierPos.frStatus = 'None';
            this.supplierPos.paymentStatus = 'None';
            this.projectbean.projectID = this.projectService.getter();
            this.supplierPos.projectID = this.projectbean;
            this.supplierPos.purchaseOrderItemList = this.selectedSupplierdrawings;
            if (!this.supplierPOsEditFlag) {
                this.supplierPos.createdBy = this.currentuser.userID;
                this.httpRestClient.postData("add-supplier-po/", this.supplierPos).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: _this.baseResponse['message'] });
                        _this.displaySupplierPODialog = false;
                        _this.httpRestClient.getData("search-po/" + _this.projectService.getter() + "/Supplier").subscribe(function (response) {
                            _this.supplierPOSearch = response;
                        });
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                });
            }
            else {
                this.supplierPos.lastModifiedBy = this.currentuser.userID;
                this.httpRestClient.putData("update-Supplier-po/", this.supplierPos).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.displaySupplierPODialog = false;
                        _this.httpRestClient.getData("search-po/" + _this.projectService.getter() + "/Supplier").subscribe(function (response) {
                            _this.supplierPOSearch = response;
                        });
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                });
            }
        }
    };
    AddProjectComponent.prototype.onRowSelect = function () {
        var basicAmount = 0;
        var taxAmount = 0;
        var totalAmount = 0;
        var basicPlusGstAmount = 0;
        for (var count = 0; count < this.selectedSupplierdrawings.length; count++) {
            var totalRowAmount = 0;
            if (this.selectedSupplierdrawings[count].newProcurementQty != undefined && !this.validateNumber.test(this.selectedSupplierdrawings[count].newProcurementQty)) {
                this.selectedSupplierdrawings[count].newProcurementQty = this.selectedSupplierdrawings[count].newProcurementQty.toString().substring(0, this.selectedSupplierdrawings[count].newProcurementQty.length - 1);
                return;
            }
            else if (this.selectedSupplierdrawings[count].currentUnitRate != undefined && !this.validateNumber.test(this.selectedSupplierdrawings[count].currentUnitRate)) {
                this.selectedSupplierdrawings[count].currentUnitRate = this.selectedSupplierdrawings[count].currentUnitRate.toString().substring(0, this.selectedSupplierdrawings[count].currentUnitRate.length - 1);
                return;
            }
            else if (this.selectedSupplierdrawings[count].currentUnitGST != undefined && !this.validateNumber.test(this.selectedSupplierdrawings[count].currentUnitGST)) {
                this.selectedSupplierdrawings[count].currentUnitGST = this.selectedSupplierdrawings[count].currentUnitGST.toString().substring(0, this.selectedSupplierdrawings[count].currentUnitGST.length - 1);
                return;
            }
            this.selectedSupplierdrawings[count].newProcurementQty = (this.selectedSupplierdrawings[count].newProcurementQty != null ? this.selectedSupplierdrawings[count].newProcurementQty : (this.selectedSupplierdrawings[count].itemQty - this.selectedSupplierdrawings[count].qtyApprovedforProcurement));
            this.selectedSupplierdrawings[count].currentUnitGST = (this.selectedSupplierdrawings[count].currentUnitGST != null ? this.selectedSupplierdrawings[count].currentUnitGST : 0);
            if (!(this.selectedSupplierdrawings[count].newProcurementQty == undefined || this.selectedSupplierdrawings[count].newProcurementQty == null
                || this.selectedSupplierdrawings[count].newProcurementQty.length == 0) && !(this.selectedSupplierdrawings[count].currentUnitRate == undefined
                || this.selectedSupplierdrawings[count].currentUnitRate == null || this.selectedSupplierdrawings[count].currentUnitRate.length == 0)) {
                totalRowAmount = parseInt(this.selectedSupplierdrawings[count].newProcurementQty) * parseInt(this.selectedSupplierdrawings[count].currentUnitRate);
                // this.selectedSupplierdrawings[count].budgetAmount = rowAmount;
                basicAmount += parseInt(this.selectedSupplierdrawings[count].newProcurementQty) * parseInt(this.selectedSupplierdrawings[count].currentUnitRate);
                if (!(this.selectedSupplierdrawings[count].currentUnitGST == undefined
                    || this.selectedSupplierdrawings[count].currentUnitGST == null
                    || this.selectedSupplierdrawings[count].currentUnitGST == '' || this.selectedSupplierdrawings[count].currentUnitGST == 0)) {
                    basicPlusGstAmount = parseInt(this.selectedSupplierdrawings[count].currentUnitGST) * parseInt(this.selectedSupplierdrawings[count].newProcurementQty);
                    totalRowAmount += basicPlusGstAmount;
                    taxAmount += parseInt(basicPlusGstAmount);
                }
                // totalAmount += parseInt(basicAmount) + parseInt(taxAmount);
                totalAmount += totalRowAmount;
                this.selectedSupplierdrawings[count].amount = totalRowAmount;
            }
        }
        this.supplierPos.taxAmount = parseInt(taxAmount);
        this.supplierPos.basicAmount = parseInt(basicAmount);
        this.supplierPos.totalAmount = parseInt(totalAmount);
    };
    AddProjectComponent.prototype.onRowUnSelect = function (event) {
        event.data.newProcurementQty = null;
        event.data.currentUnitGST = null;
        this.onRowSelect();
    };
    //  End Of Supplier Code
    // Add FR Invoice 
    AddProjectComponent.prototype.showFRDialog = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.frInvoiceDialogHeader = "Add Fund Request";
        this.FrEditFlag = false;
        this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
        this.msgs = [];
        //this.pendingInvoiceAmount=0;
        if (poID == null || poID == undefined) {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
        }
        else if (poID != 0) {
            this.purcahseOrderId = poID;
            this.httpRestClient.getData("edit-contractor-po/" + poID + "")
                .subscribe(function (response) {
                _this.contractorPOs = response;
                _this.contractorPOs.poDate = new Date(_this.contractorPOs.poDate);
                _this.frDetails.frDate = new Date();
                _this.activityLabel = _this.contractorPOs.activityTypeListID.parameterListValue;
                if (_this.contractorPOs.contactID.entityType == 'Individual') {
                    _this.contractorPOs.contactID.businessName = _this.contractorPOs.contactID.firstName + ' ' + _this.contractorPOs.contactID.lastName;
                }
                _this.CustomerName = _this.contractorPOs.contactID.businessName;
                _this.totalFrAmount = 0;
                _this.pendingFrAmount = 0;
                _this.httpRestClient.getData("fr-details/" + poID + "")
                    .subscribe(function (response) {
                    _this.frSearch = response;
                    response.forEach(function (element) {
                        _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                    });
                    _this.pendingFrAmount = parseInt(_this.contractorPOs.totalAmount) - parseInt(_this.totalFrAmount);
                    // this.pendingInvoiceAmount= this.contractorPOs.totalAmount- this.totalInvoiceAmount;
                    _this.showPageSpinner = false;
                });
                _this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                    .subscribe(function (response) {
                    _this.parameterValueTO = response;
                    _this.frDetails.emailAddresses = _this.parameterValueTO.parameterValue;
                    if (_this.parameterValueTO.customValue1 != undefined) {
                        _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue1;
                    }
                    if (_this.parameterValueTO.customValue2 != undefined) {
                        _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue2;
                    }
                });
                _this.displayFrDialog = true;
                setTimeout(function () {
                    _this.oneTimeClick = false;
                }, 100);
            });
        }
        else {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
            this.oneTimeClick = false;
        }
    };
    //Add FR 
    AddProjectComponent.prototype.AddFundRequest = function () {
        var _this = this;
        this.dialogmsgs = [];
        this.contractorPOsBean.poID = this.purcahseOrderId;
        this.frDetails.poID = this.contractorPOsBean;
        if (this.frDetails.frAmount == undefined || this.frDetails.frAmount == '' || this.frDetails.frAmount == 0) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Amount can't be blank or 0!" });
        }
        else if ((this.frDetails.frDate == null || this.frDetails.frDate == undefined)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "FR Date can't be blank!" });
        }
        else if ((this.frDetails.emailAddresses == undefined || this.frDetails.emailAddresses.trim() == '')) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Email Addresses can't be blank!" });
        }
        else if (!(this.checkEmailMethod(this.frDetails.emailAddresses))) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Please Enter valid Email Address!" });
        }
        else if (!this.FrEditFlag && this.frDetails.frAmount > this.pendingFrAmount) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " }); //+(this.pendingFrAmount)});                
        }
        else if (this.FrEditFlag && this.frDetails.frAmount > (this.maxEditTotalAmount + this.pendingFrAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Fund Amount  can't be greater than Toal PO Amount " }); //+(this.maxEditTotalAmount+this.pendingFrAmount)});                
        }
        else {
            this.refreshPoStatus(this.purcahseOrderId);
            this.showSpinner = true;
            if (!this.FrEditFlag) {
                this.frDetails.createdBy = this.currentuser.userID;
                this.httpRestClient.postData("add-fr", this.frDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                        _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.frSearch = response;
                            _this.totalFrAmount = 0;
                            _this.pendingFrAmount = 0;
                            response.forEach(function (element) {
                                _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                            });
                            _this.pendingFrAmount = parseInt(_this.contractorPOs.totalAmount) - parseInt(_this.totalFrAmount);
                            if (_this.pendingFrAmount == 0) {
                                _this.contractorPOs.frStatus = "Completed";
                            }
                            else {
                                _this.contractorPOs.frStatus = "Partial";
                            }
                            _this.httpRestClient.putData("update-contractor-po/", _this.contractorPOs).subscribe(function (response) {
                                _this.baseResponse = response;
                                if (_this.baseResponse['code'] == 'UPDATED') {
                                    _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "FR Status Updated successfully!" });
                                }
                            });
                        });
                        _this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
                        _this.frDetails.frDate = new Date();
                        _this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                            .subscribe(function (response) {
                            _this.parameterValueTO = response;
                            _this.frDetails.emailAddresses = _this.parameterValueTO.parameterValue;
                            if (_this.parameterValueTO.customValue1 != undefined) {
                                _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue1;
                            }
                            if (_this.parameterValueTO.customValue2 != undefined) {
                                _this.frDetails.emailAddresses = _this.frDetails.emailAddresses + "," + _this.parameterValueTO.customValue2;
                            }
                        });
                    }
                    else {
                        _this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showSpinner = false;
                    setTimeout(function () {
                        _this.dialogmsgs = [];
                        _this.msgs = [];
                    }, 1500);
                });
            }
            else {
                this.frDetails.lastModifiedBy = this.currentuser.userID;
                this.httpRestClient.putData("update-fr-details", this.frDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.frSearch = response;
                            _this.totalFrAmount = 0;
                            _this.pendingFrAmount = 0;
                            response.forEach(function (element) {
                                _this.totalFrAmount = _this.totalFrAmount + element.frAmount;
                            });
                            _this.pendingFrAmount = parseInt(_this.contractorPOs.totalAmount) - parseInt(_this.totalFrAmount);
                            if (_this.pendingFrAmount == 0) {
                                _this.contractorPOs.frStatus = "Completed";
                            }
                            else {
                                _this.contractorPOs.frStatus = "Partial";
                            }
                            _this.httpRestClient.putData("update-contractor-po/", _this.contractorPOs).subscribe(function (response) {
                                _this.baseResponse = response;
                                if (_this.baseResponse['code'] == 'UPDATED') {
                                    _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "FR Status Updated successfully!" });
                                }
                            });
                        });
                        _this.FrEditFlag = false;
                        _this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
                        _this.frDetails.frDate = new Date();
                        _this.httpRestClient.getData("parameter-values/FR_EMAIL_ADDRESSES")
                            .subscribe(function (response) {
                            _this.parameterValueTO = response;
                            _this.frDetails.emailAddresses = _this.parameterValueTO.parameterValue;
                        });
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showSpinner = false;
                    setTimeout(function () {
                        _this.dialogmsgs = [];
                        _this.msgs = [];
                    }, 1500);
                });
            }
        }
    };
    //Close FR Dialog
    AddProjectComponent.prototype.closeFrDialog = function () {
        var _this = this;
        this.displayFrDialog = false;
        this.FrEditFlag = false;
        this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(function (response) {
            _this.contractorPOsearch = response;
        });
    };
    //Edit FR
    AddProjectComponent.prototype.editFR = function (frID) {
        var _this = this;
        this.frInvoiceDialogHeader = "Edit Fund Request";
        this.maxEditTotalAmount = 0;
        this.FrEditFlag = true;
        this.httpRestClient.getData("edit-fr/" + frID + "")
            .subscribe(function (response) {
            _this.frDetails = response;
            _this.frDetails.frDate = new Date(_this.frDetails.frDate);
            _this.maxEditTotalAmount = _this.frDetails.frAmount;
        });
    };
    // Show Payment Details 
    AddProjectComponent.prototype.showPaymentDetails = function (poID) {
        var _this = this;
        this.showPageSpinner = true;
        this.paymentInvoiceDialogHeader = "Add Payment Details";
        this.paymentEditFlag = false;
        this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
        this.paymentDetails.paymentDate = new Date();
        this.msgs = [];
        //this.pendingInvoiceAmount=0;
        if (poID == null || poID == undefined) {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
        }
        else if (poID != 0) {
            this.purcahseOrderId = poID;
            this.httpRestClient.getData("edit-contractor-po/" + poID + "")
                .subscribe(function (response) {
                _this.contractorPOs = response;
                _this.contractorPOs.poDate = new Date(_this.contractorPOs.poDate);
                _this.activityLabel = _this.contractorPOs.activityTypeListID.parameterListValue;
            });
            this.totalPaymentAmount = 0;
            this.addedPaymentAmount = 0;
            //  this.pendingPaymentAmount=this.contractorPOs.totalAmount;
            this.httpRestClient.getData("payment-details/" + poID + "")
                .subscribe(function (response) {
                _this.paymentSearch = response;
                response.forEach(function (element) {
                    _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
                });
                _this.httpRestClient.getData("fr-details/" + poID + "")
                    .subscribe(function (response) {
                    _this.frSearch = response;
                    response.forEach(function (element) {
                        _this.totalPaymentAmount = _this.totalPaymentAmount + element.frAmount;
                    });
                    _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                    _this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
                        .subscribe(function (response) { _this.paymentTypeList = response; });
                });
                setTimeout(function () {
                    _this.oneTimeClick = false;
                }, 100);
                _this.showPageSpinner = false;
            });
            this.displayPaymentDialog = true;
            // });
        }
        else {
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].deleteWarning });
            this.oneTimeClick = false;
        }
    };
    //Close Payment Dialog
    AddProjectComponent.prototype.closePaymentDialog = function () {
        var _this = this;
        this.displayPaymentDialog = false;
        this.paymentEditFlag = false;
        this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(function (response) {
            _this.contractorPOsearch = response;
        });
    };
    AddProjectComponent.prototype.refreshPoStatus = function (poID) {
        var _this = this;
        this.httpRestClient.getData("edit-contractor-po/" + poID + "")
            .subscribe(function (response) {
            _this.contractorPOs = response;
            _this.contractorPOs.poDate = new Date(_this.contractorPOs.poDate);
            _this.activityLabel = _this.contractorPOs.activityTypeListID.parameterListValue;
        });
    };
    //ADD Payment Details
    AddProjectComponent.prototype.AddPaymentDetails = function () {
        var _this = this;
        this.dialogmsgs = [];
        this.contractorPOsBean.poID = this.purcahseOrderId;
        this.paymentDetails.poID = this.contractorPOsBean;
        this.paymentDetails.createdBy = this.currentuser.userID;
        if (this.paymentDetails.paymentAmount == undefined || this.paymentDetails.paymentAmount.trim() == '' || this.paymentDetails.paymentAmount.trim() == 0) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Amount can't be blank or 0!" });
        }
        else if ((this.paymentDetails.paymentDate == null || this.paymentDetails.paymentDate == undefined)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Date can't be blank!" });
        }
        else if ((this.paymentDetails.paymentTypeListID == null || this.paymentDetails.paymentTypeListID == undefined)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "Payment Mode can't be blank!" });
        }
        else if (!this.paymentEditFlag && this.paymentDetails.paymentAmount > this.pendingPaymentAmount) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" }); //+(this.pendingPaymentAmount)});                
        }
        else if (this.paymentEditFlag && this.paymentDetails.paymentAmount > (this.maxEditTotalAmount + this.pendingPaymentAmount)) {
            this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: "The total of Payment Amount  can't be greater than Total Fund Amount" }); //+(this.maxEditTotalAmount+this.pendingPaymentAmount)});                
        }
        else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });
        }
        else {
            this.showPageSpinner = true;
            this.refreshPoStatus(this.purcahseOrderId);
            var id;
            if (!this.paymentEditFlag) {
                this.httpRestClient.postData("add-payment", this.paymentDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    id = _this.baseResponse.message;
                    if (_this.baseResponse['code'] == 'ADDED') {
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                        _this.addedPaymentAmount = 0;
                        _this.httpRestClient.getData("payment-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.paymentSearch = response;
                            response.forEach(function (element) {
                                _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
                            });
                            _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                                .subscribe(function (response) {
                                _this.frSearch = response;
                                _this.totalPaymentAmount = 0;
                                _this.pendingPaymentAmount = 0;
                                response.forEach(function (element) {
                                    _this.totalPaymentAmount = _this.totalPaymentAmount + element.frAmount;
                                });
                                _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                                if (_this.pendingPaymentAmount == 0) {
                                    _this.contractorPOs.paymentStatus = "Completed";
                                    if (_this.payloadBean.searchParameter != undefined && _this.payloadBean.searchParameter != '') {
                                        _this.httpRestClient.getData("sendMail/" + _this.payloadBean.searchParameter + "/" + id)
                                            .subscribe(function (response) {
                                            _this.paymentTypeMailList = response;
                                        });
                                        _this.payloadBean.searchParameter = undefined;
                                    }
                                }
                                else {
                                    _this.contractorPOs.paymentStatus = "Partial";
                                }
                                _this.httpRestClient.putData("update-contractor-po/", _this.contractorPOs).subscribe(function (response) {
                                    _this.baseResponse = response;
                                    if (_this.baseResponse['code'] == 'UPDATED') {
                                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Payment Status Updated successfully!" });
                                    }
                                });
                            });
                        });
                        _this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
                        _this.paymentDetails.paymentDate = new Date();
                    }
                    else {
                        _this.dialogmsgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
            else {
                this.httpRestClient.putData("update-payment-details", this.paymentDetails).subscribe(function (response) {
                    _this.baseResponse = response;
                    if (_this.baseResponse['code'] == 'UPDATED') {
                        _this.addedPaymentAmount = 0;
                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
                        _this.httpRestClient.getData("payment-details/" + _this.purcahseOrderId + "")
                            .subscribe(function (response) {
                            _this.paymentSearch = response;
                            response.forEach(function (element) {
                                _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
                            });
                            _this.httpRestClient.getData("fr-details/" + _this.purcahseOrderId + "")
                                .subscribe(function (response) {
                                _this.frSearch = response;
                                _this.totalPaymentAmount = 0;
                                _this.pendingPaymentAmount = 0;
                                response.forEach(function (element) {
                                    _this.totalPaymentAmount = _this.totalPaymentAmount + element.frAmount;
                                });
                                _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                                if (_this.pendingPaymentAmount == 0) {
                                    _this.contractorPOs.paymentStatus = "Completed";
                                }
                                else {
                                    _this.contractorPOs.paymentStatus = "Partial";
                                }
                                _this.httpRestClient.putData("update-contractor-po/", _this.contractorPOs).subscribe(function (response) {
                                    _this.baseResponse = response;
                                    if (_this.baseResponse['code'] == 'UPDATED') {
                                        _this.dialogmsgs.push({ severity: 'success', summary: 'Success Message', detail: "Payment Status Updated successfully!" });
                                    }
                                });
                            });
                        });
                        _this.paymentEditFlag = false;
                        _this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
                        _this.paymentDetails.paymentDate = new Date();
                    }
                    else {
                        _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                    }
                    _this.showPageSpinner = false;
                });
            }
        }
    };
    //Edit FR
    AddProjectComponent.prototype.editPaymentDetails = function (pdID) {
        var _this = this;
        this.paymentInvoiceDialogHeader = "Edit Payment Details";
        this.maxEditTotalAmount = 0;
        this.paymentEditFlag = true;
        this.httpRestClient.getData("edit-payment/" + pdID + "")
            .subscribe(function (response) {
            _this.paymentDetails = response;
            _this.paymentDetails.paymentDate = new Date(_this.paymentDetails.paymentDate);
            _this.maxEditTotalAmount = _this.paymentDetails.paymentAmount;
        });
    };
    AddProjectComponent.prototype.showDialogToAddBOQ = function () {
        var _this = this;
        this.showPageSpinner = true;
        this.boqcolsTwo = [
            { field: 'itemName', header: 'Item', id: 'itemID' },
            { field: 'itemUnit', header: 'Unit' },
            { field: 'itemQty', header: 'BGT Qty' },
            { field: 'itemUnitRate', header: 'BGT Rate', class: "center-align" },
            { field: 'budgetAmount', header: ' BGT Amt' },
            { field: 'newProcurementQty', header: 'BOQ Qty' },
        ];
        this.displayProjectBOQDialog = true;
        this.boqEditFlag = false;
        this.selectedboqDrawingItems = [];
        this.boqBeanObject = new __WEBPACK_IMPORTED_MODULE_8__project__["a" /* BOQBean */]();
        if (this.boqtableSearch.length > 0) {
            this.boqBeanObject.grandTotalOfBOQ = this.boqtableSearch[this.boqtableSearch.length - 1].grandTotalOfBOQ;
        }
        else {
            this.boqBeanObject.grandTotalOfBOQ = 0;
        }
        this.projectStatusDialogHeader = "Add Project BOQ";
        this.boqBeanObject.boqdate = new Date();
        this.httpRestClient.getData("fetch-boq-drawing-items/" + this.projectService.getter() + "/" + this.project.drawingTypeID.drawingTypeID).subscribe(function (response) {
            _this.boqDrawingItems = response;
            _this.showPageSpinner = false;
        });
    };
    AddProjectComponent.prototype.onBOQRowSelect = function () {
        for (var count = 0; count < this.selectedboqDrawingItems.length; count++) {
            this.selectedboqDrawingItems[count].newProcurementQty = (this.selectedboqDrawingItems[count].newProcurementQty != null ? this.selectedboqDrawingItems[count].newProcurementQty : 0);
            if (this.selectedboqDrawingItems[count].newProcurementQty != undefined
                && !this.validateNumber.test(this.selectedboqDrawingItems[count].newProcurementQty)) {
                this.selectedboqDrawingItems[count].newProcurementQty = this.selectedboqDrawingItems[count].newProcurementQty.toString().substring(0, this.selectedboqDrawingItems[count].newProcurementQty.length - 1);
                return;
            }
            else if (this.selectedboqDrawingItems[count].itemUnitRate != undefined && !this.validateNumber.test(this.selectedboqDrawingItems[count].itemUnitRate)) {
                this.selectedboqDrawingItems[count].itemUnitRate = this.selectedboqDrawingItems[count].itemUnitRate.toString().substring(0, this.selectedboqDrawingItems[count].itemUnitRate.length - 1);
                return;
            }
            else if (!(this.selectedboqDrawingItems[count].newProcurementQty == null || this.selectedboqDrawingItems[count].newProcurementQty == "") && !(this.selectedboqDrawingItems[count].itemUnitRate == null || this.selectedboqDrawingItems[count].itemUnitRate == '')) {
                this.selectedboqDrawingItems[count].budgetAmount = parseInt(this.selectedboqDrawingItems[count].newProcurementQty) * parseInt(this.selectedboqDrawingItems[count].itemUnitRate);
            }
        }
    };
    AddProjectComponent.prototype.onBOQRowUnSelect = function (row) {
        row.data.newProcurementQty = null;
        this.onBOQRowSelect();
    };
    AddProjectComponent.prototype.addProjectBOQ = function () {
        var _this = this;
        this.msgs = [];
        if (this.boqDrawingItems.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: " There are no items available to create BOQ." });
            return;
        }
        else if (this.selectedboqDrawingItems.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please select atleast one item." });
            return;
        }
        for (var count = 0; count < this.selectedboqDrawingItems.length; count++) {
            if (this.selectedboqDrawingItems[count].itemUnitRate == undefined || this.selectedboqDrawingItems[count].itemUnitRate == 0 || this.selectedboqDrawingItems[count].itemUnitRate.toString().trim() == '') {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'BOQ Rate cannot be empty or 0 of item "' + this.selectedboqDrawingItems[count].itemName + '".' });
                return;
            }
            else if (this.selectedboqDrawingItems[count].newProcurementQty == undefined || this.selectedboqDrawingItems[count].newProcurementQty == 0
                || this.selectedboqDrawingItems[count].newProcurementQty.toString().trim() == '') {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'BOQ Qty cannot be empty or 0 of item "' + this.selectedboqDrawingItems[count].itemName + '".' });
                return;
            }
        }
        this.projectbean.projectID = this.projectService.getter();
        this.boqBeanObject.projectID = this.projectbean;
        this.boqBeanObject.purchaseOrderItemList = this.selectedboqDrawingItems;
        if (!this.boqEditFlag) {
            this.boqBeanObject.createdBy = this.currentuser.userID;
            this.httpRestClient.postData("add-project-boq-po/", this.boqBeanObject).subscribe(function (response) {
                _this.baseResponse = response;
                if (_this.baseResponse['code'] == 'ADDED') {
                    _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].AddSuccess });
                    _this.displayProjectBOQDialog = false;
                    _this.httpRestClient.getData("fetch-boq-info/" + _this.projectService.getter() + "").subscribe(function (response) {
                        _this.boqtableSearch = response;
                        if (_this.boqtableSearch.length > 0) {
                            _this.boqBeanObject.grandTotalOfBOQ = _this.boqtableSearch[_this.boqtableSearch.length - 1].grandTotalOfBOQ;
                        }
                        else {
                            _this.boqBeanObject.grandTotalOfBOQ = 0;
                        }
                    });
                }
                else {
                    _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
                }
            });
        }
        // } else {
        //   this.supplierPos.lastModifiedBy = this.currentuser.userID;
        //   this.httpRestClient.putData("update-Supplier-po/", this.supplierPos).subscribe(
        //     response => {
        //       this.baseResponse = response;
        //       if (this.baseResponse['code'] == 'UPDATED') {
        //         this.msgs.push({ severity: 'success', summary: 'Success Message', detail: messageConfig.updateSuccess });
        //         this.displaySupplierPODialog = false;
        //         this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(
        //           response => {
        //             this.supplierPOSearch = response;
        //           });
        //       } else {
        //         this.msgs.push({ severity: 'error', summary: 'Error Message', detail: this.baseResponse['message'] });
        //       }
        //     });
        // }
    };
    AddProjectComponent.prototype.editProjectBOQ = function (pkID) {
        var _this = this;
        this.showPageSpinner = true;
        this.boqcolsTwo = [
            { field: 'itemName', header: 'Item', id: 'itemID' },
            { field: 'itemUnit', header: 'Unit' },
            { field: 'itemQty', header: 'BOQ Qty', class: "center-align" },
            { field: 'itemUnitRate', header: 'BOQ Rate', class: "center-align" },
            { field: 'budgetAmount', header: ' BOQ Amt', class: "center-align" }
        ];
        this.boqEditFlag = true;
        this.projectStatusDialogHeader = "Project BOQ";
        this.httpRestClient.getData("edit-project-boq/" + pkID + "")
            .subscribe(function (response) {
            _this.boqBeanObject = response;
            if (_this.boqtableSearch.length > 0) {
                _this.boqBeanObject.grandTotalOfBOQ = _this.boqtableSearch[_this.boqtableSearch.length - 1].grandTotalOfBOQ;
            }
            else {
                _this.boqBeanObject.grandTotalOfBOQ = 0;
            }
            _this.boqBeanObject.boqdate = new Date(_this.boqBeanObject.boqdate);
        });
        this.displayProjectBOQDialog = true;
        this.httpRestClient.getData("boq-drawing-selected-Items/" + pkID).subscribe(function (response) {
            _this.boqDrawingItems = response;
            _this.showPageSpinner = false;
        });
    };
    AddProjectComponent.prototype.filteredActivityType = function (event) {
        var query = event.query;
        this.filteredActivity = this.filterDataForActivityType(query, this.activityTypeList);
    };
    AddProjectComponent.prototype.filterDataForActivityType = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.parameterListValue.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    AddProjectComponent.prototype.supplierActivityType = function (event) {
        var query = event.query;
        this.supplierActivity = this.filterDataForActivityType(query, this.supplieractivityTypeList);
    };
    AddProjectComponent.prototype.supplierDataForActivityType = function (query, data) {
        var filtered = [];
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (record.parameterListValue.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                filtered.push(record);
            }
        }
        return filtered;
    };
    //for v2.2
    AddProjectComponent.prototype.CancleStatus = function (poID, rowData) {
        var _this = this;
        this.showPageSpinner = true;
        this.paymentInvoiceDialogHeader = "Cancle PO";
        this.paymentEditFlag = false;
        this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
        this.paymentDetails.paymentDate = new Date();
        this.msgs = [];
        this.purcahseOrderId = poID;
        this.totalPaymentAmount = 0;
        this.addedPaymentAmount = 0;
        this.httpRestClient.getData("payment-details/" + poID + "")
            .subscribe(function (response) {
            _this.paymentSearch = response;
            response.forEach(function (element) {
                _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
            });
            _this.httpRestClient.getData("fr-details/" + poID + "")
                .subscribe(function (response) {
                _this.frSearch = response;
                _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                _this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
                    .subscribe(function (response) { _this.paymentTypeList = response; });
            });
            _this.totalPaymentAmount = rowData.totalAmount;
            // console.log(rowData);
        });
        this.purchaseOrdersBean.poID = rowData.poID;
        setTimeout(function () {
            if (rowData.totalAmount == _this.pendingPaymentAmount) {
                _this.purchaseOrdersBean.poStatus = 'Cancelled';
            }
            else {
                _this.purchaseOrdersBean.poStatus = 'Partial Cancelled';
            }
            _this.showPageSpinner = false;
            _this.CancleDialog = true;
        }, 2000);
        setTimeout(function () {
            _this.oneTimeClick = false;
        }, 100);
    };
    //close FR Dialog
    AddProjectComponent.prototype.closeCancleStatusDialog = function () {
        var _this = this;
        this.CancleDialog = false;
        this.FrEditFlag = false;
        this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(function (response) { _this.supplierPOSearch = response; });
    };
    AddProjectComponent.prototype.cancelPO = function () {
        var _this = this;
        // this.httpRestClient.postData("update-poStatus" , this.projectService.getter() ).subscribe(
        //   response => { this.supplierPOSearch = response; });
        this.purchaseOrdersBean.transactionCount = 1;
        this.showPageSpinner = true;
        this.httpRestClient.postData("update-poStatus", this.purchaseOrdersBean).subscribe(function (response) {
            _this.baseResponse = response;
            _this.showPageSpinner = false;
            if (_this.baseResponse['code'] == 'UPDATED') {
                _this.closeCancleStatusDialog();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
            }
            else {
                _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
            }
        });
    };
    AddProjectComponent.prototype.CancleStatus2 = function (poID, rowData) {
        var _this = this;
        this.showPageSpinner = true;
        this.paymentInvoiceDialogHeader = "Cancle PO";
        this.paymentEditFlag = false;
        this.paymentDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["g" /* PaymentDetails */]();
        this.paymentDetails.paymentDate = new Date();
        this.msgs = [];
        this.purcahseOrderId = poID;
        this.totalPaymentAmount = 0;
        this.addedPaymentAmount = 0;
        this.httpRestClient.getData("payment-details/" + poID + "")
            .subscribe(function (response) {
            _this.paymentSearch = response;
            response.forEach(function (element) {
                _this.addedPaymentAmount = _this.addedPaymentAmount + element.paymentAmount;
            });
            _this.httpRestClient.getData("fr-details/" + poID + "")
                .subscribe(function (response) {
                _this.frSearch = response;
                _this.pendingPaymentAmount = parseInt(_this.totalPaymentAmount) - parseInt(_this.addedPaymentAmount);
                _this.httpRestClient.getData("parameter-list-drop-down/Payment_Mode")
                    .subscribe(function (response) { _this.paymentTypeList = response; });
            });
            _this.totalPaymentAmount = rowData.totalAmount;
            // console.log(rowData);
        });
        this.purchaseOrdersBean.poID = rowData.poID;
        setTimeout(function () {
            if (rowData.totalAmount == _this.pendingPaymentAmount) {
                _this.purchaseOrdersBean.poStatus = 'Cancelled';
            }
            else {
                _this.purchaseOrdersBean.poStatus = 'Partial Cancelled';
            }
            _this.showPageSpinner = false;
            _this.CancleDialog2 = true;
        }, 2000);
        setTimeout(function () {
            _this.oneTimeClick = false;
        }, 100);
    };
    //close FR Dialog
    AddProjectComponent.prototype.closeCancleStatusDialog2 = function () {
        var _this = this;
        this.CancleDialog2 = false;
        this.FrEditFlag = false;
        this.frDetails = new __WEBPACK_IMPORTED_MODULE_8__project__["e" /* FRDetails */]();
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(function (response) {
            _this.contractorPOsearch = response;
        });
    };
    AddProjectComponent.prototype.cancelPO2 = function () {
        var _this = this;
        // this.httpRestClient.postData("update-poStatus" , this.projectService.getter() ).subscribe(
        //   response => { this.supplierPOSearch = response; });
        this.purchaseOrdersBean.transactionCount = 1;
        this.showPageSpinner = true;
        this.httpRestClient.postData("update-poStatus", this.purchaseOrdersBean).subscribe(function (response) {
            _this.baseResponse = response;
            _this.showPageSpinner = false;
            if (_this.baseResponse['code'] == 'UPDATED') {
                _this.closeCancleStatusDialog2();
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_11__app_config__["d" /* messageConfig */].updateSuccess });
            }
            else {
                _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
            }
        });
    };
    AddProjectComponent.prototype.validateEmail1 = function (email) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };
    AddProjectComponent.prototype.validateMultipleEmail = function (email) {
        this.emailRecipients = email.split(",");
        for (var i = 0; i < this.emailRecipients.length; i++) {
            if (this.emailRecipients[i] != "") {
                var flag = this.validateEmail1(this.emailRecipients[i]);
            }
        }
        return flag;
    };
    //reminder icon
    AddProjectComponent.prototype.reminderIcon = function (poID, rowData) {
        this.poID = rowData.poID;
        this.paymentInvoiceDialogHeader = "Reminder Dialog";
        this.reminderFlag = true;
    };
    AddProjectComponent.prototype.closeCancleReminderDialog = function () {
        this.reminderFlag = false;
    };
    AddProjectComponent.prototype.ReminderMails = function () {
        var _this = this;
        if (this.payloadBean.searchParameter == undefined || this.payloadBean.searchParameter == '') {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter Email Address" });
        }
        else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });
        }
        else {
            console.log(this.payloadBean.searchParameter);
            this.httpRestClient.getData("reminderMail/" + this.payloadBean.searchParameter + "/" + this.poID)
                .subscribe(function (response) {
                _this.paymentTypeMailList = response;
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: "Mail Send Successfully" });
                _this.reminderFlag = false;
            });
            this.payloadBean.searchParameter = undefined;
        }
    };
    AddProjectComponent.prototype.reminderIcon1 = function (poID, rowData) {
        this.poID = rowData.poID;
        this.paymentInvoiceDialogHeader = "Reminder Dialog";
        this.reminderFlag1 = true;
    };
    AddProjectComponent.prototype.closeCancleReminderDialog1 = function () {
        this.reminderFlag1 = false;
    };
    AddProjectComponent.prototype.ReminderMails1 = function () {
        var _this = this;
        if (this.payloadBean.searchParameter == undefined || this.payloadBean.searchParameter == '') {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter Email Address" });
        }
        else if ((this.payloadBean.searchParameter != undefined && this.payloadBean.searchParameter != '') && !this.validateMultipleEmail(this.payloadBean.searchParameter)) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please enter valid Email Address" });
        }
        else {
            console.log(this.payloadBean.searchParameter);
            this.httpRestClient.getData("reminderMail/" + this.payloadBean.searchParameter + "/" + this.poID)
                .subscribe(function (response) {
                _this.paymentTypeMailList = response;
                _this.msgs = [];
                _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: "Mail Send Successfully" });
                _this.reminderFlag1 = false;
            });
            this.payloadBean.searchParameter = undefined;
        }
    };
    AddProjectComponent.prototype.tabData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabdata, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sessionStorage.getItem("tabData")];
                    case 1:
                        tabdata = _a.sent();
                        data = tabdata.split(',');
                        // if(data.length!==4){
                        if (data[0].toUpperCase() == 'Y')
                            this.tabFlag1 = false;
                        else
                            this.tabFlag1 = true;
                        if (data[1].toUpperCase() == 'Y')
                            this.tabFlag2 = false;
                        else
                            this.tabFlag2 = true;
                        if (data[2].toUpperCase() == 'Y')
                            this.tabFlag3 = false;
                        else
                            this.tabFlag3 = true;
                        if (data[3].toUpperCase() == 'Y')
                            this.tabFlag4 = false;
                        else
                            this.tabFlag4 = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    AddProjectComponent.prototype.forBOQAmountCheck = function () {
        var _this = this;
        var totalAmount = 0;
        this.totalPaidAmount = 0;
        var paymentAmount = 0;
        var paymentAmount1 = 0;
        this.showPageSpinner = true;
        this.httpRestClient.getData("fetch-boq-info/" + this.projectService.getter() + "").subscribe(function (response) {
            _this.boqtableSearch = response;
            if (_this.boqtableSearch.length > 0) {
                _this.boqTotalAmount = _this.boqtableSearch[_this.boqtableSearch.length - 1].grandTotalOfBOQ;
            }
            else {
                _this.boqTotalAmount = 0;
            }
        });
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Contractor").subscribe(function (response) {
            _this.contractorPOsearch = response;
            for (var i = 0; i < _this.contractorPOsearch.length; i++) {
                if (_this.contractorPOsearch[i].poStatus != 'Cancelled' && _this.contractorPOsearch[i].poStatus != 'Partial Cancelled') {
                    totalAmount += _this.contractorPOsearch[i].totalAmount;
                }
                else {
                    if (_this.contractorPOsearch[i].poStatus == 'Partial Cancelled') {
                        _this.httpRestClient.getData("sum/" + _this.contractorPOsearch[i].poID + "")
                            .subscribe(function (response) {
                            _this.paymentSearch = response;
                            //if(this.paymentSearch.length>0)
                            paymentAmount = _this.paymentSearch[0].addition;
                        });
                    }
                    if (_this.contractorPOsearch[i].poStatus == 'Partial Cancelled') {
                        _this.totalPaidAmount += _this.contractorPOsearch[i].totalAmount;
                    }
                }
            }
        });
        this.httpRestClient.getData("search-po/" + this.projectService.getter() + "/Supplier").subscribe(function (response) {
            _this.supplierPOSearch = response;
            for (var i = 0; i < _this.supplierPOSearch.length; i++) {
                if (_this.supplierPOSearch[i].poStatus != 'Cancelled' && _this.supplierPOSearch[i].poStatus != 'Partial Cancelled') {
                    totalAmount += _this.supplierPOSearch[i].totalAmount;
                }
                else {
                    if (_this.supplierPOSearch[i].poStatus == 'Partial Cancelled') {
                        _this.httpRestClient.getData("sum/" + _this.supplierPOSearch[i].poID + "")
                            .subscribe(function (response) {
                            _this.paymentSearch = response;
                            //if(this.paymentSearch.length>0)
                            paymentAmount1 = _this.paymentSearch[0].addition;
                        });
                    }
                    if (_this.supplierPOSearch[i].poStatus == 'Partial Cancelled') {
                        _this.totalPaidAmount += _this.supplierPOSearch[i].totalAmount;
                    }
                }
            }
        });
        setTimeout(function () {
            _this.boqTotalAmount = _this.boqTotalAmount - totalAmount - (_this.totalPaidAmount - (paymentAmount + paymentAmount1));
            // alert(this.boqTotalAmount)
            _this.showPageSpinner = false;
        }, 3000);
    };
    AddProjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'app-add-project',
            template: __webpack_require__("./src/app/_screens/projects/add-project/add-project.component.html"),
            styles: [__webpack_require__("./src/app/_screens/projects/add-project/add-project.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3_primeng_components_common_messageservice__["MessageService"], __WEBPACK_IMPORTED_MODULE_9__project_services__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_10__core_date_format__["a" /* DateFormatPipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_http_rest_client_service__["a" /* HttpRestClient */],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_7__breadcrumb_service__["a" /* BreadcrumbService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["ActivatedRoute"],
            __WEBPACK_IMPORTED_MODULE_9__project_services__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_14__guards_role_rights_guard__["a" /* RoleRightsGuard */],
            __WEBPACK_IMPORTED_MODULE_10__core_date_format__["a" /* DateFormatPipe */]])
    ], AddProjectComponent);
    return AddProjectComponent;
}());



/***/ }),

/***/ "./src/app/_screens/projects/manage-projects/manage-projects.component.css":
/***/ (function(module, exports) {

module.exports = "td.table-project-name{\r\n    /* color:#0000EE !important; */\r\n    cursor: pointer;\r\n  }"

/***/ }),

/***/ "./src/app/_screens/projects/manage-projects/manage-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n  <div class=\"ui-g\">\n      <div class=\"ui-g-12\">\n              <div class=\"card no-margin\">\n               <h1>Projects</h1>\n                     \n                  <div class=\"ui-g form-group\">\n                      <div class=\"ui-g-12 ui-md-6\">\n                          <div class=\"ui-g-12 ui-md-4\">\n                              <button type=\"button\" pButton  label=\"Delete\" icon=\"fa-edit\" (click)=\"confirm()\" [disabled]=\"!roleRightsGuard.roleRights.deleteAccess\"></button>\n                          </div>\n                          <div class=\"ui-g-12 ui-md-8\">\n                                <p-dropdown  autoWidth=\"false\" [options]=\"projectStatusList\" [(ngModel)]=\"project.statusListID\" name=\"projectStatuses\" \n                                optionLabel=\"parameterListValue\" [autoWidth]=\"false\" (onChange)=\"loadProject($event)\"\n                                #projectStatuses=\"ngModel\"></p-dropdown>                                 \n                          </div>\n                      </div>\n                      <div class=\"ui-g-12 ui-md-6\">\n                              <div class=\"ui-g-12 ui-md-8\">\n                                      <div class=\"ui-inputgroup\">\n                                              <button pButton type=\"button\" icon=\"fa fa-search\"></button>\n                                              <input type=\"text\"  (input)=\"dt.filterGlobal($event.target.value, 'contains')\" placeholder=\"Keyword\" pInputText>\n                                          </div>\n                              </div>\n                              <div class=\"ui-g-12 ui-md-4\">\n                                      <button type=\"button\" pButton  label=\"Add Project\" icon=\"fa fa-plus\" (click)=\"addProject()\" [disabled]=\"!roleRightsGuard.roleRights.insertAccess\" ></button>\n                              </div>\n                              \n                          </div>\n                  </div>  \n              </div>\n              <div class=\"card card-w-title\">\n              <p-table #dt [value]=\"projectSearch\"  [columns]=\"cols\"  [paginator]=\"true\" [rows]=\"10\"  [(selection)]=\"selectedProject\"\n                    [rowsPerPageOptions]=\"[10,20,30]\" [responsive]=\"true\">\n\n                    <ng-template pTemplate=\"header\" let-columns>\n                          <tr>\n                                  <th style=\"width: 3.25em\">                                         \n                                      </th>\n                              <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\"  >\n                                  {{col.header}}\n                                  <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                              </th>\n                          </tr>\n                      </ng-template>\n                      <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                          <tr [pSelectableRow]=\"rowData\">\n                                  <td>\n                                        <p-tableRadioButton [value]=\"rowData\"></p-tableRadioButton>\n                                  </td>   \n                              <td *ngFor=\"let col of columns; let idx=index\" [ngClass]=\"col.class\" >\n                                    <span *ngIf=\"idx == 0\">                                            \n                                            <button type=\"button\" title=\"Edit Project\" (click)=\"editProject(rowData[col.id])\" icon=\"fa fa-edit\" [disabled]=\"!roleRightsGuard.roleRights.viewAccess\" pButton></button>&nbsp;&nbsp;{{rowData[col.field]}}\n                                    </span>\n                                  <span *ngIf=\"(idx > 0  && idx !=7)\">\n                                        {{rowData[col.field]}}  \n                                  </span>\n                                  <span *ngIf=\"idx==7\">\n                                        {{rowData[col.field] | dateFormat}}  \n                                  </span>\n                                 \n                              </td>\n                          </tr>\n                      </ng-template>\n                      <ng-template pTemplate=\"emptymessage\" let-columns>\n                        <tr>\n                            <td [attr.colspan]=\"columns.length\">\n                                No records found\n                            </td> <td></td>\n                        </tr>\n                    </ng-template>\n              </p-table>\n          </div> \n      </div>   \n  </div>\n</div>\n\n<div class=\"custom-overlay-all\" *ngIf=\"showPageSpinner\">\n    <div class=\"sendingEmail-all\"></div>\n  </div>\n<div class=\"msg\">\n    <p-growl [(value)]=\"msgs\"></p-growl>\n  </div>\n  <p-confirmDialog header=\"Confirmation\" icon=\"fa fa-info\" width=\"425\"></p-confirmDialog>"

/***/ }),

/***/ "./src/app/_screens/projects/manage-projects/manage-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_components_common_api__ = __webpack_require__("./node_modules/primeng/components/common/api.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_components_common_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_components_common_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_components_common_messageservice__ = __webpack_require__("./node_modules/primeng/components/common/messageservice.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_components_common_messageservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_components_common_messageservice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_data_model__ = __webpack_require__("./src/app/_models/data.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__ = __webpack_require__("./src/app/_services/http-rest-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__breadcrumb_service__ = __webpack_require__("./src/app/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__project__ = __webpack_require__("./src/app/_screens/projects/project.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__project_services__ = __webpack_require__("./src/app/_screens/projects/project-services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_crypto_js__ = __webpack_require__("./node_modules/crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__guards_role_rights_guard__ = __webpack_require__("./src/app/_guards/role-rights.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var ManageProjectsComponent = (function () {
    function ManageProjectsComponent(httpRestClient, router, roleRightsGuard, route, breadcrumbService, projectService, confirmationService) {
        var _this = this;
        this.httpRestClient = httpRestClient;
        this.router = router;
        this.roleRightsGuard = roleRightsGuard;
        this.route = route;
        this.breadcrumbService = breadcrumbService;
        this.projectService = projectService;
        this.confirmationService = confirmationService;
        this.projectStatusList = [];
        this.currentuser = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["c" /* CurrentUser */]();
        this.user = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["g" /* User */]();
        this.msgs = [];
        this.project = new __WEBPACK_IMPORTED_MODULE_9__project__["h" /* Project */]();
        this.deleteArray = [];
        this.roleRightsGuard.hasAllRoles(__WEBPACK_IMPORTED_MODULE_7__app_config__["e" /* routeConfig */].viewProjectMenu);
        this.breadcrumbService.setItems([
            { label: 'Aerial' },
            { label: 'Projects', routerLink: ['/projects'] }
        ]);
        if (sessionStorage.getItem("successMessage") == 'AddedSuccess') {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_7__app_config__["d" /* messageConfig */].AddSuccess });
            sessionStorage.setItem("successMessage", "");
        }
        if (sessionStorage.getItem("successMessage") == 'UpdateSuccess') {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_7__app_config__["d" /* messageConfig */].updateSuccess });
            sessionStorage.setItem("successMessage", "");
        }
        this.dateformat = 'dd-MMM-yyyy';
        // this.httpRestClient.getData("project-status/PROJECT_STATUS") .subscribe(
        //   response => {       
        //      this.projectStatus=response;         
        //  }
        // );
        this.httpRestClient.getData("parameter-list/STATUS_LIST_ID").subscribe(function (response) {
            _this.projectStatusList = response;
            for (var count = 0; count < _this.projectStatusList.length; count++) {
                if (_this.projectStatusList[count].parameterListCode == "ALL") {
                    _this.project.statusListID = _this.projectStatusList[count];
                    break;
                }
            }
        });
    }
    ManageProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showPageSpinner = true;
        this.cols = [
            { field: 'customerName', header: 'Customer', class: "table-project-name", id: 'projectID' },
            { field: 'circleName', header: 'Circle' },
            { field: 'projectName', header: 'Project Name' },
            { field: 'categoryName', header: 'Category' },
            { field: 'execModelName', header: 'Exec. Model' },
            { field: 'siteID', header: 'Site ID' },
            { field: 'siteName', header: 'Site Name' },
            { field: 'allocationDate', header: 'Allocation Date', class: "center-align" },
            { field: 'status', header: 'Status', class: "center-align" }
        ];
        this.currentuser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.httpRestClient.getData("projects/" + this.currentuser.userID).subscribe(function (response) {
            _this.projectSearch = response;
            _this.showPageSpinner = false;
        });
    };
    ManageProjectsComponent.prototype.loadProject = function (event) {
        var _this = this;
        this.showPageSpinner = true;
        this.httpRestClient.getData("project/" + event.value.parameterListCode + "/" + this.currentuser.userID).subscribe(function (response) {
            _this.projectSearch = response;
            _this.showPageSpinner = false;
        });
    };
    ManageProjectsComponent.prototype.editProject = function (projectID) {
        if (this.roleRightsGuard.roleRights.viewAccess) {
            var ciphertext = __WEBPACK_IMPORTED_MODULE_11_crypto_js__["AES"].encrypt(projectID.toString(), __WEBPACK_IMPORTED_MODULE_7__app_config__["b" /* appConfig */].privateKey);
            this.router.navigate(['/projects/edit-project', ciphertext.toString()]);
        }
    };
    ManageProjectsComponent.prototype.addProject = function () {
        if (this.roleRightsGuard.roleRights.insertAccess) {
            this.router.navigate(['/projects/add-project']);
        }
    };
    ManageProjectsComponent.prototype.deleteProjects = function () {
        var _this = this;
        this.deleteRecords = new __WEBPACK_IMPORTED_MODULE_3__models_data_model__["d" /* DeleteRecords */]();
        this.deleteRecords.id = this.selectedProject.projectID;
        this.deleteRecords.modifiedBy = this.currentuser.userID;
        this.deleteRecords.transactionCount = this.selectedProject.transactionCount;
        this.httpRestClient.deleteData("delete-project", this.deleteRecords).subscribe(function (response) {
            _this.baseResponse = response;
            if (_this.baseResponse['code'] == 'DELETED') {
                _this.msgs.push({ severity: 'success', summary: 'Success Message', detail: __WEBPACK_IMPORTED_MODULE_7__app_config__["d" /* messageConfig */].deleteSuccess });
                var index = _this.projectSearch.indexOf(_this.selectedProject);
                if (index !== -1) {
                    _this.projectSearch.splice(index, 1);
                }
                _this.selectedProject = null;
            }
            else {
                _this.msgs.push({ severity: 'error', summary: 'Error Message', detail: _this.baseResponse['message'] });
            }
        });
    };
    ManageProjectsComponent.prototype.confirm = function () {
        var _this = this;
        if (this.roleRightsGuard.roleRights.deleteAccess) {
            this.msgs = [];
            if (this.selectedProject == null || this.selectedProject == undefined) {
                this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_7__app_config__["d" /* messageConfig */].deleteWarning });
            }
            else if (this.selectedProject.length != 0) {
                this.confirmationService.confirm({
                    message: 'Do you want to delete this record?',
                    header: 'Delete Confirmation',
                    icon: 'fa fa-trash',
                    accept: function () {
                        _this.deleteProjects();
                    },
                    reject: function () {
                        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
                    }
                });
            }
            else {
                this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: __WEBPACK_IMPORTED_MODULE_7__app_config__["d" /* messageConfig */].deleteWarning });
            }
        }
    };
    ManageProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-manage-projects',
            template: __webpack_require__("./src/app/_screens/projects/manage-projects/manage-projects.component.html"),
            styles: [__webpack_require__("./src/app/_screens/projects/manage-projects/manage-projects.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2_primeng_components_common_messageservice__["MessageService"], __WEBPACK_IMPORTED_MODULE_10__project_services__["a" /* ProjectService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_http_rest_client_service__["a" /* HttpRestClient */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_12__guards_role_rights_guard__["a" /* RoleRightsGuard */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["ActivatedRoute"],
            __WEBPACK_IMPORTED_MODULE_6__breadcrumb_service__["a" /* BreadcrumbService */], __WEBPACK_IMPORTED_MODULE_10__project_services__["a" /* ProjectService */],
            __WEBPACK_IMPORTED_MODULE_1_primeng_components_common_api__["ConfirmationService"]])
    ], ManageProjectsComponent);
    return ManageProjectsComponent;
}());



/***/ }),

/***/ "./src/app/_screens/projects/project.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return InvoiceDetails; });
/* unused harmony export InvoiceDetailsTO */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CustomerPOs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ContractorPOs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ProjectStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return Project; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SupplierPOs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DrawingItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FRDetails; });
/* unused harmony export FRDetailsTO */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PaymentDetails; });
/* unused harmony export PaymentDetailsTO */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BOQBean; });
var InvoiceDetails = (function () {
    function InvoiceDetails() {
    }
    return InvoiceDetails;
}());

var InvoiceDetailsTO = (function () {
    function InvoiceDetailsTO() {
    }
    return InvoiceDetailsTO;
}());

var CustomerPOs = (function () {
    function CustomerPOs() {
    }
    return CustomerPOs;
}());

var ContractorPOs = (function () {
    function ContractorPOs() {
    }
    return ContractorPOs;
}());

var ProjectStatus = (function () {
    function ProjectStatus() {
    }
    return ProjectStatus;
}());

var Project = (function () {
    function Project() {
    }
    return Project;
}());

//Supplier PO Class
var SupplierPOs = (function () {
    function SupplierPOs() {
    }
    return SupplierPOs;
}());

//DrawingItems PO Class
var DrawingItems = (function () {
    function DrawingItems() {
    }
    return DrawingItems;
}());

var FRDetails = (function () {
    function FRDetails() {
    }
    return FRDetails;
}());

var FRDetailsTO = (function () {
    function FRDetailsTO() {
    }
    return FRDetailsTO;
}());

var PaymentDetails = (function () {
    function PaymentDetails() {
    }
    return PaymentDetails;
}());

var PaymentDetailsTO = (function () {
    function PaymentDetailsTO() {
    }
    return PaymentDetailsTO;
}());

var BOQBean = (function () {
    function BOQBean() {
    }
    return BOQBean;
}());



/***/ }),

/***/ "./src/app/modules/viewProject.modules.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoApprovalModule", function() { return PoApprovalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel__ = __webpack_require__("./node_modules/primeng/scrollpanel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_table__ = __webpack_require__("./node_modules/primeng/table.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_primeng_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter__ = __webpack_require__("./node_modules/primeng/keyfilter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner__ = __webpack_require__("./node_modules/primeng/progressspinner.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__screens_projects_manage_projects_manage_projects_component__ = __webpack_require__("./src/app/_screens/projects/manage-projects/manage-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__screens_projects_add_project_add_project_component__ = __webpack_require__("./src/app/_screens/projects/add-project/add-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__routing_dateFormat_modules__ = __webpack_require__("./src/app/routing/dateFormat.modules.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__routing_viewProject_routing__ = __webpack_require__("./src/app/routing/viewProject.routing.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














































































var PoApprovalModule = (function () {
    function PoApprovalModule() {
        // console.log('Role Module loaded.');
    }
    PoApprovalModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12__routing_dateFormat_modules__["a" /* DateFormatModule */],
                __WEBPACK_IMPORTED_MODULE_13__routing_viewProject_routing__["a" /* ViewProjectRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["AccordionModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["BreadcrumbModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CarouselModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CheckboxModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ChipsModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CodeHighlighterModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ConfirmDialogModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ColorPickerModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SharedModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ContextMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataGridModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataListModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataScrollerModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DragDropModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DropdownModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["EditorModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["FieldsetModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GalleriaModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GMapModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GrowlModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputMaskModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputSwitchModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextareaModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["LightboxModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ListboxModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MegaMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MenubarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MultiSelectModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["OrderListModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["OrganizationChartModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["OverlayPanelModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PaginatorModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PanelModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PanelMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PasswordModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PickListModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ProgressBarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["RadioButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["RatingModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ScheduleModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_scrollpanel__["ScrollPanelModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SelectButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SlideMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SliderModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SpinnerModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SplitButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["StepsModule"],
                __WEBPACK_IMPORTED_MODULE_7_primeng_table__["TableModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TabMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TabViewModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TerminalModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TieredMenuModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ToggleButtonModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ToolbarModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TooltipModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TreeModule"],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TreeTableModule"],
                __WEBPACK_IMPORTED_MODULE_8_primeng_keyfilter__["KeyFilterModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_progressspinner__["ProgressSpinnerModule"],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__screens_projects_manage_projects_manage_projects_component__["a" /* ManageProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__screens_projects_add_project_add_project_component__["a" /* AddProjectComponent */]
            ],
            providers: [],
            exports: []
        }),
        __metadata("design:paramtypes", [])
    ], PoApprovalModule);
    return PoApprovalModule;
}());



/***/ }),

/***/ "./src/app/routing/viewProject.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewProjectRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screens_projects_manage_projects_manage_projects_component__ = __webpack_require__("./src/app/_screens/projects/manage-projects/manage-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screens_projects_add_project_add_project_component__ = __webpack_require__("./src/app/_screens/projects/add-project/add-project.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var viewPRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__screens_projects_manage_projects_manage_projects_component__["a" /* ManageProjectsComponent */] },
    { path: 'add-project', component: __WEBPACK_IMPORTED_MODULE_3__screens_projects_add_project_add_project_component__["a" /* AddProjectComponent */] },
    { path: 'edit-project/:id', component: __WEBPACK_IMPORTED_MODULE_3__screens_projects_add_project_add_project_component__["a" /* AddProjectComponent */] },
];
var ViewProjectRoutingModule = (function () {
    function ViewProjectRoutingModule() {
    }
    ViewProjectRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(viewPRoutes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], ViewProjectRoutingModule);
    return ViewProjectRoutingModule;
}());



/***/ })

});
//# sourceMappingURL=viewProject.modules.chunk.js.map