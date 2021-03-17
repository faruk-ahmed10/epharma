/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {RouterProvider} from "../../Vendor/Service/Providers/Core/Router/RouterProvider";
import {withStore} from "../../Vendor/Service/Providers/Core/GlobalData/GlobalDataProvider";
import {Store} from "../../Vendor/Utils/Data/Store";
import {AuthProvider} from "../../Vendor/Service/Providers/Auth/Auth.Provider";
import {HTTPRequestProvider} from "../../Vendor/Service/Providers/Core/HttpRequest/HttpRequestProvider";
import {AlertDialogProvider} from "../../Vendor/Service/Providers/Core/AlertDialog/AlertDialog.Provider";
import {ToastProvider} from "../../Vendor/Service/Providers/Core/Toast/Toast.Provider";
import { MiddlewareProvider } from "../../Vendor/Service/Providers/Core/ Middleware/Middleware.Provider";

/**
 * @interface of the Service Providers
 * @includes all the inherited types and properties
 *
 * You can register your types and properties here for type checking
 */
interface IServices {
    CORE: {
        /**
         * You can register your core services types here
         */

        ROUTER: {
            Link: typeof RouterProvider.Link,
            Route: typeof RouterProvider.Route,
            BrowserRouter: typeof RouterProvider.BrowserRouter,
            HashRouter: typeof RouterProvider.HashRouter,
            Switch: typeof RouterProvider.Switch,
            withRouter: typeof RouterProvider.withRouter | any,
            RouteMatched: typeof RouterProvider.RouteMatched,
            RouterLayout: typeof RouterProvider.RouterLayout,
        },

        MIDDLEWARE: typeof MiddlewareProvider,

        GLOBAL_DATA: {
            STORE: typeof Store,
            WITH_STORE: typeof withStore,

            STORES: Array<any>,
        },

        ALERT_DIALOG: typeof AlertDialogProvider,
        TOAST: typeof ToastProvider,
    },

    /**
     * Other Service Provider Types
     */
    AUTH: typeof AuthProvider,
    HTTP_REQUEST: typeof HTTPRequestProvider,
}


const Services: IServices = {
    /**
     * You can register your service providers here
     */

    CORE: {
        ROUTER: RouterProvider,
        MIDDLEWARE: MiddlewareProvider,
        GLOBAL_DATA: {
            STORE: Store,
            WITH_STORE: withStore,

            STORES: [],
        },

        ALERT_DIALOG: AlertDialogProvider,
        TOAST: ToastProvider,
    },
    AUTH: AuthProvider,
    HTTP_REQUEST: HTTPRequestProvider,
};

export {Services as SERVICES};