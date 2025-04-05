import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SurveyAppProgram } from "../target/types/survey_app_program";

describe("SurveyAppProgram - Participation", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace
    .SurveyAppProgram as Program<SurveyAppProgram>;

  it("registers a participation", async () => {
    const participation = anchor.web3.Keypair.generate();
    const survey: anchor.web3.Keypair = anchor.web3.Keypair.generate();

    await program.methods
      .registerParticipation("participation-ipfn-cid")
      .accounts({
        participation: participation.publicKey,
        signer: provider.wallet.publicKey,
      })
      .signers([participation])
      .rpc();

    const participationAccount = await program.account.participation.fetch(
      participation.publicKey
    );
    expect(participationAccount.ipfnCid).toBe("participation-ipfn-cid");
  });
});
