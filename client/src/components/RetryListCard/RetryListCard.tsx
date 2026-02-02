import { useState } from "react";
import { RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { solvedQueryOptions } from "../../api/queries/solved";
import { SolvedItem } from "../SolvedItem/SolvedItem";
import * as Styled from "./RetryListCard.styled";

type SortOption = "LATEST" | "TIER" | "SOLVE_TIME";

interface RetryListCardProps {
  memberName: string;
}

export function RetryListCard({ memberName }: RetryListCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("LATEST");

  const { data: retryProblems = [], isLoading, refetch } = useQuery(
    solvedQueryOptions.retryProblems(memberName, sortBy)
  );

  const handleRefresh = () => {
    refetch();
  };

  const displayProblems = isExpanded ? retryProblems : retryProblems.slice(0, 5);

  if (isLoading) {
    return (
      <Styled.Container>
        <Styled.Header>
          <div>
            <Styled.Title>다시 도전하기</Styled.Title>
            <Styled.Subtitle>로딩 중...</Styled.Subtitle>
          </div>
          <Styled.IconWrapper onClick={handleRefresh}>
            <RotateCcw size={20} />
          </Styled.IconWrapper>
        </Styled.Header>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <div>
          <Styled.Title>다시 도전하기</Styled.Title>
          <Styled.Subtitle>풀이를 참고했던 {retryProblems.length}문제</Styled.Subtitle>
        </div>
        <Styled.IconWrapper onClick={handleRefresh}>
          <RotateCcw size={20} />
        </Styled.IconWrapper>
      </Styled.Header>

      {/* Sort Options */}
      <Styled.SortContainer>
        <Styled.SortButton
          type="button"
          active={sortBy === "LATEST"}
          onClick={() => setSortBy("LATEST")}
        >
          최신순
        </Styled.SortButton>
        <Styled.SortButton
          type="button"
          active={sortBy === "TIER"}
          onClick={() => setSortBy("TIER")}
        >
          난이도순
        </Styled.SortButton>
        <Styled.SortButton
          type="button"
          active={sortBy === "SOLVE_TIME"}
          onClick={() => setSortBy("SOLVE_TIME")}
        >
          풀이시간순
        </Styled.SortButton>
      </Styled.SortContainer>

      {/* Problem List */}
      <Styled.ProblemList>
        {displayProblems.length > 0 ? (
          displayProblems.map((solved) => (
            <SolvedItem
              key={solved.solvedId}
              solved={solved}
              showSolveType={false}
              showDate={false}
            />
          ))
        ) : (
          <Styled.EmptyState>
            <RotateCcw size={32} />
            <p>모든 문제를 스스로 풀었어요!</p>
          </Styled.EmptyState>
        )}
      </Styled.ProblemList>

      {/* Expand/Collapse Button */}
      {retryProblems.length > 5 && (
        <Styled.ExpandButton type="button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              접기
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              {retryProblems.length - 5}개 더 보기
            </>
          )}
        </Styled.ExpandButton>
      )}

      {/* Motivation */}
      {retryProblems.length > 0 && (
        <Styled.Motivation>
          다시 도전해서 SELF로 바꿔보세요!
        </Styled.Motivation>
      )}
    </Styled.Container>
  );
}
