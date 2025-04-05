import { AnchorProvider, BN, Idl, Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import IdJson from "../../anchor/target/idl/survey_app_program.json";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PROGRAM_ID } from "@/types/json";

const idl = IdJson as Idl;

const CreateSurveyHook = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const { publicKey, signTransaction } = useWallet();

  async function registerSurvey(
    ipfsCid: string,
    surveyType: string,
    reward: string
  ) {
    if (!wallet || !publicKey || !signTransaction) {
      alert("Wallet not fully connected or signing unavailable");
      throw new Error("Wallet not connected or signing unavailable");
    }
    if (!connection) throw new Error("No connection available");

    try {
      // Set up provider with proper commitment
      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
        preflightCommitment: "confirmed",
      });
      const program = new Program(idl, provider);

      // Log all parameters
      console.log("Using parameters:", {
        ipfsCid,
        surveyType,
        rewardAmount: new BN(reward).toString(),
        pubkey: publicKey.toBase58(),
        programId: PROGRAM_ID.toBase58(),
      });

      // Derive PDA
      const [surveyPda] = await PublicKey.findProgramAddress(
        [Buffer.from("survey"), publicKey.toBuffer()],
        PROGRAM_ID
      );

      // Execute transaction
      const tx = await program.methods
        .registerSurvey(ipfsCid, surveyType, new BN(reward))
        .accounts({
          survey: surveyPda,
          signer: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction succeeded:", tx);
      return tx;
    } catch (error) {
      // Enhanced error logging
      console.error("Error details:", error);
      if (error.logs) {
        console.error("Transaction logs:", error.logs);
      }
      throw error;
    }
  }

  return { registerSurvey };
};

export default CreateSurveyHook;
