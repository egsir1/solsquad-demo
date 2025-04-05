"use client";

import styled from "styled-components";
import { SurveyModel } from "@/models/SurveyModel";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchSurveysFromPinata, surveyFetch } from "@/utils/surveyFetch";

const SurveyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

const SurveyCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SurveyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const SurveyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #666;
  font-size: 0.9rem;
`;

const SurveyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

const RewardBadge = styled.span`
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  background: ${props => 
    props.status === 'ACTIVE' ? '#4CAF50' : 
    props.status === 'COMPLETED' ? '#2196F3' : 
    '#FFC107'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
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

export const SurveyList = () => {
  const { publicKey } = useWallet();
  const [surveys, setSurveys] = useState<SurveyModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const surveyList = await fetchSurveysFromPinata();
        
        // Fetch full survey data for each survey
        const fullSurveys = await Promise.all(
          surveyList.map(async (survey) => {
            try {
              const fullSurvey = await surveyFetch(survey.cid);
              return fullSurvey;
            } catch (err) {
              console.error(`Error fetching survey ${survey.cid}:`, err);
              return null;
            }
          })
        );

        // Filter out any failed fetches and set the surveys
        setSurveys(fullSurveys.filter(Boolean) as SurveyModel[]);
        setError(null);
      } catch (err) {
        console.error('Error fetching surveys:', err);
        setError('Failed to load surveys. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const handleSurveyClick = (cid: string) => {
    router.push(`/survey/${cid}`);
  };

  if (loading) {
    return <LoadingContainer>Loading surveys...</LoadingContainer>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <SurveyGrid>
      {surveys.map((survey) => (
        <SurveyCard 
          key={survey.surveyId} 
          onClick={() => handleSurveyClick(survey.cid)}
        >
          <SurveyTitle>{survey.title}</SurveyTitle>
          <SurveyInfo>
            <div>Questions: {survey.questions.length}</div>
            <div>Creator: {survey.creator.slice(0, 6)}...{survey.creator.slice(-4)}</div>
            <div>Created: {new Date(survey.createdAt).toLocaleDateString()}</div>
          </SurveyInfo>
          <SurveyMeta>
            <RewardBadge>
              {survey.reward.amount} {survey.reward.token}
            </RewardBadge>
            <StatusBadge status={survey.status}>
              {survey.status}
            </StatusBadge>
          </SurveyMeta>
        </SurveyCard>
      ))}
    </SurveyGrid>
  );
};
