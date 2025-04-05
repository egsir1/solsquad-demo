"use client";

import { useState } from "react";
import * as Styles from "./style";
import { usePathname } from "next/navigation";
import { useProfileStore } from "@/store/user-data-store";

// Sidebar Component
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Analytics"); // Mock active link

  const navItems = [
    {
      label: "Analytics",
      href: "/user/analytics",
      icon: "/assets/analytics.svg",
      active: "/assets/analytic-active.svg",
    },
    {
      label: "Survey",
      href: "/user/survey",
      icon: "/assets/survey.svg",
      active: "/assets/survey-active.svg",
    },
    {
      label: "Market",
      href: "/user/marketplace",
      icon: "/assets/market.svg",
      active: "/assets/market-active.svg",
    },
    {
      label: "Profile",
      href: "/user/profile",
      icon: "/assets/profile.svg",
      active: "/assets/profile-active.svg",
    },
  ];

  const path = usePathname();
  const { profile } = useProfileStore();

  return (
    <Styles.SidebarContainer height="5.5rem">
      <Styles.NavList>
        {navItems.map((item, index) => {
          const isActive = path === item.href;
          return (
            <Styles.NavItem key={index} $active={isActive}>
              <Styles.Icon
                src={isActive ? item?.active : item.icon}
                width={16}
                height={16}
                alt=""
              />
              <Styles.NavLink
                href={item.href}
                $active={isActive}
                onClick={() => setActiveLink(item.label)}
              >
                {item.label}
              </Styles.NavLink>
            </Styles.NavItem>
          );
        })}
      </Styles.NavList>
      <Styles.UserProfile>
        <Styles.UserFirtLetter>
          <p>{profile?.firstName?.slice(0, 1)}</p>
        </Styles.UserFirtLetter>
        <Styles.UserInfo>
          <Styles.UserName>{profile?.lastName}</Styles.UserName>
          <Styles.AccountLink href="/account">
            Account settings
          </Styles.AccountLink>
        </Styles.UserInfo>
      </Styles.UserProfile>
    </Styles.SidebarContainer>
  );
};

export default Sidebar;
