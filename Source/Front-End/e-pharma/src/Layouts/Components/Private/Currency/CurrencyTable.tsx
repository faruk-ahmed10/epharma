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
import React, { Component } from "react";
import Button from "../../../../Layouts/Components/Private/Common/Button";
import "./CurrencyTable.scss";

class CurrencyTable extends Component<any, any> {
  render(): React.ReactNode {
    return (
      <div>
        <div className="category-table-wrap">
          <table className="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Abbreviation</th>
                <th>Code</th>
                <th>Sign</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {typeof this.props.Data !== "undefined" &&
                this.props.Data.map((data: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.abbr}</td>
                    <td>{data.code}</td>
                    <td>{data.sign}</td>
                    <td>
                      <Button
                        label={<EditIcon />}
                        title="Edit"
                        className="cbtn--sm cbtn--edit mr-2"
                        onClick={() =>
                          this.props.onEdit(
                            data.id,
                            data.name,
                            data.abbr,
                            data.code,
                            data.sign,
                          )
                        }
                      />

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

export default CurrencyTable;
