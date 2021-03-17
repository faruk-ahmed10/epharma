/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from 'react';
import {APP} from '../../../../App/Init/App.Init';
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AccountCategoryTable
    from "../../../../Layouts/Components/Private/Accounting/AccountCategory/AccountCategoryTable";


class AccountCategoryList extends Component <any, any> {
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
                type: "",
            },
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetCategories = this.handleGetCategories.bind(this);
        this.handleSaveCategory = this.handleSaveCategory.bind(this);
        this.handleDeleteCategories = this.handleDeleteCategories.bind(this);
    }

    private handleGetCategories(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/account_categories",
            {},
            {},
            (data: any) => {
                this.setState({
                    Categories: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Categories!");
            }
        );
    }


    private handleSaveCategory(): void {
        if (this.state.CategoryFormDialogData.type.trim() === '') {
            alert("Enter Account Type!");
            return;
        }

        if (this.state.CategoryFormDialogData.name.trim() === '') {
            alert("Enter Category Name!");
            return;
        }


        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.CategoryFormDialogData.EditMode
                ? "/account_category/update"
                : "/account_category_store",
            {},
            {
                EditMode: this.state.CategoryFormDialogData.EditMode,
                id: this.state.CategoryFormDialogData.id,
                name: this.state.CategoryFormDialogData.name,
                type: this.state.CategoryFormDialogData.type,
                // status: this.state.CategoryFormDialogData.status,
            },
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetCategories();
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


    private handleDeleteCategories(CatId: number): void {
        if (!window.confirm("Are you sure to delete this Account Category?")) {
            return;
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "delete",
            "/account_category/" + CatId,
            {},
            {},
            (data: any) => {
                this.setState({CategoryFormDialogOpen: false});
                this.handleGetCategories();
                // alert("Successful!");
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

                <Breadcrumb title={"Accounting"} activeTitle={"Categories"}/>

                <div className="category__header">
                    <Button
                        label="Add Account Category"
                        className="cbtn--lg cbtn--green icon_padd"
                        icon={<AddIcon/>}
                        onClick={() => {
                            let __data: any = this.state.CategoryFormDialogData;
                            __data.EditMode = false;
                            __data.id = 0;
                            __data.name = "";
                            __data.type = "";
                            // __data.status = "";
                            this.setState({
                                CategoryFormDialogOpen: true,
                                CategoryFormDialogData: __data,
                            });
                        }}
                    />
                </div>

                <AccountCategoryTable
                    Data={this.state.Categories}
                    onEdit={(id: number, name: string, type: string) => {
                        let __data: any = this.state.CategoryFormDialogData;
                        __data.EditMode = true;
                        __data.id = id;
                        __data.name = name;
                        __data.type = type;

                        this.setState({
                            CategoryFormDialogOpen: true,
                            CategoryFormDialogData: __data,
                        });
                    }}
                    onDelete={this.handleDeleteCategories}
                />

                <Dialog
                    title={
                        this.state.CategoryFormDialogData.EditMode ? "Edit Account Category" : "Add Account Category"
                    }
                    open={this.state.CategoryFormDialogOpen}
                    onClose={() => this.setState({
                        CategoryFormDialogOpen: false,
                        CategoryFormDialogData: {
                            EditMode: false,
                            id: "",
                            name: "",
                            type: "",
                        }
                    })}
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


                        <div className="TwoInputField">
                            <select
                                className="mr-2"
                                value={this.state.CategoryFormDialogData.type}
                                onChange={(e: any) => {
                                    let __data: any = this.state.CategoryFormDialogData;
                                    __data.type = e.target.value;
                                    this.setState({
                                        CategoryFormDialogData: __data,
                                    });
                                }}
                                disabled={this.state.CategoryFormDialogData.EditMode}>
                                <option>Select Type *</option>
                                <option value={"Income"}>Income</option>
                                <option value={"Expense"}>Expense</option>
                            </select>

                        </div>

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


                    </React.Fragment>
                </Dialog>


            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(AccountCategoryList);