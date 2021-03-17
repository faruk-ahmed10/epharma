/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from 'react';
import {APP} from '../../../../App/Init/App.Init';
import TaxTable from "../../../../Layouts/Components/Private/Tax/TaxTable";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import "./Tax.scss";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


class TaxList extends Component <any, any> {


    public state: any

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Taxes: [],
            TaxFormDialogOpen: false,
            TaxFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                rate: "",
                // status: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetTaxes = this.handleGetTaxes.bind(this);
        this.handleSaveTax = this.handleSaveTax.bind(this);
        this.handleDeleteTax = this.handleDeleteTax.bind(this);
        // this.handleActiveTax = this.handleActiveTax.bind(this);
        // this.handleInactiveTax = this.handleInactiveTax.bind(this);
    }

    private handleGetTaxes(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/taxes",
            {},
            {},
            (data: any) => {
                this.setState({
                    Taxes: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Taxes!");
            }
        );
    }


    private handleSaveTax(): void {
        if(this.state.TaxFormDialogData.name.trim() === '') {
            alert("Enter tax name!");
            return;
        }
        if(Number(this.state.TaxFormDialogData.rate) === 0) {
            alert("Enter tax rate!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.TaxFormDialogData.EditMode
                ? "/tax/update"
                : "/tax",
            {},
            {
                EditMode: this.state.TaxFormDialogData.EditMode,
                id: this.state.TaxFormDialogData.id,
                name: this.state.TaxFormDialogData.name,
                rate: this.state.TaxFormDialogData.rate,
                // status: this.state.TaxFormDialogData.status,
            },
            (data: any) => {
                this.setState({TaxFormDialogOpen: false});
                this.handleGetTaxes();
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


    private handleDeleteTax(TaxId: number): void {
        if (!window.confirm("Are you sure to delete this Tax?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/tax/" + TaxId,
            {},
            {},
            (data: any) => {
                this.setState({TaxFormDialogOpen: false});
                this.handleGetTaxes();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    TaxFormDialogOpen: false,
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
        this.handleGetTaxes();
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

                <Breadcrumb title={"Setting"} activeTitle={"Tax"}/>

                <div className="category__header">
                    <Button
                        label="Add Tax"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.TaxFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.rate = "";
                            // __data.status = "";
                            this.setState({
                                TaxFormDialogOpen: true,
                                TaxFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <TaxTable
                    Data={this.state.Taxes}
                    onEdit={(id: number, name: string, rate: string) => {
                        let __data: any = this.state.TaxFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.rate = rate;
                        // __data.status = status;

                        this.setState({
                            TaxFormDialogOpen: true,
                            TaxFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteTax}
                    // onInactive={this.handleInactiveTax}
                    // onActive={this.handleActiveTax}
                />

                <Dialog
                    title={
                        this.state.TaxFormDialogData.EditMode ? "Edit Tax" : "Add Tax"
                    }
                    open={this.state.TaxFormDialogOpen}
                    onClose={() => this.setState({TaxFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveTax}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Tax Name *"}
                            value={this.state.TaxFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.TaxFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    TaxFormDialogData: __data,
                                });
                            }}
                        />

                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Tax Rate *"}
                            value={this.state.TaxFormDialogData.rate}
                            onChange={(e: any) => {
                                let __data: any = this.state.TaxFormDialogData;
                                __data.rate = e.target.value;
                                this.setState({
                                    TaxFormDialogData: __data,
                                });
                            }}
                        />

                        {/* {this.state.TaxFormDialogData.id !== 0 ? (
                        <select
                            value={this.state.TaxFormDialogData.status}
                            onChange={(e: any) => {
                            let __data: any = this.state.TaxFormDialogData;
                            __data.status = e.target.value;
                            this.setState({
                                TaxFormDialogData: __data,
                            });
                            }}
                        >
                            <option value={"Active"}>Active</option>
                            <option value={"Inactive"}>Inactive</option>
                        </select>
                        ) : (
                        ""
                        )} */}

                    </React.Fragment>
                </Dialog>


            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(TaxList);