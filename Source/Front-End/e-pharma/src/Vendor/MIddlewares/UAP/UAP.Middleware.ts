/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {Store} from "../../Utils/Data/Store";
import {ROUTE_PATHS} from "../../../Routes/RoutePaths";

export function UAPCheckPost(moduleCode: string, actionCode: string, props: any = undefined, shouldRedirectToErrorPage: boolean = true) {
    try {
        if (typeof moduleCode !== 'undefined' && typeof actionCode !== 'undefined') {
            const permission = Store.getState().AUTH_USER.modules[moduleCode].Actions[actionCode].Permission;

            if(!permission && shouldRedirectToErrorPage) {
                props.history.push(ROUTE_PATHS.PRIVATE.ACCESS_DENIED + `?m=${moduleCode.toLowerCase()}&a=${actionCode.toLowerCase()}`);
            }

            return !!permission;
        }
    } catch (e) {
        return false;
    }
}