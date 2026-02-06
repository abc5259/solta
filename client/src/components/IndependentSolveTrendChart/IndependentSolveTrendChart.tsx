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
import { TrendingUp, TrendingDown, Minus, Brain } from "lucide-react";
import * as Styled from "./IndependentSolveTrendChart.styled";

type IndependentSolveTrendChartProps = {
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

export function IndependentSolveTrendChart({
  memberName,
}: IndependentSolveTrendChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<SolvedPeriod>("ALL");
  const [selectedTier, setSelectedTier] = useState<TierGroup>("NONE");
  const [selectedTag, setSelectedTag] = useState<TagKey | "">("");

  const { data, isLoading } = useQuery(
    solvedQueryOptions.independentSolveTrends(
      memberName,
      selectedPeriod,
      selectedTier,
      selectedTag || undefined
    )
  );

  const chartData = useMemo(() => {
    if (!data?.trends) return [];
    return data.trends.map((point) => {
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
  }, [data, selectedPeriod]);

  const selectedTierOption = TIER_OPTIONS.find((t) => t.value === selectedTier);
  const chartColor = selectedTierOption?.color || "hsl(142, 76%, 45%)";

  const currentRatio = useMemo(() => {
    if (!data || data.totalTotalCount === 0) return 0;
    return Math.round(
      (data.totalIndependentCount / data.totalTotalCount) * 100
    );
  }, [data]);

  const ratioChange = useMemo(() => {
    if (chartData.length < 2) return 0;
    const firstHalf = chartData.slice(0, Math.floor(chartData.length / 2));
    const secondHalf = chartData.slice(Math.floor(chartData.length / 2));

    const firstAvg =
      firstHalf.reduce((sum, point) => sum + point.ratio, 0) / firstHalf.length;
    const secondAvg =
      secondHalf.reduce((sum, point) => sum + point.ratio, 0) /
      secondHalf.length;

    return Math.round(secondAvg - firstAvg);
  }, [chartData]);

  const getTrendIcon = () => {
    if (ratioChange > 0) return <TrendingUp className="w-4 h-4" />;
    if (ratioChange < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getInsightMessage = () => {
    if (ratioChange > 10) return "독립 문제 해결 능력이 크게 향상됐어요!";
    if (ratioChange > 0 && ratioChange <= 10)
      return "점점 스스로 푸는 비율이 높아지고 있어요!";
    if (ratioChange === 0) return "꾸준히 유지하고 있어요.";
    return "어려운 문제에 도전하고 있나요? 화이팅!";
  };

  return (
    <Styled.ChartContainer>
      <Styled.ChartHeader>
        <Styled.HeaderLeft>
          <div>
            <Styled.ChartTitle>독립 풀이 비율 추이</Styled.ChartTitle>
            <Styled.ChartSubtitle>
              SELF vs SOLUTION 성장 그래프
            </Styled.ChartSubtitle>
          </div>
        </Styled.HeaderLeft>
        <Styled.IconWrapper>
          <Brain size={20} />
        </Styled.IconWrapper>
      </Styled.ChartHeader>

      <Styled.StatsRow>
        <Styled.CurrentRatio>
          <Styled.RatioValue>{currentRatio}%</Styled.RatioValue>
          <Styled.RatioLabel>현재</Styled.RatioLabel>
        </Styled.CurrentRatio>
        <Styled.ChangeBadge change={ratioChange}>
          {getTrendIcon()}
          <span>
            {ratioChange > 0 ? "+" : ""}
            {ratioChange}%p
          </span>
        </Styled.ChangeBadge>
      </Styled.StatsRow>

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

      <Styled.ChartWrapper>
        {isLoading ? (
          <Styled.LoadingState>로딩 중...</Styled.LoadingState>
        ) : chartData.length === 0 ? (
          <Styled.EmptyState>
            선택한 조건에 맞는 데이터가 없습니다
          </Styled.EmptyState>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id={`ratioGradient-${selectedTier}`}
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
                stroke="#333333"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#8A8D91"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
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
                fill={`url(#ratioGradient-${selectedTier})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Styled.ChartWrapper>

      <Styled.InsightBox>
        <Styled.InsightText>{getInsightMessage()}</Styled.InsightText>
      </Styled.InsightBox>
    </Styled.ChartContainer>
  );
}

function formatDate(dateString: string, period: SolvedPeriod): string {
  const date = new Date(dateString);

  if (period === "WEEK" || period === "MONTH") {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  } else if (period === "MONTH_3" || period === "MONTH_6") {
    const year = date.getFullYear().toString().slice(-2);
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  } else {
    const year = date.getFullYear().toString().slice(-2);
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  }
}
