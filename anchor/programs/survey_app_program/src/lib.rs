use anchor_lang::prelude::*;

pub mod user;
use user::*;
use survey::{Survey}; // Explicit imports
pub mod survey;
use survey::*;

pub mod participation;
use participation::*;

// declare_id!("12HfFyuzmP8mCTWCCiqcTE9VMBFzQNSyKNfCREq2yDTe");
declare_id!("DaCvrrNqNu2SA5Jx9R7Jverp9FxtSzezCg3eu4H2aWGn");


#[program]
pub mod survey_app_program {
    use super::*;

    pub fn register_user(ctx: Context<RegisterUser>, ipfn_cid: String) -> Result<()> {
        user::register_user(ctx, ipfn_cid)
    }
    
    pub fn update_user(ctx: Context<UpdateUser>, ipfn_cid: String) -> Result<()> {
        user::update_user(ctx, ipfn_cid)
    }
 
    pub fn register_survey(
        ctx: Context<RegisterSurvey>,
        ipfn_cid: String,
        survey_type: String,
        reward_amount: u64,
    ) -> Result<()> {
        survey::register_survey(ctx, ipfn_cid, survey_type, reward_amount)
    }
    pub fn register_participation(
        ctx: Context<RegisterParticipation>,
        ipfn_cid: String
    ) ->Result<()> {
        participation::register_participation(
            ctx,
            ipfn_cid
        )
    }
}