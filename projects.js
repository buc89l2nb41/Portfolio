/* 사이트 문구.
 * window.profile: 첫 화면에 나오는 역할·연락처. 값이 없는 칸은 화면에 안 나옵니다.
 * window.projects: 작업 목록.
 *   별 작업 → problem(문제) / did[](한 일) / result(결과·한계)
 *   기타 작업 → summary(한두 문장)
 *   hidden: true 면 사이트에 안 나옵니다. 비공개 레포는 repo를 null로 둡니다.
 *   short: 별자리 그림 위 이름이 길 때 쓰는 짧은 이름.
 *   game: true 면 데모 버튼이 "플레이"로 나옵니다.
 *   links: GitHub 링크를 여러 개 보여 줄 때 [{ label, href }].
 * 문구는 쉬운 존댓말로, 수치는 실제로 잰 것만 씁니다.
 */
window.profile = {
  name: null,
  role: "AI 개발 자동화 · 툴링",
  headline: "AI에게 에디터 작업과 에셋 제작을 맡기는 도구를 만듭니다",
  intro:
    "AI가 손댈 곳은 도구로 열어 두고, 결과는 엔진 규칙이나 사람의 확인을 한 번 거치게 합니다.",
  github: "https://github.com/buc89l2nb41",
  email: null,
};

window.projects = [
  {
    title: "Prompt Editor",
    problem:
      "액터를 놓고 라이트와 머티리얼을 고치는 언리얼 에디터 작업을 말로 맡기고 싶었습니다. 하지만 AI가 에디터를 마음대로 건드리면 결과를 믿기 어렵습니다.",
    did: [
      "UE 5.4 에디터의 Tools 메뉴에 붙는 프롬프트 패널을 C++/Slate로 만들었습니다. 대기열, 모델 선택, 그림 첨부, 도구 호출 기록이 있습니다.",
      "패널에서 보낸 문장은 옆에서 도는 Python(FastAPI) 프로그램이 Cursor API로 보냅니다.",
      "AI는 플러그인이 내 컴퓨터 안(127.0.0.1)에 연 MCP 서버의 도구 180개만 씁니다. 액터, 라이트, 머티리얼, 나이아가라, 블루프린트, 지형, 시퀀서, 카메라, 플레이 중 캐릭터 이동까지 다룹니다.",
      "Trellis로 뽑은 3D와 텍스처는 사람이 그림과 미리보기를 보고 버튼으로 승인해야 프로젝트에 들어가게 했습니다.",
      "플레이 중에 에디터 월드를 고치려 하면 플레이를 먼저 멈추고, 에디터 상태를 못 읽으면 거절하게 했습니다.",
    ],
    result:
      "에디터 안의 패널 하나로 위 작업을 지시할 수 있습니다. 개인 실험 프로젝트이고 Windows와 UE 5.4에서만 확인했습니다. 이펙트를 레퍼런스 그림에 맞추는 부분은 아직 다듬고 있습니다.",
    stack: ["Unreal Engine 5.4", "C++", "Slate", "Python", "FastAPI", "MCP", "Cursor API"],
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
    title: "StepCut",
    problem:
      "포트폴리오에 넣을 데모 영상을 OBS로 찍고 DaVinci Resolve로 자르는 데 한 편에 2시간 넘게 걸렸습니다. 다시 찍을 때마다 동작 순서와 타이밍이 달라져 자막과 자르는 지점을 매번 새로 잡아야 했습니다.",
    did: [
      "클릭·입력·확인 단계와 자막을 적은 시나리오대로 Playwright가 웹 앱을 조작하고, 따로 녹화 프로그램 없이 StepCut이 직접 녹화하게 했습니다. ffmpeg로 화면을 찍거나, 브라우저가 그리는 프레임을 받아 창을 숨긴 채 찍을 수 있습니다.",
      "녹화 첫 프레임을 0초로 두고 모든 동작의 시각을 기록했습니다. 촬영 시작과 끝에 화면 구석에 표시를 띄워 녹화 지연을 찾아 보정합니다.",
      "그 기록으로 자막, 클릭 확대, 대기 빨리감기, 인트로·아웃트로를 넣어 ffmpeg로 렌더하고, 길이·자막 속도·싱크·꼭 보여 줄 기능이 들어갔는지 검사합니다.",
      "녹화·편집·검사를 MCP 도구 22개로 열어 두고, 에이전트(Cursor agent CLI, Claude Code)가 계획부터 완성 영상까지 만들게 했습니다. 시나리오 승인, 돈이 나가는 단계, 완성 영상 확인은 사람만 할 수 있습니다.",
      "에이전트와 대화하며 계획을 고치고, 승인·녹화 버튼과 영상 검토가 한 화면에 있는 로컬 웹 UI를 붙였습니다.",
    ],
    result:
      "명령 한 번으로 에이전트가 SpriteGen 데모 영상(42.1초, 자막 9개, 클릭 확대 7곳)을 4분 44초 만에 만들었고, 재촬영은 0번, 꼭 보여 줄 기능은 4개 모두 들어갔습니다. 이때는 OBS로 녹화했고, OBS를 뺀 뒤 자체 녹화로 같은 시나리오를 다시 찍었을 때도 15단계가 모두 통과하고 빠진 프레임은 0개였습니다. 함께 보이는 그림은 StepCut 웹 UI입니다. 에이전트와 계획을 나누는 화면, 에이전트가 MCP 도구를 불러 가며 답한 대화와 미리보기 영상·검사 결과, 에이전트가 정리한 계획과 단계 목록 순서입니다. 지금은 웹 앱만 찍을 수 있고 Godot·Unreal은 드라이버가 따로 필요하며, 화면에 개인 정보가 보이는지는 사람이 확인해야 합니다.",
    stack: ["Python", "Playwright", "ffmpeg", "MCP", "Cursor agent CLI", "Claude Code"],
    repo: "https://github.com/buc89l2nb41/StepCut",
    demo: null,
    youtube: null,
    images: [
      "./assets/stepcut/web-ui.png",
      "./assets/stepcut/agent-chat-video.png",
      "./assets/stepcut/agent-plan.png",
    ],
  },
  {
    title: "Prompt Asset Forge",
    problem:
      "GrowRoll에는 도토리, 화분, 버섯 같은 정원 소품이 많이 필요했습니다. Trellis로 3D 모델을 하나씩 뽑으면 너무 느렸습니다.",
    did: [
      "테마 한 줄을 넣으면 Cursor API로 프롬프트 목록과 레퍼런스 PNG를 만드는 로컬 웹 도구를 만들었습니다.",
      "만든 PNG를 로컬 Trellis 2에 차례로 넘겨 GLB 파일로 한꺼번에 바꿉니다.",
      "Trellis가 꺼져 있으면 시작 스크립트가 먼저 띄우고, 준비가 끝난 뒤 3D 생성을 시작하게 했습니다.",
    ],
    result:
      "GrowRoll의 정원 소품 39개를 이 도구로 뽑았습니다. 다만 Trellis는 면 수를 10,000개 아래로 줄일 수 없어 게임에서 무거웠고, 그 문제는 Low Poly Cultivar에서 다룹니다. 생성 결과의 모양은 매번 달라서 쓸 만한지는 사람이 미리보기로 확인합니다.",
    stack: ["Python", "Cursor API", "Trellis 2", "Gradio"],
    repo: "https://github.com/buc89l2nb41/PromptAssetForge",
    demo: null,
    youtube: "https://www.youtube.com/watch?v=a6JBpMLviHk",
    images: [],
  },
  {
    title: "Low Poly Cultivar",
    problem:
      "Trellis로 뽑은 메시가 무거워 GrowRoll이 버거웠습니다. gltfpack으로 줄여 보니 너무 깎으면 텍스처가 깨져서, 어떤 설정이 나은지 매번 눈으로 비교해야 했습니다.",
    did: [
      "gltfpack 프리셋 여러 개로 후보 메시를 한 번에 만듭니다.",
      "원본과 후보를 앞뒤좌우 네 방향에서 스프라이트로 찍고, 픽셀 차이로 얼마나 비슷한지 점수를 냅니다.",
      "비슷하면서 면이 가장 적은 후보를 자동으로 고르거나, 비교 화면에서 사람이 골라 받게 했습니다.",
      "Playwright로 여러 모델을 차례로 처리하는 배치도 붙였습니다.",
    ],
    result:
      "GrowRoll의 나무 모델 하나로 돌렸을 때 면 수는 17,559개에서 5,715개로, 파일은 약 2.6MB에서 약 93KB로 줄었고 1파일에 48초 걸렸습니다. 이 결과의 유사도 점수는 도구 기준 \"주의\" 구간이라 사람이 한 번 더 보는 것이 좋습니다. 로컬 웹 도구라 브라우저 데모는 없습니다.",
    stack: ["TypeScript", "React", "Three.js", "Express", "gltfpack", "Playwright"],
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
    title: "GrowRoll",
    game: true,
    problem:
      "굴려서 물건을 모아 커지는 3D 웹 게임입니다. 맵에 놓을 소품이 많이 필요했던 것이 Prompt Asset Forge와 Low Poly Cultivar를 만든 계기가 됐습니다.",
    did: [
      "Three.js와 Rapier로 굴리고 붙이는 움직임을 만들고, 클라이언트를 Vercel에 배포했습니다.",
      "Node와 WebSocket으로 릴레이 서버를 만들어 같은 맵에서 서로의 덩어리를 보게 했습니다. 서버가 없어도 혼자 플레이할 수 있습니다.",
      "정원 소품 39개는 Prompt Asset Forge로 뽑고 Low Poly Cultivar로 줄여서 넣었습니다.",
    ],
    result:
      "브라우저에서 바로 플레이할 수 있습니다. 소품 39개의 삼각형 수는 합계 460,865개에서 99,577개로, 파일 크기는 약 88.7MB에서 약 1.7MB로 줄었습니다.",
    stack: ["TypeScript", "Three.js", "Rapier", "Vite", "Node", "WebSocket"],
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
    title: "Godot NNUE Prompt Chess",
    short: "Prompt Chess",
    problem:
      "LLM에게 체스 수나 연습 포지션을 맡기면 없는 수, 규칙에 어긋나는 수, 말이 안 되는 포지션을 내놓을 때가 있습니다. 채팅으로 오프닝을 고르고 연습을 요청하는 재미는 살리되, 보드에 올라가는 것은 믿을 수 있어야 했습니다.",
    did: [
      "Godot 체스에 에이전트와 채팅하며 두는 모드를 붙였습니다. '시실리안 나이도프로 둬 줘', '나에게 수를 추천해 줘', '비나 메이트 연습하게 세팅해 줘'처럼 말하면 오프닝대로 두고, 내 수를 추천하고, 연습 포지션을 보드에 올립니다.",
      "Stockfish(NNUE)가 지금 장면에서 둘 만한 후보 수 여러 개를 먼저 뽑고, AI는 그 목록 안에서만 고릅니다.",
      "AI 쪽은 옆에서 도는 Python(FastAPI) 프로그램이 Cursor API로 처리합니다.",
      "후보 밖이거나 규칙에 맞지 않는 수는 게임이 보드 사본에 먼저 둬 보고 막은 뒤 엔진 후보로 바꿉니다. 추천 수도 내 쪽 후보 안에 있어야 파란 칸으로 표시합니다. 판정마다 [GATE] 기록을 남기고 채팅창에 교체 사실을 보여 줍니다.",
      "연습 포지션 23개(기물 메이트 11, 메이트 패턴 12)를 직접 만들어 두고, 목록에 없는 요청은 에이전트가 FEN을 만듭니다. 어느 쪽이든 규칙·기물 구성·엔진 확인을 통과해야 보드에 올라가고, 실패하면 이유를 붙여 한 번만 다시 요청합니다.",
      "API 키 없이 돌릴 수 있는 게이트 테스트(Python 39건, Godot 45건)를 만들었습니다.",
    ],
    result:
      "테스트로 AI 답에 불법 수 e8e1을 넣었더니 게이트가 엔진 후보 e7e6으로 바꿔 보드에 올렸고, 게이트 테스트는 Python 39/39, Godot 45/45 모두 통과했습니다. 실제 LLM 응답으로 나이도프 오프닝과 추천 수 e2e4를 표시하는 데 12.7초, 목록에 없는 Hook mate 포지션을 에이전트가 만들어 검사를 통과시키는 데 70.7초가 걸렸습니다. 함께 보이는 그림은 불법 수 교체, 추천 수 표시, 에이전트가 만든 포지션, 비나 메이트 연습 화면입니다. 포지션 게이트는 그 포지션이 요청한 패턴과 같은 모양인지까지는 판단하지 않고, 오프닝 책 수라고 표시된 수는 규칙 검사만 거칩니다.",
    stack: ["Godot", "GDScript", "Stockfish NNUE", "Python", "FastAPI", "Cursor SDK"],
    repo: "https://github.com/buc89l2nb41/GodotNnuePromptChess",
    demo: null,
    youtube: null,
    images: ["./assets/chess/gate-demo.png", "./assets/chess/agent-recommend.png", "./assets/chess/setup-hook-agent.png", "./assets/chess/setup-kbn.png"],
  },
  {
    title: "SpriteGen",
    problem:
      "이미지 생성으로 스프라이트 칸을 한 장씩 뽑으면 칸마다 얼굴과 옷이 바뀌었습니다.",
    did: [
      "기준 캐릭터 그림 한 장을 고정하고, 영상 모델로 동작 영상을 만든 뒤 8칸으로 잘라 정렬하는 로컬 도구를 만들었습니다.",
      "동작은 세 가지로 정합니다. 문장으로 지시하거나(Kling 3), 화면의 3D 몸으로 포즈를 잡거나, 참고 영상을 따라 하게 합니다(Kling 3 Motion Control).",
      "AI 에이전트가 화면 버튼 없이 HTTP로 생성을 요청하도록 사용 규칙(AGENTS.md)을 적고, 돈이 나가는 호출은 사람이 시킬 때만 하게 했습니다.",
      "연결이 끊기거나 서버를 다시 켜도 같은 작업을 이어받게 했습니다.",
    ],
    result:
      "같은 캐릭터로 동작별 8장 스프라이트와 시트를 만듭니다. 함께 보이는 그림은 영상참고 방식으로 만든 승룡권입니다. 회색 인형 참고 영상(왼쪽)과 생성된 영상(오른쪽)을 나란히 둔 것, 8칸을 이어 붙인 애니메이션, 그 시트, 그리고 다른 참고 영상으로 다시 만든 승룡권(#22) 순서입니다. 영상 모델이 동작을 일찍 끝내면 뒤쪽 칸이 거의 같은 그림이 되고, #22처럼 중간에 캐릭터가 등을 돌리거나 배경이 남는 결과도 있습니다.",
    stack: ["TypeScript", "React", "Vite", "Three.js", "fal", "Kling 3", "ffmpeg", "sharp"],
    repo: "https://github.com/buc89l2nb41/SpriteGen",
    demo: null,
    youtube: null,
    images: ["./assets/spritegen/uppercut-reference.gif", "./assets/spritegen/uppercut.gif", "./assets/spritegen/uppercut-sheet.png", "./assets/spritegen/uppercut-22.gif"],
  },
  {
    title: "GGPO Webgame",
    game: true,
    problem:
      "AI로 뽑은 캐릭터 스프라이트를 실제 게임에 넣어 움직여 보고 싶었고, 격투 게임의 롤백 넷코드(GGPO 방식)가 어떻게 돌아가는지도 궁금했습니다.",
    did: [
      "React와 Canvas로 브라우저에서 하는 2D 격투 게임을 만들었습니다. 60FPS 고정 루프, 히트박스, 캐릭터 상태 전환이 들어 있습니다.",
      "WebRTC(PeerJS)로 두 브라우저를 직접 잇고 롤백 넷코드를 붙였습니다. 입력 지연은 2프레임, 최대 롤백은 8프레임으로 설정했습니다. 연결을 맺는 신호 서버(Node, Socket.io)는 Render에 따로 올렸습니다.",
      "Stable Diffusion으로 뽑은 스프라이트는 프레임마다 얼굴과 옷이 바뀌어 쓰지 못했고, AetherForge로 뽑은 그림을 넣었습니다. 프레임별 히트박스를 맞추는 개발용 편집기도 만들었습니다.",
    ],
    result:
      "데모에서 LOCAL PLAY를 누르면 한 키보드로 둘이 바로 해 볼 수 있습니다. 롤백 넷코드는 AI 코딩 도구와 함께 만들며 원리를 배워 간 것이라 깊이 이해하고 설계한 구현은 아니고, 실제 회선에서 롤백이 얼마나 일어나는지는 재지 않았습니다.",
    stack: ["TypeScript", "React", "Canvas", "Zustand", "WebRTC", "PeerJS", "Socket.io"],
    repo: "https://github.com/buc89l2nb41/GGPO_Webgame",
    demo: "https://ggpo-webgame.vercel.app",
    youtube: null,
    images: ["./assets/ggpo/sprite-demo.gif"],
  },
  {
    title: "Beat Mapper",
    game: true,
    problem:
      "리듬 게임 레벨은 곡을 들으며 노트를 하나씩 찍어 만들어야 합니다. AI 모델 없이 신호 처리 코드만으로 음악 파일에서 바로 플레이할 수 있는 레벨을 만들 수 있는지 해 보고 싶었습니다.",
    did: [
      "음악 파일을 브라우저에 끌어다 놓으면 Web Worker에서 온셋(spectral flux)을 찾고, 자기상관과 Viterbi로 시간에 따라 변하는 템포를 잡은 뒤 동적 계획법으로 비트를 정합니다. 서버나 API 키는 쓰지 않고, 같은 파일은 언제나 같은 레벨이 됩니다.",
      "비트 근처의 온셋만 난이도별로 골라 노트로 놓고, 그 순간 가장 센 주파수 대역으로 노트의 줄을 정합니다. 소리가 이어지는 곳은 롱노트, 센 소리가 겹치는 곳은 동시 노트가 되고, 키 하나로 하는 모드는 당김음과 마디별 세기를 따로 반영한 악보를 만듭니다.",
      "원형 궤도 3키·1키, 세로 낙하 4키, 두 음 드럼, 칸을 이어 가는 궤도 잇기까지 다섯 가지 방식으로 바로 플레이합니다. 판정은 오디오 출력 시계 기준 ms 오차로 하고, 결과 화면에 오차 분포와 오프셋 보정을 넣었습니다.",
      "비트 위치를 아는 합성 트랙 8개를 코드로 만들어 정확도와 속도를 재는 검증 스크립트를 만들고, 단순한 에너지 임계값 방식과 비교했습니다.",
    ],
    result:
      "합성 트랙 7곡 평균으로 온셋 F 99.9%(±50ms), 비트 F 99.5%(±70ms), 템포 오차 0.49%였고, 대조군은 각각 86.0%, 59.0%, 19.53%였습니다. 51.5초 데모 곡을 Chrome Web Worker에서 324ms에 분석했습니다. 함께 보이는 그림은 분석 화면, 궤도 잇기, 두 음 드럼, 원형 궤도 1키, 세로 낙하 4키, 결과 화면입니다. 분석·결과 화면은 이전 버전에서 찍은 것입니다. 이 숫자는 깨끗한 합성 트랙에서 잰 것이라 실제 음악에서의 정확도는 재지 않았고, 드럼 없는 느린 곡에서는 온셋 F가 40.6%로 떨어졌습니다.",
    stack: ["TypeScript", "Vite", "Web Audio API", "Canvas 2D", "Web Worker", "Playwright", "ffmpeg"],
    repo: "https://github.com/buc89l2nb41/BeatMapper",
    demo: "https://beat-mapper-opal.vercel.app",
    youtube: null,
    images: ["./assets/beatmapper/analysis.png", "./assets/beatmapper/path-play.png", "./assets/beatmapper/drum-play.png", "./assets/beatmapper/orbit1-play.png", "./assets/beatmapper/vertical-play.png", "./assets/beatmapper/results.png"],
  },
  {
    title: "Deck Lab",
    game: true,
    problem:
      "카드 게임은 카드 하나의 수치만 바꿔도 전체 판이 달라져서, 어떤 카드나 적이 너무 센지 사람이 여러 판을 해 보며 찾기 어렵습니다.",
    did: [
      "연금술 실험실을 배경으로 한 로그라이크 덱빌더를 만들었습니다. 카드 31장, 적 12종, 유물 13개, 13층 지도가 있고, 시드를 고정하면 같은 지도와 같은 카드 순서가 그대로 나옵니다.",
      "같은 규칙 엔진으로 봇이 판을 대신 돌리는 밸런스 시뮬레이터를 붙였습니다. 탐욕 봇은 낼 수 있는 카드를 복제한 전투 상태에 미리 적용해 보고 점수가 가장 높은 쪽을 고르며, 1만 판을 Web Worker 여러 개로 나눠 돌립니다.",
      "층별 생존, 판 길이, 카드별 승률 차이, 적별 피해량을 차트로 보여 주고, 너무 센 카드와 적을 표시해 낮출 수치를 제안합니다. 적용하면 같은 시드로 다시 돌려 조정 전후를 겹쳐 봅니다.",
      "플레이어·카드·적·조우를 화면에서 고치고, 고른 부분만 공유 링크나 파일로 나눌 수 있게 했습니다. 결과는 시드 RNG와 규칙 엔진, 봇 코드로만 나오며 AI 모델을 쓰지 않습니다.",
    ],
    result:
      "규칙 엔진 테스트 48개가 모두 통과했고, 같은 시드 1~10,000에서 Node와 Chrome의 승률이 26.63%로 같았습니다. 탐욕 봇 1만 판은 Chrome Web Worker 11개로 2.13초가 걸렸습니다. 시뮬레이터가 표시한 카드(거울 플라스크)와 적(소금 게)에 제안값을 적용하자 그 카드의 승률 차이는 +19.8%p에서 +8.9%p로, 그 적의 전투당 피해는 8.46에서 6.24로 내려갔고 전체 승률은 26.63%에서 26.26%로 거의 그대로였습니다. 함께 보이는 그림은 플레이 화면, 시뮬레이션 진행 중, 조정 전후 비교, 카드 편집입니다. 승률은 한 수 앞만 보는 봇 기준이라 사람이 했을 때의 승률은 아닙니다.",
    stack: ["TypeScript", "Vite", "Canvas 2D", "Web Worker", "Node worker_threads", "Playwright"],
    repo: "https://github.com/buc89l2nb41/DeckLab",
    demo: "https://deck-lab-khaki.vercel.app",
    youtube: null,
    images: ["./assets/decklab/play.png", "./assets/decklab/sim-running.png", "./assets/decklab/before-after.png", "./assets/decklab/edit-card.png"],
  },

  // 기타 — 한두 문장만
  {
    title: "TranslationChat",
    summary:
      "여러 언어로 보낸 말을 받는 사람의 언어로 번역해 주는 채팅입니다. 번역은 서버(Fastify)에서 Gemini API가 맡고, 한 번 번역한 문장은 서버에 저장해 다시 씁니다. Render 무료 플랜이라 첫 접속이 느릴 수 있습니다.",
    stack: ["JavaScript", "Fastify", "Gemini API"],
    repo: "https://github.com/buc89l2nb41/TranslationChat",
    demo: "https://translationchat.onrender.com",
  },
  {
    title: "AI Playlist Creator",
    summary:
      "원하는 분위기를 말하면 Gemini API로 곡 목록을 만들어 주는 웹입니다. Gemini 키가 있어야 목록이 만들어집니다.",
    stack: ["JavaScript", "Gemini API"],
    repo: "https://github.com/buc89l2nb41/AiPlaylistCreator",
    demo: "https://ai-playlist-creator-eight.vercel.app",
  },
  {
    title: "PersonaChat",
    summary:
      "정해 둔 성격으로 대화하는 채팅입니다. 화면은 Vercel에 올렸고, 답을 만드는 대화 서버(Bun · Hono)는 따로 만들었습니다.",
    stack: ["TypeScript", "Bun", "Hono"],
    repo: "https://github.com/buc89l2nb41/PersonaChat",
    demo: "https://persona-chat-gamma.vercel.app",
    links: [
      { label: "클라이언트 GitHub", href: "https://github.com/buc89l2nb41/PersonaChat" },
      { label: "서버 GitHub", href: "https://github.com/buc89l2nb41/PersonaChatServer" },
    ],
  },
  {
    title: "Apple Game Solver",
    summary:
      "사과 게임 화면의 숫자 칸을 읽고, 합이 10이 되는 칸을 찾아 지우는 프로그램입니다. Playwright로 브라우저를 처음 조작해 본 작업입니다.",
    stack: ["JavaScript", "Playwright"],
    repo: "https://github.com/buc89l2nb41/AppleGameSolver",
    demo: null,
  },
  {
    title: "Count The Fingers Solver",
    summary:
      "손가락 개수 퀴즈를 읽고 답을 눌러 주는 프로그램입니다. Apple Game Solver와 같은 시기에 Playwright 연습으로 만들었습니다.",
    stack: ["JavaScript", "Playwright"],
    repo: "https://github.com/buc89l2nb41/CountTheFingerSolver",
    demo: null,
  },

  // 숨김 — 사이트에 안 나옵니다
  {
    title: "FBNeo Agent",
    hidden: true,
    summary:
      "아케이드 에뮬레이터 FBNeo를 고쳐 AI가 화면 캡처, 입력, 메모리 읽기를 할 수 있게 만든 작업입니다. 레포가 비공개라 숨겨 둡니다.",
    stack: ["C++", "FBNeo", "Shared Memory", "Python"],
    repo: null,
  },
  {
    title: "AgentPlay",
    hidden: true,
    summary:
      "FBNeo Agent 위에서 사람이 훈수를 넣으면 AI가 게임을 플레이하는 실험입니다. 미완이고 레포가 비공개입니다.",
    stack: ["Python", "Gradio"],
    repo: null,
  },
  {
    title: "Pocketbase Board",
    hidden: true,
    summary: "PocketBase에 글을 저장하는 게시판입니다. AI·자동화와 관련이 적어 숨겨 둡니다.",
    stack: ["TypeScript", "PocketBase"],
    repo: "https://github.com/buc89l2nb41/PocketbaseBoard",
    demo: "https://pocketbase-board.vercel.app",
  },
  {
    title: "ModelToSprite",
    hidden: true,
    summary: "리깅된 3D 모델로 포즈를 잡아 스프라이트를 만들려던 도구입니다. 미완이고 레포가 비공개입니다.",
    stack: ["TypeScript", "Three.js"],
    repo: null,
  },
  {
    title: "Cadillacs Capture",
    hidden: true,
    summary: "FBNeo로 원작 화면을 캡처해 Godot과 연동해 본 실험입니다. 미완이고 레포가 비공개입니다.",
    stack: ["Godot", "FBNeo"],
    repo: null,
  },
  {
    title: "DiffusionGen",
    hidden: true,
    summary: "Stable Diffusion으로 같은 캐릭터의 스프라이트를 뽑으려던 실험입니다. 결과가 일정하지 않아 숨겨 둡니다.",
    stack: ["Python", "ComfyUI", "LoRA"],
    repo: null,
  },
];
