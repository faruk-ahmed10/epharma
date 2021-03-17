/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {IAuthProvider} from "./Auth.Provider.d";
import {HTTPRequestProvider} from "../Core/HttpRequest/HttpRequestProvider";
import {Store} from "../../../Utils/Data/Store";
import {SET_AUTH_USER} from "../../../Utils/Data/Actions/Global/AuthUser/AuthUser.Action";
import {SetFavIcon} from "../../../Functions/Core/SetFavIcon.Function";
import {ApiConfig} from "../../../../App/Config/Api.Config";

export class AuthProvider implements Required<IAuthProvider> {
    protected Identifier: string;
    protected LS: typeof window.localStorage;

    public constructor() {
        this.LS = window.localStorage;
        this.Identifier = '__token';
    }

    public set(token: string) {
        this.LS.setItem(this.Identifier, token);
    }

    public check(): boolean {
        const token: string | null | undefined = this.LS.getItem(this.Identifier);
        return typeof token !== 'undefined' && token !== '' && token !== null;
    }

    public getToken(): string {
        const token = this.LS.getItem(this.Identifier);
        return token === null ? '' : token;
    }

    public remove(): void {
        this.LS.removeItem(this.Identifier);
    }

    public static fetchAuthUser(): void {
        const HttpRequest = HTTPRequestProvider;

        HttpRequest.send('get', '/auth/user', {}, {}, ({data}: any) => {
            Store.dispatch(SET_AUTH_USER(data));

            //Update the application favIcon
            if(data.general_settings.fav_icon !== null) {
                SetFavIcon(ApiConfig.CDN_ROOT + '/' + data.general_settings.fav_icon);
            }

        }, (error: any) => {
            alert(error);
        });
    }

    public static getAuthUser(): object {
        return Store.getState().AUTH_USER;
    }
}