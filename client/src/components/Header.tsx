import styled from 'styled-components';

const HeaderContainer = styled.header`
	background: ${({ theme }) => theme.colors.bgSecondary};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	padding: ${({ theme }) => theme.spacing(4)} 0;
	position: sticky;
	top: 0;
	z-index: 100;
	width: 100%;
`;

const HeaderContent = styled.div`
	width: 100%;
	padding: 0 ${({ theme }) => theme.spacing(4)};
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;

const LogoSection = styled.div`
	position: absolute;
	left: ${({ theme }) => theme.spacing(4)};
	display: flex;
	align-items: center;
`;

const LogoText = styled.h1`
	font-size: 1.8rem;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.primary};
	margin: 0;
`;

const SearchSection = styled.div`
	max-width: 400px;
	width: 100%;
`;

const SearchContainer = styled.div`
	position: relative;
	width: 100%;
`;

const SearchInput = styled.input`
	width: 100%;
	padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
	padding-left: ${({ theme }) => theme.spacing(10)};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 8px;
	background: ${({ theme }) => theme.colors.bg};
	color: ${({ theme }) => theme.colors.text};
	font-size: 0.9rem;
	transition: border-color 0.2s ease;
	
	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary};
		box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
	}
	
	&::placeholder {
		color: ${({ theme }) => theme.colors.textMuted};
	}
`;

const SearchIcon = styled.div`
	position: absolute;
	left: ${({ theme }) => theme.spacing(3)};
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.colors.textMuted};
	font-size: 1.1rem;
`;

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<LogoSection>
					<LogoText>Solta</LogoText>
				</LogoSection>
				
				<SearchSection>
					<SearchContainer>
						<SearchIcon>🔍</SearchIcon>
						<SearchInput 
							type="text" 
							placeholder="백준 아이디 또는 문제 번호 검색..."
						/>
					</SearchContainer>
				</SearchSection>
			</HeaderContent>
		</HeaderContainer>
	);
}

export default Header;
