'use client';

import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { UiLayout } from '@/components/ui/ui-layout';
import { ReactQueryProvider } from './react-query-provider';
import { StyledComponentsRegistry } from './styled-registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Theme } from '@/styles/theme';

const links: { label: string; path: string }[] = [
	{ label: 'Account', path: '/account' },
	{ label: 'Clusters', path: '/clusters' },
	{ label: 'Basic Program', path: '/basic' },
];

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body>
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
			</body>
		</html>
	);
}
