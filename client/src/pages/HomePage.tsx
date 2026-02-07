import { useNavigate } from "react-router-dom";
import { Clock, BarChart3, Search, RotateCcw, TrendingUp, Zap, Chrome, Play, CheckCircle, Save, LineChart } from "lucide-react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 65px);
  background: ${({ theme }) => theme.colors.bg};
`;

// Hero
const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(16)} ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(12)};
  max-width: 720px;
  margin: 0 auto;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  height: 48px;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Bar = styled.div<{ height: number; delay: number }>`
  width: 12px;
  height: ${({ height }) => height}px;
  background: linear-gradient(135deg, #FF9A76 0%, #FF7C5C 100%);
  border-radius: 3px;
  transform-origin: bottom;
  animation: barGrow 0.6s ease-out ${({ delay }) => delay}s both;

  @keyframes barGrow {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
  letter-spacing: -0.5px;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing(8)} 0;
  line-height: 1.7;
`;

const CTARow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  justify-content: center;
`;

const CTAButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3.5)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme, $primary }) => $primary ? "transparent" : theme.colors.border};
  background: ${({ theme, $primary }) => $primary ? theme.colors.primary : "transparent"};
  color: ${({ theme, $primary }) => $primary ? "#fff" : theme.colors.text};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme, $primary }) => $primary ? theme.colors.primaryHover : theme.colors.bgTertiary};
  }
`;

// Features
const FeaturesSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(16)};
`;

const SectionLabel = styled.p`
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(10)} 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const FeatureIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $color }) => `${$color}18`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const FeatureTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

const FeatureDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
  margin: 0;
`;

// How it works
const StepsSection = styled.section`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(14)} ${({ theme }) => theme.spacing(6)};
`;

const StepsInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(5)};
`;

const StepIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $color }) => `${$color}18`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const StepNumber = styled.span`
  position: absolute;
  top: -6px;
  left: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.65rem;
`;

const StepIconWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px 0;
`;

const StepDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
  line-height: 1.7;
`;

const StepTip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
`;

const StepConnector = styled.div`
  width: 2px;
  height: 24px;
  background: ${({ theme }) => theme.colors.borderLight};
  margin-left: 21px;
`;

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Hero>
        <LogoRow>
          <Bar height={24} delay={0} />
          <Bar height={36} delay={0.1} />
          <Bar height={48} delay={0.2} />
        </LogoRow>
        <Title>
          백준 풀이를 <span>기록</span>하고
          <br />
          성장을 <span>분석</span>하세요
        </Title>
        <Subtitle>
          문제 풀이 시간을 측정하고, 자력 풀이 여부를 기록하세요.
          <br />
          티어별 통계와 추이 분석으로 나만의 성장 곡선을 확인할 수 있어요.
        </Subtitle>
        <CTARow>
          <CTAButton $primary onClick={() => navigate("/problems")}>
            <Search size={18} />
            문제 검색하기
          </CTAButton>
        </CTARow>
      </Hero>

      <FeaturesSection>
        <SectionLabel>Features</SectionLabel>
        <SectionTitle>이런 기능을 제공해요</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon $color="#5B9FED">
              <Clock size={22} />
            </FeatureIcon>
            <FeatureTitle>풀이 시간 기록</FeatureTitle>
            <FeatureDesc>
              문제를 푸는 데 걸린 시간을 기록하고, 자력 풀이인지 해설 참고인지 구분하여 저장해요.
            </FeatureDesc>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon $color="#4CAF50">
              <BarChart3 size={22} />
            </FeatureIcon>
            <FeatureTitle>티어별 통계</FeatureTitle>
            <FeatureDesc>
              브론즈부터 루비까지 티어별 평균 풀이 시간과 자력 풀이율을 한눈에 확인할 수 있어요.
            </FeatureDesc>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon $color="#FFA726">
              <TrendingUp size={22} />
            </FeatureIcon>
            <FeatureTitle>성장 추이 분석</FeatureTitle>
            <FeatureDesc>
              주간/월간 풀이 시간 변화와 자력 풀이율 추이를 그래프로 확인하며 성장을 체감해보세요.
            </FeatureDesc>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon $color="#AB47BC">
              <Search size={22} />
            </FeatureIcon>
            <FeatureTitle>문제 검색 & 상세</FeatureTitle>
            <FeatureDesc>
              문제 번호로 검색하고, 전체 자력 풀이율과 평균 풀이 시간 등 상세 통계를 확인해보세요.
            </FeatureDesc>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon $color="#EF5350">
              <RotateCcw size={22} />
            </FeatureIcon>
            <FeatureTitle>다시 도전하기</FeatureTitle>
            <FeatureDesc>
              해설을 참고했던 문제들을 모아보고, 다시 자력으로 풀어 성장을 증명해보세요.
            </FeatureDesc>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon $color="#26C6DA">
              <Zap size={22} />
            </FeatureIcon>
            <FeatureTitle>자력 풀이율 추적</FeatureTitle>
            <FeatureDesc>
              스스로 풀어낸 비율을 추적하여 진짜 실력이 얼마나 늘고 있는지 확인하세요.
            </FeatureDesc>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <StepsSection>
        <StepsInner>
          <SectionLabel>How it works</SectionLabel>
          <SectionTitle>이렇게 사용해요</SectionTitle>
          <StepList>
            <StepItem>
              <StepIconWrapper>
                <StepNumber>1</StepNumber>
                <StepIcon $color="#5B9FED">
                  <Chrome size={22} />
                </StepIcon>
              </StepIconWrapper>
              <StepContent>
                <StepTitle>크롬 익스텐션을 설치하고 GitHub로 로그인하세요</StepTitle>
                <StepDesc>
                  Solta 크롬 익스텐션을 설치한 뒤, 익스텐션 팝업에서 GitHub 계정으로 로그인하면 준비 완료입니다.
                </StepDesc>
              </StepContent>
            </StepItem>

            <StepConnector />

            <StepItem>
              <StepIconWrapper>
                <StepNumber>2</StepNumber>
                <StepIcon $color="#4CAF50">
                  <Play size={22} />
                </StepIcon>
              </StepIconWrapper>
              <StepContent>
                <StepTitle>백준 문제 페이지에서 "시간 측정 시작" 버튼을 누르세요</StepTitle>
                <StepDesc>
                  익스텐션이 백준 문제 페이지에 타이머 버튼을 자동으로 추가해요. 버튼을 누르면 풀이 시간이 실시간으로 측정됩니다.
                </StepDesc>
                <StepTip>
                  <Clock size={13} />
                  타이머가 동작 중이면 버튼이 빨간색으로 바뀌어요
                </StepTip>
              </StepContent>
            </StepItem>

            <StepConnector />

            <StepItem>
              <StepIconWrapper>
                <StepNumber>3</StepNumber>
                <StepIcon $color="#FFA726">
                  <CheckCircle size={22} />
                </StepIcon>
              </StepIconWrapper>
              <StepContent>
                <StepTitle>문제를 풀면 자동으로 감지돼요</StepTitle>
                <StepDesc>
                  백준에서 "맞았습니다!"를 받으면 익스텐션이 자동으로 타이머를 멈추고 저장 팝업을 띄워줘요. 직접 타이머를 멈출 수도 있어요.
                </StepDesc>
              </StepContent>
            </StepItem>

            <StepConnector />

            <StepItem>
              <StepIconWrapper>
                <StepNumber>4</StepNumber>
                <StepIcon $color="#AB47BC">
                  <Save size={22} />
                </StepIcon>
              </StepIconWrapper>
              <StepContent>
                <StepTitle>"스스로 풀이" 또는 "답지 참고"를 선택하고 저장하세요</StepTitle>
                <StepDesc>
                  저장 팝업에서 풀이 시간과 함께 자력으로 풀었는지, 해설을 참고했는지 선택하면 기록이 Solta에 자동 저장됩니다.
                </StepDesc>
              </StepContent>
            </StepItem>

            <StepConnector />

            <StepItem>
              <StepIconWrapper>
                <StepNumber>5</StepNumber>
                <StepIcon $color="#EF5350">
                  <LineChart size={22} />
                </StepIcon>
              </StepIconWrapper>
              <StepContent>
                <StepTitle>Solta에서 나만의 성장 통계를 확인하세요</StepTitle>
                <StepDesc>
                  프로필 페이지에서 티어별 평균 풀이 시간, 자력 풀이율, 주간/월간 성장 추이를 한눈에 볼 수 있어요. 해설을 참고했던 문제는 모아서 다시 도전할 수 있어요.
                </StepDesc>
              </StepContent>
            </StepItem>
          </StepList>
        </StepsInner>
      </StepsSection>
    </Container>
  );
}

export default HomePage;
