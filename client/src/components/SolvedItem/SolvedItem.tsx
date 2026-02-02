import { ExternalLink, Clock, Tag } from "lucide-react";
import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from "../../constants/tierColors";
import formatSeconds from "../../utils/formatSeconds";
import type { RecentSolvedResponse } from "../../types/api";
import * as Styled from "./SolvedItem.styled";

interface SolvedItemProps {
  solved: RecentSolvedResponse;
  showSolveType?: boolean;
  showDate?: boolean;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
}

export function SolvedItem({ solved, showSolveType = false, showDate = false }: SolvedItemProps) {
  const tierGroup = getTierGroupFromTier(solved.problem.tier);
  const tierColor = hslToRgb(TIER_GROUP_COLORS[tierGroup]);

  return (
    <Styled.Container
      href={`https://www.acmicpc.net/problem/${solved.problem.bojProblemId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Styled.TierBar color={tierColor} />

      <Styled.ProblemInfo>
        <Styled.ProblemHeader>
          <Styled.ProblemNumber>#{solved.problem.bojProblemId}</Styled.ProblemNumber>
          <Styled.ProblemTitle>{solved.problem.title}</Styled.ProblemTitle>
        </Styled.ProblemHeader>

        <Styled.ProblemMeta>
          <Styled.TierText color={tierColor}>{solved.problem.tier}</Styled.TierText>
          <Styled.MetaItem>
            <Clock size={12} />
            {formatSeconds(solved.solveTimeSeconds)}
          </Styled.MetaItem>
          {solved.problem.tags.length > 0 && (
            <Styled.MetaItem>
              <Tag size={12} />
              {solved.problem.tags[0]}
              {solved.problem.tags.length > 1 && ` +${solved.problem.tags.length - 1}`}
            </Styled.MetaItem>
          )}
          {showDate && solved.createdAt && (
            <Styled.DateText>{formatDate(solved.createdAt)}</Styled.DateText>
          )}
        </Styled.ProblemMeta>
      </Styled.ProblemInfo>

      {showSolveType && (
        <Styled.SolveTypeBadge solveType={solved.solveType}>
          {solved.solveType === "SELF" ? "스스로" : "참고"}
        </Styled.SolveTypeBadge>
      )}

      <Styled.ExternalLinkIcon>
        <ExternalLink size={16} />
      </Styled.ExternalLinkIcon>
    </Styled.Container>
  );
}
