import styled, { keyframes } from "styled-components";

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(203, 60, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(203, 60, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(203, 60, 255, 0); }
`;

// Styled Components
export const OnboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 950px;
  padding: ${(props) => props.theme.spacing.large};
  margin: 0 auto;
`;

export const FormCard = styled.div`
  /* background: ${(props) => props.theme.color.row_color}; */
  border: 1px solid ${(props) => props.theme.color.border_color};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.medium};
  width: 100%;
  max-width: 800px;
  animation: ${fadeIn} 0.7s ease-out;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.color.header_color};
  font-size: 35px;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  background: ${(props) => props.theme.color.btn_gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.medium};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.small};
`;

export const FlexRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.medium};
  flex-wrap: wrap;
  & > * {
    flex: 1;
    min-width: 200px;
  }
`;

export const Label = styled.label`
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.small};
`;

export const Input = styled.input`
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.form.background};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 4px;
  color: ${(props) => props.theme.color.form.text};
  transition: border-color 0.3s ease;
  font-size: 14px;
  height: 55px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
  &::placeholder {
    color: ${(props) => props.theme.color.span_color};
    opacity: 0.7;
  }
`;

export const Select = styled.select`
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.form.background};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 4px;
  color: ${(props) => props.theme.color.form.text};
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;

export const TextArea = styled.textarea`
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.form.background};
  border: 1px solid ${(props) => props.theme.color.form.border};
  border-radius: 4px;
  color: ${(props) => props.theme.color.form.text};
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;

export const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.small};
`;

export const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme.color.form.accent};
`;

export const ImageUploadButton = styled.label`
  background: ${(props) => props.theme.color.light_orange_color};
  color: ${(props) => props.theme.color.header_color};
  padding: ${(props) => props.theme.spacing.small};
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.color.light_orange_color}cc;
  }
`;

export const HiddenInput = styled.input`
  display: none;
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
  box-sizing: border-box;

  &:disabled {
    background: ${(props) => props.theme.color.border_color};
    cursor: not-allowed;
    animation: none;
  }
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.color.light_orange_color};
  font-size: ${(props) => props.theme.typography.fontSize.small};
`;
