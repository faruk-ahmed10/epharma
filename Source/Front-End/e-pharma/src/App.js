/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from 'react';
import Routes from "./Routes/Routes";
import 'bootstrap/dist/css/bootstrap.css';
import "./Static/Scss/default.scss";
import GlobalComponents from "./Layouts/Components/Global/GlobalComponents";

function App() {
    return (
        <React.Fragment>
            <div className="layout-wrapper">
                <Routes/>
                <GlobalComponents />
            </div>
        </React.Fragment>
    );
}

export default App;
