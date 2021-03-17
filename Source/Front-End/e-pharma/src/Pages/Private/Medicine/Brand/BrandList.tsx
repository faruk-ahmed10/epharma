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
import {APP} from '../../../../App/Init/App.Init';
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import BrandTable from "../../../../Layouts/Components/Private/Brand/BrandTable";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";


class BrandList extends Component <any, any> {

    public state: any

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Brands: [],
            BrandFormDialogOpen: false,
            BrandFormDialogData: {
                EditMode: false,
                id: "",
                name: "",
                status: ""
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetBrands = this.handleGetBrands.bind(this);
        this.handleSaveBrand = this.handleSaveBrand.bind(this);
        this.handleDeleteBrand = this.handleDeleteBrand.bind(this);
        this.handleActiveBrand = this.handleActiveBrand.bind(this);
        this.handleInactiveBrand = this.handleInactiveBrand.bind(this);

    }

    private handleGetBrands(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/brands",
            {},
            {},
            (data: any) => {
                this.setState({
                    Brands: data.data,
                });
            },
            (error: any) => {
                alert("failed to loading Brands")
            }
        );
    }


    private handleSaveBrand(): void {

        if(this.state.BrandFormDialogData.name.trim() === '') {
            alert("Enter brand name!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.BrandFormDialogData.EditMode
                ? "/brand/update"
                : "/brand",
            {},
            {
                EditMode: this.state.BrandFormDialogData.EditMode,
                id: this.state.BrandFormDialogData.id,
                name: this.state.BrandFormDialogData.name,
                status: this.state.BrandFormDialogData.status,
            },
            (data: any) => {
                this.setState({BrandFormDialogOpen: false});
                this.handleGetBrands();
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


    private handleDeleteBrand(BrandId: number): void {
        if (!window.confirm("Are you sure to delete this brand?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/brand/" + BrandId,
            {},
            {},
            (data: any) => {
                this.setState({BrandFormDialogOpen: false});
                this.handleGetBrands();
                // alert("Successful!");
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    BrandFormDialogOpen: false,
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


    private handleActiveBrand(BrandId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/brand/status/active/" + BrandId,
            {},
            {},
            (data: any) => {
                this.setState({BrandFormDialogOpen: false});
                this.handleGetBrands();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    BrandFormDialogOpen: false,
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


    private handleInactiveBrand(BrandId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/brand/status/inactive/" + BrandId,
            {},
            {},
            (data: any) => {
                this.setState({BrandFormDialogOpen: false});
                this.handleGetBrands();
                // alert(data.message);
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    BrandFormDialogOpen: false,
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
        this.handleGetBrands();
    }


    render() {
        return (
            <div>


                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />

                <Breadcrumb title={"Medicine"} activeTitle={"Brand"}/>

                <div className="category__header">
                    <Button
                        label="Add Brand"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.BrandFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.status = "";
                            this.setState({
                                BrandFormDialogOpen: true,
                                BrandFormDialogData: __data,
                            });
                        }}
                    />


                    <BrandTable
                        Data={this.state.Brands}
                        onEdit={(id: number, name: string, status: string) => {
                            let __data: any = this.state.BrandFormDialogData;
                            __data.EditMode = true;
                            __data.id = id;
                            __data.name = name;
                            __data.status = status;

                            this.setState({
                                BrandFormDialogOpen: true,
                                BrandFormDialogData: __data,
                            });
                        }}
                        onDelete={this.handleDeleteBrand}
                        onInactive={this.handleInactiveBrand}
                        onActive={this.handleActiveBrand}
                    />


                    <Dialog
                        title={
                            this.state.BrandFormDialogData.EditMode ? "Edit Brand" : "Add Brand"
                        }
                        open={this.state.BrandFormDialogOpen}
                        onClose={() => this.setState({BrandFormDialogOpen: false})}
                        fullWidth={true}
                        actionBar={
                            <Button
                                label="Save"
                                className="cbtn--lg cbtn--primary"
                                onClick={this.handleSaveBrand}
                            />
                        }
                    >
                        <React.Fragment>
                            <input
                                className={"cat-dialog"}
                                type={"text"}
                                placeholder={"Name *"}
                                value={this.state.BrandFormDialogData.name}
                                onChange={(e: any) => {
                                    let __data: any = this.state.BrandFormDialogData;
                                    __data.name = e.target.value;
                                    this.setState({
                                        BrandFormDialogData: __data,
                                    });
                                }}
                            />

                            {this.state.BrandFormDialogData.id !== 0 ? (
                                <select
                                    value={this.state.BrandFormDialogData.status}
                                    onChange={(e: any) => {
                                        let __data: any = this.state.BrandFormDialogData;
                                        __data.status = e.target.value;
                                        this.setState({
                                            BrandFormDialogData: __data,
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


            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(BrandList);