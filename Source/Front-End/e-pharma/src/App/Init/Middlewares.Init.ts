/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

/**
 * Register your middleware types and properties here
 */
import {LOGGED_USER, NON_LOGGED_USER} from "../../Vendor/MIddlewares/Auth/Auth.Middleware";
import { UAPCheckPost } from "../../Vendor/MIddlewares/UAP/UAP.Middleware";

interface IMiddlewares {
    NON_LOGGED_USER: typeof NON_LOGGED_USER,
    LOGGED_USER: typeof LOGGED_USER,
    UAP_CHECK_POST: typeof UAPCheckPost,
}

const Middlewares: IMiddlewares = {
    /**
     * Register your middleware providers here
     */
    NON_LOGGED_USER: NON_LOGGED_USER,
    LOGGED_USER: LOGGED_USER,
    UAP_CHECK_POST: UAPCheckPost,
};

export {Middlewares as MIDDLEWARES}