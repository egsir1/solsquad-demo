import React from 'react';
import * as Styles from './style';

const Overview = () => {
	return (
		<Styles.OverViewContainer>
			<Styles.OverviewCard>
				<div>
					<Styles.CardLeft>
						<img
							height={30}
							width={30}
							src='/assets/svg-images/Solana.svg'
							alt='77'
						/>

						<Styles.CardTitle>Current Balance </Styles.CardTitle>
					</Styles.CardLeft>
					<Styles.CardSubTitle>0.00 Sol</Styles.CardSubTitle>
				</div>
				<Styles.CardRight>
					<div>...</div>
				</Styles.CardRight>
			</Styles.OverviewCard>

			<Styles.OverviewCard>
				<Styles.CardLeft>
					<Styles.CardTitle>Total Earnings (in USD) </Styles.CardTitle>
					<Styles.CardSubTitle>0.00 USD</Styles.CardSubTitle>
				</Styles.CardLeft>
				<Styles.CardRight>
					<div>...</div>
				</Styles.CardRight>
			</Styles.OverviewCard>

			<Styles.OverviewCard>
				<Styles.CardLeft>
					<Styles.CardTitle>Created Surveys </Styles.CardTitle>
					<Styles.CardSubTitle>0</Styles.CardSubTitle>
				</Styles.CardLeft>
				<Styles.CardRight>
					<div>...</div>
				</Styles.CardRight>
			</Styles.OverviewCard>

			<Styles.OverviewCard>
				<Styles.CardLeft>
					<Styles.CardTitle>Participated Surveys </Styles.CardTitle>
					<Styles.CardSubTitle>0</Styles.CardSubTitle>
				</Styles.CardLeft>
				<Styles.CardRight>
					<div>...</div>
				</Styles.CardRight>
			</Styles.OverviewCard>
		</Styles.OverViewContainer>
	);
};

export default Overview;
