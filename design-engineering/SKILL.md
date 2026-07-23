---
name: design-engineering
description: A collection of design-engineering skills for building, reviewing, and auditing UI animations and interface motion, distilled from Emil Kowalski's animation philosophy (animations.dev). Covers when (and when not) to animate, easing curves and duration budgets, spring physics, Apple fluid-interface design principles, an animation-terminology glossary, rigorous animation review, whole-codebase motion audits with hand-off implementation plans, finding animation opportunities, and picking trustworthy UI libraries. Use this skill when building or refining UI animations and micro-interactions, choosing easing/duration, reviewing or auditing motion code, deciding whether something should animate at all, naming an animation effect, applying Apple design principles, or selecting a frontend library (toasts, command menus, charts, drag-and-drop, etc.).
license: MIT
metadata:
  author: skills
  version: 1.0.0
  source: emilkowalski/skills
---

# Design Engineering

A router-style collection of **design-engineering skills for animation and interface craft**, integrated from [emilkowalski/skills](https://github.com/emilkowalski/skills) ("Skills for Design Engineers"). It bundles 7 sub-skills covering the full motion lifecycle — deciding whether to animate, building it well, reviewing it, auditing a whole codebase, and picking the right tools — all grounded in Emil Kowalski's philosophy from [animations.dev](https://animations.dev) and [emilkowal.ski](https://emilkowal.ski/).

> The guiding principle is **restraint**: the best animation is often no animation. Motion must earn its place by serving a purpose, and the more often a user sees it, the shorter and subtler it must be.

## When to Use

Reach for this skill when:

- Building or refining UI animations, transitions, or micro-interactions
- Choosing easing curves, durations, spring configs, or `transform-origin`
- Deciding whether an element should animate **at all** (frequency-based judgment)
- Reviewing a diff of animation/motion code against a high craft bar
- Auditing a whole codebase's motion and producing prioritized fix plans
- Sweeping an interface for places that *should* animate but don't
- Naming a vague motion effect ("what's it called when…?")
- Applying Apple-style fluid interface and design principles
- Picking a trustworthy frontend library (toasts, command menus, charts, drag-and-drop, state, styling…)

## Sub-Skills (router)

Route to the reference that matches the task. Each is a faithful copy of a source skill.

| # | Sub-skill | Use it for | Reference |
|---|-----------|-----------|-----------|
| 1 | **emil-design-eng** | The core skill: animation + design advice, decision frameworks, easing/duration, springs, CSS mastery, gestures, performance, accessibility | [references/emil-design-eng.md](references/emil-design-eng.md) |
| 2 | **apple-design** | Apple's interface and fluid-motion design principles | [references/apple-design.md](references/apple-design.md) |
| 3 | **animation-vocabulary** | Reverse-lookup glossary: turn a vague description into the exact motion term | [references/animation-vocabulary.md](references/animation-vocabulary.md) |
| 4 | **find-animation-opportunities** | Search a UI for places that don't animate but should (read-only, ruthless filter) | [references/find-animation-opportunities.md](references/find-animation-opportunities.md) |
| 5 | **review-animations** | Rigorously review animation/motion code against ten non-negotiable standards | [references/review-animations.md](references/review-animations.md) → standards: [references/review-animations-standards.md](references/review-animations-standards.md) |
| 6 | **improve-animations** | Audit a whole codebase's motion and write self-contained implementation plans | [references/improve-animations.md](references/improve-animations.md) → [audit](references/improve-animations-audit.md) · [plan template](references/improve-animations-plan-template.md) |
| 7 | **pick-ui-library** | Recommend a curated, opinionated frontend library for a given task | [references/pick-ui-library.md](references/pick-ui-library.md) |

## How to Use

1. **Identify the task** — building, naming, reviewing, auditing, hunting for opportunities, applying design principles, or picking a library.
2. **Route to the matching sub-skill** in the table above and open its reference file.
3. **Pull exact values, never approximate.** When a finding or suggestion needs a curve, duration, or spring config, cite the precise value from [review-animations-standards.md](references/review-animations-standards.md) or [improve-animations-audit.md](references/improve-animations-audit.md).
4. **Default to restraint.** If motion doesn't clearly serve a purpose at its frequency tier, the strongest move is to delete it.

## Quick Reference (core animation rules)

- **Should it animate?** 100+/day (keyboard shortcuts, command palette) → **never**. Tens/day → reduce drastically. Occasional (modals, drawers, toasts) → standard. Rare/first-time → delight is allowed.
- **Easing:** entering/exiting → `ease-out`; on-screen movement → `ease-in-out`; hover/color → `ease`; constant motion → `linear`. **Never `ease-in` on UI** — it delays the moment the user watches most. Built-in CSS easings are too weak; use strong custom curves (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`).
- **Duration:** UI animations stay **under 300ms** (press feedback 100–160ms, tooltips 125–200ms, dropdowns 150–250ms, modals/drawers 200–500ms).
- **Physicality:** never `scale(0)` — start from `scale(0.9–0.97)` + `opacity: 0`. Popovers/dropdowns/tooltips scale from their trigger (`transform-origin`), not center; modals are exempt.
- **Interruptibility:** rapidly-triggered or gesture motion (toasts, toggles, drags) uses CSS transitions or springs, not keyframes that restart from zero.
- **Performance:** animate `transform` and `opacity` only. Avoid `transition: all` and animating layout properties (`width`/`height`/`margin`/`top`/`left`).
- **Accessibility:** honor `prefers-reduced-motion` (gentler, not zero); gate hover motion behind `@media (hover: hover) and (pointer: fine)`.
- **Asymmetric timing:** deliberate actions (press, hold, destructive confirm) animate slower; system responses snap.
- **Polish:** stagger group entrances 30–80ms; use half-transparent shadows over solid borders; mask imperfect crossfades with a subtle `filter: blur(2px)`.

## Source & Attribution

All sub-skills are faithfully integrated from [emilkowalski/skills](https://github.com/emilkowalski/skills) by Emil Kowalski. Each reference file retains a header noting its source skill. See [README.md](README.md) for the Chinese-language overview.
