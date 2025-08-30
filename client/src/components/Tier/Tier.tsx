import * as Styled from "./Tier.styled";

export const TierType = {
  UNRANKED: "UNRANKED",
  B5: "B5",
  B4: "B4",
  B3: "B3",
  B2: "B2",
  B1: "B1",
  S5: "S5",
  S4: "S4",
  S3: "S3",
  S2: "S2",
  S1: "S1",
  G5: "G5",
  G4: "G4",
  G3: "G3",
  G2: "G2",
  G1: "G1",
  P5: "P5",
  P4: "P4",
  P3: "P3",
  P2: "P2",
  P1: "P1",
  D5: "D5",
  D4: "D4",
  D3: "D3",
  D2: "D2",
  D1: "D1",
  R5: "R5",
  R4: "R4",
  R3: "R3",
  R2: "R2",
  R1: "R1",
} as const;

type TierProps = {
  tier: string;
};

export function Tier({ tier }: TierProps) {
  return <Styled.TierWrapper tier={tier}>{tier}</Styled.TierWrapper>;
}
