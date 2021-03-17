/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import AddIcon from "@material-ui/icons/Add";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP } from "../../../../App/Init/App.Init";
import PersonDetailsHeader from "../../../../Layouts/Components/Global/PersonDetails/PersonDetailsHeader/PersonDetailsHeader";
import PersonDetailsInfo from "../../../../Layouts/Components/Global/PersonDetails/PersonDetailsInfo/PersonDetailsInfo";
import Tab from "../../../../Layouts/Components/Global/Tabs/Tab";
import Tabs from "../../../../Layouts/Components/Global/Tabs/Tabs";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import DueList from "../../../../Layouts/Components/Private/Customer/DueList/DueList";
import OrderList from "../../../../Layouts/Components/Private/Customer/OrderList/OrderList";
import "./CustomerDetails.scss";

class CustomerDetails extends Component<any, any> {
  public state: any;
  private readonly customer_id: string | number | undefined | null;

  public constructor(props: any) {
    super(props);

    this.customer_id = this.props.match.params.id;

    this.state = {
      customerInfo: [],
    };

    this.handleGetCustomer = this.handleGetCustomer.bind(this);
  }

  private handleGetCustomer(): void {
    APP.SERVICES.HTTP_REQUEST.send(
      "get",
      "/customer/" + this.customer_id,
      {},
      {},
      (data: any) => {
        this.setState({
          customerInfo: data.data,
        });
      },
      (error: any) => {
        alert("Failed");
      }
    );
  }

  public componentDidMount(): void {
    this.handleGetCustomer();
  }

  render() {
    return (
      <div>
        <Breadcrumb title={"Customer"} activeTitle={"Customer Details"} />

        <div className="category__header">
          <Link
            to={APP.ROUTES.PRIVATE.CUSTOMERS}
            className={"cbtn cbtn--lg cbtn--primary mr-10"}
          >
            <AddIcon /> Manage Customer
          </Link>

          <div className="Customer__wrapper">
            <PersonDetailsHeader personInfo={this.state.customerInfo} />

            <Tabs>
              <Tab title="Personal Info">
                <PersonDetailsInfo personInfo={this.state.customerInfo} />
              </Tab>
              <Tab title="Order List">
                <OrderList />
              </Tab>
              <Tab title="Due List">
                <DueList />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDetails;
