/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
import {APP} from "../../../../App/Init/App.Init";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import AccountingHistoryTable
    from "../../../../Layouts/Components/Private/Accounting/AccountingHistory/AccountingHistoryTable";
import AccountingHistoryForm from "./AccountingHistoryForm";

class AccountingHistoryList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            ModuleType: this.props.type,
            DialogOpen: false,

            message: "",
            msgClass: "",
            icon: {},
            AccountCategories: [],
            AccountHeads: [],
            AccountingHistories: [],
            AccountingHistoryFormDialogOpen: false,
            AccountingHistoryFormDialogData: {
                EditMode: false,
                id: 0,
                DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                AccountCatId: 0,
                AccountCatName: '',
                AccountHeadId: 0,
                AccountHeadName: '',
                Comment: '',
                TotalAmount: '',
                ParticularName: '',
                Amount: '',
                Particulars: [],
            },

            NotificationOpen: false,
            Loading: false,
        };

        this.handleGetAccountCategories = this.handleGetAccountCategories.bind(this);
        this.handleGetAccountHeads = this.handleGetAccountHeads.bind(this);
        this.handleGetAccountingHistoryList = this.handleGetAccountingHistoryList.bind(this);
        this.handleGetAccountingHistoryData = this.handleGetAccountingHistoryData.bind(this);
        this.handleSaveAccountingHistory = this.handleSaveAccountingHistory.bind(this);
        this.handleDeleteAccountingHistory = this.handleDeleteAccountingHistory.bind(this);
    }

    private handleGetAccountCategories(): void {
        this.setState((state: any) => ({
            AccountHeads: [],
            AccountingHistoryFormDialogData: {
                ...state.AccountingHistoryFormDialogData,
                AccountHeadId: 0,
                AccountHeadName: '',
            },
        }));

        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/accountCategoriesNoLimit?type=" + this.state.ModuleType,
            {},
            {},
            (data: any) => {
                this.setState({
                    AccountCategories: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the account categories!");
            }
        );
    }

    private handleGetAccountHeads(AccountCatId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/accountHeadsNoLimit?cat_id=" + AccountCatId,
            {},
            {},
            (data: any) => {
                this.setState({
                    AccountHeads: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the account categories!");
            }
        );
    }

    private handleGetAccountingHistoryList(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/accountingHistories?type=" + this.state.ModuleType,
            {},
            {},
            (data: any) => {
                this.setState({
                    AccountingHistories: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Accounting History List!");
            }
        );
    }

    private handleGetAccountingHistoryData(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getAccountingHistory?id=" + this.state.AccountingHistoryFormDialogData.id,
            {},
            {},
            (data: any) => {
                const responseData = data.data;
                this.setState((state: any) => ({
                    AccountingHistoryFormDialogData: {
                        ...state.AccountingHistoryFormDialogData,
                        DocumentDate: new Date(responseData.document_date),
                        Comment: responseData.comment,
                        TotalAmount: responseData.total_amount,
                        Particulars: responseData.particulars,
                    },
                }))
                ;
            },
            (error: any) => {
                alert("Failed to load the Accounting History data!");
            }
        );
    }

    private handleSaveAccountingHistory(): void {
        const __data: any = {
            EditMode: this.state.AccountingHistoryFormDialogData.EditMode,
            id: this.state.AccountingHistoryFormDialogData.id,
            type: this.state.ModuleType,
            document_date: APP.FUNCTIONS.CONVERT_DATE(this.state.AccountingHistoryFormDialogData.DocumentDate, 'yyyy-mm-dd'),
            comment: this.state.AccountingHistoryFormDialogData.Comment,
            total_amount: this.state.AccountingHistoryFormDialogData.TotalAmount,
            particulars: this.state.AccountingHistoryFormDialogData.Particulars,
        };

        if (__data.document_date === '') {
            alert("Please select a date!");
            return;
        }else if (__data.particulars.length === 0) {
            alert("Please input some particulars!");
            return;
        }

        this.setState({
            Loading: true,
        });

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/saveAccountingHistory", {},
            __data,
            (data: any) => {
                this.handleGetAccountingHistoryList();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Saved Successfully!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    AccountingHistoryFormDialogOpen: false,
                    AccountingHistoryFormDialogData: {
                        EditMode: false,
                        id: 0,
                        DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                        AccountCatId: 0,
                        AccountCatName: '',
                        AccountHeadId: 0,
                        AccountHeadName: '',
                        Comment: '',
                        TotalAmount: '',
                        ParticularName: '',
                        Amount: '',
                        Particulars: [],
                    },
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
                    message: error.message,
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

    private handleDeleteAccountingHistory(AccountingHistoryId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/deleteAccountingHistory?id=" + AccountingHistoryId,
            {},
            {},
            (data: any) => {
                this.handleGetAccountingHistoryList();
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

    public componentDidMount(): void {
        this.handleGetAccountCategories();
        this.handleGetAccountingHistoryList();
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


                <Breadcrumb title={"Accounting History"} activeTitle={this.state.ModuleType + " List"}/>
                <div className="category__header">
                    <Button
                        label={`Add ${this.state.ModuleType}`}
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            this.setState({
                                AccountingHistoryFormDialogOpen: true,
                            });
                        }}
                    />
                </div>

                <AccountingHistoryTable
                    onEdit={(
                        id: number,
                    ) => {
                        let __data: any = this.state.AccountingHistoryFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;

                        this.setState({
                            AccountingHistoryFormDialogOpen: true,
                            AccountingHistoryFormDialogData: __data,
                        }, () => {
                            this.handleGetAccountingHistoryData();
                        });
                    }}
                    Data={this.state.AccountingHistories}
                    onDelete={this.handleDeleteAccountingHistory}
                />


                <AccountingHistoryForm
                    open={this.state.AccountingHistoryFormDialogOpen}
                    onClose={() => this.setState({
                        AccountingHistoryFormDialogOpen: false,
                        AccountingHistoryFormDialogData: {
                            EditMode: false,
                            id: 0,
                            DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                            AccountCatId: 0,
                            AccountCatName: '',
                            AccountHeadId: 0,
                            AccountHeadName: '',
                            Comment: '',
                            TotalAmount: '',
                            ParticularName: '',
                            Amount: '',
                            Particulars: [],
                        },
                    })}
                    editMode={this.state.AccountingHistoryFormDialogData.EditMode}
                    loading={this.state.Loading}
                    type={this.state.ModuleType}
                    accountCategories={this.state.AccountCategories}
                    accountHeads={this.state.AccountHeads}
                    data={this.state.AccountingHistoryFormDialogData}
                    onChangeData={(data: any) => this.setState((state: any) => ({
                        AccountingHistoryFormDialogData: {
                            ...state.AccountingHistoryFormDialogData,
                            ...data,
                        }
                    }))}
                    onChangeAccountCategory={(accountCatID: number) => this.handleGetAccountHeads(accountCatID)}
                    onSubmit={this.handleSaveAccountingHistory}/>
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(AccountingHistoryList);
