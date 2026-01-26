import styled from "styled-components";
import type { TierGroupType } from "./TierGroupCard";

const badgeBackgroundColor: Record<TierGroupType, string> = {
  BRONZE: '#FCE9D9',
  SILVER: '#E5E7EB',
  GOLD: '#FBF1D6',
  PLATINUM: '#F7F7F2',
  DIAMOND: '#D9EFF5',
  RUBY: '#FDE2EA',
  UNRANKED: '#E7ECFF',
};

const badgeTextColor: Record<TierGroupType, string> = {
  BRONZE: '#8A4B13',
  SILVER: '#374151',
  GOLD: '#9C6B00',
  PLATINUM: '#4B5563',
  DIAMOND: '#0E7490',
  RUBY: '#BE185D',
  UNRANKED: '#1D4ED8',
};


export const TierGroupCardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(3)};
    border-radius: 8px;
    background-color: #FFF;
`;

export const TierTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    .tier-group {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text};
    }
    .solved-count {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.text};
    }
`

export const TierAverageSolvedSecondsWrapper = styled.div<{tierGroup:TierGroupType}>`
    text-align: center;;
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 0.8rem;
    color: #fff;
    color: ${({ tierGroup }) => badgeTextColor[tierGroup]};
    background-color: ${({ tierGroup }) => badgeBackgroundColor[tierGroup]};
`;