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
import PurchaseOrderTable from "../../../../Layouts/Components/Private/Purchase/PurchaseOrderTable";
import PurchaseOrderForm from "../../../../Layouts/Components/Private/Purchase/PurchaseOrderForm";

class PurchaseOrderList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            message: "",
            msgClass: "",
            icon: {},
            Suppliers: [],
            PurchaseOrders: [],
            PurchaseOrderFormDialogOpen: false,
            PurchaseOrderFormDialogData: {
                EditMode: false,
                id: 0,
                DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                SupplierId: 0,
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

        this.handleGetSuppliers = this.handleGetSuppliers.bind(this);
        this.handleGetPurchaseOrders = this.handleGetPurchaseOrders.bind(this);
        this.handleGetPurchaseOrderData = this.handleGetPurchaseOrderData.bind(this);
        this.handleSavePurchaseOrder = this.handleSavePurchaseOrder.bind(this);
        this.handleDeletePurchaseOrder = this.handleDeletePurchaseOrder.bind(this);
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

    private handleGetPurchaseOrders(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/supplierInvoices",
            {},
            {},
            (data: any) => {
                this.setState({
                    PurchaseOrders: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Purchase Orders!");
            }
        );
    }

    private handleGetPurchaseOrderData(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getPurchaseOrder?id=" + this.state.PurchaseOrderFormDialogData.id,
            {},
            {},
            (data: any) => {
                const responseData = data.data;
                this.setState((state: any) => ({
                    PurchaseOrderFormDialogData: {
                        ...state.PurchaseOrderFormDialogData,
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
                alert("Failed to load the Purchase Order data!");
            }
        );
    }

    private handleSavePurchaseOrder(): void {
        const __data: any = {
            EditMode: this.state.PurchaseOrderFormDialogData.EditMode,
            id: this.state.PurchaseOrderFormDialogData.id,
            document_date: APP.FUNCTIONS.CONVERT_DATE(this.state.PurchaseOrderFormDialogData.DocumentDate, 'yyyy-mm-dd'),
            supplier_id: this.state.PurchaseOrderFormDialogData.SupplierId,
            comment: this.state.PurchaseOrderFormDialogData.Comment,
            total_amount: this.state.PurchaseOrderFormDialogData.TotalAmount,
            particulars: this.state.PurchaseOrderFormDialogData.Particulars,
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
            "/savePurchaseOrder", {},
            __data,
            (data: any) => {
                this.handleGetPurchaseOrders();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Saved Successfully!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PurchaseOrderFormDialogOpen: false,
                    PurchaseOrderFormDialogData: {
                        EditMode: false,
                        id: 0,
                        DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                        SupplierId: 0,
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

    private handleDeletePurchaseOrder(PurchaseOrderId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/deletePurchaseOrder?id=" + PurchaseOrderId,
            {},
            {},
            (data: any) => {
                this.handleGetPurchaseOrders();
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
        this.handleGetPurchaseOrders();
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


                <Breadcrumb title={"Purchase"} activeTitle={"Purchase Order"}/>
                <div className="category__header">
                    <Button
                        label="Add Purchase Order"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            this.setState({
                                PurchaseOrderFormDialogOpen: true,
                            });
                        }}
                    />
                </div>

                <PurchaseOrderTable
                    onEdit={(
                        id: number,
                    ) => {
                        let __data: any = this.state.PurchaseOrderFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;

                        this.setState({
                            PurchaseOrderFormDialogOpen: true,
                            PurchaseOrderFormDialogData: __data,
                        }, () => {
                            this.handleGetPurchaseOrderData();
                        });
                    }}
                    Data={this.state.PurchaseOrders}
                    onDelete={this.handleDeletePurchaseOrder}
                />


                <PurchaseOrderForm
                    open={this.state.PurchaseOrderFormDialogOpen}
                    onClose={() => this.setState({
                        PurchaseOrderFormDialogOpen: false,
                        PurchaseOrderFormDialogData: {
                            EditMode: false,
                            id: 0,
                            DocumentDate: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
                            SupplierId: 0,
                            Comment: '',
                            TotalAmount: '',
                            ParticularName: '',
                            Quantity: '',
                            UnitPrice: '',
                            Particulars: [],
                        }
                    })}
                    editMode={this.state.PurchaseOrderFormDialogData.EditMode}
                    loading={this.state.Loading}
                    suppliers={this.state.Suppliers}
                    data={this.state.PurchaseOrderFormDialogData}
                    onChangeData={(data: any) => this.setState((state: any) => ({
                        PurchaseOrderFormDialogData: {
                            ...state.PurchaseOrderFormDialogData,
                            ...data,
                        }
                    }))}
                    onSubmit={this.handleSavePurchaseOrder}/>
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(PurchaseOrderList);
