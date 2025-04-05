// components/TopBar.js
"use client";

import { FC, useEffect, useState } from "react";
import * as Styles from "./style";
import useScreenWidth from "@/hooks/useScreenWidth";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// TopBar Component
interface Props {
  show: boolean;
  onOpen: () => void;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/user/analytics",
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

const TopBar: FC<Props> = ({ show, onOpen }) => {
  const [activeLink, setActiveLink] = useState("Dashboard"); // Mock active link
  const router = useRouter();
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768;

  const path = usePathname();

  useEffect(() => {
    if (path === "/user") {
      setActiveLink("Dashboard");
    }
    if (path === "/survey-market") {
      setActiveLink("Discover");
    }
  }, [path]);

  return (
    <Styles.TopBarContainer>
      <Styles.Logo>SolSquade</Styles.Logo>
      {!isMobile && (
        <Styles.NavList>
          {navItems.map((item, index) => {
            const isActive = path === item.href || activeLink === item.label;
            return (
              <Styles.NavItem key={index} $active={isActive}>
                <Image
                  src={isActive ? item.active : item.icon}
                  width={15}
                  height={15}
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
      )}
      <Styles.RightSection>
        {!isMobile && (
          <Styles.CreateButton
            onClick={() => router.push("/survey-market/create-survey")}
          >
            <Image src={"/assets/add.svg"} width={15} height={15} alt="" />
            Create
          </Styles.CreateButton>
        )}
        {!isMobile && (
          <>
            <Styles.WalletAddress></Styles.WalletAddress>
            <Styles.Avatar>I</Styles.Avatar>
            <Styles.DropdownIcon>▼</Styles.DropdownIcon>
          </>
        )}
        <Image
          onClick={onOpen}
          src={show ? "/assets/hamburger-active.svg" : "/assets/hamburger.svg"}
          width={25}
          height={25}
          alt=""
        />
      </Styles.RightSection>
    </Styles.TopBarContainer>
  );
};

export default TopBar;
