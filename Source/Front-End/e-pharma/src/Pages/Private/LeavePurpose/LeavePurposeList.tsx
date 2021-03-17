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
import LeavePurposeTable from "../../../Layouts/Components/Private/LeavePurpose/LeavePurposeTable";
import Breadcrumb from "../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../Layouts/Components/Global/Notification/Notification";
import "./LeavePurpose.scss";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


class LeavePurposeList extends Component <any, any> {


    public state: any

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            LeavePurposes: [],
            LeavePurposeFormDialogOpen: false,
            LeavePurposeFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetLeavePurposes = this.handleGetLeavePurposes.bind(this);
        this.handleSaveLeavePurpose = this.handleSaveLeavePurpose.bind(this);
        this.handleDeleteLeavePurpose = this.handleDeleteLeavePurpose.bind(this);
    }

    private handleGetLeavePurposes(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/leave_purposes",
            {},
            {},
            (data: any) => {
                this.setState({
                    LeavePurposes: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Leave Purposes!");
            }
        );
    }


    private handleSaveLeavePurpose(): void {

        if (this.state.LeavePurposeFormDialogData.name.trim() === '') {
            alert("Enter type name!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.LeavePurposeFormDialogData.EditMode
                ? "/leave_purpose/update"
                : "/leave_purpose",
            {},
            {
                EditMode: this.state.LeavePurposeFormDialogData.EditMode,
                id: this.state.LeavePurposeFormDialogData.id,
                name: this.state.LeavePurposeFormDialogData.name,
            },
            (data: any) => {
                this.setState({LeavePurposeFormDialogOpen: false});
                this.handleGetLeavePurposes();
                this.setState({
                    NotificationOpen: true,
                    message: "Data Successfully Added!",
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


    private handleDeleteLeavePurpose(LeavePurposeId: number): void {
        if (!window.confirm("Are you sure to delete this Leave Purpose?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/leave_purpose/" + LeavePurposeId,
            {},
            {},
            (data: any) => {
                this.setState({LeavePurposeFormDialogOpen: false});
                this.handleGetLeavePurposes();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    LeavePurposeFormDialogOpen: false,
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
        this.handleGetLeavePurposes();
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

                <Breadcrumb title={"HR"} activeTitle={"Leave Purpose"}/>

                <div className="category__header">
                    <Button
                        label="Add Leave Purpose"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.LeavePurposeFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            // __data.status = "";
                            this.setState({
                                LeavePurposeFormDialogOpen: true,
                                LeavePurposeFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <LeavePurposeTable
                    Data={this.state.LeavePurposes}
                    onEdit={(id: number, name: string) => {
                        let __data: any = this.state.LeavePurposeFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;

                        this.setState({
                            LeavePurposeFormDialogOpen: true,
                            LeavePurposeFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteLeavePurpose}
                />

                <Dialog
                    title={
                        this.state.LeavePurposeFormDialogData.EditMode ? "Edit Leave Purpose" : "Add Leave Purpose"
                    }
                    open={this.state.LeavePurposeFormDialogOpen}
                    onClose={() => this.setState({LeavePurposeFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveLeavePurpose}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Leave Purpose Name *"}
                            value={this.state.LeavePurposeFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.LeavePurposeFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    LeavePurposeFormDialogData: __data,
                                });
                            }}
                        />

                    </React.Fragment>
                </Dialog>


            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(LeavePurposeList);