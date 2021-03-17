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
import {actionTypes} from "../../../Actions/Global/Toast/Toast.Actions";

class ToastStore extends StoreProvider {
    constructor() {
        super();

        this.state = {
            open: false,
            verticalAlign: '',
            horizontalAlign: '',
            duration: '',
            message: '',
            type: '',
        };
    }

    public registerDispatcher(): void {
        Dispatcher.register((action: any) => {
            switch (action.type) {
                case actionTypes.SET_TOAST:
                    this.state = {
                        ...this.state,
                        ...action.payload,
                    };

                    this.emitChange();
                    break;
                default:
                    break
            }
        });
    }
}

const Store = new ToastStore();
export {Store as ToastStore}