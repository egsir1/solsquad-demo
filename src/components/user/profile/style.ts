import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 2rem;
	padding: 2rem;
	margin-top: 3rem;
	background: ${({ theme }) => theme.color.box_color};
	color: #ffffff;
`;

export const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;

export const Label = styled.label`
	font-size: 14px;
	margin-bottom: 4px;
	color: #cbd5e1;
`;

export const Input = styled.input`
	background-color: transparent;
	border: ${({ theme }) => `1px solid ${theme.color.border_color}`};
	border-radius: 10px;
	padding: 12px;
	color: #ffffff;
	width: 100%;
	font-size: 14px;

	&::placeholder {
		color: #6b7280;
	}

	&:focus {
		outline: none;
		border-color: #805ad5;
	}
`;

export const Select = styled.select`
	background-color: transparent;
	border: ${({ theme }) => `1px solid ${theme.color.border_color}`};
	border-radius: 10px;
	padding: 12px;
	color: #ffffff;
	width: 100%;
	font-size: 14px;

	&:focus {
		outline: none;
		border-color: #805ad5;
	}
`;

export const Row = styled.div`
	display: flex;
	gap: 1rem;
`;

export const Field = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const TextArea = styled.textarea`
	background-color: transparent;
	border: ${({ theme }) => `1px solid ${theme.color.border_color}`};
	border-radius: 10px;
	padding: 12px;
	color: #ffffff;
	width: 100%;
	height: 100px;
	resize: none;
	font-size: 14px;

	&::placeholder {
		color: #6b7280;
	}

	&:focus {
		outline: none;
		border-color: #805ad5;
	}
`;

export const ButtonRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
	flex-wrap: wrap;
`;

export const Button = styled.button`
	padding: 10px 16px;
	border-radius: 10px;
	border: none;
	color: white;
	font-weight: 500;
	cursor: pointer;
	background: linear-gradient(to right, #8b5cf6, #9333ea);
	transition: all 0.2s;

	&:hover {
		opacity: 0.9;
	}
`;

export const Right = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`;

export const Avatar = styled.div`
	width: 120px;
	height: 120px;
	border-radius: 9999px;
	background-color: #f5edff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32px;
	font-weight: 700;
	color: #9333ea;
`;

export const AvatarNote = styled.div`
	text-align: center;
	font-size: 14px;
	color: #d1d5db;
`;
