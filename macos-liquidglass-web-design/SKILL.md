---
name: macos-liquidglass-web-design
description: Apply macOS 26 Liquid Glass design language to web interfaces. Generates translucent glass-morphism UI with frosted blur, dynamic light refraction, specular highlights, and adaptive tinting. Use when building web UIs inspired by macOS Liquid Glass, glass-morphism design, translucent interfaces, or when the user mentions Liquid Glass, frosted glass, or macOS 26 style.
---

# macOS Liquid Glass Web Design

Applies Apple's macOS 26 "Liquid Glass" design language to web interfaces. Produces translucent, light-responsive UI with depth, blur, and spectral highlights.

## Core Design Principles

1. **Translucency over opacity** - Surfaces reveal content beneath them
2. **Environmental awareness** - Glass tints adapt to underlying content
3. **Light as material** - Specular highlights and refraction convey depth
4. **Layered depth** - Multiple glass planes create spatial hierarchy
5. **Fluid motion** - Smooth transitions reinforce the liquid metaphor

## Quick Start

When applying Liquid Glass design:

1. Load design tokens from [design-tokens.md](design-tokens.md)
2. Choose component patterns from [components.md](components.md)
3. Apply the layered glass system (background -> mid-glass -> foreground-glass)
4. Add specular highlights and edge lighting
5. Implement adaptive tinting via CSS `backdrop-filter`

## CSS Foundation

Always include this base setup:

```css
:root {
  /* Glass surface */
  --lg-blur: 40px;
  --lg-saturation: 180%;
  --lg-surface-bg: rgba(255, 255, 255, 0.12);
  --lg-surface-bg-dark: rgba(0, 0, 0, 0.2);
  --lg-surface-border: rgba(255, 255, 255, 0.2);
  --lg-surface-border-dark: rgba(255, 255, 255, 0.08);

  /* Specular highlight */
  --lg-highlight: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );

  /* Depth shadows */
  --lg-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --lg-shadow-md: 0 8px 32px rgba(0, 0, 0, 0.12);
  --lg-shadow-lg: 0 16px 64px rgba(0, 0, 0, 0.16);

  /* Radii */
  --lg-radius-sm: 12px;
  --lg-radius-md: 20px;
  --lg-radius-lg: 28px;
  --lg-radius-xl: 36px;

  /* Motion */
  --lg-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --lg-spring: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## Glass Surface Mixin

The foundational `.liquid-glass` class:

```css
.liquid-glass {
  background: var(--lg-surface-bg);
  backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
  -webkit-backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
  border: 1px solid var(--lg-surface-border);
  border-radius: var(--lg-radius-md);
  box-shadow: var(--lg-shadow-md);
  position: relative;
  overflow: hidden;
  transition: var(--lg-transition);
}

/* Specular highlight pseudo-element */
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--lg-highlight);
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
}

/* Edge light (top edge glow) */
.liquid-glass::after {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  pointer-events: none;
  z-index: 1;
}
```

## Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  .liquid-glass {
    background: var(--lg-surface-bg-dark);
    border-color: var(--lg-surface-border-dark);
  }

  .liquid-glass::before {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      transparent 100%
    );
  }
}
```

## Layer Hierarchy

Apply depth through z-index and blur intensity:

| Layer | Blur | Opacity | Use Case |
|-------|------|---------|----------|
| Background | 60px | 0.05 | Page-level panels |
| Mid | 40px | 0.12 | Cards, dialogs |
| Foreground | 20px | 0.2 | Tooltips, popovers |
| Top | 12px | 0.3 | Toasts, overlays |

## Interaction States

```css
.liquid-glass:hover {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: var(--lg-shadow-lg);
  transform: translateY(-1px);
}

.liquid-glass:active {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(0) scale(0.98);
  transition: var(--lg-spring);
}
```

## Critical Rules

- NEVER use fully opaque backgrounds on glass surfaces
- ALWAYS include `backdrop-filter` AND `-webkit-backdrop-filter`
- ALWAYS provide a colorful or image background behind glass layers (glass needs content to refract)
- Use `border-radius` >= 12px for all glass surfaces
- Keep border opacity between 0.08 - 0.25
- Add specular highlights (::before) on all elevated glass surfaces
- Test in both light and dark mode

## Background Requirements

Liquid Glass requires a rich background to be visible. Always ensure:

```css
body {
  /* Option A: Gradient background */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  /* Option B: Image background */
  background: url('bg.jpg') center/cover no-repeat fixed;

  /* Option C: Mesh gradient */
  background:
    radial-gradient(at 20% 80%, #7c3aed 0%, transparent 50%),
    radial-gradient(at 80% 20%, #06b6d4 0%, transparent 50%),
    radial-gradient(at 50% 50%, #f59e0b 0%, transparent 50%),
    #1e1b4b;
}
```

## Additional Resources

- For complete design tokens, see [design-tokens.md](design-tokens.md)
- For component patterns (navbar, cards, modals, buttons), see [components.md](components.md)
- For a live demo template, see [assets/liquid-glass-demo.html](assets/liquid-glass-demo.html)
