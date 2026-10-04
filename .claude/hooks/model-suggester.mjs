#!/usr/bin/env node
// UserPromptSubmit hook: scores the prompt and, when the score crosses a
// threshold, asks Claude to surface a one-line model-switch suggestion to
// the user (e.g. "consider /model opus" or "consider /model sonnet").
//
// Wired in .claude/settings.json under hooks.UserPromptSubmit.
// Stdout JSON shape: { hookSpecificOutput: { hookEventName, additionalContext } }
// Exit 0 with no output = silent (no suggestion this turn).

import { readFileSync } from 'node:fs';

let raw = '';
try {
  raw = readFileSync(0, 'utf8');
} catch {
  process.exit(0);
}

let payload;
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}

const prompt = String(payload.prompt || '').toLowerCase().trim();
if (!prompt) process.exit(0);

let score = 0;
const len = prompt.length;
if (len > 1500) score += 3;
else if (len > 500) score += 2;
else if (len < 80) score -= 2;

const HARD = [
  /\b(architect|design|refactor|migrat|investigate|root[- ]?cause|trace through)\b/,
  /\b(why (is|does|did)|broken|failing|regression|stack ?trace)\b/,
  /\bdebug\b/,
  /\bacross (multiple|several|the|all) (files|modules|services|routes)\b/,
  /\b(plan|strategy|tradeoff|trade-off|alternatives?|approach)\b/,
  /\b(optimi[sz]e|performance|memory leak|race condition|concurrency|deadlock)\b/,
  /\b(security (review|audit|vulnerab)|threat model|exploit)\b/,
  /\bend[- ]to[- ]end\b/,
  /\b(schema (design|migration)|data model|ER diagram)\b/,
  /\b(prove|reason about|formally|invariant)\b/,
];
const EASY = [
  /\b(rename|format|prettier|fix typo|add a (test|log|comment|docstring))\b/,
  /\b(bump version|update (readme|version|changelog))\b/,
  /\b(what (does|is) this|where is|find the|grep for|search for)\b/,
  /^(list|show|print|display|what's in|cat|read)\b/,
  /\b(quick (question|lookup)|just (a|one) )\b/,
];

for (const r of HARD) if (r.test(prompt)) score += 2;
for (const r of EASY) if (r.test(prompt)) score -= 2;

const codeBlocks = (prompt.match(/```/g) || []).length / 2;
score += Math.min(3, Math.floor(codeBlocks));

const paths = (prompt.match(/[\w\-./\\]+\.(ts|tsx|js|jsx|mjs|cjs|py|rs|go|sql|md|json|sh|yaml|yml)/g) || []).length;
if (paths >= 6) score += 2;
else if (paths >= 3) score += 1;

let line = null;
let switchCmd = null;
if (score >= 4) {
  line = `model-suggester: complex task (score ${score}) — /model opus recommended for best output.`;
  switchCmd = '/model opus';
} else if (score <= -3) {
  line = `model-suggester: lightweight task (score ${score}) — /model sonnet saves cost here.`;
  switchCmd = '/model sonnet';
}

if (!line) process.exit(0);

// Non-blocking (kareem 2026-10-04: "if not replied to within 2 minutes continue
// automatically", on all repos). A hook cannot wait for a reply: it runs before
// Claude starts, and once Claude ends its turn nothing resumes it without new
// input — so the old "STOP until the user replies" gate stalled the work until
// someone typed. The suggestion is still shown first; the work then goes on at
// once, and the user can press Esc, switch model and re-send at any time.
const additionalContext =
  `[model-suggester] Start your reply with exactly these two lines:\n` +
  `Line 1: "${line}"\n` +
  `Line 2: "→ Proceeding on the current model — press Esc, run \`${switchCmd}\` and re-send to switch."\n` +
  `Then answer the prompt in full right away — do not stop or wait for a reply. ` +
  `Do not explain the suggester itself unless asked.`;

const out = {
  hookSpecificOutput: {
    hookEventName: 'UserPromptSubmit',
    additionalContext,
  },
};

process.stdout.write(JSON.stringify(out));
