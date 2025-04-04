use anchor_lang::prelude::*;

pub mod user; 
use user::*; 

declare_id!("6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF");

#[program]
pub mod user_program {
    use super::*;

    pub fn register_user(
        ctx: Context<RegisterUser>,
        username: String,
        email: String,
        avatar_ipfs_hash: String,
    ) -> Result<()> {
        user::register_user(ctx, username, email, avatar_ipfs_hash)
    }

    pub fn update_account_settings(
        ctx: Context<UpdateAccountSettings>,
        username: String,
        email: String,
        avatar_ipfs_hash: String,
    ) -> Result<()> {
        user::update_account_settings(ctx, username, email, avatar_ipfs_hash)
    }

    pub fn update_survey_stats(
        ctx: Context<UpdateSurveyStats>,
        earned_money: u64,
        surveys_attended: u32,
        surveys_created: u32,
    ) -> Result<()> {
        user::update_survey_stats(ctx, earned_money, surveys_attended, surveys_created)
    }
}

