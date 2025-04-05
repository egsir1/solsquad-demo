// components/LoadingSpinner.tsx
"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({theme}) => theme.color.side_bar_color};
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 6px solid #d1d5db;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
