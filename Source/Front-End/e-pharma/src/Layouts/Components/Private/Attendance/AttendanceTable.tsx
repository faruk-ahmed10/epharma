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

class AttendanceTable extends Component<any, any> {
    render(): React.ReactNode {
        return (
            <div>
                <div className="category-table-wrap">
                    <table className="category-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Employee Name</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof this.props.Data !== "undefined" &&
                        this.props.Data.map((data: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.date}</td>
                                <td>{data.employee.name}</td>
                                <td>{data.in_time_formated}</td>
                                <td>{data.out_time_formated}</td>
                                <td>
                                    <Button
                                        label={<EditIcon/>}
                                        title="Edit"
                                        className="cbtn--sm cbtn--edit mr-2"
                                        onClick={() =>
                                            this.props.onEdit(
                                                data.id,
                                                data.date,
                                                data.employee_id,
                                                data.in_time,
                                                data.out_time,
                                                data.note,
                                            )
                                        }
                                    />

                                    <Button
                                        label={<DeleteIcon/>}
                                        title="Inactive"
                                        className="cbtn--sm cbtn--danger "
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

export default AttendanceTable;
