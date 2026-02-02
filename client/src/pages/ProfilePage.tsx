import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SolvedList } from "../components/SolvedList/SolvedList";
import { SolveTimeTrendChart } from "../components/SolveTimeTrendChart/SolveTimeTrendChart";
import { IndependentSolveTrendChart } from "../components/IndependentSolveTrendChart/IndependentSolveTrendChart";
import { RetryListCard } from "../components/RetryListCard/RetryListCard";
import { Trophy, Clock, Target } from "lucide-react";
import { solvedQueryOptions } from "../api/queries/solved";
import formatSeconds from "../utils/formatSeconds";
import * as Styled from "./ProfilePage.styled";

function formatTime(minutes: number, seconds: number): string {
  const totalSeconds = minutes * 60 + seconds;
  return formatSeconds(totalSeconds);
}

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<"recent" | "tier" | "trend" | "independent" | "retry">("recent");

  const { data: profile, isLoading: isLoadingProfile, isError: isErrorProfile } = useQuery(
    solvedQueryOptions.profile(username || "")
  );

  const { data: solveds = [], isLoading: isLoadingSolveds } = useQuery(
    solvedQueryOptions.recentSolveds(username || "")
  );

  const { data: tierGroupAverages = [], isLoading: isLoadingTierGroups } = useQuery(
    solvedQueryOptions.tierGroupAverages(username || "")
  );

  const { data: tierAverages = null, isLoading: isLoadingTiers } = useQuery(
    solvedQueryOptions.tierAverages(username || "")
  );

  const loading = isLoadingProfile || isLoadingSolveds || isLoadingTierGroups || isLoadingTiers;
  const error = isErrorProfile ? "데이터를 불러오는데 실패했습니다." : null;

  // Calculate statistics from profile API data
  const totalSolved = profile?.solvedCount || 0;
  const totalTimeSeconds = profile?.totalSolvedTime || 0;
  const averageTimeSeconds = profile?.totalSolvedAverageTime || 0;

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
      <Styled.ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</div>
      </Styled.ProfileContainer>
    );
  }

  if (error) {
    return (
      <Styled.ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</div>
      </Styled.ProfileContainer>
    );
  }

  if (!username) {
    return (
      <Styled.ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>사용자 이름이 필요합니다.</div>
      </Styled.ProfileContainer>
    );
  }

  return (
    <Styled.ProfileContainer>
      <Styled.UserSection>
        <Styled.UserInfo>
          <Styled.UserIcon>{username.charAt(0).toUpperCase()}</Styled.UserIcon>
          <Styled.UserDetails>
            <Styled.UserHeader>
              <Styled.UserId>{username}</Styled.UserId>
            </Styled.UserHeader>
            <Styled.UserStats>
              <div>
                시간기록 문제: <Styled.StatHighlight>{totalSolved}개</Styled.StatHighlight>
              </div>
            </Styled.UserStats>
          </Styled.UserDetails>
        </Styled.UserInfo>
      </Styled.UserSection>

      <Styled.StatsCards>
        <Styled.StatCard>
          <Styled.StatCardIcon>
            <Trophy size={20} />
          </Styled.StatCardIcon>
          <Styled.StatCardTitle>시간기록한 문제 수</Styled.StatCardTitle>
          <Styled.StatCardValue>{totalSolved}개</Styled.StatCardValue>
        </Styled.StatCard>
        <Styled.StatCard>
          <Styled.StatCardIcon>
            <Clock size={20} />
          </Styled.StatCardIcon>
          <Styled.StatCardTitle>총 풀이 시간</Styled.StatCardTitle>
          <Styled.StatCardValue>
            {formatSeconds(totalTimeSeconds)}
          </Styled.StatCardValue>
        </Styled.StatCard>
        <Styled.StatCard>
          <Styled.StatCardIcon>
            <Target size={20} />
          </Styled.StatCardIcon>
          <Styled.StatCardTitle>전체 문제 평균 시간</Styled.StatCardTitle>
          <Styled.StatCardValue>
            {formatSeconds(averageTimeSeconds)}
          </Styled.StatCardValue>
        </Styled.StatCard>
      </Styled.StatsCards>

      <Styled.TabSection>
        <Styled.TabHeader>
          <Styled.TabButton
            active={activeTab === "recent"}
            onClick={() => setActiveTab("recent")}
          >
            최근 풀이 기록
          </Styled.TabButton>
          <Styled.TabButton
            active={activeTab === "tier"}
            onClick={() => setActiveTab("tier")}
          >
            티어별 통계
          </Styled.TabButton>
          <Styled.TabButton
            active={activeTab === "trend"}
            onClick={() => setActiveTab("trend")}
          >
            풀이 시간 추이
          </Styled.TabButton>
          <Styled.TabButton
            active={activeTab === "independent"}
            onClick={() => setActiveTab("independent")}
          >
            독립 풀이 비율
          </Styled.TabButton>
          <Styled.TabButton
            active={activeTab === "retry"}
            onClick={() => setActiveTab("retry")}
          >
            다시 도전하기
          </Styled.TabButton>
        </Styled.TabHeader>

        <Styled.TabContent>
          {activeTab === "recent" && <SolvedList solveds={solveds} />}
          {activeTab === "tier" && (
            <Styled.TierStatsContainer>
              {tierGroupStats.map((tierGroup) => (
                <Styled.TierGroupSection key={tierGroup.tier}>
                  <Styled.TierGroupHeader>
                    <Styled.TierGroupBadge tier={tierGroup.tier}>
                      {tierGroup.tierName}
                    </Styled.TierGroupBadge>
                    <Styled.TierGroupSummary>
                      <span>{tierGroup.totalCount}문제</span> 평균{" "}
                      {formatTime(tierGroup.averageMinutes, tierGroup.averageSeconds)}
                    </Styled.TierGroupSummary>
                  </Styled.TierGroupHeader>
                  <Styled.SubTierCards>
                    {tierGroup.subTiers.map((subTier) => (
                      <Styled.SubTierCard key={subTier.level}>
                        <Styled.SubTierLevel>{subTier.level}</Styled.SubTierLevel>
                        <Styled.SubTierInfo>
                          <Styled.SubTierCount>
                            {subTier.count}
                            <span>문제</span>
                          </Styled.SubTierCount>
                          <Styled.SubTierTime>
                            <Clock size={14} />
                            {formatTime(subTier.minutes, subTier.seconds)}
                          </Styled.SubTierTime>
                        </Styled.SubTierInfo>
                      </Styled.SubTierCard>
                    ))}
                  </Styled.SubTierCards>
                </Styled.TierGroupSection>
              ))}
            </Styled.TierStatsContainer>
          )}
          {activeTab === "trend" && username && (
            <SolveTimeTrendChart memberName={username} />
          )}
          {activeTab === "independent" && username && (
            <IndependentSolveTrendChart memberName={username} />
          )}
          {activeTab === "retry" && username && (
            <RetryListCard memberName={username} />
          )}
        </Styled.TabContent>
      </Styled.TabSection>
    </Styled.ProfileContainer>
  );
}

export default ProfilePage;
