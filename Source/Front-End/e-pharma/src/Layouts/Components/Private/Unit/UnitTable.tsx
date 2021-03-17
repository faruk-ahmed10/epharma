/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import React, {Component} from 'react';
import "./UnitTable.scss";

class UnitTable extends Component<any, any >{
    render(): React.ReactNode{
        return(
            <div>
                <div className="category-table-wrap">
                    <table className="category-table">
                        <thead>
                            <tr>
                                <th>Unit ID</th>
                                <th>Unit Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeof this.props.Data !== "undefined" &&
                                this.props.Data.map((data: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td> 
                                    <td>{data.name}</td>
                                    <td>{data.status}</td>
                                    <td>
                                        <Button
                                            label={<EditIcon />}
                                            title="Edit"
                                            className="cbtn--sm cbtn--edit mr-2"
                                            onClick={() =>
                                            this.props.onEdit(data.id, data.name, data.status)
                                            }
                                        />

                                        {data.status === "Active" ? (
                                        <Button
                                        label={<ArrowUpwardOutlinedIcon />}
                                        title="Inactive"
                                        className="cbtn--sm cbtn--primary mr-2 "
                                        onClick={() => this.props.onInactive(data.id)}
                                        />
                                        ) : (
                                        <Button
                                        label={<ArrowDownwardOutlinedIcon />}
                                        title="Active"
                                        className="cbtn--sm cbtn--warning mr-2 "
                                        onClick={() => this.props.onActive(data.id)}
                                        />)}
                                        

                                        <Button
                                        label={<DeleteIcon />}
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

export default UnitTable;
