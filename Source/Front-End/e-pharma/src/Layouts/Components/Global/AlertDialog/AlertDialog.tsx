/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from 'react';
import {IAlertPayload} from "../../../../Vendor/Interfaces/Global/AlertDialog/AlertDialog";
import SweetAlert from "react-bootstrap-sweetalert/dist";
import {css} from "@emotion/css";

const __css_alertCancelBtn = css(`
    color: #2d2d2d !important;
    text-decoration: none !important;
    border: 1px solid #a6a6a6 !important;
`);

interface IAlertDialog {
    show: IAlertPayload['show'],
    style: IAlertPayload['style'],
    btnSize: IAlertPayload['btnSize'],
    alertType: IAlertPayload['alertType'],
    title: IAlertPayload['title'],
    cancelBtnText: IAlertPayload['cancelBtnText'],
    confirmBtnText: IAlertPayload['confirmBtnText'],
    showCancel: IAlertPayload['showCancel'],
    showConfirm: IAlertPayload['showConfirm'],
    focusCancelBtn: IAlertPayload['focusCancelBtn'],
    message: IAlertPayload['message'],
    onConfirm: IAlertPayload['onConfirm'],
    onCancel: IAlertPayload['onCancel'],
}

const AlertDialog = ({show, style, btnSize, alertType, title, cancelBtnText, confirmBtnText, showCancel, showConfirm, focusCancelBtn, message, onConfirm, onCancel}: Partial<IAlertDialog>): any => {

    return (
        <React.Fragment>
            <SweetAlert
                show={show}
                btnSize={btnSize}
                style={style}
                {...typeof alertType !== 'undefined' ? {[alertType]: true}: null}
                showCancel={showCancel}
                focusCancelBtn={focusCancelBtn}
                showConfirm={showConfirm}
                cancelBtnText={cancelBtnText}
                confirmBtnText={confirmBtnText}
                cancelBtnCssClass={__css_alertCancelBtn}
                confirmBtnBsStyle={alertType}
                title={title}
                onConfirm={typeof onConfirm === 'function' ? onConfirm : () => {}}
                onCancel={onCancel}
                allowEscape={true}>
                {message}
            </SweetAlert>
        </React.Fragment>
    );
};

export default AlertDialog;
