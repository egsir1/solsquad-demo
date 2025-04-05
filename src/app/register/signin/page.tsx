'use client';

import { FC, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const WalletMultiButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0f172a;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const StyledWalletButton = styled(WalletMultiButton)`
  background-color: #7c3aed !important;
  color: white !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  padding: 12px 24px !important;
  font-size: 16px !important;
  &:hover {
    background-color: #6d28d9 !important;
  }
`;

const SignIn: FC = () => {
  const { publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (publicKey) {
      router.push('/user/analytics'); // redirect to main page
    }
  }, [publicKey, router]);

  return (
    <Container>
      <Title>Sign in to SolSquad</Title>
      <StyledWalletButton />
    </Container>
  );
};

export default SignIn;
