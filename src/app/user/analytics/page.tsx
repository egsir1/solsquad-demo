'use client';
import React from 'react';
import * as Styles from '../../../components/user/analytics/style';
import Overview from '@/components/user/analytics/Overview';

const AnalyticsPage = () => {
	return (
		<div>
			<Styles.AnalyticsContainer>
				<Styles.AnalyticsHeader></Styles.AnalyticsHeader>
				{/** Overview */}
				<Overview />
			</Styles.AnalyticsContainer>
		</div>
	);
};

export default AnalyticsPage;
