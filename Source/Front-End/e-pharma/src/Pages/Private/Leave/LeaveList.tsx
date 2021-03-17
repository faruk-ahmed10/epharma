/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, {Component} from "react";
import {APP} from "../../../App/Init/App.Init";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import LeaveTable from "../../../Layouts/Components/Private/Leave/LeaveTable";
import {Datepicker} from "../../../Layouts/Components/Global/Datepicker/Datepicker";
import "./LeaveList.scss";

class LeaveList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            LeavePurposeList: [],
            EmployeeList: [],
            PharmacyList: [],

            message: "",
            msgClass: "",
            icon: {},
            Leaves: [],
            LeaveFormDialogOpen: false,
            LeaveFormDialogData: {
                EditMode: false,
                id: "",
                employee_id: "",
                leave_purpose_id: "",
                pharmacy_id: "",
                start_date: "",
                end_date: "",
                note: "",
            },

            __tmpImgSrc: "",

            NotificationOpen: false,
            Loading: false,
        };

        this.handleGetLeaves = this.handleGetLeaves.bind(this);
        this.handleSaveLeave = this.handleSaveLeave.bind(this);
        this.handleDeleteLeave = this.handleDeleteLeave.bind(this);
        this.handleGetLeavePurposeList = this.handleGetLeavePurposeList.bind(this);
        this.handleGetEmployeeList = this.handleGetEmployeeList.bind(this);
        this.handleGetPharmacyList = this.handleGetPharmacyList.bind(this);
    }

    //LeaveList  List
    private handleGetLeaves(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/leaves",
            {},
            {},
            (data: any) => {

                this.setState({
                    Leaves: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Leaves!");
            }
        );
    }

    //LeaveList Save
    private handleSaveLeave(): void {

        if (Number(this.state.LeaveFormDialogData.employee_id) === 0) {
            alert("Select Employee!");
            return;
        }

        if (Number(this.state.LeaveFormDialogData.leave_purpose_id) === 0) {
            alert("Select Purpose!");
            return;
        }

        if (this.state.LeaveFormDialogData.start_date.trim() === '') {
            alert("Select Start Date!");
            return;
        }

        this.setState({
            Loading: true,
        });
        const __data: any = {
            EditMode: this.state.LeaveFormDialogData.EditMode,
            id: this.state.LeaveFormDialogData.id,
            employee_id: this.state.LeaveFormDialogData.employee_id,
            leave_purpose_id: this.state.LeaveFormDialogData.leave_purpose_id,
            pharmacy_id: this.state.LeaveFormDialogData.pharmacy_id,
            start_date: this.state.LeaveFormDialogData.start_date,
            end_date: this.state.LeaveFormDialogData.end_date,
            note: this.state.LeaveFormDialogData.note,

        };

        APP.SERVICES.HTTP_REQUEST.send(
            "post", "/leave",
            {},
            __data,
            (data: any) => {
                this.setState({LeaveFormDialogOpen: false});
                this.handleGetLeaves();
                this.setState({
                    Loading: false,
                    NotificationOpen: true,
                    message: "Data Successfully Added!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    LeaveFormDialogOpen: false,
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


    private handleDeleteLeave(LeaveId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/leave/" + LeaveId,
            {},
            {},
            (data: any) => {
                this.setState({LeaveFormDialogData: false});
                this.handleGetLeaves();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    LeaveFormDialogData: false,
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
                    LeaveFormDialogData: false,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    //LeaveList  List
    private handleGetLeavePurposeList(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/leave_purposes",
            {},
            {},
            (data: any) => {
                // console.log(data);
                this.setState({
                    LeavePurposeList: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Leaves!");
            }
        );

    }

    //Employee List
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

    //Pharmacy List
    private handleGetPharmacyList(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/pharmacies",
            {},
            {},
            (data: any) => {
                this.setState({
                    PharmacyList: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Pharmacy List!");
            }
        );
    }

    public componentDidMount(): void {
        this.handleGetLeaves();
        this.handleGetLeavePurposeList();
        this.handleGetEmployeeList();
        this.handleGetPharmacyList();
    }

    public render(): React.ReactNode {

        // console.log(this.state.LeavePurposeList);
        return (
            <>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />
                <Breadcrumb title={"HR"} activeTitle={"Leave"}/>
                <div className="category__header">
                    <Button
                        label="Add Leave"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            let __data: any = this.state.LeaveFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.employee_id = "";
                            __data.leave_purpose_id = "";
                            __data.pharmacy_id = "";
                            __data.start_date = "";
                            __data.end_date = "";
                            __data.note = "";


                            this.setState({
                                LeaveFormDialogOpen: true,
                                LeaveFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <LeaveTable
                    Leaves={this.state.Leaves}
                    onEdit={(
                        id: number,
                        employee_id: number,
                        leave_purpose_id: number,
                        start_date: string,
                        end_date: string,
                        note: Text,
                    ) => {
                        let __data: any = this.state.LeaveFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.employee_id = employee_id;
                        __data.leave_purpose_id = leave_purpose_id;
                        __data.start_date = start_date;
                        __data.end_date = end_date;
                        __data.note = note;
                        this.setState({
                            LeaveFormDialogOpen: true,
                            LeaveFormDialogData: __data,
                        });

                    }}

                    Data={this.state.Leaves}
                    onDelete={this.handleDeleteLeave}
                />

                <Dialog
                    title={
                        this.state.LeaveFormDialogData.EditMode
                            ? "Edit Leave"
                            : "Add Leave"
                    }
                    open={this.state.LeaveFormDialogOpen}
                    onClose={() => this.setState({LeaveFormDialogOpen: false})}
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
                                onClick={this.handleSaveLeave}
                            />
                        )
                    }
                >
                    <React.Fragment>
                        <form encType="multipart/form-data">

                            <div className="TwoInputField">
                                <select
                                    className="mr-2 mb-4"
                                    value={this.state.LeaveFormDialogData.employee_id}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.LeaveFormDialogData;
                                        __data.employee_id = e.target.value;
                                        this.setState({
                                            LeaveFormDialogData: __data,
                                        });
                                    }}
                                >
                                    <option value="">Select Employee *</option>

                                    {typeof this.state.EmployeeList !== "undefined" &&
                                    this.state.EmployeeList.map((data: any, index: number) => (
                                        <option value={data.id} key={index}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="TwoInputField">
                                <select
                                    className="mr-2 mb-4"
                                    value={this.state.LeaveFormDialogData.leave_purpose_id}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.LeaveFormDialogData;
                                        __data.leave_purpose_id = e.target.value;
                                        this.setState({
                                            LeaveFormDialogData: __data,
                                        });
                                    }}
                                >
                                    <option value="">Select Leave Purpose *</option>

                                    {typeof this.state.LeavePurposeList !== "undefined" &&
                                    this.state.LeavePurposeList.map((data: any, index: number) => (
                                        <option value={data.id} key={index}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="row mrgin">
                                <div className="col-md-6">
                                    <Datepicker
                                        label={"Start Date *"}
                                        value={APP.FUNCTIONS.CONVERT_DATE(
                                            this.state.LeaveFormDialogData.start_date,
                                            "yyyy-mm-dd"
                                        )}
                                        onChange={(date: any) =>
                                            this.setState((prevState: any) => ({
                                                LeaveFormDialogData: {
                                                    ...prevState.LeaveFormDialogData,
                                                    start_date: APP.FUNCTIONS.CONVERT_DATE(
                                                        date,
                                                        "yyyy-mm-dd"
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Datepicker
                                        label={"End Date"}
                                        value={APP.FUNCTIONS.CONVERT_DATE(
                                            this.state.LeaveFormDialogData.end_date,
                                            "yyyy-mm-dd"
                                        )}
                                        onChange={(date: any) =>
                                            this.setState((prevState: any) => ({
                                                LeaveFormDialogData: {
                                                    ...prevState.LeaveFormDialogData,
                                                    end_date: APP.FUNCTIONS.CONVERT_DATE(
                                                        date,
                                                        "yyyy-mm-dd"
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>


                            <textarea
                                value={this.state.LeaveFormDialogData.note}
                                placeholder={"Note"}
                                onChange={(e: any) => {
                                    let __data: any = this.state.LeaveFormDialogData;
                                    __data.note = e.target.value;
                                    this.setState({
                                        LeaveFormDialogData: __data,
                                    });
                                }}
                            />
                        </form>
                    </React.Fragment>
                </Dialog>
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(LeaveList);