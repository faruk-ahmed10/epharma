/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from 'react';
import ManufacTable from '../../../Layouts/Components/Private/Manufacturer/ManufacTable';
import {APP} from '../../../App/Init/App.Init';
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";
import "./Manufacturer.scss";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


class ManufacturerList extends Component <any, any> {


    public state: any

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Manufacturers: [],
            ManufacturerFormDialogOpen: false,
            ManufacturerFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                phone: "",
                email: "",
                address: "",
                details: "",
                status: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetManufacturers = this.handleGetManufacturers.bind(this);
        this.handleSaveManufacturer = this.handleSaveManufacturer.bind(this);
        this.handleDeleteManufacturer = this.handleDeleteManufacturer.bind(this);
        this.handleActiveManufacturer = this.handleActiveManufacturer.bind(this);
        this.handleInactiveManufacturer = this.handleInactiveManufacturer.bind(this);
    }

    private handleGetManufacturers(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/manufacturers",
            {},
            {},
            (data: any) => {
                console.log(data);
                this.setState({
                    Manufacturers: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Manufacturers!");
            }
        );
    }


    private handleSaveManufacturer(): void {

        if(this.state.ManufacturerFormDialogData.name.trim() === '') {
            alert("Enter name!");
            return;
        }

        if(Number(this.state.ManufacturerFormDialogData.phone) === 0) {
            alert("Enter phone number!");
            return;
        }

        if(this.state.ManufacturerFormDialogData.email.trim() === '') {
            alert("Enter email!");
            return;
        }




        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.ManufacturerFormDialogData.EditMode
                ? "/manufacturer/update"
                : "/manufacturer",
            {},
            {
                EditMode: this.state.ManufacturerFormDialogData.EditMode,
                id: this.state.ManufacturerFormDialogData.id,
                name: this.state.ManufacturerFormDialogData.name,
                phone: this.state.ManufacturerFormDialogData.phone,
                email: this.state.ManufacturerFormDialogData.email,
                address: this.state.ManufacturerFormDialogData.address,
                details: this.state.ManufacturerFormDialogData.details,
                status: this.state.ManufacturerFormDialogData.status,
            },
            (data: any) => {
                this.setState({ManufacturerFormDialogOpen: false});
                this.handleGetManufacturers();
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


    private handleDeleteManufacturer(ManufacturerId: number): void {
        if (!window.confirm("Are you sure to delete this ManufacturerList?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/manufacturer/" + ManufacturerId,
            {},
            {},
            (data: any) => {
                this.setState({ManufacturerFormDialogOpen: false});
                this.handleGetManufacturers();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    ManufacturerFormDialogOpen: false,
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


    private handleActiveManufacturer(ManufacturerId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/manufacturer/status/active/" + ManufacturerId,
            {},
            {},
            (data: any) => {
                this.setState({ManufacturerFormDialogOpen: false});
                this.handleGetManufacturers();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    ManufacturerFormDialogOpen: false,
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


    private handleInactiveManufacturer(ManufacturerId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/manufacturer/status/inactive/" + ManufacturerId,
            {},
            {},
            (data: any) => {
                this.setState({ManufacturerFormDialogOpen: false});
                this.handleGetManufacturers();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    ManufacturerFormDialogOpen: false,
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
        this.handleGetManufacturers();
    }


    render(): React.ReactNode {
        return (
            <div>

                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />

                <Breadcrumb title={"Manufacturer"} activeTitle={"Manufacturer"}/>

                <div className="category__header">
                    <Button
                        label="Add Manufacturer"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.ManufacturerFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.phone = "";
                            __data.email = "";
                            __data.address = "";
                            __data.details = "";
                            __data.status = "";
                            this.setState({
                                ManufacturerFormDialogOpen: true,
                                ManufacturerFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <ManufacTable
                    Data={this.state.Manufacturers}
                    onEdit={(id: number, name: string, phone: string, email: string, address: Text, details: Text, status: string) => {
                        let __data: any = this.state.ManufacturerFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.phone = phone;
                        __data.email = email;
                        __data.address = address;
                        __data.details = details;
                        __data.status = status;

                        this.setState({
                            ManufacturerFormDialogOpen: true,
                            ManufacturerFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteManufacturer}
                    onInactive={this.handleInactiveManufacturer}
                    onActive={this.handleActiveManufacturer}
                />

                <Dialog
                    title={
                        this.state.ManufacturerFormDialogData.EditMode ? "Edit Manufacturer" : "Add Manufacturer"
                    }
                    open={this.state.ManufacturerFormDialogOpen}
                    onClose={() => this.setState({ManufacturerFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveManufacturer}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Name *"}
                            value={this.state.ManufacturerFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.ManufacturerFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    ManufacturerFormDialogData: __data,
                                });
                            }}
                        />

                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Phone *"}
                            value={this.state.ManufacturerFormDialogData.phone}
                            onChange={(e: any) => {
                                let __data: any = this.state.ManufacturerFormDialogData;
                                __data.phone = e.target.value;
                                this.setState({
                                    ManufacturerFormDialogData: __data,
                                });
                            }}
                        />
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Email *"}
                            value={this.state.ManufacturerFormDialogData.email}
                            onChange={(e: any) => {
                                let __data: any = this.state.ManufacturerFormDialogData;
                                __data.email = e.target.value;
                                this.setState({
                                    ManufacturerFormDialogData: __data,
                                });
                            }}
                        />

                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Address"}
                            value={this.state.ManufacturerFormDialogData.address}
                            onChange={(e: any) => {
                                let __data: any = this.state.ManufacturerFormDialogData;
                                __data.address = e.target.value;
                                this.setState({
                                    ManufacturerFormDialogData: __data,
                                });
                            }}
                        />

                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Details"}
                            value={this.state.ManufacturerFormDialogData.details}
                            onChange={(e: any) => {
                                let __data: any = this.state.ManufacturerFormDialogData;
                                __data.details = e.target.value;
                                this.setState({
                                    ManufacturerFormDialogData: __data,
                                });
                            }}
                        />

                            {this.state.ManufacturerFormDialogData.id !== 0 ? (
                            <select
                                value={this.state.ManufacturerFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.ManufacturerFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        ManufacturerFormDialogData: __data,
                                    });
                                }}
                            >
                                <option value={"Active"}>Active</option>
                                <option value={"Inactive"}>Inactive</option>
                            </select>
                        ) : (
                            ""
                        )}

                    </React.Fragment>
                </Dialog>


            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(ManufacturerList);