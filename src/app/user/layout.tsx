'use client';
import Sidebar from '@/components/navigation/side-bar';
import {
	LayoutContainer,
	MainContent,
	SidebarWrapper,
} from '@/components/user/analytics/style';
import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<LayoutContainer>
			<SidebarWrapper>
				<Sidebar />
			</SidebarWrapper>
			<MainContent>{children}</MainContent>
		</LayoutContainer>
	);
}
