/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {Forbidden} from "../../Vendor/Exceptions/Forbidden.Exception";

/**
 * Register your exception types and properties here
 */

interface IExceptions {
    FORBIDDEN: typeof Forbidden,
}

const Exceptions: IExceptions = {
    /**
     * Register your exception providers here
     */
    FORBIDDEN: Forbidden,
};

export {Exceptions as EXCEPTIONS};