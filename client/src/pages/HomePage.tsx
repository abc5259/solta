import styled from 'styled-components';
import Header from '../components/Header';

const HomeContainer = styled.div`
	padding: ${({ theme }) => theme.spacing(6)};
	width: 100%;
`;

const Hero = styled.div`
	text-align: center;
	margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const Title = styled.h1`
	font-size: 3rem;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Subtitle = styled.p`
	font-size: 1.25rem;
	color: ${({ theme }) => theme.colors.textSecondary};
	margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: ${({ theme }) => theme.spacing(4)};
	margin-top: ${({ theme }) => theme.spacing(6)};
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
`;

const Card = styled.div`
	background: ${({ theme }) => theme.colors.bg};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 12px;
	padding: ${({ theme }) => theme.spacing(4)};
	box-shadow: ${({ theme }) => theme.shadows.sm};
	transition: box-shadow 0.2s ease;
	
	&:hover {
		box-shadow: ${({ theme }) => theme.shadows.md};
	}
`;

const CardTitle = styled.h3`
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const CardContent = styled.p`
	color: ${({ theme }) => theme.colors.textSecondary};
	line-height: 1.6;
`;

export function HomePage() {
	return (
		<HomeContainer>
			<Hero>
				<Title>🎯 Solta</Title>
				<Subtitle>백준 문제 풀이 시간을 추적하고 기록하세요</Subtitle>
			</Hero>
			
			<CardGrid>
				<Card>
					<CardTitle>📊 문제 풀이 통계</CardTitle>
					<CardContent>
						백준에서 푼 문제들의 시간과 난이도를 분석하여 
						개인 성장을 추적할 수 있습니다.
					</CardContent>
				</Card>
				
				<Card>
					<CardTitle>⏱️ 실시간 타이머</CardTitle>
					<CardContent>
						문제를 풀기 시작할 때 타이머를 시작하고, 
						맞았습니다! 메시지가 뜨면 자동으로 기록됩니다.
					</CardContent>
				</Card>
				
				<Card>
					<CardTitle>🏆 티어별 분석</CardTitle>
					<CardContent>
						브론즈부터 루비까지 각 티어별로 
						풀이 시간과 성공률을 확인할 수 있습니다.
					</CardContent>
				</Card>
			</CardGrid>
		</HomeContainer>
	);
}

export default HomePage;
