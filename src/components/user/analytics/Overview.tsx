import React from 'react';
import * as Styles from './style';

const Overview = () => {
	return (
		<Styles.OverViewContainer>
			<Styles.OverviewCard>
				<Styles.CardLeft>
					<img
						height={30}
						width={30}
						src='/assets/svg-images/Solana.svg'
						alt='Solana Logo'
					/>
					<Styles.CardTitle>Current Balance</Styles.CardTitle>
				</Styles.CardLeft>
				<Styles.CardSubTitle>0.00 SOL</Styles.CardSubTitle>
			</Styles.OverviewCard>

			<Styles.OverviewCard>
				<Styles.CardLeft>
					<img
						height={25}
						width={25}
						src='/assets/svg-images/dollar.svg'
						alt='Solana Logo'
						style={{ margin: '5px' }}
					/>
					<Styles.CardTitle>Total Earnings</Styles.CardTitle>
				</Styles.CardLeft>
				<Styles.CardSubTitle>0.00 USD</Styles.CardSubTitle>
			</Styles.OverviewCard>

			<Styles.OverviewCard>
				<Styles.CardLeft>
					<img
						height={25}
						width={25}
						src='/assets/svg-images/plus.svg'
						alt='Solana Logo'
						style={{ margin: '5px' }}
					/>
					<Styles.CardTitle>Created Surveys</Styles.CardTitle>
				</Styles.CardLeft>
				<Styles.CardSubTitle>0</Styles.CardSubTitle>
			</Styles.OverviewCard>

			<Styles.OverviewCard>
				<Styles.CardLeft>
					<img
						height={25}
						width={25}
						src='/assets/svg-images/document.svg'
						alt='Solana Logo'
						style={{ margin: '5px' }}
					/>
					<Styles.CardTitle>Participated Surveys</Styles.CardTitle>
				</Styles.CardLeft>
				<Styles.CardSubTitle>0</Styles.CardSubTitle>
			</Styles.OverviewCard>
		</Styles.OverViewContainer>
	);
};

export default Overview;
