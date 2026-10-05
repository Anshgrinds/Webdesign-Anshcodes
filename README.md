# 🌐 Web Design & Development Showcase
> **Author:** Ansh ([@Anshgrinds](https://github.com/Anshgrinds))  
> A curated repository of 5 interactive web development projects, ranging from full-stack educational portals and municipal civic websites to motion design showcases and educational tools.

---

## 📂 Projects Overview

| # | Project Name | Directory | Primary Tech Stack | Description |
|---|:---|:---|:---|:---|
| **01** | **AcharyaPith Preschool & Early Learning** | [`01-Schools-Website/`](./01-Schools-Website) | `HTML5` `CSS3` `JavaScript` `Node.js` `Express` | Full-stack interactive preschool portal with dynamic tour booking, curriculum showcase, and administrative back-office notification simulation. |
| **02** | **Bhangaha Municipality Portal** | [`02-Bhangaha-Website/`](./02-Bhangaha-Website) | `HTML5` `CSS3` `Vanilla JS` | Civic web portal for Bhangaha Municipality featuring public notices, administrative directories, interactive wards breakdown, and civic forms. |
| **03** | **Slides by Sander Morph Showcase** | [`03-PowerPoint-Morph-Showcase/`](./03-PowerPoint-Morph-Showcase) | `HTML5` `CSS3 Transforms` `PowerPoint COM` | Keynote-caliber interactive 16:9 slide demonstration simulating PowerPoint Morph transition, 45° compound pill cutouts, and tactile inner shadows. |
| **04** | **PHLEARN Photoshop Masterclass** | [`04-Photoshop-Masterclass-Dashboard/`](./04-Photoshop-Masterclass-Dashboard) | `HTML5` `CSS Grid` `ExtendScript (JSX)` | Interactive curriculum dashboard and cheatsheet for the 30 Days of Photoshop series, featuring frequency separation math and ExtendScript automation. |
| **05** | **Class 5 Social Studies Exam System** | [`05-Class5-Social-Studies-Exam/`](./05-Class5-Social-Studies-Exam) | `HTML5` `Print CSS (A4)` `PDF Generation` | A4 print-optimized exam question bank and complete model answer guide based on the Ekta Social Studies & Creative Arts Grade 5 curriculum. |

---

## 🚀 Project Details

### 1. [AcharyaPith Preschool & Learning Center](./01-Schools-Website)
- **Features:**
  - Modern responsive hero section with engaging typography and animated call-to-actions.
  - Interactive "Book a Campus Tour" modal with real-time validation and slot selection.
  - Express.js backend server (`server.js`) with RESTful endpoints for booking submissions and simulation email dispatching.
  - Structured JSON data storage (`data/bookings.json`).
- **Quick Start:**
  ```bash
  cd 01-Schools-Website
  npm install
  cp .env.example .env
  npm start
  ```

### 2. [Bhangaha Municipality Portal](./02-Bhangaha-Website)
- **Features:**
  - Clean, accessible municipal portal designed for citizen navigation.
  - Responsive navigation bar with ward directory, citizen charter, and official gazette.
  - Mobile-first layout with smooth transitions and fast load times.
- **Quick Start:**
  Open `index.html` directly in any modern browser.

### 3. [PowerPoint Morph & Cutout Showcase](./03-PowerPoint-Morph-Showcase)
- **Features:**
  - Faithfully recreates the visual design techniques taught in *Slides by Sander* (`rVC2VOGP7Qw`).
  - Interactive slide stage demonstrating the seamless transition between Slide 1 (Pre-arrival flight path) and Slide 2 (Hero arrival).
  - Toggles for inner shadow depth and off-screen staging coordinates.
  - Companion PowerShell automation script (`generate_slides.ps1`) to construct the presentation directly in Microsoft PowerPoint via COM.
- **Quick Start:**
  Open `interactive_slide.html` in your browser.

### 4. [PHLEARN Photoshop Masterclass Dashboard](./04-Photoshop-Masterclass-Dashboard)
- **Features:**
  - Interactive roadmap covering all 30 days of Photoshop training by Aaron Nace.
  - Non-destructive layer stack formulas (8-bit vs 16-bit Frequency Separation, Curves Dodge & Burn).
  - Production-ready ExtendScript (`setup_pro_pipeline.jsx`) and PowerShell launcher (`automate_photoshop.ps1`).
- **Quick Start:**
  Open `phlearn_masterclass.html` in your browser.

### 5. [Class 5 Social Studies Exam System](./05-Class5-Social-Studies-Exam)
- **Features:**
  - Formatted strictly according to the Ekta Books series.
  - Covers 5 core units: Our Social Organizations, Conflict Management, Rights & Duties, District Coordination Committee (DCC), and National Heritage.
  - High-precision printable A4 CSS styles with automated PDF generation via Word COM / Chromium headless.
- **Quick Start:**
  View or print `Ekta_Social_Studies_Class_5_Exam_Questions.pdf` or open `Ekta_Social_Studies_Class_5_Exam_Questions.html`.

---

## 🛠️ Global Tech Stack
- **Frontend:** HTML5, CSS3 (Flexbox & Grid), JavaScript (ES6+), Print CSS
- **Backend:** Node.js, Express.js
- **Automation & Scripting:** PowerShell, Adobe ExtendScript (`.jsx`), Office COM Automation

---

## 📄 License
This repository is released under the [MIT License](LICENSE) & personal learning use.
