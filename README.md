# CineScope — Movie Website

Midterm project: a responsive multi-page movie website with movie information, ratings, trailers, and user reviews.

## Team

- Temirlan Dosmukhambetov — team lead, Home page, shared layout and integration
- Chingizkhan — Movies catalog and Movie Details pages
- Nurkadir — Reviews and Contact pages

## Required pages

1. `index.html` — Home
2. `movies.html` — Movies catalog
3. `movie-details.html` — Movie information, rating, and trailer
4. `reviews.html` — Reviews, rating table, and review form
5. `contact.html` — Contact and feedback form

## Branches

- `main` — Temirlan and final integrated version
- `feature/chingizkhan` — Chingizkhan's work
- `feature/nurkadir` — Nurkadir's work

Do not code directly in another member's branch. Each member commits and pushes only to their own branch. Temirlan reviews and merges finished work into `main`.

## Technologies

- Semantic HTML5
- External CSS
- Flexbox and CSS Grid
- Bootstrap 5 grid and utilities
- Responsive media queries
- Git and GitHub Pages

## Project structure

```text
movie-midterm-2026/
├── index.html
├── movies.html
├── movie-details.html
├── reviews.html
├── contact.html
├── css/
│   ├── style.css
│   ├── chingizkhan.css
│   └── nurkadir.css
├── js/
│   └── main.js
└── assets/
    └── images/
```

## Responsibilities

### Temirlan — `main`

- Create the visual concept, colors, Google Font, logo, and shared navigation.
- Build `index.html`: hero section, featured movies, genre list, and call-to-action.
- Maintain shared `css/style.css` with `:root` variables and global responsive rules.
- Ensure the same `header`, navigation, and `footer` appear on all five pages.
- Integrate both feature branches, test every link and breakpoint, finish this README, and publish with GitHub Pages.

### Chingizkhan — `feature/chingizkhan`

- Build `movies.html` with a Bootstrap responsive movie-card grid.
- Build `movie-details.html` with poster, description, cast/genre list, rating, and responsive trailer embed.
- Put page-specific rules in `css/chingizkhan.css`.
- Use semantic HTML, Bootstrap containers/rows/columns/utilities, Grid or Flexbox, `loading="lazy"` for below-the-fold images, hover effects, and responsive behavior.
- Verify navigation to all five pages and push the branch when complete.

### Nurkadir — `feature/nurkadir`

- Build `reviews.html` with review cards, one movie-rating table, and a review submission form.
- Build `contact.html` with team/contact information, social links, and a feedback form.
- Put page-specific rules in `css/nurkadir.css`.
- Use semantic HTML, Bootstrap form utilities, `:focus`, `:hover`, `:nth-child()`, Flexbox or Grid, and responsive behavior.
- Verify navigation to all five pages and push the branch when complete.

## Git workflow for Chingizkhan

```bash
git clone https://github.com/TemirlanDosDos/movie-midterm-2026.git
cd movie-midterm-2026
git switch feature/chingizkhan
git pull origin feature/chingizkhan
```

After making changes:

```bash
git status
git add movies.html movie-details.html css/chingizkhan.css assets/images
git commit -m "Build movie catalog and details pages"
git push origin feature/chingizkhan
```

## Git workflow for Nurkadir

```bash
git clone https://github.com/TemirlanDosDos/movie-midterm-2026.git
cd movie-midterm-2026
git switch feature/nurkadir
git pull origin feature/nurkadir
```

After making changes:

```bash
git status
git add reviews.html contact.html css/nurkadir.css assets/images
git commit -m "Build reviews and contact pages"
git push origin feature/nurkadir
```

## Before starting each work session

```bash
git switch YOUR-BRANCH-NAME
git pull origin YOUR-BRANCH-NAME
```

Always check the branch with `git branch --show-current` before editing or committing.

## Merge workflow for Temirlan

After both members push their work:

```bash
git switch main
git pull origin main
git merge feature/chingizkhan
git merge feature/nurkadir
git push origin main
```

Resolve any conflicts carefully, then test all pages before pushing.

## Requirements checklist

- [ ] At least five connected pages
- [ ] Shared header, Flexbox navigation, main, and footer
- [ ] Correct headings, paragraphs, lists, links, and images
- [ ] At least one table
- [ ] At least one form
- [ ] External CSS only
- [ ] Flexbox and Grid demonstrated
- [ ] At least one positioning technique
- [ ] `:hover`, `:focus`, and `:nth-child()` used
- [ ] At least three CSS variables in `:root`
- [ ] Google Font or self-hosted font
- [ ] `loading="lazy"` on below-the-fold images
- [ ] Mobile and tablet media-query breakpoints
- [ ] Bootstrap grid and utility classes
- [ ] Published website link added here

## Published website

To be added after GitHub Pages deployment.

