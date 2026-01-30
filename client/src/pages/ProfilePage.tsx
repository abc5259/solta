import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SolvedList } from "../components/SolvedList/SolvedList";
import { Trophy, Clock, Target } from "lucide-react";
import { solvedQueryOptions } from "../api/queries/solved";
import type { TierAverageMap } from "../types/api";

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
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<"recent" | "tier">("recent");

  const { data: solveds = [], isLoading: isLoadingSolveds, isError: isErrorSolveds } = useQuery(
    solvedQueryOptions.recentSolveds(username || "")
  );

  const { data: tierGroupAverages = [], isLoading: isLoadingTierGroups } = useQuery(
    solvedQueryOptions.tierGroupAverages(username || "")
  );

  const { data: tierAverages = null, isLoading: isLoadingTiers } = useQuery(
    solvedQueryOptions.tierAverages(username || "")
  );

  const loading = isLoadingSolveds || isLoadingTierGroups || isLoadingTiers;
  const error = isErrorSolveds ? "데이터를 불러오는데 실패했습니다." : null;

  // Calculate statistics from API data
  const totalSolved = solveds.length;
  const totalTimeSeconds = 0;
  const totalTimeHours = Math.floor(totalTimeSeconds / 3600);
  const totalTimeMinutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const averageTimeSeconds = totalSolved > 0 ? totalTimeSeconds / totalSolved : 0;
  const averageTimeMinutes = Math.floor(averageTimeSeconds / 60);
  const averageTimeSecondsRemainder = Math.floor(averageTimeSeconds % 60);

  // Helper functions for tier display
  const getTierGroupName = (tierGroup: string): string => {
    const names: Record<string, string> = {
      BRONZE: "브론즈",
      SILVER: "실버",
      GOLD: "골드",
      PLATINUM: "플래티넘",
      DIAMOND: "다이아",
      RUBY: "루비",
    };
    return names[tierGroup] || tierGroup;
  };

  const getTierDisplayName = (tier: string): string => {
    const prefix = tier.charAt(0);
    const level = tier.charAt(1);
    const prefixMap: Record<string, string> = {
      B: "브",
      S: "실",
      G: "골",
      P: "플",
      D: "다",
      R: "루",
    };
    return prefixMap[prefix] + level;
  };

  // Transform API data for tier statistics display
  const tierGroupStats = tierGroupAverages
    .filter(tg => tg.solvedCount > 0 && tg.tierGroup !== "UNRATED")
    .map(tg => {
      const subTiers = tierAverages && tierAverages[tg.tierGroup]
        ? tierAverages[tg.tierGroup]
            .filter(ta => ta.solvedCount > 0)
            .map(ta => ({
              level: getTierDisplayName(ta.tier),
              count: ta.solvedCount,
              minutes: Math.floor((ta.averageSolvedSeconds || 0) / 60),
              seconds: Math.floor((ta.averageSolvedSeconds || 0) % 60),
            }))
        : [];

      return {
        tier: tg.tierGroup,
        tierName: getTierGroupName(tg.tierGroup),
        totalCount: tg.solvedCount,
        averageMinutes: Math.floor((tg.averageSolvedSeconds || 0) / 60),
        averageSeconds: Math.floor((tg.averageSolvedSeconds || 0) % 60),
        subTiers,
      };
    });

  if (loading) {
    return (
      <ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</div>
      </ProfileContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</div>
      </ProfileContainer>
    );
  }

  if (!username) {
    return (
      <ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>사용자 이름이 필요합니다.</div>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <UserSection>
        <UserInfo>
          <UserIcon>{username.charAt(0).toUpperCase()}</UserIcon>
          <UserDetails>
            <UserHeader>
              <UserId>{username}</UserId>
            </UserHeader>
            <UserStats>
              <div>
                시간기록 문제: <StatHighlight>{totalSolved}개</StatHighlight>
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
          <StatCardValue>{totalSolved}개</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardIcon>
            <Clock size={20} />
          </StatCardIcon>
          <StatCardTitle>총 풀이 시간</StatCardTitle>
          <StatCardValue>
            {totalTimeHours}h {totalTimeMinutes}m
          </StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardIcon>
            <Target size={20} />
          </StatCardIcon>
          <StatCardTitle>전체 문제 평균 시간</StatCardTitle>
          <StatCardValue>
            {averageTimeMinutes}m {averageTimeSecondsRemainder}s
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
