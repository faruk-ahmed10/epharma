/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

export interface IAuthProvider {
    set(token: string): void | boolean;
    check(): boolean;
    getToken(): string | undefined | null;
    remove(): void | boolean;
}