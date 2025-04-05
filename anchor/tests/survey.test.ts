import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SurveyAppProgram } from "../target/types/survey_app_program";

describe("SurveyAppProgram", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace
    .SurveyAppProgram as Program<SurveyAppProgram>;

  it("registers a survey", async () => {
    const survey = anchor.web3.Keypair.generate();

    await program.methods
      .registerSurvey("my-ipfn-cid")
      .accounts({
        survey: survey.publicKey,
        signer: provider.wallet.publicKey,
      })
      .signers([survey])
      .rpc();

    const surveyAccount = await program.account.survey.fetch(survey.publicKey);
    expect(surveyAccount.ipfnCid).toBe("my-ipfn-cid");
  });
});
