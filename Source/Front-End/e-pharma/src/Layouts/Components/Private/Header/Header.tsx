/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
import "./Header.scss";
import Nav from "./Nav";
import Logo from "../../../../Static/Images/Logo.png";
import Notification from "./Notification";
import {APP} from "../../../../App/Init/App.Init";


class Header extends Component<any, any> {
    public render(): React.ReactNode {
        return (
            <div>
                <div className="header">
                    <div className={"container-fluid"}>
                        <div className="header-content-wrap">
                            <div className={"logo"}>
                                <img src={this.props.AUTH_USER.general_settings.logo !== null ? (APP.CONFIG.API_CONFIG.CDN_ROOT + '/' + this.props.AUTH_USER.general_settings.logo) : Logo} alt=""/>
                            </div>
                            <Nav/>
                            <Notification/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default APP.SERVICES.CORE.GLOBAL_DATA.WITH_STORE((state: any) => {
    return {
        AUTH_USER: state.AUTH_USER,
    }
})(Header);

