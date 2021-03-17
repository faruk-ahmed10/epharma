/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {IAlertPayload} from "../../../../Interfaces/Global/AlertDialog/AlertDialog";
import {Dispatcher} from "../../../../Utils/Core/Dispatcher/Dispatcher";
import {actionTypes} from "../../../../Utils/Core/Actions/Global/AlertDialog/AlertDialog.Actions";


export class AlertDialogProvider {
    /**
     * Set an alert dialog statically using it's accepted options
     * @param props {object}
     * @constructor
     */
    public static Show(props: Partial<IAlertPayload>): void {
        Dispatcher.dispatch({
            type: actionTypes.SET_ALERT,
            payload: props,
        });
    }

    /**
     * Hide the alert dialog
     * @constructor
     */
    public static Hide(): void {
        Dispatcher.dispatch({
            type: actionTypes.SET_ALERT,
            payload: {show: false},
        });
    }
}