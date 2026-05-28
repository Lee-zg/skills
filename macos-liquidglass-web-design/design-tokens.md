# Liquid Glass Design Tokens

Complete CSS custom property system for the macOS 26 Liquid Glass design language.

## Color System

### Surface Colors

```css
:root {
  /* Primary glass surfaces */
  --lg-surface-clear: rgba(255, 255, 255, 0.06);
  --lg-surface-thin: rgba(255, 255, 255, 0.12);
  --lg-surface-regular: rgba(255, 255, 255, 0.18);
  --lg-surface-thick: rgba(255, 255, 255, 0.28);
  --lg-surface-opaque: rgba(255, 255, 255, 0.85);

  /* Tinted glass surfaces */
  --lg-tint-blue: rgba(59, 130, 246, 0.15);
  --lg-tint-purple: rgba(139, 92, 246, 0.15);
  --lg-tint-pink: rgba(236, 72, 153, 0.15);
  --lg-tint-green: rgba(34, 197, 94, 0.15);
  --lg-tint-orange: rgba(249, 115, 22, 0.15);
  --lg-tint-red: rgba(239, 68, 68, 0.15);
  --lg-tint-cyan: rgba(6, 182, 212, 0.15);

  /* Dark mode surfaces */
  --lg-surface-clear-dark: rgba(0, 0, 0, 0.1);
  --lg-surface-thin-dark: rgba(0, 0, 0, 0.2);
  --lg-surface-regular-dark: rgba(0, 0, 0, 0.3);
  --lg-surface-thick-dark: rgba(0, 0, 0, 0.45);
  --lg-surface-opaque-dark: rgba(30, 30, 30, 0.9);
}
```

### Border Colors

```css
:root {
  --lg-border-subtle: rgba(255, 255, 255, 0.08);
  --lg-border-light: rgba(255, 255, 255, 0.15);
  --lg-border-medium: rgba(255, 255, 255, 0.22);
  --lg-border-strong: rgba(255, 255, 255, 0.35);

  --lg-border-subtle-dark: rgba(255, 255, 255, 0.04);
  --lg-border-light-dark: rgba(255, 255, 255, 0.08);
  --lg-border-medium-dark: rgba(255, 255, 255, 0.12);
  --lg-border-strong-dark: rgba(255, 255, 255, 0.2);
}
```

### Text Colors

```css
:root {
  --lg-text-primary: rgba(0, 0, 0, 0.85);
  --lg-text-secondary: rgba(0, 0, 0, 0.6);
  --lg-text-tertiary: rgba(0, 0, 0, 0.4);

  --lg-text-primary-dark: rgba(255, 255, 255, 0.92);
  --lg-text-secondary-dark: rgba(255, 255, 255, 0.65);
  --lg-text-tertiary-dark: rgba(255, 255, 255, 0.4);

  /* Text on glass (always light due to backdrop) */
  --lg-text-on-glass: rgba(255, 255, 255, 0.95);
  --lg-text-on-glass-secondary: rgba(255, 255, 255, 0.7);
}
```

## Blur & Filters

```css
:root {
  /* Backdrop blur levels */
  --lg-blur-xs: 8px;
  --lg-blur-sm: 16px;
  --lg-blur-md: 40px;
  --lg-blur-lg: 60px;
  --lg-blur-xl: 80px;

  /* Saturation boost (makes colors more vibrant through glass) */
  --lg-saturate-subtle: 120%;
  --lg-saturate-normal: 180%;
  --lg-saturate-vivid: 220%;

  /* Brightness adjustment */
  --lg-brightness-light: 1.1;
  --lg-brightness-dark: 0.8;
}
```

## Shadows & Elevation

```css
:root {
  /* Elevation shadows */
  --lg-elevation-0: none;
  --lg-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --lg-elevation-2: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  --lg-elevation-3: 0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  --lg-elevation-4: 0 16px 48px rgba(0, 0, 0, 0.16), 0 8px 16px rgba(0, 0, 0, 0.08);
  --lg-elevation-5: 0 24px 64px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.1);

  /* Inner glow (simulates light trapped in glass) */
  --lg-inner-glow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  --lg-inner-glow-strong: inset 0 2px 4px rgba(255, 255, 255, 0.2);
}
```

## Border Radius

```css
:root {
  --lg-radius-xs: 8px;
  --lg-radius-sm: 12px;
  --lg-radius-md: 20px;
  --lg-radius-lg: 28px;
  --lg-radius-xl: 36px;
  --lg-radius-2xl: 44px;
  --lg-radius-full: 9999px;
}
```

## Spacing

```css
:root {
  --lg-space-1: 4px;
  --lg-space-2: 8px;
  --lg-space-3: 12px;
  --lg-space-4: 16px;
  --lg-space-5: 20px;
  --lg-space-6: 24px;
  --lg-space-8: 32px;
  --lg-space-10: 40px;
  --lg-space-12: 48px;
  --lg-space-16: 64px;
}
```

## Typography

```css
:root {
  --lg-font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
  --lg-font-mono: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;

  --lg-font-xs: 11px;
  --lg-font-sm: 13px;
  --lg-font-base: 15px;
  --lg-font-md: 17px;
  --lg-font-lg: 20px;
  --lg-font-xl: 24px;
  --lg-font-2xl: 32px;
  --lg-font-3xl: 40px;

  --lg-weight-regular: 400;
  --lg-weight-medium: 500;
  --lg-weight-semibold: 600;
  --lg-weight-bold: 700;

  --lg-leading-tight: 1.2;
  --lg-leading-normal: 1.5;
  --lg-leading-relaxed: 1.7;

  --lg-tracking-tight: -0.02em;
  --lg-tracking-normal: 0;
  --lg-tracking-wide: 0.02em;
}
```

## Motion & Animation

```css
:root {
  /* Easing curves */
  --lg-ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --lg-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --lg-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --lg-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --lg-ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);

  /* Duration */
  --lg-duration-fast: 150ms;
  --lg-duration-normal: 300ms;
  --lg-duration-slow: 500ms;
  --lg-duration-slower: 800ms;

  /* Composed transitions */
  --lg-transition-fast: all 150ms var(--lg-ease-default);
  --lg-transition-normal: all 300ms var(--lg-ease-default);
  --lg-transition-spring: all 500ms var(--lg-ease-spring);
  --lg-transition-blur: backdrop-filter 300ms var(--lg-ease-out);
}
```

## Specular Highlights

```css
:root {
  /* Highlight gradients (simulate light refraction) */
  --lg-specular-top-left: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.1) 30%,
    transparent 60%
  );

  --lg-specular-top: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.05) 40%,
    transparent 70%
  );

  --lg-specular-edge: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );

  /* Rainbow refraction (for premium effects) */
  --lg-refraction: linear-gradient(
    135deg,
    rgba(255, 0, 128, 0.05) 0%,
    rgba(0, 128, 255, 0.05) 33%,
    rgba(0, 255, 128, 0.05) 66%,
    rgba(255, 255, 0, 0.05) 100%
  );
}
```

## Predefined Backgrounds

Use these behind glass surfaces:

```css
:root {
  --lg-bg-aurora: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --lg-bg-sunset: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --lg-bg-ocean: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --lg-bg-forest: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  --lg-bg-midnight: linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%);

  --lg-bg-mesh: 
    radial-gradient(at 20% 80%, rgba(124, 58, 237, 0.5) 0%, transparent 50%),
    radial-gradient(at 80% 20%, rgba(6, 182, 212, 0.5) 0%, transparent 50%),
    radial-gradient(at 50% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
    #1e1b4b;
}
```
