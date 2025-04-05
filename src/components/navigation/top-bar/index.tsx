"use client";

import { FC, useEffect, useState } from "react";
import * as Styles from "./style";
import useScreenWidth from "@/hooks/useScreenWidth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "@/types/json";
// import { useWalletDisconnectRedirect } from "@/hooks/useWalletCheck";

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
  const [isMounted, setIsMounted] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const screenWidth = useScreenWidth();
  const path = usePathname();
  const router = useRouter();
  const isMobile = screenWidth < 768;
  const { connection } = useConnection(); // ⬅️ get this at the top of your component
  // useWalletDisconnectRedirect();

  // Access the connected wallet
  const { publicKey } = useWallet();

  // Avoid SSR issues in Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update active nav link based on path
  useEffect(() => {
    if (path === "/user") {
      setActiveLink("Dashboard");
    } else if (path === "/survey-market") {
      setActiveLink("Discover");
    }
  }, [path]);

  // ⬇️ Check if user is new and redirect to onboarding
  useEffect(() => {
    const checkUserProfile = async (wallet: PublicKey) => {
      try {
        const [profilePDA] = await PublicKey.findProgramAddress(
          [Buffer.from("profile"), wallet.toBuffer()],
          PROGRAM_ID
        );

        const accountInfo = await connection.getAccountInfo(profilePDA);
        console.log("Account Info:", accountInfo, "profilePDA", profilePDA);

        // if (!accountInfo) {
        //   router.push("/register/onboarding");
        // }
      } catch (error) {
        console.error("Error checking user profile:", error);
      }
    };

    if (publicKey) {
      checkUserProfile(publicKey);
    }
  }, [publicKey, connection, router]);

  return (
    <Styles.TopBarContainer>
      <Styles.Logo>SolSquade</Styles.Logo>

      {/* Desktop Nav */}
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
        <Styles.CreateButton
          onClick={() => router.push("/survey-market/create-survey")}
        >
          <Image src={"/assets/add.svg"} width={15} height={15} alt="" />
          Create
        </Styles.CreateButton>
      </Styles.RightSection>

      {/* WalletMultiButton for Connect/Disconnect */}
      {isMounted && (
        <WalletMultiButton
          style={{
            backgroundColor: "transparent",
            border: "1px solid #CB3CFF",
            borderRadius: "7px",
            height: "40px",
            color: "#CB3CFF",
            marginLeft: "20px",
          }}
        />
      )}
    </Styles.TopBarContainer>
  );
};

export default TopBar;
