import styled from "styled-components";

export const Container = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(5)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.bgTertiary : theme.colors.bgSecondary};
  border: 1px solid ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.primary : theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `box-shadow: 0 0 0 1px ${theme.colors.primary}30;`}

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    border-color: ${({ theme }) => theme.colors.primary}80;
  }
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
  font-family: monospace;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TierBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  border: 1px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  background: transparent;
`;

export const ProblemTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1.5)};
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const Tag = styled.span`
  padding: 2px 8px;
  font-size: 0.75rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;
