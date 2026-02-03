import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Trophy } from "lucide-react";
import { TIER_GROUP_COLORS } from "../../constants/tierColors";
import formatSeconds from "../../utils/formatSeconds";
import * as Styled from "./TierStatsChart.styled";
import type { TierGroup } from "../../types/types";

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
  averageMinutes: number;
  averageSeconds: number;
  subTiers: SubTier[];
};

type TierStatsChartProps = {
  tierGroupStats: TierGroupStat[];
};

const TIER_ORDER = ["BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "RUBY"];

export function TierStatsChart({ tierGroupStats }: TierStatsChartProps) {
  // Sort tier groups by tier order
  const sortedStats = [...tierGroupStats].sort((a, b) => {
    return TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
  });

  // Create chart data from all sub-tiers
  const chartData: Array<{
    name: string;
    averageTime: number;
    tier: string;
    count: number;
  }> = [];

  sortedStats.forEach((tierGroup) => {
    tierGroup.subTiers.forEach((subTier) => {
      chartData.push({
        name: subTier.level,
        averageTime: subTier.minutes * 60 + subTier.seconds,
        tier: tierGroup.tier,
        count: subTier.count,
      });
    });
  });

  const totalProblems = tierGroupStats.reduce(
    (sum, stat) => sum + stat.totalCount,
    0
  );

  // Calculate overall average time (weighted by problem count)
  const overallAverageTime = chartData.length > 0
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
      return `${longestTimeTier.name}에서 평균 ${formatSeconds(longestTimeTier.averageTime)}로 가장 오래 걸렸어요!`;
    }
    return "꾸준히 문제를 풀고 있어요!";
  };

  return (
    <Styled.ChartContainer>
      <Styled.ChartHeader>
        <Styled.HeaderLeft>
          <div>
            <Styled.ChartTitle>티어별 평균 풀이 시간</Styled.ChartTitle>
            <Styled.ChartSubtitle>
              {totalProblems > 0 ? `${totalProblems}문제의 세부 티어별 평균 시간` : "데이터 없음"}
            </Styled.ChartSubtitle>
          </div>
        </Styled.HeaderLeft>
        <Styled.IconWrapper>
          <Trophy size={20} />
        </Styled.IconWrapper>
      </Styled.ChartHeader>

      <Styled.StatsRow>
        <Styled.CurrentRatio>
          <Styled.RatioValue>{formatSeconds(overallAverageTime)}</Styled.RatioValue>
          <Styled.RatioLabel>전체 평균</Styled.RatioLabel>
        </Styled.CurrentRatio>
      </Styled.StatsRow>

      <Styled.ChartWrapper>
        {chartData.length === 0 ? (
          <Styled.EmptyState>풀이 기록이 없습니다</Styled.EmptyState>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={28}>
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
                          평균: {formatSeconds(data.averageTime)}
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
              <Bar dataKey="averageTime" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${entry.tier})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Styled.ChartWrapper>

      <Styled.InsightBox>
        <Styled.InsightText>{getInsightMessage()}</Styled.InsightText>
      </Styled.InsightBox>
    </Styled.ChartContainer>
  );
}
