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

//   function handleTabChange(index) {
//     setActiveTab(index);
//   }

//   const tabs = React.Children.map(children, (child, index) => {
//     return React.cloneElement(child, {
//       index,
//       isActive: index === activeTab,
//       onTabChange: handleTabChange,
//     });
//   });

//   const tabContent = React.Children.map(children, (child, index) => {
//     return React.cloneElement(child, {
//       isActive: index === activeTab,
//     });
//   });

//   return (
//     <div>
//       <div>{tabs}</div>
//       <div>{tabContent}</div>
//     </div>
//   );
// }
// export default Tabs;

//the name of this context will be DataContext
// const DataContext = createContext({});

// function Tab({ id, children }) {
//   //extract the 'setActiveTabID` method from the DataContext state.
//   const [, setActiveTabID] = useContext(DataContext);
//   return (
//     <div>
//       <div onClick={() => setActiveTabID(id)}>{children}</div>
//     </div>
//   );
// }
// function TabPanel({ whenActive, children }) {
//   //get the 'activeTabID' state from DataContext.
//   const [activeTabID] = useContext(DataContext);
//   return <div>{activeTabID === whenActive ? children : null}</div>;
// }

// function TabSwitcher(props) {
//   const [activeTabID, setActiveTabID] = useState("a");
//   //since this component will provide data to the child components, we will use DataContext.Provider
//   return (
//     <DataContext.Provider value={[activeTabID, setActiveTabID]}>
//       {props.children}
//     </DataContext.Provider>
//   );
// }

// export default TabSwitcher;
// export { Tab, TabPanel };
