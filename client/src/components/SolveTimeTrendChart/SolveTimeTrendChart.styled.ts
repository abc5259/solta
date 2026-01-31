import styled from "styled-components";

export const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const ChartHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
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
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: 8px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active: boolean; activeColor?: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid
    ${({ active, activeColor, theme }) =>
      active
        ? activeColor || theme.colors.primary
        : "transparent"};
  background: ${({ active, activeColor }) =>
    active
      ? activeColor
        ? `${activeColor}20`
        : "#d1fae5"
      : "transparent"};
  color: ${({ active, activeColor, theme }) =>
    active
      ? activeColor || "#059669"
      : theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ active, activeColor, theme }) =>
      active
        ? activeColor
          ? `${activeColor}20`
          : "#d1fae5"
        : theme.colors.bgSecondary};
    color: ${({ active, activeColor, theme }) =>
      active
        ? activeColor || "#059669"
        : theme.colors.text};
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`;
