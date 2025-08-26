# Baekjoon Solve Timer (Chrome Extension MV3)

- 문제 페이지 제목 옆에 "시간 측정 시작" 버튼이 생깁니다.
- 시작 후 제출 현황 페이지에서 최신 결과가 "맞았습니다!!"가 되면 자동으로 정지하고 알림을 띄웁니다.
- 알림에는 `[{티어} {대표태그}] {문제제목} - {소요시간}` 형식으로 표시됩니다.

## 설치 방법 (개발용)
1. 크롬에서 chrome://extensions 접속
2. 우상단 Developer mode 켜기
3. "Load unpacked" 클릭 → 본 디렉토리 선택

## 권한
- storage, notifications, activeTab, scripting
- hosts: https://www.acmicpc.net/*, https://solved.ac/*

## 참고
- solved.ac 비공식 문서: https://solvedac.github.io/unofficial-documentation/#/operations/getProblemById 