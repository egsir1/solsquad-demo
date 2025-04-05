import { uploadToPinata } from "./pinataUpload";
import { SurveyStatsModel } from "models/SurveyStatsModel"; // adjust path if needed

import axios from "axios";

const PINATA_GATEWAY = "https://maroon-leading-earwig-302.mypinata.cloud";

interface AnswerSubmission {
  questionIndex: number;
  selectedOption: string;
}



export const initializeSurveyStats = async (
  surveyId: string,
  questions: { question: string; options: string[] }[]
): Promise<{ cid: string; stats: SurveyStatsModel }> => {
  try {
    // Convert questions into the new SurveyStatsModel format
    const stats: SurveyStatsModel = {
      surveyId,
      totalParticipants: 0,
      lastUpdated: new Date().toISOString(),
      answerByQeustion: questions.map((q, index) => ({
        questionIndex: index,
        answers: q.options.reduce((acc, opt) => {
          acc[opt] = 0;
          return acc;
        }, {} as { [option: string]: number }),
      })),
    };

    // Upload to Pinata
    const { ipfsHash } = await uploadToPinata(stats, `${surveyId}_stats.json`);
    console.log(`Initialized stats for survey ${surveyId} at CID: ${ipfsHash}`);

    return { cid: ipfsHash, stats };
  } catch (error) {
    console.error("Error initializing survey stats:", error);
    throw new Error("Failed to initialize survey statistics");
  }
};


export const updateSurveyStats = async (
  cid: string,
  surveyId: string,
  answers: AnswerSubmission[]
): Promise<{ newCid: string }> => {
  try {
    let stats: SurveyStatsModel;

    try {
      // Fetch existing stats by CID
      console.log("Fetching survey stats from:", `${PINATA_GATEWAY}/ipfs/${cid}`);
      const response = await axios.get(`${PINATA_GATEWAY}/ipfs/${cid}`);
      stats = response.data;
    } catch (err) {
      throw new Error(`Stats for survey ${surveyId} not found at CID: ${cid}`);
    }

    // Validate and prepare defaults
    stats.totalParticipants = (stats.totalParticipants || 0) + 1;
    stats.lastUpdated = new Date().toISOString();

    if (!Array.isArray(stats.answerByQeustion)) {
      throw new Error("Invalid stats: answerByQeustion is not an array");
    }

    // Update answer counts
    answers.forEach(({ questionIndex, selectedOption }) => {
      const qStats = stats.answerByQeustion[questionIndex];
      if (!qStats) return;

      if (!qStats.answers[selectedOption]) {
        qStats.answers[selectedOption] = 1;
      } else {
        qStats.answers[selectedOption] += 1;
      }
    });

    // Upload updated stats to Pinata
    console.log("Uploading updated stats to Pinata...");
    const { ipfsHash } = await uploadToPinata(stats, `${surveyId}-stats.json`);
    console.log(`Survey stats updated. New CID: ${ipfsHash}`);

    return { newCid: ipfsHash };
  } catch (error: any) {
    console.error("Error updating survey stats:", error?.response?.data || error.message || error);
    throw new Error("Failed to update survey stats");
  }
};