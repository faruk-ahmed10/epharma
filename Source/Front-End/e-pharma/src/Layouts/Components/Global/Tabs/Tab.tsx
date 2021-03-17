/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from "react";

type Props = {
  title: string;
};

const Tab: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
export default Tab;
