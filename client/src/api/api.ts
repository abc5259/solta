import { api } from "./axios";
import type {
  RecentSolvedResponse,
  TierGroupAverage,
  TierAverageMap,
  MemberProfileResponse,
  SolveTimeTrendsResponse,
  IndependentSolveTrendsResponse,
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

  async getTierGroupAverages(name: string): Promise<TierGroupAverage[]> {
    const response = await api.get<TierGroupAverage[]>(
      "/members/solveds/tier-group/average-time/search",
      {
        params: { name },
      }
    );
    return response.data;
  },

  async getTierAverages(name: string): Promise<TierAverageMap> {
    const response = await api.get<TierAverageMap>(
      "/members/solveds/tier/average-time/search",
      {
        params: { name },
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
    tierGroup: TierGroup
  ): Promise<IndependentSolveTrendsResponse> {
    const response = await api.get<IndependentSolveTrendsResponse>(
      `/members/${name}/independent-solve-trends`,
      {
        params: { period, tierGroup },
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
