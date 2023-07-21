import React from "react";
import "./App.css";
import Tabs from "./components/Tabs";

function App() {
  return (
    <>
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab>One</Tabs.Tab>
          <Tabs.Tab>Two</Tabs.Tab>
          <Tabs.Tab>Three</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.Panel>
            <p>Tab one content!</p>
          </Tabs.Panel>
          <Tabs.Panel>
            <p>Tab two content!</p>
          </Tabs.Panel>
          <Tabs.Panel>
            <p>Tab three content!</p>
          </Tabs.Panel>
        </Tabs.TabPanels>
      </Tabs>
    </>
  );
}

export default App;
