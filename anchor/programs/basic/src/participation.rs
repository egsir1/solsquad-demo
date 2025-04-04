use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RegisterParticipation<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + Participation::MAX_SIZE
    )]
    pub participation: Account<'info, Participation>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}


#[account]
pub struct Participation {
    pub authority: Pubkey,
    pub ipfn_cid: String,
}

impl Participation {
    pub const MAX_SIZE: usize = 32 + 4 + 128;
}

pub fn register_participation(ctx: Context<RegisterParticipation>, ipfn_cid: String) -> Result<()> {
    let participation = &mut ctx.accounts.participation;
    participation.ipfn_cid = ipfn_cid;
    participation.authority = ctx.accounts.signer.key();
    Ok(())
}
