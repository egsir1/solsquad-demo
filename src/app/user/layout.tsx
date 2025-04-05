'use client';
import Sidebar from '@/components/navigation/side-bar';
import {
	LayoutContainer,
	MainContent,
	SidebarWrapper,
} from '@/components/user/analytics/style';
import useScreenWidth from '@/hooks/useScreenWidth';
import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
	const screenWidth = useScreenWidth();
	const isMobile = screenWidth < 768;

	return (
		<LayoutContainer>
			{!isMobile && (
				<SidebarWrapper>
					<Sidebar />
				</SidebarWrapper>
			)}
			<MainContent>{children}</MainContent>
		</LayoutContainer>
	);
}
