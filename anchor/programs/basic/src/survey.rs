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
pub struct UpdateSurveySettings<'info> {
    #[account(
        mut,
        has_one = creator
    )]
    pub survey: Account<'info, Survey>,
    pub creator: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateSurveyFunds<'info> {
    #[account(
        mut,
        has_one = creator @ ErrorCode::Unauthorized
    )]
    pub survey: Account<'info, Survey>,
    pub creator: Signer<'info>,
}

#[derive(Accounts)]
pub struct LockSurvey<'info> {
    #[account(
        mut,
        has_one = creator @ ErrorCode::Unauthorized
    )]
    pub survey: Account<'info, Survey>,
    pub creator: Signer<'info>,
}



#[derive(Accounts)]
pub struct SubmitSurveyResponse<'info> {
    #[account(mut)]
    pub survey: Account<'info, Survey>,
    pub responder: Signer<'info>,
}

pub struct Survey {
    pub id: u64,
    pub creator: Pubkey,
    pub survey_type: SurveyType,
    pub survey_status: SurveyStatus,
    pub title: String,
    pub reward_per_response: u64,
    pub max_responses: u64,
    pub questions_ipfs_hash: String,
    pub current_responses_ipfs_hash: String,
    pub final_responses_ipfs_hash: String,
    pub responses: Vec<Pubkey>,
    pub total_funded: u64,
    pub created_at: i64,
    pub updated_at: i64
}

impl Survey {
    pub const MAX_RESPONSES: usize = 1000;
    pub const MAX_SIZE: usize =
        8 +         // id
        32 +        // creator
        1 +         // survey_type
        1 +         // survey_status
        4 + 128 +   // title
        8 +         // reward_per_response
        8 +         // max_responses
        4 + 64 +    // questions_ipfs_hash
        4 + 64 +    // current_responses_ipfs_hash
        4 + 64 +    // final_responses_ipfs_hash
        4 + (32 * Self::MAX_RESPONSES) + // responses
        8 +         // total_funded
        8 +         // created_at
        8;          // updated_at
}

// Enum for survey type
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum SurveyType {
    FREE,
    PAID,
}


// Enum for survey status
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum SurveyStatus {
    DEVELOPMENT,
    DEPLOYED,
    FINISHED,
}

impl Default for SurveyType {
    fn default() -> Self {
        SurveyType::FREE
    }
}

impl Default for SurveyStatus {
    fn default() -> Self {
        SurveyStatus::DEVELOPMENT
    }
}


pub fn register_survey(
    ctx: Context<RegisterSurvey>,
    survey_type: SurveyType,
    title: String,
    reward_per_response: u64,
    max_responses: u64,
    questions_ipfs_hash: String,
) -> Result<()> {
    let clock = Clock::get()?;
    let survey = &mut ctx.accounts.survey;

    survey.creator = *ctx.accounts.signer.key;
    survey.survey_type = survey_type;
    survey.survey_status = SurveyStatus::DEVELOPMENT;
    survey.title = title;
    survey.reward_per_response = reward_per_response;
    survey.max_responses = max_responses;
    survey.questions_ipfs_hash = questions_ipfs_hash;

    survey.current_responses_ipfs_hash="".to_string();
    survey.final_responses_ipfs_hash="".to_string();
    survey.responses=vec![];
    survey.total_funded=0;
    survey.created_at = clock.unix_timestamp;
    survey.updated_at = clock.unix_timestamp;

    Ok(())
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
    let clock = Clock::get()?;
    let survey = &mut ctx.accounts.survey;

    survey.survey_type = survey_type;
    survey.survey_status = survey_status;
    survey.title = title;
    survey.reward_per_response = reward_per_response;
    survey.max_responses = max_responses;
    survey.questions_ipfs_hash = questions_ipfs_hash;
    survey.updated_at = clock.unix_timestamp;

    Ok(())
}

pub fn update_survey_funds(
    ctx: Context<UpdateSurveyFunds>,
    total_funded: u64,
) -> Result<()> {
    let clock = Clock::get()?;
    let survey = &mut ctx.accounts.survey;

    survey.total_funded = total_funded;
    survey.updated_at = clock.unix_timestamp;

    Ok(())
}

pub fn submit_response(
    ctx: Context<SubmitSurveyResponse>,
    response_ipfs_hash: String,
) -> Result<()> {
    let clock = Clock::get()?;
    let survey = &mut ctx.accounts.survey;

    survey.responses.push(*ctx.accounts.responder.key);
    survey.current_responses_ipfs_hash = response_ipfs_hash;
    survey.updated_at = clock.unix_timestamp;

    Ok(())
}


pub fn lock_survey(ctx: Context<LockSurvey>) -> Result<()> {
    let clock = Clock::get()?;
    let survey = &mut ctx.accounts.survey;

    survey.survey_status = SurveyStatus::DEPLOYED;
    survey.updated_at = clock.unix_timestamp;

    Ok(())
}
