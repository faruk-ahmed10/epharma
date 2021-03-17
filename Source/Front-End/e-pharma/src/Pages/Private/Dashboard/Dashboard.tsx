/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
import DashCard from "../../../Layouts/Components/Private/Dashboard/Card/DashCard";
import "./Dashboard.scss";
import "../../../Static/Scss/variables.scss";
import TotalCustomer from "../../../Static/Icons/Total-Customer.png";
import TotalManufacturer from "../../../Static/Icons/Total-manufacturer.png";
import TotalMedicine from "../../../Static/Icons/Total-Medicine.png";
import OutOfStock from "../../../Static/Icons/Out-Of-Stock.png";
import Expired from "../../../Static/Icons/Expired.png";
import TotalInvoice from "../../../Static/Icons/Total-Invoice.png";
import {APP} from "../../../App/Init/App.Init";

class Dashboard extends Component<any, any> {
    public state: any;
    private HttpRequest = APP.SERVICES.HTTP_REQUEST;

    public constructor(props: any) {
        super(props);

        this.state = {
            SummaryObject: {
                total_customers: '',
                total_suppliers: '',
                total_medicines: '',
                total_income: '',
                total_expense: '',
                total_invoices: '',
            }
        };

        this.handleGetSummaryObject = this.handleGetSummaryObject.bind(this);
    }

    handleGetSummaryObject(): void {
        this.HttpRequest.send('get', '/dashboard/summary_object', {}, {}, ({data}: any) => {
            this.setState({
                SummaryObject: {
                    total_customers: data.total_customers,
                    total_suppliers: data.total_suppliers,
                    total_medicines: data.total_medicines,
                    total_income: data.total_income,
                    total_expense: data.total_expense,
                    total_invoices: data.total_invoices,
                }
            });
        });
    }

    public componentDidMount(): void {
        this.handleGetSummaryObject();
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div className="container-fluid">
                    <p className={"dash-title"}>Dashboard</p>
                    <p className={"dash-sub-title"}>Home</p>


                    <div className="row">
                        <div className="col-md-2">
                            <DashCard backgroundColor={"#f3fff9"} color={"#00ac51"} image={TotalCustomer}
                                      cardTitle={"Customers"} value={this.state.SummaryObject.total_customers}/>
                        </div>
                        <div className="col-md-2">
                            <DashCard backgroundColor={"#fff4f8"} color={"#ea5a92"} image={TotalManufacturer}
                                      cardTitle={"Suppliers"} value={this.state.SummaryObject.total_suppliers}/>
                        </div>
                        <div className="col-md-2">
                            <DashCard backgroundColor={"#f3fffd"} color={"#26c7ab"} image={TotalMedicine}
                                      cardTitle={"Medicines"} value={this.state.SummaryObject.total_medicines}/>
                        </div>
                        <div className="col-md-2">
                            <DashCard backgroundColor={"#fff7f2"} color={"#fa8036"} image={OutOfStock}
                                      cardTitle={"Total Income"} value={this.state.SummaryObject.total_income}/>
                        </div>
                        <div className="col-md-2">
                            <DashCard backgroundColor={"#fcf1ff"} color={"#cd87dd"} image={Expired}
                                      cardTitle={"Total Expense"} value={this.state.SummaryObject.total_expense}/>
                        </div>
                        <div className="col-md-2">
                            <DashCard backgroundColor={"#f1f7ff"} color={"#5096f7"} image={TotalInvoice}
                                      cardTitle={"Total Invoices"} value={this.state.SummaryObject.total_invoices}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Dashboard;
