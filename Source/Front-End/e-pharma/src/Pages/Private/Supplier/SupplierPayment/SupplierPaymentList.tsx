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
import SupplierPaymentTable from "../../../../Layouts/Components/Private/Supplier/SupplierPaymentTable";
import SupplierPaymentForm from "./SupplierPaymentForm";

class SupplierPaymentList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            message: "",
            msgClass: "",
            icon: {},
            Suppliers: [],
            SupplierPayments: [],
            SupplierPaymentFormDialogOpen: false,
            SupplierPaymentFormDialogData: {
                EditMode: false,
                id: 0,
                DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                SupplierId: 0,
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

        this.handleGetSuppliers = this.handleGetSuppliers.bind(this);
        this.handleGetSupplierPayments = this.handleGetSupplierPayments.bind(this);
        this.handleGetSupplierPaymentData = this.handleGetSupplierPaymentData.bind(this);
        this.handleGetSupplierTransactionDetail = this.handleGetSupplierTransactionDetail.bind(this);
        this.handleSaveSupplierPayment = this.handleSaveSupplierPayment.bind(this);
        this.handleDeleteSupplierPayment = this.handleDeleteSupplierPayment.bind(this);
    }

    private handleGetSuppliers(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/suppliers",
            {},
            {},
            (data: any) => {
                this.setState({
                    Suppliers: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Suppliers!");
            }
        );
    }

    private handleGetSupplierPayments(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/supplierPayments",
            {},
            {},
            (data: any) => {
                this.setState({
                    SupplierPayments: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Supplier Payments!");
            }
        );
    }

    private handleGetSupplierTransactionDetail(SupplierId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getSupplierTransactionDetails?id=" + SupplierId,
            {},
            {},
            (data: any) => {
                const responseData = data.data;
                if (typeof responseData !== 'undefined' && responseData !== null) {
                    this.setState((state: any) => ({
                        SupplierPaymentFormDialogData: {
                            ...state.SupplierPaymentFormDialogData,
                            AdvanceAmount: Number(responseData.AdvanceAmount).toFixed(2),
                            DueAmount: Number(responseData.DueAmount).toFixed(2),
                        },
                    }));
                }
            },
            (error: any) => {
                alert("Failed to load the Supplier Transaction data!");
            }
        );
    }

    private handleGetSupplierPaymentData(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getSupplierPayment?id=" + this.state.SupplierPaymentFormDialogData.id,
            {},
            {},
            (data: any) => {
                const responseData = data.data;

                //Update the transaction history
                this.handleGetSupplierTransactionDetail(Number(responseData.supplier_id));

                this.setState((state: any) => ({
                    SupplierPaymentFormDialogData: {
                        ...state.SupplierPaymentFormDialogData,
                        DocumentDate: new Date(responseData.document_date),
                        SupplierId: responseData.supplier_id,
                        Comment: responseData.comment,
                        TotalAmount: responseData.total_amount,
                        Particulars: responseData.particulars,
                    },
                }))
                ;
            },
            (error: any) => {
                alert("Failed to load the Supplier Payment data!");
            }
        );
    }

    private handleSaveSupplierPayment(): void {
        const __data: any = {
            EditMode: this.state.SupplierPaymentFormDialogData.EditMode,
            id: this.state.SupplierPaymentFormDialogData.id,
            document_date: APP.FUNCTIONS.CONVERT_DATE(this.state.SupplierPaymentFormDialogData.DocumentDate, 'yyyy-mm-dd'),
            supplier_id: this.state.SupplierPaymentFormDialogData.SupplierId,
            comment: this.state.SupplierPaymentFormDialogData.Comment,
            total_amount: this.state.SupplierPaymentFormDialogData.TotalAmount,
            particulars: this.state.SupplierPaymentFormDialogData.Particulars,
        };

        if (__data.document_date === '') {
            alert("Please select a date!");
            return;
        } else if (Number(__data.supplier_id) < 1) {
            alert("Please select a supplier!");
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
            "/saveSupplierPayment", {},
            __data,
            (data: any) => {
                this.handleGetSupplierPayments();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Saved Successfully!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    SupplierPaymentFormDialogOpen: false,
                    SupplierPaymentFormDialogData: {
                        EditMode: false,
                        id: 0,
                        DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                        SupplierId: 0,
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

    private handleDeleteSupplierPayment(SupplierPaymentId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/deleteSupplierPayment?id=" + SupplierPaymentId,
            {},
            {},
            (data: any) => {
                this.handleGetSupplierPayments();
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
        this.handleGetSuppliers();
        this.handleGetSupplierPayments();
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


                <Breadcrumb title={"Payment"} activeTitle={"Supplier Payment"}/>
                <div className="category__header">
                    <Button
                        label="Add Supplier Payment"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            this.setState({
                                SupplierPaymentFormDialogOpen: true,
                            });
                        }}
                    />
                </div>

                <SupplierPaymentTable
                    onEdit={(
                        id: number,
                    ) => {
                        let __data: any = this.state.SupplierPaymentFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;

                        this.setState({
                            SupplierPaymentFormDialogOpen: true,
                            SupplierPaymentFormDialogData: __data,
                        }, () => {
                            this.handleGetSupplierPaymentData();
                        });
                    }}
                    Data={this.state.SupplierPayments}
                    onDelete={this.handleDeleteSupplierPayment}
                />


                <SupplierPaymentForm
                    open={this.state.SupplierPaymentFormDialogOpen}
                    onClose={() => this.setState({
                        SupplierPaymentFormDialogOpen: false,
                        SupplierPaymentFormDialogData: {
                            EditMode: false,
                            id: 0,
                            DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                            SupplierId: 0,
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
                    editMode={this.state.SupplierPaymentFormDialogData.EditMode}
                    loading={this.state.Loading}
                    suppliers={this.state.Suppliers}
                    onChangeSupplier={(SupplierId: number) => this.handleGetSupplierTransactionDetail(SupplierId)}
                    data={this.state.SupplierPaymentFormDialogData}
                    onChangeData={(data: any) => this.setState((state: any) => ({
                        SupplierPaymentFormDialogData: {
                            ...state.SupplierPaymentFormDialogData,
                            ...data,
                        }
                    }))}
                    onSubmit={this.handleSaveSupplierPayment}/>
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(SupplierPaymentList);
