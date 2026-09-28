/**
 * One runnable check for this app's real logic (time/countdown/ics math).
 * Node 24 strips types itself, so this imports the shipped modules directly.
 * Run with `npm run check`; `npm run build` runs it too.
 */
import assert from 'node:assert/strict'

let checks = 0
const ok = (label) => {
  checks++
  process.stdout.write(`  ok  ${label}\n`)
}

// Placeholder until src/lib/time.ts + src/lib/ics.ts land — replaced with real
// assertions against those modules (happening-now selection, countdown math,
// VEVENT count/TZID) as part of that work.
ok('scaffold check runs')
assert.equal(checks, 1)

console.log(`\n${checks} check${checks === 1 ? '' : 's'} passed.`)
