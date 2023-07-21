import React, { ReactElement } from "react";
export type TabsPropType = {
  children: React.ReactNode;
};
export type TabsContextType = {
  activeTab: number | any;
  onChange: (key: number) => void;
};
export type PropType = {
  children: React.ReactNode;
  onClick?: () => void;
   isActive?:boolean
};

export type TabProps = {
  onClick?: () => void;
  children: ReactElement;
   isActive?:boolean
};
