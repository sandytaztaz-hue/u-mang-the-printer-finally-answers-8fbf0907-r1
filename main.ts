// The Printer Finally Answers — round 1 entry.
// A one-line comeback spoken by the office printer itself.
// The program writes the line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Plain Node 22, standard library only, no network, same output every run.
//
// The line follows the leaders' shape without copying any of them:
// one job-log detail the machine would actually know (sheet 6,311, tray 3),
// one deliberate act (jammed on purpose), and the twist landing last
// (40 pages of a meeting that could have been an email) — the machine
// finally talks back instead of just blinking an error code. 119 characters,
// one line, first person, printer's voice throughout.

import * as fs from "node:fs";
import * as path from "node:path";

const SHEET = 6311;
const TRAY = 3;
const PAGES = 40;

const LINE = `Sheet ${SHEET.toLocaleString("en-US")}, tray ${TRAY}: I jammed on purpose — you were about to print ${PAGES} pages of a meeting that could have been an email.`;

function checkLine(text: string): void {
  const problems: string[] = [];
  if (text.length < 1 || text.length > 240) {
    problems.push(`length ${text.length} is outside 1-240`);
  }
  if (/\r|\n/.test(text)) {
    problems.push("the entry must stay on one line");
  }
  if (text.trim() !== text) {
    problems.push("no leading or trailing space allowed");
  }
  if (problems.length > 0) {
    throw new Error(problems.join("; "));
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
checkLine(LINE);
const target = path.join(outDir, "entry.txt");
fs.writeFileSync(target, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${target}`);
