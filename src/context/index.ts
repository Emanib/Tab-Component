import React from "react";
import {  TabsContextType,  } from "../types";

export const TabsContext = React.createContext<TabsContextType | null>(null);
export function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) return;
  return context;
}