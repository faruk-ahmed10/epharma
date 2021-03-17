/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, { Component } from "react";
import Button from "../../Common/Button";
import "./MedicineImport.scss";

class MedicineImportFile extends Component<any, any> {
  public state: any;

  private readonly medicine_id: string | number | undefined | null;

  public constructor(props: any) {
    super(props);
    this.state = {
      medicineInfo: [],
      Loading: false,
    };
    this.handleSaveMedicine = this.handleSaveMedicine.bind(this);
  }

  private handleSaveMedicine(): void {
    this.setState({ Loading: true });
  }

  public componentDidMount(): void {}

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="DownloadFileInfo">
            <div className="DownloadFileInfo__head">
              <h2>New Medicine</h2>
            </div>
            <div className="DownloadFileInfo__body">
              <div style={{ maxWidth: "200px" }}>
                <label>Upload Excel File*</label>
                <input type="file" />
              </div>

              {this.state.Loading ? (
                <Button
                  label="Loading..."
                  disable={true}
                  className="cbtn--lg cbtn--danger"
                />
              ) : (
                <span className="Create_another_box mt-5">
                  <input
                    type="checkbox"
                    className="CheckboxBtn "
                    onClick={() => this.setState({ anOtherCreate: true })}
                  />
                  <span>Create Another</span>
                  <Button
                    label="Upload File"
                    className="cbtn--lg cbtn--primary ml-2"
                    onClick={this.handleSaveMedicine}
                  />{" "}
                </span>
              )}
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default MedicineImportFile;
