/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from "react";
import {APP} from "../../../../App/Init/App.Init";
import "./Button.scss";

const largeBtn = (
    props: Partial<{
        className: string;
        icon: React.ReactNode;
        label: string;
        title: string;
        style: React.CSSProperties;
        onClick(): () => void;
    }>
) => {
    return (
        <button
            className={"cbtn " + props.className}
            title={props.title}
            onClick={typeof props.onClick === "function" ? props.onClick : () => {
            }}
            style={props.style}
        >
            <span className="btn--icon">{props.icon}</span>
            {props.label}
        </button>
    );
};

export default APP.SERVICES.CORE.ROUTER.withRouter(largeBtn);
