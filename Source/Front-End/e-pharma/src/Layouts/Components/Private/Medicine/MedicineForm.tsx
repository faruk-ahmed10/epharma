/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {APP} from "../../../../App/Init/App.Init";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import {Datepicker} from "../../Global/Datepicker/Datepicker";
import "./Medicine.scss";

class MedicineForm extends Component<any, any> {
    public state: any;
    private readonly medicine_id: string | number | undefined | null;

    public constructor(props: any) {
        super(props);

        this.medicine_id = this.props.match.params.id;

        this.state = {
            Medicines: [],
            Categories: [],
            Manufacturers: [],
            Units: [],
            Vats: [],
            Medicine: [],
            MedicineFormDialogOpen: false,
            EditMode: Number(this.medicine_id) > 0,
            MedicineFormDialogData: {
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
            Loading: false,
            anOtherCreate: false,
            redirect: null,
            __tmpImgSrc: "",
        };

        this.handleSaveMedicine = this.handleSaveMedicine.bind(this);
        this.handlGetSingleMedicine = this.handlGetSingleMedicine.bind(this);
        this.handleGetCategory = this.handleGetCategory.bind(this);
        this.handleGetBrand = this.handleGetBrand.bind(this);
        this.handleGetUnit = this.handleGetUnit.bind(this);
        this.handleGetVat = this.handleGetVat.bind(this);
    }

    private handleSaveMedicine(): void {
        if (this.state.MedicineFormDialogData.medicine_name.trim() === '') {
            alert("Enter Medicine name!");
            return;
        }
        if (this.state.MedicineFormDialogData.generic_name.trim() === '') {
            alert("Enter Generic name!");
            return;
        }

        if (Number(this.state.MedicineFormDialogData.category_id) === 0) {
            alert("Select Category!");
            return;
        }

        if (Number(this.state.MedicineFormDialogData.brand_id) === 0) {
            alert("Select Brand!");
            return;
        }

        if (this.state.MedicineFormDialogData.expire_date.trim() === '') {
            alert("Select Valid Date!");
            return;
        }

        if (Number(this.state.MedicineFormDialogData.purchase_price) === 0) {
            alert("Enter Purchase Price");
            return;
        }
        if (Number(this.state.MedicineFormDialogData.sales_price) === 0) {
            alert("Enter Sell Price");
            return;
        }
        if (Number(this.state.MedicineFormDialogData.box_size) === 0) {
            alert("Enter Box Size");
            return;
        }
        if (Number(this.state.MedicineFormDialogData.total_box) === 0) {
            alert("Enter Total Box!");
            return;
        }
        if (this.state.MedicineFormDialogData.strength.trim() === '') {
            alert("Enter Strength!");
            return;
        }

        this.setState({Loading: true});

        const __data: any = {
            id: this.medicine_id,
            medicine_name: this.state.MedicineFormDialogData.medicine_name,
            generic_name: this.state.MedicineFormDialogData.generic_name,
            strength: this.state.MedicineFormDialogData.strength,
            category_id: this.state.MedicineFormDialogData.category_id,
            brand_id: this.state.MedicineFormDialogData.brand_id,
            manufacturer_id: this.state.MedicineFormDialogData.manufacturer_id,
            vat_id: this.state.MedicineFormDialogData.vat_id,
            unit_id: this.state.MedicineFormDialogData.unit_id,
            purchase_price: this.state.MedicineFormDialogData.purchase_price,
            sales_price: this.state.MedicineFormDialogData.sales_price,
            box_size: this.state.MedicineFormDialogData.box_size,
            total_box: this.state.MedicineFormDialogData.total_box,
            expire_date: this.state.MedicineFormDialogData.expire_date,
            shelf_number: this.state.MedicineFormDialogData.shelf_number,
            medicine_details: this.state.MedicineFormDialogData.medicine_details,
            image: this.state.MedicineFormDialogData.image,
            status: this.state.MedicineFormDialogData.status,
        };

        const formData: any = new FormData();
        for (let key in __data) {
            formData.append(key, __data[key]);
        }
        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            this.state.EditMode ? "/medicine/update" : "/medicine",
            {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            },
            formData,
            (data: any) => {
                let __data: any = this.state.MedicineFormDialogData;

                __data.id = "";
                __data.medicine_name = "";
                __data.generic_name = "";
                __data.strength = "";
                __data.category_id = "";
                __data.brand_id = "";
                __data.vat_id = "";
                __data.unit_id = "";
                __data.purchase_price = "";
                __data.sales_price = "";
                __data.box_size = "";
                __data.total_box = "";
                __data.shelf_number = "";
                __data.image = "";
                __data.expire_date = "";
                __data.medicine_details = "";
                __data.status = "";

                this.state.anOtherCreate
                    ? this.setState({
                        NotificationOpen: true,
                        message: "Data Successfully Added!",
                        msgClass: "success",
                        icon: <CheckBoxIcon/>,
                        Loading: false,
                        MedicineFormDialogData: __data,
                        __tmpImgSrc: "",
                    })
                    : this.setState({
                        NotificationOpen: true,
                        message: "Data Successfully Added!",
                        msgClass: "success",
                        icon: <CheckBoxIcon/>,
                        Loading: false,
                        redirect: APP.ROUTES.PRIVATE.MEDICINES,
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
                    CustomerFormDialogOpne: false,
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

    private handlGetSingleMedicine(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/medicine/" + this.medicine_id,
            {},
            {},
            (data: any) => {
                console.log(data);

                this.setState({
                    MedicineFormDialogData: {
                        id: data.data.id,
                        medicine_name: data.data.medicine_name,
                        generic_name: data.data.generic_name,
                        strength: data.data.strength,
                        category_id: data.data.category_id,
                        brand_id: data.data.brand_id,
                        manufacturer_id: data.data.manufacturer_id,
                        vat_id: data.data.vat_id,
                        unit_id: data.data.unit_id,
                        purchase_price: data.data.purchase_price,
                        sales_price: data.data.sales_price,
                        box_size: data.data.box_size,
                        shelf_number: data.data.shelf_number,
                        total_box: data.data.total_box,
                        image: data.data.image,
                        expire_date: data.data.expire_date,
                        medicine_details: data.data.medicine_details,
                        status: data.data.status,
                    },
                    __tmpImgSrc: APP.CONFIG.API_CONFIG.CDN_ROOT + "/" + data.data.image,
                });

                this.setState({
                    Medicine: data.data,
                });
                console.log(this.state.Medicine);
            },
            (error: any) => {
                //alert("Failed to load the categories!");
            }
        );
    }

    //Customer  List
    private handleGetCategory(): void {
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

    private handleGetBrand(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/brands",
            {},
            {},
            (data: any) => {
                this.setState({
                    Manufacturers: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the categories!");
            }
        );
    }

    private handleGetUnit(): void {
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
                alert("Failed to load the categories!");
            }
        );
    }

    private handleGetVat(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/taxes",
            {},
            {},
            (data: any) => {
                this.setState({
                    Vats: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the categories!");
            }
        );
    }

    public componentDidMount(): void {
        this.handleGetCategory();
        this.handleGetBrand();
        this.handleGetUnit();
        this.handleGetVat();
        this.handlGetSingleMedicine();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }

        // console.log(this.state.MedicineFormDialogData.EditMode);
        return (
            <>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />
                <Breadcrumb title={"Medicine"} activeTitle={"Medicine Add"}/>

                <div className="category__header">
                    <Link
                        to={APP.ROUTES.PRIVATE.MEDICINES}
                        className={"cbtn cbtn--lg cbtn--primary mr-10"}
                    >
                        <AddIcon/> Medicine Manage
                    </Link>
                </div>

                <div className="cFrm">
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="medicine_name">
                                Medicine Name<span className="Require">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={"Name"}
                                value={this.state.MedicineFormDialogData.medicine_name}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.medicine_name = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="medicine_name">
                                Generic Name<span className="Require">*</span>
                            </label>
                            <input
                                type="text"
                                value={this.state.MedicineFormDialogData.generic_name}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.generic_name = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                                placeholder={"Generic Name"}
                            />
                        </div>
                    </div>
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="medicine_name">
                                Category<span className="Require">*</span>
                            </label>
                            <select
                                value={this.state.MedicineFormDialogData.category_id}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.category_id = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            >
                                <option>Select One</option>
                                {typeof this.state.Categories !== "undefined" &&
                                this.state.Categories.map((data: any, index: number) => (
                                    <option value={data.id} key={index}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="Form__control">
                            <label htmlFor="medicine_name">
                                Brand<span className="Require">*</span>
                            </label>
                            <select
                                value={this.state.MedicineFormDialogData.brand_id}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.brand_id = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            >
                                <option>Select One</option>
                                {this.state.Manufacturers.map((data: any, index: number) => (
                                    <option value={data.id} key={index}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="medicine_name">Unit</label>
                            <select
                                value={this.state.MedicineFormDialogData.unit_id}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.unit_id = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            >
                                <option>Select One</option>
                                {this.state.Units.map((data: any, index: number) => (
                                    <option value={data.id} key={index}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="Form__control">
                            <label htmlFor="medicine_name">
                                Expire Date<span className="Require">*</span>
                            </label>
                            <Datepicker
                                label={""}
                                value={APP.FUNCTIONS.CONVERT_DATE(
                                    this.state.MedicineFormDialogData.expire_date,
                                    "yyyy-mm-dd"
                                )}
                                onChange={(date: any) =>
                                    this.setState((prevState: any) => ({
                                        MedicineFormDialogData: {
                                            ...prevState.MedicineFormDialogData,
                                            expire_date: APP.FUNCTIONS.CONVERT_DATE(
                                                date,
                                                "yyyy-mm-dd"
                                            ),
                                        },
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="puchase_price">
                                Purchase Price<span className="Require">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={"Purchase Price"}
                                value={this.state.MedicineFormDialogData.purchase_price}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.purchase_price = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="selling_price">
                                Sales Price<span className="Require">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={"Sales Price"}
                                value={this.state.MedicineFormDialogData.sales_price}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.sales_price = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="box_size">
                                Box Size<span className="Require">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={"Box Size"}
                                value={this.state.MedicineFormDialogData.box_size}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.box_size = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="total_box">
                                Total Box<span className="Require">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={"Total Box"}
                                value={this.state.MedicineFormDialogData.total_box}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.total_box = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="shelf_number">Shelf Number</label>
                            <input
                                type="text"
                                placeholder={"Shelf Number"}
                                value={this.state.MedicineFormDialogData.shelf_number}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.shelf_number = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="shelf_number">
                                Strength<span className="Require">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={"strength"}
                                value={this.state.MedicineFormDialogData.strength}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.strength = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="vat">Vat</label>
                            <select
                                value={this.state.MedicineFormDialogData.vat_id}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.vat_id = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            >
                                <option value="">Select One</option>
                                {this.state.Vats.map((data: any, index: number) => (
                                    <option value={data.id} key={index}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="Form__control">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                style={{marginLeft: "14px", width: "100%"}}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    let file: any = e.target.files[0];
                                    __data.image = file;

                                    const url: any = URL.createObjectURL(file);

                                    this.setState({
                                        MedicineFormDialogData: __data,
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
                    </div>
                    <div className="TwoInputField">
                        <div className="Form__control">
                            <label htmlFor="total_box">-- Status --</label>
                            <select
                                value={this.state.MedicineFormDialogData.status}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.status = e.target.value;
                                    this.setState({
                                        MedicineFormDialogData: __data,
                                    });
                                }}
                            >
                                <option value="">Select One</option>
                                <option value={"Active"}>Active</option>
                                <option value={"Inactive"}>Inactive</option>
                            </select>
                        </div>

                        <div className="Form__control">
                            <label htmlFor="total_box">Description</label>
                            <textarea
                                value={this.state.MedicineFormDialogData.medicine_details}
                                onChange={(e: any) => {
                                    let __data: any = this.state.MedicineFormDialogData;
                                    __data.medicine_details = e.target.value;
                                    this.setState({
                                        CategoryFormDialogData: __data,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    {this.state.Loading ? (
                        <Button
                            label="Loading..."
                            disable={true}
                            className="cbtn--lg cbtn--danger"
                        />
                    ) : (
                        <span className="Create_another_box">
              <input
                  type="checkbox"
                  className="CheckboxBtn"
                  onClick={() => this.setState({anOtherCreate: true})}
              />
              <span>Create Another</span>
              <Button
                  label="Save"
                  className="cbtn--lg cbtn--primary ml-2"
                  onClick={this.handleSaveMedicine}
              />{" "}
            </span>
                    )}
                </div>
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(MedicineForm);
