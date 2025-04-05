import styled from "styled-components";
import { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1420px;

  margin: 5rem auto;

  @media screen and (max-width: 1450px) {
    width: 95%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & > h1 {
    font-size: 2rem;
    font-family: ${({ theme }) => theme.fonts.mona_sans};
    color: ${({ theme }) => theme.color.header_color};
  }
`;

// create survey

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(203, 60, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(203, 60, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(203, 60, 255, 0); }
`;

// Styled Components
export const FormContainer = styled.form`
  background: ${(props) => props.theme.color.form.background};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.medium};
  box-shadow: ${(props) => props.theme.shadows.card};
  animation: ${fadeIn} 0.5s ease-out;
  box-sizing: border-box;
  width: 70%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const FormTitle = styled.h2`
  color: ${(props) => props.theme.color.header_color};
  font-size: ${(props) => props.theme.typography.fontSize.heading};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  text-align: center;
  background: ${(props) => props.theme.color.btn_gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const FormSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const Label = styled.label`
  color: ${(props) => props.theme.color.form.text};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  margin-bottom: ${(props) => props.theme.spacing.small};
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.header_color};
  transition: border-color 0.3s ease;
  height: 45px;

  &::-webkit-calendar-picker-indicator{
    background-color: white;
  }
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;

export const SelectWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 4px;
  color: ${(props) => props.theme.color.form.text};
  min-height: 100px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;

export const QuestionCard = styled.div`
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 8px;
  padding: 15px 10px;
  margin-bottom: ${(props) => props.theme.spacing.small};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.small};
`;

export const RemoveButton = styled.button`
  color: ${(props) => props.theme.color.header_color};
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  grid-gap: 0.3rem;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  width: 30px;
  height: 30px;
`;
export const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${(props) => props.theme.spacing.small};
  margin-bottom: ${(props) => props.theme.spacing.small};
  height: 45px;
`;
export const OptionList = styled.div`
  margin-top: ${(props) => props.theme.spacing.small};
  display: flex;
  flex-wrap: wrap;
  grid-gap: 1rem;
  & > div {
    width: calc(50% - 1rem);
  }
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionInput = styled.input`
  flex: 1;
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.form.background};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 4px;
  color: ${(props) => props.theme.color.form.text};
  transition: border-color 0.3s ease;
  height: 45px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;

export const AddOptionButton = styled.button`
  background: ${(props) => props.theme.color.light_green_color};
  color: ${(props) => props.theme.color.header_color};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: ${(props) => props.theme.typography.fontSize.small};
  &:hover {
    background: ${(props) => props.theme.color.light_green_color}cc;
  }
`;

export const AddQuestionButton = styled.button`
  background: ${(props) => props.theme.color.light_green_color};
  color: ${(props) => props.theme.color.header_color};
  border: none;
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing.small};
  cursor: pointer;
  margin: ${(props) => props.theme.spacing.small} 0;
  &:hover {
    background: ${(props) => props.theme.color.light_green_color}cc;
  }
`;

export const AddButton = styled.button`
  background: ${(props) => props.theme.color.light_green_color};
  color: ${(props) => props.theme.color.header_color};
  border: none;
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing.small};
  cursor: pointer;
  margin: ${(props) => props.theme.spacing.small} 0;
  &:hover {
    background: ${(props) => props.theme.color.light_green_color}cc;
  }
`;

export const AutoFillButton = styled.button`
  background: ${(props) => props.theme.color.light_orange_color};
  color: ${(props) => props.theme.color.header_color};
  border: none;
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing.small};
  cursor: pointer;
  margin: ${(props) => props.theme.spacing.small} 0;
  &:hover {
    background: ${(props) => props.theme.color.light_orange_color}cc;
  }
`;

export const SubmitButton = styled.button`
  background: ${(props) => props.theme.color.btn_gradient};
  color: ${(props) => props.theme.color.header_color};
  font-family: ${(props) => props.theme.fonts.mona_sans};
  font-size: 15px;
  padding: 10px 20px;
  height: 45px;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease;
  animation: ${pulse} 2s infinite;
  &:hover {
    transform: scale(1.05);
  }
`;

export const PreviewContainer = styled.div`
  background: ${(props) => props.theme.color.form.background};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => props.theme.spacing.medium};
  box-shadow: ${(props) => props.theme.shadows.card};
  animation: ${fadeIn} 0.5s ease-out;
  width: 30%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const PreviewTitle = styled.h3`
  color: ${(props) => props.theme.color.header_color};
  font-size: ${(props) => props.theme.typography.fontSize.heading};
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const PreviewQuestion = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.small};
  color: ${(props) => props.theme.color.form.text};
`;

export const PreviewOption = styled.div`
  margin-left: ${(props) => props.theme.spacing.medium};
  color: ${(props) => props.theme.color.form.text};
  font-size: ${(props) => props.theme.typography.fontSize.small};
`;

//
export const Wrapper = styled.div`
  display: flex;
  grid-gap: 2rem;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const SuccessMessage = styled.div`
  color: ${(props) => props.theme.color.light_green_color};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.light_green_color}22;
  border-radius: 4px;
  animation: ${fadeIn} 0.5s ease-out;
`;
