/* 프로젝트 목록 — 여기만 수정하면 포트폴리오가 갱신됩니다.
 *
 * tier: "featured" | "other"
 * badge: other만 — "서비스" | "툴" | "프로토타입" | "실험"
 * summary: 한 줄 / detail: featured용 2~3문장 (없으면 summary만)
 * images / youtube / demo / repo: 없으면 null 또는 []
 *
 * 아카이브만(사이트 미표시): Pocketbase, Winwright, _Harness, 솔버 등 — CHRONO_HANDOFF §6A
 * 공개 레포 확인 후 추가 예정: FBNeo Agent, AgentPlay, ModelToSprite, Cadillacs, DiffusionGen
 */
window.projects = [
  {
    tier: "featured",
    title: "Godot NNUE Prompt Chess",
    summary: "LLM 코칭 + Stockfish 후보 게이트로 환각 수를 막는 Agent 플레이",
    detail:
      "프롬프트 코칭을 붙이되, LLM이 낸 수를 보드에 바로 올리지 않고 엔진 MultiPV 후보만 허용합니다. make_move가 최종 게이트라 불법·엉뚱한 수를 차단합니다.",
    stack: ["Godot", "GDScript", "Stockfish", "AI"],
    repo: "https://github.com/buc89l2nb41/GodotNnuePromptChess",
    demo: null,
    youtube: null,
    images: [],
  },
  {
    tier: "featured",
    title: "Low Poly Cultivar",
    summary: "Trellis 메시를 여러 LOD로 깎고 4방향 유사도로 자동 고르는 툴",
    detail:
      "GrowRoll에서 Trellis 메시가 무거워 gltfpack 파라미터를 실험하다, 프리셋 비교 UI와 전후좌우 유사도 자동 선택을 만들었습니다. 에셋 생성 파이프라인의 성능 병목을 툴로 푼 사례입니다.",
    stack: ["TypeScript", "Three.js", "gltfpack"],
    repo: "https://github.com/buc89l2nb41/LowPolyCultivar",
    demo: null,
    youtube: null,
    images: [],
  },
  {
    tier: "featured",
    title: "TranslationChat",
    summary: "배포된 AI 번역·대화 서비스",
    detail:
      "Agent API로 실제 쓸 수 있는 웹 서비스를 만들고 배포했습니다. 웹·API 쪽 실행력의 증거로 둡니다.",
    stack: ["JavaScript", "AI", "Fastify"],
    repo: "https://github.com/buc89l2nb41/TranslationChat",
    demo: "https://translationchat.onrender.com",
    youtube: null,
    images: [],
  },
  {
    tier: "other",
    badge: "서비스",
    title: "AI Playlist Creator",
    summary: "Agent API로 플레이리스트를 구성하는 웹 서비스",
    stack: ["JavaScript", "AI"],
    repo: "https://github.com/buc89l2nb41/AiPlaylistCreator",
    demo: "https://ai-playlist-creator-eight.vercel.app",
    youtube: null,
    images: [],
  },
  {
    tier: "other",
    badge: "서비스",
    title: "PersonaChat",
    summary: "페르소나 기반 채팅 클라이언트·서버",
    stack: ["TypeScript", "AI"],
    repo: "https://github.com/buc89l2nb41/PersonaChat",
    demo: "https://persona-chat-gamma.vercel.app",
    youtube: null,
    images: [],
  },
  {
    tier: "other",
    badge: "툴",
    title: "Prompt Asset Forge",
    summary: "프롬프트→이미지→메시 배치 생성 파이프라인",
    stack: ["Python", "AI"],
    repo: "https://github.com/buc89l2nb41/PromptAssetForge",
    demo: null,
    youtube: null,
    images: [],
  },
  {
    tier: "other",
    badge: "프로토타입",
    title: "GrowRoll",
    summary: "Trellis 기반 3D 수집·성장 루프",
    stack: ["TypeScript", "Web"],
    repo: "https://github.com/buc89l2nb41/GrowRoll",
    demo: "https://grow-roll-client.vercel.app",
    youtube: null,
    images: [
      "./assets/growroll/01.png",
      "./assets/growroll/02.png",
      "./assets/growroll/03.png",
    ],
  },
  {
    tier: "other",
    badge: "프로토타입",
    title: "GGPO Webgame",
    summary: "격투 웹 프로토타입",
    stack: ["TypeScript", "Game"],
    repo: "https://github.com/buc89l2nb41/GGPO_Webgame",
    demo: "https://ggpo-webgame.vercel.app",
    youtube: null,
    images: [],
  },
];
