#!/usr/bin/env node
// scripts/tsc.mjs — the `tsc` behind `typecheck`: TypeScript 7, the native
// compiler, where its binary is installed; else the package's own TypeScript.
//
// The binary arrives as the root optionalDependencies
// @typescript/typescript-{win32,linux}-x64. They add no `tsc` command, so
// `next build`, editors and `npx tsc` stay on the TypeScript in package.json.
// Same errors, several times sooner (measured 2026-11-11 against the repo's
// own TypeScript; ported from kareemhady #4066). Arguments go to tsc as given.
//
//   TYPECHECK_TS=5   the package's own TypeScript even where 7 is installed
//
// TypeScript 7 exits 1 for type errors (2 is a crash); 5 and 6 exit 2.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

function nativeTsc() {
  if (process.env.TYPECHECK_TS === '5') return null;
  try {
    const pkg = createRequire(import.meta.url).resolve(`@typescript/typescript-${process.platform}-${process.arch}/package.json`);
    const exe = path.join(path.dirname(pkg), 'lib', process.platform === 'win32' ? 'tsc.exe' : 'tsc');
    return existsSync(exe) ? exe : null;
  } catch {
    return null;
  }
}

const args = process.argv.slice(2);
const native = nativeTsc();
const run = native
  ? spawnSync(native, args, { stdio: 'inherit' })
  : spawnSync(process.execPath, [createRequire(path.join(process.cwd(), 'package.json')).resolve('typescript/bin/tsc'), ...args], { stdio: 'inherit' });
if (run.error) throw run.error;
process.exit(run.status ?? 1);
