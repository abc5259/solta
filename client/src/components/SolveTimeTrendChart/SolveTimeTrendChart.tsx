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
import type { SolvedPeriod, TierGroup } from "../../types/types";
import { TIER_GROUP_COLORS } from "../../constants/tierColors";
import * as Styled from "./SolveTimeTrendChart.styled";

type SolveTimeTrendChartProps = {
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

export function SolveTimeTrendChart({ memberName }: SolveTimeTrendChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<SolvedPeriod>("WEEK");
  const [selectedTier, setSelectedTier] = useState<TierGroup>("NONE");

  const { data, isLoading } = useQuery(
    solvedQueryOptions.solveTimeTrends(memberName, selectedPeriod, selectedTier)
  );

  const chartData = useMemo(() => {
    if (!data?.trends) return [];
    return data.trends.map((point) => ({
      date: formatDate(point.date, selectedPeriod),
      minutes: Math.round(point.averageSeconds / 60),
      solvedCount: point.solvedCount,
    }));
  }, [data, selectedPeriod]);

  const selectedTierOption = TIER_OPTIONS.find((t) => t.value === selectedTier);
  const chartColor = selectedTierOption?.color || "hsl(142, 76%, 45%)";
  const totalSolvedCount = useMemo(
    () => chartData.reduce((sum, point) => sum + point.solvedCount, 0),
    [chartData]
  );

  return (
    <Styled.ChartContainer>
      <Styled.ChartHeader>
        <Styled.ChartTitle>평균 풀이 시간 추이</Styled.ChartTitle>
        <Styled.ChartSubtitle>
          {totalSolvedCount > 0
            ? `${totalSolvedCount}문제 평균`
            : "데이터 없음"}
        </Styled.ChartSubtitle>
      </Styled.ChartHeader>

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

      <Styled.ChartWrapper>
        {isLoading ? (
          <Styled.LoadingState>로딩 중...</Styled.LoadingState>
        ) : chartData.length === 0 ? (
          <Styled.EmptyState>선택한 조건에 맞는 데이터가 없습니다</Styled.EmptyState>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id={`timeGradient-${selectedTier}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}분`}
                width={45}
                domain={[0, 60]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          padding: "12px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 4px 0",
                            fontWeight: 600,
                            color: "#24292f",
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
                            color: "#6b7280",
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
                fill={`url(#timeGradient-${selectedTier})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Styled.ChartWrapper>
    </Styled.ChartContainer>
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
