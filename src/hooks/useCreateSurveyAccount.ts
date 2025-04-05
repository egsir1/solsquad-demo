"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { PROGRAM_ID } from "@/types/json";

// Define the Survey MAX_SIZE constant (copied from backend)
const SURVEY_MAX_SIZE = 181; // 32 + (4 + 128) + 1 + 8 + 8 = 181 bytes

const useCreateSurveyAccount = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  async function createSurveyAccount(ipfsCid: string) {
    if (!publicKey) {
      throw new Error("Wallet not connected");
    }
    if (!connection) {
      throw new Error("No connection available");
    }

    try {
      const { createHash } = await import("crypto");
      const cidHash = createHash("sha256").update(ipfsCid).digest().slice(0, 32);
      const [surveyPda] = await PublicKey.findProgramAddress(
        [Buffer.from("survey"), publicKey.toBuffer(), cidHash],
        PROGRAM_ID
      );

      const space = 8 + SURVEY_MAX_SIZE; // 8 bytes discriminator + data size
      const lamports = await connection.getMinimumBalanceForRentExemption(space);

      const tx = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: surveyPda,
          lamports,
          space,
          programId: PROGRAM_ID,
        })
      );

      const signature = await sendTransaction(tx, connection, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });

      await connection.confirmTransaction(signature, "confirmed");
      console.log("Survey account created:", surveyPda.toBase58());
      return surveyPda;
    } catch (error) {
      console.error("Error creating survey account:", error);
      throw error;
    }
  }

  return { createSurveyAccount };
};

export default useCreateSurveyAccount;