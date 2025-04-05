import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  color: #ffffff;
  max-width: 1350px;
  margin-top: 6rem;
  margin-top: 5rem auto;
  box-sizing: border-box;
  padding: 2rem;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 1rem;
  }
  @media screen and (max-width: 550px) {
    padding: 0rem;
  }
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: ${({ theme }) => theme.color.box_color};
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.border_color};
  box-sizing: border-box;
  width: 70%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  color: #cbd5e1;
`;

export const Input = styled.input`
  background-color: transparent;
  border: ${({ theme }) => `1px solid ${theme.color.border_color}`};
  border-radius: 10px;
  padding: 12px;
  color: #ffffff;
  width: 100%;
  font-size: 14px;
  height: 45px;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #805ad5;
  }
`;

export const Select = styled.select`
  background-color: ${({ theme }) => theme.color.box_color};
  border: ${({ theme }) => `1px solid ${theme.color.border_color}`};
  border-radius: 10px;
  padding: 12px;
  color: #ffffff;
  width: 100%;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #805ad5;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

export const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea`
  background-color: transparent;
  border: ${({ theme }) => `1px solid ${theme.color.border_color}`};
  border-radius: 10px;
  padding: 12px;
  color: #ffffff;
  width: 100%;
  height: 100px;
  resize: none;
  font-size: 14px;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #805ad5;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(to right, #8b5cf6, #9333ea);
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.color.box_color};
  padding: 2rem;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.border_color};
  box-sizing: border-box;
  width: 30%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 9999px;
  background-color: #f5edff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #9333ea;
`;

export const AvatarNote = styled.div`
  text-align: center;
  font-size: 14px;
  color: #d1d5db;
`;
