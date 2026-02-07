import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from "../../constants/tierColors";
import type { ProblemSearchItem } from "../../types/api";
import * as Styled from "./ProblemCard.styled";

interface ProblemCardProps {
  problem: ProblemSearchItem;
  onClick?: () => void;
  isSelected?: boolean;
}

export function ProblemCard({ problem, onClick, isSelected = false }: ProblemCardProps) {
  const tierGroup = getTierGroupFromTier(problem.tier);
  const tierColor = hslToRgb(TIER_GROUP_COLORS[tierGroup]);

  return (
    <Styled.Container onClick={onClick} $isSelected={isSelected}>
      <Styled.ProblemInfo>
        <Styled.ProblemHeader>
          <Styled.ProblemNumber>#{problem.bojProblemId}</Styled.ProblemNumber>
          <Styled.TierBadge $color={tierColor}>
            {problem.tier}
          </Styled.TierBadge>
        </Styled.ProblemHeader>
        <Styled.ProblemTitle>{problem.title}</Styled.ProblemTitle>
      </Styled.ProblemInfo>

      <Styled.TagList>
        {problem.tags.slice(0, 3).map(tag => (
          <Styled.Tag key={tag}>{tag}</Styled.Tag>
        ))}
        {problem.tags.length > 3 && (
          <Styled.Tag>+{problem.tags.length - 3}</Styled.Tag>
        )}
      </Styled.TagList>
    </Styled.Container>
  );
}
