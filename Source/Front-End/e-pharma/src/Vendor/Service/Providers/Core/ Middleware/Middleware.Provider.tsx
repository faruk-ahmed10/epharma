/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Fragment} from 'react';
import {RouterProvider} from '../Router/RouterProvider';

const MiddlewareProvider = ({middleware, ...props}: any): any => {

    if (typeof middleware !== 'undefined' && middleware.length > 0) {
        for (let i = 0; i < middleware.length; i++) {
            const result = middleware[i](props);
            if (result !== true) {
                return <Fragment>{result}</Fragment>;
            }
        }
    }

    return <Fragment>{props.children}</Fragment>;
}

const __MiddlewareProvider = RouterProvider.withRouter(MiddlewareProvider);

export {__MiddlewareProvider as MiddlewareProvider};


