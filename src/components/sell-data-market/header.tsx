// components/Header.tsx
"use client";

import { useState } from "react";
import * as Styles from "./style";
import Input from "../ui/input";

// Types
interface FilterState {
  search: string;
  type: "ALL" | "FREE" | "PAID";
  showAll: boolean;
  showNotSold: boolean;
  sort: "price-asc" | "price-desc" | "date-asc" | "date-desc";
}

const Header: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    search: "",
    type: "ALL",
    showAll: true,
    showNotSold: false,
    sort: "date-desc",
  });

  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Active", "Finished"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState((prev) => ({
      ...prev,
      type: e.target.value as "ALL" | "FREE" | "PAID",
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState((prev) => ({
      ...prev,
      sort: e.target.value as
        | "price-asc"
        | "price-desc"
        | "date-asc"
        | "date-desc",
    }));
  };

  return (
    <Styles.HeaderContainer>
      <Styles.TitleSection>
        <Styles.MarketTitle>Market for Selling Data</Styles.MarketTitle>
        <Styles.MarketDescription>
          This is a marketplace for selling data. You can list your data here
          and set a price for it. Other users can browse the marketplace and
          purchase the data they are interested in.
        </Styles.MarketDescription>
      </Styles.TitleSection>
      <Styles.FilterSection>
        <div>
          <Input
            tabIndex={0}
            type="text"
            search={true}
            placeholder="Search sourvey..."
          />
        </div>
        <div>
          <Styles.SelectWrapper>
            <Styles.FilterSelect
              value={filterState.type}
              onChange={handleTypeChange}
            >
              <option value="ALL">All Types</option>
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </Styles.FilterSelect>
          </Styles.SelectWrapper>
          <Styles.SortWrapper>
            <Styles.SortSelect
              value={filterState.sort}
              onChange={handleSortChange}
            >
              <option value="price-asc">Oldest</option>
              <option value="desc">Lates </option>
            </Styles.SortSelect>
          </Styles.SortWrapper>
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
        </div>
      </Styles.FilterSection>
    </Styles.HeaderContainer>
  );
};

export default Header;
