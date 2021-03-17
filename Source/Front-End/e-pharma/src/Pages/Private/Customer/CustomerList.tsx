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
import CustomerTable from "../../../Layouts/Components/Private/Customer/CustomerTable";

class CustomerList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            Customers: [],
            message: "",
            msgClass: "",
            icon: {},
            CustomerFormDialogOpen: false,
            CustomerFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                phone: "",
                email: "",
                address: "",
                status: "",
            },

            NotificationOpen: false,
            Loading: false,
        };

        this.handleGetCustomers = this.handleGetCustomers.bind(this);
        this.handleSaveCustomer = this.handleSaveCustomer.bind(this);
        this.handleActiveCustomer = this.handleActiveCustomer.bind(this);
        this.handleInactiveCustomer = this.handleInactiveCustomer.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
    }

    //CustomerList  List
    private handleGetCustomers(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/customers",
            {},
            {},
            (data: any) => {
                this.setState({
                    Customers: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the customers!");
            }
        );
    }

    //Customer Save
    private handleSaveCustomer(): void {
        if (this.state.CustomerFormDialogData.name.trim() === '') {
            alert("Enter customer name!");
            return;
        }

        if (Number(this.state.CustomerFormDialogData.phone) === 0) {
            alert("Enter customer phone!");
            return;
        }

        if (this.state.CustomerFormDialogData.status === '') {
            alert("Select status!");
            return;
        }


        this.setState({
            Loading: true,
        });
        const __data: any = {
            EditMode: this.state.CustomerFormDialogData.EditMode,
            id: this.state.CustomerFormDialogData.id,
            name: this.state.CustomerFormDialogData.name,
            phone: this.state.CustomerFormDialogData.phone,
            email: this.state.CustomerFormDialogData.email,
            address: this.state.CustomerFormDialogData.address,
            status: this.state.CustomerFormDialogData.status,
        };

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.CustomerFormDialogData.EditMode
                ? "/customer/update"
                : "/customer",
            {},
            __data,
            (data: any) => {
                this.handleGetCustomers();
                this.setState({
                    NotificationOpen: true,
                    message: "Data Successfully Added!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    Loading: false,
                    CustomerFormDialogOpen: false,
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

    private handleActiveCustomer(CatId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/customer/status/active/" + CatId,
            {},
            {},
            (data: any) => {
                this.handleGetCustomers();
                this.setState({
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

    private handleInactiveCustomer(CatId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/customer/status/inactive/" + CatId,
            {},
            {},
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetCustomers();
                this.setState({
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

    private handleDeleteCustomer(CatId: number): void {
        if(!window.confirm('Are you sure?')) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/customer/" + CatId,
            {},
            {},
            (data: any) => {
                this.handleGetCustomers();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    CategoryFormDialogOpen: false,
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
        this.handleGetCustomers();
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
                <Breadcrumb title={"People"} activeTitle={"Customer"}/>
                <div className="category__header">
                    <Button
                        label="Add Customer"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            let __data: any = this.state.CustomerFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.phone = "";
                            __data.email = "";
                            __data.address = "";
                            __data.status = "";

                            this.setState({
                                CustomerFormDialogOpen: true,
                                CustomerFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <CustomerTable
                    onEdit={(
                        id: number,
                        name: string,
                        phone: string,
                        email: string,
                        status: string,
                        address: string
                    ) => {
                        let __data: any = this.state.CustomerFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.phone = phone;
                        __data.email = email;
                        __data.address = address;
                        __data.status = status;
                        this.setState({
                            CustomerFormDialogOpen: true,
                            CustomerFormDialogData: __data,
                        });
                    }}
                    Data={this.state.Customers}
                    onInactive={this.handleInactiveCustomer}
                    onActive={this.handleActiveCustomer}
                    onDelete={this.handleDeleteCustomer}
                />

                <Dialog
                    title={
                        this.state.CustomerFormDialogData.EditMode
                            ? "Edit Customer"
                            : "Add Customer"
                    }
                    open={this.state.CustomerFormDialogOpen}
                    onClose={() => this.setState({CustomerFormDialogOpen: false})}
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
                                onClick={this.handleSaveCustomer}
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
                                    value={this.state.CustomerFormDialogData.name}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.CustomerFormDialogData;
                                        __data.name = e.target.value;
                                        this.setState({
                                            CustomerFormDialogData: __data,
                                        });
                                    }}
                                />
                                <input
                                    type={"text"}
                                    placeholder={"Phone *"}
                                    value={this.state.CustomerFormDialogData.phone}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.CustomerFormDialogData;
                                        __data.phone = e.target.value;
                                        this.setState({
                                            CustomerFormDialogData: __data,
                                        });
                                    }}
                                />
                            </div>

                            <input
                                type={"email"}
                                placeholder={"Email "}
                                value={this.state.CustomerFormDialogData.email}
                                onChange={(e: any) => {
                                    let __data: any = this.state.CustomerFormDialogData;
                                    __data.email = e.target.value;
                                    this.setState({
                                        CustomerFormDialogData: __data,
                                    });
                                }}
                            />

                            <select
                                className="mr-2 mb-4"
                                value={this.state.CustomerFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.CustomerFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        CustomerFormDialogData: __data,
                                    });
                                }}
                            >
                                <option value={""}>-- Select Status --</option>
                                <option value={"Active"}>Active</option>
                                <option value={"Banned"}>Banned</option>
                            </select>

                            <textarea
                                placeholder={"Address"}
                                value={this.state.CustomerFormDialogData.address}
                                onChange={(e: any) => {
                                    let __data: any = this.state.CustomerFormDialogData;
                                    __data.address = e.target.value;
                                    this.setState({
                                        CategoryFormDialogData: __data,
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

export default APP.SERVICES.CORE.ROUTER.withRouter(CustomerList);
