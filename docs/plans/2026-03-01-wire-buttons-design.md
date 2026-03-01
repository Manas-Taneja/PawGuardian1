# Wire Non-Functional Buttons — Design

**Date:** 2026-03-01

## Problem

Nine buttons across the site have no `onClick` handler and do nothing when clicked.

## Approach

Lift `BookingModal` and its `isBookingOpen` state from `Navbar` up to `App.tsx`. Pass an `openBooking` callback and `navigate` as props to every component that needs them. Single modal instance shared site-wide.

## Architecture Changes

### App.tsx
- Add `const [isBookingOpen, setIsBookingOpen] = useState(false)`
- Add `<BookingModal>` render at App level (remove from Navbar)
- Pass `openBooking={() => setIsBookingOpen(true)}` to Hero, Plans, AboutUs, Services
- Pass `navigate` to Hero and Plans (currently receive neither)
- Pass `onOpenBooking` to Navbar (Navbar's own "Book a Slot" button still works)

### Navbar.tsx
- Remove `isBookingOpen` state and `<BookingModal>` render
- Accept `onOpenBooking: () => void` prop; pass to "Book a Slot" button

### Services.tsx
- Add `id="services-plans"` to the Services Grid `<section>` (line ~444)

## Button Wiring

| Button | Component | Action |
|---|---|---|
| "Join the Waitlist" | `Hero` | `onOpenBooking()` |
| "View Dog Plans" | `Plans` | `navigate('services')` |
| "View Cat Plans" | `Plans` | `navigate('services')` |
| "Join the Waitlist" | `AboutUs` | `onOpenBooking()` |
| "View Our Plans" | `AboutUs` | `navigate('services')` |
| "Book a Service" | `Services` hero | `onOpenBooking()` |
| "View Plans & Pricing" | `Services` hero | scroll to `#services-plans` |
| "Book a Home Visit" | `Services` CTA | `onOpenBooking()` |
| "Explore Subscription Plans" | `Services` CTA | scroll to `#services-plans` |

## Files Touched

- `App.tsx`
- `components/Layout/Navbar.tsx`
- `components/Sections/Hero.tsx`
- `components/Sections/Plans.tsx`
- `components/Pages/AboutUs.tsx`
- `components/Pages/Services.tsx`
