import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SolvedList } from "../components/SolvedList/SolvedList";
import { SolveTrendsChart } from "../components/SolveTrendsChart/SolveTrendsChart";
import { RetryListCard } from "../components/RetryListCard/RetryListCard";
import { TierStatsChart } from "../components/TierStatsChart/TierStatsChart";
import { Trophy, Clock, Target } from "lucide-react";
import { solvedQueryOptions } from "../api/queries/solved";
import formatSeconds from "../utils/formatSeconds";
import * as Styled from "./ProfilePage.styled";

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<"recent" | "stats" | "retry">("recent");

  const { data: profile, isLoading: isLoadingProfile, isError: isErrorProfile } = useQuery(
    solvedQueryOptions.profile(username || "")
  );

  const { data: solveds = [], isLoading: isLoadingSolveds } = useQuery(
    solvedQueryOptions.recentSolveds(username || "")
  );

  const loading = isLoadingProfile || isLoadingSolveds;
  const error = isErrorProfile ? "데이터를 불러오는데 실패했습니다." : null;

  // Calculate statistics from profile API data
  const totalSolved = profile?.solvedCount || 0;
  const totalTimeSeconds = profile?.totalSolvedTime || 0;
  const averageTimeSeconds = profile?.totalSolvedAverageTime || 0;

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
            최근 풀이
          </Styled.TabButton>
          <Styled.TabButton
            active={activeTab === "stats"}
            onClick={() => setActiveTab("stats")}
          >
            통계
          </Styled.TabButton>
          <Styled.TabButton
            active={activeTab === "retry"}
            onClick={() => setActiveTab("retry")}
          >
            다시 도전하기
          </Styled.TabButton>
        </Styled.TabHeader>

        <Styled.TabContent>
          {activeTab === "recent" && (
            <Styled.FullWidthSection>
              <SolvedList solveds={solveds} />
            </Styled.FullWidthSection>
          )}
          {activeTab === "stats" && (
            <>
              {username && (
                <Styled.FullWidthSection>
                  <TierStatsChart memberName={username} />
                </Styled.FullWidthSection>
              )}
              {username && <SolveTrendsChart memberName={username} />}
            </>
          )}
          {activeTab === "retry" && username && <RetryListCard memberName={username} />}
        </Styled.TabContent>
      </Styled.TabSection>
    </Styled.ProfileContainer>
  );
}

export default ProfilePage;
