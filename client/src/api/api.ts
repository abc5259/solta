import { api } from "./axios";
import type {
  RecentSolvedResponse,
  TierGroupAverage,
  TierAverageMap,
  MemberProfileResponse,
  SolveTimeTrendsResponse,
  IndependentSolveTrendsResponse,
  ProblemSearchResponse,
  ProblemDetailResponse,
  MemberSearchResponse,
  OAuthLoginResponse,
  AuthMeResponse,
} from "../types/api";
import type { SolvedPeriod, TierGroup } from "../types/types";

export const solvedApi = {
  async getRecentSolveds(name: string): Promise<RecentSolvedResponse[]> {
    const response = await api.get<RecentSolvedResponse[]>(
      "/members/solveds/search",
      {
        params: { name },
      }
    );
    return response.data;
  },

  async getTierGroupAverages(name: string, tagKey?: string): Promise<TierGroupAverage[]> {
    const response = await api.get<TierGroupAverage[]>(
      "/members/solveds/tier-group/average-time/search",
      {
        params: { name, tagKey },
      }
    );
    return response.data;
  },

  async getTierAverages(name: string, tagKey?: string): Promise<TierAverageMap> {
    const response = await api.get<TierAverageMap>(
      "/members/solveds/tier/average-time/search",
      {
        params: { name, tagKey },
      }
    );
    return response.data;
  },

  async getMemberProfile(name: string): Promise<MemberProfileResponse> {
    const response = await api.get<MemberProfileResponse>(
      "/members/profile",
      {
        params: { name },
      }
    );
    return response.data;
  },

  async getSolveTimeTrends(
    name: string,
    period: SolvedPeriod,
    tierGroup: TierGroup,
    tagKey?: string
  ): Promise<SolveTimeTrendsResponse> {
    const response = await api.get<SolveTimeTrendsResponse>(
      `/members/${name}/solve-time-trends`,
      {
        params: { period, tierGroup, tagKey },
      }
    );
    return response.data;
  },

  async getIndependentSolveTrends(
    name: string,
    period: SolvedPeriod,
    tierGroup: TierGroup,
    tagKey?: string
  ): Promise<IndependentSolveTrendsResponse> {
    const response = await api.get<IndependentSolveTrendsResponse>(
      `/members/${name}/independent-solve-trends`,
      {
        params: { period, tierGroup, tagKey },
      }
    );
    return response.data;
  },

  async getRetryProblems(
    name: string,
    sortType: "LATEST" | "TIER" | "SOLVE_TIME" = "LATEST"
  ): Promise<RecentSolvedResponse[]> {
    const response = await api.get<RecentSolvedResponse[]>(
      "/members/solveds/retry/search",
      {
        params: { name, sortType },
      }
    );
    return response.data;
  },
};

export const memberApi = {
  async searchMembers(query?: string): Promise<MemberSearchResponse> {
    const response = await api.get<MemberSearchResponse>(
      "/members/search",
      {
        params: { query: query || undefined },
      }
    );
    return response.data;
  },
};

export const authApi = {
  async getGithubLoginUrl(): Promise<OAuthLoginResponse> {
    const response = await api.get<OAuthLoginResponse>(
      "/auth/oauth/github/login",
      {
        params: { client: "WEB" },
      }
    );
    return response.data;
  },

  async getMe(): Promise<AuthMeResponse> {
    const response = await api.get<AuthMeResponse>("/members/me");
    return response.data;
  },
};

export const problemApi = {
  async searchProblems(
    query?: string,
    lastBojProblemId?: number | null
  ): Promise<ProblemSearchResponse> {
    const response = await api.get<ProblemSearchResponse>(
      "/problems/search",
      {
        params: {
          query: query || undefined,
          lastBojProblemId: lastBojProblemId ?? undefined,
        },
      }
    );
    return response.data;
  },

  async getProblemDetail(bojProblemId: number): Promise<ProblemDetailResponse> {
    const response = await api.get<ProblemDetailResponse>(
      `/problems/${bojProblemId}`
    );
    return response.data;
  },
};
