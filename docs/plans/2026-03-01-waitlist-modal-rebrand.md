# Waitlist Modal Rebrand Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebrand the booking modal from "Book a Slot" to a waitlist signup with updated copy throughout.

**Architecture:** Text-only edits plus one new subtitle element in `BookingModal.tsx`. No logic, data, or structural changes.

**Tech Stack:** React 19, TypeScript, Tailwind CSS

---

### Task 1: Update modal header

**Files:**
- Modify: `components/ui/BookingModal.tsx:175-184`

**Step 1: Change the `<h2>` text and add subtitle**

Locate the header `<div>` (line ~175). Replace:

```tsx
<h2 id="booking-modal-title" className="text-xl font-bold" style={{ color: '#282239' }}>Book a Slot</h2>
```

With:

```tsx
<div>
  <h2 id="booking-modal-title" className="text-xl font-bold" style={{ color: '#282239' }}>Join the Waitlist</h2>
  <p className="text-sm text-gray-500 mt-0.5">We'll reach out as spots open up.</p>
</div>
```

**Step 2: Verify in browser**

Run: `bun run dev`
Open the modal — header should read "Join the Waitlist" with subtitle below it.

**Step 3: Commit**

```bash
git add components/ui/BookingModal.tsx
git commit -m "feat: rebrand booking modal header to waitlist signup"
```

---

### Task 2: Update submit button copy

**Files:**
- Modify: `components/ui/BookingModal.tsx:240-248`

**Step 1: Change button labels**

Locate the submit `<Button>` (line ~247). Replace:

```tsx
{isSubmitting ? 'Submitting…' : 'Submit'}
```

With:

```tsx
{isSubmitting ? 'Joining…' : 'Join Waitlist'}
```

**Step 2: Commit**

```bash
git add components/ui/BookingModal.tsx
git commit -m "feat: update booking modal submit button to waitlist copy"
```

---

### Task 3: Update success screen copy

**Files:**
- Modify: `components/ui/BookingModal.tsx:67-81`

**Step 1: Change `SuccessView` text**

Replace:

```tsx
<h3 className="text-xl font-bold" style={{ color: '#282239' }}>You're all set!</h3>
<p className="text-gray-600">We'll be in touch soon to confirm your slot.</p>
```

With:

```tsx
<h3 className="text-xl font-bold" style={{ color: '#282239' }}>You're on the waitlist!</h3>
<p className="text-gray-600">We'll be in touch as spots open up.</p>
```

**Step 2: Verify in browser**

Submit the form — success screen should read "You're on the waitlist!"

**Step 3: Commit**

```bash
git add components/ui/BookingModal.tsx
git commit -m "feat: update booking modal success screen to waitlist copy"
```
