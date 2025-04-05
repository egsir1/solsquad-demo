"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { surveyFetch } from "@/utils/surveyFetch";
import { SurveyModel } from "@/models/SurveyModel";
import { uploadToPinata } from "@/utils/pinataUpload";
import { SurveyStatsModel } from "@/models/SurveyStatsModel";

const SurveyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
`;

const QuestionCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const QuestionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.selected ? '#4CAF50' : '#ddd'};
  border-radius: 8px;
  background: ${props => props.selected ? '#E8F5E9' : '#fff'};
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: ${props => props.selected ? '#E8F5E9' : '#f5f5f5'};
    border-color: ${props => props.selected ? '#4CAF50' : '#bbb'};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const NavButton = styled.button`
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
`;

export const SurveyDisplay = () => {
  const params = useParams();
  const router = useRouter();
  const surveyId = params.surveyId as string;
  
  console.log('URL Parameters:', params);
  console.log('Survey ID from URL:', surveyId);
  
  const [survey, setSurvey] = useState<SurveyModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!surveyId) {
        console.error('No survey ID provided in URL parameters');
        setError('No survey ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Starting to fetch survey with ID:', surveyId);
        const surveyData = await surveyFetch(surveyId);
        console.log('Successfully fetched survey data:', surveyData);
        
        if (!surveyData) {
          throw new Error('No survey data received');
        }
        
        if (!surveyData.questions || !Array.isArray(surveyData.questions)) {
          throw new Error('Invalid survey data format');
        }
        
        setSurvey(surveyData);
        setError(null);
      } catch (err) {
        console.error('Detailed error in fetchSurvey:', err);
        setError(err instanceof Error ? err.message : 'Failed to load survey. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (survey?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSurveyCompletion = async () => {
    if (!survey) return;

    try {
      setIsSubmitting(true);
      
      // Fetch current survey stats
      const statsResponse = await fetch(`https://gateway.pinata.cloud/ipfs/${survey.stats_surway_cid}`);
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch survey stats');
      }
      
      const currentStats: SurveyStatsModel = await statsResponse.json();
      
      // Update stats with new answers
      const updatedStats: SurveyStatsModel = {
        ...currentStats,
        totalParticipants: currentStats.totalParticipants + 1,
        answerByQeustion: currentStats.answerByQeustion.map((questionStats: { questionIndex: number; answers: { [option: string]: number } }, index: number) => {
          const selectedAnswer = answers[index];
          if (!selectedAnswer) return questionStats;
          
          return {
            ...questionStats,
            answers: {
              ...questionStats.answers,
              [selectedAnswer]: (questionStats.answers[selectedAnswer] || 0) + 1
            }
          };
        }),
        lastUpdated: new Date().toISOString()
      };

      // Upload updated stats to Pinata with the same filename as the original stats file
      const { ipfsHash: newStatsHash } = await uploadToPinata(
        updatedStats,
        `stats-${survey.surveyId}.json`
      );

      console.log('Survey stats updated with new hash:', newStatsHash);

      // Fetch the current survey file
      const surveyResponse = await fetch(`https://gateway.pinata.cloud/ipfs/${survey.surveyId}`);
      if (!surveyResponse.ok) {
        throw new Error('Failed to fetch survey file');
      }
      
      const currentSurvey: SurveyModel = await surveyResponse.json();
      
      // Update survey with new stats CID
      const updatedSurvey: SurveyModel = {
        ...currentSurvey,
        stats_surway_cid: newStatsHash
      };

      // Upload updated survey to Pinata with the same filename as the original survey file
      const { ipfsHash: newSurveyHash } = await uploadToPinata(
        updatedSurvey,
        `survey-${survey.surveyId}.json`
      );

      console.log('Survey file updated with new stats CID:', newSurveyHash);
      
      // Redirect to survey market page
      router.push('/survey-market');
      
    } catch (error) {
      console.error('Error updating survey and stats:', error);
      setError('Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingContainer>Loading survey...</LoadingContainer>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!survey) {
    return <ErrorMessage>Survey not found</ErrorMessage>;
  }

  const currentQuestion = survey.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1;

  return (
    <SurveyContainer>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      
      <QuestionCard>
        <QuestionTitle>
          Question {currentQuestionIndex + 1} of {survey.questions.length}
        </QuestionTitle>
        <QuestionTitle>{currentQuestion.question}</QuestionTitle>
        
        <OptionsList>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              selected={answers[currentQuestionIndex] === option}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsList>

        <NavigationButtons>
          <NavButton
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </NavButton>
          
          {isLastQuestion ? (
            <NavButton
              onClick={handleSurveyCompletion}
              disabled={isSubmitting || !answers[currentQuestionIndex]}
            >
              {isSubmitting ? 'Submitting...' : 'Done'}
            </NavButton>
          ) : (
            <NavButton
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestionIndex]}
            >
              Next
            </NavButton>
          )}
        </NavigationButtons>
      </QuestionCard>
    </SurveyContainer>
  );
}; 