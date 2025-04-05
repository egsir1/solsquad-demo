'use client';

import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import * as Styles from './style';
import { ExplorerLink } from '../cluster/cluster-ui';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import useScreenWidth from '@/hooks/useScreenWidth';

// Dynamically import TopBar (client-side only)
const TopBar = dynamic(() => import('../navigation/top-bar'), {
	ssr: false,
});

export function UiLayout({ children }: { children: ReactNode }) {
	const [showSidebar, setShowSidebar] = React.useState(false);
	const screenWidth = useScreenWidth();
	const isMobile = screenWidth < 768;
	const pathname = usePathname();
	const isRegisterPage = pathname.includes('register');

	return (
		<Styles.Container>
			{!isRegisterPage && (
				<TopBar show={showSidebar} onOpen={() => setShowSidebar(true)} />
			)}
			<Styles.Main>
				{!isRegisterPage && isMobile && showSidebar && (
					// Mobile sidebar when on mobile devices
					<MobileSidebar onClose={() => setShowSidebar(false)} />
				)}
				<Suspense>{children}</Suspense>
				<Toaster position='bottom-right' />
			</Styles.Main>
		</Styles.Container>
	);
}

// Modal component that can be reused across the app.
export function AppModal({
	children,
	title,
	hide,
	show,
	submit,
	submitDisabled,
	submitLabel,
}: {
	children: ReactNode;
	title: string;
	hide: () => void;
	show: boolean;
	submit?: () => void;
	submitDisabled?: boolean;
	submitLabel?: string;
}) {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (!dialogRef.current) return;
		if (show) {
			dialogRef.current.showModal();
		} else {
			dialogRef.current.close();
		}
	}, [show]);

	return (
		<dialog className='modal' ref={dialogRef}>
			<div className='modal-box space-y-5'>
				<h3 className='font-bold text-lg'>{title}</h3>
				{children}
				<div className='modal-action'>
					<div className='join space-x-2'>
						{submit && (
							<button
								className='btn btn-xs lg:btn-md btn-primary'
								onClick={submit}
								disabled={submitDisabled}
							>
								{submitLabel || 'Save'}
							</button>
						)}
						<button onClick={hide} className='btn'>
							Close
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
}

// Simple hero component for displaying a title and subtitle.
export function AppHero({
	children,
	title,
	subtitle,
}: {
	children?: ReactNode;
	title: ReactNode;
	subtitle: ReactNode;
}) {
	return (
		<div className='hero py-[64px]'>
			<div className='hero-content text-center'>
				<div className='max-w-2xl'>
					{typeof title === 'string' ? (
						<h1 className='text-5xl font-bold'>{title}</h1>
					) : (
						title
					)}
					{typeof subtitle === 'string' ? (
						<p className='py-6'>{subtitle}</p>
					) : (
						subtitle
					)}
					{children}
				</div>
			</div>
		</div>
	);
}

// Utility function to ellipsify long strings.
export function ellipsify(str = '', len = 4) {
	if (str.length > 30) {
		return str.substring(0, len) + '..' + str.substring(str.length - len);
	}
	return str;
}

// Custom hook to display a toast with a link to the explorer for a transaction.
export function useTransactionToast() {
	return (signature: string) => {
		toast.success(
			<div className='text-center'>
				<div className='text-lg'>Transaction sent</div>
				<ExplorerLink
					path={`tx/${signature}`}
					label={'View Transaction'}
					className='btn btn-xs btn-primary'
				/>
			</div>
		);
	};
}

// If MobileSidebar is not defined elsewhere, here is a simple stub implementation.
const MobileSidebar = ({ onClose }: { onClose: () => void }) => {
	return (
		<div
			style={{
				position: 'fixed',
				width: '100%',
				height: '100%',
				background: '#000000aa',
				zIndex: 1000,
			}}
		>
			<div style={{ background: '#fff', padding: '20px' }}>
				<button onClick={onClose}>Close Sidebar</button>
				<p>Mobile Sidebar Content</p>
			</div>
		</div>
	);
};

export default UiLayout;
