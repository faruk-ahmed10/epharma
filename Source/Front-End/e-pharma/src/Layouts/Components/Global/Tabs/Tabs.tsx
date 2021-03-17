/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, { ReactElement, useState } from "react";
import "./Tabs.scss";
import TabTitle from "./TabTitle";
type Props = {
  children: ReactElement[];
};
const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <div className="Tab">
      <ul className="Tab__menu">
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={(index: number) => {
              setSelectedTab(index);
              setActiveTabIndex(index);
            }}
            activeTabIndex={activeTabIndex}
          />
        ))}
      </ul>
      <div className="Tab__content">{children[selectedTab]}</div>
    </div>
  );
};

export default Tabs;
