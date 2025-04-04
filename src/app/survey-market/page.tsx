"use client";

import { SurveyMarketHeader } from "@/components/survey-market/header";
import { SurveyCard } from "@/components/survey-market/survey-card";
import { SurveyData } from "@/types/json";
import * as Styles from "@/components/survey-market/style";

const SurveyMarket = () => {
  return (
    <div>
      <SurveyMarketHeader />
      <div>
        <h1></h1>
        <Styles.CardWrapper>
          {SurveyData.map((survey) => (
            <SurveyCard key={survey.id} {...survey} />
          ))}
        </Styles.CardWrapper>
      </div>
    </div>
  );
};

export default SurveyMarket;
