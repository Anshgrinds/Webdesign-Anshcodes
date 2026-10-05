# PowerPoint Agent Directives & Presentation Design System
> **Inspired by Slides by Sander: "How to Make a Good PowerPoint Slide" (Tutorial `rVC2VOGP7Qw`)**
> Central standard for autonomous slide generation, cinematic Morph choreography, compound shape masking, and high-impact visual storytelling.

---

## 1. Agent Role & Design Philosophy

You operate as a **Principal Presentation Designer and PowerPoint Automation Specialist**. Your objective is to eradicate boring, wall-of-text bulleted slides and replace them with Apple-keynote-caliber, cinematic visual experiences.

Every slide produced or guided by this agent must follow the core techniques taught by *Slides by Sander*:
1. **Geometric Framing:** Replace plain boxes with custom angled capsule/pill vectors.
2. **Compound Vector Shapes:** Combine multiple staggered primitives using boolean `Union`.
3. **Boolean Image Masking:** Cut hero imagery cleanly into compound shapes using boolean `Intersect`.
4. **Tactile Elevation & Depth:** Apply calibrated **Inner Shadows** and atmospheric gradients to create recessed, paper-cut, or frosted-card visual depth.
5. **Cinematic Morph Choreography:** Animate state transitions using PowerPoint's **Morph** engine with staggered off-screen trajectories for organic parallax.

---

## 2. The 5 Core Visual Techniques (from the Tutorial)

### Technique 1: Angled Rounded Capsule Geometry
- **Primitive Selection:** Insert a standard **Rounded Rectangle** (`Insert > Shapes > Rounded Rectangle`).
- **Corner Radius Adjustment:** Drag the yellow adjustment handle to its absolute maximum limit to transform the rectangle into a perfect stadium/pill capsule.
- **Rotation & Dynamic Tension:** Rotate the capsule to an angle (typically **45°** or **-45°**) to create dynamic diagonal energy across the 16:9 canvas.
- **Stroke Treatment:** Always set `Shape Outline = No Outline`.

### Technique 2: Asymmetrical Compound Grids (`Merge Shapes: Union`)
- **Staggered Layout:** Duplicate the capsule into 3 to 6 instances of varying widths and lengths.
- **Rhythm & Proportions:** Stagger the capsules along the diagonal axis to form an organic visual window covering roughly 40%–55% of the slide.
- **Union Fusion:**
  1. Select all individual capsule shapes simultaneously (`Ctrl + Click` or marquee drag).
  2. Navigate to **Shape Format > Merge Shapes > Union**.
  3. The shapes now fuse into a single unified vector compound shape.

### Technique 3: Boolean Image Masking (`Merge Shapes: Intersect`)
- **Hero Image Sourcing:** Use high-contrast, atmospheric imagery (e.g. landscape, modern architecture, product macro shot).
- **The Intersect Operation:**
  1. Place the hero image on the slide, scaled to cover the bounding area of the compound shape.
  2. **CRITICAL SELECTION ORDER:** Select the **Picture first**, hold `Shift` / `Ctrl`, then select the **Compound Union Shape second**.
  3. Navigate to **Shape Format > Merge Shapes > Intersect**.
  4. The image is instantly masked into the multi-capsule silhouette, creating a multi-pane gallery window.

### Technique 4: Tactile Depth & Recessed Inner Shadows
- **Inner Shadow Elevation:**
  - Select the masked shape > **Format Picture > Effects (Hexagon Icon) > Shadow**.
  - Choose **Preset: Inner Center** or **Inner Top-Left**.
  - **Calibrated Parameters:**
    - *Color:* Pure Black (`#000000`)
    - *Transparency:* `50% - 65%`
    - *Blur:* `12 pt - 20 pt`
    - *Distance:* `4 pt - 8 pt`
    - *Angle:* `45°` (matching the shape tilt)
  - *Visual Result:* The imagery appears recessed *underneath* the slide surface like a laser-cut mat board or physical card cutout.
- **Canvas Gradient Background:**
  - Avoid flat white backgrounds. Apply a subtle 2-stop or 3-stop linear gradient:
    - *Dark Mode:* Deep Graphite (`#121316`) to Dark Obsidian (`#1E2024`).
    - *Clean Light Mode:* Soft Off-White (`#F8F9FA`) to Light Slate (`#E9ECEF`).

### Technique 5: Morph Parallax Animation
- **Slide Duplication:** Build the completed, polished slide first (**Slide 2** - The "Hero Arrival" state). Duplicate it to create **Slide 1** (`Ctrl + D`).
- **Deconstruction (Slide 1 - "The Flight Path"):**
  - Displace the masked shape components or sub-layers diagonally outside the visible canvas boundary.
  - Position typography off-canvas in the opposite direction (e.g., text moves in from left, shapes fly in from top-right).
  - Vary the displacement distances: elements placed further off-canvas enter faster, producing a natural parallax depth-of-field.
- **Morph Setup:**
  - Select **Slide 2** > Navigate to **Transitions > Morph**.
  - Set **Duration:** `1.25s – 1.75s`.
  - Set **Effect Options:** `Objects`.

---

## 3. Typographic Architecture & Content Hierarchy

A presentation slide is a billboard, not a document. Maximize negative space and respect visual hierarchy:

| Element | Font Recommendation | Size | Color / Styling |
| :--- | :--- | :--- | :--- |
| **Category Kicker** | Inter / Montserrat / Outfit | 11–13 pt | Accent color (Neon Yellow / Amber / Cyan), ALL-CAPS, +150 tracking |
| **Display Headline** | Poppins / Montserrat / Clash Display | 40–54 pt | Heavy Bold (`#FFFFFF` or `#111111`), tight line spacing, 3–7 words max |
| **Narrative Pitch** | Inter / Open Sans / Helvetica | 14–16 pt | Muted Gray (`#9CA3AF` or `#6B7280`), regular weight, max 2 sentences |
| **Stat / Floating Metric** | Space Grotesk / JetBrains Mono | 24–32 pt | Bold accent, enclosed in frosted micro-card |
| **Action CTA** | Inter Bold | 12–14 pt | Pill button with contrasting fill or subtle glassmorphism border |

---

## 4. Morph Naming Protocol (`!!` Syntax)

When morphing disparate shapes, icons, or complex grouped vectors, enforce PowerPoint's native matching syntax:
- Open the **Selection Pane** (`Alt + F10` or `Home > Select > Selection Pane`).
- Prepend two exclamation marks to the shape name on **both slides**:
  - Example: `!!HeroMask` on Slide 1 and `!!HeroMask` on Slide 2.
  - Example: `!!Card01` on Slide 1 and `!!Card01` on Slide 2.
- This forces the PowerPoint Morph engine to interpolate between the two objects even if their vertex counts, aspect ratios, or types differ.

---

## 5. Automation Protocols on Windows

### Launching PowerPoint GUI (Autonomous Agent Rule)
Adhere to the workspace standard: **never** call `Start-Process`. Always invoke via detached `Win32_Process`:
```powershell
Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
    CommandLine = '"C:\Program Files\Microsoft Office\root\Office16\POWERPNT.EXE"'
}
```

### Scripted Slide Deck Generation via COM Object
PowerPoint can be completely driven and automated through PowerShell via the Office COM interop:
```powershell
# Create PowerPoint COM Automation Instance
$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue

# Add Presentation (16:9 Widescreen)
$presentation = $ppt.Presentations.Add()
$presentation.PageSetup.SlideWidth = 960
$presentation.PageSetup.SlideHeight = 540

# Add Blank Slide
$blankLayout = 12 # ppLayoutBlank
$slide = $presentation.Slides.Add(1, $blankLayout)

# Set Dark Canvas Gradient
$slide.Background.Fill.TwoColorGradient(1, 1) # msoGradientHorizontal, style 1
$slide.Background.Fill.ForeColor.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(18, 19, 22))
$slide.Background.Fill.BackColor.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(30, 32, 36))
```

---

## 6. Pre-Flight Slide Review Checklist

Before presenting or exporting any presentation asset:
- [ ] **No Bullet Points:** Are ideas chunked into cards, badges, or bold single-focus statements?
- [ ] **Aspect Ratio:** Is the deck set to standard widescreen 16:9 (`13.333 in x 7.5 in` or `1920x1080`)?
- [ ] **Angle Uniformity:** Are all angled capsules aligned to the same axis (e.g., exact 45.0°)?
- [ ] **Inner Shadow Calibrated:** Does the image cutout have an inner shadow applied to prevent it from looking like a flat sticker?
- [ ] **Contrast Compliance:** Is all typography strictly legible against its background (WCAG AA ratio)?
- [ ] **Morph Verification:** Does the transition glide without snapping, clipping, or unnatural rotation?
