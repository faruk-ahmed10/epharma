/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from 'react';
import {APP} from '../../../App/Init/App.Init';
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {Col, Row} from "react-bootstrap";
import {Datepicker} from "../../../Layouts/Components/Global/Datepicker/Datepicker";
import AttendanceTable from "../../../Layouts/Components/Private/Attendance/AttendanceTable";


class AttendanceForm extends Component <any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,
            date: APP.FUNCTIONS.CONVERT_DATE(new Date(), "yyyy-mm-dd"),
            Attendances: [],
            Employee: [],
            HeadFormDialogOpen: false,
            HeadFormDialogData: {
                EditMode: false,
                id: "",
                employee_id: "",
                name: "",
                in_time: "",
                out_time: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };
        this.handleGetAttendance = this.handleGetAttendance.bind(this);
        this.handleSaveAttendance = this.handleSaveAttendance.bind(this);
        this.handleDeleteAttendance = this.handleDeleteAttendance.bind(this);
        this.handleGetEmployees = this.handleGetEmployees.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    private handleGetAttendance(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/attendances",
            {},
            {},
            (data: any) => {
                this.setState({
                    Attendances: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Heads!");
            }
        );
    }

    private handleGetEmployees(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/employees",
            {},
            {},
            (data: any) => {
                this.setState({
                    Employee: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Employee!");
            }
        );
    }

    private handleSaveAttendance(): void {

        if(Number(this.state.HeadFormDialogData.employee_id) === 0) {
            alert('Select employee!');
            return;
        }

        if(this.state.HeadFormDialogData.in_time === '') {
            alert('Select in-time!');
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.HeadFormDialogData.EditMode
                ? "/attendance/update"
                : "/attendance/store",
            {},
            {
                EditMode: this.state.HeadFormDialogData.EditMode,
                id: this.state.HeadFormDialogData.id,
                date: APP.FUNCTIONS.CONVERT_DATE(this.state.date, "yyyy-mm-dd"),
                employee_id: this.state.HeadFormDialogData.employee_id,
                in_time: this.state.HeadFormDialogData.in_time,
                out_time: this.state.HeadFormDialogData.out_time !== ''?  this.state.HeadFormDialogData.out_time: '',
                note: this.state.HeadFormDialogData.note,
            },
            (data: any) => {
                this.setState({HeadFormDialogOpen: false});
                this.handleGetAttendance();
                this.setState({
                    NotificationOpen: true,
                    message: "Saved Successfully!",
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

    handleChangeDate(date: any) {
        this.setState({
            date: date,
        })
    }

    private handleDeleteAttendance(AttnId: number): void {
        if (!window.confirm("Are you sure to delete this attendance?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/attendance/" + AttnId,
            {},
            {},
            (data: any) => {
                this.setState({HeadFormDialogOpen: false});
                this.handleGetAttendance();
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
        this.handleGetAttendance();
        this.handleGetEmployees();
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

                <Breadcrumb title={"HR Section"} activeTitle={"Attendance"}/>

                <div className="category__header">
                    <Button
                        label="Add Attendance"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.HeadFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.employee_id = "";
                            __data.date = "";
                            __data.in_time = "";
                            __data.out_time = "";
                            __data.note = "";
                            // __data.status = "";
                            this.setState({
                                HeadFormDialogOpen: true,
                                HeadFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <AttendanceTable
                    Data={this.state.Attendances}
                    onEdit={(id: number, date: string, employee_id: number, in_time: any, out_time: any, note: string) => {
                        let __data: any = this.state.HeadFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.employee_id = employee_id;
                        __data.in_time = in_time;
                        __data.out_time = out_time;
                        __data.note = note;

                        this.setState({
                            HeadFormDialogOpen: true,
                            date: date,
                            HeadFormDialogData: __data,
                        }, () => {
                            this.handleGetEmployees();
                        });
                    }}
                    onDelete={this.handleDeleteAttendance}
                />

                <Dialog
                    title={
                        this.state.HeadFormDialogData.EditMode ? "Edit Attendance" : "Add Attendance"
                    }
                    open={this.state.HeadFormDialogOpen}
                    onClose={() => this.setState({HeadFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveAttendance}
                        />
                    }>
                    <React.Fragment>
                        <Row>
                            <Col md={6}>
                                <Datepicker
                                    label={""}
                                    value={this.state.date}
                                    onChange={this.handleChangeDate}

                                />

                            </Col>
                            <Col md={6}>
                                <div className="TwoInputField">
                                    <select
                                        className="mr-2"
                                        value={this.state.HeadFormDialogData.employee_id}
                                        onChange={(e: any) => {
                                            let __data: any = this.state.HeadFormDialogData;
                                            __data.employee_id = e.target.value;
                                            this.setState({
                                                HeadFormDialogOpen: __data,
                                            });
                                        }}
                                        disabled={this.state.HeadFormDialogData.EditMode}>
                                        <option>Select Employee *</option>
                                        {typeof this.state.Employee !== 'undefined' && this.state.Employee.map((Cat: any, i: number) => (
                                            <option key={i} value={Cat.id}>{Cat.name}</option>
                                        ))}

                                    </select>

                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <p><b>In Time</b></p>
                                <input
                                    className={"cat-dialog"}
                                    type={"time"}
                                    value={this.state.HeadFormDialogData.in_time}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.HeadFormDialogData;
                                        __data.in_time = e.target.value;
                                        this.setState({
                                            HeadFormDialogData: __data,
                                        });
                                    }}
                                />
                            </Col>
                            <Col md={6}>
                                <p><b>Out Time</b></p>
                                <input
                                    className={"cat-dialog"}
                                    type={"time"}
                                    placeholder={"Out Time "}
                                    value={this.state.HeadFormDialogData.out_time}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.HeadFormDialogData;
                                        __data.out_time = e.target.value;
                                        this.setState({
                                            HeadFormDialogData: __data,
                                        });
                                    }}
                                />
                            </Col>
                            <Col md={12}>
                                <input
                                    className={"cat-dialog"}
                                    type={"text"}
                                    placeholder={"Enter Notes... "}
                                    value={this.state.HeadFormDialogData.note}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.HeadFormDialogData;
                                        __data.note = e.target.value;
                                        this.setState({
                                            HeadFormDialogData: __data,
                                        });
                                    }}
                                />
                            </Col>
                        </Row>


                    </React.Fragment>
                </Dialog>


            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(AttendanceForm);