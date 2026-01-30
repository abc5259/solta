import { api } from "./axios";
import type {
  RecentSolvedResponse,
  TierGroupAverage,
  TierAverageMap,
  MemberProfileResponse,
} from "../types/api";

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
};
