import styled, { keyframes } from "styled-components";
import { css } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
export const HeaderContainer = styled.header`
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius};
  animation: ${fadeIn} 0.5s ease-out;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const MarketTitle = styled.h1`
  color: ${(props) => props.theme.color.header_color};
  font-size: 45px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.mona_sans};
  margin-bottom: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.btn_gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const MarketDescription = styled.p`
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  max-width: 600px;
  margin: 0 auto;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.medium};
  justify-content: center;
  align-items: center;

  & > div:nth-child(1) {
    max-width: 1250px;
    min-width: 850px;
  }

  & > div:nth-child(2) {
    max-width: 1250px;
    min-width: 850px;
    display: flex;
    justify-content: right;
    grid-gap: 0.6rem;
    position: relative;
    align-items: center;
  }

  @media (max-width: 1230px) {
    & > div:nth-child(1) {
      max-width: 80%;
      min-width: 80%;
    }
    & > div:nth-child(2) {
      max-width: 80%;
      min-width: 80%;
    }
  }

  @media screen and (max-width: 768px) {
    & > div:nth-child(1) {
      max-width: 100%;
      min-width: 100%;
    }
    & > div:nth-child(2) {
      max-width: 100%;
      min-width: 100%;
    }
  }

  @media screen and (max-width: 570px) {
    & > div:nth-child(2) {
      flex-wrap: wrap;
    }
  }
`;

export const SearchInput = styled.input`
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.border_color};
  border-radius: 4px;
  color: ${(props) => props.theme.color.span_color};
  width: 300px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
  &::placeholder {
    color: ${(props) => props.theme.color.span_color};
    opacity: 0.7;
  }
`;

export const SelectWrapper = styled.div`
  width: 150px;

  @media screen and (max-width: 470px){
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.border_color};
  border-radius: 4px;
  color: ${(props) => props.theme.color.span_color};
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.small};
`;

export const ToggleLabel = styled.label`
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.small};
`;

export const ToggleSwitch = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  background: ${(props) => props.theme.color.border_color};
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
  &:checked {
    background: ${(props) => props.theme.color.light_green_color};
  }
  &:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: ${(props) => props.theme.color.header_color};
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
  }
  &:checked:before {
    transform: translateX(20px);
  }
`;

export const SortWrapper = styled.div`
  width: 150px;
    @media screen and (max-width: 470px){
    width: 100%;
  }
`;

export const SortSelect = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.border_color};
  border-radius: 4px;
  color: ${(props) => props.theme.color.span_color};
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.form.accent};
  }
`;

//
export const TabBarContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.color.box_color};
  border-radius: 20px;
  padding: 5px;
  width: fit-content;
  margin-bottom: 10px;

  margin-top: 1rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.color.pink_color : "transparent"};
  color: ${({ theme }) => theme.color.span_color};
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.color.pink_color};
  }
  &:focus {
    outline: none;
  }
`;

// Animations
export const fadeIns = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const hoverPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
export const CardContainer = styled.div`
  background: ${(props) => props.theme.color.row_color};
  border: 1px solid ${(props) => props.theme.color.border_color};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => props.theme.spacing.medium};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  box-shadow: ${(props) => props.theme.shadows.card};
  animation: ${fadeIns} 0.5s ease-out;

  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  color: ${(props) => props.theme.color.header_color};
  font-size: ${(props) => props.theme.typography.fontSize.heading};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const CardDetails = styled.p`
  color: ${(props) => props.theme.color.span_color};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const ActionButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled, theme }) =>
    disabled ? theme.color.border_color : theme.color.btn_gradient};
  color: ${(props) => props.theme.color.header_color};
  padding: 10px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  transition: all 0.3s ease;
  ${({ disabled }) =>
    !disabled &&
    css`
      animation: ${hoverPulse} 1.5s infinite;
    `}
  &:hover {
    background: ${(props) =>
      !props.disabled
        ? `${props.theme.color.btn_gradient}cc`
        : props.theme.color.border_color};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }
`;

export const MarketBodyWrraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 2rem;
  max-width: 1250px;
  margin: 0 auto;
  & > div {
    flex: 1 1 300px; /* Adjust the width of each card */
  }

  @media (max-width: 1500px) {
    width: 90%;
  }
`;

export const MarketContainer = styled.div`
  width: 100%;
`;
