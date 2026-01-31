// 공통 타입 정의

export type SolveType = "SELF" | "SOLUTION";

export type Tier =
  | "B5" | "B4" | "B3" | "B2" | "B1"
  | "S5" | "S4" | "S3" | "S2" | "S1"
  | "G5" | "G4" | "G3" | "G2" | "G1"
  | "P5" | "P4" | "P3" | "P2" | "P1"
  | "D5" | "D4" | "D3" | "D2" | "D1"
  | "R5" | "R4" | "R3" | "R2" | "R1";

export type TierGroup = "NONE" | "UNRATED" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND" | "RUBY";

export type SolvedPeriod = "WEEK" | "MONTH" | "MONTH_3" | "MONTH_6" | "ALL";
