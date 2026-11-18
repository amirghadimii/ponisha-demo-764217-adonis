# DESIGN BRIEF: Bright Solar Energy Brand Rebuild

## Visual Direction & Brand Identity
- **Inspirations:**
  - Dribbble: *Solar Energy Website Design — Renewable Energy Landing Page UI* by Rexnor studio
  - Dribbble: *SolarTech Website Hero UI* by Ripa Akter
  - Tesla Solar (*tesla.com/solarpanels*) product minimalism & high-contrast clarity
- **Color Palette & Typography:**
  - Background: Crisp, bright, architectural white (`#ffffff`, `#f8fafc`, `#f1f5f9`)
  - Ink & Typographic Hierarchy: Deep midnight-navy / obsidian ink (`#0a0f1d`, `#0f172a`, `#1e293b`)
  - Accent: High-contrast flat sun-amber & solar gold (`#f59e0b`, `#d97706`, `#eab308`)
  - Subdued borders / dividers: Clean technical hairline strokes (`#e2e8f0`, `#cbd5e1`)
- **Key Design Elements:**
  - Big architectural & solar panel photography with clean framing
  - Oversized typographic savings numerals & clear statistical callouts
  - Savings calculator elevated as the central interactive centerpiece with responsive sliders and a live result panel
  - BANNED: Dark glass dashboards, heavy decorative gradients, identical repetitive feature-card grids

## Feature Parity & Verification Requirements
- **Product Detail Modal:** Detailed technical specifications, capacity, warranty, pricing, and modal controls.
- **Projects Showcase:** Realized solar installations with capacity, location, panel details, and clean filtering/display.
- **Calculator Maths:**
  - 100 m² roof area -> 15.5 kW recommended capacity, 29 x 550W panels, accurate cost range, yearly savings, and payback period.
  - Dual modes (Roof Area slider & Monthly Electricity Bill slider) with live reactive synchronization.
- **Consultation Form:**
  - Jalali Date picker with live formatted label
  - Iranian mobile number validation (e.g. `0912...` length & format validation)
  - Success state with formatted tracking code (`AD-XXXXXX`)
- **Mobile Navigation:** Responsive drawer with smooth toggle, clear navigational links, and auto-closing on selection.

## Tech Lock
- Next.js static export:
  - `output: 'export'`
  - `images: { unoptimized: true }`
  - `basePath: '/test/764217-preview'`
  - `assetPrefix: '/test/764217-preview'`
- Strict TypeScript verification (`npm run build` / typecheck clean)
- Automated verification via Puppeteer test suite
