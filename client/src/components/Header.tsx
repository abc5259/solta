import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { memberApi, problemApi } from '../api/api';
import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from '../constants/tierColors';

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
	gap: ${({ theme }) => theme.spacing(3)};
	cursor: pointer;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.8;
	}
`;

const LogoIcon = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 4px;
	height: 32px;
`;

const Bar = styled.div<{ height: number }>`
	width: 8px;
	height: ${({ height }) => height}px;
	background: linear-gradient(135deg, #FF9A76 0%, #FF7C5C 100%);
	border-radius: 2px;
	transition: all 0.2s ease;

	${LogoSection}:hover & {
		transform: translateY(-2px);
	}
`;

const LogoText = styled.h1`
	font-size: 1.8rem;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.text};
	margin: 0;
`;

const SearchSection = styled.div`
	max-width: 400px;
	width: 100%;
	position: relative;
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
	border-radius: ${({ theme }) => theme.borderRadius.md};
	background: ${({ theme }) => theme.colors.bg};
	color: ${({ theme }) => theme.colors.text};
	font-size: 0.9rem;
	transition: all 0.2s ease;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary};
		box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
	}

	&::placeholder {
		color: ${({ theme }) => theme.colors.textMuted};
	}
`;

const SearchIconWrapper = styled.div`
	position: absolute;
	left: ${({ theme }) => theme.spacing(3)};
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.colors.textMuted};
	display: flex;
	align-items: center;
`;

const Dropdown = styled.div`
	position: absolute;
	top: calc(100% + 8px);
	left: 0;
	right: 0;
	max-height: 420px;
	overflow-y: auto;
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	box-shadow: ${({ theme }) => theme.shadows.lg};
	z-index: 200;
`;

const DropdownSection = styled.div`
	padding: ${({ theme }) => theme.spacing(2)} 0;
`;

const DropdownLabel = styled.div`
	padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
	font-size: 0.7rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.textMuted};
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

const DropdownItem = styled.div`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(3)};
	padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(4)};
	cursor: pointer;
	transition: background 0.15s ease;

	&:hover {
		background: ${({ theme }) => theme.colors.bgTertiary};
	}
`;

const MemberAvatar = styled.img`
	width: 28px;
	height: 28px;
	border-radius: 50%;
	object-fit: cover;
	background: ${({ theme }) => theme.colors.bgTertiary};
`;

const MemberAvatarFallback = styled.div`
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background: ${({ theme }) => theme.colors.bgTertiary};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.textMuted};
`;

const MemberName = styled.span`
	font-size: 0.9rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.text};
`;

const ProblemInfo = styled.div`
	flex: 1;
	min-width: 0;
`;

const ProblemNumber = styled.span`
	font-size: 0.7rem;
	font-family: monospace;
	color: ${({ theme }) => theme.colors.textMuted};
	margin-right: 6px;
`;

const TierBadge = styled.span<{ $color: string }>`
	font-size: 0.65rem;
	font-weight: 600;
	padding: 1px 5px;
	border-radius: 3px;
	border: 1px solid ${({ $color }) => $color};
	color: ${({ $color }) => $color};
`;

const ProblemTitle = styled.div`
	font-size: 0.85rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.text};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 2px;
`;

const DropdownDivider = styled.div`
	height: 1px;
	background: ${({ theme }) => theme.colors.border};
	margin: ${({ theme }) => theme.spacing(1)} 0;
`;

const NoResult = styled.div`
	padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
	font-size: 0.85rem;
	color: ${({ theme }) => theme.colors.textMuted};
	text-align: center;
`;

export function Header() {
	const navigate = useNavigate();
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(query), 300);
		return () => clearTimeout(timer);
	}, [query]);

	const { data: memberData } = useQuery({
		queryKey: ['memberSearch', debouncedQuery],
		queryFn: () => memberApi.searchMembers(debouncedQuery || undefined),
		enabled: isOpen,
	});

	const { data: problemData } = useQuery({
		queryKey: ['problemSearchHeader', debouncedQuery],
		queryFn: () => problemApi.searchProblems(debouncedQuery || undefined),
		enabled: isOpen,
	});

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const members = memberData?.members ?? [];
	const problems = problemData?.problems?.slice(0, 5) ?? [];

	const handleMemberClick = (name: string) => {
		setIsOpen(false);
		setQuery('');
		navigate(`/profile/${name}`);
	};

	const handleProblemClick = (bojProblemId: number) => {
		setIsOpen(false);
		setQuery('');
		navigate(`/problems?q=${bojProblemId}&select=${bojProblemId}`);
	};

	return (
		<HeaderContainer>
			<HeaderContent>
				<LogoSection onClick={() => navigate('/')}>
					<LogoIcon>
						<Bar height={16} />
						<Bar height={24} />
						<Bar height={32} />
					</LogoIcon>
					<LogoText>Solta</LogoText>
				</LogoSection>

				<SearchSection ref={containerRef}>
					<SearchContainer>
						<SearchIconWrapper>
							<Search size={16} />
						</SearchIconWrapper>
						<SearchInput
							type="text"
							placeholder="사용자 또는 문제 번호 검색..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onFocus={() => setIsOpen(true)}
						/>
					</SearchContainer>

					{isOpen && (
						<Dropdown>
							{/* 사용자 */}
							<DropdownSection>
								<DropdownLabel>사용자</DropdownLabel>
								{members.length > 0 ? (
									members.slice(0, 5).map((member) => (
										<DropdownItem
											key={member.memberId}
											onClick={() => handleMemberClick(member.name)}
										>
											{member.avatarUrl ? (
												<MemberAvatar src={member.avatarUrl} alt={member.name} />
											) : (
												<MemberAvatarFallback>
													<User size={14} />
												</MemberAvatarFallback>
											)}
											<MemberName>{member.name}</MemberName>
										</DropdownItem>
									))
								) : (
									<NoResult>일치하는 사용자가 없습니다</NoResult>
								)}
							</DropdownSection>

							<DropdownDivider />

							{/* 문제 */}
							<DropdownSection>
								<DropdownLabel>문제</DropdownLabel>
								{problems.length > 0 ? (
									problems.map((problem) => {
										const tierColor = hslToRgb(
											TIER_GROUP_COLORS[getTierGroupFromTier(problem.tier)]
										);
										return (
											<DropdownItem
												key={problem.problemId}
												onClick={() => handleProblemClick(problem.bojProblemId)}
											>
												<ProblemInfo>
													<div>
														<ProblemNumber>#{problem.bojProblemId}</ProblemNumber>
														<TierBadge $color={tierColor}>{problem.tier}</TierBadge>
													</div>
													<ProblemTitle>{problem.title}</ProblemTitle>
												</ProblemInfo>
											</DropdownItem>
										);
									})
								) : (
									<NoResult>일치하는 문제가 없습니다</NoResult>
								)}
							</DropdownSection>
						</Dropdown>
					)}
				</SearchSection>
			</HeaderContent>
		</HeaderContainer>
	);
}

export default Header;
