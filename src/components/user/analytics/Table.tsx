import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Chip, Typography } from '@mui/material';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		flex: 0.3,
		headerClassName: 'custom-header',
	},
	{
		field: 'title',
		headerName: 'Survey Title',
		flex: 1,
		headerClassName: 'custom-header',
	},
	{
		field: 'creator',
		headerName: 'Created By',
		flex: 1,
		headerClassName: 'custom-header',
	},
	{
		field: 'responses',
		headerName: 'Responses',
		flex: 1,
		type: 'number',
		headerClassName: 'custom-header',
	},
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		headerClassName: 'custom-header',
		renderCell: params => (
			<Chip
				label={params.value}
				size='small'
				sx={{
					backgroundColor:
						params.value === 'Open'
							? 'rgba(34, 197, 94, 0.15)'
							: 'rgba(239, 68, 68, 0.15)',
					color: params.value === 'Open' ? '#22c55e' : '#ef4444',
					border: '1px solid',
					borderColor: params.value === 'Open' ? '#22c55e' : '#ef4444',
					fontWeight: 500,
					fontSize: '12px',
				}}
			/>
		),
	},
	{
		field: 'date',
		headerName: 'Created At',
		flex: 1,
		headerClassName: 'custom-header',
	},
];

const rows: GridRowsProp = [
	{
		id: 1,
		title: 'User Experience Survey',
		creator: '0xAB...1234',
		responses: 42,
		status: 'Open',
		date: '2025-04-01',
	},
	{
		id: 2,
		title: 'dApp Feedback Round 1',
		creator: '0xCD...5678',
		responses: 87,
		status: 'Closed',
		date: '2025-03-15',
	},
	{
		id: 3,
		title: 'DAO Voting Feedback',
		creator: '0xEF...ABCD',
		responses: 65,
		status: 'Open',
		date: '2025-02-20',
	},
	{
		id: 4,
		title: 'User Experience Survey',
		creator: '0xAB...1234',
		responses: 42,
		status: 'Open',
		date: '2025-04-01',
	},
	{
		id: 5,
		title: 'dApp Feedback Round 1',
		creator: '0xCD...5678',
		responses: 87,
		status: 'Closed',
		date: '2025-03-15',
	},
	{
		id: 6,
		title: 'dApp Feedback Round 1',
		creator: '0xCD...5678',
		responses: 87,
		status: 'Closed',
		date: '2025-03-15',
	},
	{
		id: 7,
		title: 'dApp Feedback Round 1',
		creator: '0xCD...5678',
		responses: 87,
		status: 'Closed',
		date: '2025-03-15',
	},
];

export default function SurveyTable() {
	return (
		<Box
			sx={{
				'& .MuiDataGrid-root': {
					borderColor: 'rgba(97,103,122,0.3)',
					backgroundColor: '#0B1739',
				},

				// ✅ Set full black header row
				'& .MuiDataGrid-columnHeaders': {
					backgroundColor: '#343B4F !important',
					borderColor: 'rgba(71,78,104,0.3) !important',
					borderTop: '1px solid rgba(71,78,104,0.3)',
				},

				// ✅ Ensure each header cell also has black bg
				'& .MuiDataGrid-columnHeader': {
					backgroundColor: '#0B1739 !important',
					color: '#fff',
					borderColor: '#343B4F !important',
				},

				'.MuiDataGrid-columnHeaderTitle': {
					display: 'flex',
					justifyContent: 'center !important',
					width: '400px',
				},

				'& .MuiDataGrid-footerContainer': {
					borderColor: 'rgba(97,103,122,0.3) !important',
				},

				'& .MuiDataGrid-renderingZone': {
					maxHeight: 'none !important',
				},

				'& .Mui-selected, & .MuiDataGrid-row.Mui-selected:hover, &.MuiDataGrid-row':
					{
						bgcolor: '#2a2b2f !important',
						color: 'white',
					},

				'& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
					color: '#eee',
				},

				'& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
					color: '#eee !important',
				},

				'& .css-n3z9fz-MuiPopper-root-MuiDataGrid-panel': {
					color: 'blue',
				},

				'& .MuiDataGrid-cellContent': {
					justifyContent: 'center',
				},
			}}
		>
			<Typography
				variant='h6'
				gutterBottom
				sx={{ color: '#AEB9E1', padding: '5px' }}
			>
				Voted Surveys
			</Typography>
			<DataGrid
				sx={{
					'& .MuiDataGrid-renderingZone': {
						maxHeight: 'none !important',
					},

					'& .MuiDataGrid-row': {
						color: '#fff',
						overflowWrap: 'break-word',
						wordBreak: 'break-all',
						whiteSpace: 'normal',
						fontWeight: '100',
						fontSize: '12px',
						minHeight: '30px !important',
					},
					'& .MuiDataGrid-cell': {
						// bgcolor: "#242427",
						color: '#eee',
						borderRight: '1px solid rgba(71,78,104,0.3) !important',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderColor: 'rgba(71,78,104,0.3)',
						lineHeight: 'unset !important',
						maxHeight: 'none !important',
						whiteSpace: 'normal',
						padding: '5px ',
					},
					'& .MuiDataGrid-overlay': {
						bgcolor: '#343B4F !mportant',
					},
					'& .Mui-selected, & .MuiDataGrid-row.Mui-selected:hover, &.MuiDataGrid-row':
						{
							bgcolor: '#2a2b2f !important',
							color: 'white',
						},
					'& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
						color: '#eee',
					},
					'& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
						color: '#eee !important',
					},
					'& .css-n3z9fz-MuiPopper-root-MuiDataGrid-panel': {
						color: 'blue',
					},
					'& .MuiDataGrid-cellContent': {
						justifyContent: 'center',
					},
				}}
				rows={rows}
				columns={columns}
				pageSizeOptions={[5, 10]}
				initialState={{
					pagination: {
						paginationModel: { pageSize: 5, page: 0 },
					},
				}}
				hideFooter={true}
			/>
		</Box>
	);
}
