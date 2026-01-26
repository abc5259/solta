import * as Styled from "./SolvedList.styled";
import { Tier } from "../Tier/Tier";

type Solved = {
  solvedId: number;
  solveType: string;
  solveTimeSeconds: number;
  problem: {
    problemId: number;
    bojProblemId: number;
    title: string;
    tier: string;
    tags?: string[];
  };
  averageTime: number;
  createdAt?: string;
};

type SolvedListProps = {
  solveds: Solved[];
};

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function SolvedList({ solveds }: SolvedListProps) {
  return (
    <Styled.SolvedCardsContainer>
      {solveds.map(solved => (
        <Styled.SolvedCard key={solved.solvedId}>
          <Styled.CardContent>
            <Styled.LeftSection>
              <Styled.ProblemHeader>
                <Tier tier={solved.problem.tier} />
                <Styled.ProblemTitle>
                  {solved.problem.bojProblemId}. {solved.problem.title}
                </Styled.ProblemTitle>
              </Styled.ProblemHeader>
              <Styled.ProblemMeta>
                {solved.problem.tags && solved.problem.tags.length > 0 && (
                  <>
                    {solved.problem.tags.join(" • ")}
                    {solved.createdAt && " • "}
                  </>
                )}
                {solved.createdAt && formatDate(solved.createdAt)}
              </Styled.ProblemMeta>
            </Styled.LeftSection>
            <Styled.RightSection>
              <Styled.SolveTime>{formatTime(solved.solveTimeSeconds)}</Styled.SolveTime>
              <Styled.BadgeGroup>
                <Styled.StatusBadge solveType={solved.solveType}>
                  {solved.solveType === "SELF" ? "스스로" : "답지 참고"}
                </Styled.StatusBadge>
                <Styled.StatusBadge solveType="SUCCESS">성공</Styled.StatusBadge>
              </Styled.BadgeGroup>
            </Styled.RightSection>
          </Styled.CardContent>
        </Styled.SolvedCard>
      ))}
    </Styled.SolvedCardsContainer>
  );
}
