// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import SurveyAppProgramIDL from "../target/idl/survey_app_program.json";
import type { SurveyAppProgram } from "../target/types/survey_app_program";

// Re-export the generated IDL and type
export { SurveyAppProgram, SurveyAppProgramIDL };

// The programId is imported from the program IDL.
export const BASIC_PROGRAM_ID = new PublicKey(SurveyAppProgramIDL.address);

// This is a helper function to get the Basic Anchor program.
export function getBasicProgram(provider: AnchorProvider) {
  return new Program(SurveyAppProgramIDL as SurveyAppProgram, provider);
}
