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
pub struct UpdateAccountSettings<'info> {
    #[account(mut, has_one = wallet)]
    pub user: Account<'info, User>,
    pub wallet: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateSurveyStats<'info> {
    #[account(mut, has_one = wallet)]
    pub user: Account<'info, User>,
    pub wallet: Signer<'info>,
}


#[account]
pub struct User {
    pub username: String,
    pub email: String,
    pub wallet: Pubkey,
    pub avatar_ipfs_hash: String,
    pub earned_money: u64,
    pub surveys_attended: u32,
    pub surveys_created: u32, 
    pub created_at: i64,
    pub updated_at: i64
}

/// Defines the maximum size of each field in the User struct
impl User {
    pub const MAX_SIZE: usize = 
        4 + 64 + // username
        4 + 64 + // email
        32 +     // wallet
        4 + 64 + // avatar_ipfs_hash
        8 +      // earned_money
        4 +      // surveys_attended
        4 +      // surveys_created
        8 +      // created_at
        8;       // updated_at
}

pub fn register_user(
    ctx: Context<RegisterUser>,
    username: String,
    email: String,
    avatar_ipfs_hash: String,
) -> Result<()> {
    let clock = Clock::get()?;
    let user = &mut ctx.accounts.user;

    user.username = username;
    user.email = email;
    user.wallet = *ctx.accounts.signer.key;
    user.avatar_ipfs_hash = avatar_ipfs_hash;
    user.earned_money = 0;
    user.surveys_attended = 0;
    user.surveys_created = 0;
    user.created_at = clock.unix_timestamp;
    user.updated_at = clock.unix_timestamp;

    Ok(())
}

pub fn update_user_account_settings(
    ctx: Context<UpdateUserAccountSettings>,
    username: String,
    email: String,
    avatar_ipfs_hash: String,
) -> Result<()> {
    let clock = Clock::get()?;
    let user = &mut ctx.accounts.user;

    user.username = username;
    user.email = email;
    user.avatar_ipfs_hash = avatar_ipfs_hash;
    user.updated_at = clock.unix_timestamp;

    Ok(())
}

pub fn update_user_survey_stats(
    ctx: Context<UpdateUserSurveyStats>,
    earned_money: u64,
    surveys_attended: u32,
    surveys_created: u32,
) -> Result<()> {
    let clock = Clock::get()?;
    let user = &mut ctx.accounts.user;

    user.earned_money = earned_money;
    user.surveys_attended = surveys_attended;
    user.surveys_created = surveys_created;
    user.updated_at = clock.unix_timestamp;

    Ok(())
}
