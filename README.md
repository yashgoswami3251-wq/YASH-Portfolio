# Your Portfolio Website

A 3-file static site: `index.html`, `style.css`, `script.js`. No build step, no framework — open `index.html` in a browser and it works.

## 1. Replace placeholder content

Search `index.html` for these and swap in your real info:

- `Your Name` → your actual name (appears in hero, footer, `<title>`)
- `you@example.com`, `+91 00000 00000`, addresses in the Contact section
- `github.com/yourusername`, `linkedin.com/in/yourusername`
- RK University details, HSC/SSC school names & years
- The 3 project cards (name, description, tech chips, features, links)
- Certificate issuer names
- Internship/experience block — delete it if you don't have one yet, or replace with a freelance/self-project instead

## 2. Add your files

Drop these into the `assets/` folder:

- `assets/profile.jpg` — your photo (shows in the circular frame near the hero terminal). If missing, it gracefully shows a placeholder instead of breaking.
- `assets/resume.pdf` — your resume. Both "Download Resume" buttons link here.
- `assets/project1.jpg`, `project2.jpg`, `project3.jpg` — screenshots of your apps (same graceful fallback if missing).

## 3. Preview it

Just double-click `index.html`, or for a local server:

```bash
cd portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## 4. Deploy it (free options)

- **GitHub Pages**: push this folder to a GitHub repo → Settings → Pages → deploy from `main` branch. You'll get a free `yourusername.github.io/repo-name` URL — good to put on your resume.
- **Netlify / Vercel**: drag-and-drop the folder onto their dashboard for an instant live link.

## 5. About the contact form

It's a static site, so there's no backend. Right now, submitting the form opens the visitor's email client with a pre-filled message (via `mailto:`). If you want messages to land in an inbox without that extra click, connect it to a free form service like Formspree or Getform, or EmailJS — takes about 10 minutes.

## Notes for placement season

- Keep the resume PDF and the "Skills" section in sync with whatever you put on your actual resume — recruiters will check both.
- Fill in real numbers/outcomes in project descriptions where you can (e.g. "reduced load time by X%", "500+ downloads") — specifics stand out more than feature lists.
- Once you have a real internship or freelance project, update the Experience block in `index.html` — it's currently a placeholder.
