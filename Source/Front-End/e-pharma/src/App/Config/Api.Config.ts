/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import { PrepareApiFromEnv } from "../../Vendor/Functions/Core/PrepareApiFromEnv";

interface IApiConfig {
  APP_ROOT: string,
  API_ROOT: string,
  CDN_ROOT: string,
}

export const ApiConfig: IApiConfig = {
  APP_ROOT: PrepareApiFromEnv("http://localhost:3000", "http://epharma.edorpon.com"),
  API_ROOT: PrepareApiFromEnv("http://localhost:8000/api/v-1", "http://epharma.edorpon.com/api/public/api/v-1"),
  CDN_ROOT: PrepareApiFromEnv("https://edorpon.s3.ap-southeast-1.amazonaws.com/epharma", "https://edorpon.s3.ap-southeast-1.amazonaws.com/epharma"),
}