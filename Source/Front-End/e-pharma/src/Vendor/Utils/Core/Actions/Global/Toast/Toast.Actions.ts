/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {PrepareNamespace} from "../../../../../Functions/Core/PrepareNamespace";

const Namespace: string = "APP/TOAST";

export const actionTypes = {
    'SET_TOAST': PrepareNamespace(Namespace, 'SET_TOAST'),
};