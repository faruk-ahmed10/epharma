/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from 'react';
import {Card} from 'react-bootstrap';
import {APP} from "../../../../App/Init/App.Init";

const AccessDenied = (props: any) => {
    const is = (param: any) => {
        return typeof param !== "undefined" && param !== null && param.toString() !== '';
    };

    React.useEffect(() => {
        const moduleCode = APP.FUNCTIONS.GET_PARAM('m');
        const actionCode = APP.FUNCTIONS.GET_PARAM('a');

        if (!is(moduleCode) || !is(actionCode) || APP.MIDDLEWARE.UAP_CHECK_POST(moduleCode.toUpperCase(), actionCode.toUpperCase(), props, false)) {
            props.history.replace(APP.ROUTES.PRIVATE.ROOT);
        }
    });

    return (
        <React.Fragment>
            <Card>
                <Card.Header style={{fontSize: 15, fontWeight: "bold", color: "red"}}>Error!</Card.Header>
                <Card.Body style={{fontSize: 15, fontWeight: "bold"}}>
                    <Card.Title>Access Denied</Card.Title>
                    <Card.Text>
                        You do not have permission to access this module or page! Please contact with the administrator
                        or support provider!
                    </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default APP.SERVICES.CORE.ROUTER.withRouter(AccessDenied);