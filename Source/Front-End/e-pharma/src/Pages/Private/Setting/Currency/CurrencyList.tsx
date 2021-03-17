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
import {APP} from "../../../../App/Init/App.Init";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import CurrencyTable from "../../../../Layouts/Components/Private/Currency/CurrencyTable";
import GeneralSetting from "../../../../Pages/Private/Setting/GeneralSetting/GeneralSetting";
import "./Currency.scss";

class CurrencyList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Currencies: [],
            CurrencyFormDialogOpen: false,
            CurrencyFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                abbr: "",
                code: "",
                sign: "",
                // status: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetCurrencies = this.handleGetCurrencies.bind(this);
        this.handleSaveCurrency = this.handleSaveCurrency.bind(this);
        this.handleDeleteCurrency = this.handleDeleteCurrency.bind(this);
        // this.handleActiveCurrency = this.handleActiveCurrency.bind(this);
        // this.handleInactiveCurrency = this.handleInactiveCurrency.bind(this);
    }

    private handleGetCurrencies(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/currencies",
            {},
            {},
            (data: any) => {
                this.setState({
                    Currencies: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Currencies!");
            }
        );
    }

    private handleSaveCurrency(): void {
        if (this.state.CurrencyFormDialogData.name.trim() === "") {
            alert("Enter name!");
            return;
        }
        if (this.state.CurrencyFormDialogData.sign.trim() === "") {
            alert("Enter Sign!");
            return;
        }
        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.CurrencyFormDialogData.EditMode
                ? "/currency/update"
                : "/currency",
            {},
            {
                EditMode: this.state.CurrencyFormDialogData.EditMode,
                id: this.state.CurrencyFormDialogData.id,
                name: this.state.CurrencyFormDialogData.name,
                abbr: this.state.CurrencyFormDialogData.abbr,
                code: this.state.CurrencyFormDialogData.code,
                sign: this.state.CurrencyFormDialogData.sign,
                // status: this.state.CurrencyFormDialogData.status,
            },
            (data: any) => {
                this.setState({CurrencyFormDialogOpen: false});
                this.handleGetCurrencies();
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

    private handleDeleteCurrency(CurrencyId: number): void {
        if (!window.confirm("Are you sure to delete this Currency?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/currency/" + CurrencyId,
            {},
            {},
            (data: any) => {
                this.setState({CurrencyFormDialogOpen: false});
                this.handleGetCurrencies();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    CurrencyFormDialogOpen: false,
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
        this.handleGetCurrencies();
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

                <Breadcrumb title={"Setting"} activeTitle={"Currency"}/>

                <div className="category__header">
                    <Button
                        label="Add Currency"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.CurrencyFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.abbr = "";
                            __data.code = "";
                            __data.sign = "";
                            // __data.status = "";
                            this.setState({
                                CurrencyFormDialogOpen: true,
                                CurrencyFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <CurrencyTable
                    Data={this.state.Currencies}
                    onEdit={(
                        id: number,
                        name: string,
                        abbr: string,
                        code: string,
                        sign: string
                    ) => {
                        let __data: any = this.state.CurrencyFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.abbr = abbr;
                        __data.code = code;
                        __data.sign = sign;
                        // __data.status = status;

                        this.setState({
                            CurrencyFormDialogOpen: true,
                            CurrencyFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteCurrency}
                />

                <Dialog
                    title={
                        this.state.CurrencyFormDialogData.EditMode
                            ? "Edit Currency"
                            : "Add Currency"
                    }
                    open={this.state.CurrencyFormDialogOpen}
                    onClose={() => this.setState({CurrencyFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveCurrency}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Currency Name *"}
                            value={this.state.CurrencyFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.CurrencyFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    CurrencyFormDialogData: __data,
                                });
                            }}
                        />

                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Currency abbreviation"}
                            value={this.state.CurrencyFormDialogData.abbr}
                            onChange={(e: any) => {
                                let __data: any = this.state.CurrencyFormDialogData;
                                __data.abbr = e.target.value;
                                this.setState({
                                    CurrencyFormDialogData: __data,
                                });
                            }}
                        />
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Currency code"}
                            value={this.state.CurrencyFormDialogData.code}
                            onChange={(e: any) => {
                                let __data: any = this.state.CurrencyFormDialogData;
                                __data.code = e.target.value;
                                this.setState({
                                    CurrencyFormDialogData: __data,
                                });
                            }}
                        />

                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Currency sign *"}
                            value={this.state.CurrencyFormDialogData.sign}
                            onChange={(e: any) => {
                                let __data: any = this.state.CurrencyFormDialogData;
                                __data.sign = e.target.value;
                                this.setState({
                                    CurrencyFormDialogData: __data,
                                });
                            }}
                        />

                        {/* {this.state.CurrencyFormDialogData.id !== 0 ? (
                        <select
                            value={this.state.CurrencyFormDialogData.status}
                            onChange={(e: any) => {
                            let __data: any = this.state.CurrencyFormDialogData;
                            __data.status = e.target.value;
                            this.setState({
                                CurrencyFormDialogData: __data,
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

export default APP.SERVICES.CORE.ROUTER.withRouter(CurrencyList);
