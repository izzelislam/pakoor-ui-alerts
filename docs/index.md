---
layout: home
title: UI Alerts

hero:
  name: UI Alerts
  text: Clean & Modern Toast + Dialog Library
  tagline: Minimalist UI components for Browser, React, and Vue — with smooth animations, themes, and custom styling.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/izzelislam/ui-alerts
---

<style>
  :root {
    --brand-black: #111;
    --brand-gray: #6b7280;
    --brand-light-gray: #f3f4f6;
    --brand-radius: 14px;
    --brand-border: #e5e7eb;
  }

  body {
    background: white !important;
    color: #111 !important;
    font-feature-settings: "liga", "kern";
  }

  .vp-doc h2 {
    border-bottom: none;
  }

  /* HERO IMAGE */
  .bfkr-hero-img {
    margin-top: 32px;
    opacity: .95;
  }

  /* SECTION */
  .bfkr-section {
    margin-top: 60px;
    padding: 10px 0;
    text-align: center;
  }

  /* GRID */
  .bfkr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 26px;
    margin-top: 30px;
  }

  /* CARD */
  .bfkr-card {
    background: white;
    border: 1px solid var(--brand-border);
    border-radius: var(--brand-radius);
    padding: 22px;
    text-align: left;
    transition: .22s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .bfkr-card:hover {
    border-color: #d1d5db;
    transform: translateY(-3px);
    box-shadow: 0 6px 22px rgba(0,0,0,0.06);
  }

  .bfkr-card h3 {
    font-size: 1.12rem;
    margin-bottom: 6px;
    font-weight: 600;
  }

  .bfkr-card p {
    color: var(--brand-gray);
    font-size: .92rem;
    line-height: 1.55;
  }

  /* CTA SECTION */
  .bfkr-cta {
    margin-top: 80px;
    padding: 36px;
    border-radius: var(--brand-radius);
    background: var(--brand-light-gray);
    border: 1px solid #e5e7eb;
    text-align: center;
  }

  .bfkr-cta h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .bfkr-cta p {
    color: var(--brand-gray);
    font-size: 1rem;
  }

  /* BUTTON OVERRIDE (Minimal Black Button) */
  .vp-button {
    border-radius: var(--brand-radius) !important;
    padding: 10px 20px !important;
    font-size: .95rem;
  }

  /* primary (brand) button = solid black */
  .vp-button.brand {
    background: var(--brand-black) !important;
    color: white !important;
    border: 1px solid #000 !important;
  }

  .vp-button.brand:hover {
    background: #000 !important;
    opacity: .9;
  }

  /* alt button = outline black */
  .vp-button.alt {
    background: white !important;
    color: var(--brand-black) !important;
    border: 1px solid var(--brand-black) !important;
  }

  .vp-button.alt:hover {
    background: var(--brand-light-gray) !important;
  }
</style>


## Clean. Modern. Flexible.

UI Alerts delivers elegant toast & dialog components that work out of the box.

<div class="bfkr-section">
  <h2>What You Can Do</h2>

  <div class="bfkr-grid">

  <div class="bfkr-card">
    <h3>🎉 Toast Notifications</h3>
    <p>Beautiful toasts with themes, icons, progress bars, custom colors, and animations.</p>
  </div>

  <div class="bfkr-card">
    <h3>💬 Dialog System</h3>
    <p>Alert, confirm, prompt & SweetAlert-style modal dialogs with full customization.</p>
  </div>

  <div class="bfkr-card">
    <h3>🎨 Themes</h3>
    <p>Modern, Brutalism, Glass, Neumorphism, Minimal, Dark — or design your own.</p>
  </div>

  <div class="bfkr-card">
    <h3>⚡ Global Overrides</h3>
    <p>Customize color palette, backgrounds, button styles, radius, animations, and more.</p>
  </div>

  <div class="bfkr-card">
    <h3>⚛ React & Vue Integration</h3>
    <p>Use simple hooks & plugins for seamless integration.</p>
  </div>

  <div class="bfkr-card">
    <h3>🌐 CDN Ready</h3>
    <p>Load instantly with jsDelivr or UNPKG without build steps.</p>
  </div>

  </div>
</div>

---

<div class="bfkr-cta">
  <h2>Start Building Beautiful UI</h2>
  <p>Level up your project with elegant UI alerts and dialogs — with zero friction.</p>

  <p style="margin-top:24px">
    <a class="vp-button brand" href="/guide/getting-started">Get Started →</a>
  </p>
</div>
