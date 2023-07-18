import React from "react";
import { TabsPropType, PropType, TabProps } from "../types";
import { useTabsContext, TabsContext } from "../context";
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
const TabList = ({ children }: PropType) => {
  const handleChange = useTabsContext();
  const tabList = React.Children.map(children, (child, index) => {
    if (!React.isValidElement<TabProps>(child)) {
      return null;
    }
    return React.cloneElement(child, {
      onClick: () => handleChange?.onChange(index),
    });
  });
  return <div className="tab-list">{tabList}</div>;
};
const Tab = ({ children, onClick }: PropType) => {
  return (
    <div className="tab" onClick={onClick}>
      {children}
    </div>
  );
};
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
const Panel = ({ children }: PropType) => {
  return <div className="tab-panel">{children}</div>;
};
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.Panel = Panel;
export default Tabs;
