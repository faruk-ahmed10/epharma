/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import CloseIcon from "@material-ui/icons/Close";
import React, { Component } from "react";
import "./Notification.scss";
class Notification extends Component<
  Partial<{
    open: boolean;
    onClose(): any;
    message: string;
    icon: React.ReactNode;
    msgClass: string;
    activeTitle: string;
  }>,
  {}
> {
  render() {
    return (
      <>
        {typeof this.props.open !== "undefined" && this.props.open && (
          <div
            className={"notification notification__bg--" + this.props.msgClass}
          >
            <div className="notification__info">
              <div className="notification__info__left">
                <div
                  className={
                    "notification__info__left--icon icon__" +
                    this.props.msgClass
                  }
                >
                  {this.props.icon}
                </div>
              </div>
              <div className="notification__info__middle">
                <h2 className="notification__info__middle--message">
                  {this.props.message}
                </h2>
              </div>
              <div
                className="notification__right"
                onClick={() => {
                  if (typeof this.props.onClose === "function") {
                    this.props.onClose();
                  }
                }}
              >
                <CloseIcon />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default Notification;
