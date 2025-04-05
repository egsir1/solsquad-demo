"use client";

import { SurveyList } from "@/components/survey-market/survey-list";

export default function SurveyMarketPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Surveys</h1>
      <SurveyList />
    </main>
  );
}

