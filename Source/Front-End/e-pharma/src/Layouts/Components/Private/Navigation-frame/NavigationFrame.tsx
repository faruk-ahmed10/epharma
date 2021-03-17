/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
import {APP} from "../../../../App/Init/App.Init";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./NavigationFrame.scss";

class NavigationFrame extends Component {
    render() {
        return (
            <>
                <Header/>
                <Sidebar/>

                <div className="main-content">
                    <div className="main-content__innercontent">
                        {this.props.children}
                    </div>
                </div>
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(NavigationFrame);
