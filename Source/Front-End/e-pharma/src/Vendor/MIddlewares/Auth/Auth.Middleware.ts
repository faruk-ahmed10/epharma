/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {AuthProvider} from "../../Service/Providers/Auth/Auth.Provider";
import {ROUTE_PATHS} from "../../../Routes/RoutePaths";

/**
 * Used only for the public routes
 * @return {boolean}
 */
export function NON_LOGGED_USER(props: any) {
    if (new AuthProvider().check()) {
        return props.history.replace(ROUTE_PATHS.PRIVATE.ROOT);
    }

    return true;
}

/**
 * Used only for the private routes
 * @return {boolean}
 */
export function LOGGED_USER(props: any) {
    if (!new AuthProvider().check()) {
        return props.history.replace(ROUTE_PATHS.PUBLIC.LOGIN);
    }

    return true;
}
