/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import { css } from "@emotion/css";
import $ from "jquery";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { APP } from "../../../../App/Init/App.Init";

const __css_DatePickerTextField = css(`
    position: relative;
    
    & .react-datepicker-wrapper {
        height: 0;
    }
    
    & .react-datepicker__input-container input {
        width: 0;
        height: 0;
        position: fixed;
        border: 0;
        padding: 0;
        margin: 0;
        top: -100%;
    }
`);

const DatePickerTextField = ({
  label,
  value,
  onChange,
}: Required<{
  label: string;
  value: string;
  onChange(date: any): any;
}>) => {
  React.useEffect((): any => {
    $(".DatePickerTextField").click(function () {
      $(this).find(".react-datepicker__input-container input").focus();
    });
  });

  return (
    <React.Fragment>
      <div className={"DatePickerTextField" + " " + __css_DatePickerTextField}>
        <div className="Form__control">
          <input
            type="text"
            placeholder={label}
            value={APP.FUNCTIONS.CONVERT_DATE(value, "dd-mm-yyyy")}
          />
        </div>

        {/*<TextField defaultValue={""} value={APP.FUNCTIONS.CONVERT_DATE(value, 'dd-mm-yyyy')} type={"text"}
                           name={name} label={label}
                           onChange={() => {
                           }} labelIconNode={<i className={"fa fa-calendar"}/>}/>*/}
        <DatePicker onChange={(date) => onChange(date)} />
      </div>
    </React.Fragment>
  );
};

export { DatePickerTextField as Datepicker };
