/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {actionTypes} from "../../../Actions/Global/AuthUser/AuthUser.Action";

const InitialState: any = {
    id: 0,
    name: '',
    email: '',
    role_id: 0,
    gender: '',
    status: '',
    pharmacy_id: 0,
    image: '',
    pharmacy: null,
    general_settings: null,
    modules: null,
};

export function AUTH_USER(state: any = InitialState, action: any): any {
    switch (action.type) {
        case actionTypes.HANDLE_SET_AUTH_USER :
            return {
                ...state,
                ...action.payload,
            };
        default :
            return state;
    }
}