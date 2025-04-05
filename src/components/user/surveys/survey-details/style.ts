import styled, { keyframes } from "styled-components";

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const slideIn = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const slideOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-50px); }
`;

export const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(203, 60, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(203, 60, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(203, 60, 255, 0); }
`;

// Styled Components
export const DetailContainer = styled.div`
  padding: ${(props) => props.theme.spacing.medium};
  height: calc(100vh - 5.5rem);
  margin-top: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  grid-gap: 2rem;
  margin: 0 auto;
  max-width: 1450px;
  & > div:nth-child(1) {
    width: 65%;
  }
  & > div:nth-child(2) {
    width: 35%;
    border-radius: 8px;
  }

  @media screen and (max-width: 1450px) {
    flex-direction: column-reverse;
    margin-top: 12rem;
    & > div:nth-child(1) {
      width: 100%;
    }
    & > div:nth-child(2) {
      width: 100%;
      border-radius: 8px;
    }
  }

  @media screen and (max-width: 550px) {
    box-sizing: border-box;
    height: 100%;
    margin-top: 5rem;
    padding: 0;
  }
  @media screen and (max-width: 550px) {
    padding: 3rem 0;
  }
`;

export const SurveyCard = styled.div`
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.border_color};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.large};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  box-shadow: ${(props) => props.theme.shadows.card};
  animation: ${fadeIn} 0.7s ease-out;
  max-width: 800px;
  margin: 0 auto;

  @media screen and (max-width: 1450px) {
    max-width: 100%;
  }
`;

export const SurveyTitle = styled.h1`
  color: ${(props) => props.theme.color.header_color};
  font-size: 35px;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  background: ${(props) => props.theme.color.btn_gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SurveyDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.medium};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  justify-content: center;
`;

export const DetailItem = styled.div`
  background: ${(props) => props.theme.color.form.background};
  padding: ${(props) => props.theme.spacing.small};
  border-radius: 8px;
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  flex: 1;
  min-width: 150px;
  text-align: center;
  border: 1px solid ${(props) => props.theme.color.border_color};
`;

export const QuestionList = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const QuestionCard = styled.div`
  background: ${(props) => props.theme.color.side_bar_color};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.medium};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const QuestionText = styled.h3`
  color: ${(props) => props.theme.color.header_color};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.small};
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.small};
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  cursor: pointer;
`;

export const OptionInput = styled.input`
  accent-color: ${(props) => props.theme.color.form.accent};
`;

export const ResponseForm = styled.form`
  background: ${(props) => props.theme.color.box_color};
  border: 1px solid ${(props) => props.theme.color.border_color};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.large};
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeIn} 0.7s ease-out;
  width: 850px;
  height: 500px;
  @media screen and (max-width: 1450px) {
    width: 100%;
    max-width: 100%;
  }
  @media screen and (max-width: 550px) {
    padding: 2rem 0.8rem;
    height: auto;
  }
`;

export const FormTitle = styled.h2`
  color: ${(props) => props.theme.color.header_color};
  font-size: 35px;
  font-family: ${(props) => props.theme.fonts.mona_sans};
  text-align: center;
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const QuestionWrapper = styled.div<{ direction: "next" | "prev" }>`
  animation: ${(props) => (props.direction === "next" ? slideIn : slideOut)}
    0.5s ease-out forwards;
  align-items: center;
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.medium};
`;

export const NavButton = styled.button`
  background: ${(props) => props.theme.color.light_orange_color};
  color: ${(props) => props.theme.color.header_color};
  padding: 10px 15px;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.color.light_orange_color}cc;
  }
  &:disabled {
    background: ${(props) => props.theme.color.border_color};
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  background: ${(props) => props.theme.color.btn_gradient};
  color: ${(props) => props.theme.color.header_color};
  padding: 10px 15px;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease;
  animation: ${pulse} 2s infinite;
  &:hover {
    transform: scale(1.05);
  }
  &:disabled {
    background: ${(props) => props.theme.color.border_color};
    cursor: not-allowed;
    animation: none;
  }
`;

// Animations
const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(203, 60, 255, 0.3); }
  50% { box-shadow: 0 0 15px rgba(203, 60, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(203, 60, 255, 0.3); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Styled Components
export const SurveyLeftside = styled.div`
  background: ${(props) => props.theme.color.box_color};
  padding: 1rem;
  box-sizing: border-box;
  height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);
  border: 1px solid ${(props) => props.theme.color.border_color};
  z-index: 10;
  @media screen and (max-width: 1450px) {
    height: auto;
  }
`;

export const SurveyHeader = styled.div<{ $active: boolean }>`
  text-align: center;
  padding-bottom: ${(props) => props.theme.spacing.medium};

  & > img {
    cursor: pointer;
    transform: ${({ $active }) => ($active ? "rotate(180deg)" : "rotate(0)")};
  }
  @media screen and (max-width: 1450px) {
   
    & > img {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
     
      animation: ${fadeInLeft} 0.5s ease-in-out;
    }
  }
`;

export const SurveyType = styled.p`
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  opacity: 0.9;
  font-weight: 600;
`;

export const SurveyStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const StatItem = styled.p`
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  background: ${(props) => props.theme.color.form.background};
  padding: ${(props) => props.theme.spacing.small};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.form.border};
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;
