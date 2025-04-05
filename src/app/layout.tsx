"use client";

import { ClusterProvider } from "@/components/cluster/cluster-data-access";
import { SolanaProvider } from "@/components/solana/solana-provider";
import { UiLayout } from "@/components/ui/ui-layout";
import { ReactQueryProvider } from "./react-query-provider";
import { StyledComponentsRegistry } from "./styled-registry";
import GlobalStyles from "@/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { Theme } from "@/styles/theme";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/spinner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter()];

  const { publicKey, connected, connecting, disconnecting } = useWallet();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isPublicRoute = currentPath === "/register/signin";

    // Set loading state during connection or disconnection
    if (connecting || disconnecting) {
      setIsLoading(true);
      return;
    }

    // Handle redirection logic after connection/disconnection settles
    if (!connected || !publicKey) {
      if (!isPublicRoute) {
        setIsLoading(true); // Show loading before redirect
        router.push("/register/signin");
      }
    } else {
      if (isPublicRoute) {
        setIsLoading(true); // Show loading before redirect
        router.push("/user/analytics");
      }
    }

    // Reset loading state once redirection is complete
    setIsLoading(false);
  }, [connected, publicKey, connecting, disconnecting, router]);

  return (
    <html lang="en">
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <ReactQueryProvider>
              <ThemeProvider theme={Theme}>
                <ClusterProvider>
                  <SolanaProvider>
                    <StyledComponentsRegistry>
                      <GlobalStyles />
                      <UiLayout>
                        {isLoading ? <LoadingSpinner /> : children}
                      </UiLayout>
                    </StyledComponentsRegistry>
                  </SolanaProvider>
                </ClusterProvider>
              </ThemeProvider>
            </ReactQueryProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
