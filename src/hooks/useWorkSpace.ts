// contexts/useWorkspace.ts
'use client';

import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

import idl from '../../anchor/target/idl/survey_app_program.json'; // adjust path
console.log('🚀 ~ idl:', idl);
const programID = new PublicKey('12HfFyuzmP8mCTWCCiqcTE9VMBFzQNSyKNfCREq2yDTe');

// Optional: If you generated typed TypeScript definitions for your IDL
// import { SurveyAppProgram } from '@/types/survey_app_program';

export function useWorkspace() {
	const { connection } = useConnection();
	const walletAdapter = useWallet();

	// Build an AnchorProvider whenever wallet is connected
	const provider = useMemo(() => {
		if (!walletAdapter.publicKey) return null;
		return new AnchorProvider(
			connection,
			{
				publicKey: walletAdapter.publicKey,
				signTransaction:
					walletAdapter.signTransaction ??
					(async tx => Promise.reject('signTransaction is undefined')),
				signAllTransactions:
					walletAdapter.signAllTransactions ??
					(async txs => Promise.reject('signAllTransactions is undefined')),
			},
			{ preflightCommitment: 'processed' }
		);
	}, [connection, walletAdapter]);

	// Instantiate the program from IDL & provider
	const program = useMemo(() => {
		if (!provider) return null;

		// If using typed IDL: new Program<SurveyAppProgram>(...)
		//@ts-ignore
		return new Program(idl as any, programID, provider);
	}, [provider]);

	return {
		wallet: walletAdapter,
		provider,
		program, // null until wallet is connected
	};
}
