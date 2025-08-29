import styled from 'styled-components';

const StatsContainer = styled.div`
	padding: ${({ theme }) => theme.spacing(6)};
	width: 100%;
`;

const PageTitle = styled.h1`
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: ${({ theme }) => theme.spacing(6)};
	font-size: 2.5rem;
	text-align: center;
`;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: ${({ theme }) => theme.spacing(4)};
	margin-bottom: ${({ theme }) => theme.spacing(6)};
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
`;

const StatCard = styled.div`
	background: ${({ theme }) => theme.colors.bg};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing(4)};
	text-align: center;
`;

const StatNumber = styled.div`
	font-size: 2rem;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StatLabel = styled.div`
	color: ${({ theme }) => theme.colors.textSecondary};
	font-size: 0.9rem;
`;

const TierSection = styled.div`
	margin-top: ${({ theme }) => theme.spacing(6)};
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
`;

const TierTitle = styled.h2`
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: ${({ theme }) => theme.spacing(4)};
	text-align: center;
`;

const TierGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: ${({ theme }) => theme.spacing(3)};
`;

const TierCard = styled.div<{ tier: string }>`
	background: ${({ theme, tier }) => {
		switch (tier.toLowerCase()) {
			case 'bronze': return theme.colors.tier.bronze;
			case 'silver': return theme.colors.tier.silver;
			case 'gold': return theme.colors.tier.gold;
			case 'platinum': return theme.colors.tier.platinum;
			case 'diamond': return theme.colors.tier.diamond;
			case 'ruby': return theme.colors.tier.ruby;
			default: return theme.colors.bgSecondary;
		}
	}};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing(3)};
	text-align: center;
	color: ${({ theme, tier }) => {
		if (tier.toLowerCase() === 'gold') return '#000';
		return '#fff';
	}};
`;

const TierName = styled.div`
	font-weight: bold;
	margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const TierCount = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
`;

export function StatsPage() {
	const mockStats = {
		totalSolved: 754,
		totalTime: '127시간 32분',
		averageTime: '10분 12초',
		streak: 15
	};

	const tierStats = [
		{ tier: 'Bronze', count: 112, percentage: '14.9%' },
		{ tier: 'Silver', count: 241, percentage: '32.0%' },
		{ tier: 'Gold', count: 369, percentage: '48.9%' },
		{ tier: 'Platinum', count: 30, percentage: '4.0%' },
		{ tier: 'Diamond', count: 1, percentage: '0.1%' },
		{ tier: 'Ruby', count: 0, percentage: '0.0%' }
	];

	return (
		<StatsContainer>
			<PageTitle>📊 문제 풀이 통계</PageTitle>
			
			<StatsGrid>
				<StatCard>
					<StatNumber>{mockStats.totalSolved}</StatNumber>
					<StatLabel>총 해결한 문제</StatLabel>
				</StatCard>
				<StatCard>
					<StatNumber>{mockStats.totalTime}</StatNumber>
					<StatLabel>총 풀이 시간</StatLabel>
				</StatCard>
				<StatCard>
					<StatNumber>{mockStats.averageTime}</StatNumber>
					<StatLabel>평균 풀이 시간</StatLabel>
				</StatCard>
				<StatCard>
					<StatNumber>{mockStats.streak}</StatNumber>
					<StatLabel>연속 해결</StatLabel>
				</StatCard>
			</StatsGrid>

			<TierSection>
				<TierTitle>🏆 티어별 문제 수</TierTitle>
				<TierGrid>
					{tierStats.map(({ tier, count, percentage }) => (
						<TierCard key={tier} tier={tier}>
							<TierName>{tier}</TierName>
							<TierCount>{count}</TierCount>
							<div>{percentage}</div>
						</TierCard>
					))}
				</TierGrid>
			</TierSection>
		</StatsContainer>
	);
}

export default StatsPage;
