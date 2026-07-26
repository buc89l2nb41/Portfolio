# Portfolio

웹 · 게임 · AI 작업을 모아둔 포트폴리오 저장소입니다.

**라이브 사이트:** [https://buc89l2nb41.github.io/Portfolio/](https://buc89l2nb41.github.io/Portfolio/)  
*(GitHub Pages 설정 후 위 주소로 열립니다. 저장소 URL과는 다릅니다.)*

---

## Projects

| Project | Stack | Demo | YouTube | Repo |
| --- | --- | --- | --- | --- |
| **GrowRoll** | TypeScript, Web | [Live](https://grow-roll-client.vercel.app) | — | [GitHub](https://github.com/buc89l2nb41/GrowRoll) |
| **TranslationChat** | JavaScript, AI, Fastify | [Live](https://translationchat.onrender.com) | — | [GitHub](https://github.com/buc89l2nb41/TranslationChat) |
| **GGPO Webgame** | TypeScript, Game | [Live](https://ggpo-webgame.vercel.app) | — | [GitHub](https://github.com/buc89l2nb41/GGPO_Webgame) |
| **PersonaChat** | TypeScript, AI | [Live](https://persona-chat-gamma.vercel.app) | — | [GitHub](https://github.com/buc89l2nb41/PersonaChat) |
| **PersonaChat Server** | TypeScript, Backend | — | — | [GitHub](https://github.com/buc89l2nb41/PersonaChatServer) |
| **Pocketbase Board** | TypeScript, PocketBase | [Live](https://pocketbase-board.vercel.app) | — | [GitHub](https://github.com/buc89l2nb41/PocketbaseBoard) |
| **AI Playlist Creator** | JavaScript, AI | [Live](https://ai-playlist-creator-eight.vercel.app) | — | [GitHub](https://github.com/buc89l2nb41/AiPlaylistCreator) |
| **Prompt Asset Forge** | Python, AI | — | — | [GitHub](https://github.com/buc89l2nb41/PromptAssetForge) |
| **Low Poly Cultivar** | TypeScript, 3D | — | — | [GitHub](https://github.com/buc89l2nb41/LowPolyCultivar) |

> YouTube 칸은 영상 업로드 후 링크를 채울 예정입니다.

---

## About

프론트엔드와 인터랙티브 웹 경험을 중심으로 만든 작업물을 기록하는 공간입니다.  
이 README와 사이트의 프로젝트 목록은 계속 업데이트됩니다.

---

## 이 저장소 구조

| 파일 | 역할 |
| --- | --- |
| `index.html` | 포트폴리오 페이지 |
| `styles.css` | 스타일 |
| `projects.js` | 프로젝트 데이터 (여기만 수정해도 목록 갱신) |
| `script.js` | 목록 렌더 · 스크롤 모션 |
| `assets/` | 썸네일 이미지 |

### 프로젝트 추가 / 수정

`projects.js`에서 항목을 고칩니다.

```js
{
  title: "프로젝트 이름",
  summary: "한 줄 설명",
  stack: ["TypeScript", "Web"],
  repo: "https://github.com/buc89l2nb41/...",
  demo: "https://....vercel.app",      // 없으면 null
  youtube: "https://youtube.com/...",  // 없으면 null
  images: ["./assets/growroll/01.png", "./assets/growroll/02.png"], // 없으면 []
  youtube: "https://youtube.com/...",  // 갤러리에 영상으로 표시, 없으면 null
}
```

---

## GitHub Pages 켜는 방법

1. 이 저장소에 코드를 push
2. **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / folder: `/ (root)` → Save

잠시 후 사이트가 열립니다:  
[https://buc89l2nb41.github.io/Portfolio/](https://buc89l2nb41.github.io/Portfolio/)

저장소 About의 **Website** 칸에 위 주소를 넣어 두면, GitHub 저장소 페이지에서도 바로 사이트로 들어갈 수 있습니다.
