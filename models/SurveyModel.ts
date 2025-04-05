import { v4 as uuidv4} from 'uuid';
import { useState } from 'react'; 

export interface SurveyModel {
    surveyId: string;
    creator: string; // userPubKey
    title: string;
    questions: {
        question: string;
        options: string[];
    }[];

    reward: {
        amount: number;
        token: string; // e.g. "SOL"
    };
    createdAt: string; // ISO date string
}