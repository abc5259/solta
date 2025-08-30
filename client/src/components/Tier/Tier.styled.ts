import styled from "styled-components";
import { theme } from "../../styles/theme";

const tierColorMap: Record<string, string> = {
  B: theme.colors.tier.bronze,
  S: theme.colors.tier.silver,
  G: theme.colors.tier.gold,
  P: theme.colors.tier.platinum,
  D: theme.colors.tier.diamond,
  R: theme.colors.tier.ruby,
};

export const TierWrapper = styled.div<{ tier: string }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff;
  background-color: ${({ tier }) => tierColorMap[tier[0]] || "#999"};
`;
