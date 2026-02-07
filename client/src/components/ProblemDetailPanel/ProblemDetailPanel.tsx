import { Clock, Users, Zap, Trophy, Target, BookOpen, ChevronRight } from "lucide-react";
import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from "../../constants/tierColors";
import formatSeconds from "../../utils/formatSeconds";
import type { ProblemDetailResponse } from "../../types/api";
import * as Styled from "./ProblemDetailPanel.styled";

interface ProblemDetailPanelProps {
  detail: ProblemDetailResponse;
}

export function ProblemDetailPanel({ detail }: ProblemDetailPanelProps) {
  const {
    bojProblemId,
    title,
    tier,
    tags,
    totalSolvedCount,
    independentSolvedCount,
    averageSolveTimeSeconds,
    shortestSolveTimeSeconds,
  } = detail;

  const tierColor = hslToRgb(TIER_GROUP_COLORS[getTierGroupFromTier(tier)]);
  const selfSolveRatio = totalSolvedCount > 0
    ? Math.round((independentSolvedCount / totalSolvedCount) * 100)
    : 0;
  const hasData = totalSolvedCount > 0;

  const getRecommendation = () => {
    if (!hasData) {
      return {
        icon: Target,
        title: "첫 번째 정복자가 되어보세요!",
        description: "아직 아무도 풀지 않은 문제입니다. 첫 번째 정복자가 될 수 있어요!",
        color: "#5B9FED",
      };
    }
    if (selfSolveRatio >= 70) {
      return {
        icon: Trophy,
        title: "자력 풀이 추천!",
        description: "많은 사람들이 스스로 풀어낸 문제입니다. 도전해보세요!",
        color: "#4CAF50",
      };
    } else if (selfSolveRatio >= 40) {
      return {
        icon: Target,
        title: "도전적인 문제",
        description: "적당한 난이도입니다. 충분히 고민한 후 풀어보세요.",
        color: "#5B9FED",
      };
    } else {
      return {
        icon: BookOpen,
        title: "학습용 문제",
        description: "개념 학습이 필요할 수 있어요. 해설을 참고하며 풀어보세요.",
        color: "#FFA726",
      };
    }
  };

  const recommendation = getRecommendation();
  const RecommendIcon = recommendation.icon;

  const getSolveRatioColor = () => {
    if (selfSolveRatio >= 60) return "#4CAF50";
    if (selfSolveRatio >= 40) return "#FFA726";
    return "#EF5350";
  };

  return (
    <Styled.Container>
      {/* Header */}
      <Styled.Header>
        <Styled.HeaderMeta>
          <Styled.BojId>BOJ #{bojProblemId}</Styled.BojId>
          <Styled.TierBadge $color={tierColor}>{tier}</Styled.TierBadge>
        </Styled.HeaderMeta>
        <Styled.Title>{title}</Styled.Title>
      </Styled.Header>

      {/* Tags */}
      <Styled.TagSection>
        <Styled.SectionLabel>알고리즘 분류</Styled.SectionLabel>
        <Styled.TagList>
          {tags.map(tag => (
            <Styled.Tag key={tag}>{tag}</Styled.Tag>
          ))}
        </Styled.TagList>
      </Styled.TagSection>

      {/* Recommendation */}
      <Styled.RecommendBox $color={recommendation.color}>
        <Styled.RecommendIconBox $color={recommendation.color}>
          <RecommendIcon size={20} color={recommendation.color} />
        </Styled.RecommendIconBox>
        <div>
          <Styled.RecommendTitle>{recommendation.title}</Styled.RecommendTitle>
          <Styled.RecommendDescription>{recommendation.description}</Styled.RecommendDescription>
        </div>
      </Styled.RecommendBox>

      {/* Stats */}
      <Styled.StatsSection>
        {hasData ? (
          <>
            {/* 자력 풀이율 */}
            <Styled.StatCard>
              <Styled.StatHeader>
                <Styled.StatLabel>
                  <Zap size={16} />
                  자력 풀이율
                </Styled.StatLabel>
                <Styled.StatValue $color={getSolveRatioColor()}>
                  {selfSolveRatio}%
                </Styled.StatValue>
              </Styled.StatHeader>
              <Styled.ProgressBar>
                <Styled.ProgressFill
                  $width={selfSolveRatio}
                  $color={getSolveRatioColor()}
                />
              </Styled.ProgressBar>
              <Styled.StatSubtext>
                {totalSolvedCount.toLocaleString()}명 중{" "}
                {independentSolvedCount.toLocaleString()}명이 자력으로 풀었어요
              </Styled.StatSubtext>
            </Styled.StatCard>

            {/* 풀이 시간 */}
            <Styled.StatCard>
              <Styled.StatLabel style={{ marginBottom: "12px" }}>
                <Clock size={16} />
                풀이 시간
              </Styled.StatLabel>
              <Styled.TimeGrid>
                <Styled.TimeItem $hasBorder>
                  <Styled.TimeLabel>평균</Styled.TimeLabel>
                  <Styled.TimeValue>
                    {averageSolveTimeSeconds != null
                      ? formatSeconds(Math.round(averageSolveTimeSeconds))
                      : "-"}
                  </Styled.TimeValue>
                </Styled.TimeItem>
                <Styled.TimeItem>
                  <Styled.TimeLabel>최단</Styled.TimeLabel>
                  <Styled.TimeValue $color="#4CAF50">
                    {shortestSolveTimeSeconds != null
                      ? formatSeconds(shortestSolveTimeSeconds)
                      : "-"}
                  </Styled.TimeValue>
                </Styled.TimeItem>
              </Styled.TimeGrid>
            </Styled.StatCard>
          </>
        ) : (
          <Styled.EmptyState>
            <Styled.EmptyIcon>
              <Users size={40} />
            </Styled.EmptyIcon>
            <Styled.EmptyTitle>아직 풀이 데이터가 없어요</Styled.EmptyTitle>
            <Styled.EmptySubtext>
              이 문제를 처음 풀면 기록이 남게 됩니다.
            </Styled.EmptySubtext>
          </Styled.EmptyState>
        )}
      </Styled.StatsSection>

      {/* BOJ Link */}
      <Styled.BojLink
        href={`https://www.acmicpc.net/problem/${bojProblemId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        백준에서 풀기
        <ChevronRight size={16} />
      </Styled.BojLink>
    </Styled.Container>
  );
}
