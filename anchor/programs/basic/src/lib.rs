use anchor_lang::prelude::*;

pub mod user; 
use user::*; 

pub mod survey
use survey::*;

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

    pub fn register_survey(
        ctx: Context<RegisterSurvey>,
        survey_type: SurveyType,
        title: String,
        reward_per_response: u64,
        max_responses: u64,
        questions_ipfs_hash: String,
    )-> Result<()> {
        survey::register_survey(
            ctx,
            survey_type,
            title,
            reward_per_response,
            max_responses,
            questions_ipfs_hash,
        )
    }


    pub fn update_survey_settings(
        ctx: Context<UpdateSurveySettings>,
        survey_type: SurveyType,
        survey_status: SurveyStatus,
        title: String,
        reward_per_response: u64,
        max_responses: u64,
        questions_ipfs_hash: String,
    ) -> Result<()> {
        survey::update_survey_settings(
            ctx,
            survey_type,
            survey_status,
            title,
            reward_per_response,
            max_responses,
            questions_ipfs_hash,
        )
    }

    pub fn update_survey_answers(
        ctx: Context<UpdateSurveyAnswers>,
        survey_id: Pubkey,
        current_responses_ipfs_hash: Vec<String>,
    ) -> Result<()> {
        survey::update_survey_answers(ctx, survey_id, current_responses_ipfs_hash)
    }

    pub fn update_survey_funds(
        ctx: Context<UpdateSurveyFunds>,
        survey_id: Pubkey,
        total_funded: u64,
    ) -> Result<()> {
        survey::update_survey_funds(ctx, survey_id, total_funded)
    }


    pub fn lock_survey(
        ctx: Context<LockSurvey>,
        survey_id: Pubkey,
    ) -> Result<()> {
        survey::lock_survey(ctx, survey_id)
    }

    pub fn register_survey_response(
        ctx: Context<RegisterSurveyResponse>,
        survey_id: Pubkey,
        response: String,
    ) -> Result<()> {
        survey::register_survey_response(ctx, survey_id, response)
    }

}
