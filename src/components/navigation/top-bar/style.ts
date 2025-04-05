import Link from "next/link";
import styled from "styled-components";

// Styled Components
export const TopBarContainer = styled.div`
  height: 5.5rem;
  background: ${({ theme }) => theme.color.side_bar_color};
  color: ${({ theme }) => theme.color.span_color};
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin-right: 20px;
`;

export const LogoIcon = styled.span`
  margin-right: 10px;
  font-size: 2rem; // Placeholder for icon
`;

export const NavList = styled.div`
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0 2rem;
`;

export const NavItem = styled.div<{ $active: boolean }>`
  position: relative;
  border-radius: 8px;
  display: flex;
  grid-gap: 10px;
  align-items: center;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  height: 50px;
  width: 150px;
  box-sizing: border-box;
  padding-left: 20px;
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme }) => theme.color.span_color};
  text-decoration: none;
  position: relative;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.mona_sans};
  font-weight: 500;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const CreateButton = styled.button`
  position: relative;
  border-radius: 8px;
  display: flex;
  grid-gap:5px;
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

export const RightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  & > img {
    cursor: pointer;
    display: none;
  }

  @media screen and (max-width: 768px) {
    & > img {
      display: block;
    }
  }
`;

export const WalletAddress = styled.p`
  font-size: 14px;
  margin-right: 15px;
`;

export const Avatar = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.color.active};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 10px;
`;

export const DropdownIcon = styled.p`
  font-size: 12px;
`;
