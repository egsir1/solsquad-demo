import styled from "styled-components";
export const Card = styled.div`
  background: ${({ theme }) => theme.color.box_color};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  border: 1px solid ${({theme}) => theme.color.border_color};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Icon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #4c1d95;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  width: 95%;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 16px;

`;

export const Link = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const Meta = styled.div`
  color: #fff;
  font-size: 12px;
  text-align: right;

  span {
    color: #9ca3af;
    display: block;
    font-size: 11px;
  }
`;
