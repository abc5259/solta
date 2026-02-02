import styled from "styled-components";
import type { SolveType } from "../../types/types";

export const Container = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bgSecondary}80;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSecondary};
    transform: translateY(-1px);
  }
`;

export const TierBar = styled.div<{ color: string }>`
  width: 6px;
  height: 32px;
  border-radius: 3px;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

export const ProblemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProblemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const ProblemNumber = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
`;

export const ProblemTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProblemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
`;

export const TierText = styled.span<{ color: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ color }) => color};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    flex-shrink: 0;
  }
`;

export const DateText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SolveTypeBadge = styled.div<{ solveType: SolveType }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
  background: ${({ solveType }) =>
    solveType === "SELF"
      ? "rgba(34, 197, 94, 0.1)"
      : "rgba(249, 115, 22, 0.1)"};
  color: ${({ solveType }) =>
    solveType === "SELF"
      ? "rgb(34, 197, 94)"
      : "rgb(249, 115, 22)"};
`;

export const ExternalLinkIcon = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  ${Container}:hover & {
    opacity: 1;
  }
`;
