import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
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

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const ChartTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StatLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ChangeBadge = styled.div<{ change: number; isPositiveGood?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ change, isPositiveGood = false, theme }) => {
    const isGood = isPositiveGood ? change > 0 : change < 0;
    const isBad = isPositiveGood ? change < 0 : change > 0;
    if (isGood) return 'rgba(76, 175, 80, 0.15)';
    if (isBad) return 'rgba(239, 83, 80, 0.15)';
    return theme.colors.primaryLight;
  }};
  color: ${({ change, isPositiveGood = false, theme }) => {
    const isGood = isPositiveGood ? change > 0 : change < 0;
    const isBad = isPositiveGood ? change < 0 : change > 0;
    if (isGood) return theme.colors.success;
    if (isBad) return theme.colors.error;
    return theme.colors.textSecondary;
  }};
`;
