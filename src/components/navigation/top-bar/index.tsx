// components/TopBar.js
"use client";

import { useState } from "react";
import * as Styles from "./style";
import Image from "next/image";
// TopBar Component
const TopBar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard"); // Mock active link

  const navItems = [
    {
      label: "Dashboard",
      href: "/user",
      icon: "/assets/home.svg",
      active: "/assets/home-active.svg",
    },
    {
      label: "Discover",
      href: "/survey-market",
      icon: "/assets/survey-market.svg",
      active: "/assets/survey-market-active.svg",
    },
  ];

  return (
    <Styles.TopBarContainer>
      <Styles.Logo>
        {/* <Styles.LogoIcon>S</Styles.LogoIcon>{" "} */}
        {/* Placeholder for question mark icon */}
        SolSquade
      </Styles.Logo>
      <Styles.NavList>
        {navItems.map((item) => {
          const isActive = activeLink === item.label;
          return (
            <Styles.NavItem key={item.label}>
              <Styles.NavLink
                href={item.href}
                $active={isActive}
                onClick={() => setActiveLink(item.label)}
              >
                <Image
                  src={isActive ? item?.active : item?.icon}
                  width={15}
                  height={15}
                  alt=""
                />
                {item.label}
              </Styles.NavLink>
            </Styles.NavItem>
          );
        })}
      </Styles.NavList>
      <Styles.RightSection>
        <Styles.WalletAddress>0xDA...f72D</Styles.WalletAddress>
        <Styles.Avatar>I</Styles.Avatar>
        <Styles.DropdownIcon>▼</Styles.DropdownIcon>
      </Styles.RightSection>
    </Styles.TopBarContainer>
  );
};

export default TopBar;
