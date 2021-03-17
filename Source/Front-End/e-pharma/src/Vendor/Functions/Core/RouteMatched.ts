/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {RemoveEndingSlash} from "./RemoveEndingSlash.Function";

/**
 * Returns true if the current and the target route matched
 * @param CurrentRoute
 * @param RouteToMatch
 * @constructor
 */
export default function RouteMatched(CurrentRoute: string, RouteToMatch: string): boolean {
    return RemoveEndingSlash(CurrentRoute.toLowerCase()) === RouteToMatch.toLowerCase();
}