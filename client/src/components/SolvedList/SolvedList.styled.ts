import styled from "styled-components";

export const SolvedCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const SolvedCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: ${({ theme }) => theme.spacing(4)};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const LeftSection = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProblemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const ProblemTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

export const ProblemMeta = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const SolveTime = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const StatusBadge = styled.span<{ solveType: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #d1fae5;
  color: #059669;
  white-space: nowrap;
`;
