/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, { Component } from "react";
import { APP } from "../../../../App/Init/App.Init";
import Notification from "../../../../Layouts/Components/Global/Notification/Notification";
import Breadcrumb from "../../../../Layouts/Components/Private/Common/Breadcrumb";
import MedicineImportFile from "../../../../Layouts/Components/Private/Medicine/MedicineImport/MedicineImportFile";
import MedicineSampleDownload from "../../../../Layouts/Components/Private/Medicine/MedicineImport/MedicineSampleDownload";

class MedicineImport extends Component {
  public state: any;
  public constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Notification
          open={this.state.NotificationOpen}
          onClose={() => this.setState({ NotificationOpen: false })}
          message={this.state.message}
          icon={this.state.icon}
          msgClass={this.state.msgClass}
        />
        <Breadcrumb title={"Medicine"} activeTitle={"Add New Medicine"} />
        <MedicineSampleDownload />
        <MedicineImportFile />
      </React.Fragment>
    );
  }
}
export default APP.SERVICES.CORE.ROUTER.withRouter(MedicineImport);
