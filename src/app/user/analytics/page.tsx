'use client';
import React from 'react';
import * as Styles from '../../../components/user/analytics/style';
import Overview from '@/components/user/analytics/Overview';
import LineChartComponent from '@/components/user/analytics/LineGraph';
import SurveyTable from '@/components/user/analytics/Table';

const AnalyticsPage = () => {
	return (
		<div>
			<Styles.AnalyticsContainer>
				<Styles.AnalyticsHeader></Styles.AnalyticsHeader>
				{/** Overview */}
				<Overview />
				<br />
				{/** Analytics */}
				<LineChartComponent />
				<br />

				{/** Table */}
				<SurveyTable />
			</Styles.AnalyticsContainer>
		</div>
	);
};

export default AnalyticsPage;
