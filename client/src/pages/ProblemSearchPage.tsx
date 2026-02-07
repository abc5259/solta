import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Search, ArrowLeft } from "lucide-react";
import { problemApi } from "../api/api";
import { ProblemCard } from "../components/ProblemCard/ProblemCard";
import { ProblemDetailPanel } from "../components/ProblemDetailPanel/ProblemDetailPanel";
import type { ProblemSearchItem } from "../types/api";
import * as Styled from "./ProblemSearchPage.styled";

export default function ProblemSearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<ProblemSearchItem | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedProblem(null);
  }, [debouncedQuery]);

  // Infinite scroll query for problem list
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["problemSearch", debouncedQuery],
    queryFn: ({ pageParam }) =>
      problemApi.searchProblems(
        debouncedQuery || undefined,
        pageParam ?? undefined
      ),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextLastBojProblemId : undefined,
  });

  // Problem detail query
  const { data: detail, isLoading: isDetailLoading } = useQuery({
    queryKey: ["problemDetail", selectedProblem?.bojProblemId],
    queryFn: () => problemApi.getProblemDetail(selectedProblem!.bojProblemId),
    enabled: !!selectedProblem,
  });

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: listRef.current,
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allProblems = data?.pages.flatMap((page) => page.problems) ?? [];
  const totalCount = allProblems.length;

  return (
    <Styled.PageContainer>
      {/* Search Header */}
      <Styled.SearchHeader>
        <Styled.SearchHeaderContent>
          <Styled.BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Styled.BackButton>
          <Styled.SearchInputWrapper>
            <Styled.SearchIcon>
              <Search size={18} />
            </Styled.SearchIcon>
            <Styled.SearchInput
              type="text"
              placeholder="문제 번호로 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </Styled.SearchInputWrapper>
        </Styled.SearchHeaderContent>
      </Styled.SearchHeader>

      {/* Content */}
      <Styled.ContentArea>
        {/* Left: Problem List */}
        <Styled.ListSection>
          {!isLoading && (
            <Styled.ResultCount>
              {debouncedQuery
                ? `"${debouncedQuery}" 검색 결과 ${totalCount}개${hasNextPage ? "+" : ""} 문제`
                : `전체 ${totalCount}개${hasNextPage ? "+" : ""} 문제`}
            </Styled.ResultCount>
          )}

          <Styled.ProblemList ref={listRef}>
            {isLoading ? (
              <Styled.LoadingSpinner>문제를 불러오는 중...</Styled.LoadingSpinner>
            ) : allProblems.length === 0 ? (
              <Styled.EmptyState>
                <Search size={40} />
                <p>검색 결과가 없습니다</p>
              </Styled.EmptyState>
            ) : (
              <Styled.ProblemListInner>
                {allProblems.map((problem) => (
                  <ProblemCard
                    key={problem.problemId}
                    problem={problem}
                    isSelected={selectedProblem?.problemId === problem.problemId}
                    onClick={() => setSelectedProblem(problem)}
                  />
                ))}
                <div ref={observerRef}>
                  {isFetchingNextPage && (
                    <Styled.LoadMoreTrigger>더 불러오는 중...</Styled.LoadMoreTrigger>
                  )}
                </div>
              </Styled.ProblemListInner>
            )}
          </Styled.ProblemList>
        </Styled.ListSection>

        {/* Right: Detail Panel */}
        <Styled.DetailSection>
          {selectedProblem ? (
            isDetailLoading ? (
              <Styled.DetailLoading>불러오는 중...</Styled.DetailLoading>
            ) : detail ? (
              <ProblemDetailPanel detail={detail} />
            ) : null
          ) : (
            <Styled.DetailPlaceholder>
              <Styled.DetailPlaceholderIcon>
                <Search size={48} />
              </Styled.DetailPlaceholderIcon>
              <p>문제를 선택하면 상세 정보가 표시됩니다</p>
            </Styled.DetailPlaceholder>
          )}
        </Styled.DetailSection>
      </Styled.ContentArea>
    </Styled.PageContainer>
  );
}
