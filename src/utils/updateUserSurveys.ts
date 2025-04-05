import { uploadToPinata } from "./pinataUpload";
import axios from "axios";

const PINATA_GATEWAY = "https://maroon-leading-earwig-302.mypinata.cloud";


export const addCreatedSurvey = async (
  survey_cid: string,
  userId: string,
  surveyId: string,
): Promise<{ newCid: string }> => {
  try {
    let userData;
    let cid: string = "QmVFEy14zWx8UyLpZdRc26mHQi1R6tL1PpJHhyA7QcPrLv"
    try {
      // Try to fetch current user data from Pinata using CID
      console.log("Fetching user data from:", `${PINATA_GATEWAY}/ipfs/${cid}`);

      const response = await axios.get(`${PINATA_GATEWAY}/ipfs/${cid}`);
      userData = response.data;
    } catch (error) {
      // If user data doesn't exist yet or CID is invalid, create default data
      console.log(`Creating new user profile for ${userId}`);
      userData = {
        userId,
        createdSurveys: [],
        participatedSurveys: []
      };
    }

    // Avoid duplicates in createdSurveys
    if (!Array.isArray(userData.createdSurveys)) {
      userData.createdSurveys = [];
    }

    // Push the new surveyId if it's not already in the list
    if (!userData.createdSurveys.includes(survey_cid)) {
      userData.createdSurveys.push(survey_cid);
    }

    // Upload updated data to IPFS (Pinata)
    console.log("Uploading updated user data to Pinata...");
    const { ipfsHash } = await uploadToPinata(userData, `${userId}.json`);
    console.log(`Updated user ${userId} data with survey ${surveyId}. New CID: ${ipfsHash}`);
    cid = ipfsHash;
    return { newCid: ipfsHash };
  } catch (error: any) {
      console.error("Error adding created survey:", error?.response?.data || error.message || error);
      throw new Error("Failed to update user created surveys");
  }
};



export const addParticipantSurvey = async (
  survey_cid: string,
  userId: string,
  surveyId: string,
): Promise<{ newCid: string }> => {
  try {
    let userData;
    let cid: string = "QmVFEy14zWx8UyLpZdRc26mHQi1R6tL1PpJHhyA7QcPrLv"
    try {
      // Try to fetch current user data from Pinata using CID
      console.log("Fetching user data from:", `${PINATA_GATEWAY}/ipfs/${cid}`);

      const response = await axios.get(`${PINATA_GATEWAY}/ipfs/${cid}`);
      userData = response.data;
    } catch (error) {
      // If user data doesn't exist yet or CID is invalid, create default data
      console.log(`Creating new user profile for ${userId}`);
      userData = {
        userId,
        createdSurveys: [],
        participatedSurveys: []
      };
    }

    // Avoid duplicates in participatedSurveys
    if (!Array.isArray(userData.participatedSurveys)) {
      userData.participatedSurveys = [];
    }

    // Push the new surveyId if it's not already in the list
    if (!userData.participatedSurveys.includes(survey_cid)) {
      userData.participatedSurveys.push(survey_cid);
    }

    // Upload updated data to IPFS (Pinata)
    console.log("Uploading updated user data to Pinata...");
    const { ipfsHash } = await uploadToPinata(userData, `${userId}.json`);
    console.log(`Updated user ${userId} data with survey ${surveyId}. New CID: ${ipfsHash}`);
    cid = ipfsHash;
    return { newCid: ipfsHash };
  } catch (error: any) {
      console.error("Error adding created survey:", error?.response?.data || error.message || error);
      throw new Error("Failed to update user created surveys");
  }
};