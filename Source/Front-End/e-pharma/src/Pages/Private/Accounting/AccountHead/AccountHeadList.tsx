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
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AccountHeadTable from "../../../../Layouts/Components/Private/Accounting/AccountHead/AccountHeadTable";


class AccountHeadList extends Component <any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Heads: [],
            Categories: [],
            HeadFormDialogOpen: false,
            HeadFormDialogData: {
                EditMode: false,
                id: "",
                category_id: "",
                name: "",
                type: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetHeads = this.handleGetHeads.bind(this);
        this.handleSaveHeads = this.handleSaveHeads.bind(this);
        this.handleDeleteHeads = this.handleDeleteHeads.bind(this);
        this.handleGetCategories = this.handleGetCategories.bind(this);
    }

    private handleGetHeads(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/account_heads",
            {},
            {},
            (data: any) => {
                this.setState({
                    Heads: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Heads!");
            }
        );
    }

    private handleGetCategories(): void {
        const type = this.state.HeadFormDialogData.type;
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/account_categories_by_type?type=" + type,
            {},
            {},
            (data: any) => {
                this.setState({
                    Categories: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Categories!");
            }
        );
    }


    private handleSaveHeads(): void {

        if(this.state.HeadFormDialogData.type.trim() === '') {
            alert("Select type!");
            return;
        }
        if(Number(this.state.HeadFormDialogData.category_id) === 0) {
            alert("Select Category!");
            return;
        }

        if(this.state.HeadFormDialogData.name.trim() === '') {
            alert("Enter Head Name!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.HeadFormDialogData.EditMode
                ? "/account_head/update"
                : "/account_head_store",
            {},
            {
                EditMode: this.state.HeadFormDialogData.EditMode,
                id: this.state.HeadFormDialogData.id,
                name: this.state.HeadFormDialogData.name,
                type: this.state.HeadFormDialogData.type,
                category_id: this.state.HeadFormDialogData.category_id,
            },
            (data: any) => {
                this.setState({HeadFormDialogOpen: false});
                this.handleGetHeads();
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


    private handleDeleteHeads(TaxId: number): void {
        if (!window.confirm("Are you sure to delete this Head?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/account_head/" + TaxId,
            {},
            {},
            (data: any) => {
                this.setState({HeadFormDialogOpen: false});
                this.handleGetHeads();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    HeadFormDialogOpen: false,
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
        this.handleGetHeads();
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

                <Breadcrumb title={"Accounting"} activeTitle={"Heads"}/>

                <div className="category__header">
                    <Button
                        label="Add Account Head"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.HeadFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.type = "";
                            __data.category_id = 0;
                            __data.pharmacy_id = "";
                            // __data.status = "";
                            this.setState({
                                HeadFormDialogOpen: true,
                                HeadFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <AccountHeadTable
                    Data={this.state.Heads}
                    onEdit={(id: number, name: string, type: string, account_category_id: number) => {
                        let __data: any = this.state.HeadFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.type = type;
                        __data.category_id = account_category_id;

                        this.setState({
                            HeadFormDialogOpen: true,
                            HeadFormDialogData: __data,
                        }, () => {
                            this.handleGetCategories();
                        });
                    }}
                    onDelete={this.handleDeleteHeads}
                />

                <Dialog
                    title={
                        this.state.HeadFormDialogData.EditMode ? "Edit Account Head" : "Add Account Head"
                    }
                    open={this.state.HeadFormDialogOpen}
                    onClose={() => this.setState({HeadFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveHeads}
                        />
                    }
                >
                    <React.Fragment>


                        <div className="TwoInputField">
                            <select
                                className="mr-2"
                                value={this.state.HeadFormDialogData.type}
                                onChange={(e: any) => {
                                    let __data: any = this.state.HeadFormDialogData;
                                    __data.type = e.target.value;

                                    this.setState({
                                        HeadFormDialogData: __data
                                    }, () => {
                                        this.handleGetCategories();
                                    });
                                }}
                                disabled={this.state.HeadFormDialogData.EditMode}>
                                <option>Select Type *</option>
                                <option value={"Income"}>Income</option>
                                <option value={"Expense"}>Expense</option>
                            </select>

                        </div>

                        <div className="TwoInputField">
                            <select
                                className="mr-2"
                                value={this.state.HeadFormDialogData.category_id}
                                onChange={(e: any) => {
                                    let __data: any = this.state.HeadFormDialogData;
                                    __data.category_id = e.target.value;
                                    this.setState({
                                        HeadFormDialogOpen: __data,
                                    });
                                }}
                                disabled={this.state.HeadFormDialogData.EditMode}>
                                <option>Select Category *</option>
                                {typeof this.state.Categories !== 'undefined' && this.state.Categories.map((Cat: any, i: number) => (
                                    <option key={i} value={Cat.id}>{Cat.name}</option>
                                ))}

                            </select>

                        </div>

                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Name *"}
                            value={this.state.HeadFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.HeadFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    HeadFormDialogData: __data,
                                });
                            }}
                        />

                        {/*<div className="TwoInputField">*/}
                        {/*    <select*/}
                        {/*        className="mr-2"*/}
                        {/*        value={this.state.HeadFormDialogData.pharmacy_id}*/}
                        {/*        onChange={(e: any) => {*/}
                        {/*            let __data: any = this.state.HeadFormDialogOpen;*/}
                        {/*            __data.pharmacy_id = e.target.value;*/}
                        {/*            this.setState({*/}
                        {/*                HeadFormDialogOpen: __data,*/}
                        {/*            });*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <option value="">Select Pharmechy</option>*/}
                        {/*        <option value={"Male"}>Male</option>*/}
                        {/*        <option value={"Female"}>Female</option>*/}
                        {/*        <option value={"Other"}>Other</option>*/}
                        {/*    </select>*/}

                        {/*</div>*/}


                        {/* {this.state.HeadFormDialogData.id !== 0 ? (
                        <select
                            value={this.state.HeadFormDialogData.status}
                            onChange={(e: any) => {
                            let __data: any = this.state.HeadFormDialogData;
                            __data.status = e.target.value;
                            this.setState({
                                HeadFormDialogData: __data,
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

export default APP.SERVICES.CORE.ROUTER.withRouter(AccountHeadList);