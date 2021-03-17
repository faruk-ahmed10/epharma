/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, { Component } from "react";
import "./DashCard.scss";

class DashCard extends Component<Partial<{
    backgroundColor: string,
    color: string,
    image: string,
    cardTitle: string,
    value: any,
}>, {}> {
    render(){
        return(
            <div>
                <div className={"card-area"}>
                    <div className="abs" {...(typeof this.props.backgroundColor !== 'undefined' || this.props.backgroundColor !== '' ) ? {style: {background: this.props.backgroundColor}}: null}><img src={this.props.image} alt=""/></div>
                    <div className="card-text-content">
                        <h3 {...(typeof this.props.color !== 'undefined' || this.props.color !== '' ) ? {style: {color: this.props.color}}: null}>{this.props.value}</h3>
                        <span>{this.props.cardTitle}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashCard;