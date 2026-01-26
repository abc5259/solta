import formatSeconds from "../../utils/formatSeconds";
import * as Styled from "./TierGroupCard.styled";

export const TierGroup = {
  UNRANKED: "UNRANKED",
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
  DIAMOND: "DIAMOND",
  RUBY: "RUBY",
} as const;

export type TierGroupType = typeof TierGroup[keyof typeof TierGroup];

type TierGroupCardProps = {
  tierGroup: TierGroupType;
  averageSolvedSeconds?: number;
  solvedCount: number;
}

function getKoreanTierName(tierGroup: TierGroupType): string {
  switch (tierGroup) {
    case TierGroup.UNRANKED:
      return "언랭크";
    case TierGroup.BRONZE:
      return "브론즈";
    case TierGroup.SILVER:
      return "실버";
    case TierGroup.GOLD:
      return "골드";
    case TierGroup.PLATINUM:
      return "플래티넘";
    case TierGroup.DIAMOND:
      return "다이아";
    case TierGroup.RUBY:
      return "루비";
    default:
      return tierGroup;
  }
}

export function TierGroupCard({ tierGroup, averageSolvedSeconds = 0, solvedCount = 0 }: TierGroupCardProps) {
    return (
        <Styled.TierGroupCardWrapper>
            <Styled.TierTextWrapper>
              <div className="tier-group">{getKoreanTierName(tierGroup)}</div>
              <div className="solved-count">{solvedCount} 문제</div>
            </Styled.TierTextWrapper>
            <Styled.TierAverageSolvedSecondsWrapper tierGroup={tierGroup}>
              <span>{formatSeconds(averageSolvedSeconds)}</span>              
            </Styled.TierAverageSolvedSecondsWrapper>
        </Styled.TierGroupCardWrapper>
    )
}