/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {AuthProvider} from "../Service/Providers/Auth/Auth.Provider";
import {ROUTE_PATHS} from "../../Routes/RoutePaths";

export function Forbidden() {
    new AuthProvider().remove();
    window.location.replace(ROUTE_PATHS.PUBLIC.LOGIN);
}