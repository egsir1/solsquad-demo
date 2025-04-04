// components/Sidebar.js
'use client';

import { useState } from 'react';
import * as Styles from './style';

// Sidebar Component
const Sidebar = () => {
	const [activeLink, setActiveLink] = useState('Analytics'); // Mock active link

	const navItems = [
		{
			label: 'Analytics',
			href: '/user/analytics',
			icon: '/assets/analytics.svg',
			active: '/assets/analytic-active.svg',
		},
		{
			label: 'Survey',
			href: '/user/survey',
			icon: '/assets/survey.svg',
			active: '/assets/survey-active.svg',
		},
		{
			label: 'Market',
			href: '/user/marketplace',
			icon: '/assets/market.svg',
			active: '/assets/market-active.svg',
		},
		{
			label: 'Profile',
			href: '/user/profile',
			icon: '/assets/profile.svg',
			active: '/assets/profile-active.svg',
		},
	];

	return (
		<Styles.SidebarContainer>
			<Styles.NavList>
				{navItems.map(item => {
					const isActive = activeLink === item.label;
					return (
						<Styles.NavItem key={item.label}>
							<Styles.NavLink
								href={item.href}
								$active={isActive}
								onClick={() => setActiveLink(item.label)}
							>
								<Styles.Icon
									src={isActive ? item?.active : item.icon}
									width={16}
									height={16}
									alt=''
								></Styles.Icon>
								{item.label}
							</Styles.NavLink>
						</Styles.NavItem>
					);
				})}
			</Styles.NavList>
			<Styles.UserProfile>
				<Styles.Avatar
					src='https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'
					alt='John Carter'
				/>
				<Styles.UserInfo>
					<Styles.UserName>John Carter</Styles.UserName>
					<Styles.AccountLink href='/account'>
						Account settings
					</Styles.AccountLink>
				</Styles.UserInfo>
			</Styles.UserProfile>
		</Styles.SidebarContainer>
	);
};

export default Sidebar;
