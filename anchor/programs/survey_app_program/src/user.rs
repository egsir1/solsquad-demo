use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RegisterUser<'info> {
    #[account(
        init,
        seeds = [b"user", signer.key().as_ref()],
        bump,
        payer = signer,
        space = 8 + User::MAX_SIZE
    )]
    pub user: Account<'info, User>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    pub wallet: Pubkey,
    pub ipfn_cid: String,
    pub bump: u8,
}

impl User {
    pub const MAX_SIZE: usize =
        32 + // wallet
        4 + 100 + // ipfn_cid (String)
        1; // bump
}

pub fn register_user(ctx: Context<RegisterUser>, ipfn_cid: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let bump = ctx.bumps.user;

    user.wallet = *ctx.accounts.signer.key;
    user.ipfn_cid = ipfn_cid;
    user.bump = bump;

    Ok(())
}