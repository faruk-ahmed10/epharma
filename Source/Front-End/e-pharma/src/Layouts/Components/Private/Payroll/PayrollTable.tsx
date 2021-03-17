/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, {Component} from 'react';
import Button from "../Common/Button";

class PayrollTable extends Component<any, any> {
    public render(): React.ReactNode {
        return (
            <div>
                <div className="category-table-wrap">
                    <table className="category-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee Name</th>
                            <th>Date</th>
                            <th>Basic</th>
                            <th>Bonus</th>
                            <th>Overtime Salary</th>
                            <th>Deduction</th>
                            <th>Net Pay</th>
                            <th>Status</th>
                            <th>Payment Date</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof this.props.Payrolls !== "undefined" &&
                        this.props.Payrolls.map((data: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.employee_id ? data.employee.name : ''}</td>
                                <td>{data.month} - {data.year}</td>
                                <td>{data.basic}</td>
                                <td>{data.bonus}</td>
                                <td>{data.overtime}</td>
                                <td>{data.deduction}</td>
                                <td>{data.net_pay}</td>
                                <td>{data.status}</td>
                                <td>{data.payment_date}</td>

                                <td>
                                    <Button
                                        label={<EditIcon/>}
                                        title="Edit"
                                        className="cbtn--sm cbtn--edit mr-2"
                                        onClick={() =>
                                            this.props.onEdit(
                                                data.id,
                                                data.employee_id,
                                                data.month,
                                                data.year,
                                                data.basic,
                                                data.bonus,
                                                data.overtime,
                                                data.deduction,
                                                data.net_pay,
                                                data.status,
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

export default PayrollTable;