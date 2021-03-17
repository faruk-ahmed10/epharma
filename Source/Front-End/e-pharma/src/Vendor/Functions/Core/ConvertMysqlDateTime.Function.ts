/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

export function ConvertMysqlDateTime(MysqlDateTime: string) {
    if(MysqlDateTime !== null) {
        const __dateTime = MysqlDateTime.toString().split(/[- :]/);
        return new Date(Date.UTC(Number(__dateTime[0]), Number(__dateTime[1]) - 1, Number(__dateTime[2]), Number(__dateTime[3]), Number(__dateTime[4]), Number(__dateTime[5])));
    }

    return '';
}