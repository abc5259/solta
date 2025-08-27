# Baekjoon Solve Timer

백준 문제 풀이 시간을 측정하고 Solta에 기록하는 Chrome 확장 프로그램입니다.

## 주요 기능

### 🕐 시간 측정
- 백준 문제 페이지에서 "시간 측정 시작" 버튼을 클릭하여 풀이 시간 측정 시작
- 실시간으로 경과 시간 표시
- 문제 풀이 완료 시 자동으로 타이머 중지

### 🎉 문제 풀이 완료 모달
- 문제를 맞았을 때 알림 대신 아름다운 모달 표시
- 풀이 시간, 문제 제목, 난이도, 태그 정보 표시
- solved.ac API를 통한 문제 메타데이터 자동 가져오기

### 💾 Solta 서버 연동
- 문제 풀이 기록을 Solta 서버에 자동 저장
- 사용자 설정을 통한 서버 URL 및 백준 사용자 ID 관리
- RESTful API를 통한 안전한 데이터 전송

## 설치 및 설정

### 1. 확장 프로그램 설치
1. Chrome에서 `chrome://extensions/` 접속
2. "개발자 모드" 활성화
3. "압축해제된 확장 프로그램을 로드합니다" 클릭
4. `extension` 폴더 선택

### 2. 설정
1. 확장 프로그램 아이콘 클릭
2. Solta 서버 URL 입력 (예: `http://localhost:8080`)
3. 백준 사용자 ID 입력
4. "설정 저장" 클릭

## 사용법

### 기본 사용법
1. **백준 문제 페이지**에서 "시간 측정 시작" 버튼 클릭
2. 문제를 풀고 제출
3. **맞았을 때** 자동으로 모달이 나타남
4. "저장하기" 클릭하여 Solta에 기록 저장

### 고급 기능
- **문제 페이지**: 시간 측정 시작/중지
- **제출 결과 페이지**: 자동으로 풀이 완료 감지
- **설정 팝업**: 서버 URL 및 사용자 ID 관리

## 서버 API 형식

### POST /api/solveds
```json
{
  "bojId": "사용자_백준_ID",
  "bojProblemId": 1000,
  "solveTimeSeconds": 1800
}
```

## 기술 스택

- **Frontend**: Vanilla JavaScript, CSS3
- **Chrome Extension**: Manifest V3
- **API**: solved.ac unofficial API, Solta REST API
- **Storage**: Chrome Storage API

## 파일 구조

```
extension/
├── manifest.json          # 확장 프로그램 설정
├── background.js          # 백그라운드 서비스 워커
├── content_problem.js     # 문제 페이지 스크립트
├── content_status.js      # 제출 결과 페이지 스크립트
├── popup.html            # 설정 팝업 UI
├── popup.js              # 설정 팝업 로직
├── images/               # 아이콘 이미지들
└── README.md             # 이 파일
```

## 개발자 정보

- **버전**: 1.0
- **지원 브라우저**: Chrome 88+
- **라이선스**: MIT

## 문제 해결

### 일반적인 문제들
1. **모달이 나타나지 않음**: 백준 로그인 상태 확인
2. **서버 연결 실패**: 서버 URL 및 네트워크 상태 확인
3. **사용자 ID 오류**: 백준 사용자 ID 정확성 확인

### 디버깅
- Chrome 개발자 도구의 Console 탭에서 오류 메시지 확인
- Network 탭에서 API 호출 상태 확인
- 확장 프로그램의 Storage 탭에서 설정값 확인

## 업데이트 내역

### v1.0 (현재)
- ✅ 시간 측정 기능
- ✅ 문제 풀이 완료 모달
- ✅ Solta 서버 연동
- ✅ 사용자 설정 관리
- ✅ solved.ac 메타데이터 연동

## 기여하기

버그 리포트나 기능 제안은 이슈로 등록해주세요.
Pull Request도 환영합니다!

---

**즐거운 코딩 되세요! 🚀** 