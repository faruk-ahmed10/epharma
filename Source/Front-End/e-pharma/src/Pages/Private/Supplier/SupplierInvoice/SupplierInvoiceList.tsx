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
import SupplierInvoiceTable from "../../../../Layouts/Components/Private/Supplier/SupplierInvoiceTable";
import SupplierInvoiceForm from "./SupplierInvoiceForm";

class SupplierInvoiceList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            message: "",
            msgClass: "",
            icon: {},
            Suppliers: [],
            SupplierInvoices: [],
            SupplierInvoiceFormDialogOpen: false,
            SupplierInvoiceFormDialogData: {
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
        this.handleGetSupplierInvoices = this.handleGetSupplierInvoices.bind(this);
        this.handleGetSupplierInvoiceData = this.handleGetSupplierInvoiceData.bind(this);
        this.handleSaveSupplierInvoice = this.handleSaveSupplierInvoice.bind(this);
        this.handleDeleteSupplierInvoice = this.handleDeleteSupplierInvoice.bind(this);
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

    private handleGetSupplierInvoices(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/supplierInvoices",
            {},
            {},
            (data: any) => {
                this.setState({
                    SupplierInvoices: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Supplier Invoices!");
            }
        );
    }

    private handleGetSupplierInvoiceData(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/getSupplierInvoice?id=" + this.state.SupplierInvoiceFormDialogData.id,
            {},
            {},
            (data: any) => {
                const responseData = data.data;
                this.setState((state: any) => ({
                    SupplierInvoiceFormDialogData: {
                        ...state.SupplierInvoiceFormDialogData,
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
                alert("Failed to load the Supplier Invoice data!");
            }
        );
    }

    private handleSaveSupplierInvoice(): void {
        const __data: any = {
            EditMode: this.state.SupplierInvoiceFormDialogData.EditMode,
            id: this.state.SupplierInvoiceFormDialogData.id,
            document_date: APP.FUNCTIONS.CONVERT_DATE(this.state.SupplierInvoiceFormDialogData.DocumentDate, 'yyyy-mm-dd'),
            supplier_id: this.state.SupplierInvoiceFormDialogData.SupplierId,
            comment: this.state.SupplierInvoiceFormDialogData.Comment,
            total_amount: this.state.SupplierInvoiceFormDialogData.TotalAmount,
            particulars: this.state.SupplierInvoiceFormDialogData.Particulars,
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
            "/saveSupplierInvoice", {},
            __data,
            (data: any) => {
                this.handleGetSupplierInvoices();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Saved Successfully!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    SupplierInvoiceFormDialogOpen: false,
                    SupplierInvoiceFormDialogData: {
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

    private handleDeleteSupplierInvoice(SupplierInvoiceId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/deleteSupplierInvoice?id=" + SupplierInvoiceId,
            {},
            {},
            (data: any) => {
                this.handleGetSupplierInvoices();
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
        this.handleGetSupplierInvoices();
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


                <Breadcrumb title={"Invoice"} activeTitle={"Supplier Invoice"}/>
                <div className="category__header">
                    <Button
                        label="Add Supplier Invoice"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            this.setState({
                                SupplierInvoiceFormDialogOpen: true,
                            });
                        }}
                    />
                </div>

                <SupplierInvoiceTable
                    onEdit={(
                        id: number,
                    ) => {
                        let __data: any = this.state.SupplierInvoiceFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;

                        this.setState({
                            SupplierInvoiceFormDialogOpen: true,
                            SupplierInvoiceFormDialogData: __data,
                        }, () => {
                            this.handleGetSupplierInvoiceData();
                        });
                    }}
                    Data={this.state.SupplierInvoices}
                    onDelete={this.handleDeleteSupplierInvoice}
                />


                <SupplierInvoiceForm
                    open={this.state.SupplierInvoiceFormDialogOpen}
                    onClose={() => this.setState({
                        SupplierInvoiceFormDialogOpen: false,
                        SupplierInvoiceFormDialogData: {
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
                    editMode={this.state.SupplierInvoiceFormDialogData.EditMode}
                    loading={this.state.Loading}
                    suppliers={this.state.Suppliers}
                    data={this.state.SupplierInvoiceFormDialogData}
                    onChangeData={(data: any) => this.setState((state: any) => ({
                        SupplierInvoiceFormDialogData: {
                            ...state.SupplierInvoiceFormDialogData,
                            ...data,
                        }
                    }))}
                    onSubmit={this.handleSaveSupplierInvoice}/>
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(SupplierInvoiceList);
