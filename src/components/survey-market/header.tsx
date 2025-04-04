"use client";

import Input from "../ui/input";
import * as Styles from "./style";

export const SurveyMarketHeader = () => {
  return (
    <Styles.SurveyMarketHeaderWrapper>
      <Styles.Title>Explore Surveys</Styles.Title>
      <div>
        <Input tabIndex={0} type="text" search={true} placeholder="Search sourvey..." />
      </div>
    </Styles.SurveyMarketHeaderWrapper>
  );
};
