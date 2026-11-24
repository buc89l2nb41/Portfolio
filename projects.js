/* 프로젝트 목록 — 설명은 쉬운 말 우선.
 * tier: "featured" | "services" | "games" | "other"
 * host: 프론트/사이트 배포처 (Vercel, Render 등)
 * server: 백엔드·서버 구성 (없으면 짧게 명시)
 */
window.projects = [
  {
    tier: "featured",
    title: "Prompt Editor",
    summary:
      "언리얼 에디터 5.4의 Tools 메뉴에 붙는 프롬프트 패널로, 문장과 그림을 보내면 로컬 Python 프로그램이 Cursor API로 읽고 AI는 플러그인이 열어 둔 MCP 도구만 호출합니다.\n\n액터를 놓고 옮기거나 라이트와 머티리얼을 고치고, 나이아가라와 랜드스케이프, 카메라를 다루며, 플레이 중인 캐릭터를 움직이거나 블루프린트를 컴파일하기도 합니다.\n\n텍스처나 3D를 씬에 넣기 전에는 사람이 한 번 보고 넘어가게 끊어 두었습니다.",
    detail:
      "특정 게임을 만든 작업이 아닙니다. UE 5.4 에디터 전용 플러그인이고, 메뉴 이름은 Tools → PromptEditor입니다. 패널은 Slate로 만들고, 보낸 문장과 붙인 그림은 옆에서 도는 Python(FastAPI) 프로그램이 Cursor API로 읽습니다. AI는 그 에디터가 루프백 MCP로 열어 둔 도구만 호출합니다. 액터, 라이트, 머티리얼, 나이아가라, 랜드스케이프, 카메라를 고치고, 플레이 중인 캐릭터를 움직이거나 블루프린트를 컴파일할 수도 있습니다. Cursor 앱 채팅으로 멀리서 조종하지 않습니다.\n\n모델은 패널 드롭다운에서 고릅니다. 텍스처나 Trellis로 뽑은 3D를 씬에 넣기 전에는 사람이 한 번 보고 넘어가게 끊어 두었습니다. 이펙트는 레퍼런스 그림과 뷰포트 스크린샷을 비교하는 쪽으로 맞추고 있고, 브라우저에서 여는 데모는 없습니다.",
    stack: ["Unreal Engine 5.4", "C++", "Slate", "Python", "FastAPI", "MCP", "Cursor API", "Niagara", "Trellis"],
    repo: "https://github.com/buc89l2nb41/UnrealPromptEditor",
    demo: null,
    youtube: "https://www.youtube.com/watch?v=ukDAZP5qFCc",
    images: [
      "./assets/prompteditor/01.png",
      "./assets/prompteditor/02.png",
      "./assets/prompteditor/03.png",
      "./assets/prompteditor/04.png",
      "./assets/prompteditor/05.png",
    ],
  },
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
      "말로 스타일을 지시하는 체스로, 공격적으로, 오프닝은 이렇게, 같은 말을 받으면 그 분위기에 맞는 수를 고릅니다.\n\n없는 수나 규칙에 어긋나는 수가 나오면 체스 엔진이 고른 후보 안의 수로 바꾸고, NNUE 평가도 접해 봤습니다.",
    detail:
      "Godot으로 만든 체스에, 채팅처럼 프롬프트로 ‘공격적으로’ ‘오프닝은 이렇게’ 같은 지시를 주는 AI 모드를 붙였습니다. ChatGPT만 믿으면 존재하지 않는 수나 불법 수를 둘 수 있어서, AI가 고른 수를 보드에 바로 올리지 않습니다.\n\n먼저 Stockfish(강한 체스 엔진)가 지금 장면에서 둘 만한 후보 수 여러 개를 뽑고, AI는 그 목록 안에서만 고르거나 코칭 설명을 합니다. (오프닝을 지정한 경우에는 정해 둔 오프닝 수순을 먼저 쓰기도 하지만, 그때도 규칙상 둘 수 있는 수인지는 게임이 한 번 더 검사합니다.) 후보 밖이거나 규칙에 안 맞는 수면 엔진 후보·최선의 수로 바꿔 둡니다. 사람 말(프롬프트)은 스타일·설명에 쓰고, 실제로 놓는 수는 엔진·규칙으로 막는 구조입니다.",
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
    title: "Prompt Asset Forge",
    summary:
      "GrowRoll에 넣을 정원 소품을 한 줄 테마로 여러 개 뽑는 배치 도구로, 테마를 주면 프롬프트 목록과 그림을 만들고 로컬 Trellis로 3D 파일까지 넘깁니다.\n\n하나씩 만들면 느려서 한 번에 여러 개를 처리하게 했고, 면 수가 많아 무거워진 메시의 비교와 선택은 Low Poly Cultivar가 맡습니다.",
    detail:
      "GrowRoll은 굴려 모으는 게임에 도토리·화분·버섯 같은 정원 소품이 많이 필요합니다. 문서에는 티어별로 수십 개 에셋 체크리스트와, ‘이미지 프롬프트 → 그림 → Trellis로 3D → 게임에 GLB’ 흐름이 정리돼 있습니다. Trellis를 하나씩 돌리면 너무 느려서, 예전에 만든 플레이리스트 앱처럼 ‘한 번에 여러 개’가 필요했습니다.\n\nPrompt Asset Forge는 테마(예: 정원)를 넣으면 Cursor API로 프롬프트 목록과 레퍼런스 PNG를 만들고, 로컬 Trellis로 GLB를 일괄 생성하는 웹 도구입니다. GrowRoll용 컬렉션을 뽑는 데 쓰였고, Trellis 결과면 수가 너무 많아(대략 수만 면, 최소도 만 면대) 게임용으로는 무거웠습니다. 그 성능 문제는 이후 gltfpack 실험과 Low Poly Cultivar로 이어집니다.",
    stack: ["Python", "AI", "Cursor API"],
    repo: "https://github.com/buc89l2nb41/PromptAssetForge",
    demo: null,
    youtube: "https://www.youtube.com/watch?v=a6JBpMLviHk",
    images: ["./assets/mock/forge-01.svg"],
  },
  {
    tier: "featured",
    title: "Low Poly Cultivar",
    summary:
      "무거운 3D 모델을 여러 설정으로 가볍게 만든 뒤, 원본과 앞뒤좌우 그림을 겹쳐 비슷하면서도 면이 적은 쪽을 고르거나 사람이 골라 받는 도구입니다.\n\nGrowRoll에 넣은 Trellis 메시가 너무 무거워, 눈으로만 비교하지 않으려고 만들었습니다.",
    detail:
      "AI로 3D 메시를 뽑는 Trellis를 GrowRoll(굴려 모으는 웹 게임)에 넣었더니, 면 수가 너무 많아서 게임이 버거웠습니다. gltfpack이라는 도구로 설정을 바꿔 가며 깎아 봤는데, 너무 깎으면 텍스처가 깨지기도 해서 ‘어떤 설정이 좋은지’를 눈으로 비교할 필요가 있었습니다. 그래서 여러 프리셋으로 한 번에 후보를 만들고, 원본과 전·후·좌·우 네 방향 스프라이트를 겹쳐 얼마나 비슷한지 점수로 본 뒤, 비슷하면서도 폴리곤이 적은 쪽을 고르거나 사람이 골라 받게 만들었습니다. 에셋 생성 파이프라인의 성능 문제를 ‘감으로 하나하나’가 아니라 비교·자동 선택 툴로 푼 사례입니다.",
    stack: ["TypeScript", "Three.js", "gltfpack"],
    repo: "https://github.com/buc89l2nb41/LowPolyCultivar",
    demo: null,
    youtube: "https://www.youtube.com/watch?v=5jGktxpn7FM",
    images: [
      "./assets/lowpoly/01-home.png",
      "./assets/lowpoly/03-after-generate.png",
      "./assets/lowpoly/04-mid.png",
      "./assets/lowpoly/05-bottom.png",
    ],
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
    tier: "services",
    title: "TranslationChat",
    summary:
      "여러 언어로 보낸 말을 뜻을 맞춰 번역해 주는 채팅으로, 브라우저에서 바로 열 수 있고 번역은 서버의 AI API가 맡습니다.",
    host: "Render",
    server: "Fastify",
    stack: ["JavaScript", "AI", "Fastify"],
    repo: "https://github.com/buc89l2nb41/TranslationChat",
    demo: "https://translationchat.onrender.com",
    youtube: null,
    images: ["./assets/mock/trans-01.svg", "./assets/mock/trans-02.svg"],
  },
  {
    tier: "services",
    title: "AI Playlist Creator",
    summary:
      "원하는 분위기를 말하면 곡 목록을 만들어 주는 웹으로, 브라우저에서 바로 열 수 있습니다.\n\nAgent API는 붙어 있지 않고, 붙이려면 제미나이 키가 필요합니다.",
    host: "Vercel",
    server: "자체 서버 없음 · 외부 AI API",
    stack: ["JavaScript", "AI"],
    repo: "https://github.com/buc89l2nb41/AiPlaylistCreator",
    demo: "https://ai-playlist-creator-eight.vercel.app",
    youtube: null,
    images: ["./assets/mock/playlist-01.svg"],
  },
  {
    tier: "services",
    title: "PersonaChat",
    summary:
      "정해 둔 성격으로 대화하는 채팅으로, 브라우저에서 여는 쪽이 클라이언트이고 그 대화를 받아 답하는 서버가 따로 있습니다.",
    host: "Vercel",
    server: "Bun · Hono (별도 서버)",
    stack: ["TypeScript", "AI", "Bun", "Hono"],
    repo: "https://github.com/buc89l2nb41/PersonaChat",
    demo: "https://persona-chat-gamma.vercel.app",
    youtube: null,
    images: ["./assets/mock/persona-01.svg"],
  },
  {
    tier: "services",
    title: "PersonaChat Server",
    summary: "PersonaChat의 대화 서버입니다.",
    stack: ["TypeScript"],
    repo: "https://github.com/buc89l2nb41/PersonaChatServer",
    demo: null,
    youtube: null,
    images: [],
  },
  {
    tier: "services",
    title: "Pocketbase Board",
    summary:
      "글을 올리고 읽는 게시판에 가까운 웹으로, 화면은 브라우저에서 열고 글은 PocketBase에 저장합니다.",
    host: "Vercel",
    server: "PocketBase",
    stack: ["TypeScript", "PocketBase"],
    repo: "https://github.com/buc89l2nb41/PocketbaseBoard",
    demo: "https://pocketbase-board.vercel.app",
    youtube: null,
    images: [],
  },
  {
    tier: "other",
    title: "Apple Game Solver",
    summary:
      "apple.oshizi.com 사과 게임에서 합이 10인 칸을 찾아 지우는 프로그램으로, 화면의 칸을 읽고 조건에 맞는 칸을 눌러 없앱니다.\n\nPlaywright를 처음 써서 브라우저 안을 조작해 본 작업입니다.",
    stack: ["JavaScript", "Playwright"],
    repo: "https://github.com/buc89l2nb41/AppleGameSolver",
    demo: null,
    youtube: null,
    images: [],
  },
  {
    tier: "other",
    title: "Count The Fingers Solver",
    summary:
      "countthefingers.com에 나오는 퀴즈를 읽고 답을 누르는 프로그램으로, 문제를 확인한 뒤 그 답을 화면에 입력합니다.\n\nPlaywright를 처음 써서 브라우저 안을 조작해 본 작업입니다.",
    stack: ["JavaScript", "Playwright"],
    repo: "https://github.com/buc89l2nb41/CountTheFingerSolver",
    demo: null,
    youtube: null,
    images: [],
  },
  {
    tier: "games",
    title: "GrowRoll",
    summary:
      "굴려 다니며 물건을 모아 커지는 웹 3D 게임으로, 브라우저에서 바로 플레이하고 멀티플레이도 됩니다.\n\n정원 소품은 Trellis로 뽑은 메시를 넣었고, 그것을 대량으로 만든 도구가 Prompt Asset Forge입니다.\n\n면 수가 많아 게임이 무거워진 뒤의 고르기는 Low Poly Cultivar로 이어집니다.",
    host: "Vercel",
    server: "프론트만 (멀티는 선택 WebSocket)",
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
    tier: "games",
    title: "GGPO Webgame",
    summary:
      "브라우저에서 플레이하는 격투 게임 프로토타입입니다.\n\n같은 캐릭터의 포즈별 스프라이트를 Stable Diffusion으로 뽑으려던 DiffusionGen은, 프레임마다 얼굴과 옷이 바뀌고 포즈도 잘 따르지 않아 쓰지 못했습니다. 그래서 스프라이트를 뽑아 주는 사이트 AetherForge의 그림을 넣었습니다.\n\n지연을 줄이는 넷코드도 붙여 봤지만, 깊게 만든 넷코드 구현이라기보다 스프라이트를 넣어 플레이해 본 쪽에 가깝습니다.",
    host: "Vercel",
    server: "자체 서버 없음 · WebRTC P2P",
    stack: ["TypeScript", "Game", "WebRTC"],
    repo: "https://github.com/buc89l2nb41/GGPO_Webgame",
    demo: "https://ggpo-webgame.vercel.app",
    youtube: null,
    images: ["./assets/mock/ggpo-01.svg"],
  },
  {
    tier: "featured",
    title: "SpriteGen",
    summary:
      "같은 캐릭터의 동작 스프라이트를 뽑는 로컬 스튜디오로, 기준 그림을 고정한 뒤 문장이나 3D 포즈, 참고 영상으로 동작을 만들고 그 영상을 칸으로 자릅니다.\n\n프레임마다 얼굴을 다시 그리지 않고 동작만 바꿉니다.\n\n브라우저에서 여는 데모는 없고, 시트는 이 도구가 돌아가는 컴퓨터에 남습니다.",
    detail:
      "프레임마다 얼굴을 다시 그리지 않고, 기준 캐릭터 한 장을 고정한 다음 동작만 바꿉니다. 문장으로 영상을 만들거나, 3D 몸의 관절을 고쳐 포즈 영상을 만들거나, 참고 영상을 따라 가게 한 뒤 그 영상을 칸으로 자릅니다. 브라우저에서 여는 데모는 없고, 결과 시트는 이 도구가 돌아가는 컴퓨터에 남습니다.",
    stack: ["TypeScript", "React", "Three.js", "Node", "Kling", "Cursor"],
    repo: "https://github.com/buc89l2nb41/SpriteGen",
    demo: null,
    youtube: null,
    images: [],
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
