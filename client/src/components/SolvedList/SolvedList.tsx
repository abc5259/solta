import { BookOpen, CheckCircle, Clock } from "lucide-react";
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
  };
  averageTime: number;
};

type SolvedListProps = {
  solveds: Solved[];
};

function formatSeconds(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}시간 ${m}분 ${s}초`;
  }
  if (m > 0) {
    return `${m}분 ${s}초`;
  }
  return `${s}초`;
}

export function SolvedList({ solveds }: SolvedListProps) {
  return (
    <Styled.SolvedsTable>
      <Styled.SolvedsTableHeader>
        <tr>
          <Styled.TableHeader width="15%">#</Styled.TableHeader>
          <Styled.TableHeader>제목</Styled.TableHeader>
          <Styled.TableHeader width="15%">풀이 방식</Styled.TableHeader>
          <Styled.TableHeader width="15%">평균 풀이 시간</Styled.TableHeader>
        </tr>
      </Styled.SolvedsTableHeader>
      <Styled.SolvedsTableBody>
        {solveds.map(solved => (
          <Styled.TableRow key={solved.solvedId}>
            <Styled.TableData>
              <div className="problem">
                <Tier tier={solved.problem.tier} />
                <span>{solved.problem.bojProblemId}</span>
              </div>
            </Styled.TableData>
            <Styled.TableData align="left">
              {solved.problem.title}
            </Styled.TableData>
            <Styled.TableData>
              <div className="solveType">
                {solved.solveType === "SELF" ? (
                  <CheckCircle height={"1rem"} width={"1rem"} color="#16a34a" />
                ) : (
                  <BookOpen height={"1rem"} width={"1rem"} color="#dc2626" />
                )}
                <span>
                  {solved.solveType === "SELF" ? "스스로 풀이" : "답지 참고"}
                </span>
              </div>
            </Styled.TableData>
            <Styled.TableData>
              <Styled.AverageTime>
                <div className="solve-time">
                  <Clock size={13} />
                  <span>{formatSeconds(solved.solveTimeSeconds)}</span>
                </div>
                <div className="avg-time">
                  <span>평균: {formatSeconds(solved.averageTime)}</span>
                </div>
                <div className="time-result">
                  {solved.solveTimeSeconds <= solved.averageTime ? (
                    <span className="fast">
                      {formatSeconds(
                        solved.averageTime - solved.solveTimeSeconds
                      )}{" "}
                      빠름
                    </span>
                  ) : (
                    <span className="slow">
                      {formatSeconds(
                        solved.solveTimeSeconds - solved.averageTime
                      )}{" "}
                      느림
                    </span>
                  )}
                </div>
              </Styled.AverageTime>
            </Styled.TableData>
          </Styled.TableRow>
        ))}
      </Styled.SolvedsTableBody>
    </Styled.SolvedsTable>
  );
}
