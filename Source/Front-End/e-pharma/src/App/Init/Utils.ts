/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {Store} from "../../Vendor/Utils/Data/Store";
import {UAP} from "../../Vendor/Utils/UAP";

/**
 * @interface of the Utils
 * @includes all the inherited types and properties
 *
 * You can register your types and properties here for type checking
 */
interface IUtils {
    DATA: {
        UAP: typeof UAP,
        STORE: typeof Store,
    }
}

const Utils: IUtils = {
    DATA: {
        UAP: UAP,
        STORE: Store,
    }
}

export {Utils as UTILS};