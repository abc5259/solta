import type { SolveType, Tier, TierGroup, SolvedPeriod } from "./types";

// Re-export for backward compatibility
export type { SolveType, Tier, TierGroup, SolvedPeriod };

export interface ProblemDetail {
  problemId: number;
  bojProblemId: number;
  title: string;
  tier: Tier;
  tags: string[];
}

export interface RecentSolvedResponse {
  solvedId: number;
  solveType: SolveType;
  solveTimeSeconds: number;
  problem: ProblemDetail;
  createdAt: string;
}

export interface TierGroupAverage {
  tierGroup: TierGroup;
  averageSolvedSeconds: number | null;
  solvedCount: number;
}

export interface TierAverage {
  tier: Tier;
  averageSolvedSeconds: number | null;
  solvedCount: number;
}

export type TierAverageMap = Record<TierGroup, TierAverage[]>;

export interface MemberProfileResponse {
  memberId: number;
  name: string;
  bojId: string;
  avatarUrl: string;
  solvedCount: number;
  totalSolvedTime: number;
  totalSolvedAverageTime: number;
}

export interface TrendPoint {
  date: string;
  averageSeconds: number;
  solvedCount: number;
}

export interface SolveTimeTrendsResponse {
  period: string;
  tierGroup: string;
  totalSolvedCount: number;
  trends: TrendPoint[];
}
