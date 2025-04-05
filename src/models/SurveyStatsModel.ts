export interface SurveyStatsModel {
    surveyId: string;
    totalParticipants: number;
    answerByQeustion: {
        questionIndex: number;
        answers: { [option: string]: number };
    }[];
    lastUpdated: string;
} 