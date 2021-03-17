/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {Capitalize} from "../../Vendor/Functions/Core/Capitalize.Function";
import {ConvertDate} from "../../Vendor/Functions/Core/ConvertDate.Function";
import {ConvertMysqlDateTime} from "../../Vendor/Functions/Core/ConvertMysqlDateTime.Function";
import {ValidateEmailAddress} from "../../Vendor/Functions/Core/EmailValidator.Function";
import {GetParam} from "../../Vendor/Functions/Core/GetParam";
import {JsonToFormData} from "../../Vendor/Functions/Core/JsonToFormData";
import {RemoveEndingSlash} from "../../Vendor/Functions/Core/RemoveEndingSlash.Function";
import {StringToDateObject} from "../../Vendor/Functions/Core/StringToDateObject.Function";
import {PrepareApiFromEnv} from "../../Vendor/Functions/Core/PrepareApiFromEnv";
import {SetFavIcon} from "../../Vendor/Functions/Core/SetFavIcon.Function";
import { ToNumber } from "../../Vendor/Functions/Core/ToNumber";
import { PrepareNamespace } from "../../Vendor/Functions/Core/PrepareNamespace";

/**
 * Register your function types and properties here
 */
interface IFunctions {
    GET_PARAM: typeof GetParam;
    VALIDATE_EMAIL_ADDRESS: typeof ValidateEmailAddress;
    REMOVE_ENDING_SLASH: typeof RemoveEndingSlash;
    CONVERT_DATE: typeof ConvertDate;
    CONVERT_MYSQL_DATE: typeof ConvertMysqlDateTime;
    CAPITALIZE: typeof Capitalize;
    JSON_TO_FORM_DATA: typeof JsonToFormData;
    STRING_TO_DATE_OBJECT: typeof StringToDateObject;
    PREPARE_API_FROM_ENV: typeof PrepareApiFromEnv,
    SET_FAV_ICON: typeof SetFavIcon,
    TO_NUMBER: typeof ToNumber,
    PREPARE_NAMESPACE: typeof PrepareNamespace,
}

const Functions: IFunctions = {
    /**
     * Register your function providers here
     */
    GET_PARAM: GetParam,
    VALIDATE_EMAIL_ADDRESS: ValidateEmailAddress,
    REMOVE_ENDING_SLASH: RemoveEndingSlash,
    CONVERT_DATE: ConvertDate,
    CONVERT_MYSQL_DATE: ConvertMysqlDateTime,
    CAPITALIZE: Capitalize,
    JSON_TO_FORM_DATA: JsonToFormData,
    STRING_TO_DATE_OBJECT: StringToDateObject,
    PREPARE_API_FROM_ENV: PrepareApiFromEnv,
    SET_FAV_ICON: SetFavIcon,
    TO_NUMBER: ToNumber,
    PREPARE_NAMESPACE: PrepareNamespace,
};

export {Functions as FUNCTIONS};
