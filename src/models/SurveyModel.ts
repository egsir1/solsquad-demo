export interface SurveyModel {
  surveyId: string;
  title: string;
  creator: string;
  questions: {
    question: string;
    options: string[];
  }[];
  reward: {
    amount: number;
    token: string;
  };
  createdAt: string;
  status: "ACTIVE" | "COMPLETED" | "EXPIRED";
  maxResponses: number;
  expireTime: string;
  cid: string; // IPFS content identifier
  stats_surway_cid: string;
  surveyType: string
} 