use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RegisterUser<'info> {
    #[account(
        init,
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


#[account]
pub struct User {
    pub wallet: Pubkey,
    pub ipfn_cid: String,
}

impl User {
    pub const MAX_SIZE: usize = 
        32 +      // wallet
        4 + 100;  // ipfn_cid
}

pub fn register_user(ctx: Context<RegisterUser>, ipfn_cid: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.wallet = *ctx.accounts.signer.key;
    user.ipfn_cid = ipfn_cid;
    Ok(())
}

pub fn update_user(ctx: Context<UpdateUser>, ipfn_cid: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.ipfn_cid = ipfn_cid;
    Ok(())    
}
