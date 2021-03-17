/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
// import {APP} from "../../../../App/Init/App.Init";
import {APP} from "../../../../App/Init/App.Init";
import BreadcrumbIcon from "../../../../Static/Icons/breadcrumicon.png";
import "./Breadcrumb.scss";

class Breadcrumb extends Component<Partial<{
    title: string;
    activeTitle: string;
}>,
    {}> {
    render() {
        return (
            <>
                <div className="breadcrumbs">
                    <div className="breadcrumbs__info">
                        <div className="breadcrumbs__left">
                            <img src={BreadcrumbIcon} alt=""/>
                        </div>
                        <div className="breadcrumbs__right">
                            <a href="#">{this.props.title}</a>
                            <span className="breadcrumbs__active">{this.props.activeTitle}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(Breadcrumb);
