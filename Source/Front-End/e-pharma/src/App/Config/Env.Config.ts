/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

interface IEnv {
    Production: boolean,
    Development: boolean,
    Test: boolean,
}

export const Env: IEnv = {
    Production: process.env.NODE_ENV === "production",
    Development: process.env.NODE_ENV === "development",
    Test: process.env.NODE_ENV === "test",
};