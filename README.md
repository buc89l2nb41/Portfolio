# Portfolio

AI에게 에디터 작업과 에셋 제작을 맡기는 도구를 만듭니다.
AI가 손댈 곳은 도구로 열어 두고, 결과는 엔진 규칙이나 사람의 확인을 한 번 거치게 합니다.

**사이트:** [https://buc89l2nb41.github.io/Portfolio/](https://buc89l2nb41.github.io/Portfolio/)

---

## 주요 작업 (사이트의 별 순서)

| # | 작업 | 한 줄 | 확인 방법 | 레포 |
| --- | --- | --- | --- | --- |
| 1 | **Prompt Editor** | 언리얼 에디터 패널에서 문장으로 지시하면 AI가 MCP 도구로 에디터를 다룹니다 | [영상](https://www.youtube.com/watch?v=ukDAZP5qFCc) | [GitHub](https://github.com/buc89l2nb41/UnrealPromptEditor) |
| 2 | **StepCut** | 시나리오대로 웹 앱을 조작·녹화하고, 에이전트가 MCP 도구로 데모 영상을 편집해 완성합니다 | 웹 UI · 완성 영상 장면 | [GitHub](https://github.com/buc89l2nb41/StepCut) |
| 3 | **Prompt Asset Forge** | 테마 한 줄로 프롬프트 → PNG → GLB를 한꺼번에 만듭니다 | [영상](https://www.youtube.com/watch?v=a6JBpMLviHk) | [GitHub](https://github.com/buc89l2nb41/PromptAssetForge) |
| 4 | **Low Poly Cultivar** | 무거운 메시를 여러 설정으로 줄이고 네 방향 유사도로 고릅니다 | [영상](https://www.youtube.com/watch?v=5jGktxpn7FM) | [GitHub](https://github.com/buc89l2nb41/LowPolyCultivar) |
| 5 | **GrowRoll** | 위 도구로 만든 소품이 들어간 3D 웹 게임입니다 | [플레이](https://grow-roll-client.vercel.app) | [GitHub](https://github.com/buc89l2nb41/GrowRoll) |
| 6 | **Godot NNUE Prompt Chess** | LLM이 고른 수를 Stockfish 후보와 규칙으로 거릅니다 | 스크린샷 · 게이트 테스트 | [GitHub](https://github.com/buc89l2nb41/GodotNnuePromptChess) |
| 7 | **SpriteGen** | 기준 그림 한 장을 고정하고 동작만 바꿔 스프라이트를 만듭니다 | 승룡권 애니메이션 · 시트 | [GitHub](https://github.com/buc89l2nb41/SpriteGen) |
| 8 | **GGPO Webgame** | AI로 뽑은 스프라이트를 넣은 브라우저 격투 게임 프로토타입입니다 | [플레이](https://ggpo-webgame.vercel.app) | [GitHub](https://github.com/buc89l2nb41/GGPO_Webgame) |
| 9 | **Beat Mapper** | 음악 파일에서 비트를 찾아 리듬 게임 레벨을 만들고 바로 플레이합니다 (AI 모델 없이 신호 처리만) | [플레이](https://beat-mapper-opal.vercel.app) | [GitHub](https://github.com/buc89l2nb41/BeatMapper) |

## 기타

| 묶음 | 작업 | 데모 | 레포 |
| --- | --- | --- | --- |
| 배포한 AI 서비스 | TranslationChat | [열기](https://translationchat.onrender.com) | [GitHub](https://github.com/buc89l2nb41/TranslationChat) |
| 배포한 AI 서비스 | AI Playlist Creator | [열기](https://ai-playlist-creator-eight.vercel.app) | [GitHub](https://github.com/buc89l2nb41/AiPlaylistCreator) |
| 배포한 AI 서비스 | PersonaChat | [열기](https://persona-chat-gamma.vercel.app) | [클라이언트](https://github.com/buc89l2nb41/PersonaChat) · [서버](https://github.com/buc89l2nb41/PersonaChatServer) |
| 브라우저 자동화 연습 | Apple Game Solver | — | [GitHub](https://github.com/buc89l2nb41/AppleGameSolver) |
| 브라우저 자동화 연습 | Count The Fingers Solver | — | [GitHub](https://github.com/buc89l2nb41/CountTheFingerSolver) |

---

## 저장소 구조

빌드 도구가 없는 정적 사이트입니다. `index.html`을 브라우저로 열면 됩니다.

| 파일 | 역할 |
| --- | --- |
| `index.html` | 뼈대 (별자리 SVG, 옆 목록) |
| `projects.js` | 문구 데이터. `window.profile`과 `window.projects` |
| `sky.js` | 별 차례, 기타 묶음, 화면 전환 |
| `sky.css` | 스타일 |
| `assets/` | 스크린샷 |

문구를 고칠 때는 `projects.js`만 바꾸면 됩니다. 별 작업은 `problem` / `did` / `result`, 기타 작업은 `summary`를 씁니다.

## 자동 검사와 배포 (GitHub Actions)

`.github/workflows/pages.yml`이 push마다 `scripts/check-site.mjs`를 돌리고, 통과하면 사이트 파일만 모아 GitHub Pages에 올립니다. PR에서는 검사만 합니다.

- 로컬에서 같은 검사: `node scripts/check-site.mjs`
- 검사 항목: JS 문법, 금지어, 이미지·파일 경로, 사이트에 나오는 작업의 레포 링크
- 처음 한 번: Settings → Pages → Source를 **GitHub Actions**로 바꿉니다.
