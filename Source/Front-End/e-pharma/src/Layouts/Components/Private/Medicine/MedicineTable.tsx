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
import InfoIcon from "@material-ui/icons/Info";

import React, {Component} from "react";
import {APP} from "../../../../App/Init/App.Init";
import Button from "../Common/Button";
import {Link} from "react-router-dom";

class MedicineTable extends Component<any, any> {
    render() {
        return (
            <div>
                <div className="category-table-wrap">
                    <table className="category-table">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Image</th>
                            <th>Medicine Name</th>
                            <th>Generic Name</th>
                            <th>Barcode</th>
                            <th>Expire Date</th>
                            <th>Total Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof this.props.Data !== "undefined" &&
                        this.props.Data.map((data: any, index: number) => (
                            <tr key={index}>
                                <td>{data.code}</td>
                                <td>
                                    {data.image !== null ? (
                                        <img
                                            className={"img-50"}
                                            src={
                                                APP.CONFIG.API_CONFIG.CDN_ROOT + "/" + data.image
                                            }
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className={"img-50"}
                                            src="https://ctt.trains.com/sitefiles/images/no-preview-available.png"
                                            alt=""
                                        />
                                    )}
                                </td>
                                <td>{data.medicine_name}</td>
                                <td>{data.generic_name}</td>
                                <td>{data.barcode}</td>
                                <td>{data.expire_date}</td>
                                <td>{data.quantity}</td>
                                <td>{data.status}</td>
                                <td>
                                    <Button
                                        label={<EditIcon/>}
                                        className="cbtn--sm cbtn--primary mr-2"
                                        onClick={() =>
                                            this.props.history.push(
                                                APP.ROUTES.PRIVATE.MEDICINE_EDIT + "/" + data.id
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

                                    <Button
                                        label={<DeleteIcon/>}
                                        className="cbtn--sm cbtn--danger mr-2 "
                                        onClick={() => this.props.onDelete(data.id)}
                                    />

                                    <Link
                                        to={APP.ROUTES.PRIVATE.MEDICINE_DETAILS + "/" + data.id}
                                        className="cbtn cbtn--sm cbtn--info "
                                    >
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

export default APP.SERVICES.CORE.ROUTER.withRouter(MedicineTable);
