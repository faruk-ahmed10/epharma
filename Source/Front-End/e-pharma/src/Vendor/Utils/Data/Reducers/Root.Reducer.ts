/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {combineReducers} from "redux";
import {AUTH_USER} from "./Global/AuthUser/AuthUser.Reducer";

export const RootReducer: any = combineReducers({
    AUTH_USER: AUTH_USER,
});