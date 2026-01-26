import styled from "styled-components";
import { useState } from "react";
import { SolvedList } from "../components/SolvedList/SolvedList";
import { Trophy, Clock, Target } from "lucide-react";

const ProfileContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgSecondary};
`;

const UserSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const UserIcon = styled.div`
  width: 72px;
  height: 72px;
  background: #9333ea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: 700;
  flex-shrink: 0;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const UserId = styled.h1`
  font-size: 1.875rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 700;
`;

const UserStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const StatHighlight = styled.span`
  font-weight: 700;
  color: #9333ea;
`;

const StatsCards = styled.div`
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing(4)} auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: relative;
`;

const StatCardTitle = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StatCardValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StatCardIcon = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(5)};
  right: ${({ theme }) => theme.spacing(5)};
  color: ${({ theme }) => theme.colors.textMuted};
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
    content: "?";
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
      case "bronze":
        return "#cd7f32";
      case "silver":
        return "#c0c0c0";
      case "gold":
        return "#ffd700";
      case "platinum":
        return "#e5e4e2";
      case "diamond":
        return "#b9f2ff";
      case "ruby":
        return "#ff006e";
      default:
        return "white";
    }
  }};
`;


const TabSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const TabHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderLight};
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active }) => (active ? "#9333ea" : "transparent")};
  color: ${({ active, theme }) => (active ? "#9333ea" : theme.colors.textSecondary)};
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: -2px;

  &:hover {
    color: ${({ active }) => (active ? "#9333ea" : "#000")};
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const TierStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

const TierGroupSection = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const TierGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderLight};
`;

const TierGroupBadge = styled.span<{ tier: string }>`
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  background: ${({ tier }) => {
    switch (tier.toLowerCase()) {
      case "bronze": return "#cd7f32";
      case "silver": return "#9ca3af";
      case "gold": return "#f59e0b";
      case "platinum": return "#e5e7eb";
      case "diamond": return "#60a5fa";
      case "ruby": return "#f43f5e";
      default: return "#6b7280";
    }
  }};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TierGroupSummary = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

const SubTierCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SubTierCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.bgSecondary} 0%, ${({ theme }) => theme.colors.bg} 100%);
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing(4)};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const SubTierLevel = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const SubTierInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SubTierCount = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubTierTime = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

function formatTime(minutes: number, seconds: number): string {
  return `${minutes}m ${seconds}s`;
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"recent" | "tier">("recent");

  const solveds = [
    {
      solvedId: 7,
      solveType: "SELF",
      solveTimeSeconds: 1865,
      problem: {
        problemId: 8125,
        bojProblemId: 9440,
        title: "숫자 더하기",
        tier: "S2",
        tags: ["수학", "구현"],
      },
      averageTime: 1865.0,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      solvedId: 6,
      solveType: "SOLUTION",
      solveTimeSeconds: 27,
      problem: {
        problemId: 10693,
        bojProblemId: 12100,
        title: "2048 (Easy)",
        tier: "G1",
        tags: ["구현", "시뮬레이션"],
      },
      averageTime: 27.5,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      solvedId: 5,
      solveType: "SOLUTION",
      solveTimeSeconds: 28,
      problem: {
        problemId: 10693,
        bojProblemId: 12100,
        title: "2048 (Easy)",
        tier: "G1",
        tags: ["구현", "시뮬레이션"],
      },
      averageTime: 27.5,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      solvedId: 4,
      solveType: "SELF",
      solveTimeSeconds: 17,
      problem: {
        problemId: 9633,
        bojProblemId: 11000,
        title: "강의실 배정",
        tier: "G4",
        tags: ["그리디", "정렬"],
      },
      averageTime: 17.0,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      solvedId: 3,
      solveType: "SELF",
      solveTimeSeconds: 17,
      problem: {
        problemId: 9633,
        bojProblemId: 11000,
        title: "강의실 배정",
        tier: "G4",
        tags: ["그리디", "정렬"],
      },
      averageTime: 17.0,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      solvedId: 2,
      solveType: "SELF",
      solveTimeSeconds: 27,
      problem: {
        problemId: 12036,
        bojProblemId: 13460,
        title: "구슬 탈출 2",
        tier: "G1",
        tags: ["BFS", "구현"],
      },
      averageTime: 32.0,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      solvedId: 1,
      solveType: "SELF",
      solveTimeSeconds: 37,
      problem: {
        problemId: 12036,
        bojProblemId: 13460,
        title: "구슬 탈출 2",
        tier: "G1",
        tags: ["BFS", "구현"],
      },
      averageTime: 32.0,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Mock data - 실제로는 API에서 가져올 데이터
  const userData = {
    userId: "dlwogns3413",
    tier: "G2",
    rating: 1685,
    totalSolved: 247,
    totalTimeHours: 234,
    totalTimeMinutes: 56,
    averageTimeMinutes: 23,
    averageTimeSeconds: 12,
  };

  const tierStats = [
    { tier: "Bronze", count: 112, percentage: "14.9%" },
    { tier: "Silver", count: 241, percentage: "32.0%" },
    { tier: "Gold", count: 369, percentage: "48.9%" },
    { tier: "Platinum", count: 30, percentage: "4.0%" },
    { tier: "Diamond", count: 1, percentage: "0.1%" },
    { tier: "Ruby", count: 0, percentage: "0.0%" },
  ];

  const tierGroupStats = [
    {
      tier: "Bronze",
      tierName: "브론즈",
      totalCount: 45,
      averageMinutes: 8,
      averageSeconds: 23,
      subTiers: [
        { level: "브1", count: 12, minutes: 6, seconds: 15 },
        { level: "브2", count: 15, minutes: 7, seconds: 42 },
        { level: "브3", count: 8, minutes: 9, seconds: 18 },
        { level: "브4", count: 6, minutes: 10, seconds: 51 },
        { level: "브5", count: 4, minutes: 12, seconds: 33 },
      ],
    },
    {
      tier: "Silver",
      tierName: "실버",
      totalCount: 89,
      averageMinutes: 18,
      averageSeconds: 47,
      subTiers: [
        { level: "실1", count: 25, minutes: 15, seconds: 22 },
        { level: "실2", count: 22, minutes: 17, seconds: 38 },
        { level: "실3", count: 19, minutes: 19, seconds: 45 },
        { level: "실4", count: 15, minutes: 21, seconds: 12 },
        { level: "실5", count: 8, minutes: 23, seconds: 56 },
      ],
    },
    {
      tier: "Gold",
      tierName: "골드",
      totalCount: 120,
      averageMinutes: 25,
      averageSeconds: 30,
      subTiers: [
        { level: "골1", count: 30, minutes: 22, seconds: 15 },
        { level: "골2", count: 28, minutes: 24, seconds: 42 },
        { level: "골3", count: 25, minutes: 26, seconds: 18 },
        { level: "골4", count: 22, minutes: 27, seconds: 51 },
        { level: "골5", count: 15, minutes: 29, seconds: 33 },
      ],
    },
    {
      tier: "Platinum",
      tierName: "플래티넘",
      totalCount: 30,
      averageMinutes: 35,
      averageSeconds: 20,
      subTiers: [
        { level: "플1", count: 8, minutes: 32, seconds: 15 },
        { level: "플2", count: 7, minutes: 34, seconds: 42 },
        { level: "플3", count: 6, minutes: 36, seconds: 18 },
        { level: "플4", count: 5, minutes: 38, seconds: 51 },
        { level: "플5", count: 4, minutes: 40, seconds: 33 },
      ],
    },
  ];

  return (
    <ProfileContainer>
      <UserSection>
        <UserInfo>
          <UserIcon>D</UserIcon>
          <UserDetails>
            <UserHeader>
              <UserId>{userData.userId}</UserId>
            </UserHeader>
            <UserStats>
              <div>
                시간기록 문제: <StatHighlight>{userData.totalSolved}개</StatHighlight>
              </div>
            </UserStats>
          </UserDetails>
        </UserInfo>
      </UserSection>

      <StatsCards>
        <StatCard>
          <StatCardIcon>
            <Trophy size={20} />
          </StatCardIcon>
          <StatCardTitle>시간기록한 문제 수</StatCardTitle>
          <StatCardValue>{userData.totalSolved}개</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardIcon>
            <Clock size={20} />
          </StatCardIcon>
          <StatCardTitle>총 풀이 시간</StatCardTitle>
          <StatCardValue>
            {userData.totalTimeHours}h {userData.totalTimeMinutes}m
          </StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardIcon>
            <Target size={20} />
          </StatCardIcon>
          <StatCardTitle>전체 문제 평균 시간</StatCardTitle>
          <StatCardValue>
            {userData.averageTimeMinutes}m {userData.averageTimeSeconds}s
          </StatCardValue>
        </StatCard>
      </StatsCards>

      <TabSection>
        <TabHeader>
          <TabButton
            active={activeTab === "recent"}
            onClick={() => setActiveTab("recent")}
          >
            최근 풀이 기록
          </TabButton>
          <TabButton
            active={activeTab === "tier"}
            onClick={() => setActiveTab("tier")}
          >
            티어별 통계
          </TabButton>
        </TabHeader>

        <TabContent>
          {activeTab === "recent" && <SolvedList solveds={solveds} />}
          {activeTab === "tier" && (
            <TierStatsContainer>
              {tierGroupStats.map((tierGroup) => (
                <TierGroupSection key={tierGroup.tier}>
                  <TierGroupHeader>
                    <TierGroupBadge tier={tierGroup.tier}>
                      {tierGroup.tierName}
                    </TierGroupBadge>
                    <TierGroupSummary>
                      <span>{tierGroup.totalCount}문제</span> 평균{" "}
                      {formatTime(tierGroup.averageMinutes, tierGroup.averageSeconds)}
                    </TierGroupSummary>
                  </TierGroupHeader>
                  <SubTierCards>
                    {tierGroup.subTiers.map((subTier) => (
                      <SubTierCard key={subTier.level}>
                        <SubTierLevel>{subTier.level}</SubTierLevel>
                        <SubTierInfo>
                          <SubTierCount>
                            {subTier.count}
                            <span>문제</span>
                          </SubTierCount>
                          <SubTierTime>
                            <Clock size={14} />
                            {formatTime(subTier.minutes, subTier.seconds)}
                          </SubTierTime>
                        </SubTierInfo>
                      </SubTierCard>
                    ))}
                  </SubTierCards>
                </TierGroupSection>
              ))}
            </TierStatsContainer>
          )}
        </TabContent>
      </TabSection>
    </ProfileContainer>
  );
}

export default ProfilePage;
