import styled from 'styled-components';

export const ThemedButton = styled.button`
	padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	background: ${({ theme }) => theme.colors.primary};
	color: #fff;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s ease;
	&:hover { background: ${({ theme }) => theme.colors.primaryHover}; }
`;

export default ThemedButton;

