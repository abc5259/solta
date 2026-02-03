import styled from "styled-components";
import type { TierGroupType } from "./TierGroupCard";

const badgeBackgroundColor: Record<TierGroupType, string> = {
  BRONZE: 'rgba(205, 127, 50, 0.15)',
  SILVER: 'rgba(192, 192, 192, 0.15)',
  GOLD: 'rgba(255, 215, 0, 0.15)',
  PLATINUM: 'rgba(229, 228, 226, 0.15)',
  DIAMOND: 'rgba(185, 242, 255, 0.15)',
  RUBY: 'rgba(255, 0, 110, 0.15)',
  UNRANKED: 'rgba(91, 159, 237, 0.15)',
};

const badgeTextColor: Record<TierGroupType, string> = {
  BRONZE: '#E8A76F',
  SILVER: '#D1D1D1',
  GOLD: '#FFE066',
  PLATINUM: '#E5E4E2',
  DIAMOND: '#B9F2FF',
  RUBY: '#FF6BA8',
  UNRANKED: '#5B9FED',
};


export const TierGroupCardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(4)};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.bgSecondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.bgTertiary};
        border-color: ${({ theme }) => theme.colors.borderLight};
    }
`;

export const TierTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    .tier-group {
        font-weight: 600;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.text};
    }
    .solved-count {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`

export const TierAverageSolvedSecondsWrapper = styled.div<{tierGroup:TierGroupType}>`
    text-align: center;
    padding: 6px 12px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ tierGroup }) => badgeTextColor[tierGroup]};
    background-color: ${({ tierGroup }) => badgeBackgroundColor[tierGroup]};
`;