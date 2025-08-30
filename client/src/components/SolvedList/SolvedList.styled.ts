import styled from "styled-components";

export const SolvedsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const SolvedsTableHeader = styled.thead`
  color: #000;
`;

export const SolvedsTableBody = styled.tbody`
  color: #000;
`;

export const TableHeader = styled.th<{ width?: string }>`
  padding: 10px 0;
  text-align: center;
  width: ${({ width }) => width || "auto"};
`;

export const TableRow = styled.tr`
  border-top: 1px solid #dddfe0;
  border-bottom: 1px solid #dddfe0;
  text-align: center;
  font-size: 0.9rem;
  .problem {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 5px;
  }
  .solveType {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
`;

export const TableData = styled.td<{
  width?: string;
  align?: "left" | "center" | "right";
}>`
  padding: 8px 0;
  text-align: ${({ align }) => align || "center"};
  width: ${({ width }) => width || "auto"};
`;

export const AverageTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  .solve-time {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .avg-time {
    font-size: 0.75rem;
    line-height: 1rem;
    color: #6b7280;
  }
  .time-result {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    .fast {
      color: #16a34a; /* 다크 모드 색상 */
    }
    .slow {
      color: #dc2626;
    }
  }
`;
/**
 * <div className="text-center space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-sm text-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{solve.timeSpent}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">평균: {solve.avgTime}</div>
                    <div className={`text-xs font-medium ${
                      solve.comparison.includes('빠름') 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {solve.comparison}
                    </div>
                  </div>
 */
