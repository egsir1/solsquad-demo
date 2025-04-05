'use client';

import { useState } from "react";
import { SurveyModel } from "models/SurveyModel";
import { SurveyStatsModel } from "models/SurveyStatsModel";
import { UserModel } from "models/UserModel";
import { ResSurModel } from "models/ResSurModel"
type UploadType = "survey" | "answer" | "stats" | "user";

interface UploadPayload {
  fileName: string;
  data: object;
  surveyId?: string;
}



export default function TestUploadPage() {
  const [url, setUrl] = useState("");
  const [uploadType, setUploadType] = useState<UploadType>("survey");

  const createModel = (type: UploadType): UploadPayload => {
    if (type === "survey") {
      const survey: SurveyModel = {
        surveyId: "test_001",
        creator: "abc123",
        title: "Test Survey",
        questions: [
          { question: "Favorite color?", options: ["Red", "Green", "Blue"] }
        ],
        reward: { amount: 0.01, token: "SOL" },
        createdAt: new Date().toISOString()
      };
      return {
        fileName: `survey_${survey.surveyId}.json`,
        data: survey,
        surveyId: survey.surveyId
      };
    }

    if (type === "answer") {
      const answer: ResSurModel = {
        surveyId: "test_001",
        participant: "user_123",
        answers: ["Blue"],
        submittedAt: new Date().toISOString()
      };
      return {
        fileName: `answer_${answer.surveyId}_${answer.participant}.json`,
        data: answer,
        surveyId: answer.surveyId
      };
    }

    if (type === "stats") {
      const stats: SurveyStatsModel = {
        surveyId: "test_001",
        totalParticipants: 10,
        answerByQeustion: [
          {
            questionIndex: 0,
            answers: {
              Red: 2,
              Green: 3,
              Blue: 5
            }
          }
        ],
        lastUpdated: new Date().toISOString()
      };
      return {
        fileName: `survey_stats_${stats.surveyId}.json`,
        data: stats,
        surveyId: stats.surveyId
      };
    }

    const user: UserModel = {
      userPubKey: "user_123",
      createdSurveys: ["test_001"],
      participatedSurveys: ["test_002", "test_003"]
    };
    return {
      fileName: `user_${user.userPubKey}.json`,
      data: user
    };
  };

  const [fetchedJson, setFetchedJson] = useState<object | null>(null);
  const [cid, setCid] = useState("");

  const handleUpload = async () => {
    const { fileName, data, surveyId } = createModel(uploadType);

    console.log("Uploading:", { fileName, data });

    const res = await fetch("/api/upload-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, data, surveyId }), // surveyId used for IPNS label if needed
    });

    const json = await res.json();
    setCid(json.cid);
    setUrl(json.ipnsUrl || json.url);
    console.log("Response:", json);
  };

  const handleFetch = async () => {
    if (!url) return;

    const res = await fetch(`/api/get-json-by-cid?cid=${cid}`);
    const json = await res.json();
    setFetchedJson(json);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upload to Filebase</h1>

      <select
        value={uploadType}
        onChange={(e) => setUploadType(e.target.value as UploadType)}
        className="border px-3 py-2 rounded"
      >
        <option value="survey">Survey</option>
        <option value="answer">Survey Answer</option>
        <option value="stats">Survey Stats</option>
        <option value="user">User</option>
      </select>

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload {uploadType}
      </button>

      <button
        onClick={handleFetch}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Fetch JSON by CID
      </button>

      <pre style={{ backgroundColor: "#111", color: "#fff", padding: "1rem", borderRadius: "0.5rem" }}>
      {JSON.stringify(fetchedJson, null, 2)}
</pre>

      {url && (
        <p className="text-green-600 mt-4">
          ✅ Uploaded to IPFS:{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
            {url}
          </a>
        </p>
      )}

    </div>
  );
}
