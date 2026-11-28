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
- `index.html` — 첫 화면 뼈대. `<title>`도 여기에 있습니다. `work.html` — 케이스 스터디 한 개(`work.html?p=<slug>`).
  두 파일 모두 스크립트·CSS 뒤 `?v=` 값을 그 파일을 고칠 때마다 올립니다.
- `projects.js` — 문구 데이터만 있습니다.
  - `window.profile`: `name`, `role`, `headline`, `intro`, `github`, `email`. `null`인 칸은 화면에 안 나옵니다.
  - `window.projects`: 작업 목록.
    - 주요 작업: `problem`(BACKGROUND) / `did[]`(APPROACH) / `result`(RESULT·한계) / `stack` / `repo` / `demo` / `youtube` / `images`
    - 케이스 스터디 칸: `slug`, `category`, `since`(레포를 만든 달), `platform`, `oneLine`, `metrics[{value,label,note}]`(실제로 잰 숫자만, `A→B`는 전후로 그림), `didTitles[]`(did와 개수 같게)
    - 기타 작업: `summary`(한두 문장) / `stack` / `repo` / `demo`
    - 선택: `short`(짧은 이름, 지금은 안 씀), `game: true`(버튼이 "플레이"), `links: [{label, href}]`(GitHub 링크 여러 개)
    - `hidden: true`면 사이트에 안 나옵니다. `repo`가 없는 항목도 안 나옵니다.
- `site.js` — 두 페이지를 그립니다 (`body[data-page]`가 `home`/`work`).
  - `ORDER`: 주요 작업 차례 (지금: Claude로 만든 StepCut → Beat Mapper → Deck Lab이 먼저, 그 뒤 Prompt Editor → Prompt Asset Forge → Low Poly Cultivar → GrowRoll → Godot NNUE Prompt Chess → SpriteGen → GGPO Webgame).
  - `OTHER_GROUPS`: Others 구역의 묶음 (배포한 AI 서비스 / 브라우저 자동화 연습). `OTHER_LEAD`가 그 구역의 첫 문장.
  - 첫 화면 순서: 히어로 → Selected Works(작업마다 같은 틀: 번호·분류·연도 → 제목 → 한 줄 → 숫자 → 버튼 → 큰 화면 + 썸네일) → Others → Contact.
  - 케이스 스터디 순서: 메타줄 → 제목·한 줄·스택·버튼 → 대표 화면 → Role/Since/Platform/Repo → Background → Approach(Point 카드) → Result(큰 숫자 + 결과 문단) → Gallery → Next Case.
  - 미디어: `youtube`가 있으면 영상을 먼저(첫 화면에서는 썸네일을 누르면 재생), 그 뒤에 `images`.
  - 문구 속 다른 작업 이름은 자동으로 그 케이스 스터디(기타 작업은 Others)로 가는 링크가 됩니다.
- `site.css` — 스타일. 종이색/먹색 두 톤 + 강조색(`--accent`) 하나. 제목 Inter Tight, 본문 Pretendard, 라벨 JetBrains Mono. 1100px 이하에서 한 단, 720px 이하에서 위 메뉴를 숨깁니다.
- `assets/` — 실제 스크린샷만 둡니다 (`prompteditor/`, `stepcut/`, `lowpoly/`, `growroll/`, `chess/`, `spritegen/`, `ggpo/`, `beatmapper/`, `decklab/`).

## 자동 검사와 배포
- `.github/workflows/pages.yml`: main push → `check` job(`node scripts/check-site.mjs`) → 통과하면 `deploy` job이 `index.html`, `work.html`, `projects.js`, `site.js`, `site.css`, `assets/`만 Pages에 올립니다. PR은 검사만.
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
- 작업 순서나 묶음을 바꾸면 `README.md`의 표도 같이 고칩니다.
- 레이아웃 참고 메모는 `reference/`(로컬 전용, `.git/info/exclude`)에 있습니다. 그 안의 내용은 공개 파일에 옮기지 않습니다.
