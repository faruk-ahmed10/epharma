/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "../../Common/Button";

class AccountingHistoryTable extends Component<any, any> {
    public render(): React.ReactNode {
        return (
            <div>
                <div className="category-table-wrap">
                    <table className="category-table">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Date</th>
                            <th>Comment</th>
                            <th style={{textAlign: "center"}}>Total Amount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof this.props.Data !== "undefined" &&
                        this.props.Data.map((data: any, index: number) => (
                            <tr key={index}>
                                <td>{data.code}</td>
                                <td>{data.document_date}</td>
                                <td>{data.comment}</td>
                                <td style={{textAlign: "right"}}>{Number(data.total_amount).toFixed(2)}</td>
                                <td>
                                    <Button
                                        label={<EditIcon/>}
                                        title="Edit"
                                        className="cbtn--sm cbtn--edit mr-2"
                                        onClick={() => this.props.onEdit(data.id)}
                                    />

                                    <Button
                                        label={<DeleteIcon/>}
                                        title="Inactive"
                                        className="cbtn--sm cbtn--danger mr-2"
                                        onClick={() => {
                                            if(window.confirm('Are you sure?')) {
                                                this.props.onDelete(data.id)
                                            }
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AccountingHistoryTable;
