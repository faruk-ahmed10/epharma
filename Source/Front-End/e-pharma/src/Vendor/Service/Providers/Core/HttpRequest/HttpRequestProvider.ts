/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import axios from "axios";
import {ApiConfig} from "../../../../../App/Config/Api.Config";
import {AuthProvider} from "../../Auth/Auth.Provider";
import {Forbidden} from "../../../../Exceptions/Forbidden.Exception";

export class HTTPRequestProvider {
    public static send(
        type: "get" | "post" | "delete",
        route: string,
        config: object,
        data: object,
        onSuccess: any = null,
        onError: any = null
    ) {
        let Axios,
            axiosConfig = {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                    ...config,
                },
            };

        if (type === "get" || type === "delete") {
            Axios = axios[type](ApiConfig.API_ROOT + route, axiosConfig);
        } else {
            Axios = axios.post(ApiConfig.API_ROOT + route, data, axiosConfig);
        }

        return Axios.then(({data}: any) => {
            if (data.success) {
                if (typeof onSuccess === "function") {
                    onSuccess(data);
                }
            } else {
                throw new Error(data.message);
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    Forbidden();
                    return;
                }
            }

            if (typeof onError === "function") {
                return onError(error);
            }

            alert(error);
        });
    }
}
