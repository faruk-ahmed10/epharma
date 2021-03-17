/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {Component} from "react";
import Button from "../Common/Button";

class LeaveTable extends Component<any, any> {
    public render(): React.ReactNode {
        console.log(this.props.Leaves);

        return (
            <div>
                <div className="category-table-wrap">
                    <table className="category-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee Name</th>
                            <th>Leave Purpose</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof this.props.Leaves !== "undefined" &&
                        this.props.Leaves.map((data: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.employee_id ? data.employee.name : ''}</td>
                                <td>{data.leave_purpose.name}</td>
                                <td>{data.start_date}</td>
                                <td>{data.end_date}</td>
                                <td>{data.note}</td>

                                <td>
                                    <Button
                                        label={<EditIcon/>}
                                        title="Edit"
                                        className="cbtn--sm cbtn--edit mr-2"
                                        onClick={() =>
                                            this.props.onEdit(
                                                data.id,
                                                data.employee_id,
                                                data.leave_purpose_id,
                                                data.start_date,
                                                data.end_date,
                                                data.note,
                                            )
                                        }
                                    />


                                    <Button
                                        label={<DeleteIcon/>}
                                        title="Inactive"
                                        className="cbtn--sm cbtn--danger mr-2"
                                        onClick={() => this.props.onDelete(data.id)}
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

export default LeaveTable;
