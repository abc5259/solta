import styled from "styled-components";
import { TIER_GROUP_COLORS, getTierGroupFromTier, hslToRgb } from "../../constants/tierColors";

export const TierWrapper = styled.div<{ tier: string }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff;
  background-color: ${({ tier }) => {
    const tierGroup = getTierGroupFromTier(tier);
    return hslToRgb(TIER_GROUP_COLORS[tierGroup]);
  }};
`;
