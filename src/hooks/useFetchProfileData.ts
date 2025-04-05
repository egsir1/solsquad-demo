import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import idlJson from "../../anchor/target/idl/survey_app_program.json";
import { PROGRAM_ID } from "@/types/json";
import { useProfileStore } from "@/store/user-data-store";

const idl = idlJson as Idl;

interface UserAccount {
  authority: PublicKey;
  ipfsCid: string;
}

interface ProfileData {
  name: string;
  email?: string;
  bio?: string;
  firstName: string;
  lastName?: string;
}

export const useFetchProfileData = () => {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setProfile } = useProfileStore();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!publicKey) {
        setError("Please connect your wallet to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const [userPda] = await PublicKey.findProgramAddress(
          [Buffer.from("user"), publicKey.toBuffer()],
          PROGRAM_ID
        );

        const accountInfo = await connection.getAccountInfo(userPda);
        if (!accountInfo) {
          setLoading(false);
          return;
        }

        const provider = new AnchorProvider(connection, wallet, {
          commitment: "confirmed",
        });
        const program = new Program(idl, provider);

        const accountData = await program.account.user.fetch(userPda);

        const response = await fetch(
          `https://ipfs.io/ipfs/${accountData.ipfnCid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from IPFS");
        }

        const data = await response.json();
        setProfile({
          bio: data?.bio || "",
          city: data?.city || "",
          country: data?.country || "",
          dateOfBirth: data?.dateOfBirth || "",
          email: data?.email || "",
          firstName: data?.firstName || "",
          gender: data?.gender || "Other",
          lastName: data?.lastName || "",
          ifpc: accountData?.ipfnCid,
        });
      } catch (err) {
        setError("Failed to load profile data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [publicKey, connection, wallet]);
  return { loading, error };
};
