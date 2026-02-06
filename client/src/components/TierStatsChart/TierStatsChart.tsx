import { useState, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { TIER_GROUP_COLORS } from "../../constants/tierColors";
import formatSeconds from "../../utils/formatSeconds";
import { solvedQueryOptions } from "../../api/queries/solved";
import * as Styled from "./TierStatsChart.styled";
import type { TierGroup, TagKey } from "../../types/types";

type SubTier = {
  level: string;
  count: number;
  minutes: number;
  seconds: number;
};

type TierGroupStat = {
  tier: string;
  tierName: string;
  totalCount: number;
  independentSolvedCount: number;
  independentRatio: number;
  averageMinutes: number;
  averageSeconds: number;
  subTiers: SubTier[];
};

type TierStatsChartProps = {
  memberName: string;
};

const TIER_ORDER = ["BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "RUBY"];

const TIER_NAMES: Record<string, string> = {
  BRONZE: "브론즈",
  SILVER: "실버",
  GOLD: "골드",
  PLATINUM: "플래티넘",
  DIAMOND: "다이아",
  RUBY: "루비",
};

const TAG_OPTIONS: { value: TagKey | ""; label: string }[] = [
  { value: "", label: "전체" },
  { value: "MATH", label: "수학" },
  { value: "IMPLEMENTATION", label: "구현" },
  { value: "GREEDY", label: "그리디 알고리즘" },
  { value: "STRING", label: "문자열" },
  { value: "DATA_STRUCTURES", label: "자료 구조" },
  { value: "GRAPHS", label: "그래프 이론" },
  { value: "DP", label: "다이나믹 프로그래밍" },
  { value: "GEOMETRY", label: "기하학" },
  { value: "BINARY_SEARCH", label: "이분탐색" },
];

export function TierStatsChart({ memberName }: TierStatsChartProps) {
  const [selectedTier, setSelectedTier] = useState<string>("ALL");
  const [selectedTag, setSelectedTag] = useState<TagKey | "">("");

  const { data: tierGroupAverages = [], isLoading: isLoadingTierGroups } = useQuery(
    solvedQueryOptions.tierGroupAverages(memberName, selectedTag || undefined)
  );

  const { data: tierAverages = null, isLoading: isLoadingTiers } = useQuery(
    solvedQueryOptions.tierAverages(memberName, selectedTag || undefined)
  );

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
  const tierGroupStats: TierGroupStat[] = useMemo(() => {
    return tierGroupAverages
      .filter(tg => tg.tierGroup !== "UNRATED" && tg.tierGroup !== "NONE")
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

        const independentRatio = tg.solvedCount > 0
          ? Math.round((tg.independentSolvedCount / tg.solvedCount) * 100)
          : 0;

        return {
          tier: tg.tierGroup,
          tierName: getTierGroupName(tg.tierGroup),
          totalCount: tg.solvedCount,
          independentSolvedCount: tg.independentSolvedCount,
          independentRatio,
          averageMinutes: Math.floor((tg.averageSolvedSeconds || 0) / 60),
          averageSeconds: Math.floor((tg.averageSolvedSeconds || 0) % 60),
          subTiers,
        };
      });
  }, [tierGroupAverages, tierAverages]);

  // Sort tier groups by tier order
  const sortedStats = [...tierGroupStats].sort((a, b) => {
    return TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
  });

  // Filter to show only selected tier (or all if "ALL" is selected)
  const selectedTierData = selectedTier === "ALL"
    ? null
    : sortedStats.find(stat => stat.tier === selectedTier);

  // Create chart data from selected tier's sub-tiers only (or all tiers if "ALL")
  const chartData: Array<{
    name: string;
    averageTime: number;
    tier: string;
    count: number;
    independentRatio: number;
  }> = selectedTier === "ALL"
    ? sortedStats.flatMap((tierGroup) =>
        tierGroup.subTiers.map((subTier) => ({
          name: subTier.level,
          averageTime: subTier.minutes * 60 + subTier.seconds,
          tier: tierGroup.tier,
          count: subTier.count,
          independentRatio: tierGroup.independentRatio,
        }))
      )
    : selectedTierData
    ? selectedTierData.subTiers.map((subTier) => ({
        name: subTier.level,
        averageTime: subTier.minutes * 60 + subTier.seconds,
        tier: selectedTierData.tier,
        count: subTier.count,
        independentRatio: selectedTierData.independentRatio,
      }))
    : [];

  // Calculate statistics for selected tier (or all tiers if "ALL")
  const totalProblems = selectedTier === "ALL"
    ? sortedStats.reduce((sum, stat) => sum + stat.totalCount, 0)
    : selectedTierData?.totalCount || 0;

  const totalIndependentSolved = selectedTier === "ALL"
    ? sortedStats.reduce((sum, stat) => sum + stat.independentSolvedCount, 0)
    : selectedTierData?.independentSolvedCount || 0;

  const independentRatio = totalProblems > 0
    ? Math.round((totalIndependentSolved / totalProblems) * 100)
    : 0;

  // Calculate average time for selected tier (weighted by problem count)
  const averageTime = chartData.length > 0
    ? Math.floor(
        chartData.reduce((sum, item) => sum + item.averageTime * item.count, 0) /
          chartData.reduce((sum, item) => sum + item.count, 0)
      )
    : 0;

  // Find tier with longest average time
  const longestTimeTier = chartData.length > 0
    ? chartData.reduce((prev, current) =>
        current.averageTime > prev.averageTime ? current : prev
      )
    : null;

  const getInsightMessage = () => {
    if (totalProblems === 0) return "아직 풀이 기록이 없습니다.";
    if (longestTimeTier) {
      if (selectedTier === "ALL") {
        return `전체 티어에서 ${longestTimeTier.name}가 평균 ${formatSeconds(longestTimeTier.averageTime)}로 가장 오래 걸렸어요!`;
      } else if (selectedTierData) {
        return `${TIER_NAMES[selectedTierData.tier]} 티어에서 ${longestTimeTier.name}가 평균 ${formatSeconds(longestTimeTier.averageTime)}로 가장 오래 걸렸어요!`;
      }
    }
    return "꾸준히 문제를 풀고 있어요!";
  };

  const loading = isLoadingTierGroups || isLoadingTiers;

  return (
    <Styled.ChartContainer>
      <Styled.ChartHeader>
        <Styled.HeaderLeft>
          <div>
            <Styled.ChartTitle>티어별 세부 통계</Styled.ChartTitle>
            <Styled.ChartSubtitle>
              {selectedTier === "ALL"
                ? `전체 ${totalProblems}문제의 평균 풀이 시간 및 독립 풀이율`
                : selectedTierData
                ? `${TIER_NAMES[selectedTierData.tier]} ${totalProblems}문제의 평균 풀이 시간 및 독립 풀이율`
                : "데이터 없음"}
            </Styled.ChartSubtitle>
          </div>
        </Styled.HeaderLeft>
        <Styled.IconWrapper>
          <Trophy size={20} />
        </Styled.IconWrapper>
      </Styled.ChartHeader>

      <Styled.FilterRow>
        <Styled.TierSelector>
          <Styled.TierButton
            active={selectedTier === "ALL"}
            tierColor={TIER_GROUP_COLORS.NONE}
            onClick={() => setSelectedTier("ALL")}
          >
            전체 ({sortedStats.reduce((sum, stat) => sum + stat.totalCount, 0)})
          </Styled.TierButton>
          {sortedStats.map((stat) => (
            <Styled.TierButton
              key={stat.tier}
              active={selectedTier === stat.tier}
              tierColor={TIER_GROUP_COLORS[stat.tier as TierGroup]}
              onClick={() => setSelectedTier(stat.tier)}
            >
              {TIER_NAMES[stat.tier]} ({stat.totalCount})
            </Styled.TierButton>
          ))}
        </Styled.TierSelector>

        <Styled.TagSelector>
          {TAG_OPTIONS.map((option) => (
            <Styled.TagButton
              key={option.value || "all"}
              active={selectedTag === option.value}
              onClick={() => setSelectedTag(option.value)}
            >
              {option.label}
            </Styled.TagButton>
          ))}
        </Styled.TagSelector>
      </Styled.FilterRow>

      <Styled.StatsRow>
        <Styled.CurrentRatio>
          <Styled.RatioValue>{formatSeconds(averageTime)}</Styled.RatioValue>
          <Styled.RatioLabel>평균 시간</Styled.RatioLabel>
        </Styled.CurrentRatio>
        <Styled.CurrentRatio>
          <Styled.RatioValue>{independentRatio}%</Styled.RatioValue>
          <Styled.RatioLabel>독립 풀이율</Styled.RatioLabel>
        </Styled.CurrentRatio>
      </Styled.StatsRow>

      <Styled.ChartWrapper>
        {chartData.length === 0 ? (
          <Styled.EmptyState>풀이 기록이 없습니다</Styled.EmptyState>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} barSize={28}>
              <defs>
                {Object.entries(TIER_GROUP_COLORS).map(([tier, color]) => (
                  <linearGradient key={tier} id={`gradient-${tier}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333333"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#8A8D91"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#8A8D91"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={50}
                tickFormatter={(value) => {
                  const minutes = Math.floor(value / 60);
                  if (minutes >= 60) {
                    const hours = Math.floor(minutes / 60);
                    return `${hours}시간`;
                  }
                  return `${minutes}분`;
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#5B9FED"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={50}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(91, 159, 237, 0.1)' }}
                contentStyle={{
                  backgroundColor: "#262626",
                  border: "1px solid #333333",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                }}
                itemStyle={{ color: "#E4E6EB" }}
                labelStyle={{ color: "#E4E6EB", fontWeight: 600 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div
                        style={{
                          backgroundColor: "#262626",
                          border: "1px solid #333333",
                          borderRadius: "12px",
                          padding: "12px",
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 8px 0",
                            fontWeight: 600,
                            color: "#E4E6EB",
                          }}
                        >
                          {data.name}
                        </p>
                        <p
                          style={{
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                            color: TIER_GROUP_COLORS[data.tier as TierGroup],
                            fontWeight: 600,
                          }}
                        >
                          평균 시간: {formatSeconds(data.averageTime)}
                        </p>
                        <p
                          style={{
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                            color: "#5B9FED",
                            fontWeight: 600,
                          }}
                        >
                          독립 풀이율: {data.independentRatio}%
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "#B0B3B8",
                          }}
                        >
                          풀이 수: {data.count}문제
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="averageTime" yAxisId="left" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${entry.tier})`}
                  />
                ))}
              </Bar>
              <Line
                type="monotone"
                dataKey="independentRatio"
                yAxisId="right"
                stroke="#5B9FED"
                strokeWidth={2}
                dot={{ fill: "#5B9FED", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Styled.ChartWrapper>

      <Styled.InsightBox>
        <Styled.InsightText>{getInsightMessage()}</Styled.InsightText>
      </Styled.InsightBox>
    </Styled.ChartContainer>
  );
}
