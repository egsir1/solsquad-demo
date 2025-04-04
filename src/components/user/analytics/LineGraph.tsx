import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { ChartWrapper } from './style';

// Data
const data = [
	{ date: 'Jan', surveys: 250, participants: 110 },
	{ date: 'Feb', surveys: 10, participants: 10 },
	{ date: 'Mar', surveys: 30, participants: 20 },
	{ date: 'Apr', surveys: 230, participants: 140 },
	{ date: 'May', surveys: 90, participants: 55 },
	{ date: 'Jun', surveys: 125, participants: 100 },
	{ date: 'Jul', surveys: 140, participants: 160 },
	{ date: 'Aug', surveys: 160, participants: 110 },
	{ date: 'Sep', surveys: 190, participants: 80 },
	{ date: 'Oct', surveys: 210, participants: 120 },
	{ date: 'Nov', surveys: 230, participants: 160 },
	{ date: 'Dec', surveys: 70, participants: 90 },
];

// Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div
				style={{
					background: '#1E293B',
					padding: '10px 14px',
					border: '1px solid #334155',
					borderRadius: '8px',
					color: 'white',
				}}
			>
				<p style={{ marginBottom: 4 }}>{label}</p>
				{payload.map((item: any, i: number) => (
					<p key={i} style={{ color: item.color, margin: 0 }}>
						{item.name}: {item.value}K
					</p>
				))}
			</div>
		);
	}
	return null;
};

const AreaChartComponent = () => {
	return (
		<ChartWrapper>
			<ResponsiveContainer width='100%' height='100%'>
				<AreaChart
					data={data}
					margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id='gradientSurveys' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#C084FC' stopOpacity={0.6} />
							<stop offset='100%' stopColor='#0B1120' stopOpacity={0} />
						</linearGradient>
						<linearGradient
							id='gradientParticipants'
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop offset='0%' stopColor='#22D3EE' stopOpacity={0.6} />
							<stop offset='100%' stopColor='#0B1120' stopOpacity={0} />
						</linearGradient>
					</defs>

					<CartesianGrid
						strokeDasharray='3 3'
						stroke='rgba(255,255,255,0.05)'
					/>
					<XAxis dataKey='date' stroke='#94A3B8' />
					<YAxis stroke='#94A3B8' />
					<Tooltip content={<CustomTooltip />} />
					<Area
						type='monotone'
						dataKey='surveys'
						name='Surveys'
						stroke='#C084FC'
						fill='url(#gradientSurveys)'
						strokeWidth={2.5}
						activeDot={{ r: 5 }}
					/>
					<Area
						type='monotone'
						dataKey='participants'
						name='Participants'
						stroke='#22D3EE'
						fill='url(#gradientParticipants)'
						strokeWidth={2.5}
						activeDot={{ r: 5 }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</ChartWrapper>
	);
};

export default AreaChartComponent;
