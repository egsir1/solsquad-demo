import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

// Styled Components
export const SidebarContainer = styled.div`
  width: 300px;
  height: calc(100vh - 5.5rem);
  background: ${({ theme }) => theme.color.side_bar_color};
  color: ${({ theme }) => theme.color.header_color};
  display: flex;
  flex-direction: column;
  padding: 38px 20px;
  position: fixed;
  top: 5.5rem;
  left: 0;
  box-sizing: border-box;
/* box-shadow: 0px 8px 28px 0px rgba(1, 5, 17, 0.30); */
`;



export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  flex: 1;
`;

export const NavItem = styled.li`
  margin-bottom: 10px;
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 10px;
  color: ${({ theme, $active }) =>
    $active ? theme.color.pink_color : theme.color.span_color};
  text-decoration: none;
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
`;

export const Icon = styled(Image)`
  margin-right: 10px;
  font-size: 18px; // Placeholder for icons
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
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
