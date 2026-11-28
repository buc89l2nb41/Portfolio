// 사이트를 배포하기 전에 돌리는 검사입니다.
// 로컬: node scripts/check-site.mjs
// GitHub Actions: .github/workflows/pages.yml 이 push마다 돌립니다.
//
// 검사 항목
// 1. JS 문법 (node --check)
// 2. 금지어: mock 이미지 경로, 그리고 FORBIDDEN_WORDS 환경변수의 단어 (회사 이름, 자리표시 영상 ID 등)
//    (FORBIDDEN_WORDS는 레포 Secret으로 넣습니다. 단어 자체를 공개 파일에 적지 않기 위해서입니다.)
// 3. projects.js의 이미지 경로와 index.html·work.html이 부르는 파일이 실제로 있는지
// 4. 사이트에 나오는 작업(hidden이 아닌 것)에 repo 링크가 있는지
// 5. 케이스 스터디가 있는 작업의 slug 중복, oneLine, didTitles 개수

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "work.html"];
const publicFiles = [...pages, "projects.js", "site.js", "site.css", "README.md", "CLAUDE.md"];
const scripts = ["projects.js", "site.js"];
const problems = [];

const read = (file) => readFileSync(join(root, file), "utf8");

// 1. JS 문법
for (const file of scripts) {
  try {
    execFileSync(process.execPath, ["--check", join(root, file)], { stdio: "pipe" });
  } catch (error) {
    problems.push(`${file}: 문법 오류\n${String(error.stderr || error.message).trim()}`);
  }
}

// 2. 금지어
const fixedWords = ["assets/mock"];
const secretWords = String(process.env.FORBIDDEN_WORDS || "")
  .split(/[\n,]/)
  .map((word) => word.trim())
  .filter(Boolean);

for (const file of publicFiles) {
  const text = read(file).toLowerCase();
  fixedWords.forEach((word) => {
    if (text.includes(word.toLowerCase())) problems.push(`${file}: 금지어 "${word}"가 들어 있습니다.`);
  });
  // Secret 단어는 로그에 남기지 않고 번호만 알립니다.
  secretWords.forEach((word, index) => {
    if (text.includes(word.toLowerCase())) problems.push(`${file}: FORBIDDEN_WORDS의 ${index + 1}번째 단어가 들어 있습니다.`);
  });
}

// 3. 파일 경로
const sandbox = { window: {} };
try {
  vm.runInNewContext(read("projects.js"), sandbox);
} catch (error) {
  problems.push(`projects.js를 실행하지 못했습니다: ${error.message}`);
}
const projects = sandbox.window.projects || [];

for (const project of projects) {
  for (const image of project.images || []) {
    if (!existsSync(join(root, image))) problems.push(`${project.title}: 이미지가 없습니다 → ${image}`);
  }
}

for (const page of pages) {
  for (const match of read(page).matchAll(/(?:src|href)="\.\/([^"?#]+)/g)) {
    if (!existsSync(join(root, match[1]))) problems.push(`${page}: 파일이 없습니다 → ${match[1]}`);
  }
}

// 4. 레포 링크 규칙
for (const project of projects) {
  if (!project.hidden && !project.repo) {
    problems.push(`${project.title}: 사이트에 나오는데 repo가 없습니다. 숨기려면 hidden: true를 넣으세요.`);
  }
}

// 5. 케이스 스터디 칸
const slugs = new Set();
for (const project of projects.filter((p) => !p.hidden && p.slug)) {
  if (slugs.has(project.slug)) problems.push(`${project.title}: slug "${project.slug}"가 겹칩니다.`);
  slugs.add(project.slug);
  if (!project.oneLine) problems.push(`${project.title}: oneLine이 없습니다.`);
  if (project.didTitles && project.didTitles.length !== (project.did || []).length) {
    problems.push(`${project.title}: didTitles(${project.didTitles.length})와 did(${(project.did || []).length}) 개수가 다릅니다.`);
  }
}

if (problems.length) {
  console.error(`검사 실패 ${problems.length}건\n`);
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

const shown = projects.filter((project) => !project.hidden).length;
console.log(
  `검사 통과: 작업 ${shown}개 표시, 숨김 ${projects.length - shown}개, ` +
    `금지어 ${fixedWords.length + secretWords.length}개 확인` +
    (secretWords.length ? "" : " (FORBIDDEN_WORDS 없음)"),
);
