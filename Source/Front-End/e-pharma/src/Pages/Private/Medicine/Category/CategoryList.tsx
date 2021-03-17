/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, {Component} from "react";
import {APP} from "../../../../App/Init/App.Init";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import CategoryTable from "../../../../Layouts/Components/Private/Category/CategoryTable";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import AddIcon from '@material-ui/icons/Add';
import "./Category.scss";

class CategoryList extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Categories: [],
            CategoryFormDialogOpen: false,
            CategoryFormDialogData: {
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

        this.handleGetCategories = this.handleGetCategories.bind(this);
        this.handleSaveCategory = this.handleSaveCategory.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
        this.handleActiveCategory = this.handleActiveCategory.bind(this);
        this.handleInactiveCategory = this.handleInactiveCategory.bind(this);
    }

    private handleGetCategories(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/categories",
            {},
            {},
            (data: any) => {
                this.setState({
                    Categories: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the categories!");
            }
        );
    }

    private handleSaveCategory(): void {
        if(this.state.CategoryFormDialogData.name.trim() === '') {
            alert("Enter category name!");
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.CategoryFormDialogData.EditMode
                ? "/category/update"
                : "/category",
            {},
            {
                EditMode: this.state.CategoryFormDialogData.EditMode,
                id: this.state.CategoryFormDialogData.id,
                name: this.state.CategoryFormDialogData.name,
                status: this.state.CategoryFormDialogData.status,
            },
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetCategories();
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

    private handleDeleteCategory(CatId: number): void {
        if (!window.confirm("Are you sure to delete this category?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/category/" + CatId,
            {},
            {},
            (data: any) => {
                this.handleGetCategories();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    CategoryFormDialogOpen: false,
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

    private handleActiveCategory(CatId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/category/status/active/" + CatId,
            {},
            {},
            (data: any) => {
                this.handleGetCategories();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    CategoryFormDialogOpen: false,
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

    private handleInactiveCategory(CatId: number): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/category/status/inactive/" + CatId,
            {},
            {},
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetCategories();
                this.setState({
                    NotificationOpen: true,
                    message: data.message,
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                    CategoryFormDialogOpen: false,
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
        this.handleGetCategories();
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

                <Breadcrumb title={"Medicine"} activeTitle={"Category"}/>

                <div className="category__header">
                    <Button
                        label="Add Category"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.CategoryFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.status = "";
                            this.setState({
                                CategoryFormDialogOpen: true,
                                CategoryFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <CategoryTable
                    Data={this.state.Categories}
                    onEdit={(id: number, name: string, status: string) => {
                        let __data: any = this.state.CategoryFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.status = status;

                        this.setState({
                            CategoryFormDialogOpen: true,
                            CategoryFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteCategory}
                    onInactive={this.handleInactiveCategory}
                    onActive={this.handleActiveCategory}
                />

                <Dialog
                    title={
                        this.state.CategoryFormDialogData.EditMode
                            ? "Edit Category"
                            : "Add Category"
                    }
                    open={this.state.CategoryFormDialogOpen}
                    onClose={() => this.setState({CategoryFormDialogOpen: false})}
                    fullWidth={true}
                    actionBar={
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={this.handleSaveCategory}
                        />
                    }
                >
                    <React.Fragment>
                        <input
                            className={"cat-dialog"}
                            type={"text"}
                            placeholder={"Name *"}
                            value={this.state.CategoryFormDialogData.name}
                            onChange={(e: any) => {
                                let __data: any = this.state.CategoryFormDialogData;
                                __data.name = e.target.value;
                                this.setState({
                                    CategoryFormDialogData: __data,
                                });
                            }}
                        />

                        {this.state.CategoryFormDialogData.id !== 0 ? (
                            <select
                                value={this.state.CategoryFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.CategoryFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        CategoryFormDialogData: __data,
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
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(CategoryList);
