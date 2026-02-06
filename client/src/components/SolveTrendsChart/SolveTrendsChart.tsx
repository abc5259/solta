import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { solvedQueryOptions } from "../../api/queries/solved";
import type { SolvedPeriod, TierGroup, TagKey } from "../../types/types";
import { TIER_GROUP_COLORS } from "../../constants/tierColors";
import { TrendingUp, TrendingDown, Minus, Clock, Brain } from "lucide-react";
import * as Styled from "./SolveTrendsChart.styled";

type SolveTrendsChartProps = {
  memberName: string;
};

const PERIOD_OPTIONS: { value: SolvedPeriod; label: string }[] = [
  { value: "WEEK", label: "7일" },
  { value: "MONTH", label: "30일" },
  { value: "MONTH_3", label: "3개월" },
  { value: "MONTH_6", label: "6개월" },
  { value: "ALL", label: "전체" },
];

const TIER_OPTIONS: { value: TierGroup; label: string; color: string }[] = [
  { value: "NONE", label: "전체", color: TIER_GROUP_COLORS.NONE },
  { value: "BRONZE", label: "브론즈", color: TIER_GROUP_COLORS.BRONZE },
  { value: "SILVER", label: "실버", color: TIER_GROUP_COLORS.SILVER },
  { value: "GOLD", label: "골드", color: TIER_GROUP_COLORS.GOLD },
  { value: "PLATINUM", label: "플래티넘", color: TIER_GROUP_COLORS.PLATINUM },
  { value: "DIAMOND", label: "다이아", color: TIER_GROUP_COLORS.DIAMOND },
  { value: "RUBY", label: "루비", color: TIER_GROUP_COLORS.RUBY },
];

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

export function SolveTrendsChart({ memberName }: SolveTrendsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<SolvedPeriod>("ALL");
  const [selectedTier, setSelectedTier] = useState<TierGroup>("NONE");
  const [selectedTag, setSelectedTag] = useState<TagKey | "">("");

  const { data: timeData, isLoading: isLoadingTime } = useQuery(
    solvedQueryOptions.solveTimeTrends(memberName, selectedPeriod, selectedTier, selectedTag || undefined)
  );

  const { data: ratioData, isLoading: isLoadingRatio } = useQuery(
    solvedQueryOptions.independentSolveTrends(memberName, selectedPeriod, selectedTier, selectedTag || undefined)
  );

  const selectedTierOption = TIER_OPTIONS.find((t) => t.value === selectedTier);
  const chartColor = selectedTierOption?.color || "hsl(142, 76%, 45%)";

  // Time chart data
  const timeChartData = useMemo(() => {
    if (!timeData?.trends) return [];
    return timeData.trends.map((point) => ({
      date: formatDate(point.date, selectedPeriod),
      minutes: Math.round(point.averageSeconds / 60),
      solvedCount: point.solvedCount,
    }));
  }, [timeData, selectedPeriod]);

  // Ratio chart data
  const ratioChartData = useMemo(() => {
    if (!ratioData?.trends) return [];
    return ratioData.trends.map((point) => {
      const ratio =
        point.totalCount > 0
          ? Math.round((point.independentCount / point.totalCount) * 100)
          : 0;
      return {
        date: formatDate(point.date, selectedPeriod),
        ratio,
        independentCount: point.independentCount,
        totalCount: point.totalCount,
      };
    });
  }, [ratioData, selectedPeriod]);

  // Time statistics
  const currentAverage = useMemo(() => {
    if (timeChartData.length === 0) return 0;
    const totalMinutes = timeChartData.reduce((sum, point) => sum + point.minutes, 0);
    return Math.round(totalMinutes / timeChartData.length);
  }, [timeChartData]);

  const timeChange = useMemo(() => {
    if (timeChartData.length < 2) return 0;
    const firstHalf = timeChartData.slice(0, Math.floor(timeChartData.length / 2));
    const secondHalf = timeChartData.slice(Math.floor(timeChartData.length / 2));

    const firstAvg = firstHalf.reduce((sum, point) => sum + point.minutes, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, point) => sum + point.minutes, 0) / secondHalf.length;

    return Math.round(secondAvg - firstAvg);
  }, [timeChartData]);

  // Ratio statistics
  const currentRatio = useMemo(() => {
    if (!ratioData || ratioData.totalTotalCount === 0) return 0;
    return Math.round((ratioData.totalIndependentCount / ratioData.totalTotalCount) * 100);
  }, [ratioData]);

  const ratioChange = useMemo(() => {
    if (ratioChartData.length < 2) return 0;
    const firstHalf = ratioChartData.slice(0, Math.floor(ratioChartData.length / 2));
    const secondHalf = ratioChartData.slice(Math.floor(ratioChartData.length / 2));

    const firstAvg = firstHalf.reduce((sum, point) => sum + point.ratio, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, point) => sum + point.ratio, 0) / secondHalf.length;

    return Math.round(secondAvg - firstAvg);
  }, [ratioChartData]);

  const getTimeTrendIcon = () => {
    if (timeChange < 0) return <TrendingDown size={16} />;
    if (timeChange > 0) return <TrendingUp size={16} />;
    return <Minus size={16} />;
  };

  const getRatioTrendIcon = () => {
    if (ratioChange > 0) return <TrendingUp size={16} />;
    if (ratioChange < 0) return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>풀이 추이 분석</Styled.Title>
      </Styled.Header>

      <Styled.FilterSection>
        <Styled.FilterRow>
          <Styled.FilterGroup>
            {PERIOD_OPTIONS.map((option) => (
              <Styled.FilterButton
                key={option.value}
                active={selectedPeriod === option.value}
                onClick={() => setSelectedPeriod(option.value)}
              >
                {option.label}
              </Styled.FilterButton>
            ))}
          </Styled.FilterGroup>

          <Styled.FilterGroup>
            {TIER_OPTIONS.map((option) => (
              <Styled.FilterButton
                key={option.value}
                active={selectedTier === option.value}
                activeColor={option.color}
                onClick={() => setSelectedTier(option.value)}
              >
                {option.label}
              </Styled.FilterButton>
            ))}
          </Styled.FilterGroup>
        </Styled.FilterRow>

        <Styled.FilterRow>
          <Styled.FilterGroup>
            {TAG_OPTIONS.map((option) => (
              <Styled.FilterButton
                key={option.value || "all"}
                active={selectedTag === option.value}
                onClick={() => setSelectedTag(option.value)}
              >
                {option.label}
              </Styled.FilterButton>
            ))}
          </Styled.FilterGroup>
        </Styled.FilterRow>
      </Styled.FilterSection>

      <Styled.ChartsGrid>
        {/* Time Chart */}
        <Styled.ChartCard>
          <Styled.ChartHeader>
            <Styled.ChartTitle>
              <Clock size={16} />
              평균 풀이 시간
            </Styled.ChartTitle>
          </Styled.ChartHeader>

          <Styled.StatsRow>
            <Styled.StatItem>
              <Styled.StatValue>{currentAverage}분</Styled.StatValue>
              <Styled.StatLabel>평균</Styled.StatLabel>
            </Styled.StatItem>
            <Styled.ChangeBadge change={timeChange}>
              {getTimeTrendIcon()}
              <span>
                {timeChange > 0 ? "+" : ""}
                {timeChange}분
              </span>
            </Styled.ChangeBadge>
          </Styled.StatsRow>

          <div style={{ width: "100%", height: "240px" }}>
            {isLoadingTime ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                로딩 중...
              </div>
            ) : timeChartData.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                데이터 없음
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeChartData}>
                  <defs>
                    <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#8A8D91"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#8A8D91"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}분`}
                    width={45}
                  />
                  <Tooltip
                    cursor={{ stroke: chartColor, strokeWidth: 2 }}
                    contentStyle={{
                      backgroundColor: "#262626",
                      border: "1px solid #333333",
                      borderRadius: "12px",
                      padding: "12px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                    }}
                    itemStyle={{ color: "#E4E6EB" }}
                    labelStyle={{ color: "#E4E6EB", fontWeight: 600 }}
                    content={({ active, payload, label }) => {
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
                                margin: "0 0 4px 0",
                                fontWeight: 600,
                                color: "#E4E6EB",
                              }}
                            >
                              {label}
                            </p>
                            <p
                              style={{
                                margin: "0 0 4px 0",
                                fontSize: "14px",
                                color: chartColor,
                              }}
                            >
                              평균: {data.minutes}분
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "12px",
                                color: "#B0B3B8",
                              }}
                            >
                              풀이 수: {data.solvedCount}문제
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke={chartColor}
                    strokeWidth={2}
                    fill="url(#timeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Styled.ChartCard>

        {/* Ratio Chart */}
        <Styled.ChartCard>
          <Styled.ChartHeader>
            <Styled.ChartTitle>
              <Brain size={16} />
              독립 풀이 비율
            </Styled.ChartTitle>
          </Styled.ChartHeader>

          <Styled.StatsRow>
            <Styled.StatItem>
              <Styled.StatValue>{currentRatio}%</Styled.StatValue>
              <Styled.StatLabel>현재</Styled.StatLabel>
            </Styled.StatItem>
            <Styled.ChangeBadge change={ratioChange} isPositiveGood={true}>
              {getRatioTrendIcon()}
              <span>
                {ratioChange > 0 ? "+" : ""}
                {ratioChange}%p
              </span>
            </Styled.ChangeBadge>
          </Styled.StatsRow>

          <div style={{ width: "100%", height: "240px" }}>
            {isLoadingRatio ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                로딩 중...
              </div>
            ) : ratioChartData.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                데이터 없음
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ratioChartData}>
                  <defs>
                    <linearGradient id="ratioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#8A8D91"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#8A8D91"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                    width={45}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    cursor={{ stroke: chartColor, strokeWidth: 2 }}
                    contentStyle={{
                      backgroundColor: "#262626",
                      border: "1px solid #333333",
                      borderRadius: "12px",
                      padding: "12px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                    }}
                    itemStyle={{ color: "#E4E6EB" }}
                    labelStyle={{ color: "#E4E6EB", fontWeight: 600 }}
                    content={({ active, payload, label }) => {
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
                                margin: "0 0 4px 0",
                                fontWeight: 600,
                                color: "#E4E6EB",
                              }}
                            >
                              {label}
                            </p>
                            <p
                              style={{
                                margin: "0 0 4px 0",
                                fontSize: "14px",
                                color: chartColor,
                              }}
                            >
                              독립 풀이: {data.ratio}%
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "12px",
                                color: "#B0B3B8",
                              }}
                            >
                              {data.independentCount}/{data.totalCount}문제
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ratio"
                    stroke={chartColor}
                    strokeWidth={2}
                    fill="url(#ratioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Styled.ChartCard>
      </Styled.ChartsGrid>
    </Styled.Container>
  );
}

function formatDate(dateString: string, period: SolvedPeriod): string {
  const date = new Date(dateString);

  if (period === "WEEK" || period === "MONTH") {
    // 일별 표시
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  } else if (period === "MONTH_3" || period === "MONTH_6") {
    // 월별 표시 (3개월, 6개월도 월별로 표시)
    const year = date.getFullYear().toString().slice(-2);
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  } else {
    // 월별 표시
    const year = date.getFullYear().toString().slice(-2);
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  }
}
