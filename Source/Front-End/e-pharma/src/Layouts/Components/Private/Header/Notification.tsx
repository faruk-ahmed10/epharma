/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
import "./Notification.scss";
import Notification_icon from "../../../../Static/Icons/Notification_icon.png";
import Alart from "../../../../Static/Icons/Alart.png";
import Setting from "../../../../Static/Icons/Setting.png";
import People from "../../../../Static/Icons/People.png"
import SubSetting from "../../../../Static/Icons/dropdown_menu_setting.png";
import ic_Logout from "../../../../Static/Icons/setting_logout.png";
import {APP} from "../../../../App/Init/App.Init";


class Notification extends Component <any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            show: false,
        };

        this.toggleShow = this.toggleShow.bind(this);
        this.hide = this.hide.bind(this);
    }

    toggleShow() {
        this.setState({show: !this.state.show});
    }

    hide(e: any) {
        if (e && e.relatedTarget) {
            e.relatedTarget.click();
        }
        this.setState({show: false});
    }


    public render(): React.ReactNode {
        return (
            <div>
                <div className={"notification-area-container"}>
                    <div>
                        <a href="" className={"notification-btn"}><img src={Notification_icon} alt=" "/></a>
                    </div>
                    <div>
                        <a href="" className={"alert-btn"}><img src={Alart} alt=" "/></a>
                    </div>
                    <div>
                        <button
                            className={"setting-btn"}
                            type="button"
                            onClick={this.toggleShow}
                            onBlur={this.hide}
                        >
                            <img src={Setting} alt=" "/>
                        </button>
                    </div>

                    {this.state.show && (
                        <div className="SettingDropdown">
                            <ul>
                                <a href="#">
                                    <li className="my_profile"><img src={People} alt=" "/>{this.props.AUTH_USER.name}
                                    </li>
                                </a>
                                <APP.SERVICES.CORE.ROUTER.Link to={APP.ROUTES.PRIVATE.GENERAL_SETTINGS}>
                                    <li className="setting"><img src={SubSetting} alt=" "/>Setting</li>
                                </APP.SERVICES.CORE.ROUTER.Link>
                                <APP.SERVICES.CORE.ROUTER.Link to={APP.ROUTES.PRIVATE.LOGOUT} href="">
                                    <li className="logout"><img src={ic_Logout} alt=" "/>Logout</li>
                                </APP.SERVICES.CORE.ROUTER.Link>
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        );
    }
}

export default APP.SERVICES.CORE.GLOBAL_DATA.WITH_STORE((state: any) => {
    return {
        AUTH_USER: state.AUTH_USER,
    }
})(Notification);
