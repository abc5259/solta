import { queryOptions } from '@tanstack/react-query';
import { solvedApi } from '../api';
import type { SolvedPeriod, TierGroup } from '../types/types';

export const solvedQueryKeys = {
	all: ['solved'] as const,
	profile: (name: string) =>
		[...solvedQueryKeys.all, 'profile', name] as const,
	recentSolveds: (name: string) =>
		[...solvedQueryKeys.all, 'recentSolveds', name] as const,
	tierGroupAverages: (name: string) =>
		[...solvedQueryKeys.all, 'tierGroupAverages', name] as const,
	tierAverages: (name: string) =>
		[...solvedQueryKeys.all, 'tierAverages', name] as const,
	solveTimeTrends: (name: string, period: SolvedPeriod, tierGroup: TierGroup) =>
		[...solvedQueryKeys.all, 'solveTimeTrends', name, period, tierGroup] as const,
};

export const solvedQueryOptions = {
	profile: (name: string) =>
		queryOptions({
			queryKey: solvedQueryKeys.profile(name),
			queryFn: () => solvedApi.getMemberProfile(name),
			enabled: !!name,
		}),
	recentSolveds: (name: string) =>
		queryOptions({
			queryKey: solvedQueryKeys.recentSolveds(name),
			queryFn: () => solvedApi.getRecentSolveds(name),
			enabled: !!name,
		}),
	tierGroupAverages: (name: string) =>
		queryOptions({
			queryKey: solvedQueryKeys.tierGroupAverages(name),
			queryFn: () => solvedApi.getTierGroupAverages(name),
			enabled: !!name,
		}),
	tierAverages: (name: string) =>
		queryOptions({
			queryKey: solvedQueryKeys.tierAverages(name),
			queryFn: () => solvedApi.getTierAverages(name),
			enabled: !!name,
		}),
	solveTimeTrends: (name: string, period: SolvedPeriod, tierGroup: TierGroup) =>
		queryOptions({
			queryKey: solvedQueryKeys.solveTimeTrends(name, period, tierGroup),
			queryFn: () => solvedApi.getSolveTimeTrends(name, period, tierGroup),
			enabled: !!name,
		}),
};
