/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Dashboard from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SettingsIcon from "@material-ui/icons/Settings";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {APP} from "../../../../App/Init/App.Init";
import "./Sidebar.scss";

//Sidebar Dropdown
const SidebarDropdown = ({dropdownLabel, icon, children}: {
    dropdownLabel: string;
    children: React.ReactChild;
    icon: React.ReactChild;
}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <li className={open ? "active" : ""}>
                <a onClick={() => setOpen(!open)}>
                    <span className="sidebar-wrapper__icon">{icon}</span>
                    <span className="sidebar-wrapper__menu-text"> {dropdownLabel}</span>
                    {open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </a>

                {open && children}
            </li>
        </React.Fragment>
    );
};

// parent li
const BasePath = APP.ROUTES.PRIVATE;
const MatchedPath = APP.SERVICES.CORE.ROUTER;
const MenuLink = ({currentRoute, path, label}: any) => (
    <li
        className={
            APP.SERVICES.CORE.ROUTER.RouteMatched(currentRoute, path)
                ? "activeLink"
                : ""
        }
    >
        <Link to={path}>{label}</Link>
    </li>
);

class Sidebar extends Component<{ location: any, AUTH_USER: any }, any> {
    public render(): React.ReactNode {
        const currentRoute = this.props.location.pathname;
        return (
            <>
                <div className="sidebar-wrapper">
                    <div className="sidebar-wrapper__mainNavbar mainNavbar--expend">
                        <ul>
                            <li
                                className={
                                    MatchedPath.RouteMatched(currentRoute, BasePath.DASHBOARD)
                                        ? "active"
                                        : ""
                                }>
                                <Link to={APP.ROUTES.PRIVATE.DASHBOARD}>
                                  <span className="sidebar-wrapper__icon">
                                    <Dashboard/>
                                  </span>
                                    <span className="sidebar-wrapper__menu-text">Dashboard</span>
                                </Link>
                            </li>

                            {Number(this.props.AUTH_USER.role_id) === 0 && (
                                <li>
                                    <Link to={APP.ROUTES.PRIVATE.PHARMACIES}>
                                    <span className="sidebar-wrapper__icon">
                                        <LocalPharmacyIcon/>
                                    </span>
                                        <span className="sidebar-wrapper__menu-text">
                                        Pharmacy
                                    </span>
                                    </Link>
                                </li>
                            )}
                            <SidebarDropdown
                                dropdownLabel="Resource"
                                icon={<LocalHospitalIcon/>}>
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.MEDICINE_CATEGORIES}
                                        label="Categories"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.BRANDS}
                                        label="Brands"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.UNITS}
                                        label="Units"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.TAXES}
                                        label="Tax"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.CURRENCIES}
                                        label="Currency"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.MEDICINES}
                                        label="Medicines"
                                    />
                                    {/*<MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.MEDICINE_IMPORT}
                                        label="Bulk Medicine Import"
                                    />*/}
                                </ul>
                            </SidebarDropdown>

                            {/*<li>
                                <Link to={APP.ROUTES.PRIVATE.MANUFACTURER}>
                                    <span className="sidebar-wrapper__icon">
                                        <HomeIcon/>
                                    </span>
                                    <span className="sidebar-wrapper__menu-text">
                                        Manufacturers
                                    </span>
                                </Link>
                            </li>*/}

                            <SidebarDropdown dropdownLabel="People" icon={<PeopleAltIcon/>}>
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.CUSTOMERS}
                                        label="Customers"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.SUPPLIERS}
                                        label="Suppliers"
                                    />
                                </ul>
                            </SidebarDropdown>

                            <SidebarDropdown
                                dropdownLabel="Accounting"
                                icon={<PeopleAltIcon/>}
                            >
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.ACCOUNT_CATEGORIES}
                                        label="Account Categories"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.ACCOUNT_HEADS}
                                        label="Account Heads"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.INCOMES}
                                        label="Income List"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.EXPENSES}
                                        label="Expense List"
                                    />
                                </ul>
                            </SidebarDropdown>

                            <SidebarDropdown dropdownLabel="HR" icon={<PeopleAltIcon/>}>
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.EMPLOYEES}
                                        label="Employees"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.PAYROLLS}
                                        label="Payroll"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.ATTENDANCES}
                                        label="Attendance"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.LEAVE_PURPOSES}
                                        label="Leave Purpose"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.LEAVES}
                                        label="Leave"
                                    />
                                </ul>
                            </SidebarDropdown>

                            <SidebarDropdown dropdownLabel="Invoice" icon={<PeopleAltIcon/>}>
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.SUPPLIER_INVOICES}
                                        label="Supplier Invoices"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.CUSTOMER_INVOICES}
                                        label="Customer Invoices"
                                    />
                                </ul>
                            </SidebarDropdown>

                            <SidebarDropdown dropdownLabel="Payment" icon={<PeopleAltIcon/>}>
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.SUPPLIER_PAYMENTS}
                                        label="Supplier Payments"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.CUSTOMER_PAYMENTS}
                                        label="Customer Payments"
                                    />
                                </ul>
                            </SidebarDropdown>

                            <SidebarDropdown dropdownLabel="Purchase" icon={<PeopleAltIcon/>}>
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.PURCHASE_ORDERS}
                                        label="Purchase Orders"
                                    />
                                </ul>
                            </SidebarDropdown>

                            <SidebarDropdown dropdownLabel="Settings" icon={<SettingsIcon/>}>
                                <ul className="subMenu">
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.GENERAL_SETTINGS}
                                        label="General Settings"
                                    />
                                    <MenuLink
                                        currentRoute={currentRoute}
                                        path={APP.ROUTES.PRIVATE.USER_ROLES}
                                        label="User Roles"
                                    />
                                </ul>
                            </SidebarDropdown>

                            <li>
                                <Link to={APP.ROUTES.PRIVATE.LOGOUT}>
                                    <span className="sidebar-wrapper__icon">
                                        <HomeIcon/>
                                    </span>
                                    <span className="sidebar-wrapper__menu-text">
                                        Logout
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default APP.SERVICES.CORE.GLOBAL_DATA.WITH_STORE((state: any) => {
    return {
        AUTH_USER: state.AUTH_USER,
    }
}, null)(APP.SERVICES.CORE.ROUTER.withRouter(Sidebar));
