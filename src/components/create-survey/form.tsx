// components/SurveyForm.tsx
"use client";

import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import * as Styles from "./styles";
import Image from "next/image";

// Types
interface FormData {
  title: string;
  surveyType: "FREE" | "PAID";
  reward: string;
  maxResponses: string;
  questions: Question[];
  totalFounde: string;
  status:  "ACTIVE" | "COMPLETED";
  expireTime: string;
}

interface Question {
  text: string;
  options: string[];
}

interface SurveyFormProps {
  onSubmit: (data: FormData) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    surveyType: "FREE",
    reward: "",
    maxResponses: "",
    totalFounde: '',
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

  const addOption = (questionIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options.push("");
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options = newQuestions[
      questionIndex
    ].options.filter((_, i) => i !== optionIndex);
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      questions: JSON.stringify(formData.questions),
    };
    localStorage.setItem("lastSurvey", JSON.stringify(formData));
  };

  const handleAutoFill = () => {
    const savedData = localStorage.getItem("lastSurvey");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      alert("No previous survey data found.");
    }
  };

  return (
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
                    handleQuestionChange(questionIndex, "text", e.target.value)
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
          <Styles.AddQuestionButton onClick={addQuestion}>
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
  );
};

export default SurveyForm;
