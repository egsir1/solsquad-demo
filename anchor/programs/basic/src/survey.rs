use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RegisterSurvey<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + Survey::MAX_SIZE
    )]
    pub survey: Account<'info, Survey>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Survey {
    pub authority: Pubkey,
    pub ipfn_cid: String,
}

impl Survey {
    pub const MAX_SIZE: usize = 32 + 4 + 128;
}

pub fn register_survey(ctx: Context<RegisterSurvey>, ipfn_cid: String) -> Result<()> {
    let survey = &mut ctx.accounts.survey;
    survey.ipfn_cid = ipfn_cid;
    survey.authority = ctx.accounts.signer.key();
    Ok(())
}
