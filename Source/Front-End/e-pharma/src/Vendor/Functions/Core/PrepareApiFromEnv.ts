/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {Env} from "../../../App/Config/Env.Config";

/**
 * Prepare the development and production api urls
 * @param development {string}
 * @param production {string}
 * @param test {string | null}
 * @constructor
 */
export function PrepareApiFromEnv(development: string, production: string, test: string = ''): string {
    if (Env.Production) {
        return production;
    } else if (Env.Development) {
        return development;
    }

    return test;
}