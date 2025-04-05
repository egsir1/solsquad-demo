"use client";

import { useState, useRef } from "react";
import * as Styles from "./style";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { AnchorProvider, Program, web3, Idl } from "@coral-xyz/anchor";
import idlJson from "../../../../anchor/target/idl/survey_app_program.json";

const idl = idlJson as Idl;
const programId = new web3.PublicKey(
  "DaCvrrNqNu2SA5Jx9R7Jverp9FxtSzezCg3eu4H2aWGn"
);

interface FormData {
  name: string;
  email?: string;
  bio?: string;
  firstName: string;
  lastName?: string;
}

const OnboardPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    bio: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<{ name?: string }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { publicKey } = useWallet();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && value.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    if (!formData.firstName.trim()) {
      newErrors.name = "Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wallet || !wallet.publicKey) {
      alert("Wallet not connected.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });
      console.log(provider, "provider");

      const program = new Program(idl as any, provider);
      console.log(program, "program");

      // Step 1: Create a new keypair for the user account
      const userKeypair = Keypair.generate();

      // Step 2: Upload to IPFS or use a real CID
      const ipfsCid = "example_ipfs_cid_here"; // Replace this with actual IPFS CID

      // Step 3: Call registerUser
      await program.methods
        .registerUser(ipfsCid)
        .accounts({
          user: userKeypair.publicKey,
          signer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([userKeypair])
        .rpc();

      alert("User registered successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error submitting to Solana:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Styles.OnboardContainer>
      <Styles.FormCard>
        <Styles.Title>Create Your Profile</Styles.Title>
        <Styles.Form onSubmit={handleSubmit}>
          <Styles.FlexRow>
            <Styles.FormGroup>
              <Styles.Label htmlFor="firstName">First Name *</Styles.Label>
              <Styles.Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </Styles.FormGroup>
            <Styles.FormGroup>
              <Styles.Label htmlFor="lastName">
                Last Name (Optional)
              </Styles.Label>
              <Styles.Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </Styles.FormGroup>
          </Styles.FlexRow>

          <Styles.FlexRow>
            <Styles.FormGroup>
              <Styles.Label htmlFor="email">Email (Optional)</Styles.Label>
              <Styles.Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Styles.FormGroup>
          </Styles.FlexRow>

          <Styles.FormGroup>
            <Styles.Label htmlFor="bio">Bio (Optional)</Styles.Label>
            <Styles.TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </Styles.FormGroup>

          <Styles.SubmitButton
            type="submit"
            disabled={isSubmitting || !formData.firstName.trim()}
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Styles.SubmitButton>
        </Styles.Form>
      </Styles.FormCard>
    </Styles.OnboardContainer>
  );
};

export default OnboardPage;
