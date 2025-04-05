use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

#[derive(Accounts)]
pub struct RegisterSurvey<'info> { // Remove #[instruction(hashed_cid: Vec<u8>)]
    #[account(
        init,
        payer = signer,
        space = 8 + Survey::MAX_SIZE,
        seeds = [b"survey", signer.key().as_ref()],
        bump
    )]
    pub survey: Account<'info, Survey>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateSurvey<'info> {
    #[account(
        mut,
        has_one = authority
    )]
    pub survey: Account<'info, Survey>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Survey {
    pub authority: Pubkey,
    pub ipfn_cid: String,
    pub survey_type: String,
    pub reward_amount: u64,
}

impl Survey {
    pub const MAX_SIZE: usize = 32 + (4 + 128) + (4 + 32) + 8; // 208 bytes, fixed below
}

pub fn register_survey(
    ctx: Context<RegisterSurvey>,
    ipfn_cid: String,
    survey_type: String,
    reward_amount: u64,
) -> Result<()> {
    let survey = &mut ctx.accounts.survey;
    let signer = &ctx.accounts.signer;

    survey.authority = signer.key();
    survey.ipfn_cid = ipfn_cid;
    survey.survey_type = survey_type.clone();
    survey.reward_amount = reward_amount;

    msg!("Survey PDA: {}", survey.key());
    msg!("Signer: {}", signer.key());

    if survey_type == "PAID" && signer.lamports() < reward_amount {
        return Err(ErrorCode::InsufficientFunds.into());
    }
    if survey_type == "FREE" && reward_amount != 0 {
        return Err(ErrorCode::InvalidRewardAmount.into());
    }

    Ok(())
}

pub fn update_survey(ctx: Context<UpdateSurvey>, ipfn_cid: String) -> Result<()> {
    let survey = &mut ctx.accounts.survey;
    survey.ipfn_cid = ipfn_cid;
    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Insufficient funds to pay reward")]
    InsufficientFunds,
    #[msg("Reward amount must be 0 for FREE surveys")]
    InvalidRewardAmount,
}