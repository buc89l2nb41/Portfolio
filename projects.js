/* 프로젝트 목록 — 설명은 쉬운 말 우선. 기술 약어는 풀어 씀.
 * 실제 에셋: assets/ 아래 스크린샷·목업. youtube는 샘플/본인 영상 URL.
 */
window.projects = [
  {
    tier: "featured",
    title: "FBNeo Agent",
    summary:
      "옛날 아케이드 게임을 돌리는 프로그램(에뮬레이터)을, AI가 화면을 보고 조작할 수 있게 개조한 기반 작업",
    detail:
      "처음에는 MAME라는 에뮬레이터로 ‘원작을 보면서 게임을 베끼는 자동화’를 하려 했는데, 최신판은 ROM이 잘 안 되고 구버전은 AI가 조작하기가 너무 어려웠습니다. 그래서 소스를 고칠 수 있는 FBNeo를 가져와, AI 전용 실행 옵션(-agent)을 붙였습니다. 화면 캡처, 키 입력, 메모리 읽기 같은 정보를 프로그램끼리 빠르게 주고받도록(공유 메모리 채널 여러 개) 만들어 두었습니다. 이후 스프라이트 캡처나 ‘훈수 보면서 AI가 플레이’하는 실험의 바닥이 된 프로젝트입니다. 핵심은 ‘게임을 다시 만든 것’이 아니라, ‘에뮬레이터를 AI가 관측·제어하게 만든 것’입니다.",
    stack: ["C++", "FBNeo", "Shared Memory", "Python"],
    repo: "https://github.com/buc89l2nb41/FBNeo-Agent",
    demo: null,
    youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    images: [
      "./assets/mock/fbneo-01.svg",
      "./assets/mock/fbneo-02.svg",
      "./assets/mock/fbneo-03.svg",
    ],
  },
  {
    tier: "featured",
    title: "Godot NNUE Prompt Chess",
    summary:
      "말로 플레이 스타일을 지시하는 AI 체스. 엉뚱한 수는 체스 엔진이 고른 후보만 쓰게 해서 막음",
    detail:
      "Godot으로 만든 체스에, 채팅처럼 프롬프트로 ‘공격적으로’ ‘오프닝은 이렇게’ 같은 지시를 주는 AI 모드를 붙였습니다. ChatGPT만 믿으면 존재하지 않는 수나 불법 수를 둘 수 있어서, AI가 고른 수를 보드에 바로 올리지 않습니다. 먼저 Stockfish(강한 체스 엔진)가 지금 장면에서 둘 만한 후보 수 여러 개를 뽑고, AI는 그 목록 안에서만 고르거나 코칭 설명을 합니다. 마지막에 게임이 ‘이 수는 규칙상 되는가’를 한 번 더 검사합니다. 사람 말(프롬프트)과 엔진 검증을 같이 쓰는 구조입니다.",
    stack: ["Godot", "GDScript", "Stockfish", "AI"],
    repo: "https://github.com/buc89l2nb41/GodotNnuePromptChess",
    demo: null,
    youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    images: [
      "./assets/mock/chess-01.svg",
      "./assets/mock/chess-02.svg",
      "./assets/mock/chess-03.svg",
    ],
  },
  {
    tier: "featured",
    title: "Low Poly Cultivar",
    summary:
      "무거운 3D 모델을 여러 방식으로 가볍게 만든 뒤, 앞뒤좌우 그림이 얼마나 비슷한지 보고 자동으로 고르는 도구",
    detail:
      "AI로 3D 메시를 뽑는 Trellis를 GrowRoll(굴려 모으는 웹 게임)에 넣었더니, 면 수가 너무 많아서 게임이 버거웠습니다. gltfpack이라는 도구로 설정을 바꿔 가며 깎아 봤는데, 너무 깎으면 텍스처가 깨지기도 해서 ‘어떤 설정이 좋은지’를 눈으로 비교할 필요가 있었습니다. 그래서 여러 프리셋으로 한 번에 후보를 만들고, 원본과 전·후·좌·우 네 방향 스프라이트를 겹쳐 얼마나 비슷한지 점수로 본 뒤, 비슷하면서도 폴리곤이 적은 쪽을 고르거나 사람이 골라 받게 만들었습니다. 에셋 생성 파이프라인의 성능 문제를 ‘감으로 하나하나’가 아니라 비교·자동 선택 툴로 푼 사례입니다.",
    stack: ["TypeScript", "Three.js", "gltfpack"],
    repo: "https://github.com/buc89l2nb41/LowPolyCultivar",
    demo: null,
    youtube: null,
    images: [
      "./assets/lowpoly/01-home.png",
      "./assets/lowpoly/03-after-generate.png",
      "./assets/lowpoly/04-mid.png",
      "./assets/lowpoly/05-bottom.png",
    ],
  },
  {
    tier: "featured",
    title: "TranslationChat",
    summary: "여러 언어로 채팅하면 AI가 뜻을 해석·번역해 주는 웹 서비스 (실제로 배포됨)",
    detail:
      "AI API를 붙여, 브라우저에서 바로 쓸 수 있는 번역·대화 웹앱을 만들고 서버에 올려 두었습니다. 로컬에서만 돌아가는 실험이 아니라, 링크만 있으면 다른 사람도 열어볼 수 있게 한 쪽에 가깝습니다. 초반에 ‘AI로 웹 서비스를 끝까지 만들어 배포해 보기’ 연습이자, API를 실제 제품 형태로 붙인 경험의 증거로 두었습니다.",
    stack: ["JavaScript", "AI", "Fastify"],
    repo: "https://github.com/buc89l2nb41/TranslationChat",
    demo: "https://translationchat.onrender.com",
    youtube: null,
    images: ["./assets/mock/trans-01.svg", "./assets/mock/trans-02.svg"],
  },
  {
    tier: "featured",
    title: "AgentPlay",
    summary:
      "에뮬레이터 게임을 AI가 플레이하고, 사람이 명령창·웹 화면으로 훈수를 넣는 실험 (아직 미완)",
    detail:
      "처음에는 ‘강화학습으로 게임을 스스로 익히게 하자’는 쪽으로 생각했지만, 방향을 바꿨습니다. 인터넷 방송처럼 사람이 훈수를 치면 AI가 따라 하는 느낌, 그리고 명령이 없을 때는 스스로도 움직이게(AUTO) 하는 쪽에 가깝습니다. 웹으로 만든 조작 화면이나 한 줄씩 치는 명령창으로 ‘이렇게 해’라고 말하면, 앞에서 만든 FBNeo Agent 연결을 통해 입력이 게임으로 들어가게 짜 두었습니다. 뼈대(연결, 자동 목표, 코칭용 코드)는 있지만, 아직 말한 대로 깔끔하게 따라오지 못하는 경우가 많아서 완성작이라기보다 진행 중인 실험입니다. 강화학습으로 끝까지 학습시킨 버전은 아닙니다.",
    stack: ["Python", "FBNeo", "Gradio", "Vision AI"],
    repo: "https://github.com/buc89l2nb41/FBNeo_AgentPlay",
    demo: null,
    youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    images: ["./assets/mock/agentplay-01.svg", "./assets/mock/agentplay-02.svg"],
  },
  {
    tier: "other",
    badge: "서비스",
    title: "AI Playlist Creator",
    summary:
      "원하는 분위기를 말하면 AI가 곡 목록(플레이리스트)을 짜 주는 웹 서비스. Agent API를 붙여 배포까지 해 본 초기 작품",
    stack: ["JavaScript", "AI"],
    repo: "https://github.com/buc89l2nb41/AiPlaylistCreator",
    demo: "https://ai-playlist-creator-eight.vercel.app",
    youtube: null,
    images: ["./assets/mock/playlist-01.svg"],
  },
  {
    tier: "other",
    badge: "서비스",
    title: "PersonaChat",
    summary:
      "정해 둔 성격(페르소나)으로 대화하는 채팅 웹앱과, 그걸 받쳐 주는 서버. AI API로 캐릭터처럼 말하게 한 서비스",
    stack: ["TypeScript", "AI"],
    repo: "https://github.com/buc89l2nb41/PersonaChat",
    demo: "https://persona-chat-gamma.vercel.app",
    youtube: null,
    images: ["./assets/mock/persona-01.svg"],
  },
  {
    tier: "other",
    badge: "툴",
    title: "Prompt Asset Forge",
    summary:
      "한 번 프롬프트를 넣으면 여러 컨셉 이미지를 만들고, 그걸 Trellis 같은 3D 생성으로 한꺼번에 넘기는 배치 도구. 예전에 만든 플레이리스트 앱처럼 ‘한 번에 여러 개’ 흐름을 에셋 생산에 옮긴 것. 이미지 쪽은 Cursor API를 사용",
    stack: ["Python", "AI"],
    repo: "https://github.com/buc89l2nb41/PromptAssetForge",
    demo: null,
    youtube: null,
    images: ["./assets/mock/forge-01.svg"],
  },
  {
    tier: "other",
    badge: "툴",
    title: "ModelToSprite",
    summary:
      "리깅된 3D 모델을 포즈 에디터에서 움직인 뒤, 그림(스프라이트)으로보내 일관된 캐릭터 컷을 만들려 한 도구. 포즈 에디터 MVP와보내기까지는 됐고, 스타일 변환·자동화 쪽은 아직 덜 다듬음",
    stack: ["TypeScript", "Three.js"],
    repo: "https://github.com/buc89l2nb41/ModelToSprite",
    demo: null,
    youtube: null,
    images: ["./assets/mock/model-01.svg"],
  },
  {
    tier: "other",
    badge: "프로토타입",
    title: "GrowRoll",
    summary:
      "굴려 다니며 물건을 모아 커지는(괴혼 비슷한) 웹 3D 프로토타입. Trellis로 만든 메시를 넣었고, 면이 많아 성능이 나빠져 이후 Low Poly Cultivar로 이어짐",
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
    summary:
      "웹에서 돌려 본 격투 게임 프로토타입. 지연을 줄이는 넷코드(GGPO) 느낌이 궁금해서 만들어 봤고, 라이브러리를 깊게 이해한 전문 구현이라기보다 관심·실험에 가깝습니다",
    stack: ["TypeScript", "Game"],
    repo: "https://github.com/buc89l2nb41/GGPO_Webgame",
    demo: "https://ggpo-webgame.vercel.app",
    youtube: null,
    images: ["./assets/mock/ggpo-01.svg"],
  },
  {
    tier: "other",
    badge: "실험",
    title: "Cadillacs Capture",
    summary:
      "Godot으로 캐딜락스 앤 다이노소어를 다시 그리려다, FBNeo로 원작 화면을 캡처·연동해 본 실험. ‘원작을 통째로 재현한 완성 게임’이 아니라 캡처·자동화 쪽 시도",
    stack: ["Godot", "FBNeo"],
    repo: "https://github.com/buc89l2nb41/CadillacsCapture",
    demo: null,
    youtube: null,
    images: ["./assets/mock/cadillacs-01.svg"],
  },
  {
    tier: "other",
    badge: "실험",
    title: "DiffusionGen",
    summary:
      "게임용 2D 스프라이트를 AI로 뽑고, 캐릭터가 일정하게 나오게 LoRA(추가 학습)까지 돌려 본 파이프라인. ComfyUI로 생성하고, 학습은 Hugging Face 쪽 도구(diffusers 등)를 사용. 일관성·퀄리티는 목표에 못 미쳐 Featured로는 안 둠",
    stack: ["Python", "Diffusion", "LoRA"],
    repo: "https://github.com/buc89l2nb41/DiffusionGen",
    demo: null,
    youtube: null,
    images: ["./assets/mock/diffgen-01.svg"],
  },
];
