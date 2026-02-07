import styled from "styled-components";
import { TIER_GROUP_COLORS, hslToRgb } from "../constants/tierColors";

export const ProfileContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

export const UserSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
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
  background: ${({ theme }) => theme.colors.primary};
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
  color: ${({ theme }) => theme.colors.primary};
`;

export const StatsCards = styled.div`
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing(4)} auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
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

export const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const TabSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const TabHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const FullWidthSection = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const PlaceholderCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TierStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

export const TierGroupSection = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.borderLight};
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
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing(4)};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.borderLight};
    background: ${({ theme }) => theme.colors.bgTertiary};
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

// Problem Detail Drawer
export const DrawerOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.25s ease;
`;

export const DrawerPanel = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 201;
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DrawerTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DrawerClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const DrawerLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;
