import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<div className=''>
			{/* Sidebar */}
			<h1>SIDEBAR</h1>

			{/* Main Content */}
			<main>{children}</main>
		</div>
	);
}
