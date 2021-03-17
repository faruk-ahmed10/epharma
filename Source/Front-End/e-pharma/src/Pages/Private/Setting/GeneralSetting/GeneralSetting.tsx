/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, {Component} from "react";
import {APP} from "../../../../App/Init/App.Init";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import "./GeneralSetting.scss";

class GeneralSetting extends Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DialogOpen: false,

            Currencies: [],
            Taxes: [],
            Settings: {
                phone: '',
                email: '',
                pharmacy: {
                    pharmacy_name: '',
                    email: '',
                },
                vat_id: 0,
                currency: {
                    name: '',
                },

                state: '',
                city: '',
                address: '',
            },

            logo: '',
            favIcon: '',

            GeneralSettingsFormDialogOpen: false,
            message: "",
            msgClass: "",
            icon: {},
            NotificationOpen: false,
        };

        this.handleGetCurrencies = this.handleGetCurrencies.bind(this);
        this.handleGetTaxes = this.handleGetTaxes.bind(this);
        this.handleSaveGeneralSettings = this.handleSaveGeneralSettings.bind(this);
        this.handleGetGeneralSetting = this.handleGetGeneralSetting.bind(this);
    }

    private handleGetCurrencies(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/currencies",
            {},
            {},
            (data: any) => {
                this.setState({
                    Currencies: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Currencies!");
            }
        );
    }

    private handleGetGeneralSetting(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/general/settings",
            {},
            {},
            (data: any) => {
                this.setState((state: any) => ({
                    Settings: {
                        ...state.Settings,
                        ...data.data,
                    },
                }));
            },
            (error: any) => {
                alert("Failed to load the General Settings");
            }
        );
    }

    private handleGetTaxes(): void {
        APP.SERVICES.HTTP_REQUEST.send(
            "get",
            "/taxes",
            {},
            {},
            (data: any) => {
                this.setState({
                    Taxes: data.data,
                });
            },
            (error: any) => {
                alert("Failed to load the Taxes!");
            }
        );
    }

    private handleSaveGeneralSettings(): void {

        const __data: any = {
            data: JSON.stringify(this.state.Settings),
            logo: this.state.logo,
            favIcon: this.state.favIcon,
        };


        const formData: any = new FormData();
        for (let key in __data) {
            formData.append(key, __data[key]);
        }

        APP.SERVICES.HTTP_REQUEST.send(
            "post",
            "/general/update",
            {},
            formData,
            (data: any) => {

                APP.SERVICES.AUTH_USER.fetchAuthUser();

                this.setState({
                    NotificationOpen: true,
                    message: "Data Successfully Added!",
                    msgClass: "success",
                    icon: <CheckBoxIcon/>,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            },
            (error: any) => {
                this.setState({
                    NotificationOpen: true,
                    message: "Something Wrong!",
                    msgClass: "danger",
                    icon: <ErrorOutlineIcon/>,
                });
                setTimeout(() => {
                    this.setState({
                        NotificationOpen: false,
                    });
                }, 3000);
            }
        );
    }

    public componentDidMount(): void {
        this.handleGetCurrencies();
        this.handleGetTaxes();
        this.handleGetGeneralSetting();
    }

    render(): React.ReactNode {
        return (
            <div>
                <Notification
                    open={this.state.NotificationOpen}
                    onClose={() => this.setState({NotificationOpen: false})}
                    message={this.state.message}
                    icon={this.state.icon}
                    msgClass={this.state.msgClass}
                />

                <Breadcrumb title={"Setting"} activeTitle={"GeneralSettings"}/>

                <div className="SettingWrapper">
                    <div className="SingleCard">
                        <div className="SingleCard__header">
                            <h2>
                                Pharmacy Info<abbr>*</abbr>
                            </h2>
                        </div>
                        <div className="SingleCard__body">
                            <div className="TwoInputField">
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_name">
                                        Pharmacy Name<abbr>*</abbr>
                                    </label>
                                    <input
                                        id="pharmacy_name"
                                        className={"cat-dialog"}
                                        type={"text"}
                                        placeholder={"Pharmacy Name *"}
                                        value={this.state.Settings.pharmacy.pharmacy_name}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    pharmacy: {
                                                        ...state.Settings.pharmacy,
                                                        pharmacy_name: e.target.value,
                                                    }
                                                }
                                            }))
                                        }}
                                    />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_account">
                                        Pharmacy Account Mail
                                    </label>
                                    <input
                                        id="pharmacy_account"
                                        className={"cat-dialog"}
                                        type={"text"}
                                        placeholder={"Pharmacy Account Mail *"}
                                        value={this.state.Settings.pharmacy.email}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    pharmacy: {
                                                        ...state.Settings.pharmacy,
                                                        email: e.target.value,
                                                    }
                                                }
                                            }))
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="TwoInputField">
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_name">
                                        Logo<abbr>*</abbr>
                                    </label>
                                    <input
                                        id="pharmacy_name"
                                        className={"cat-dialog"}
                                        type={"file"}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                logo: e.target.files[0],
                                            }))
                                        }}
                                    />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_account">
                                        Fav<abbr>*</abbr>
                                    </label>
                                    <input
                                        id="pharmacy_account"
                                        className={"cat-dialog"}
                                        type={"file"}
                                        placeholder={"General SettingsName *"}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                favIcon: e.target.files[0],
                                            }))
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="SingleCard">
                        <div className="SingleCard__header">
                            <h2>
                                General Settings<abbr>*</abbr>
                            </h2>
                        </div>
                        <div className="SingleCard__body">
                            <div className="TwoInputField">
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_name">
                                        Phone<abbr>*</abbr>
                                    </label>
                                    <input
                                        id="pharmacy_name"
                                        className={"cat-dialog"}
                                        type={"text"}
                                        placeholder={"Phone *"}
                                        value={this.state.Settings.phone}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    phone: e.target.value,
                                                }
                                            }))
                                        }}
                                    />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_account">
                                        Email<abbr>*</abbr>
                                    </label>
                                    <input
                                        id="pharmacy_account"
                                        className={"cat-dialog"}
                                        type={"text"}
                                        placeholder={"Email *"}
                                        value={this.state.Settings.email}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    email: e.target.value,
                                                }
                                            }))
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="TwoInputField">
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_name">Tax</label>
                                    <select
                                        value={this.state.Settings.vat_id !== null ? this.state.Settings.vat_id : 0}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    vat_id: e.target.value,
                                                }
                                            }))
                                        }}>
                                        <option>Select One</option>
                                        {typeof this.state.Taxes !== "undefined" &&
                                        this.state.Taxes.map((data: any, index: any) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_account">Currency</label>
                                    <select
                                        value={this.state.Settings.currency !== null && typeof this.state.Settings.currency.name !== 'undefined' ? this.state.Settings.currency.name : ''}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    currency: {
                                                        ...state.Settings.currency,
                                                        name: e.target.value,
                                                    },
                                                }
                                            }))
                                        }}>
                                        <option>Select One</option>
                                        {typeof this.state.Currencies !== "undefined" &&
                                        this.state.Currencies.map((data: any, index: any) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="TwoInputField">
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_name">State</label>
                                    <input
                                        id="pharmacy_account"
                                        className={"cat-dialog"}
                                        type={"text"}
                                        placeholder={"State "}
                                        value={this.state.Settings.state}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    state: e.target.value,
                                                }
                                            }))
                                        }}
                                    />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="pharmacy_account">City</label>
                                    <input
                                        id="pharmacy_account"
                                        className={"cat-dialog"}
                                        type={"text"}
                                        placeholder={"City"}
                                        value={this.state.Settings.city}
                                        onChange={(e: any) => {
                                            this.setState((state: any) => ({
                                                Settings: {
                                                    ...state.Settings,
                                                    city: e.target.value,
                                                }
                                            }))
                                        }}
                                    />
                                </div>
                            </div>
                            <textarea placeholder="Address*" value={this.state.Settings.address} onChange={(e) => {
                                this.setState((state: any) => ({
                                    Settings: {
                                        ...state.Settings,
                                        address: e.target.value,
                                    }
                                }))
                            }}/>

                            <Button
                                label="Update General Setting"
                                className="cbtn--lg cbtn--green icon_padd mt-3"
                                onClick={this.handleSaveGeneralSettings}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(GeneralSetting);
