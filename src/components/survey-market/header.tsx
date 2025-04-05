"use client";

import { useState } from "react";
import Input from "../ui/input";
import * as Styles from "./style";

export const SurveyMarketHeader = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Active", "Finished"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <Styles.SurveyMarketHeaderWrapper>
      <Styles.Title>Explore Surveys</Styles.Title>
      <div>
        <Input
          tabIndex={0}
          type="text"
          search={true}
          placeholder="Search sourvey..."
        />
      </div>
      <Styles.TabBarContainer>
        {tabs.map((tab) => (
          <Styles.Tab
            key={tab}
            $active={activeTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </Styles.Tab>
        ))}
      </Styles.TabBarContainer>
    </Styles.SurveyMarketHeaderWrapper>
  );
};
