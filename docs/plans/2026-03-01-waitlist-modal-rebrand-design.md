# Waitlist Modal Rebrand — Design

**Date:** 2026-03-01
**File:** `components/ui/BookingModal.tsx`

## Goal

Rebrand the booking modal from "Book a Slot" to a waitlist signup so users understand they are joining a queue, not confirming an immediate booking.

## Changes

| Location | Before | After |
|---|---|---|
| Header `<h2>` | "Book a Slot" | "Join the Waitlist" |
| New subtitle under `<h2>` | *(none)* | "We'll reach out as spots open up." |
| Submit button | "Submit" / "Submitting…" | "Join Waitlist" / "Joining…" |
| Success `<h3>` | "You're all set!" | "You're on the waitlist!" |
| Success `<p>` | "We'll be in touch soon to confirm your slot." | "We'll be in touch as spots open up." |

## Notes

- No structural or layout changes — string edits only, plus one new `<p>` subtitle element in the header.
- Subtitle styled `text-sm text-gray-500` to keep it visually subordinate to the title.
