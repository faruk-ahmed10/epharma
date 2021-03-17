/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

const RoutePaths = {
    ROOT: "",
    REACT_SUSPENSE: "/react-home",

    PUBLIC: {
        ROOT: "/",
        LOGIN: "/login",
    },
    PRIVATE: {
        ROOT: "/app",
        ACCESS_DENIED: "/app/__not_permitted",
        LOGOUT: "/app/logout",
        DASHBOARD: "/app/dashboard",
        MEDICINE_CATEGORIES: "/app/medicine/category",
        UNITS: "/app/medicine/unit",
        MEDICINES: "/app/medicine",
        MEDICINE_ADD: "/app/medicine/add",
        MEDICINE_EDIT: "/app/medicine/edit",
        BRANDS: "/app/medicine/brand",
        CUSTOMERS: "/app/customer",
        SUPPLIERS: "/app/supply",
        EMPLOYEES: "/app/employee",
        EMPLOYEE_DETAILS: "/app/employee/details",
        CUSTOMER_DETAILS: "/app/customer/details",
        SUPPLIER_DETAILS: "/app/supplier/details",
        TAXES: "/app/tax_list",
        CURRENCIES: "/app/setting/currency",
        MANUFACTURERS: "/app/manufacturer",
        MEDICINE_DETAILS: "/app/medicine/details",
        LEAVE_PURPOSES: "/app/hr/leave_purpose",
        SUPPLIER_INVOICES: "/app/supplier/invoices",
        CUSTOMER_INVOICES: "/app/customer/invoices",
        SUPPLIER_PAYMENTS: "/app/supplier/payments",
        CUSTOMER_PAYMENTS: "/app/customer/payments",
        PURCHASE_ORDERS: "/app/purchase/orders",
        ACCOUNT_CATEGORIES: "/app/accounting/categories",
        ACCOUNT_HEADS: "/app/accounting/heads",
        INCOMES: "/app/accounting/income_list",
        EXPENSES: "/app/accounting/expense_list",
        MEDICINE_IMPORT: "/app/medicine/import",
        LEAVES: "/app/hr/leave",
        PHARMACIES: "/app/pharmacy",
        PAYROLLS: "/app/hr/payroll",
        ATTENDANCES: "/app/hr/attendance",
        GENERAL_SETTINGS: "/app/general_settings",
        USER_ROLES: "/app/uap/user_roles",
    },
}
export {RoutePaths as ROUTE_PATHS};
