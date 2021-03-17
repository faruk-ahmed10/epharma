/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, {Component} from "react";
import {APP} from "../../../App/Init/App.Init";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import PharmacyTable from "../../../Layouts/Components/Private/Pharmacy/PharmacyTable";

// import "./Pharmacy.scss";

class PharmacyList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,
            Pharmacies: [],
            PharmacyFormDialogOpen: false,
            ChangePasswordFormDialogOpen: false,
            passChange: false,
            PharmacyFormDialogData: {
                EditMode: false,
                id: "",
                pharmacy_name: "",
                phone: "",
                domain: "",
                email: "",
                payment_status: "",
                password: "",
                confirm_password: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetPharmacies = this.handleGetPharmacies.bind(this);
        this.handleSavePharmacy = this.handleSavePharmacy.bind(this);
        this.handleDeletePharmacy = this.handleDeletePharmacy.bind(this);
        this.handleActivePharmacy = this.handleActivePharmacy.bind(this);
        this.handleInactivePharmacy = this.handleInactivePharmacy.bind(this);
        this.handleChangePasswordPharmacy = this.handleChangePasswordPharmacy.bind(this);
    }

    private handleGetPharmacies(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/pharmacies",
            {},
            {},
            (data: any) => {
                console.log(data);
                this.setState({
                    Pharmacies: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Pharmacies!");
            }
        );
    }

    private handleSavePharmacy(): void {

        if(this.state.PharmacyFormDialogData.pharmacy_name.trim() === '') {
            alert("Enter pharmacy name!");
            return;
        }

        if(Number(this.state.PharmacyFormDialogData.phone) === 0) {
            alert("Enter phone number!");
            return;
        }

        if(this.state.PharmacyFormDialogData.email.trim() === '') {
            alert("Enter enter email!");
            return;
        }

        if(Number(this.state.PharmacyFormDialogData.id) === 0 && this.state.PharmacyFormDialogData.password.trim() === '') {
            alert("Enter password!");
            return;
        }

        if(Number(this.state.PharmacyFormDialogData.id) === 0 && (this.state.PharmacyFormDialogData.confirm_password !== this.state.PharmacyFormDialogData.password)) {
            alert("Passwords do not match!");
            return;
        }

        if(this.state.PharmacyFormDialogData.payment_status === '') {
            alert("Select payment status!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/pharmacy",
            {},
            {
                EditMode: this.state.PharmacyFormDialogData.EditMode,
                id: this.state.PharmacyFormDialogData.id,
                pharmacy_name: this.state.PharmacyFormDialogData.pharmacy_name,
                phone: this.state.PharmacyFormDialogData.phone,
                domain: this.state.PharmacyFormDialogData.domain,
                email: this.state.PharmacyFormDialogData.email,
                payment_status: this.state.PharmacyFormDialogData.payment_status,
                password: this.state.PharmacyFormDialogData.password,
            },
            (data: any) => {
                this.setState({PharmacyFormDialogOpen: false});
                this.handleGetPharmacies();
                // alert("Successful!");
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

    private handleDeletePharmacy(pharmacyID: number): void {
        if (!window.confirm("Are you sure to permanent delete this Pharmacy?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/pharmacy/" + pharmacyID,
            {},
            {},
            (data: any) => {
                this.setState({PharmacyFormDialogOpen: false});
                this.handleGetPharmacies();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PharmacyFormDialogOpen: false,
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

    private handleActivePharmacy(pharmacyID: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/pharmacy/status/active/" + pharmacyID,
            {},
            {},
            (data: any) => {
                this.setState({PharmacyFormDialogOpen: false});
                this.handleGetPharmacies();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PharmacyFormDialogOpen: false,
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

    private handleInactivePharmacy(pharmacyID: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/pharmacy/status/inactive/" + pharmacyID,
            {},
            {},
            (data: any) => {
                this.setState({PharmacyFormDialogOpen: false});
                this.handleGetPharmacies();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PharmacyFormDialogOpen: false,
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

    private handleChangePasswordPharmacy(): void {
        if(this.state.PharmacyFormDialogData.confirm_password !== this.state.PharmacyFormDialogData.password) {
            alert("Passwords do not match!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/pharmacy-change/password",
            {},
            {
                id: this.state.PharmacyFormDialogData.id,
                password: this.state.PharmacyFormDialogData.password,
            },
            (data: any) => {
                this.setState({ChangePasswordFormDialogOpen: false});
                this.handleGetPharmacies();
                // alert("Successful!");
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

    public componentDidMount(): void {
        this.handleGetPharmacies();
    }

    render(): React.ReactNode {
        console.log(this.state.passChange);
        return (
            <div>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />

                <Breadcrumb title={"Pharmacy Manage"} activeTitle={"Pharmacy"}/>

                <div className="category__header">
                    <Button
                        label="Add Pharmacy"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.PharmacyFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.pharmacy_name = "";
                            __data.phone = "";
                            __data.domain = "";
                            __data.email = "";
                            __data.payment_status = "";
                            this.setState({
                                PharmacyFormDialogOpen: true,
                                PharmacyFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <PharmacyTable
                    Data={this.state.Pharmacies}
                    onEdit={(
                        id: number,
                        pharmacy_name: string,
                        phone: string,
                        domain: Text,
                        email: string,
                        payment_status: string
                    ) => {
                        let __data: any = this.state.PharmacyFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.pharmacy_name = pharmacy_name;
                        __data.phone = phone;
                        __data.domain = domain;
                        __data.email = email;
                        __data.payment_status = payment_status;

                        this.setState({
                            PharmacyFormDialogOpen: true,
                            PharmacyFormDialogData: __data,
                        });
                    }}
                    onChangePassword={(
                        id: number,
                        password: string,
                        confirm_password: string
                    ) => {
                        let __data: any = this.state.PharmacyFormDialogData;
                        __data.id = id;
                        __data.password = password;
                        __data.confirm_password = confirm_password;
                        this.setState({
                            ChangePasswordFormDialogOpen: true,
                            PharmacyFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeletePharmacy}
                    onInactive={this.handleInactivePharmacy}
                    onActive={this.handleActivePharmacy}
                />

                <Dialog
                    title={
                        this.state.PharmacyFormDialogData.EditMode
                            ? "Edit Pharmacy"
                            : "Add Pharmacy"
                    }
                    open={this.state.PharmacyFormDialogOpen}
                    onClose={() => this.setState({PharmacyFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSavePharmacy}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Pharmacy Name *"}
                            value={this.state.PharmacyFormDialogData.pharmacy_name}
                            onChange={(e: any) => {
                                let __data: any = this.state.PharmacyFormDialogData;
                                __data.pharmacy_name = e.target.value;
                                this.setState({
                                    PharmacyFormDialogData: __data,
                                });
                            }}
                        />

                        <div className="TwoInputField mb-0">
                            <input
                                className={"cat-dialog"}
                                type={"text"}
                                placeholder={"Phone *"}
                                value={this.state.PharmacyFormDialogData.phone}
                                onChange={(e: any) => {
                                    let __data: any = this.state.PharmacyFormDialogData;
                                    __data.phone = e.target.value;
                                    this.setState({
                                        PharmacyFormDialogData: __data,
                                    });
                                }}
                            />
                            <input
                                className={"mr-0"}
                                type={"text"}
                                placeholder={"www.example.com"}
                                value={this.state.PharmacyFormDialogData.domain}
                                onChange={(e: any) => {
                                    let __data: any = this.state.PharmacyFormDialogData;
                                    __data.domain = e.target.value;
                                    this.setState({
                                        PharmacyFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                        <input
                            className={"mr-0"}
                            type={"text"}
                            placeholder={"Admin Email *"}
                            value={this.state.PharmacyFormDialogData.email}
                            onChange={(e: any) => {
                                let __data: any = this.state.PharmacyFormDialogData;
                                __data.email = e.target.value;
                                this.setState({
                                    PharmacyFormDialogData: __data,
                                });
                            }}
                        />

                        {Number(this.state.PharmacyFormDialogData.id) !== 0 ? (
                            ""
                        ) : (
                            <div className="TwoInputField">
                                <input
                                    className={"cat-dialog "}
                                    type={"password"}
                                    placeholder={"System Admin Password *"}
                                    value={this.state.PharmacyFormDialogData.password}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.PharmacyFormDialogData;
                                        __data.password = e.target.value;
                                        this.setState({
                                            PharmacyFormDialogData: __data,
                                        });
                                    }}
                                />
                                <input
                                    className={"cat-dialog mr-0"}
                                    type={"password"}
                                    placeholder={"System Confirm Password *"}
                                    value={this.state.PharmacyFormDialogData.confirm_password}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.PharmacyFormDialogData;
                                        __data.confirm_password = e.target.value;
                                        this.setState({
                                            PharmacyFormDialogData: __data,
                                        });
                                    }}
                                />
                            </div>
                        )}

                        <select
                            className="mb-4"
                            value={this.state.PharmacyFormDialogData.payment_status}
                            onChange={(e: any) => {
                                let __data: any = this.state.PharmacyFormDialogData;
                                __data.payment_status = e.target.value;
                                this.setState({
                                    PharmacyFormDialogData: __data,
                                });
                            }}
                        >
                            <option value="">Payment Status *</option>
                            <option value={"Paid"}>Paid</option>
                            <option value={"Unpaid"}>Unpaid</option>
                            <option value={"Partial"}>Partial</option>
                        </select>
                    </React.Fragment>
                </Dialog>

                {/* Change password */}
                <Dialog
                    title={"Change Password"}
                    open={this.state.ChangePasswordFormDialogOpen}
                    onClose={() => this.setState({ChangePasswordFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Change Password"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleChangePasswordPharmacy}
                        />
                    }
                >
                    <React.Fragment>
                        <div className="TwoInputField">
                            <input
                                className={"cat-dialog "}
                                type={"password"}
                                placeholder={"System Admin Password"}
                                value={this.state.PharmacyFormDialogData.password}
                                onChange={(e: any) => {
                                    let __data: any = this.state.PharmacyFormDialogData;
                                    __data.password = e.target.value;
                                    this.setState({
                                        PharmacyFormDialogData: __data,
                                    });
                                }}
                            />
                            <input
                                className={"cat-dialog mr-0"}
                                type={"password"}
                                placeholder={"System Confirm Password"}
                                value={this.state.PharmacyFormDialogData.confirm_password}
                                onChange={(e: any) => {
                                    let __data: any = this.state.PharmacyFormDialogData;
                                    __data.confirm_password = e.target.value;
                                    this.setState({
                                        PharmacyFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                    </React.Fragment>
                </Dialog>
            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(PharmacyList);
