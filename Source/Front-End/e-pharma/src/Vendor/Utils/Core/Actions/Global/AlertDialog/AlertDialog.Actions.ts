/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {PrepareNamespace} from "../../../../../Functions/Core/PrepareNamespace";

const Namespace: string = "APP/ALERT_DIALOG";

export const actionTypes = {
    'SET_ALERT': PrepareNamespace(Namespace, 'SET_ALERT'),
};