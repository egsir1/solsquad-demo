use anchor_lang::prelude::*;

#[account]
pub struct User {
    pub wallet: Pubkey,
    pub ipfn_cid: String,
    pub bump: u8,
}

impl User {
    pub const MAX_SIZE: usize = 32 + 4 + 100 + 1; // Adjust size as needed
}

#[derive(Accounts)]
#[instruction(ipfn_cid: String)] // THIS IS IMPORTANT
pub struct RegisterUser<'info> {
    #[account(
        init_if_needed,
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

#[derive(Accounts)]
pub struct UpdateUser<'info> {
    #[account(
        mut,
    )]
    pub user: Account<'info, User>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}


pub fn register_user(ctx: Context<RegisterUser>, ipfn_cid: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let bump = ctx.bumps.user;

    user.wallet =ctx.accounts.signer.key;
    user.ipfn_cid = ipfn_cid;
    user.bump = bump;

    Ok(())
}

pub fn update_user(ctx: Context<UpdateUser>, ipfn_cid: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.ipfn_cid = ipfn_cid;
    Ok(())
}