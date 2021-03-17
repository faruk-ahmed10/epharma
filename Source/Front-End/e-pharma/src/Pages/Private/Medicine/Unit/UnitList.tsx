/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, {Component} from 'react';
import UnitTable from "../../../../Layouts/Components/Private/Unit/UnitTable";
import {APP} from "../../../../App/Init/App.Init";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import "./Unit.scss";


class UnitList extends Component <any, any> {

    public state: any

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Units: [],
            UnitFormDialogOpen: false,
            UnitFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                status: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetUnits = this.handleGetUnits.bind(this);
        this.handleSaveUnit = this.handleSaveUnit.bind(this);
        this.handleDeleteUnit = this.handleDeleteUnit.bind(this);
        this.handleActiveUnit = this.handleActiveUnit.bind(this);
        this.handleInactiveUnit = this.handleInactiveUnit.bind(this);
    }

    private handleGetUnits(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/units",
            {},
            {},
            (data: any) => {
                this.setState({
                    Units: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Units!");
            }
        );
    }


    private handleSaveUnit(): void {
        if(this.state.UnitFormDialogData.name.trim() === '') {
            alert("Enter unit name!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.UnitFormDialogData.EditMode
                ? "/unit/update"
                : "/unit",
            {},
            {
                EditMode: this.state.UnitFormDialogData.EditMode,
                id: this.state.UnitFormDialogData.id,
                name: this.state.UnitFormDialogData.name,
                status: this.state.UnitFormDialogData.status,
            },
            (data: any) => {
                this.setState({UnitFormDialogOpen: false});
                this.handleGetUnits();
                // alert("Successful!");
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


    private handleDeleteUnit(UnitId: number): void {
        if (!window.confirm("Are you sure to delete this unit?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/unit/" + UnitId,
            {},
            {},
            (data: any) => {
                this.setState({UnitFormDialogOpen: false});
                this.handleGetUnits();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    UnitFormDialogOpen: false,
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

    private handleActiveUnit(UnitId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/unit/status/active/" + UnitId,
            {},
            {},
            (data: any) => {
                this.setState({UnitFormDialogOpen: false});
                this.handleGetUnits();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    UnitFormDialogOpen: false,
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


    private handleInactiveUnit(UnitId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/unit/status/inactive/" + UnitId,
            {},
            {},
            (data: any) => {
                this.setState({UnitFormDialogOpen: false});
                this.handleGetUnits();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    UnitFormDialogOpen: false,
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
        this.handleGetUnits();
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

                <Breadcrumb title={"Medicine"} activeTitle={"Unit"}/>

                <div className="category__header">
                    <Button
                        label="Add Unit"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.UnitFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.status = "";
                            this.setState({
                                UnitFormDialogOpen: true,
                                UnitFormDialogData: __data,
                            });
                        }}
                    />
                </div>


                <UnitTable
                    Data={this.state.Units}
                    onEdit={(id: number, name: string, status: string) => {
                        let __data: any = this.state.UnitFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.status = status;

                        this.setState({
                            UnitFormDialogOpen: true,
                            UnitFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteUnit}
                    onInactive={this.handleInactiveUnit}
                    onActive={this.handleActiveUnit}
                />


                <Dialog
                    title={
                        this.state.UnitFormDialogData.EditMode ? "Edit Unit" : "Add Unit"
                    }
                    open={this.state.UnitFormDialogOpen}
                    onClose={() => this.setState({UnitFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveUnit}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Name *"}
                            value={this.state.UnitFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.UnitFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    UnitFormDialogData: __data,
                                });
                            }}
                        />

                        {this.state.UnitFormDialogData.id !== 0 ? (
                            <select
                                value={this.state.UnitFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.UnitFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        UnitFormDialogData: __data,
                                    });
                                }}
                            >
                                <option value={"Active"}>Active</option>
                                <option value={"Inactive"}>Inactive</option>
                            </select>
                        ) : (
                            ""
                        )}
                    </React.Fragment>
                </Dialog>
            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(UnitList);