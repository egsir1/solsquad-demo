import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SurveyAppProgram } from "../target/types/survey_app_program";

describe("SurveyAppProgram - User", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace
    .SurveyAppProgram as Program<SurveyAppProgram>;

  it("registers a user", async () => {
    const user = anchor.web3.Keypair.generate();

    await program.methods
      .registerUser("user-ipfn-cid")
      .accounts({
        user: user.publicKey,
        signer: provider.wallet.publicKey,
      })
      .signers([user])
      .rpc();

    const userAccount = await program.account.user.fetch(user.publicKey);
    expect(userAccount.ipfnCid).toBe("user-ipfn-cid");
    expect(userAccount.wallet.toBase58()).toBe(
      provider.wallet.publicKey.toBase58()
    );
  });
});
