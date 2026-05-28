# Liquid Glass Component Patterns

Reusable component patterns implementing the Liquid Glass design language.

## Navigation Bar

```html
<nav class="lg-navbar">
  <div class="lg-navbar-content">
    <div class="lg-navbar-brand">AppName</div>
    <div class="lg-navbar-links">
      <a href="#" class="lg-nav-link active">Home</a>
      <a href="#" class="lg-nav-link">Features</a>
      <a href="#" class="lg-nav-link">Pricing</a>
    </div>
    <button class="lg-btn lg-btn-sm">Get Started</button>
  </div>
</nav>
```

```css
.lg-navbar {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: min(90%, 1100px);
  padding: 12px 24px;
  background: var(--lg-surface-thin);
  backdrop-filter: blur(var(--lg-blur-md)) saturate(var(--lg-saturate-normal));
  -webkit-backdrop-filter: blur(var(--lg-blur-md)) saturate(var(--lg-saturate-normal));
  border: 1px solid var(--lg-border-light);
  border-radius: var(--lg-radius-full);
  box-shadow: var(--lg-elevation-3);
  z-index: 1000;
}

.lg-navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--lg-specular-top);
  border-radius: inherit;
  pointer-events: none;
}

.lg-navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.lg-navbar-brand {
  font-weight: var(--lg-weight-semibold);
  font-size: var(--lg-font-md);
  color: var(--lg-text-on-glass);
}

.lg-nav-link {
  color: var(--lg-text-on-glass-secondary);
  text-decoration: none;
  padding: 6px 14px;
  border-radius: var(--lg-radius-full);
  font-size: var(--lg-font-sm);
  transition: var(--lg-transition-fast);
}

.lg-nav-link:hover {
  color: var(--lg-text-on-glass);
  background: rgba(255, 255, 255, 0.1);
}

.lg-nav-link.active {
  color: var(--lg-text-on-glass);
  background: rgba(255, 255, 255, 0.15);
}
```

## Card

```html
<div class="lg-card">
  <div class="lg-card-header">
    <h3 class="lg-card-title">Card Title</h3>
    <p class="lg-card-subtitle">Subtitle text</p>
  </div>
  <div class="lg-card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="lg-card-footer">
    <button class="lg-btn">Action</button>
  </div>
</div>
```

```css
.lg-card {
  background: var(--lg-surface-thin);
  backdrop-filter: blur(var(--lg-blur-md)) saturate(var(--lg-saturate-normal));
  -webkit-backdrop-filter: blur(var(--lg-blur-md)) saturate(var(--lg-saturate-normal));
  border: 1px solid var(--lg-border-light);
  border-radius: var(--lg-radius-lg);
  box-shadow: var(--lg-elevation-2);
  overflow: hidden;
  transition: var(--lg-transition-normal);
  position: relative;
}

.lg-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--lg-specular-top-left);
  pointer-events: none;
  z-index: 1;
}

.lg-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--lg-elevation-4);
  border-color: var(--lg-border-medium);
}

.lg-card-header {
  padding: var(--lg-space-6) var(--lg-space-6) var(--lg-space-3);
  position: relative;
  z-index: 2;
}

.lg-card-title {
  font-size: var(--lg-font-lg);
  font-weight: var(--lg-weight-semibold);
  color: var(--lg-text-on-glass);
  margin: 0;
}

.lg-card-subtitle {
  font-size: var(--lg-font-sm);
  color: var(--lg-text-on-glass-secondary);
  margin: var(--lg-space-1) 0 0;
}

.lg-card-body {
  padding: var(--lg-space-3) var(--lg-space-6);
  color: var(--lg-text-on-glass-secondary);
  position: relative;
  z-index: 2;
}

.lg-card-footer {
  padding: var(--lg-space-3) var(--lg-space-6) var(--lg-space-6);
  position: relative;
  z-index: 2;
}
```

## Button

```html
<button class="lg-btn">Default</button>
<button class="lg-btn lg-btn-primary">Primary</button>
<button class="lg-btn lg-btn-sm">Small</button>
<button class="lg-btn lg-btn-lg">Large</button>
<button class="lg-btn lg-btn-icon">
  <svg>...</svg>
</button>
```

```css
.lg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--lg-space-2);
  padding: 10px 20px;
  font-size: var(--lg-font-sm);
  font-weight: var(--lg-weight-medium);
  font-family: var(--lg-font-family);
  color: var(--lg-text-on-glass);
  background: var(--lg-surface-regular);
  backdrop-filter: blur(var(--lg-blur-sm)) saturate(var(--lg-saturate-subtle));
  -webkit-backdrop-filter: blur(var(--lg-blur-sm)) saturate(var(--lg-saturate-subtle));
  border: 1px solid var(--lg-border-medium);
  border-radius: var(--lg-radius-full);
  cursor: pointer;
  transition: var(--lg-transition-fast);
  position: relative;
  overflow: hidden;
  box-shadow: var(--lg-elevation-1), var(--lg-inner-glow);
}

.lg-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--lg-specular-top);
  pointer-events: none;
  border-radius: inherit;
}

.lg-btn:hover {
  background: var(--lg-surface-thick);
  box-shadow: var(--lg-elevation-2), var(--lg-inner-glow);
  transform: translateY(-1px);
}

.lg-btn:active {
  transform: translateY(0) scale(0.96);
  background: var(--lg-surface-thin);
  box-shadow: var(--lg-elevation-1);
}

.lg-btn-primary {
  background: rgba(59, 130, 246, 0.6);
  border-color: rgba(96, 165, 250, 0.4);
}

.lg-btn-primary:hover {
  background: rgba(59, 130, 246, 0.75);
}

.lg-btn-sm {
  padding: 6px 14px;
  font-size: var(--lg-font-xs);
}

.lg-btn-lg {
  padding: 14px 28px;
  font-size: var(--lg-font-base);
}

.lg-btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
}
```

## Modal / Dialog

```html
<div class="lg-modal-overlay">
  <div class="lg-modal">
    <div class="lg-modal-header">
      <h2 class="lg-modal-title">Dialog Title</h2>
      <button class="lg-btn lg-btn-icon lg-modal-close">&times;</button>
    </div>
    <div class="lg-modal-body">
      <p>Modal content here.</p>
    </div>
    <div class="lg-modal-footer">
      <button class="lg-btn">Cancel</button>
      <button class="lg-btn lg-btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

```css
.lg-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: lg-fade-in var(--lg-duration-normal) var(--lg-ease-out);
}

.lg-modal {
  width: min(90vw, 500px);
  background: var(--lg-surface-regular);
  backdrop-filter: blur(var(--lg-blur-lg)) saturate(var(--lg-saturate-vivid));
  -webkit-backdrop-filter: blur(var(--lg-blur-lg)) saturate(var(--lg-saturate-vivid));
  border: 1px solid var(--lg-border-medium);
  border-radius: var(--lg-radius-xl);
  box-shadow: var(--lg-elevation-5);
  overflow: hidden;
  position: relative;
  animation: lg-scale-in var(--lg-duration-slow) var(--lg-ease-spring);
}

.lg-modal::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--lg-specular-top-left);
  pointer-events: none;
  z-index: 0;
}

.lg-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--lg-space-6);
  position: relative;
  z-index: 1;
}

.lg-modal-title {
  font-size: var(--lg-font-xl);
  font-weight: var(--lg-weight-semibold);
  color: var(--lg-text-on-glass);
  margin: 0;
}

.lg-modal-body {
  padding: 0 var(--lg-space-6) var(--lg-space-6);
  color: var(--lg-text-on-glass-secondary);
  position: relative;
  z-index: 1;
}

.lg-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--lg-space-3);
  padding: var(--lg-space-4) var(--lg-space-6);
  border-top: 1px solid var(--lg-border-subtle);
  position: relative;
  z-index: 1;
}

@keyframes lg-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes lg-scale-in {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

## Input / Form Controls

```html
<div class="lg-input-group">
  <label class="lg-label">Email</label>
  <input type="email" class="lg-input" placeholder="you@example.com" />
</div>

<div class="lg-input-group">
  <label class="lg-label">Message</label>
  <textarea class="lg-input lg-textarea" placeholder="Type here..."></textarea>
</div>
```

```css
.lg-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--lg-space-2);
}

.lg-label {
  font-size: var(--lg-font-sm);
  font-weight: var(--lg-weight-medium);
  color: var(--lg-text-on-glass);
}

.lg-input {
  padding: 12px 16px;
  font-size: var(--lg-font-base);
  font-family: var(--lg-font-family);
  color: var(--lg-text-on-glass);
  background: var(--lg-surface-clear);
  backdrop-filter: blur(var(--lg-blur-sm));
  -webkit-backdrop-filter: blur(var(--lg-blur-sm));
  border: 1px solid var(--lg-border-light);
  border-radius: var(--lg-radius-sm);
  outline: none;
  transition: var(--lg-transition-fast);
  box-shadow: var(--lg-inner-glow);
}

.lg-input::placeholder {
  color: var(--lg-text-on-glass-secondary);
  opacity: 0.5;
}

.lg-input:focus {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15), var(--lg-inner-glow);
  background: var(--lg-surface-thin);
}

.lg-textarea {
  min-height: 120px;
  resize: vertical;
}
```

## Sidebar / Panel

```html
<aside class="lg-sidebar">
  <div class="lg-sidebar-header">
    <h3>Navigation</h3>
  </div>
  <nav class="lg-sidebar-nav">
    <a href="#" class="lg-sidebar-item active">
      <span class="lg-sidebar-icon">&#9733;</span>
      Dashboard
    </a>
    <a href="#" class="lg-sidebar-item">
      <span class="lg-sidebar-icon">&#9881;</span>
      Settings
    </a>
  </nav>
</aside>
```

```css
.lg-sidebar {
  width: 260px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: var(--lg-surface-thin);
  backdrop-filter: blur(var(--lg-blur-lg)) saturate(var(--lg-saturate-normal));
  -webkit-backdrop-filter: blur(var(--lg-blur-lg)) saturate(var(--lg-saturate-normal));
  border-right: 1px solid var(--lg-border-subtle);
  padding: var(--lg-space-6) var(--lg-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--lg-space-2);
}

.lg-sidebar-header h3 {
  font-size: var(--lg-font-sm);
  font-weight: var(--lg-weight-semibold);
  color: var(--lg-text-on-glass-secondary);
  text-transform: uppercase;
  letter-spacing: var(--lg-tracking-wide);
  padding: 0 var(--lg-space-3);
  margin: 0 0 var(--lg-space-3);
}

.lg-sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--lg-space-3);
  padding: 10px var(--lg-space-3);
  border-radius: var(--lg-radius-sm);
  color: var(--lg-text-on-glass-secondary);
  text-decoration: none;
  font-size: var(--lg-font-sm);
  transition: var(--lg-transition-fast);
}

.lg-sidebar-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--lg-text-on-glass);
}

.lg-sidebar-item.active {
  background: rgba(255, 255, 255, 0.12);
  color: var(--lg-text-on-glass);
  box-shadow: var(--lg-inner-glow);
}
```

## Toast / Notification

```html
<div class="lg-toast">
  <div class="lg-toast-icon">&#10003;</div>
  <div class="lg-toast-content">
    <p class="lg-toast-title">Success</p>
    <p class="lg-toast-message">Your changes have been saved.</p>
  </div>
</div>
```

```css
.lg-toast {
  display: flex;
  align-items: center;
  gap: var(--lg-space-3);
  padding: var(--lg-space-4) var(--lg-space-5);
  background: var(--lg-surface-regular);
  backdrop-filter: blur(var(--lg-blur-sm)) saturate(var(--lg-saturate-vivid));
  -webkit-backdrop-filter: blur(var(--lg-blur-sm)) saturate(var(--lg-saturate-vivid));
  border: 1px solid var(--lg-border-medium);
  border-radius: var(--lg-radius-md);
  box-shadow: var(--lg-elevation-4);
  max-width: 360px;
  position: relative;
  overflow: hidden;
  animation: lg-slide-in var(--lg-duration-slow) var(--lg-ease-spring);
}

.lg-toast::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--lg-specular-top);
  pointer-events: none;
}

.lg-toast-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 197, 94, 0.2);
  border-radius: 50%;
  font-size: 14px;
  color: #4ade80;
  position: relative;
  z-index: 1;
}

.lg-toast-title {
  font-size: var(--lg-font-sm);
  font-weight: var(--lg-weight-semibold);
  color: var(--lg-text-on-glass);
  margin: 0;
  position: relative;
  z-index: 1;
}

.lg-toast-message {
  font-size: var(--lg-font-xs);
  color: var(--lg-text-on-glass-secondary);
  margin: 2px 0 0;
  position: relative;
  z-index: 1;
}

@keyframes lg-slide-in {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
```

## Badge / Tag

```html
<span class="lg-badge">Default</span>
<span class="lg-badge lg-badge-blue">Info</span>
<span class="lg-badge lg-badge-green">Success</span>
<span class="lg-badge lg-badge-red">Error</span>
```

```css
.lg-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: var(--lg-font-xs);
  font-weight: var(--lg-weight-medium);
  color: var(--lg-text-on-glass);
  background: var(--lg-surface-thin);
  backdrop-filter: blur(var(--lg-blur-xs));
  border: 1px solid var(--lg-border-subtle);
  border-radius: var(--lg-radius-full);
}

.lg-badge-blue { background: var(--lg-tint-blue); border-color: rgba(59, 130, 246, 0.3); }
.lg-badge-green { background: var(--lg-tint-green); border-color: rgba(34, 197, 94, 0.3); }
.lg-badge-red { background: var(--lg-tint-red); border-color: rgba(239, 68, 68, 0.3); }
```

## Tooltip

```css
.lg-tooltip {
  position: absolute;
  padding: 8px 14px;
  font-size: var(--lg-font-xs);
  color: var(--lg-text-on-glass);
  background: var(--lg-surface-thick);
  backdrop-filter: blur(var(--lg-blur-sm)) saturate(var(--lg-saturate-normal));
  -webkit-backdrop-filter: blur(var(--lg-blur-sm)) saturate(var(--lg-saturate-normal));
  border: 1px solid var(--lg-border-medium);
  border-radius: var(--lg-radius-xs);
  box-shadow: var(--lg-elevation-3);
  white-space: nowrap;
  pointer-events: none;
  z-index: 10000;
  animation: lg-fade-in var(--lg-duration-fast) var(--lg-ease-out);
}
```

## Divider

```css
.lg-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--lg-border-light),
    transparent
  );
  border: none;
  margin: var(--lg-space-4) 0;
}
```
