/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {ErrorOutline} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {APP} from "../../../../App/Init/App.Init";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import MedicineTable from "../../../../Layouts/Components/Private/Medicine/MedicineTable";

class MedicineList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            Medicines: [],
            MedicineFormDialogOpen: false,
            MedicineFormDialogData: {
                EditMode: false,
                id: "",
                medicine_name: "",
                generic_name: "",
                strength: "",
                category_id: "",
                brand_id: "",
                vat_id: "",
                unit_id: "",
                purchase_price: "",
                sales_price: "",
                box_size: "",
                shelf_number: "",
                total_box: "",
                image: "",
                expire_date: "",
                medicine_details: "",
                status: "",
            },

            DialogOpen: false,
            NotificationOpen: false,
            message: "",
            msgClass: "",
            icon: {},
        };

        this.handleGetMedicines = this.handleGetMedicines.bind(this);
        this.handleDeleteMedicine = this.handleDeleteMedicine.bind(this);
        this.handleActiveMedicine = this.handleActiveMedicine.bind(this);
        this.handleIactiveMedicine = this.handleIactiveMedicine.bind(this);
    }

    private handleGetMedicines(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/medicines",
            {},
            {},
            (data: any) => {
                this.setState({
                    Medicines: data.data,
                });
            },
            (error: any) => {
                this.setState({
                    NotificationOpen: true,
                    message: "Something Wrong!",
                    msgClass: "danger",
                    icon: <ErrorOutline/>,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 300);
            }
        );
    }

    private handleDeleteMedicine(MedicineId: any): void {
        if (!window.confirm("Are you sure to delete this MedicineList?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/medicine/" + MedicineId,
            {},
            {},
            (data: any) => {
                this.handleGetMedicines();
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
                this.handleGetMedicines();
                this.setState({
                    NotificationOpen: true,
                    msgClass: "danger",
                    message: "Something Wrong!",
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

    private handleActiveMedicine(MedicineID: any): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/medicine/status/active/" + MedicineID,
            {},
            {},
            (data: any) => {
                this.handleGetMedicines();
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
                this.handleGetMedicines();
                this.setState({
                    NotificationOpen: true,
                    msgClass: "danger",
                    message: "Something Wrong!",
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

    private handleIactiveMedicine(MedicineID: any): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/medicine/status/inactive/" + MedicineID,
            {},
            {},
            (data: any) => {
                this.handleGetMedicines();
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
            () => {
                this.handleGetMedicines();
                this.setState({
                    NotificationOpen: true,
                    msgClass: "danger",
                    message: "Something Wrong!",
                    icon: <ErrorOutlineIcon/>,
                });
                setTimeout((error: any) => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    public componentDidMount(): void {
        this.handleGetMedicines();
    }

    render() {
        return (
            <>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />
                <Breadcrumb title={"Medicine"} activeTitle={"Medicine Manage"}/>

                <div className="category__header">
                    <Link
                        to={APP.ROUTES.PRIVATE.MEDICINE_ADD}
                        className={"cbtn cbtn--lg cbtn--primary mr-10"}
                    >
                        <AddIcon/> Add Medicine
                    </Link>
                </div>

                <MedicineTable
                    Data={this.state.Medicines}
                    onDelete={this.handleDeleteMedicine}
                    onActive={this.handleActiveMedicine}
                    onInactive={this.handleIactiveMedicine}
                />
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(MedicineList);
