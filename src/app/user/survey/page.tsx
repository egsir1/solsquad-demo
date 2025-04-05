"use client";
import React from "react";
import SurveyCard from "@/components/user/surveys/SurveyCard";
import { Box, Typography } from "@mui/material";

const SurveysPage = () => {
  const surveys = [
    {
      id: 1,
      title: "Onboarding survey",
      link: "qstn.us",
      rewards: "5 ANSR",
      questions: "7/7",
      status: "Done",
      date: "April 4",
    },
    {
      id: 2,
      title: "Web3 UX Research",
      link: "research.qstn.us",
      rewards: "3.5 ANSR",
      questions: "5/6",
      status: "Active",
      date: "April 3",
    },
    {
      id: 3,
      title: "DAO Feedback Poll",
      link: "dao.qstn.us",
      rewards: "2 ANSR",
      questions: "4/4",
      status: "Claim",
      date: "April 2",
    },
    {
      id: 4,
      title: "New Features Beta",
      link: "beta.qstn.us",
      rewards: "6 ANSR",
      questions: "10/10",
      status: "Done",
      date: "April 4",
    },
    {
      id: 5,
      title: "Airdrop Eligibility",
      link: "airdrop.qstn.us",
      rewards: "4 ANSR",
      questions: "6/6",
      status: "Active",
      date: "April 3",
    },
    {
      id: 6,
      title: "Community Feedback",
      link: "community.qstn.us",
      rewards: "3 ANSR",
      questions: "5/5",
      status: "Claim",
      date: "April 2",
    },
    {
      id: 7,
      title: "DeFi Tooling Survey",
      link: "tools.qstn.us",
      rewards: "4.5 ANSR",
      questions: "9/9",
      status: "Done",
      date: "April 4",
    },
    {
      id: 8,
      title: "Feature Priority Poll",
      link: "features.qstn.us",
      rewards: "3 ANSR",
      questions: "6/6",
      status: "Active",
      date: "April 3",
    },
    {
      id: 9,
      title: "DAO Member Insights",
      link: "dao-insights.qstn.us",
      rewards: "4 ANSR",
      questions: "7/7",
      status: "Claim",
      date: "April 2",
    },
    {
      id: 10,
      title: "Web3 Dev Experience",
      link: "dev.qstn.us",
      rewards: "6 ANSR",
      questions: "8/8",
      status: "Done",
      date: "April 4",
    },
  ];

  return (
    <Box
      sx={{
        padding: "1.5rem",
        mt: "4rem",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ color: "#F1F5F9", padding: "10px" }}
      >
        My Surveys
      </Typography>

      <Box className="flex flex-col gap-4">
        {surveys.map((survey) => (
          <SurveyCard
            key={survey.id}
            {...survey}
            status={survey.status as "Done" | "Claim" | "Active"}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SurveysPage;
