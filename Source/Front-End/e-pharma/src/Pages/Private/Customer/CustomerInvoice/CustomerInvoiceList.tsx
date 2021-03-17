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
import CustomerInvoiceTable from "../../../../Layouts/Components/Private/Customer/CustomerInvoiceTable";
import CustomerInvoiceForm from "./CustomerInvoiceForm";

class CustomerInvoiceList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            message: "",
            msgClass: "",
            icon: {},
            Customers: [],
            CustomerInvoices: [],
            CustomerInvoiceFormDialogOpen: false,
            CustomerInvoiceFormDialogData: {
                EditMode: false,
                id: 0,
                DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                CustomerId: 0,
                Comment: '',
                TotalAmount: '',
                ParticularName: '',
                Quantity: '',
                UnitPrice: '',
                Particulars: [],
            },

            NotificationOpen: false,
            Loading: false,
        };

        this.handleGetCustomers = this.handleGetCustomers.bind(this);
        this.handleGetCustomerInvoices = this.handleGetCustomerInvoices.bind(this);
        this.handleGetCustomerInvoiceData = this.handleGetCustomerInvoiceData.bind(this);
        this.handleSaveCustomerInvoice = this.handleSaveCustomerInvoice.bind(this);
        this.handleDeleteCustomerInvoice = this.handleDeleteCustomerInvoice.bind(this);
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

    private handleGetCustomerInvoices(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/customerInvoices",
            {},
            {},
            (data: any) => {
                this.setState({
                    CustomerInvoices: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Customer Invoices!");
            }
        );
    }

    private handleGetCustomerInvoiceData(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getCustomerInvoice?id=" + this.state.CustomerInvoiceFormDialogData.id,
            {},
            {},
            (data: any) => {
                const responseData = data.data;
                this.setState((state: any) => ({
                    CustomerInvoiceFormDialogData: {
                        ...state.CustomerInvoiceFormDialogData,
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
                alert("Failed to load the Customer Invoice data!");
            }
        );
    }

    private handleSaveCustomerInvoice(): void {
        const __data: any = {
            EditMode: this.state.CustomerInvoiceFormDialogData.EditMode,
            id: this.state.CustomerInvoiceFormDialogData.id,
            document_date: APP.FUNCTIONS.CONVERT_DATE(this.state.CustomerInvoiceFormDialogData.DocumentDate, 'yyyy-mm-dd'),
            customer_id: this.state.CustomerInvoiceFormDialogData.CustomerId,
            comment: this.state.CustomerInvoiceFormDialogData.Comment,
            total_amount: this.state.CustomerInvoiceFormDialogData.TotalAmount,
            particulars: this.state.CustomerInvoiceFormDialogData.Particulars,
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
            "/saveCustomerInvoice", {},
            __data,
            (data: any) => {
                this.handleGetCustomerInvoices();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Saved Successfully!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    CustomerInvoiceFormDialogOpen: false,
                    CustomerInvoiceFormDialogData: {
                        EditMode: false,
                        id: 0,
                        DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                        CustomerId: 0,
                        Comment: '',
                        TotalAmount: '',
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

    private handleDeleteCustomerInvoice(CustomerInvoiceId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/deleteCustomerInvoice?id=" + CustomerInvoiceId,
            {},
            {},
            (data: any) => {
                this.handleGetCustomerInvoices();
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
        this.handleGetCustomerInvoices();
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


                <Breadcrumb title={"Invoice"} activeTitle={"Customer Invoice"}/>
                <div className="category__header">
                    <Button
                        label="Add Customer Invoice"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            this.setState({
                                CustomerInvoiceFormDialogOpen: true,
                            });
                        }}
                    />
                </div>

                <CustomerInvoiceTable
                    onEdit={(
                        id: number,
                    ) => {
                        let __data: any = this.state.CustomerInvoiceFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;

                        this.setState({
                            CustomerInvoiceFormDialogOpen: true,
                            CustomerInvoiceFormDialogData: __data,
                        }, () => {
                            this.handleGetCustomerInvoiceData();
                        });
                    }}
                    Data={this.state.CustomerInvoices}
                    onDelete={this.handleDeleteCustomerInvoice}
                />


                <CustomerInvoiceForm
                    open={this.state.CustomerInvoiceFormDialogOpen}
                    onClose={() => this.setState({
                        CustomerInvoiceFormDialogOpen: false,
                        CustomerInvoiceFormDialogData: {
                            EditMode: false,
                            id: 0,
                            DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                            CustomerId: 0,
                            Comment: '',
                            TotalAmount: '',
                            ParticularName: '',
                            Quantity: '',
                            UnitPrice: '',
                            Particulars: [],
                        }
                    })}
                    editMode={this.state.CustomerInvoiceFormDialogData.EditMode}
                    loading={this.state.Loading}
                    customers={this.state.Customers}
                    data={this.state.CustomerInvoiceFormDialogData}
                    onChangeData={(data: any) => this.setState((state: any) => ({
                        CustomerInvoiceFormDialogData: {
                            ...state.CustomerInvoiceFormDialogData,
                            ...data,
                        }
                    }))}
                    onSubmit={this.handleSaveCustomerInvoice}/>
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(CustomerInvoiceList);
