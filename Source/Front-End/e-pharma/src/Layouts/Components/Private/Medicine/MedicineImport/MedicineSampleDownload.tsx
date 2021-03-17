/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React, { Component } from "react";
import { APP } from "../../../../../App/Init/App.Init";
import Button from "../../Common/Button";
import "./MedicineImport.scss";
class MedicineSampleDownload extends Component<any, any> {
  public state: any;

  public constructor(props: any) {
    super(props);
    this.state = {
      medicineInfo: [],
    };
    this.handleGetMedicine = this.handleGetMedicine.bind(this);
  }

  private handleGetMedicine(): void {
    APP.SERVICES.HTTP_REQUEST.send(
      "get",
      "/medicine-file/download",
      {},
      {},
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log("error");
      }
    );
  }

  public componentDidMount(): void {
    this.handleGetMedicine();
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="DownloadFileInfo">
            <div className="DownloadFileInfo__head">
              <h2>File Information (EXCEL)</h2>
            </div>
            <div className="DownloadFileInfo__body">
              <div className="ownloadFileInfo__body__details">
                <p>
                  The first line in downloaded Excel file should remain as it
                  is. Please do not change the order of columns.
                </p>
                <Button
                  label="Dowenload Sample File"
                  className="cbtn--lg cbtn--info ml-2 mt-5"
                  icon={<ArrowDownwardIcon />}
                  onClick={this.handleGetMedicine}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default MedicineSampleDownload;
