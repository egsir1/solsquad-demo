import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const StyledInputWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border_color};
  display: flex;
  align-items: center;
  grid-gap: 0.3rem;
  border-radius: 8px;
  height: 58px;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.box_color};
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.color.active} !important;
  }
`;

export const StyledInput = styled.input`
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  outline: none;
  background-color: transparent;
  width: 100%;
  border: none;
  font-family: ${({ theme }) => theme.fonts.mona_sans};
  color: ${({ theme }) => theme.color.header_color};
  &::placeholder {
    color: ${({ theme }) => theme.color.span_color};
  }

`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;
