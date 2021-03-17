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
import CustomerPaymentTable from "../../../../Layouts/Components/Private/Customer/CustomerPaymentTable";
import CustomerPaymentForm from "./CustomerPaymentForm";

class CustomerPaymentList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            message: "",
            msgClass: "",
            icon: {},
            Customers: [],
            CustomerPayments: [],
            CustomerPaymentFormDialogOpen: false,
            CustomerPaymentFormDialogData: {
                EditMode: false,
                id: 0,
                DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                CustomerId: 0,
                Comment: '',
                TotalAmount: '',
                AdvanceAmount: '',
                DueAmount: '',
                ParticularName: '',
                Quantity: '',
                UnitPrice: '',
                Particulars: [],
            },

            NotificationOpen: false,
            Loading: false,
        };

        this.handleGetCustomers = this.handleGetCustomers.bind(this);
        this.handleGetCustomerPayments = this.handleGetCustomerPayments.bind(this);
        this.handleGetCustomerPaymentData = this.handleGetCustomerPaymentData.bind(this);
        this.handleGetCustomerTransactionDetail = this.handleGetCustomerTransactionDetail.bind(this);
        this.handleSaveCustomerPayment = this.handleSaveCustomerPayment.bind(this);
        this.handleDeleteCustomerPayment = this.handleDeleteCustomerPayment.bind(this);
    }

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
                alert("Failed to load the Customers!");
            }
        );
    }

    private handleGetCustomerPayments(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/customerPayments",
            {},
            {},
            (data: any) => {
                this.setState({
                    CustomerPayments: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Customer Payments!");
            }
        );
    }

    private handleGetCustomerTransactionDetail(CustomerId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getCustomerTransactionDetails?id=" + CustomerId,
            {},
            {},
            (data: any) => {
                const responseData = data.data;
                if (typeof responseData !== 'undefined' && responseData !== null) {
                    this.setState((state: any) => ({
                        CustomerPaymentFormDialogData: {
                            ...state.CustomerPaymentFormDialogData,
                            AdvanceAmount: Number(responseData.AdvanceAmount).toFixed(2),
                            DueAmount: Number(responseData.DueAmount).toFixed(2),
                        },
                    }));
                }
            },
            (error: any) => {
                alert("Failed to load the Customer Transaction data!");
            }
        );
    }

    private handleGetCustomerPaymentData(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getCustomerPayment?id=" + this.state.CustomerPaymentFormDialogData.id,
            {},
            {},
            (data: any) => {
                const responseData = data.data;

                //Update the transaction history
                this.handleGetCustomerTransactionDetail(Number(responseData.customer_id));

                this.setState((state: any) => ({
                    CustomerPaymentFormDialogData: {
                        ...state.CustomerPaymentFormDialogData,
                        DocumentDate: new Date(responseData.document_date),
                        CustomerId: responseData.customer_id,
                        Comment: responseData.comment,
                        TotalAmount: responseData.total_amount,
                        Particulars: responseData.particulars,
                    },
                }))
                ;
            },
            (error: any) => {
                alert("Failed to load the Customer Payment data!");
            }
        );
    }

    private handleSaveCustomerPayment(): void {
        const __data: any = {
            EditMode: this.state.CustomerPaymentFormDialogData.EditMode,
            id: this.state.CustomerPaymentFormDialogData.id,
            document_date: APP.FUNCTIONS.CONVERT_DATE(this.state.CustomerPaymentFormDialogData.DocumentDate, 'yyyy-mm-dd'),
            customer_id: this.state.CustomerPaymentFormDialogData.CustomerId,
            comment: this.state.CustomerPaymentFormDialogData.Comment,
            total_amount: this.state.CustomerPaymentFormDialogData.TotalAmount,
            particulars: this.state.CustomerPaymentFormDialogData.Particulars,
        };

        if (__data.document_date === '') {
            alert("Please select a date!");
            return;
        } else if (Number(__data.customer_id) < 1) {
            alert("Please select a customer!");
            return;
        } else if (__data.particulars.length === 0) {
            alert("Please input some particulars!");
            return;
        }

        this.setState({
            Loading: true,
        });

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/saveCustomerPayment", {},
            __data,
            (data: any) => {
                this.handleGetCustomerPayments();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Saved Successfully!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    CustomerPaymentFormDialogOpen: false,
                    CustomerPaymentFormDialogData: {
                        EditMode: false,
                        id: 0,
                        DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                        CustomerId: 0,
                        Comment: '',
                        TotalAmount: '',
                        AdvanceAmount: '',
                        DueAmount: '',
                        ParticularName: '',
                        Quantity: '',
                        UnitPrice: '',
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

    private handleDeleteCustomerPayment(CustomerPaymentId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/deleteCustomerPayment?id=" + CustomerPaymentId,
            {},
            {},
            (data: any) => {
                this.handleGetCustomerPayments();
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
        this.handleGetCustomers();
        this.handleGetCustomerPayments();
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


                <Breadcrumb title={"Payment"} activeTitle={"Customer Payment"}/>
                <div className="category__header">
                    <Button
                        label="Add Customer Payment"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            this.setState({
                                CustomerPaymentFormDialogOpen: true,
                            });
                        }}
                    />
                </div>

                <CustomerPaymentTable
                    onEdit={(
                        id: number,
                    ) => {
                        let __data: any = this.state.CustomerPaymentFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;

                        this.setState({
                            CustomerPaymentFormDialogOpen: true,
                            CustomerPaymentFormDialogData: __data,
                        }, () => {
                            this.handleGetCustomerPaymentData();
                        });
                    }}
                    Data={this.state.CustomerPayments}
                    onDelete={this.handleDeleteCustomerPayment}
                />


                <CustomerPaymentForm
                    open={this.state.CustomerPaymentFormDialogOpen}
                    onClose={() => this.setState({
                        CustomerPaymentFormDialogOpen: false,
                        CustomerPaymentFormDialogData: {
                            EditMode: false,
                            id: 0,
                            DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                            CustomerId: 0,
                            Comment: '',
                            TotalAmount: '',
                            AdvanceAmount: '',
                            DueAmount: '',
                            ParticularName: '',
                            Quantity: '',
                            UnitPrice: '',
                            Particulars: [],
                        }
                    })}
                    editMode={this.state.CustomerPaymentFormDialogData.EditMode}
                    loading={this.state.Loading}
                    customers={this.state.Customers}
                    onChangeCustomer={(CustomerId: number) => this.handleGetCustomerTransactionDetail(CustomerId)}
                    data={this.state.CustomerPaymentFormDialogData}
                    onChangeData={(data: any) => this.setState((state: any) => ({
                        CustomerPaymentFormDialogData: {
                            ...state.CustomerPaymentFormDialogData,
                            ...data,
                        }
                    }))}
                    onSubmit={this.handleSaveCustomerPayment}/>
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(CustomerPaymentList);
