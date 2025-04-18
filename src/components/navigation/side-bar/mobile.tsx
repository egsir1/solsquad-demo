// components/Sidebar.js
"use client";

import { FC, useState } from "react";
import * as Styles from "./style";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/user-data-store";

interface Props {
  onClose: () => void;
}
// Sidebar Component
const MobileSidebar: FC<Props> = ({ onClose }) => {
  const [activeLink, setActiveLink] = useState("Analytics"); // Mock active link

  const navItems = [
    // {
    //   label: "Dashboard",
    //   href: "/user",
    //   icon: "/assets/home.svg",
    //   active: "/assets/home-active.svg",
    // },
    {
      label: "Discover",
      href: "/survey-market",
      icon: "/assets/survey-market.svg",
      active: "/assets/survey-market-active.svg",
    },
    {
      label: "Analytics",
      href: "/user/analytics",
      icon: "/assets/analytics.svg",
      active: "/assets/analytic-active.svg",
    },
    {
      label: "Survey",
      href: "/user/surveys",
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
  const router = useRouter();
  const { profile } = useProfileStore();

  return (
    <Styles.SidebarContainer height="0">
      <Image
        onClick={onClose}
        src={"/assets/close.svg"}
        width={18}
        height={18}
        alt=""
      />
      <Styles.CreateButton
        onClick={() => {
          router.push("/survey-market/create-survey");
          onClose();
        }}
      >
        <Image src={"/assets/add.svg"} width={15} height={15} alt="" />
        Create
      </Styles.CreateButton>
      <Styles.NavList>
        {navItems.map((item) => {
          const isActive = path === item.href;
          return (
            <Styles.NavItem key={item.label} $active={isActive}>
              <Styles.Icon
                src={isActive ? item?.active : item.icon}
                width={16}
                height={16}
                alt=""
              />
              <Styles.NavLink
                href={item.href}
                $active={isActive}
                onClick={() => {
                  setActiveLink(item.label);
                  onClose();
                }}
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
          <Styles.UserName>John Carter</Styles.UserName>
          <Styles.AccountLink href="/account">
            Account settings
          </Styles.AccountLink>
        </Styles.UserInfo>
      </Styles.UserProfile>
    </Styles.SidebarContainer>
  );
};

export default MobileSidebar;
