import React from 'react';
import styled from 'styled-components';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { RiBarChart2Line } from 'react-icons/ri';
import { Card, Icon, Info, Left, Link, Meta, Right, Title } from './style';

interface SurveyCardProps {
	title: string;
	link: string;
	rewards: string;
	questions: string;
	status: 'Active' | 'Done' | 'Claim';
	date?: string;
}

const Action = styled.div`
	display: flex;
	gap: 8px;
	color: #d1d5db;
	cursor: pointer;
	font-size: 14px;

	svg {
		vertical-align: middle;
	}
`;

const StatusBadge = styled.div<{ status: string }>`
	padding: 2px 8px;
	border-radius: 6px;
	font-size: 12px;
	font-weight: 500;
	color: ${({ status }) =>
		status === 'Done' ? '#10b981' : status === 'Claim' ? '#eab308' : '#3b82f6'};
	background-color: ${({ status }) =>
		status === 'Done'
			? 'rgba(16, 185, 129, 0.15)'
			: status === 'Claim'
			? 'rgba(234, 179, 8, 0.15)'
			: 'rgba(59, 130, 246, 0.15)'};
`;

const SurveyCard: React.FC<SurveyCardProps> = ({
	title,
	link,
	rewards,
	questions,
	status,
}) => {
	return (
		<Card>
			<Left>
				<Icon>📋</Icon>
				<Info>
					<Title>{title}</Title>
					<Link>{link}</Link>
				</Info>
			</Left>
			<Right>
				<Meta>
					<span>Rewards</span>
					{rewards}
				</Meta>
				<Meta>
					<span>Questions</span>
					{questions}
				</Meta>
				<StatusBadge status={status}>{status}</StatusBadge>
				<Action>
					<FiCopy title='Copy' />
					<FiShare2 title='Share' />
					<RiBarChart2Line title='Insights' />
				</Action>
			</Right>
		</Card>
	);
};

export default SurveyCard;
