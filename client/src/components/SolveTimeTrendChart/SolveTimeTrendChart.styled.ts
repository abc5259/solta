import styled from "styled-components";

export const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChartTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const ChartSubtitle = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const IconWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const CurrentRatio = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const RatioValue = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RatioLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ChangeBadge = styled.div<{ change: number }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ change, theme }) => {
    if (change < 0) return 'rgba(76, 175, 80, 0.15)';
    if (change > 0) return 'rgba(239, 83, 80, 0.15)';
    return theme.colors.primaryLight;
  }};
  color: ${({ change, theme }) => {
    if (change < 0) return theme.colors.success;
    if (change > 0) return theme.colors.error;
    return theme.colors.textSecondary;
  }};
`;

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const LoadingState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active: boolean; activeColor?: string }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ active, activeColor, theme }) =>
    active ? (activeColor || theme.colors.primary) : "transparent"};
  background: ${({ active, theme }) =>
    active ? theme.colors.bgSecondary : "transparent"};
  color: ${({ active, activeColor, theme }) =>
    active
      ? activeColor || theme.colors.primary
      : theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.bgSecondary : theme.colors.bgTertiary};
    color: ${({ active, activeColor, theme }) =>
      active
        ? activeColor || theme.colors.primary
        : theme.colors.text};
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 240px;
`;

export const InsightBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InsightText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
