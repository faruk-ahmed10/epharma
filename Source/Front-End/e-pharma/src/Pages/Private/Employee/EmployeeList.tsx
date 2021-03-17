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
import {Datepicker} from "../../../Layouts/Components/Global/Datepicker/Datepicker";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import EmployeeTable from "../../../Layouts/Components/Private/Employee/EmployeeTable";

class EmployeeList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);
        this.state = {
            DialogOpen: false,

            UserRoles: [],
            Employees: [],
            message: "",
            msgClass: "",
            icon: {},
            EmployeeFormDialogOpen: false,
            EmployeeFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                email: "",
                password: "",
                phone: "",
                gender: "",
                address: "",
                image: "",
                nid: "",
                joining_date: "",
                role_id: "",
                salary: "",
                status: "",
            },

            __tmpImgSrc: "",
            __tmpImgSrc1: "",

            NotificationOpen: false,
            Loading: false,
        };

        this.handleGetEmployee = this.handleGetEmployee.bind(this);
        this.handleSaveEmployee = this.handleSaveEmployee.bind(this);
        this.handleActiveEmployee = this.handleActiveEmployee.bind(this);
        this.handleInactiveEmployee = this.handleInactiveEmployee.bind(this);
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
        this.handleGetUserRoles = this.handleGetUserRoles.bind(this);
    }

    private handleGetUserRoles(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/user_roles/all",
            {},
            {},
            (data: any) => {
                this.setState({
                    UserRoles: data.data,
                });
            },
            (error: any) => {
                alert("Failed");
            }
        );
    }

    //Employee  List
    private handleGetEmployee(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/employees",
            {},
            {},
            (data: any) => {
                this.setState({
                    Employees: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the categories!");
            }
        );
    }

    //Customer Save
    private handleSaveEmployee(): void {

        if (this.state.EmployeeFormDialogData.name.trim() === '') {
            alert("Enter Employee name!");
            return;
        }

        if (this.state.EmployeeFormDialogData.phone.trim() === '') {
            alert("Enter Phone Number!");
            return;
        }

        if (this.state.EmployeeFormDialogData.email.trim() === '') {
            alert("Enter email address!");
            return;
        }

        if (Number(this.state.EmployeeFormDialogData.id === 0) && this.state.EmployeeFormDialogData.password === '') {
            alert("Enter password!");
            return;
        }

        if (this.state.EmployeeFormDialogData.joining_date.trim() === '') {
            alert("Select Join Date!");
            return;
        }

        if (this.state.EmployeeFormDialogData.gender === '') {
            alert("Select gender!");
            return;
        }

        if (Number(this.state.EmployeeFormDialogData.role_id) === 0) {
            alert("Select Role!");
            return;
        }

        if (this.state.EmployeeFormDialogData.status === '') {
            alert("Select status!");
            return;
        }

        this.setState({
            Loading: true,
        });

        const __data: any = {
            EditMode: this.state.EmployeeFormDialogData.EditMode,
            id: this.state.EmployeeFormDialogData.id,
            name: this.state.EmployeeFormDialogData.name,
            phone: this.state.EmployeeFormDialogData.phone,
            email: this.state.EmployeeFormDialogData.email,
            password: this.state.EmployeeFormDialogData.password,
            gender: this.state.EmployeeFormDialogData.gender,
            image: this.state.EmployeeFormDialogData.image,
            status: this.state.EmployeeFormDialogData.status,
            nid: this.state.EmployeeFormDialogData.nid,
            joining_date: this.state.EmployeeFormDialogData.joining_date,
            salary: this.state.EmployeeFormDialogData.salary,
            role_id: this.state.EmployeeFormDialogData.role_id,
            address: this.state.EmployeeFormDialogData.address,
        };

        const formData: any = new FormData();
        for (let key in __data) {
            formData.append(key, __data[key]);
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/employee",
            {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            },
            formData,
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetEmployee();
                this.setState({
                    NotificationOpen: true,
                    message: "Data Successfully Added!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    Loading: false,
                    EmployeeFormDialogOpen: false,
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
                    __tmpImgSrc: "",
                    __tmpImgSrc1: "",
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    private handleActiveEmployee(CatId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/employee/status/active/" + CatId,
            {},
            {},
            (data: any) => {
                this.handleGetEmployee();
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

    private handleInactiveEmployee(CatId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/employee/status/inactive/" + CatId,
            {},
            {},
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetEmployee();
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

    private handleDeleteEmployee(CatId: number): void {
        if (!window.confirm('Are you sure?')) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/employee/" + CatId,
            {},
            {},
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetEmployee();
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
        this.handleGetEmployee();
        this.handleGetUserRoles();
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
                <Breadcrumb title={"HR"} activeTitle={"Employee"}/>
                <div className="category__header">
                    <Button
                        label="Add Employee"
                        className="cbtn--lg cbtn--primary"
                        icon={<ControlPointIcon/>}
                        onClick={() => {
                            let __data: any = this.state.EmployeeFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.phone = "";
                            __data.email = "";
                            __data.salary = "";
                            __data.joining_date = "";
                            __data.gender = "";
                            __data.role = "";
                            __data.image = "";
                            __data.nid = "";
                            __data.status = "";
                            __data.address = "";

                            this.setState({
                                EmployeeFormDialogOpen: true,
                                EmployeeFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <EmployeeTable
                    onEdit={(
                        id: number,
                        name: string,
                        phone: string,
                        email: string,
                        salary: string,
                        joining_date: string,
                        gender: string,
                        role_id: number,
                        image: string,
                        nid: string,
                        status: string,
                        address: string
                    ) => {
                        let __data: any = this.state.EmployeeFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.phone = phone;
                        __data.email = email;
                        __data.salary = salary;
                        __data.joining_date = joining_date;
                        __data.gender = gender;
                        __data.role_id = role_id;
                        __data.image = image;
                        __data.nid = nid;
                        __data.status = status;
                        __data.address = address;
                        this.setState({
                            EmployeeFormDialogOpen: true,
                            EmployeeFormDialogData: __data,
                            __tmpImgSrc: APP.CONFIG.API_CONFIG.CDN_ROOT + "/" + image,
                            __tmpImgSrc1: APP.CONFIG.API_CONFIG.CDN_ROOT + "/" + nid,
                        });
                    }}
                    Data={this.state.Employees}
                    onInactive={this.handleInactiveEmployee}
                    onActive={this.handleActiveEmployee}
                    onDelete={this.handleDeleteEmployee}
                />

                <Dialog
                    title={
                        this.state.EmployeeFormDialogData.EditMode
                            ? "Edit Employee"
                            : "Add Employee"
                    }
                    open={this.state.EmployeeFormDialogOpen}
                    onClose={() => this.setState({EmployeeFormDialogOpen: false})}
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
                                onClick={this.handleSaveEmployee}
                            />
                        )
                    }
                >
                    <React.Fragment>
                        <form encType="multipart/form-data">
                            <div className="TwoInputField">
                                <input
                                    type={"text"}
                                    placeholder={"Employee Name *"}
                                    className="mr-2"
                                    value={this.state.EmployeeFormDialogData.name}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.EmployeeFormDialogData;
                                        __data.name = e.target.value;
                                        this.setState({
                                            EmployeeFormDialogData: __data,
                                        });
                                    }}
                                />
                                <input
                                    type={"text"}
                                    placeholder={"Employee Phone *"}
                                    value={this.state.EmployeeFormDialogData.phone}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.EmployeeFormDialogData;
                                        __data.phone = e.target.value;
                                        this.setState({
                                            EmployeeFormDialogData: __data,
                                        });
                                    }}
                                />
                            </div>
                            <input
                                type={"text"}
                                placeholder={"Employee email"}
                                value={this.state.EmployeeFormDialogData.email}
                                onChange={(e: any) => {
                                    let __data: any = this.state.EmployeeFormDialogData;
                                    __data.email = e.target.value;
                                    this.setState({
                                        EmployeeFormDialogData: __data,
                                    });
                                }}
                            />

                            <input
                                type={"password"}
                                placeholder={"Employee password"}
                                value={this.state.EmployeeFormDialogData.password}
                                onChange={(e: any) => {
                                    let __data: any = this.state.EmployeeFormDialogData;
                                    __data.password = e.target.value;
                                    this.setState({
                                        EmployeeFormDialogData: __data,
                                    });
                                }}
                            />

                            <div className="TwoInputField">
                                <input
                                    className="mr-2"
                                    type={"text"}
                                    placeholder={"Employee Salary"}
                                    value={this.state.EmployeeFormDialogData.salary}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.EmployeeFormDialogData;
                                        __data.salary = e.target.value;
                                        this.setState({
                                            EmployeeFormDialogData: __data,
                                        });
                                    }}
                                />
                                <Datepicker
                                    label={"Joining Date *"}
                                    value={APP.FUNCTIONS.CONVERT_DATE(
                                        this.state.EmployeeFormDialogData.joining_date,
                                        "yyyy-mm-dd"
                                    )}
                                    onChange={(date: any) =>
                                        this.setState((prevState: any) => ({
                                            EmployeeFormDialogData: {
                                                ...prevState.EmployeeFormDialogData,
                                                joining_date: APP.FUNCTIONS.CONVERT_DATE(
                                                    date,
                                                    "yyyy-mm-dd"
                                                ),
                                            },
                                        }))
                                    }
                                />
                            </div>

                            <div className="TwoInputField">
                                <select
                                    className="mr-2"
                                    value={this.state.EmployeeFormDialogData.gender}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.EmployeeFormDialogData;
                                        __data.gender = e.target.value;
                                        this.setState({
                                            EmployeeFormDialogData: __data,
                                        });
                                    }}
                                >
                                    <option value="">-- Select Gender --</option>
                                    <option value={"Male"}>Male</option>
                                    <option value={"Female"}>Female</option>
                                    <option value={"Other"}>Other</option>
                                </select>

                                <select
                                    className="mr-2"
                                    value={this.state.EmployeeFormDialogData.role_id}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.EmployeeFormDialogData;
                                        __data.role_id = e.target.value;
                                        this.setState({
                                            EmployeeFormDialogData: __data,
                                        });
                                    }}
                                >
                                    <option value="">-- Select Role *</option>
                                    {this.state.UserRoles.map((UserRole: any, index: number) => (
                                        <option value={UserRole.id}>{UserRole.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="TwoInputField">
                                <div className="Image-file mr-2">
                                    <label htmlFor="image">Profile Image</label>
                                    <input
                                        type={"file"}
                                        onChange={(e: any) => {
                                            let __data: any = this.state.EmployeeFormDialogData;
                                            let file: any = e.target.files[0];
                                            __data.image = file;

                                            const url: any = URL.createObjectURL(file);

                                            this.setState({
                                                CategoryFormDialogData: __data,
                                                __tmpImgSrc: url,
                                            });
                                        }}
                                    />
                                    <img
                                        style={{width: "100px"}}
                                        src={this.state.__tmpImgSrc}
                                        alt=""
                                    />
                                </div>

                                <div className="Image-file">
                                    <label htmlFor="medicine_name">NID</label>
                                    <input
                                        type={"text"}
                                        placeholder={"NID Card Number"}
                                        value={this.state.EmployeeFormDialogData.nid}
                                        onChange={(e: any) => {
                                            let __data: any = this.state.EmployeeFormDialogData;
                                            __data.nid = e.target.value;
                                            this.setState({
                                                EmployeeFormDialogData: __data,
                                            });
                                        }}
                                    />
                                    <img
                                        style={{width: "100px"}}
                                        src={this.state.__tmpImgSrc1}
                                        alt=""
                                    />
                                </div>
                            </div>

                            <select
                                className="mr-2 mb-4"
                                value={this.state.EmployeeFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.EmployeeFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        EmployeeFormDialogData: __data,
                                    });
                                }}>
                                <option value="">-- Select Status --</option>
                                <option value={"Active"}>Active</option>
                                <option value={"Banned"}>Banned</option>
                            </select>

                            <textarea
                                placeholder="Employee Address"
                                value={this.state.EmployeeFormDialogData.address}
                                onChange={(e: any) => {
                                    let __data: any = this.state.EmployeeFormDialogData;
                                    __data.address = e.target.value;
                                    this.setState({
                                        EmployeeFormDialogData: __data,
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

export default APP.SERVICES.CORE.ROUTER.withRouter(EmployeeList);
