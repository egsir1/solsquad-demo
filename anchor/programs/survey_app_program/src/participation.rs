use anchor_lang::prelude::*;
use crate::survey::{Survey};


#[derive(Accounts)]
pub struct RegisterParticipation<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + Participation::MAX_SIZE,
        seeds = [b"participation", survey.key().as_ref(), signer.key().as_ref()],
        bump
    )]
    pub participation: Account<'info, Participation>,
    #[account(mut)]
    pub survey: Account<'info, Survey>,
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    /// CHECK: Validated by survey.authority
    pub survey_authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateParticipation<'info> {
    #[account(
        mut,
        has_one = authority
    )]
    pub participation: Account<'info, Participation>,
    pub authority: Signer<'info>,
}


// #[account]
// pub struct Participation {
//     pub authority: Pubkey,
//     pub ipfn_cid: String,
// }

#[account]
pub struct Participation {
    pub authority: Pubkey,
    pub survey: Pubkey,
    pub ipfn_cid: String,
    pub reward_paid: bool,
}

impl Participation {
    pub const MAX_SIZE: usize = 32 + 32 + (4 + 128) + 1;
}
// impl Participation {
//     pub const MAX_SIZE: usize = 
//         32 + 4 +    // authority
//         128;        // ipfn_cid
// }



pub fn register_participation(ctx: Context<RegisterParticipation>, ipfn_cid: String) -> Result<()> {
    let participation = &mut ctx.accounts.participation;
    let survey = &mut ctx.accounts.survey;

    participation.authority = ctx.accounts.signer.key();
    participation.survey = survey.key();
    participation.ipfn_cid = ipfn_cid;
    participation.reward_paid = false;


    if survey.survey_type == "PAID" && !participation.reward_paid {
        let reward_amount = survey.reward_amount;

        if ctx.accounts.survey_authority.lamports() < reward_amount {
            return Err(ErrorCode::InsufficientFunds.into());
        }

        let cpi_accounts = anchor_lang::system_program::Transfer {
            from: ctx.accounts.survey_authority.to_account_info(),
            to: ctx.accounts.signer.to_account_info(),
        };
        let cpi_program = ctx.accounts.system_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        anchor_lang::system_program::transfer(cpi_ctx, reward_amount)?;
        participation.reward_paid = true;
    }

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Insufficient funds to pay reward")]
    InsufficientFunds,
    #[msg("Arithmetic overflow occurred")]
    Overflow,
}

pub fn update_participation(ctx: Context<UpdateParticipation>, ipfn_cid: String) -> Result<()> {
    let participation = &mut ctx.accounts.participation;
    participation.ipfn_cid = ipfn_cid;
    Ok(())
}