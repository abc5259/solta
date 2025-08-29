import styled from 'styled-components';
import { useState } from 'react';

const ProfileContainer = styled.div`
	padding: ${({ theme }) => theme.spacing(6)};
	width: 100%;
	background: #1a1a2e;
	min-height: 100vh;
	color: white;
`;

const UserSection = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	background: #16213e;
	border-radius: 16px;
	padding: ${({ theme }) => theme.spacing(6)};
	box-shadow: ${({ theme }) => theme.shadows.md};
	margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(4)};
	margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const UserIcon = styled.div`
	width: 60px;
	height: 60px;
	background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
	color: white;
	font-weight: bold;
`;

const UserDetails = styled.div`
	flex: 1;
`;

const UserId = styled.h1`
	font-size: 2rem;
	color: white;
	margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

const UserStats = styled.div`
	color: white;
	font-size: 1rem;
	line-height: 1.6;
`;

const StatHighlight = styled.span`
	font-weight: bold;
	color: #4ade80;
`;

const DifficultySection = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	background: #16213e;
	border-radius: 16px;
	padding: ${({ theme }) => theme.spacing(6)};
	box-shadow: ${({ theme }) => theme.shadows.md};
`;

const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
	color: white;
	font-size: 1.8rem;
	margin: 0;
`;

const DetailButton = styled.button`
	background: #4ade80;
	color: #1a1a2e;
	padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
	border: none;
	border-radius: 8px;
	font-weight: bold;
	cursor: pointer;
	transition: background 0.2s ease;
	
	&:hover {
		background: #22c55e;
	}
`;

const DifficultyContent = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${({ theme }) => theme.spacing(6)};
	align-items: start;
`;

const DonutChart = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background: conic-gradient(
		#cd7f32 0deg 53.6deg,
		#c0c0c0 53.6deg 180deg,
		#ffd700 180deg 360deg
	);
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	position: relative;
	
	&::before {
		content: '?';
		position: absolute;
		font-size: 2rem;
		color: white;
		font-weight: bold;
	}
`;

const DifficultyTable = styled.div`
	background: #0f3460;
	border-radius: 12px;
	padding: ${({ theme }) => theme.spacing(4)};
`;

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: ${({ theme }) => theme.spacing(3)};
	margin-bottom: ${({ theme }) => theme.spacing(3)};
	font-weight: bold;
	color: #cbd5e1;
	border-bottom: 1px solid #533483;
	padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: ${({ theme }) => theme.spacing(3)};
	padding: ${({ theme }) => theme.spacing(2)} 0;
	border-bottom: 1px solid rgba(83, 52, 131, 0.3);
	
	&:last-child {
		border-bottom: none;
	}
`;

const TableCell = styled.div`
	color: white;
	text-align: center;
`;

const TierName = styled.span<{ tier: string }>`
	font-weight: bold;
	color: ${({ tier }) => {
		switch (tier.toLowerCase()) {
			case 'bronze': return '#cd7f32';
			case 'silver': return '#c0c0c0';
			case 'gold': return '#ffd700';
			case 'platinum': return '#e5e4e2';
			case 'diamond': return '#b9f2ff';
			case 'ruby': return '#ff006e';
			default: return 'white';
		}
	}};
`;

const SubTierGrid = styled.div<{ isVisible: boolean }>`
	display: ${({ isVisible }) => isVisible ? 'grid' : 'none'};
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	gap: ${({ theme }) => theme.spacing(2)};
	margin-top: ${({ theme }) => theme.spacing(3)};
	animation: ${({ isVisible }) => isVisible ? 'slideDown 0.3s ease' : 'none'};
	
	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}
`;

const SubTierItem = styled.div`
	background: rgba(255, 255, 255, 0.1);
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing(2)};
	font-size: 0.9rem;
	text-align: center;
`;

const SubTierLevel = styled.div`
	font-weight: bold;
	margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const SubTierCount = styled.div`
	font-size: 0.8rem;
	opacity: 0.8;
`;

export function ProfilePage() {
	const [showDetails, setShowDetails] = useState(false);

	// Mock data - 실제로는 API에서 가져올 데이터
	const userData = {
		userId: 'dlwogns3413',
		totalSolved: 754,
		contributedProblems: 13,
		rivals: 2
	};

	const tierStats = [
		{ tier: 'Bronze', count: 112, percentage: '14.9%' },
		{ tier: 'Silver', count: 241, percentage: '32.0%' },
		{ tier: 'Gold', count: 369, percentage: '48.9%' },
		{ tier: 'Platinum', count: 30, percentage: '4.0%' },
		{ tier: 'Diamond', count: 1, percentage: '0.1%' },
		{ tier: 'Ruby', count: 0, percentage: '0.0%' }
	];

	const detailedStats = [
		{
			tier: 'Bronze',
			count: 112,
			percentage: '14.9%',
			subTiers: [
				{ level: 'B5', count: 15, averageTime: '4분 12초' },
				{ level: 'B4', count: 18, averageTime: '5분 8초' },
				{ level: 'B3', count: 22, averageTime: '5분 45초' },
				{ level: 'B2', count: 25, averageTime: '6분 2초' },
				{ level: 'B1', count: 32, averageTime: '5분 30초' }
			]
		},
		{
			tier: 'Silver',
			count: 241,
			percentage: '32.0%',
			subTiers: [
				{ level: 'S5', count: 28, averageTime: '7분 45초' },
				{ level: 'S4', count: 31, averageTime: '8분 12초' },
				{ level: 'S3', count: 35, averageTime: '8분 33초' },
				{ level: 'S2', count: 42, averageTime: '8분 51초' },
				{ level: 'S1', count: 45, averageTime: '8분 28초' }
			]
		},
		{
			tier: 'Gold',
			count: 369,
			percentage: '48.9%',
			subTiers: [
				{ level: 'G5', count: 45, averageTime: '11분 32초' },
				{ level: 'G4', count: 52, averageTime: '12분 18초' },
				{ level: 'G3', count: 58, averageTime: '12분 47초' },
				{ level: 'G2', count: 64, averageTime: '13분 12초' },
				{ level: 'G1', count: 70, averageTime: '13분 28초' }
			]
		},
		{
			tier: 'Platinum',
			count: 30,
			percentage: '4.0%',
			subTiers: [
				{ level: 'P5', count: 8, averageTime: '23분 45초' },
				{ level: 'P4', count: 7, averageTime: '25분 12초' },
				{ level: 'P3', count: 6, averageTime: '26분 8초' },
				{ level: 'P2', count: 5, averageTime: '27분 15초' },
				{ level: 'P1', count: 4, averageTime: '28분 32초' }
			]
		},
		{
			tier: 'Diamond',
			count: 1,
			percentage: '0.1%',
			subTiers: [
				{ level: 'D5', count: 1, averageTime: '45분 12초' }
			]
		},
		{
			tier: 'Ruby',
			count: 0,
			percentage: '0.0%',
			subTiers: []
		}
	];

	return (
		<ProfileContainer>
			<UserSection>
				<UserInfo>
					<UserIcon>D</UserIcon>
					<UserDetails>
						<UserId>{userData.userId}</UserId>
						<UserStats>
							<StatHighlight>{userData.totalSolved}</StatHighlight>문제 해결,{' '}
							<StatHighlight>{userData.contributedProblems}</StatHighlight>문제에 기여,{' '}
							<StatHighlight>{userData.rivals}</StatHighlight>명의 라이벌
						</UserStats>
					</UserDetails>
				</UserInfo>
			</UserSection>

			<DifficultySection>
				<SectionHeader>
					<SectionTitle>난이도 분포</SectionTitle>
					<DetailButton onClick={() => setShowDetails(!showDetails)}>
						{showDetails ? '간단히' : '자세히'}
					</DetailButton>
				</SectionHeader>
				
				<DifficultyContent>
					<div>
						<DonutChart />
					</div>
					
					<DifficultyTable>
						<TableHeader>
							<TableCell>레벨</TableCell>
							<TableCell>문제</TableCell>
							<TableCell></TableCell>
						</TableHeader>
						
						{tierStats.map(({ tier, count, percentage }) => (
							<TableRow key={tier}>
								<TableCell>
									<TierName tier={tier}>{tier}</TierName>
								</TableCell>
								<TableCell><strong>{count}</strong></TableCell>
								<TableCell>{percentage}</TableCell>
							</TableRow>
						))}
					</DifficultyTable>
				</DifficultyContent>
				
				{showDetails && (
					<div style={{ marginTop: '24px' }}>
						<h3 style={{ color: 'white', marginBottom: '16px', textAlign: 'center' }}>
							세부 레벨별 통계
						</h3>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
							{detailedStats.filter(stat => stat.count > 0).map(({ tier, subTiers }) => (
								<div key={tier} style={{ 
									background: '#0f3460', 
									borderRadius: '12px', 
									padding: '16px',
									border: '1px solid #533483'
								}}>
									<h4 style={{ 
										color: tier === 'Gold' ? '#000' : '#fff', 
										textAlign: 'center', 
										marginBottom: '12px',
										background: tier === 'Bronze' ? '#cd7f32' : 
												   tier === 'Silver' ? '#c0c0c0' : 
												   tier === 'Gold' ? '#ffd700' : 
												   tier === 'Platinum' ? '#e5e4e2' : 
												   tier === 'Diamond' ? '#b9f2ff' : '#ff006e',
										borderRadius: '8px',
										padding: '8px'
									}}>
										{tier}
									</h4>
									<SubTierGrid isVisible={true}>
										{subTiers.map(({ level, count: subCount, averageTime: subAvg }) => (
											<SubTierItem key={level}>
												<SubTierLevel>{level}</SubTierLevel>
												<SubTierCount>{subCount}문제</SubTierCount>
												<SubTierCount>{subAvg}</SubTierCount>
											</SubTierItem>
										))}
									</SubTierGrid>
								</div>
							))}
						</div>
					</div>
				)}
			</DifficultySection>
		</ProfileContainer>
	);
}

export default ProfilePage;
