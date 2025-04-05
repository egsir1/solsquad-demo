import React from "react";
import {
  Avatar,
  AvatarNote,
  Button,
  ButtonRow,
  Container,
  Field,
  Input,
  Label,
  Left,
  Right,
  Row,
  Select,
  TextArea,
} from "./style";
import { useProfileStore } from "@/store/user-data-store";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { PROGRAM_ID } from "@/types/json";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import idlJson from "../../../../anchor/target/idl/survey_app_program.json";
import toast from "react-hot-toast";

const idl = idlJson as Idl;

const ProfilePage = () => {
  const { profile, setProfile } = useProfileStore();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const updateProfile = async () => {
    if (!wallet || !publicKey) {
      toast.error("Wallet not connected.");
      return;
    }
    try {
      const newData = {
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        country: profile.country,
        city: profile.city,
        bio: profile.bio,
      };
      // Upload to IPFS
      const ipfsResponse = await fetch("/api/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updatedProfile: newData,
          ipfsCid: profile?.ifpc,
        }),
      });

      if (!ipfsResponse.ok) {
        throw new Error("Failed to upload to IPFS");
      }

      const { ipfsCid } = await ipfsResponse.json();

      // Update Solana
      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });
      const program = new Program(idl, provider);

      const [userPda] = await PublicKey.findProgramAddress(
        [Buffer.from("user"), publicKey.toBuffer()],
        PROGRAM_ID
      );

      await program.methods
        .updateUser(ipfsCid)
        .accounts({
          user: userPda,
          signer: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
    } catch (error) {
      console.error("Update Profile Error:", error);
    }
  };

  return (
    <Container>
      <Left>
        <Row>
          <Field>
            <Label>Email</Label>
            <Input disabled value={profile?.email} />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>First Name</Label>
            <Input
              value={profile?.firstName}
              onChange={(e) => setProfile({ lastName: e.target.value })}
            />
          </Field>
          <Field>
            <Label>Last Name</Label>
            <Input
              value={profile?.lastName}
              onChange={(e) => setProfile({ lastName: e.target.value })}
            />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Date of Birth</Label>
            <Input
              placeholder="Enter in format MM/DD/YYYY"
              value={profile?.dateOfBirth}
              onChange={(e) => setProfile({ dateOfBirth: e.target.value })}
            />
          </Field>
          <Field>
            <Label>Gender</Label>
            <Select
              defaultValue={profile?.gender}
              onChange={(e) =>
                setProfile({
                  gender: e.target.value as "Male" | "Female" | "Other",
                })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Country</Label>
            <Input
              placeholder="Please, select country"
              value={profile?.country}
              onChange={(e) => setProfile({ country: e.target.value })}
            />
          </Field>
          <Field>
            <Label>City</Label>
            <Input
              placeholder="Your city"
              value={profile?.city}
              onChange={(e) => setProfile({ city: e.target.value })}
            />
          </Field>
        </Row>
        <Field>
          <Label>Bio</Label>
          <TextArea
            placeholder="Profile Bio"
            value={profile?.bio}
            onChange={(e) => setProfile({ bio: e.target.value })}
          />
        </Field>
        <ButtonRow>
          <Button onClick={updateProfile}>Update Profile</Button>
          <Button>Verify KYC</Button>
          <Button>Verify Email</Button>
          <Button>Web3 Mail</Button>
        </ButtonRow>
      </Left>

      <Right>
        <Avatar>{profile?.firstName?.slice(0, 1)}</Avatar>
        <AvatarNote>
          <strong>User photo</strong>
          <br />
          We recommend an image of at least 400×400.
        </AvatarNote>
      </Right>
    </Container>
  );
};

export default ProfilePage;
