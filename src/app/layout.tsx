import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { UiLayout } from '@/components/ui/ui-layout';
import { ReactQueryProvider } from './react-query-provider';
import { StyledComponentsRegistry } from './styled-registry';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata = {
	title: 'Solsquaddemo',
	description: 'Generated by create-solana-dapp',
};

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
		<html lang='en'>
			<body>
				<ReactQueryProvider>
					<ClusterProvider>
						<SolanaProvider>
							<StyledComponentsRegistry>
								<GlobalStyles />
								<UiLayout links={links}>{children}</UiLayout>
							</StyledComponentsRegistry>
						</SolanaProvider>
					</ClusterProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
