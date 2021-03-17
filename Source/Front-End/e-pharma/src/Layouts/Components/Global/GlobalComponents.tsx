/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from 'react';
import {APP} from "../../../App/Init/App.Init";
import AlertDialog from './AlertDialog/AlertDialog';
import Toast from "./Toast/Toast";
import {ToastStore} from "../../../Vendor/Utils/Core/Stores/Global/Toast/Toast.Store";
import {AlertDialogStore} from "../../../Vendor/Utils/Core/Stores/Global/AlertDialog/AlertDialog.Store";

class GlobalComponents extends Component {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            Toast: ToastStore.getState(),
            AlertDialog: AlertDialogStore.getState(),
        };
    }

    public componentDidMount(): void {
        ToastStore.addChangeListener(() => {
            this.setState({
                Toast: {
                    ...ToastStore.getState(),
                }
            });
        });

        AlertDialogStore.addChangeListener(() => {
            this.setState({
                AlertDialog: {
                    ...AlertDialogStore.getState(),
                }
            });
        });
    }

    public componentWillUnmount(): void {
        ToastStore.removeChangeListener(() => {
            this.setState({Toast: {}});
        });

        AlertDialogStore.removeChangeListener(() => {
            this.setState({AlertDialog: {}});
        });
    }

    render(): Required<React.ReactNode> {
        return (
            <React.Fragment>
                <AlertDialog show={this.state.AlertDialog.show}
                             alertType={this.state.AlertDialog.alertType}
                             message={this.state.AlertDialog.message}
                             showConfirm={this.state.AlertDialog.showConfirm}
                             showCancel={this.state.AlertDialog.showCancel}
                             onCancel={this.state.AlertDialog.onCancel}
                             onConfirm={this.state.AlertDialog.onConfirm}
                             confirmBtnText={this.state.AlertDialog.confirmBtnText}
                             cancelBtnText={this.state.AlertDialog.cancelBtnText}
                             style={this.state.AlertDialog.style}
                             title={this.state.AlertDialog.title}
                             focusCancelBtn={this.state.AlertDialog.focusCancelBtn}
                />

                <Toast open={this.state.Toast.open} type={this.state.Toast.type} message={this.state.Toast.message}
                       onClose={() => APP.SERVICES.CORE.TOAST.hide()} duration={this.state.Toast.duration}
                       horizontalAlign={this.state.Toast.horizontalAlign}
                       verticalAlign={this.state.Toast.verticalAlign}
                />
            </React.Fragment>
        );
    }
}

export default GlobalComponents;
