/**
 * One runnable check for this app's real logic (time/countdown/ics math).
 * Node 24 strips types itself, so this imports the shipped modules directly.
 * Run with `npm run check`; `npm run build` runs it too.
 */
import assert from 'node:assert/strict'
import { runTimeChecks } from '../src/lib/time.test.ts'
import { buildIcsString } from '../src/lib/ics.ts'
import { itinerary } from '../src/content.ts'

let checks = 0
const ok = (label) => {
  checks++
  process.stdout.write(`  ok  ${label}\n`)
}

for (const label of runTimeChecks()) ok(label)

// ics.ts: event count matches timed itinerary items, well-formed VEVENTs,
// no bare (unescaped-by-omission) TZID needed since output is UTC.
{
  const ics = buildIcsString()
  const expectedEvents = itinerary.flatMap((d) => d.items).filter((i) => i.iso && i.durationMin).length
  const veventCount = (ics.match(/BEGIN:VEVENT/g) || []).length
  assert.equal(veventCount, expectedEvents)
  ok(`ics has one VEVENT per timed itinerary item (${veventCount})`)

  assert.ok(ics.startsWith('BEGIN:VCALENDAR'))
  assert.ok(ics.trim().endsWith('END:VCALENDAR'))
  ok('ics wraps events in a single well-formed VCALENDAR')

  assert.ok(/DTSTART:\d{8}T\d{6}Z/.test(ics))
  assert.ok(/DTEND:\d{8}T\d{6}Z/.test(ics))
  ok('ics events have UTC DTSTART/DTEND')
}

console.log(`\n${checks} check${checks === 1 ? '' : 's'} passed.`)
