import styled from "styled-components";

export const QRCodeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  & > img {
    position: absolute;
    top: 60px;
    right: 60px;
    cursor: pointer;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.color.border_color};
    width: 420px;
    height: 420px;
    background-color: ${({ theme }) => theme.color.box_color};
    box-shadow: 0px 8px 28px 0px rgba(1, 5, 17, 0.3);
    & > canvas {
      width: 100%;
      height: 100%;
    }
  }
`;
