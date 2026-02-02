import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const IconWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 8px;
  background: rgba(147, 51, 234, 0.1);
  color: #9333ea;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(147, 51, 234, 0.15);
    transform: rotate(180deg);
  }

  &:active {
    transform: rotate(180deg) scale(0.95);
  }
`;

export const SortContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const SortButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active, theme }) =>
    active ? theme.colors.bg : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.text : theme.colors.textSecondary};
  box-shadow: ${({ active, theme }) =>
    active ? theme.shadows.sm : "none"};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)} 0;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    opacity: 0.5;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
    font-size: 0.875rem;
    margin: 0;
  }
`;

export const ExpandButton = styled.button`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(3)};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Motivation = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
