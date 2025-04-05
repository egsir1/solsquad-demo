export interface ResSurModel {
    surveyId: string;
    participant: string; // userPubKey
    answers: string[]; // one answer per question
    submittedAt: string;
}