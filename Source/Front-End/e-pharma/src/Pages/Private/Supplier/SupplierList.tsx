/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, {Component} from "react";
import {APP} from "../../../App/Init/App.Init";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import SupplierTable from "../../../Layouts/Components/Private/Supplier/SupplierTable";

class SupplierList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            Companies: [],
            message: "",
            msgClass: "",
            icon: {},
            suppliers: [],
            SupplierFormDialogOpen: false,
            SupplierFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                phone: "",
                email: "",
                status: "",
                address: "",
            },

            NotificationOpen: false,
            Loading: false,
        };

        this.handleGetSuppliers = this.handleGetSuppliers.bind(this);
        this.handleSaveSupplier = this.handleSaveSupplier.bind(this);
        this.handleActiveSupplier = this.handleActiveSupplier.bind(this);
        this.handleInactiveSupplier = this.handleInactiveSupplier.bind(this);
        this.handleDeleteSupplier = this.handleDeleteSupplier.bind(this);
    }

    //Supplier List
    private handleGetSuppliers(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/suppliers",
            {},
            {},
            (data: any) => {
                console.log(data.data);
                this.setState({
                    Suppliers: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Suppliers!");
            }
        );
    }

    //Supplier Save
    private handleSaveSupplier(): void {
        if (this.state.SupplierFormDialogData.name.trim() === "") {
            alert("Enter supplier name!");
            return;
        }
        if (Number(this.state.SupplierFormDialogData.phone) === 0) {
            alert("Enter supplier phone!");
            return;
        }

        if (this.state.SupplierFormDialogData.status === '') {
            alert("Select status!");
            return;
        }

        this.setState({
            Loading: true,
        });
        const __data: any = {
            EditMode: this.state.SupplierFormDialogData.EditMode,
            id: this.state.SupplierFormDialogData.id,
            name: this.state.SupplierFormDialogData.name,
            phone: this.state.SupplierFormDialogData.phone,
            email: this.state.SupplierFormDialogData.email,
            status: this.state.SupplierFormDialogData.status,
            address: this.state.SupplierFormDialogData.address,
        };


        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.SupplierFormDialogData.EditMode
                ? "/supplier/update"
                : "/supplier",
            {},
            __data,
            (data: any) => {
                this.setState({SupplierFormDialogOpen: false});
                this.handleGetSuppliers();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Saved!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    SupplierFormDialogOpen: false,
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
                    Loading: false,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    private handleActiveSupplier(SupplierId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/supplier/status/active/" + SupplierId,
            {},
            {},
            (data: any) => {
                this.handleGetSuppliers();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    SupplierFormDialogDataOpen: false,
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

    private handleInactiveSupplier(SupplierId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/supplier/status/inactive/" + SupplierId,
            {},
            {},
            (data: any) => {
                this.handleGetSuppliers();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    SupplierFormDialogDataOpen: false,
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

    private handleDeleteSupplier(SupplierId: number): void {
        if (!window.confirm('Are you sure?')) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/supplier/" + SupplierId,
            {},
            {},
            (data: any) => {
                this.handleGetSuppliers();
                this.setState({
                    SupplierFormDialogDataOpen: false,
                    NotificationOpen: true,
                    message: data.message,
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

    public componentDidMount(): void {
        this.handleGetSuppliers();
    }

    public render(): React.ReactNode {
        return (
            <>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />
                <Breadcrumb title={"People"} activeTitle={"Supplier"}/>
                <div className="category__header">
                    <Button
                        label="Add Supplier"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            let __data: any = this.state.SupplierFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.phone = "";
                            __data.email = "";
                            __data.status = "";
                            __data.address = "";


                            this.setState({
                                SupplierFormDialogOpen: true,
                                SupplierFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <SupplierTable
                    onEdit={(
                        id: number,
                        name: string,
                        phone: string,
                        email: string,
                        status: string,
                        address: Text
                    ) => {
                        let __data: any = this.state.SupplierFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.phone = phone;
                        __data.email = email;
                        __data.status = status;
                        __data.address = address;

                        this.setState({
                            SupplierFormDialogOpen: true,
                            SupplierFormDialogData: __data,
                        });
                    }}
                    Data={this.state.Suppliers}
                    onInactive={this.handleInactiveSupplier}
                    onActive={this.handleActiveSupplier}
                    onDelete={this.handleDeleteSupplier}
                />

                <Dialog
                    title={
                        this.state.SupplierFormDialogData.EditMode
                            ? "Edit Supplier"
                            : "Add Supplier"
                    }
                    open={this.state.SupplierFormDialogOpen}
                    onClose={() => this.setState({SupplierFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        this.state.Loading ? (
                            <Button
                                label="Loading..."
                                disable={true}
                                className="cbtn--lg cbtn--danger"
                            />
                        ) : (
                            <Button
                                label="Save"
                                className="cbtn--lg cbtn--primary"
                                onClick={this.handleSaveSupplier}
                            />
                        )
                    }
                >
                    <React.Fragment>
                        <form encType="multipart/form-data">
                            <div className="TwoInputField">
                                <input
                                    type={"text"}
                                    placeholder={"Name *"}
                                    className="mr-2"
                                    value={this.state.SupplierFormDialogData.name}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.SupplierFormDialogData;
                                        __data.name = e.target.value;
                                        this.setState({
                                            SupplierFormDialogData: __data,
                                        });
                                    }}
                                />
                                <input
                                    type={"text"}
                                    placeholder={"Phone *"}
                                    value={this.state.SupplierFormDialogData.phone}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.SupplierFormDialogData;
                                        __data.phone = e.target.value;
                                        this.setState({
                                            SupplierFormDialogData: __data,
                                        });
                                    }}
                                />
                            </div>

                            <input
                                type={"text"}
                                placeholder={"Email"}
                                value={this.state.SupplierFormDialogData.email}
                                onChange={(e: any) => {
                                    let __data: any = this.state.SupplierFormDialogData;
                                    __data.email = e.target.value;
                                    this.setState({
                                        SupplierFormDialogData: __data,
                                    });
                                }}
                            />

                            <select
                                className="mr-2 mb-4"
                                value={this.state.SupplierFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.SupplierFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        SupplierFormDialogData: __data,
                                    });
                                }}
                            >
                                <option value="">--Select Status --</option>
                                <option value={"Active"}>Active</option>
                                <option value={"Banned"}>Banned</option>
                            </select>

                            <textarea
                                placeholder={"Address"}
                                value={this.state.SupplierFormDialogData.address}
                                onChange={(e: any) => {
                                    let __data: any = this.state.SupplierFormDialogData;
                                    __data.address = e.target.value;
                                    this.setState({
                                        SupplierFormDialogData: __data,
                                    });
                                }}
                            />
                        </form>
                    </React.Fragment>
                </Dialog>
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(SupplierList);
