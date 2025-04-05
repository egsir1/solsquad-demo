import { SurveyModel } from "@/models/SurveyModel";

export const uploadSurveyToFilebase = async (
  surveyData: SurveyModel
): Promise<{ ipfsCid: string; url: string }> => {
  try {
    const response = await fetch("/api/create-survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: surveyData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to upload survey");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error uploading survey:", error);
    throw error;
  }
};
