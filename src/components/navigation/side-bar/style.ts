import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

// Styled Components
export const SidebarContainer = styled.div<{ height: string }>`
  width: 300px;
  height: ${({ height }) => `calc(100vh - ${height})`};
  background: ${({ theme }) => theme.color.side_bar_color};
  color: ${({ theme }) => theme.color.header_color};
  display: flex;
  flex-direction: column;
  padding: 38px 20px;
  position: fixed;
  top: ${({ height }) => height};
  left: 0;
  box-sizing: border-box;
  /* box-shadow: 0px 8px 28px 0px rgba(1, 5, 17, 0.30); */
  & > img:nth-child(1) {
    position: absolute;
    right: 3rem;
    display: none;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    /* box-shadow: 0px 8px 28px 0px rgba(1, 5, 17, 0.3); */
    width: 100%;
    height: 100vh;
    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.63);
      z-index: -1;
    }
    & > img:nth-child(1) {
      display: block;
      cursor: pointer;
    }
  }
`;

export const NavList = styled.div`
  list-style: none;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  grid-gap: 0.5rem;
  margin-top: 3rem;
  @media screen and (max-width: 768px) {
    margin-top: 0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const NavItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;

  border-radius: 0 8px 8px 0;
  font-family: ${({ theme }) => theme.fonts.mona_sans};
  font-size: 15px;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border-left: ${({ theme, $active }) =>
    $active ? `4px solid ${theme.color.pink_color}` : "4px solid transparent"};
  box-sizing: border-box;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  height: 50px;
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  width: 100%;
  color: ${({ theme, $active }) =>
    $active ? theme.color.pink_color : theme.color.span_color};
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const Icon = styled(Image)`
  margin-right: 10px;
  font-size: 18px; // Placeholder for icons
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  grid-gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.mona_sans};
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 14px;
`;

export const AccountLink = styled(Link)`
  font-size: 12px;
  color: ${({ theme }) => theme.color.span_color};
  opacity: 0.7;
  text-decoration: none;
  &:hover {
    opacity: 1;
  }
`;

export const UserFirtLetter = styled.div`
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.light_green_color};
  > p {
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.mona_sans};
    color: white;
  }
`;

export const CreateButton = styled.button`
  position: relative;
  border-radius: 8px;
  display: flex;
  grid-gap: 5px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.pink_color};
  height: 40px;
  width: 130px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  cursor: pointer;
  outline: none;
  border: none;
  color: white;
  font-family: ${({ theme }) => theme.fonts.mona_sans};
`;
