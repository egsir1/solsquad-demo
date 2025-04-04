import styled from 'styled-components';
import { Box } from '@mui/material';
export const LayoutContainer = styled.div`
	display: flex;
	min-height: 100vh;
	width: 100%;
`;

export const SidebarWrapper = styled.div`
	width: 250px;
	min-width: 250px;
	background-color: #fff;
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);

	@media (max-width: 768px) {
		width: 200px;
		min-width: 200px;
	}
`;

export const MainContent = styled.main`
	flex: 1;
	padding: 2rem;
	overflow-y: auto;
	box-sizing: border-box;

	@media (max-width: 768px) {
		padding: 1.5rem;
	}

	@media (max-width: 480px) {
		padding: 1rem;
	}
`;

export const AnalyticsContainer = styled.div`
	padding: 20px;
	margin-top: 4rem;
`;

export const AnalyticsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 0;
`;

export const OverViewContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 1rem;
	width: 100%;
	box-sizing: border-box;
`;

export const OverviewCard = styled.div`
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	transition: transform 0.2s ease;
	height: 100px;
	width: auto;
	background: ${({ theme }) => theme.color.box_color};
`;

export const CardLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 3px;
`;

export const CardTitle = styled.h3`
	font-size: 1rem;
	font-weight: 600;
	color: ${({ theme }) => theme.color.span_color};

	@media (max-width: 480px) {
		font-size: 0.9rem;
	}
`;

export const CardSubTitle = styled.h4`
	font-weight: bold;
	color: #fff;

	padding: 0 10px;
	margin-top: 1px;
	font-size: 20px;

	@media (max-width: 480px) {
		font-size: 1.1rem;
	}
`;

export const ChartWrapper = styled.div`
	width: 100%;
	height: 300px;
	background: ${({ theme }) => theme.color.box_color};
	border-radius: 10px;
	padding: 1rem;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
	border: ${({ theme }) => `1px solid ${theme.color.border_color}`};
`;

export const TableContainer = styled(Box)(({ theme }) => ({
	height: 520,
	width: '100%',
	backgroundColor: '#0B1739',
	borderRadius: '10px',
	color: '#fff',

	'& .MuiDataGrid-root': {
		backgroundColor: '#343B4F !important',
		border: '1px solid #343B4F',
	},

	'& .MuiDataGrid-columnHeaders': {
		backgroundColor: '#343B4F !important',
		borderBottom: '1px solid #343B4F',
	},

	// ✅ override individual header cells
	'& .custom-header': {
		backgroundColor: '#343B4F !important',
		color: '#F1F5F9',
	},

	'& .MuiDataGrid-columnSeparator': {
		color: '#343B4F',
	},

	'& .MuiDataGrid-cell': {
		color: '#E2E8F0',
		borderBottom: '1px solid #343B4F',
	},

	'& .MuiDataGrid-row': {
		borderBottom: '1px solid #343B4F',
	},

	'& .MuiDataGrid-footerContainer': {
		backgroundColor: 'transparent',
		color: '#F1F5F9',
		borderTop: '1px solid #343B4F',
	},

	'& .MuiDataGrid-row:hover': {
		backgroundColor: '#1E40AF22',
	},
}));
