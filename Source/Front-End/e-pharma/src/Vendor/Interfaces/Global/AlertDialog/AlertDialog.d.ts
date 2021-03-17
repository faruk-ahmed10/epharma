/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from "react";

export interface IAlertAction {
    type: string,
    payload: Partial<IAlertPayload>
}

export interface IAlertPayload {
    show: boolean,
    style: React.CSSProperties,
    btnSize: string,
    alertType: 'success' | 'error' | 'danger' | 'warning' | 'info',
    showCancel: boolean,
    showConfirm: boolean,
    focusCancelBtn: boolean,
    title: string,
    cancelBtnText: string,
    confirmBtnText: string,
    message: string,
    onConfirm(): void | boolean,
    onCancel(): void | boolean,
}