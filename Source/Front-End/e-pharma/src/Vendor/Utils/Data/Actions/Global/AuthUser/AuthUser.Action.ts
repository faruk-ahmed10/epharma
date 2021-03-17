/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE: string = 'APP/AUTH/USER/';

/**
 * A constructor to return the action with namespace, Must use as defined
 * @private Not Exported
 * @param ACTION {string}
 * @returns {string}
 * @constructor
 */
function USE(ACTION: string): string {
    return NAMESPACE + ACTION;
}

//Action types
export const actionTypes: any = {
    HANDLE_SET_AUTH_USER: USE('HANDLE_SET_AUTH_USER'),
};

/**
 * @param value {any}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function SET_AUTH_USER(value: any) : any {
    return {
        type: actionTypes.HANDLE_SET_AUTH_USER,
        payload: value,
    }
}