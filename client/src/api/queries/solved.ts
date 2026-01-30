import { queryOptions } from '@tanstack/react-query';
import { solvedApi } from '../api';

export const solvedQueryKeys = {
	all: ['solved'] as const,
	recentSolveds: (name: string) =>
		[...solvedQueryKeys.all, 'recentSolveds', name] as const,
	tierGroupAverages: (name: string) =>
		[...solvedQueryKeys.all, 'tierGroupAverages', name] as const,
	tierAverages: (name: string) =>
		[...solvedQueryKeys.all, 'tierAverages', name] as const,
};

export const solvedQueryOptions = {
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
};
