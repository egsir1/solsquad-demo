import styled from "styled-components";

export const SurveyMarketHeaderWrapper = styled.div`
  max-width: 950px;
  margin: 10rem auto;
  text-align: center;
  box-sizing: border-box;
  position: relative;

  @media screen and (max-width: 1070px) {
    max-width: 80%;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.header_color};
  font-family: ${({ theme }) => theme.fonts.mona_sans};
  margin-bottom: 2rem;
`;

// card

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 3rem;
  justify-content: center;
  padding: 3rem 1rem;
  box-sizing: border-box;

  @media screen and (max-width: 1316px) {
    grid-gap: 2rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: calc(450px - 3rem); // Adjust spacing if you're using a grid layout
  flex: 1 1 450px; // Grow/Shrink, Minimum width 250px
  max-width: calc(450px - 3rem - 0.3rem - 1rem);
  max-height: 280px;
  background-color: ${({ theme }) => theme.color.box_color || "rebeccapurple"};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.border_color};
  box-shadow: 1px 1px 1px 0px rgba(16, 25, 52, 0.4);
  font-family: ${({ theme }) => theme.fonts.mona_sans};
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.8rem 0 0 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  @media screen and (max-width: 841px) {
    width: 100%;
    max-width: 100%;
    flex: 1 1 100%;
    padding: 0;
    margin-bottom: 2rem;
  }
`;

export const CardHeader = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mona_sans};
  height: 30%;
  cursor: pointer;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 94%;
    grid-gap: 0.3rem;
    & > p {
      font-size: 1.2rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.header_color};
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > div {
      display: flex;
      align-items: center;
      grid-gap: 0.8rem;
      & > span {
        display: flex;
        align-items: center;
        line-height: 16px;
        font-size: 0.8rem;
        font-weight: 500;
        color: ${({ theme }) => theme.color.span_color};
        margin: 0;
      }
    }
  }
`;

export const CardBody = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0;
  height: 50%;
  box-sizing: border-box;
  grid-gap: 0.4rem;
`;

export const CardBodyTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  & > h2 {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.color.header_color};
    font-size: 1.5rem;
  }
  & > p {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.color.span_color};
    font-size: 12px;
  }
`;

export const CardBodyBottom = styled.div`
  height: 30%;
  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    & > p {
      display: flex;
      align-items: center;
      grid-gap: 0.2rem;
      margin: 0;
      padding: 0;
      color: ${({ theme }) => theme.color.span_color};
      font-size: 12px;
    }
  }
`;

export const CardBodyLine = styled.div<{ width: number }>`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.border_color};
  margin: 0.5rem 0;
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  & > div {
    height: 100%;
    background-color: ${({ theme }) => theme.color.pink_color};
    border-radius: 1px;
    width: ${({ width }) => width}%;
  }
`;

export const CardFooter = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0;
  height: 20%;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.color.border_color};
  & > div {
    display: flex;
    align-items: center;
    & > img {
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    & > p {
      margin: 0;
      padding: 0;
      color: ${({ theme }) => theme.color.span_color};
      font-size: 14px;
    }
  }
  & > img {
    cursor: pointer;
  }
`;

//
export const TabBarContainer = styled.div`
  display: flex;
  background: ${({theme}) =>theme.color.box_color};
  border-radius: 20px;
  padding: 5px;
  width: fit-content;
  margin-bottom: 10px;
  position: absolute;
  right: 0;
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
