/**
 * Plain-module check for lib/time.ts — no test framework, matches the
 * project's one-runnable-check strategy (docs/ARCHITECTURE.md "Testing
 * strategy"). `runTimeChecks()` is imported and invoked by
 * scripts/check.mjs; it throws on the first failing assertion (via
 * node:assert/strict) and otherwise returns the labels it passed.
 *
 * DST boundary math worked out by hand (Victoria's AEDT starts 2am Sun
 * 4 Oct 2026, so Sun items are +11:00 while Fri/Sat are +10:00):
 *   - Sunday breakfast: iso 2026-10-04T09:00:00+11:00, durationMin 120
 *     -> UTC start = 09:00 - 11:00 = 2026-10-03T22:00:00Z, end 00:00:00Z.
 *   - Sunday "Late morning" walk: iso 2026-10-04T11:00:00+11:00
 *     -> UTC start = 11:00 - 11:00 = 2026-10-04T00:00:00Z.
 *   These are back-to-back with no gap, so the instant exactly at
 *   00:00:00Z is a clean boundary: breakfast's window is exclusive of it
 *   (correct), the walk's window is inclusive of it (correct) — getting
 *   the +11:00 offset wrong by even reading it as +10:00 would shift
 *   both windows an hour later and break this exact boundary.
 */
/// <reference types="node" />
import assert from 'node:assert/strict'
import { getHappeningNow, getUpNext, getCountdown } from './time.ts'

export function runTimeChecks(): string[] {
  const passed: string[] = []
  const check = (label: string, run: () => void) => {
    run()
    passed.push(label)
  }

  check('happening-now inside the Friday BBQ window (19:00-20:30 +10:00) returns the BBQ item', () => {
    const result = getHappeningNow(new Date('2026-10-02T19:30:00+10:00'))
    assert.ok(result, 'expected a happening-now result')
    assert.equal(result?.day.id, 'fri')
    assert.equal(result?.item.text, '🍕 BBQ at the house')
  })

  check('happening-now in the untimed gap between BBQ (ends 20:30) and Games (starts 21:00) returns null', () => {
    // "🍸 Drinks" has no iso/durationMin — a sub-bullet, never "now" on its own.
    // Chosen null semantics: no active window at all means null, not the nearest prior item.
    assert.equal(getHappeningNow(new Date('2026-10-02T20:45:00+10:00')), null)
  })

  check('happening-now during the Saturday midnight cake window (still +10:00, pre-DST-switch) returns the cake item', () => {
    const result = getHappeningNow(new Date('2026-10-04T00:15:00+10:00'))
    assert.ok(result)
    assert.equal(result?.day.id, 'sat')
    assert.equal(result?.item.text, '🎂 Birthday cake')
  })

  check('happening-now at the literal UTC instant 2026-10-03T22:30:00Z lands inside the +11:00 Sunday breakfast window', () => {
    // This instant is 2026-10-04T09:30:00+11:00 local. A code path that wrongly
    // treated the Sunday item as +10:00 would compute its window as starting an
    // hour later (23:00Z) and miss this instant entirely, returning null instead.
    const result = getHappeningNow(new Date('2026-10-03T22:30:00Z'))
    assert.ok(result, 'expected the Sunday breakfast item, got null — DST offset likely mishandled')
    assert.equal(result?.day.id, 'sun')
    assert.equal(result?.item.text, 'No alarms. 🥞 Big breakfast. Coffee. Leftover cake.')
  })

  check('happening-now exactly at 2026-10-04T00:00:00Z rolls over from breakfast to the next Sunday item, not null', () => {
    const result = getHappeningNow(new Date('2026-10-04T00:00:00Z'))
    assert.ok(result, 'expected the walk item at the exact boundary, got null')
    assert.equal(result?.day.id, 'sun')
    assert.equal(result?.item.text, 'Walk / explore. Then one last little adventure before we head home.')
  })

  check('getCountdown exactly one day before the target returns days=1 and isPast=false', () => {
    // Target 2026-10-02T09:30:00+10:00 === 2026-10-01T23:30:00Z.
    const c = getCountdown(new Date('2026-09-30T23:30:00Z'))
    assert.equal(c.days, 1)
    assert.equal(c.hours, 0)
    assert.equal(c.minutes, 0)
    assert.equal(c.seconds, 0)
    assert.equal(c.isPast, false)
  })

  check('getCountdown after the target returns isPast=true', () => {
    const c = getCountdown(new Date('2026-10-01T23:30:01Z'))
    assert.equal(c.isPast, true)
  })

  check('getUpNext before Friday returns the first Friday item, the Richmond meet-up', () => {
    const result = getUpNext(new Date('2026-10-02T08:00:00+10:00'))
    assert.ok(result)
    assert.equal(result?.day.id, 'fri')
    assert.equal(result?.item.text, 'Meet at 106, 6 Lord Street, Richmond')
  })

  return passed
}
