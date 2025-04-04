use anchor_lang::prelude::*;

pub mod user;
use user::*;

declare_id!("6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF");

#[program]
pub mod survey_app_program {
    use super::*;

    pub fn register_user(ctx: Context<RegisterUser>, ipfn_cid: String) -> Result<()> {
        user::register_user(ctx, ipfn_cid)
    }
}
