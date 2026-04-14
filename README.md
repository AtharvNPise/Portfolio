# Atharv Pise — Portfolio v3.0

## 📁 Folder Structure
```
atharv-portfolio/
├── index.html                     ← Main portfolio page
├── css/
│   └── style.css                  ← All styles (edit here to change colors/fonts/layout)
├── js/
│   └── main.js                    ← Animations, typewriter, particles, nav
└── assets/
    ├── documents/
    │   ├── Atharv_Pise_Resume.pdf
    │   ├── BTech_Degree_2024.pdf
    │   └── CDAC_HPCSA_Certificate.pdf
    └── images/
        └── Atharv_Pise_Photo.jpg
```

## 🚀 How to Run
**Local:** Just double-click `index.html` — opens in any browser.  
**Live:** Drag the entire folder to [netlify.com/drop](https://app.netlify.com/drop)

## 🎨 How to Edit

### Change colors
Open `css/style.css` → look for `:root { }` at the top → edit the `--c1` through `--c6` variables.

### Add Projects
Open `index.html` → find the `<!-- ══════ PROJECTS ══════ -->` section.  
Replace the `.projects-coming-soon` div with your project cards.

### Change fonts
In `index.html` `<head>` → update the Google Fonts `<link>`.  
In `css/style.css` `:root` → update `--font-head`, `--font-body`, `--font-mono`.

### Add/remove certifications
In `index.html` → find `<!-- ══════ CERTIFICATIONS ══════ -->` → add/remove `.cert-card` divs.

### Update typewriter lines
Open `js/main.js` → find the `lines = [...]` array → edit the strings.

### Update contact info
In `index.html` → find `<!-- ══════ CONTACT ══════ -->` → edit email/LinkedIn.

## ✅ Changes in v3.0
- ✅ Download button added inline in About → Certification row
- ✅ Hero description has animated typewriter effect
- ✅ Phone number removed from Contact section
- ✅ Projects section shows professional "Coming Soon" placeholder
- ✅ Navbar background fixed — fully opaque on scroll (no see-through artifact)
- ✅ Fonts upgraded: Plus Jakarta Sans + Inter + JetBrains Mono
- ✅ Files split into index.html / style.css / main.js for easy editing
