import React from "react";
import "./style.css";
import { TabsPropType, PropType, TabProps } from "../types";
import { useTabsContext, TabsContext } from "../context";
/**
 * Parent Component
 * @param children
 * @returns JSX Element
 */

const Tabs = ({ children }: TabsPropType) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const onChange = React.useCallback(
    (tabKey: number) => setActiveTab(tabKey),
    []
  );
  const value = React.useMemo(
    () => ({ activeTab, onChange }),
    [activeTab, onChange]
  );
  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};
/**
 * Tabs Headers
 * @param children tabs list
 * @returns JSX Element
 */
const TabList = ({ children }: PropType) => {
  const handleChange = useTabsContext();
  const tabList = React.Children.map(children, (child, index) => {
    if (!React.isValidElement<TabProps>(child)) {
      return null;
    }
    return React.cloneElement(child, {
      onClick: () => handleChange?.onChange(index),
      isActive: handleChange?.activeTab === index,
    });
  });
  return <div className="tab-list">{tabList}</div>;
};
/**
 * Tab
 * @param children
 * @param onClick Function
 * @param isActive for active tab
 * @returns JSX Element
 */
const Tab = ({ children, onClick, isActive }: PropType) => {
  return (
    <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
      {children}
    </div>
  );
};
/**
 * Tab Panels
 * @param children tab container content
 * @returns JSX Element
 */
const TabPanels = ({ children }: PropType) => {
  const activeTab = useTabsContext();
  const tabPanels = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return activeTab?.activeTab === index ? child : null;
  });
  return <div className="tab-panels">{tabPanels}</div>;
};
/**
 * Tab Panel
 * @param children tab  content
 * @returns JSX Element
 */
const Panel = ({ children }: PropType) => {
  return <div className="tab-panel">{children}</div>;
};
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.Panel = Panel;
export default Tabs;
