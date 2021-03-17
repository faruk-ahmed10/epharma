/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, { Component } from "react";
import "./Nav.scss";


class Nav extends Component {
    render() {
        return(
            <div>
                <div className={"nav"}>
                   {/* <ul>
                        <li><Link to="/invoice">Invoice</Link></li>
                        <li><Link to="/customer_receive">Customer Receive</Link></li>
                        <li><Link to="/manufacturer_payment">Manufacturer Payment</Link></li>
                        <li><Link to="/purchase">Purchase</Link></li>
                    </ul>*/}
                </div>
            </div>
        );
    }
}

export default Nav;