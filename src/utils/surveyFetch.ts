import axios from "axios";
import { SurveyModel } from "@/models/SurveyModel";


const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export const fetchSurveysFromPinata = async (): Promise<
  { name: string; cid: string; date: string; url: string }[]
> => {
  if (!PINATA_JWT) throw new Error("Pinata JWT not set");

  const response = await axios.get("https://api.pinata.cloud/data/pinList", {
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    params: {
      status: "pinned",
      pageLimit: 100,
      "metadata[keyvalues]": JSON.stringify({
        group: {
          value: "survey",
          op: "eq",
        },
      }),
    },
  });

  return response.data.rows.map((row: any) => ({
    name: row.metadata.name,
    cid: row.ipfs_pin_hash,
    date: row.date_pinned,
    url: `https://gateway.pinata.cloud/ipfs/${row.ipfs_pin_hash}`,
  }));
};


export const surveyFetch = async (surveyId: string): Promise<SurveyModel> => {
  try {
    console.log('surveyFetch: Starting fetch for survey ID:', surveyId);
    const url = `https://gateway.pinata.cloud/ipfs/${surveyId}`;
    console.log('surveyFetch: Fetching from URL:', url);
    
    const response = await axios.get(url);
    console.log('surveyFetch: Response status:', response.status);
    console.log('surveyFetch: Response data:', response.data);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch survey. Status: ${response.status}`);
    }

    if (!response.data) {
      throw new Error('No data received from the server');
    }

    const data: SurveyModel = response.data;
    
    // Validate the data structure
    if (!data.surveyId || !data.title || !data.questions) {
      throw new Error('Invalid survey data structure');
    }

    return {
      ...data,
      cid: surveyId
    };
  } catch (error) {
    console.error("Detailed error in surveyFetch:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch survey: ${error.message}. Status: ${error.response?.status}`);
    }
    throw new Error(`Failed to fetch survey: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const fetchSurveyFromPinata = async (surveyId: string) => {
  try {
    // First, get the pin list to find the correct IPFS hash
    const response = await axios.get('https://api.pinata.cloud/data/pinList', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
      },
      params: {
        metadata: {
          name: `${surveyId}.json`,
          keyvalues: {
            group: 'survey'
          }
        }
      }
    });

    if (response.data.rows.length === 0) {
      throw new Error('Survey not found');
    }

    const pinData = response.data.rows[0];
    
    // Fetch the actual survey data using the IPFS hash
    const surveyResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${pinData.ipfs_pin_hash}`);
    return surveyResponse.data;
  } catch (error) {
    console.error('Error fetching survey:', error);
    throw new Error('Failed to fetch survey data');
  }
};