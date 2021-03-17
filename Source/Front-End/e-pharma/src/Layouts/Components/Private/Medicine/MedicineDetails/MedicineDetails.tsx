/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
import AddIcon from "@material-ui/icons/Add";
import {Link} from "react-router-dom";
import {APP} from "../../../../../App/Init/App.Init";
import Breadcrumb from "../../../../../Layouts/Components/Private/Common/Breadcrumb";
import "./MedicineDetails.scss";

class MedicineDetails extends Component<any, any> {
    public state: any;

    private readonly medicine_id: string | number | undefined | null;

    public constructor(props: any) {
        super(props);
        this.medicine_id = this.props.match.params.id;
        this.state = {
            medicineInfo: [],
        };
        this.handleGetMedicine = this.handleGetMedicine.bind(this);
    }


    private handleGetMedicine(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/medicine/" + this.medicine_id,
            {},
            {},
            (data: any) => {

                this.setState({
                    medicineInfo: data.data,

                });
            },
            (error: any) => {
                alert("Failed");
            }
        );
    }

    public componentDidMount(): void {
        this.handleGetMedicine();
    }

    render() {


        return (
            <div>
                <React.Fragment>
                    <Breadcrumb title={"Medicine"} activeTitle={"Medicine Details"}/>
                    <div className="row mrgin">
                        <div className="col-md-5 ">
                            <div className="medicine-feature bGround">
                                <div className="imgAndNameArea">
                                    <div className="med-img">
                                        {this.state.medicineInfo.image !== null ? (
                                            <img
                                                className={"img-50"}
                                                src={APP.CONFIG.API_CONFIG.CDN_ROOT + "/" + this.state.medicineInfo.image}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className={"img-50"}
                                                src="https://ctt.trains.com/sitefiles/images/no-preview-available.png"
                                                alt=""
                                            />
                                        )}
                                    </div>

                                    <div className="nameAndBrandArea">
                                        <h3>{this.state.medicineInfo.medicine_name}</h3>
                                        <p>Generic Name: {this.state.medicineInfo.generic_name}</p>
                                        <p>Brand
                                            Name: {typeof this.state.medicineInfo.brand !== 'undefined' && this.state.medicineInfo.brand !== null ? this.state.medicineInfo.brand.name : ''}</p>
                                    </div>
                                </div>

                                <div className="medicine-details-table">
                                    <table>
                                        <tr>
                                            <td>Category:</td>
                                            <td>{this.state.medicineInfo.category_id ? this.state.medicineInfo.category.name : ''}</td>
                                        </tr>
                                        <tr>
                                            <td>Quantity:</td>
                                            <td>{this.state.medicineInfo.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td>Sales price:</td>
                                            <td>{this.state.medicineInfo.sell_price}</td>
                                        </tr>
                                        <tr>
                                            <td>Purchase price:</td>
                                            <td>{this.state.medicineInfo.purchase_price}</td>
                                        </tr>
                                        <tr>
                                            <td>Expire date:</td>
                                            <td>{this.state.medicineInfo.expire_date}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-7 ">

                            <div className="medicine-details-text bGround">
                                <h2 className="description">Description</h2>
                                <p>{this.state.medicineInfo.medicine_details}</p>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            </div>
        );
    }
}

export default MedicineDetails;