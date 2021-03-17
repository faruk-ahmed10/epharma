/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from 'react';
import {APP} from "../../../App/Init/App.Init";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";
import PayrollTable from "../../../Layouts/Components/Private/Payroll/PayrollTable";
import "./PayrollList.scss";
import {Col, Row} from "react-bootstrap";


class PayrollList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,
            EmployeeList: [],

            message: "",
            msgClass: "",
            icon: {},
            Payrolls: [],
            PayrollFormDialogOpen: false,
            PayrollFormDialogData: {
                EditMode: false,
                id: "",
                employee_id: "",
                total_attendance: "",
                total_leaves: "",
                month: "",
                year: "",
                basic: "",
                bonus: "",
                overtime: "",
                deduction: "",
                net_pay: "",
                status: "",
            },

            NotificationOpen: false,
            Loading: false,

            __months: [
                {value: "Jan", label: "January"},
                {value: "Feb", label: "February"},
                {value: "Mar", label: "March"},
                {value: "Apr", label: "April"},
                {value: "May", label: "May"},
                {value: "Jun", label: "June"},
                {value: "Jul", label: "July"},
                {value: "Aug", label: "August"},
                {value: "Sep", label: "September"},
                {value: "Oct", label: "October"},
                {value: "Nov", label: "November"},
                {value: "Dec", label: "December"},
            ],
        };

        this.handleResetForm = this.handleResetForm.bind(this);
        this.getMonthByValue = this.getMonthByValue.bind(this);
        this.handleGetTotalAttendance = this.handleGetTotalAttendance.bind(this);
        this.handleGetTotalLeaves = this.handleGetTotalLeaves.bind(this);
        this.handleGetPayrolls = this.handleGetPayrolls.bind(this);
        this.handleSavePayroll = this.handleSavePayroll.bind(this);
        this.handleDeletePayroll = this.handleDeletePayroll.bind(this);
        this.handleGetEmployeeList = this.handleGetEmployeeList.bind(this);
        this.handlePaidPayroll = this.handlePaidPayroll.bind(this);
        this.handleUnpaidPayroll = this.handleUnpaidPayroll.bind(this);
        this.handleGetEmployeeData = this.handleGetEmployeeData.bind(this);
        this.handleUpdateNetPay = this.handleUpdateNetPay.bind(this);
    }

    private getMonthByValue(value: string) {
        return this.state.__months[this.state.__months.findIndex((m: any) => m.value === value)];
    }

    private handleResetForm() {
        this.setState((state: any) => ({
            PayrollFormDialogData: {
                ...state.PayrollFormDialogData,
                EditMode: false,
                id: "",
                employee_id: "",
                total_attendance: "",
                total_leave: "",
                month: "",
                year: "",
                basic: "",
                bonus: "",
                overtime: "",
                deduction: "",
                net_pay: "",
                status: "",
            },
        }))
    }

    private handleGetTotalAttendance(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            `/total_attendance?month=${this.state.PayrollFormDialogData.month}&year=${this.state.PayrollFormDialogData.year}&employee_id=${this.state.PayrollFormDialogData.employee_id}`,
            {},
            {},
            (data: any) => {
                this.setState((state: any) => ({
                    PayrollFormDialogData: {
                        ...state.PayrollFormDialogData,
                        total_attendance: data.data,
                    }
                }));
            },
            (error: any) => {
                alert("Failed to load the total attendance!");
            }
        );
    }

    private handleGetTotalLeaves(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            `/total_leaves?month=${this.state.PayrollFormDialogData.month}&year=${this.state.PayrollFormDialogData.year}&employee_id=${this.state.PayrollFormDialogData.employee_id}`,
            {},
            {},
            (data: any) => {
                this.setState((state: any) => ({
                    PayrollFormDialogData: {
                        ...state.PayrollFormDialogData,
                        total_leaves: data.data,
                    }
                }));
            },
            (error: any) => {
                alert("Failed to load the total leaves!");
            }
        );
    }

    private handleGetPayrolls(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/payrolls",
            {},
            {},
            (data: any) => {
                this.setState({
                    Payrolls: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Payrolls!");
            }
        );
    }

    private handleSavePayroll(): void {

        if (Number(this.state.PayrollFormDialogData.employee_id) === 0) {
            alert("Select Employee!");
            return;
        }

        if (this.state.PayrollFormDialogData.month === '') {
            alert("Select month!");
            return;
        }

        if (this.state.PayrollFormDialogData.status === '') {
            alert("Select status!");
            return;
        }

        this.setState({
            Loading: true,
        });

        APP.SERVICES.HTTP_REQUEST.send(
            "post", "/payroll/save",
            {},
            {
                ...this.state.PayrollFormDialogData,
            },
            (data: any) => {
                this.setState({PayrollFormDialogOpen: false});
                this.handleGetPayrolls();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Data Successfully Added!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PayrollFormDialogOpen: false,
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
                    PayrollFormDialogOpen: true,
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

    private handleDeletePayroll(PayrollId: number): void {

        if (!window.confirm("Are you sure?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/payroll/" + PayrollId,
            {},
            {},
            (data: any) => {
                this.setState({PayrollFormDialogOpen: false});
                this.handleGetPayrolls();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PayrollFormDialogOpen: false,
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
                    PayrollFormDialogOpen: false,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    private handleGetEmployeeList(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/employees",
            {},
            {},
            (data: any) => {

                this.setState({
                    EmployeeList: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Employee List!");
            }
        );
    }

    private handlePaidPayroll(PayrollId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/payroll/status/paid/" + PayrollId,
            {},
            {},
            (data: any) => {
                this.setState({PayrollFormDialogOpen: false});
                this.handleGetPayrolls();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PayrollFormDialogOpen: false,
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

    private handleUnpaidPayroll(PayrollId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/payroll/status/unpaid/" + PayrollId,
            {},
            {},
            (data: any) => {
                this.setState({PayrollFormDialogOpen: false});
                this.handleGetPayrolls();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    PayrollFormDialogOpen: false,
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

    private handleGetEmployeeData(id: number) {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/employee/" + id,
            {},
            {},
            (data: any) => {
                console.log(data);
                this.setState((state: any) => ({
                    PayrollFormDialogData: {
                        ...state.PayrollFormDialogData,
                        basic: data.data.salary
                    }
                }))
                this.handleUpdateNetPay();
            },
            (error: any) => {
                alert("Failed to load the Payrolls!");
            }
        );

    }

    private handleUpdateNetPay() {
        let net_pay_amount = 0;
        let __basic = this.state.PayrollFormDialogData.basic;
        let __bonus = this.state.PayrollFormDialogData.bonus;
        let __overtime = this.state.PayrollFormDialogData.overtime;
        let __deduction = this.state.PayrollFormDialogData.deduction;

        net_pay_amount = (APP.FUNCTIONS.TO_NUMBER(__basic) + APP.FUNCTIONS.TO_NUMBER(__bonus) + APP.FUNCTIONS.TO_NUMBER(__overtime)) - APP.FUNCTIONS.TO_NUMBER(__deduction);
        this.setState((state: any) => ({
            PayrollFormDialogData: {
                ...state.PayrollFormDialogData,
                net_pay: net_pay_amount,
            },
        }));
    }

    public componentDidMount(): void {
        this.handleGetPayrolls();
        this.handleGetEmployeeList();
    }

    public render(): React.ReactNode {
        return (
            <>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />
                <Breadcrumb title={"HR"} activeTitle={"Payroll"}/>
                <div className="category__header">
                    <Button
                        label="Add Payroll"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            this.handleResetForm();
                            this.setState({
                                PayrollFormDialogOpen: true,
                            });
                        }}
                    />
                </div>

                <PayrollTable

                    Payrolls={this.state.Payrolls}
                    onEdit={(
                        id: number,
                        employee_id: number,
                        month: string,
                        year: string,
                        basic: number,
                        bonus: number,
                        overtime: number,
                        deduction: number,
                        net_pay: number,
                        status: string,
                    ) => {
                        let __data: any = this.state.PayrollFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.employee_id = employee_id;
                        __data.month = month;
                        __data.year = year;
                        __data.basic = basic;
                        __data.bonus = bonus;
                        __data.overtime = overtime;
                        __data.deduction = deduction;
                        __data.net_pay = net_pay;
                        __data.status = status;
                        this.setState({
                            PayrollFormDialogOpen: true,
                            PayrollFormDialogData: __data,
                        }, () => {
                            this.handleGetTotalAttendance();
                            this.handleGetTotalLeaves();
                        });

                    }}

                    Data={this.state.Payrolls}
                    onDelete={this.handleDeletePayroll}
                />

                <Dialog
                    title={
                        this.state.PayrollFormDialogData.EditMode
                            ? "Edit Payroll"
                            : "Add Payroll"
                    }
                    open={this.state.PayrollFormDialogOpen}
                    onClose={() => {
                        this.setState({PayrollFormDialogOpen: false});
                        this.handleResetForm();
                    }}
                    fullWidth={true}
                    actionBar={
                        this.state.Loading ? (
                            <Button
                                label="Loading..."
                                disable={true}
                                className="cbtn--lg cbtn--danger"
                            />
                        ) : (
                            <Button
                                label="Save"
                                className="cbtn--lg cbtn--primary"
                                onClick={this.handleSavePayroll}
                            />
                        )
                    }>
                    <React.Fragment>
                        <form encType="multipart/form-data">
                            <Row>
                                <Col md={6}>
                                    <select
                                        className="mr-2 mb-4"
                                        value={this.state.PayrollFormDialogData.employee_id}
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            if (value !== '') {
                                                let __data: any = this.state.PayrollFormDialogData;
                                                __data.employee_id = value;

                                                this.setState({
                                                    PayrollFormDialogData: __data,
                                                });

                                                this.handleGetEmployeeData(value);
                                                this.handleGetTotalAttendance();
                                                this.handleGetTotalLeaves();
                                            } else {
                                                //Reset the form
                                                this.handleResetForm();
                                            }
                                        }}>
                                        <option value="">Select Employee *</option>

                                        {typeof this.state.EmployeeList !== "undefined" &&
                                        this.state.EmployeeList.map((data: any, index: number) => (
                                            <option value={data.id} key={index}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </Col>

                                <Col md={6}>
                                    <select
                                        className="mr-2 mb-4"
                                        value={this.state.PayrollFormDialogData.month}
                                        onChange={(e: any) => {
                                            let __data: any = this.state.PayrollFormDialogData;
                                            __data.month = e.target.value;

                                            this.setState({
                                                PayrollFormDialogData: __data,
                                            }, () => {
                                                this.handleGetTotalAttendance();
                                                this.handleGetTotalLeaves();
                                            });
                                        }}>
                                        <option value="">Select Month *</option>
                                        {this.state.__months.map((month: any, index: number) => (
                                            <option key={index} value={month.value}>{month.label}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>

                            <div>
                                <b>Month: </b> {this.state.PayrollFormDialogData.month !== '' && this.getMonthByValue(this.state.PayrollFormDialogData.month).label}
                            </div>
                            <div>
                                <b>Total Attendance: </b> {this.state.PayrollFormDialogData.total_attendance}
                            </div>
                            <div>
                                <b>Total Leaves: </b> {this.state.PayrollFormDialogData.total_leaves}
                            </div>
                            <br/>


                            <Row>
                                <Col md={12}>
                                    <input
                                        className={""}
                                        style={{
                                            background: "#eeeeee",
                                            color: "#000000",
                                            fontSize: 20,
                                            fontWeight: "bold"
                                        }}
                                        disabled={true}
                                        type={"text"}
                                        placeholder={"Basic"}
                                        name="basic"
                                        value={this.state.PayrollFormDialogData.basic}
                                        readOnly={true}
                                    />
                                </Col>

                                <Col md={4}>
                                    <input
                                        className={""}
                                        style={{
                                            background: "#eaf6db",
                                            color: "#000000",
                                            fontSize: 17,
                                            fontWeight: "bold"
                                        }}
                                        type={"text"}
                                        placeholder={"Bonus"}
                                        name="bonus"
                                        value={this.state.PayrollFormDialogData.bonus}
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            if (Number(value) < 0 || isNaN(Number(value))) {
                                                return;
                                            }

                                            let __data: any = this.state.PayrollFormDialogData;
                                            __data.bonus = value;
                                            this.setState({
                                                PayrollFormDialogData: __data,
                                            }, () => {
                                                this.handleUpdateNetPay();
                                            });
                                        }}
                                    />
                                </Col>
                                <Col md={4}>
                                    <input
                                        className={""}
                                        style={{
                                            background: "#eaf6db",
                                            color: "#000000",
                                            fontSize: 17,
                                            fontWeight: "bold"
                                        }}
                                        type={"text"}
                                        name="overtime"
                                        placeholder={"Over Time salary"}
                                        value={this.state.PayrollFormDialogData.overtime}
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            if (Number(value) < 0 || isNaN(Number(value))) {
                                                return;
                                            }

                                            let __data: any = this.state.PayrollFormDialogData;
                                            __data.overtime = value;
                                            this.setState({
                                                PayrollFormDialogData: __data,
                                            }, () => {
                                                this.handleUpdateNetPay();
                                            });
                                        }}
                                    />
                                </Col>

                                <Col md={4}>
                                    <input
                                        className={""}
                                        style={{
                                            background: "#fde1e1",
                                            color: "#000000",
                                            fontSize: 17,
                                            fontWeight: "bold"
                                        }}
                                        type={"text"}
                                        placeholder={"Deduction"}
                                        value={this.state.PayrollFormDialogData.deduction}
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            if (Number(value) < 0 || isNaN(Number(value))) {
                                                return;
                                            }

                                            if (Number(value) >
                                                (Number(this.state.PayrollFormDialogData.basic) + Number(this.state.PayrollFormDialogData.bonus) + Number(this.state.PayrollFormDialogData.overtime))
                                            ) {
                                                return;
                                            }

                                            let __data: any = this.state.PayrollFormDialogData;
                                            __data.deduction = value;
                                            this.setState({
                                                PayrollFormDialogData: __data,
                                            }, () => {
                                                this.handleUpdateNetPay();
                                            });
                                        }}
                                    />
                                </Col>
                            </Row>

                            <div className={"mrg-bottom"}>
                                <input
                                    className={""}
                                    style={{background: "#fff8dd", color: "#000000", fontSize: 20, fontWeight: "bold"}}
                                    type={"text"}
                                    placeholder={"Net Pay"}
                                    value={Number(this.state.PayrollFormDialogData.net_pay).toFixed(2)}
                                    readOnly={true}
                                />
                            </div>


                            <select
                                value={this.state.PayrollFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.PayrollFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        PayrollFormDialogData: __data,
                                    });
                                }}>
                                <option value="">Select one</option>
                                <option value={"Paid"}>Paid</option>
                                <option value={"Unpaid"}>Unpaid</option>
                            </select>


                        </form>
                    </React.Fragment>
                </Dialog>
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(PayrollList);