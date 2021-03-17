/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, {Component} from "react";
import {APP} from "../../../../App/Init/App.Init";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import UserRoleTable from "../../../../Layouts/Components/Private/UAP/UserRole/UserRoleTable";
import RolePermissionSettings from "../../../../Layouts/Components/Private/UAP/UserRole/RolePermissionSettings";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import AddIcon from '@material-ui/icons/Add';
import "./UserRole.scss";

class UserRoleList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            UserRoles: [],
            UserRoleFormDialogOpen: false,
            UserRoleFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
            },
            message: "",
            msgClass: "",
            icon: {},

            NotificationOpen: false,

            RolePermissionsDialogOpen: false,
            SelectedRoleId: 0,
            SelectedRoleName: '',
            SelectedRolePermissions: null,
        };

        this.handleGetUserRoles = this.handleGetUserRoles.bind(this);
        this.handleSaveUserRole = this.handleSaveUserRole.bind(this);
        this.handleDeleteUserRole = this.handleDeleteUserRole.bind(this);
        this.handleSaveRolePermissions = this.handleSaveRolePermissions.bind(this);
    }

    private handleGetUserRoles(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/user_roles",
            {},
            {},
            (data: any) => {
                this.setState({
                    UserRoles: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the user roles!");
            }
        );
    }

    private handleSaveUserRole(): void {
        if (this.state.UserRoleFormDialogData.name.trim() === '') {
            alert("Enter role name!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/user_role/save",
            {},
            {
                EditMode: this.state.UserRoleFormDialogData.EditMode,
                id: this.state.UserRoleFormDialogData.id,
                name: this.state.UserRoleFormDialogData.name,
                status: this.state.UserRoleFormDialogData.status,
            },
            (data: any) => {
                this.setState({UserRoleFormDialogOpen: false});
                this.handleGetUserRoles();
                this.setState({
                    NotificationOpen: true,
                    message: "Data Successfully Added!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            },
            (error: any) => {
                this.setState({
                    NotificationOpen: true,
                    message: "Something Wrong!",
                    msgClass: "danger",
                    icon: <ErrorOutlineIcon/>,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    private handleSaveRolePermissions(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/user_role/save_permissions",
            {},
            {
                role_id: this.state.SelectedRoleId,
                modules: this.state.SelectedRolePermissions,
            },
            (data: any) => {
                this.handleGetUserRoles();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    RolePermissionsDialogOpen: false,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            },
            (error: any) => {
                this.setState({
                    NotificationOpen: true,
                    message: "Something Wrong!",
                    msgClass: "danger",
                    icon: <ErrorOutlineIcon/>,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    private handleDeleteUserRole(CatId: number): void {
        if (!window.confirm("Are you sure to delete this user role?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/user_role/delete",
            {},
            {
                id: CatId
            },
            (data: any) => {
                this.handleGetUserRoles();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    UserRoleFormDialogOpen: false,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            },
            (error: any) => {
                this.setState({
                    NotificationOpen: true,
                    message: "Something Wrong!",
                    msgClass: "danger",
                    icon: <ErrorOutlineIcon/>,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    public componentDidMount(): void {
        this.handleGetUserRoles();
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />

                <Breadcrumb title={"User Access Permission"} activeTitle={"User Roles"}/>

                <div className="uap__header">
                    <Button
                        label="Add User Role"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.UserRoleFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.status = "";
                            this.setState({
                                UserRoleFormDialogOpen: true,
                                UserRoleFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <UserRoleTable
                    Data={this.state.UserRoles}
                    onPermissionSetup={(role_id: number, role_name: string, modules: object) => this.setState({
                        RolePermissionsDialogOpen: true,
                        SelectedRoleId: role_id,
                        SelectedRoleName: role_name,
                        SelectedRolePermissions: modules,
                    })}
                    onEdit={(id: number, name: string, status: string) => {
                        let __data: any = this.state.UserRoleFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.status = status;

                        this.setState({
                            UserRoleFormDialogOpen: true,
                            UserRoleFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteUserRole}
                />

                <Dialog
                    title={
                        this.state.UserRoleFormDialogData.EditMode
                            ? "Edit User Role"
                            : "Add User Role"
                    }
                    open={this.state.UserRoleFormDialogOpen}
                    onClose={() => this.setState({UserRoleFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveUserRole}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"uap__header-dialog"}
                            type={"text"}
                            placeholder={"Name *"}
                            value={this.state.UserRoleFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.UserRoleFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    UserRoleFormDialogData: __data,
                                });
                            }}
                        />
                    </React.Fragment>
                </Dialog>


                <RolePermissionSettings
                    open={this.state.RolePermissionsDialogOpen}
                    RoleId={this.state.SelectedRoleId}
                    RoleName={this.state.SelectedRoleName}
                    RolePermissions={this.state.SelectedRolePermissions}
                    onChangePermissions={(PermissionsObject: object) => this.setState({
                        SelectedRolePermissions: PermissionsObject,
                    })}
                    onSubmit={this.handleSaveRolePermissions}
                    onClose={() => this.setState({
                        RolePermissionsDialogOpen: false,
                        SelectedRoleId: 0,
                        SelectedRoleName: '',
                        SelectedRolePermissions: null,
                    })}
                />
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(UserRoleList);