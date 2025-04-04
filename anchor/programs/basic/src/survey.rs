use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RegisterSurvey<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + Survey::MAX_SIZE
    )]
    pub survey: Account<'info, Survey>,
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateSurvey<'info> {
    #[account(mut, has_one = creator)]
    pub survey: Account<'info, Survey>,
    pub creator: Signer<'info>,
}

#[account]
pub struct Survey {
    pub ipfn_cid: String,
}

impl Survey {
    pub const MAX_SIZE: usize = 4 + 128;
}

pub fn register_survey(ctx: Context<RegisterSurvey>, ipfn_cid: String) -> Result<()> {
    ctx.accounts.survey.ipfn_cid = ipfn_cid;
    Ok(())
}

