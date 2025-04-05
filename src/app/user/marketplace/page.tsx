"use client";

import Header from "@/components/sell-data-market/header";
import { SellData } from "@/types/json";
import React from "react";
import * as Styles from "@/components/sell-data-market/style";
import SellingDataCard from "@/components/sell-data-market/sell-card";

type Props = {};

const MarketPlacePage = (props: Props) => {
  return (
    <Styles.MarketContainer>
      <div>
        <Header />
      </div>
      <Styles.MarketBodyWrraper>
        {SellData.map((data) => (
          <SellingDataCard key={data.survey_id} {...data} />
        ))}
      </Styles.MarketBodyWrraper>
    </Styles.MarketContainer>
  );
};

export default MarketPlacePage;
