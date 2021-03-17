/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from 'react';
import './Login.css';
import DoctorImg from './Sidelogo.png';
import SignInDes1 from './signinDes1.png';
import SignInDes2 from './signinDes2.png';
import {APP} from "../../../App/Init/App.Init";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            Email: '',
            Password: '',
        };
    }

    handleTryLogin(e) {
        e.preventDefault();

        APP.SERVICES.HTTP_REQUEST.send('post', '/auth/attempt', {}, {
            email: this.state.Email,
            password: this.state.Password,
        }, (data: any) => {
            new APP.SERVICES.AUTH().set(data.token);
            this.props.history.replace(APP.ROUTES.PRIVATE.ROOT);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={"Global-Container"}>

                    <div className={"login-background-img"}>
                        <img src={DoctorImg} alt=""/>
                    </div>

                    <div className={"login-form"}>
                        <div className="sign-top-design">
                            <img src={SignInDes1} alt=""/>
                        </div>
                        <div className="sign-bottom-design">
                            <img src={SignInDes2} alt=""/>
                        </div>


                        <form onSubmit={this.handleTryLogin.bind(this)}>
                            <h1 className={"sign-in-title"}>Sign in</h1>

                            {this.state.isLoading && (
                                <div>Loading...</div>
                            )}
                            <div className={"form-group input-padd"}>
                                <input className={"form-control "} type={"email"} placeholder={"Username"}
                                       value={this.state.Email}
                                       onChange={(e) => this.setState({Email: e.target.value})}/>
                            </div>
                            <div className={"form-group"}>
                                <input className={"form-control"} type={"password"} placeholder={"Password"}
                                       value={this.state.Password}
                                       onChange={(e) => this.setState({Password: e.target.value})}/>
                            </div>
                            <div className={"form-group"}>
                                {/* <input className={""} type={"checkbox"} placeholder={"Remember Me"} value={"Remember me"} /> Remember Me? */}
                                <a className={"forget-pass"} href={"#"}> Forget Password?</a>
                            </div>

                            <div className={"sign-in-btn"}>
                                <input className={""} type={"submit"} value={"Sign In"}/>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.ROUTER.withRouter(Login);