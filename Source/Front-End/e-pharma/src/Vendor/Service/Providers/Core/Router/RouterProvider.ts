/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {Link, Route, BrowserRouter, HashRouter, Switch, withRouter, RouteGroup, RouterLayout} from './Router';
import RouteMatched from '../../../../Functions/Core/RouteMatched';

interface IRouterProvider {
    Route: typeof Route,
    BrowserRouter: typeof BrowserRouter,
    HashRouter: typeof HashRouter,
    Switch: typeof Switch,
    Link: typeof Link,
    withRouter: typeof withRouter,
    RouteMatched: typeof RouteMatched,
    RouteGroup: typeof RouteGroup,
    RouterLayout: typeof RouterLayout,
}

export const RouterProvider: IRouterProvider = {
    Route,
    BrowserRouter,
    HashRouter,
    Switch,
    Link,
    withRouter,
    RouteMatched,
    RouteGroup,
    RouterLayout,
};