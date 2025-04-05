// src/components/register/onboard/board-form.tsx (or wherever your OnboardPage is)
"use client";

import { useState, useRef } from "react";
import * as Styles from "./style";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import idlJson from "../../../../anchor/target/idl/survey_app_program.json";
import toast from "react-hot-toast";

const idl = idlJson as Idl;
const programId = new PublicKey("DaCvrrNqNu2SA5Jx9R7Jverp9FxtSzezCg3eu4H2aWGn");

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
    if (name === "firstName" && value.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    if (!formData.firstName.trim()) {
      newErrors.name = "First Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to call the API route for IPFS upload
  const uploadToIPFS = async (data: FormData) => {
    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to upload to IPFS");
      }

      const result = await response.json();
      return result.ipfsCid;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wallet || !wallet.publicKey) {
      toast.error("Wallet not connected.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload formData to IPFS via API route
      const ipfsCid = await uploadToIPFS(formData);

      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });

      const program = new Program(idl, provider);

      // Derive PDA for the user account
      const [userPda] = await PublicKey.findProgramAddress(
        [Buffer.from("user"), wallet.publicKey.toBuffer()],
        program.programId
      );

      // Store the IPFS CID on Solana
      await program.methods
        .registerUser(ipfsCid)
        .accounts({
          user: userPda,
          signer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast.success("User registered successfully!");
      router.push("/user/profile");
    } catch (error) {
      console.error("Error submitting to Solana:", error);
      toast.error("Failed to update profile. Please try again.");
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
              {errors.name && <p>{errors.name}</p>}
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
