/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, { Component } from "react";
import { APP } from "../../../../../App/Init/App.Init";
import "./PersonDetailsHeader.scss";
class PersonDetailsHeader extends Component<any, any> {
  render() {
    const {
      name,
      phone,
      email,
      gender,
      address,
      image,
      created_at,
    } = this.props.personInfo;
    return (
      <React.Fragment>
        <div className="PersonDetails__Header">
          <div className="PersonDetails__Header__img">
            {image !== null ? (
              <img
                className={"img-50"}
                src={APP.CONFIG.API_CONFIG.CDN_ROOT + "/" + image}
                alt=""
              />
            ) : (
              <img
                className={"img-50"}
                src="https://ctt.trains.com/sitefiles/images/no-preview-available.png"
                alt=""
              />
            )}
          </div>
          <div className="PersonDetails__Header__summary">
            <h2>{name}</h2>
            <ul className="PersonDetails__Header__summary__list">
              <li>
                <h4>Joining Date</h4>
                <span>{created_at}</span>
              </li>
              {this.props.personInfo.salary ? (
                <li>
                  <h4>Salary</h4>
                  <span>{this.props.personInfo.salary}</span>
                </li>
              ) : (
                ""
              )}

              {/* <li>
                <h4>Total Order</h4>
                <span>234</span>
              </li>
              <li>
                <h4>Total Due</h4>
                <span>234</span>
              </li> */}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default PersonDetailsHeader;
