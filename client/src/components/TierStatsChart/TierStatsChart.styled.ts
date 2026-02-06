import styled from "styled-components";

export const ChartContainer = styled.div`
  /* Background removed - handled by parent container */
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
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RatioLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
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

export const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const TierSelector = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

export const TierButton = styled.button<{ active: boolean; tierColor: string }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ active, tierColor }) =>
    active ? tierColor : "transparent"};
  background: ${({ active, theme }) =>
    active ? theme.colors.bgSecondary : "transparent"};
  color: ${({ active, tierColor, theme }) =>
    active ? tierColor : theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.bgSecondary : theme.colors.bgTertiary};
    color: ${({ active, tierColor, theme }) =>
      active ? tierColor : theme.colors.text};
  }
`;

export const TagSelector = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

export const TagButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  background: ${({ active, theme }) =>
    active ? theme.colors.bgSecondary : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.bgSecondary : theme.colors.bgTertiary};
    color: ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.text};
  }
`;
