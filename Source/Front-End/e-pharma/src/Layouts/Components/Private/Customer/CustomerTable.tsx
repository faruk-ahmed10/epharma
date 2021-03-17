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
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {APP} from "../../../../App/Init/App.Init";
import Button from "../Common/Button";
import "./CustomerTable.scss";

// import "./CategoryTable.scss";

class CustomerTable extends Component<any, any> {
    public render(): React.ReactNode {
        // console.log(this.props);
        return (
            <div>
                <div className="category-table-wrap">
                    <table className="category-table">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof this.props.Data !== "undefined" &&
                        this.props.Data.map((data: any, index: number) => (
                            <tr key={index}>
                                <td>{data.code}</td>
                                <td>{data.name}</td>
                                <td>{data.phone}</td>
                                <td>{data.email}</td>
                                <td>{data.status}</td>
                                <td>
                                    {/* <button
                        className={"edit-btn"}
                        onClick={() =>
                          this.props.onEdit(data.id, data.name, data.status)
                        }
                      >
                        <EditIcon />
                      </button> */}
                                    <Button
                                        label={<EditIcon/>}
                                        title="Edit"
                                        className="cbtn--sm cbtn--edit mr-2"
                                        onClick={() =>
                                            this.props.onEdit(
                                                data.id,
                                                data.name,
                                                data.phone,
                                                data.email,
                                                data.status,
                                                data.address
                                            )
                                        }
                                    />
                                    {data.status === "Active" ? (
                                        <Button
                                            label={<ArrowUpwardOutlinedIcon/>}
                                            title="Inactive"
                                            className="cbtn--sm cbtn--primary mr-2 "
                                            onClick={() => this.props.onInactive(data.id)}
                                        />
                                    ) : (
                                        // <button
                                        //   className={"delete-btn"}
                                        //   onClick={() => this.props.onInactive(data.id)}
                                        //   title="Inactive"
                                        // >
                                        //   <ArrowUpwardOutlinedIcon />
                                        // </button>
                                        <Button
                                            label={<ArrowDownwardOutlinedIcon/>}
                                            title="Active"
                                            className="cbtn--sm cbtn--warning mr-2 "
                                            onClick={() => this.props.onActive(data.id)}
                                        />
                                        // <button
                                        //   className={"delete-btn"}
                                        //   onClick={() => this.props.onActive(data.id)}
                                        //   title="Active"
                                        // >
                                        //   <ArrowDownwardOutlinedIcon />
                                        // </button>
                                    )}
                                    {/*
                      <button
                        className={"delete-btn"}
                        onClick={() => this.props.onDelete(data.id)}
                      >
                        <DeleteIcon />
                      </button> */}
                                    <Button
                                        label={<DeleteIcon/>}
                                        title="Inactive"
                                        className="cbtn--sm cbtn--danger mr-2"
                                        onClick={() => this.props.onDelete(data.id)}
                                    />

                                    <Link
                                        to={APP.ROUTES.PRIVATE.CUSTOMER_DETAILS + "/" + data.id}
                                        className="cbtn cbtn--sm cbtn--info "
                                    >
                                        {" "}
                                        <InfoIcon/>
                                    </Link>
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

export default CustomerTable;
