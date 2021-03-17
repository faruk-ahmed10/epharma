/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {CONFIGS} from "./Configs.Init";
import {SERVICES} from "./Services.Init";
import {MIDDLEWARES} from "./Middlewares.Init";
import {FUNCTIONS} from "./Functions.Init";
import {UTILS} from "./Utils";
import {ROUTE_PATHS} from "../../Routes/RoutePaths";
import {EXCEPTIONS} from "./Exceptions.Init";

const App = {
    /**
     * Config Providers and Objects
     */
    CONFIG: CONFIGS,

    /**
     * Service Providers and Objects
     */
    SERVICES: SERVICES,

    /**
     * Function Providers and Objects
     */
    FUNCTIONS: FUNCTIONS,

    /**
     * Middleware Providers and Objects
     */
    MIDDLEWARE: MIDDLEWARES,

    /**
     * Util Service Providers and Objects
     */
    UTILS: UTILS,

    /**
     * Exception Providers and Objects
     */
    EXCEPTIONS: EXCEPTIONS,

    /**
     * Route Paths Object
     */
    ROUTES: ROUTE_PATHS,
};


export {App as APP};