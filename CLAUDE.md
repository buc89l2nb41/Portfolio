# Portfolio — 작업 안내

정적 GitHub Pages 사이트입니다. 빌드 도구는 없습니다.
라이브: https://buc89l2nb41.github.io/Portfolio/

## 먼저 읽을 것
- 이 폴더에 `*_HANDOFF.md`가 있으면 먼저 읽습니다 (작업 맥락, 프로젝트별 재개편 브리프).
  `.gitignore` 대상이라 로컬에만 있습니다. 내용을 공개 파일로 옮기지 않습니다.

## 미리 보기
- `file://`로 열면 스크립트가 안 돌 수 있습니다. 로컬 서버로 엽니다.
  `.claude/launch.json`의 `portfolio` 설정 = `python -m http.server 8765` → http://localhost:8765

## 구조
- `index.html` — 뼈대 (별자리 SVG, 옆 목록, 위 내비). `<title>`도 여기에 있습니다.
  스크립트·CSS 뒤 `?v=` 값은 그 파일을 고칠 때마다 올립니다.
- `projects.js` — 문구 데이터만 있습니다.
  - `window.profile`: `name`, `role`, `headline`, `intro`, `github`, `email`. `null`인 칸은 첫 화면에 안 나옵니다.
  - `window.projects`: 작업 목록.
    - 별 작업: `problem`(문제) / `did[]`(한 일) / `result`(결과·한계) / `stack` / `repo` / `demo` / `youtube` / `images`
    - 기타 작업: `summary`(한두 문장) / `stack` / `repo` / `demo`
    - 선택: `short`(별자리 그림 위 짧은 이름), `game: true`(데모 버튼이 "플레이"), `links: [{label, href}]`(GitHub 링크 여러 개)
    - `hidden: true`면 사이트에 안 나옵니다. `repo`가 없는 항목도 안 나옵니다.
- `sky.js` — 화면을 그립니다.
  - `starTitles`: 별 8개의 차례 (지금: Prompt Editor → Prompt Asset Forge → Low Poly Cultivar → GrowRoll → Godot NNUE Prompt Chess → SpriteGen → GGPO Webgame → 기타). 좌표는 `dipper`, 그림 위 이름 자리는 `nameLabels`. 별을 늘리거나 줄이면 세 배열의 길이를 같이 맞춥니다.
  - `otherGroups`: "기타" 별 안의 묶음 (배포한 AI 서비스 / 브라우저 자동화 연습). `OTHER_LEAD`가 그 별의 첫 문장.
  - 첫 화면은 `window.profile`로 그립니다.
  - 미디어: `youtube`가 있으면 영상 썸네일만, 없으면 `images`를 넘겨 보기로 보여 줍니다.
  - 문구 속 다른 작업 이름은 자동으로 그 별로 가는 링크가 됩니다.
- `sky.css` — 스타일. 맨 뒤 "재개편" 블록이 문제/한 일/결과와 2단 레이아웃(글 왼쪽, 영상·사진 오른쪽, 1100px 이하에서 한 단)입니다.
- `assets/` — 실제 스크린샷만 둡니다 (`prompteditor/`, `lowpoly/`, `growroll/`).

## 자동 검사와 배포
- `.github/workflows/pages.yml`: main push → `check` job(`node scripts/check-site.mjs`) → 통과하면 `deploy` job이 `index.html`, `projects.js`, `sky.js`, `sky.css`, `assets/`만 Pages에 올립니다. PR은 검사만.
- 사이트에 새 파일을 추가하면 workflow의 `Collect site files` 단계의 `cp` 목록에도 넣어야 배포됩니다.
- `scripts/check-site.mjs`: JS 문법, 금지어(예전 mock 그림 폴더 경로 + Secret `FORBIDDEN_WORDS`), 이미지·`index.html` 경로, hidden 아닌 작업의 repo 유무. 고친 뒤 커밋 전에 로컬에서 한 번 돌립니다.
- 금지할 단어(회사 이름 등)는 코드에 적지 않고 레포 Secret `FORBIDDEN_WORDS`(쉼표 구분)에만 둡니다.
- Pages Source는 "GitHub Actions"여야 합니다 (레포 Settings, 사람이 직접 바꿈).

## 숨긴 작업 (`hidden: true`)
FBNeo Agent, AgentPlay, ModelToSprite, Cadillacs Capture, DiffusionGen (레포 비공개 → `repo: null`), Pocketbase Board (공개지만 목적과 무관).

## 규칙
- 문구는 쉬운 존댓말("~합니다"). 수치는 실제로 잰 것만. 과장 금지. 한계는 결과 칸에 1~2문장.
- HANDOFF에 나오는 회사·공고 정보와 참고용 다른 사람 포트폴리오 URL은 공개 파일(README, 사이트, 커밋 메시지)에 넣지 않습니다.
- mock 이미지나 자리표시 영상 ID를 다시 넣지 않습니다. 증거가 없으면 글만 둡니다.
- 레포가 비공개인 프로젝트는 링크를 걸지 않습니다 (`hidden: true`, `repo: null`).
- `resume/`, `*_HANDOFF.md`, `Video/`는 커밋하지 않습니다.
- 별 순서나 묶음을 바꾸면 `README.md`의 표도 같이 고칩니다.
