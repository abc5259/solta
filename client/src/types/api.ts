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
  independentSolvedCount: number;
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

export interface IndependentRatioPoint {
  date: string;
  independentCount: number;
  totalCount: number;
}

export interface IndependentSolveTrendsResponse {
  period: string;
  tierGroup: string;
  totalIndependentCount: number;
  totalTotalCount: number;
  trends: IndependentRatioPoint[];
}

// 문제 검색 관련 타입
export interface ProblemSearchItem {
  problemId: number;
  bojProblemId: number;
  title: string;
  tier: Tier;
  tags: string[];
}

export interface ProblemSearchResponse {
  problems: ProblemSearchItem[];
  nextLastBojProblemId: number | null;
  hasNext: boolean;
}

export interface ProblemDetailResponse {
  problemId: number;
  bojProblemId: number;
  title: string;
  tier: Tier;
  tags: string[];
  totalSolvedCount: number;
  independentSolvedCount: number;
  averageSolveTimeSeconds: number | null;
  shortestSolveTimeSeconds: number | null;
}

// 사용자 검색 관련 타입
export interface MemberSearchItem {
  memberId: number;
  name: string;
  avatarUrl: string;
}

export interface MemberSearchResponse {
  members: MemberSearchItem[];
  nextLastMemberId: number | null;
  hasNext: boolean;
}

// Auth 관련 타입
export interface OAuthLoginResponse {
  url: string;
}

export interface AuthMeResponse {
  id: number;
  name: string;
  githubId: string;
  bojId: string;
  avatarUrl: string;
}
