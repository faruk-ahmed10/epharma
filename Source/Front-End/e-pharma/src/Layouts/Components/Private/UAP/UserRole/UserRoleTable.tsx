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
import {APP} from "../../../../../App/Init/App.Init";
import Button from "../../Common/Button";
import SettingsIcon from '@material-ui/icons/Settings';
import "./UserRoleTable.scss";

class UserRoleTable extends Component<any, any> {
    public render(): React.ReactNode {
        return (
            <div>
                <div className="uap__header-table-wrap">
                    <table className="uap__header-table">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Role Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof this.props.Data !== "undefined" &&
                        this.props.Data.map((data: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>
                                    <Button
                                        label={<SettingsIcon/>}
                                        title="Set Permissions"
                                        className="cbtn--sm cbtn--green mr-2"
                                        onClick={() => this.props.onPermissionSetup(data.id, data.name, data.modules)}
                                    />
                                    <Button
                                        label={<EditIcon/>}
                                        title="Edit"
                                        className="cbtn--sm cbtn--edit mr-2"
                                        onClick={() =>
                                            this.props.onEdit(data.id, data.name, data.status)
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

export default APP.SERVICES.CORE.ROUTER.withRouter(UserRoleTable);
