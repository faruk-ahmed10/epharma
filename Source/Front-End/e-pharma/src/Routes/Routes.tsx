/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from "react";
import {APP} from "../App/Init/App.Init";
import MedicineForm from "../Layouts/Components/Private/Medicine/MedicineForm";
import MedicineDetails from "../Layouts/Components/Private/Medicine/MedicineDetails/MedicineDetails";
import NavigationFrame from "../Layouts/Components/Private/Navigation-frame/NavigationFrame";
import ReactSplash from "../Pages/Global/ReactSplash/ReactSplash";
import AccountCategories from "../Pages/Private/Accounting/AccountCategory/AccountCategoryList";
import AccountHeads from "../Pages/Private/Accounting/AccountHead/AccountHeadList";
import CustomerDetails from "../Pages/Private/Customer/CustomerDetails/CustomerDetails";
import CustomerList from "../Pages/Private/Customer/CustomerList";
import Dashboard from "../Pages/Private/Dashboard/Dashboard";
import Employee from "../Pages/Private/Employee/EmployeeList";
import EmployeeDetails from "../Pages/Private/Employee/EmployeeDetails/EmployeeDetails";
import LeavePurposeList from "../Pages/Private/LeavePurpose/LeavePurposeList";
import ManufacturerList from "../Pages/Private/Manufacturer/ManufacturerList";
import BrandList from "../Pages/Private/Medicine/Brand/BrandList";
import CategoryList from "../Pages/Private/Medicine/Category/CategoryList";
import UserRoleList from "../Pages/Private/UAP/UserRole/UserRoleList";
import MedicineImport from "../Pages/Private/Medicine/Medicine/MedicineImport";
import MedicineList from "../Pages/Private/Medicine/Medicine/MedicineList";
import UnitList from "../Pages/Private/Medicine/Unit/UnitList";
import PharmacyList from "../Pages/Private/Pharmacy/PharmacyList";
import CurrencyList from "../Pages/Private/Setting/Currency/CurrencyList";
import TaxList from "../Pages/Private/Setting/Tax/TaxList";
import SupplierDetails from "../Pages/Private/Supplier/SupplierDetails/SupplierDetails";
import SupplierInvoiceList from "../Pages/Private/Supplier/SupplierInvoice/SupplierInvoiceList";
import PurchaseOrderList from "../Pages/Private/Purchase/PurchaseOrder/PurchaseOrderList";
import SupplierList from "../Pages/Private/Supplier/SupplierList";
import LeaveList from "../Pages/Private/Leave/LeaveList";
import CustomerInvoiceList from "../Pages/Private/Customer/CustomerInvoice/CustomerInvoiceList";
import Login from "../Pages/Global/Login/Login";

import SupplierPaymentList from "../Pages/Private/Supplier/SupplierPayment/SupplierPaymentList";
import CustomerPaymentList from "../Pages/Private/Customer/CustomerPayment/CustomerPaymentList";
import AccountingHistoryList from "../Pages/Private/Accounting/AccountingHistoryList/AccountingHistoryList";
import AttendanceForm from "../Pages/Private/Attendance/Attendance";
import Logout from "../Pages/Private/Logout/Logout";
import PayrollList from "../Pages/Private/PayrollList/PayrollList";
import GeneralSetting from "../Pages/Private/Setting/GeneralSetting/GeneralSetting";
import ServicePreparation from "../Layouts/Components/Private/ServicePreparation/ServicePreparation";
import AccessDenied from "../Pages/Private/UAP/AccessDenied/AccessDenied";


const Routes = () => {
    const ROUTES = APP.ROUTES;
    const RouterProvider: any = APP.SERVICES.CORE.ROUTER;
    const Router = RouterProvider.BrowserRouter,
        Switch = RouterProvider.Switch,
        Route = RouterProvider.Route,
        RouterLayout = RouterProvider.RouterLayout,
        RouteMatched = RouterProvider.RouteMatched;
    const MODULES = APP.UTILS.DATA.UAP.MODULES,
        ACTIONS = APP.UTILS.DATA.UAP.ACTIONS;

    return (
        <Router>
            <Switch>
                <Route
                    path={ROUTES.PRIVATE.ROOT}
                    middleware={[APP.MIDDLEWARE.LOGGED_USER]}
                    component={() => (
                        <ServicePreparation>
                            <NavigationFrame>
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.ACCESS_DENIED}
                                    component={AccessDenied}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.DASHBOARD}
                                    component={Dashboard}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.MEDICINE_CATEGORIES}
                                    component={CategoryList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE_CATEGORY.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.UNITS}
                                    component={UnitList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE_UNIT.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.MEDICINES}
                                    component={MedicineList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.MEDICINE_ADD}
                                    component={MedicineForm}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE.Code, ACTIONS.ADD.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.MEDICINE_EDIT + "/:id"}
                                    component={MedicineForm}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE.Code, ACTIONS.EDIT.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.CUSTOMERS}
                                    component={CustomerList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.CUSTOMER.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.SUPPLIERS}
                                    component={SupplierList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.SUPPLIER.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.ACCOUNT_HEADS}
                                    component={AccountHeads}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.ACCOUNT_HEAD.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.ACCOUNT_CATEGORIES}
                                    component={AccountCategories}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.ACCOUNT_CATEGORY.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.TAXES}
                                    component={TaxList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.TAX.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.CUSTOMER_DETAILS + "/:id"}
                                    component={CustomerDetails}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.CUSTOMER.Code, ACTIONS.VIEW.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.MANUFACTURERS}
                                    component={ManufacturerList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MANUFACTURER.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.BRANDS}
                                    component={BrandList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE_BRAND.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.CURRENCIES}
                                    component={CurrencyList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.CURRENCY.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.MEDICINE_DETAILS + "/:id"}
                                    component={MedicineDetails}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE.Code, ACTIONS.VIEW.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.SUPPLIER_DETAILS + "/:id"}
                                    component={SupplierDetails}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.SUPPLIER.Code, ACTIONS.VIEW.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.EMPLOYEES}
                                    component={Employee}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.CUSTOMER.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.EMPLOYEE_DETAILS + "/:id"}
                                    component={EmployeeDetails}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.EMPLOYEE.Code, ACTIONS.VIEW.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.LEAVE_PURPOSES}
                                    component={LeavePurposeList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.LEAVE_PURPOSE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.LEAVES}
                                    component={LeaveList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.LEAVE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.SUPPLIER_INVOICES}
                                    component={SupplierInvoiceList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.SUPPLIER_INVOICE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.CUSTOMER_INVOICES}
                                    component={CustomerInvoiceList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.CUSTOMER_INVOICE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.SUPPLIER_PAYMENTS}
                                    component={SupplierPaymentList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.SUPPLIER_PAYMENT.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.CUSTOMER_PAYMENTS}
                                    component={CustomerPaymentList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.CUSTOMER_PAYMENT.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.PURCHASE_ORDERS}
                                    component={PurchaseOrderList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.PURCHASE_ORDER.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.MEDICINE_IMPORT}
                                    component={MedicineImport}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.MEDICINE_IMPORT.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.PHARMACIES}
                                    component={PharmacyList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.PHARMACY.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.INCOMES}
                                    component={() => <AccountingHistoryList type={"Income"}/>}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.INCOME.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.EXPENSES}
                                    component={() => <AccountingHistoryList type={"Expense"}/>}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.EXPENSE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.PAYROLLS}
                                    component={PayrollList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.PAYROLL.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />
                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.ATTENDANCES}
                                    component={AttendanceForm}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.EMPLOYEE_ATTENDANCE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.GENERAL_SETTINGS}
                                    component={GeneralSetting}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.GENERAL_SETTINGS.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.USER_ROLES}
                                    component={UserRoleList}
                                    middleware={[(props: any) => APP.MIDDLEWARE.UAP_CHECK_POST(MODULES.USER_ROLE.Code, ACTIONS.MODULE_ACCESS.Code, props)]}
                                />

                                <Route
                                    exact
                                    path={ROUTES.PRIVATE.LOGOUT}
                                    component={Logout}
                                />
                            </NavigationFrame>
                        </ServicePreparation>
                    )}
                />


                <Route exact path={ROUTES.PUBLIC.LOGIN} component={Login}
                       middleware={[APP.MIDDLEWARE.NON_LOGGED_USER]}/>
                <Route
                    exact
                    path={ROUTES.REACT_SUSPENSE}
                    component={ReactSplash}
                />
                <Route exact path={ROUTES.ROOT} component={Login} middleware={[APP.MIDDLEWARE.NON_LOGGED_USER]}/>
            </Switch>
        </Router>
    );
}

export default Routes;
