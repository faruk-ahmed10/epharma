/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import {Dialog} from '../../../Global/Dialog/Dialog';
import Button from '../../Common/Button';
import {Row, Col} from "react-bootstrap";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {APP} from "../../../../../App/Init/App.Init";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogPaper: {
            [theme.breakpoints.up('sm')]: {
                minWidth: "770px",
                maxHeight: "550px",
            }
        },

        root: {
            '& *': {
                fontSize: "15px !important",
            }
        },
        listContainer: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },

        listItemIcon: {
            minWidth: 35,
        },

        checkBoxRoot: {
            '& *': {
                fontSize: "20px !important",
            }
        },
    }),
);

const Item = ({icon, label, onClick, selected}: Partial<{ icon: React.ReactChild, label: string, onClick: any, selected: boolean }>) => {
    const classes = useStyles();
    return (
        <ListItem button selected={selected} onClick={onClick}>
            <ListItemIcon className={classes.listItemIcon}>
                {icon}
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItem>
    );
};

const NestedItem = ({icon, label, onClick, children}: Partial<{ icon: React.ReactChild, label: string, onClick: any, children: any }>) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <ListItem button onClick={() => {
                setOpen(!open);
                if (typeof onClick === 'function') {
                    onClick();
                }
            }} selected={open}>
                <ListItemIcon className={classes.listItemIcon}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <div className={classes.nested}>
                        {children}
                    </div>
                </List>
            </Collapse>
        </React.Fragment>
    );
};

const RolePermissionSettings = ({open, onClose, onSubmit, RoleId, RoleName, RolePermissions, onChangePermissions}: any) => {
    const classes = useStyles();
    const ACTIONS = APP.UTILS.DATA.UAP.ACTIONS;
    const MODULES = APP.UTILS.DATA.UAP.MODULES;
    const [selectedModuleCode, setSelectedModuleCode] = React.useState('');

    const getActionPermission = (actionCode: string) => {
        console.log(RolePermissions);
        return RolePermissions[selectedModuleCode].Actions[actionCode].Permission;
    };

    const updatePermissionsObject = (actionCode: string, permission: boolean | undefined = undefined) => {
        const _rolePermissionsObject = RolePermissions;
        const _permission = typeof permission !== 'undefined' ? permission : !RolePermissions[selectedModuleCode].Actions[actionCode].Permission;
        _rolePermissionsObject[selectedModuleCode].Actions[actionCode].Permission = _permission;
        onChangePermissions(_rolePermissionsObject);

        if(actionCode === ACTIONS.MODULE_ACCESS.Code && !_permission) {
            RemoveAllAccessExceptModuleAccess();
        }
    };

    const isSelectedAllPermissions = (): boolean => {
        return getActionPermission(ACTIONS.MODULE_ACCESS.Code) &&
            getActionPermission(ACTIONS.VIEW.Code) &&
            getActionPermission(ACTIONS.ADD.Code) &&
            getActionPermission(ACTIONS.EDIT.Code) &&
            getActionPermission(ACTIONS.DELETE.Code) &&
            getActionPermission(ACTIONS.PRINT.Code);
    };

    const selectAllPermissions = (): void => {
        const _selectedAll = isSelectedAllPermissions();
        updatePermissionsObject(ACTIONS.MODULE_ACCESS.Code, !_selectedAll);
        updatePermissionsObject(ACTIONS.VIEW.Code, !_selectedAll);
        updatePermissionsObject(ACTIONS.ADD.Code, !_selectedAll);
        updatePermissionsObject(ACTIONS.EDIT.Code, !_selectedAll);
        updatePermissionsObject(ACTIONS.DELETE.Code, !_selectedAll);
        updatePermissionsObject(ACTIONS.PRINT.Code, !_selectedAll);
    };

    const RemoveAllAccessExceptModuleAccess = (): void => {
        updatePermissionsObject(ACTIONS.VIEW.Code, false);
        updatePermissionsObject(ACTIONS.ADD.Code, false);
        updatePermissionsObject(ACTIONS.EDIT.Code, false);
        updatePermissionsObject(ACTIONS.DELETE.Code, false);
        updatePermissionsObject(ACTIONS.PRINT.Code, false);
    };

    return (
        <Dialog
            title={"Role Permissions"}
            subtitle={RoleName}
            open={open}
            onClose={() => {
                setSelectedModuleCode('');
                onClose();
            }}
            scroll={'paper'}
            fullWidth={true}
            actionBar={
                <Button
                    label="Save"
                    className={"cbtn--lg cbtn--primary"}
                    onClick={onSubmit}
                />
            }
            classes={{paper: classes.dialogPaper}}
        >
            <React.Fragment>
                <Row className={classes.root}>
                    <Col md={6} style={{borderRight: '1px solid #d9d9d9'}}>
                        <List
                            component="nav"
                            className={classes.listContainer}>

                            <Item icon={<DashboardIcon/>} label={"Dashboard"}/>

                            <Item
                                icon={<DashboardIcon/>}
                                label={"Pharmacy"}
                                selected={selectedModuleCode === MODULES.PHARMACY.Code}
                                onClick={() => {
                                    setSelectedModuleCode(MODULES.PHARMACY.Code);
                                }}
                            />

                            <NestedItem label={"Resource"} icon={<DashboardIcon/>}
                                        onClick={() => setSelectedModuleCode('')}>

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Categories"}
                                    selected={selectedModuleCode === MODULES.MEDICINE_CATEGORY.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.MEDICINE_CATEGORY.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Brands"}
                                    selected={selectedModuleCode === MODULES.MEDICINE_BRAND.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.MEDICINE_BRAND.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Units"}
                                    selected={selectedModuleCode === MODULES.MEDICINE_UNIT.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.MEDICINE_UNIT.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Tax"}
                                    selected={selectedModuleCode === MODULES.TAX.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.TAX.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Currency"}
                                    selected={selectedModuleCode === MODULES.CURRENCY.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.CURRENCY.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Medicines"}
                                    selected={selectedModuleCode === MODULES.MEDICINE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.MEDICINE.Code);
                                    }}
                                />
                            </NestedItem>

                            <NestedItem label={"People"} icon={<DashboardIcon/>}
                                        onClick={() => setSelectedModuleCode('')}>
                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Customers"}
                                    selected={selectedModuleCode === MODULES.CUSTOMER.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.CUSTOMER.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Suppliers"}
                                    selected={selectedModuleCode === MODULES.SUPPLIER.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.SUPPLIER.Code);
                                    }}
                                />
                            </NestedItem>

                            <NestedItem label={"Accounting"} icon={<DashboardIcon/>}
                                        onClick={() => setSelectedModuleCode('')}>
                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Account Categories"}
                                    selected={selectedModuleCode === MODULES.ACCOUNT_CATEGORY.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.ACCOUNT_CATEGORY.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Account Heads"}
                                    selected={selectedModuleCode === MODULES.ACCOUNT_HEAD.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.ACCOUNT_HEAD.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Income List"}
                                    selected={selectedModuleCode === MODULES.INCOME.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.INCOME.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Expense List"}
                                    selected={selectedModuleCode === MODULES.EXPENSE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.EXPENSE.Code);
                                    }}
                                />
                            </NestedItem>

                            <NestedItem label={"HR"} icon={<DashboardIcon/>} onClick={() => setSelectedModuleCode('')}>
                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Employees"}
                                    selected={selectedModuleCode === MODULES.EMPLOYEE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.EMPLOYEE.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Payroll"}
                                    selected={selectedModuleCode === MODULES.PAYROLL.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.PAYROLL.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Attendance"}
                                    selected={selectedModuleCode === MODULES.EMPLOYEE_ATTENDANCE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.EMPLOYEE_ATTENDANCE.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Leave Purpose"}
                                    selected={selectedModuleCode === MODULES.LEAVE_PURPOSE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.LEAVE_PURPOSE.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Leave"}
                                    selected={selectedModuleCode === MODULES.LEAVE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.LEAVE.Code);
                                    }}
                                />
                            </NestedItem>

                            <NestedItem label={"Invoice"} icon={<DashboardIcon/>}
                                        onClick={() => setSelectedModuleCode('')}>
                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Supplier Invoice"}
                                    selected={selectedModuleCode === MODULES.SUPPLIER_INVOICE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.SUPPLIER_INVOICE.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Customer Invoice"}
                                    selected={selectedModuleCode === MODULES.CUSTOMER_INVOICE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.CUSTOMER_INVOICE.Code);
                                    }}
                                />
                            </NestedItem>

                            <NestedItem label={"Payment"} icon={<DashboardIcon/>}
                                        onClick={() => setSelectedModuleCode('')}>
                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Supplier Payment"}
                                    selected={selectedModuleCode === MODULES.SUPPLIER_PAYMENT.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.SUPPLIER_PAYMENT.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Customer Payment"}
                                    selected={selectedModuleCode === MODULES.CUSTOMER_PAYMENT.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.CUSTOMER_PAYMENT.Code);
                                    }}
                                />
                            </NestedItem>


                            <NestedItem label={"Purchase"} icon={<DashboardIcon/>}
                                        onClick={() => setSelectedModuleCode('')}>
                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"Purchase Orders"}
                                    selected={selectedModuleCode === MODULES.PURCHASE_ORDER.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.PURCHASE_ORDER.Code);
                                    }}
                                />
                            </NestedItem>

                            <NestedItem label={"Settings"} icon={<DashboardIcon/>}
                                        onClick={() => setSelectedModuleCode('')}>
                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"General Settings"}
                                    selected={selectedModuleCode === MODULES.GENERAL_SETTINGS.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.GENERAL_SETTINGS.Code);
                                    }}
                                />

                                <Item
                                    icon={<DashboardIcon/>}
                                    label={"User Roles"}
                                    selected={selectedModuleCode === MODULES.USER_ROLE.Code}
                                    onClick={() => {
                                        setSelectedModuleCode(MODULES.USER_ROLE.Code);
                                    }}
                                />
                            </NestedItem>
                        </List>
                    </Col>
                    <Col md={6}>

                        <div style={{padding: "0 20px", marginTop: 15, marginBottom: 15}}>
                            <div style={{marginBottom: 15}}>
                                <b>Permissions</b>
                            </div>


                            {selectedModuleCode !== '' && RolePermissions !== null && (
                                <React.Fragment>
                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    classes={{root: classes.checkBoxRoot}}
                                                    checked={isSelectedAllPermissions()}
                                                    onChange={selectAllPermissions}
                                                />}
                                            label="-- Select All --"
                                            labelPlacement="end"
                                        />
                                    </div>

                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    classes={{root: classes.checkBoxRoot}}
                                                    checked={getActionPermission(ACTIONS.MODULE_ACCESS.Code)}
                                                    onChange={() => updatePermissionsObject(ACTIONS.MODULE_ACCESS.Code)}
                                                />}
                                            label="Access (Access the module)"
                                            labelPlacement="end"
                                        />
                                    </div>

                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    classes={{root: classes.checkBoxRoot}}
                                                    checked={getActionPermission(ACTIONS.VIEW.Code)}
                                                    onChange={() => updatePermissionsObject(ACTIONS.VIEW.Code)}
                                                    disabled={!getActionPermission(ACTIONS.MODULE_ACCESS.Code)}
                                                />
                                            }
                                            label="View (View Entry)"
                                            labelPlacement="end"
                                        />
                                    </div>

                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    classes={{root: classes.checkBoxRoot}}
                                                    checked={getActionPermission(ACTIONS.ADD.Code)}
                                                    onChange={() => updatePermissionsObject(ACTIONS.ADD.Code)}
                                                    disabled={!getActionPermission(ACTIONS.MODULE_ACCESS.Code)}
                                                />
                                            }
                                            label="Add (Make Entry)"
                                            labelPlacement="end"
                                        />
                                    </div>

                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    classes={{root: classes.checkBoxRoot}}
                                                    checked={getActionPermission(ACTIONS.EDIT.Code)}
                                                    onChange={() => updatePermissionsObject(ACTIONS.EDIT.Code)}
                                                    disabled={!getActionPermission(ACTIONS.MODULE_ACCESS.Code)}
                                                />
                                            }
                                            label="Edit (Edit Entry)"
                                            labelPlacement="end"
                                        />
                                    </div>

                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    classes={{root: classes.checkBoxRoot}}
                                                    checked={getActionPermission(ACTIONS.DELETE.Code)}
                                                    onChange={() => updatePermissionsObject(ACTIONS.DELETE.Code)}
                                                    disabled={!getActionPermission(ACTIONS.MODULE_ACCESS.Code)}
                                                />
                                            }
                                            label="Delete (Delete Entry)"
                                            labelPlacement="end"
                                        />
                                    </div>

                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    classes={{root: classes.checkBoxRoot}}
                                                    checked={getActionPermission(ACTIONS.PRINT.Code)}
                                                    onChange={() => updatePermissionsObject(ACTIONS.PRINT.Code)}
                                                    disabled={!getActionPermission(ACTIONS.MODULE_ACCESS.Code)}
                                                />
                                            }
                                            label="Print (Print Entry)"
                                            labelPlacement="end"
                                        />
                                    </div>
                                </React.Fragment>
                            )}
                        </div>

                    </Col>
                </Row>
            </React.Fragment>
        </Dialog>
    );
}


export default RolePermissionSettings;