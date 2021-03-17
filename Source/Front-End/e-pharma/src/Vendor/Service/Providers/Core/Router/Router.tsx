/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Fragment} from 'react';
//noinspection ES6CheckImport
import PropTypes from 'prop-types';
import {
    HashRouter,
    BrowserRouter,
    StaticRouter,
    Route as SystemRoute,
    Redirect,
    Switch,
    Link,
    withRouter,
} from "react-router-dom";

/**
 * Generate a component to render the page
 * @param Component {React.ReactChild}
 * @param middleware {Array}
 * @param rest {any}
 * @constructor
 */
const Route = ({component: Component, middleware, ...rest}: Partial<any>): any => {
    return (
        <SystemRoute
            {...rest}
            render={(props) => {

                if (typeof middleware !== 'undefined' && middleware.length > 0) {
                    for (let i = 0; i < middleware.length; i++) {
                        const result = middleware[i](props);
                        if (result !== true) {
                            return <Fragment>{result}</Fragment>
                        }
                    }
                }

                return <Component {...props} />;
            }}
        />
    );
};

const __Route = withRouter(Route);

__Route.propTypes = {
    middleware: PropTypes.array,
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.element,
};

/**
 * Router Group
 * @param middleware
 * @param props
 * @constructor
 */
const RouteGroup = ({middleware, ...props}: any) => {
    return React.Children.map(props.children, child => React.cloneElement(child, {middleware: middleware}));
};

/**
 * Router Layout to be bound
 * @param hasLayout {Boolean}
 * @param Layout {React.ReactChild}
 * @param NotFoundComponent {React.ReactNode}
 * @param props {Object}
 * @constructor
 */
const RouterLayout = ({hasLayout, layout: Layout, NotFoundComponent, ...props}: Partial<any>) => {
    return (
        <Fragment>
            {hasLayout ? (
                <Layout>
                    <Switch>
                        {props.children}
                        <Route component={NotFoundComponent}/>
                    </Switch>
                </Layout>
            ) : (
                <Switch>
                    {props.children}
                    <Route component={NotFoundComponent}/>
                </Switch>
            )}
        </Fragment>
    )
};

export {
    BrowserRouter, HashRouter, StaticRouter,
    __Route as Route, RouteGroup, RouterLayout, Link, Switch, Redirect, withRouter,
};