// app/surveys/[surveyId]/page.tsx
"use client";

import { useState } from "react";
import * as Styles from "@/components/user/surveys/survey-details/style";
import Image from "next/image";

// Types
interface Question {
  text: string;
  options: string[];
}

interface Survey {
  id: string;
  title: string;
  type: "FREE" | "PAID";
  reward: number;
  maxResponses: number;
  questions: Question[];
}

interface SurveyDetailPageProps {
  params: { surveyId: string };
}

const SurveyDetailPage: React.FC<SurveyDetailPageProps> = ({ params }) => {
  const [showDown, setShowDown] = useState(false);
  // Mock survey data (replace with API or Solana fetch)
  const mockSurvey: Survey = {
    id: params.surveyId,
    title: "Solana User Feedback Survey",
    type: "PAID",
    reward: 0.1,
    maxResponses: 50,
    questions: [
      {
        text: "How often do you use Solana?",
        options: ["Daily", "Weekly", "Monthly", "Never"],
      },
      {
        text: "What do you think about Solana's transaction speed?",
        options: ["Excellent", "Good", "Average", "Poor"],
      },
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>(
    new Array(mockSurvey.questions.length).fill("")
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const handleResponseChange = (questionIndex: number, option: string) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = option;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockSurvey.questions.length - 1) {
      setDirection("next");
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection("prev");
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission (replace with API or Solana transaction)
    setTimeout(() => {
      console.log("Survey Responses:", responses);
      alert("Survey submitted successfully!");
      setIsSubmitting(false);
      // Reset responses or redirect as needed
      setResponses(new Array(mockSurvey.questions.length).fill(""));
      setCurrentQuestionIndex(0);
    }, 1000);
  };

  const isLastQuestion =
    currentQuestionIndex === mockSurvey.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentQuestion = mockSurvey.questions[currentQuestionIndex];

  return (
    <div>
      <Styles.DetailContainer>
        <Styles.ResponseForm onSubmit={handleSubmit}>
          <Styles.FormTitle>Submit Your Responses</Styles.FormTitle>
          <Styles.QuestionWrapper
            direction={direction}
            key={currentQuestionIndex}
          >
            <Styles.QuestionCard>
              <Styles.QuestionText>
                {currentQuestionIndex + 1}. {currentQuestion.text}
              </Styles.QuestionText>
              <Styles.OptionList>
                {currentQuestion.options.map((option, optionIndex) => (
                  <Styles.OptionLabel key={optionIndex}>
                    <Styles.OptionInput
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={responses[currentQuestionIndex] === option}
                      onChange={() =>
                        handleResponseChange(currentQuestionIndex, option)
                      }
                      required
                    />
                    {option}
                  </Styles.OptionLabel>
                ))}
              </Styles.OptionList>
            </Styles.QuestionCard>
          </Styles.QuestionWrapper>
          <Styles.NavigationButtons>
            <Styles.NavButton
              type="button"
              onClick={handlePrevious}
              disabled={isFirstQuestion || isSubmitting}
            >
              Previous
            </Styles.NavButton>
            {isLastQuestion ? (
              <Styles.SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Responses"}
              </Styles.SubmitButton>
            ) : (
              <Styles.NavButton
                type="button"
                onClick={handleNext}
                disabled={responses[currentQuestionIndex] === ""}
              >
                Next
              </Styles.NavButton>
            )}
          </Styles.NavigationButtons>
        </Styles.ResponseForm>
        <Styles.SurveyLeftside>
          <Styles.SurveyHeader $active={showDown}>
            <Styles.SurveyTitle>{mockSurvey.title}</Styles.SurveyTitle>
            <Styles.SurveyType>{mockSurvey.type} Survey</Styles.SurveyType>
            <Image
              onClick={() => setShowDown(!showDown)}
              src={"/assets/drop.svg"}
              alt=""
              width={18}
              height={18}
            />
          </Styles.SurveyHeader>
          {showDown && (
            <Styles.SurveyStats>
              <Styles.StatItem>Reward: {mockSurvey.reward} SOL</Styles.StatItem>
              <Styles.StatItem>
                Max Responses: {mockSurvey.maxResponses}
              </Styles.StatItem>
              <Styles.StatItem>
                Current Responses: {responses.filter(Boolean).length}
              </Styles.StatItem>
            </Styles.SurveyStats>
          )}
        </Styles.SurveyLeftside>
      </Styles.DetailContainer>
    </div>
  );
};

export default SurveyDetailPage;
