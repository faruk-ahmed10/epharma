/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {StoreProvider} from "../../../../../Service/Providers/Core/Store/Store.Provider";
import {Dispatcher} from "../../../Dispatcher/Dispatcher";
import {actionTypes} from "../../../Actions/Global/AlertDialog/AlertDialog.Actions";
import {IAlertPayload} from "../../../../../Interfaces/Global/AlertDialog/AlertDialog";

class AlertDialogStore extends StoreProvider {
    public state: IAlertPayload;

    constructor() {
        super();

        this.state = {
            show: false,
            style: {},
            btnSize: "",
            alertType: "success",
            showCancel: false,
            showConfirm: false,
            focusCancelBtn: false,
            title: "",
            cancelBtnText: "",
            confirmBtnText: "",
            message: "",
            onConfirm: () => {
            },
            onCancel: () => {
            },
        }
    }

    public registerDispatcher(): void {
        Dispatcher.register((action: any) => {
            switch (action.type) {
                case actionTypes.SET_ALERT:
                    this.state = {
                        ...this.state,
                        ...action.payload,
                    };

                    this.emitChange();
                    break;
                default:
                    break;
            }
        });
    }
}

const Store = new AlertDialogStore();
export {Store as AlertDialogStore};