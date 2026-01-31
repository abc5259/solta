import styled from "styled-components";
import { TIER_GROUP_COLORS, hslToRgb } from "../constants/tierColors";

export const ProfileContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgSecondary};
`;

export const UserSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const UserIcon = styled.div`
  width: 72px;
  height: 72px;
  background: #9333ea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: 700;
  flex-shrink: 0;
`;

export const UserDetails = styled.div`
  flex: 1;
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const UserId = styled.h1`
  font-size: 1.875rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 700;
`;

export const UserStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const StatHighlight = styled.span`
  font-weight: 700;
  color: #9333ea;
`;

export const StatsCards = styled.div`
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing(4)} auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: relative;
`;

export const StatCardTitle = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const StatCardValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatCardIcon = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(5)};
  right: ${({ theme }) => theme.spacing(5)};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TabSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const TabHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderLight};
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active }) => (active ? "#9333ea" : "transparent")};
  color: ${({ active, theme }) => (active ? "#9333ea" : theme.colors.textSecondary)};
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: -2px;

  &:hover {
    color: ${({ active }) => (active ? "#9333ea" : "#000")};
  }
`;

export const TabContent = styled.div`
  min-height: 400px;
`;

export const TierStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

export const TierGroupSection = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const TierGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderLight};
`;

export const TierGroupBadge = styled.span<{ tier: string }>`
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  background: ${({ tier }) => {
    const tierUpper = tier.toUpperCase();
    const tierGroup = tierUpper as keyof typeof TIER_GROUP_COLORS;
    return tierGroup && TIER_GROUP_COLORS[tierGroup]
      ? hslToRgb(TIER_GROUP_COLORS[tierGroup])
      : "#6b7280";
  }};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TierGroupSummary = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

export const SubTierCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SubTierCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.bgSecondary} 0%, ${({ theme }) => theme.colors.bg} 100%);
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing(4)};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

export const SubTierLevel = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const SubTierInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const SubTierCount = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SubTierTime = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;
