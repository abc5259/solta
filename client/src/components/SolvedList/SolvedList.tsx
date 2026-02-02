import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as Styled from "./SolvedList.styled";
import { SolvedItem } from "../SolvedItem/SolvedItem";
import type { RecentSolvedResponse } from "../../types/api";

type SolvedListProps = {
  solveds: RecentSolvedResponse[];
};

export function SolvedList({ solveds }: SolvedListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayProblems = isExpanded ? solveds : solveds.slice(0, 10);

  return (
    <div>
      <Styled.SolvedCardsContainer>
        {displayProblems.map(solved => (
          <SolvedItem
            key={solved.solvedId}
            solved={solved}
            showSolveType={true}
            showDate={true}
          />
        ))}
      </Styled.SolvedCardsContainer>

      {solveds.length > 10 && (
        <Styled.ExpandButton type="button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              접기
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              {solveds.length - 10}개 더 보기
            </>
          )}
        </Styled.ExpandButton>
      )}
    </div>
  );
}
