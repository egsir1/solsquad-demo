'use client';

import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { UiLayout } from '@/components/ui/ui-layout';
import { ReactQueryProvider } from './react-query-provider';
import { StyledComponentsRegistry } from './styled-registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Theme } from '@/styles/theme';
import '@solana/wallet-adapter-react-ui/styles.css';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const endpoint = clusterApiUrl('devnet');
	const wallets = [new PhantomWalletAdapter()];
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body>
				<ConnectionProvider endpoint={endpoint}>
					<WalletProvider wallets={wallets} autoConnect>
						<ReactQueryProvider>
							<ThemeProvider theme={Theme}>
								<ClusterProvider>
									<SolanaProvider>
										<StyledComponentsRegistry>
											<GlobalStyles />
											<UiLayout>{children}</UiLayout>
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
