/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {Component} from "react";
import "./PersonDetailsInfo.scss";

class PersonDetailsInfo extends Component<any, any> {
    render() {
        try {
            const {user, email, address} = this.props.personInfo;
            return (
                <React.Fragment>
                    <div className="personal__info">
                        <h2> Personal Info</h2>

                        <div className="personal__info_details">
                            <div className="personal__info_details__left">
                                <div className="personal__info__single__info">
                                    <h2>Name:</h2>
                                    <p>{user.name}</p>
                                </div>
                                <div className="personal__info__single__info">
                                    <h2>Gender:</h2>
                                    <p>{user.gender}</p>
                                </div>
                                {/* <div className="personal__info__single__info">
                <h2>Age:</h2>
                <p>{age}</p>
              </div> */}
                                <div className="personal__info__single__info">
                                    <h2>Phone:</h2>
                                    <p>{user.phone}</p>
                                </div>
                                <div className="personal__info__single__info">
                                    <h2>Email:</h2>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="personal__info_details__right">
                                <div className="personal__info__single__info">
                                    <h2>Address:</h2>
                                    <p>{address}</p>
                                </div>
                                {this.props.personInfo.company_id ? (
                                    <div className="personal__info__single__info">
                                        <h2>Company Name:</h2>
                                        <p>{this.props.personInfo.manufacturer.name}</p>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* <div className="personal__info__single__info">
                <h2>Address:</h2>
                <p>{name}</p>
              </div> */}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } catch (e) {
            return <></>;
        }
    }
}

export default PersonDetailsInfo;
