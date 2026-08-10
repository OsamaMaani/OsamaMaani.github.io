# Osama Maani — portfolio

A three-page static site. No build step, no dependencies, no framework. Open
`index.html` in a browser and it works.

```
index.html        Home — the declaration hero, three practices, selected work
projects.html     Every project, grouped by where it was built
about.html        Experience, teaching, toolkit, credentials, volunteering
assets/css/style.css
assets/js/main.js
```

## Publishing on GitHub Pages

**As your main site (`osamamaani.github.io`)**

1. Create a repository named exactly `OsamaMaani.github.io`.
2. Push these files to the root of the `main` branch.
3. Repository → **Settings** → **Pages** → Source: *Deploy from a branch*,
   branch `main`, folder `/ (root)`. Save.
4. Live at `https://osamamaani.github.io` in a minute or two.

```bash
cd portfolio
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/OsamaMaani/OsamaMaani.github.io.git
git push -u origin main
```

**As a project site** — name the repo anything (e.g. `portfolio`), follow the
same steps, and it lands at `https://osamamaani.github.io/portfolio/`. All links
here are relative, so nothing needs changing.

## Things you'll probably want to edit

**Colours** — top of `style.css`, in `:root`. `--amber` is the accent; change
that one value and the whole site follows.

**The hero declaration** — in `index.html`, the `<div class="decl">` block.
Every value in it is a fact from your CV, so update the numbers as they grow.
The grey text on the right of each line is the `decl__gloss` span; it hides
itself on narrow screens.

**Your phone number** is deliberately not on the site — a public page with a
number on it collects spam calls. Add it to the `.links` list on any page if
you'd rather have it there.

**A photo** would strengthen the home page. Drop it at `assets/img/osama.jpg`
and add it beside the hero text.

**A CV download** — put the PDF at `assets/Osama_Maani_CV.pdf` and add a button
to `.hero__actions`:

```html
<a class="btn" href="assets/Osama_Maani_CV.pdf" download>Download CV</a>
```

## Notes

- Fonts load from Google Fonts: Bricolage Grotesque (headings), IBM Plex Sans
  (body), JetBrains Mono (labels and code).
- Responsive down to small phones; keyboard focus is visible; animation is
  disabled for visitors who ask for reduced motion.
- Update the `<meta name="description">` on each page if you rewrite the copy —
  it's what shows up in search results.
