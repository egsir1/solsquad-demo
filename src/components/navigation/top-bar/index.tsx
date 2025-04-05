'use client';

import { FC, useEffect, useState } from 'react';
import * as Styles from './style';
import useScreenWidth from '@/hooks/useScreenWidth';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

interface Props {
	show: boolean;
	onOpen: () => void;
}

const navItems = [
	{
		label: 'Dashboard',
		href: '/user/analytics',
		icon: '/assets/home.svg',
		active: '/assets/home-active.svg',
	},
	{
		label: 'Discover',
		href: '/survey-market',
		icon: '/assets/survey-market.svg',
		active: '/assets/survey-market-active.svg',
	},
];

const TopBar: FC<Props> = ({ show, onOpen }) => {
	const [isMounted, setIsMounted] = useState(false);
	const [activeLink, setActiveLink] = useState('Dashboard');
	const screenWidth = useScreenWidth();
	const path = usePathname();
	const router = useRouter();
	const isMobile = screenWidth < 768;

	// Access the connected wallet
	const { publicKey } = useWallet();

	// Avoid SSR issues in Next.js
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Log the public key whenever it changes
	useEffect(() => {
		if (publicKey) {
			console.log('Public key:', publicKey.toBase58());
		} else {
			console.log('No wallet connected.');
		}
	}, [publicKey]);

	// Update active nav link based on path
	useEffect(() => {
		if (path === '/user') {
			setActiveLink('Dashboard');
		} else if (path === '/survey-market') {
			setActiveLink('Discover');
		}
	}, [path]);

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
									alt=''
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
					onClick={() => router.push('/survey-market/create-survey')}
				>
					<Image src={'/assets/add.svg'} width={15} height={15} alt='' />
					Create
				</Styles.CreateButton>
			</Styles.RightSection>

			{/* WalletMultiButton for Connect/Disconnect */}
			{isMounted && (
				<WalletMultiButton
					style={{
						backgroundColor: 'transparent',
						border: '1px solid #CB3CFF',
						borderRadius: '7px',
						height: '40px',
						color: '#CB3CFF',
						marginLeft: '20px',
					}}
				/>
			)}
		</Styles.TopBarContainer>
	);
};

export default TopBar;
