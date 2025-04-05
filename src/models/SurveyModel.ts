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
  status: "ACTIVE" | "COMPLETED";
  maxResponses: number;
  expireTime: string;
} 