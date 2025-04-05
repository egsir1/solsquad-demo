// components/SurveyForm.tsx
"use client";

import styled, { keyframes } from "styled-components";
import { useState, useEffect, ReactNode } from "react";
import * as Styles from "./styles";
import Image from "next/image";
import { SurveyModel } from "@/models/SurveyModel";
import { uploadToPinata, uploadToPinataSurveyGroup } from "@/utils/pinataUpload";
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { initializeSurveyStats } from "@/utils/surveyStats";
import { addCreatedSurvey } from "@/utils/updateUserSurveys";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idlJson from "../../../anchor/target/idl/survey_app_program.json";
import { AnchorProvider, Program, Idl, Wallet } from "@coral-xyz/anchor";
import toast from "react-hot-toast";


const idl = idlJson as Idl;
const programId = new PublicKey("DaCvrrNqNu2SA5Jx9R7Jverp9FxtSzezCg3eu4H2aWGn");


export const submitSurveyToSolana = async (
  ipfsCid: string,
  wallet: AnchorWallet,
  connection: Connection
): Promise<void> => {
  try {

    if (!wallet || !wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });

    const program = new Program(idl, provider);

    // Derive PDA for survey
    const [surveyPda] = await PublicKey.findProgramAddress(
      [Buffer.from("survey"), wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .registerSurvey(ipfsCid) // match method name & argument
      .accounts({
        survey: surveyPda,
        signer: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    toast.success("Survey registered on Solana!");
  } catch (error: any) {
    console.error("Error writing to Solana:", error);
    toast.error("Failed to save survey on-chain");
    throw error;
  }
};



// Types
export interface FormData {
  title: string;
  surveyType: "FREE" | "PAID";
  reward: string;
  maxResponses: string;
  questions: Question[];
  totalFounde: string;
  status: "ACTIVE" | "COMPLETED";
  expireTime: string;
}

export interface Question {
  text: string;
  options: string[];
}

interface SurveyFormProps {
  onSubmit: (data: FormData) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }): ReactNode => {
  // const  wallet = useAnchorWallet();
  // const { connection } = useConnection(); 
  const { publicKey } = useWallet();

const SurveyForm = () => {

  const [formData, setFormData] = useState<FormData>({
    title: "",
    surveyType: "FREE",
    reward: "",
    maxResponses: "",
    totalFounde: "",
    status: "ACTIVE",
    expireTime: "",
    questions: [],
  });

  useEffect(() => {
    const savedData = localStorage.getItem("lastSurvey");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const { registerSurvey } = CreateSurveyHook();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { text: "", options: ["", "", "", ""] }],
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }
    

    try {
      // Create SurveyModel from form data
      const surveyData: SurveyModel = {
        surveyId: `survey_${Date.now()}`,
        title: formData.title,
        creator: publicKey.toString(),
        questions: formData.questions.map(q => ({

        creator: "user_public_key", // TODO: Get actual user's public key
        questions: formData.questions.map((q) => ({
          question: q.text,
          options: q.options.filter((opt) => opt.trim() !== ""), // Remove empty options
        })),
        reward: {
          amount: parseFloat(formData.reward) || 0,
          token: "SOL",
        },
        createdAt: new Date().toISOString(),
        status: formData.status,
        maxResponses: parseInt(formData.maxResponses) || 0,
        expireTime: formData.expireTime,
        surveyType: formData.surveyType,
      };

      // Validate questions and options
      if (
        surveyData.questions.some(
          (q) => !q.question.trim() || q.options.length < 2
        )
      ) {
        alert("Each question must have a title and at least 2 options");
        return;
      }

      // Initialize survey stats
      const {cid: stats_surway_cid}= await initializeSurveyStats(surveyData.surveyId, surveyData.questions);
      console.log('Survey stats initialized');

      // Upload to Pinata
      surveyData.stats_surway_cid = stats_surway_cid;
      console.log('Uploading survey to Pinata:', surveyData);
      const result = await uploadToPinataSurveyGroup(surveyData, `${surveyData.surveyId}.json`);
      console.log('Survey uploaded successfully:', result);

      // Update user's created surveys list
      console.log('Calling addCreatedSurvey with:', publicKey.toString(), surveyData.surveyId);
      await addCreatedSurvey(result.ipfsHash, publicKey.toString(), surveyData.surveyId);
      console.log('addCreatedSurvey completed');

      // await submitSurveyToSolana(
      //   result.ipfsHash,
      //   wallet,
      //   connection
      // );
      // Upload to Filebase
      const result = await uploadSurveyToFilebase(surveyData);

      // Call the parent onSubmit handler with the form data
      registerSurvey(
        result?.ipfsCid,
        formData.surveyType,
        formData.reward,
      );

      // Clear form after successful submission
      setFormData({
        title: "",
        surveyType: "FREE",
        reward: "",
        maxResponses: "",
        totalFounde: "",
        status: "ACTIVE",
        expireTime: "",
        questions: [],
      });
      
    } catch (error: unknown) {
      console.error('Error submitting survey:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit survey. Please try again.');
    }
  };


      // router.push("/survey-market");
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to submit survey. Please try again."
      );
    }
  };

  return (
    <>
      <Styles.Header>
        <h1>Create Survey</h1>
        <Styles.SubmitButton onClick={handleSubmit} type="submit">
          Submit The Survey
        </Styles.SubmitButton>
      </Styles.Header>
      <Styles.Wrapper>
        <Styles.FormContainer>
          <Styles.FormSection>
            <Styles.Label>Survey Title</Styles.Label>
            <Styles.Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter survey title"
            />
          </Styles.FormSection>
          <Styles.FormSection>
            <Styles.Label>Survey Type</Styles.Label>
            <select
              name="surveyType"
              value={formData.surveyType}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                background: "#0A1330",
                border: "1px solid #343B4F",
                borderRadius: "4px",
                color: "#AEB9E1",
                height: "45px",
              }}
            >
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
          </Styles.FormSection>
          <Styles.FormSection>
            <Styles.Label>Total Founde</Styles.Label>
            <Styles.Input
              type="text"
              name="totalFounde"
              value={formData.totalFounde}
              onChange={handleChange}
              placeholder="e.g., 50SOl"
            />
          </Styles.FormSection>
          <Styles.FormSection>
            <Styles.Label>Reward per Response (SOL)</Styles.Label>
            <Styles.Input
              type="number"
              name="reward"
              value={formData.reward}
              onChange={handleChange}
              step="0.01"
              placeholder="e.g., 0.1"
            />
          </Styles.FormSection>
          <Styles.FormSection>
            <Styles.Label>Max Responses</Styles.Label>
            <Styles.Input
              type="number"
              name="maxResponses"
              value={formData.maxResponses}
              onChange={handleChange}
              placeholder="e.g., 50"
            />
          </Styles.FormSection>
          <Styles.FormSection>
            <Styles.Label>Expire Time</Styles.Label>
            <Styles.Input
              type="date"
              name="expireTime"
              value={formData.expireTime}
              onChange={handleChange}
              placeholder="e.g., 2024-12-31"
            />
          </Styles.FormSection>
          <Styles.FormSection>
            <Styles.Label>Questions</Styles.Label>
            {formData.questions.map((question, questionIndex) => (
              <Styles.QuestionCard key={questionIndex}>
                <Styles.QuestionHeader>
                  <Styles.Input
                    type="text"
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(
                        questionIndex,
                        "text",
                        e.target.value
                      )
                    }
                    placeholder={`Question ${questionIndex + 1}`}
                    style={{ flex: 1 }}
                  />
                </Styles.QuestionHeader>
                <Styles.OptionList>
                  {question.options.map((option, optionIndex) => (
                    <Styles.OptionItem key={optionIndex}>
                      <Styles.OptionInput
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            questionIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    </Styles.OptionItem>
                  ))}
                </Styles.OptionList>
                <Styles.RemoveButton
                  onClick={() => removeQuestion(questionIndex)}
                >
                  <Image
                    src="/assets/remove.svg"
                    alt="Remove"
                    width={20}
                    height={20}
                  />
                  remove
                </Styles.RemoveButton>
              </Styles.QuestionCard>
            ))}
            <Styles.AddQuestionButton type="button" onClick={addQuestion}>
              Add Question
            </Styles.AddQuestionButton>
          </Styles.FormSection>
        </Styles.FormContainer>
        <Styles.PreviewContainer>
          <Styles.PreviewTitle>
            Survey Preview: {formData.title || "Untitled"}
          </Styles.PreviewTitle>
          {formData.questions.map((question, index) => (
            <div key={index}>
              <Styles.PreviewQuestion>
                <strong>Question {index + 1}:</strong>{" "}
                {question.text || "Untitled Question"}
              </Styles.PreviewQuestion>
              {question.options.map((option, optionIndex) => (
                <Styles.PreviewOption key={optionIndex}>
                  - {option || `Option ${optionIndex + 1}`}
                </Styles.PreviewOption>
              ))}
            </div>
          ))}
        </Styles.PreviewContainer>
      </Styles.Wrapper>
    </>
  );
};

export default SurveyForm;
