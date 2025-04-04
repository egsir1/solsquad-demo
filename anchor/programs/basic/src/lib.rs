use anchor_lang::prelude::*;

pub mod user; 
use user::*; 

declare_id!("6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF");

#[program]
pub mod survey_app_program {
    use super::*;

    pub fn register_user(
        ctx: Context<RegisterUser>,
        username: String,
        email: String,
        avatar_ipfs_hash: String,
    ) -> Result<()> {
        user::register_user(ctx, username, email, avatar_ipfs_hash)
    }

    pub fn update_user_account_settings(
        ctx: Context<UpdateUserAccountSettings>,
        username: String,
        email: String,
        avatar_ipfs_hash: String,
    ) -> Result<()> {
        user::update_user_account_settings(ctx, username, email, avatar_ipfs_hash)
    }

    pub fn update_user_survey_stats(
        ctx: Context<UpdateUserSurveyStats>,
        earned_money: u64,
        surveys_attended: u32,
        surveys_created: u32,
    ) -> Result<()> {
        user::update_user_survey_stats(ctx, earned_money, surveys_attended, surveys_created)
    }
}
