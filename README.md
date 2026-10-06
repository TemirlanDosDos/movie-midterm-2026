# CineScope

CineScope is a responsive movie website created for our Frontend Development midterm. The website helps visitors browse a small film collection, read information about each movie, watch trailers, compare sample ratings, and leave a review.

## Team

- Temirlan Dosmukhambetov, IT-2502
- Chingizkhan
- Nurkadir

## Project pages

- `index.html` — home page with featured movies and genres
- `movies.html` — responsive movie catalog
- `movie-details.html` — descriptions, cast, ratings, and trailers
- `reviews.html` — rating table, user reviews, and review form
- `contact.html` — team information and feedback form

All five pages are connected through the navigation menu.

## Features

- semantic HTML5 structure with `header`, `nav`, `main`, `section`, `article`, and `footer`
- responsive layouts for desktop, tablet, and mobile screens
- Bootstrap grid and utility classes
- custom CSS Grid and Flexbox layouts
- movie cards with lazy-loaded images
- responsive YouTube trailer embeds
- rating table styled with `:nth-child()`
- review and contact forms with visible focus states
- CSS variables for shared colors and sizing
- hover effects and sticky navigation
- Google Fonts: DM Sans and Space Grotesk

## Technologies

- HTML5
- CSS3
- Bootstrap 5.3
- Git and GitHub
- GitHub Pages

## Individual contributions

### Temirlan Dosmukhambetov

- created the home and contact pages
- developed the shared visual style and responsive navigation
- connected the pages and completed final integration
- checked responsiveness and prepared the repository documentation

### Chingizkhan

- created the movie catalog
- created the detailed movie information and trailer sections
- designed the movie cards and film detail layouts

### Nurkadir

- created the reviews page
- added the movie rating table and sample reviews
- created the review submission form

## Responsive approach

The project follows a mostly mobile-first approach. Bootstrap columns control the movie-card layout, while custom media queries adapt navigation, spacing, typography, forms, and two-column sections. The main breakpoints are `768px` for mobile/tablet changes and `992px` for larger layouts.

## Screenshots to add before submission

Save the screenshots inside the `screenshots` folder using the exact filenames below. After saving an image, copy the provided Markdown line into this README under its description.

### 1. Home page on desktop

Open `index.html` at approximately 1440px width. Capture the navigation, hero heading, buttons, and poster composition.

**Placeholder:** `screenshots/home-desktop.png`

```md
![CineScope home page on desktop](screenshots/home-desktop.png)
```

### 2. Movie catalog responsive grid

Open `movies.html` at desktop width and capture one complete row of three movie cards. This demonstrates the Bootstrap grid.

**Placeholder:** `screenshots/movies-grid.png`

```md
![Movie catalog Bootstrap grid](screenshots/movies-grid.png)
```

### 3. Movie details and trailer

Open `movie-details.html`, scroll to an embedded trailer, and capture the movie information together with the trailer area.

**Placeholder:** `screenshots/movie-details-trailer.png`

```md
![Movie details and responsive trailer](screenshots/movie-details-trailer.png)
```

### 4. Reviews table and form

Open `reviews.html`. Take one screenshot of the rating table and another screenshot of the review form.

**Placeholders:** `screenshots/reviews-table.png` and `screenshots/review-form.png`

```md
![Movie rating table](screenshots/reviews-table.png)
![Review submission form](screenshots/review-form.png)
```

### 5. Contact page on mobile

Open browser developer tools, select a mobile width around 390px, and capture the team or contact form section. The screenshot should show that the columns stack vertically.

**Placeholder:** `screenshots/contact-mobile.png`

```md
![Contact page mobile layout](screenshots/contact-mobile.png)
```

## Code screenshots to add

These screenshots show the code responsible for the visible result. Keep the editor text large enough to read and include the filename in the WebStorm tab.

### Code screenshot A — Bootstrap grid

In `movies.html`, capture a movie card beginning with:

```html
<div class="col-12 col-sm-6 col-lg-4">
```

This code produces one card per row on mobile, two on small/tablet screens, and three on large screens.

**Save as:** `screenshots/code-bootstrap-grid.png`

```md
![Bootstrap responsive grid code](screenshots/code-bootstrap-grid.png)
```

### Code screenshot B — CSS Grid

In `css/style.css`, capture the `.genre-grid` rule and its mobile media-query rule. This code produces two genre columns on larger screens and one column on mobile.

**Save as:** `screenshots/code-css-grid.png`

```md
![CSS Grid and mobile media query](screenshots/code-css-grid.png)
```

### Code screenshot C — Flexbox navigation

In `css/style.css`, capture the `.site-navigation` rule. This code aligns the logo and links horizontally and changes them to a vertical layout on small screens.

**Save as:** `screenshots/code-flexbox-navigation.png`

```md
![Flexbox navigation code](screenshots/code-flexbox-navigation.png)
```

### Code screenshot D — Table pseudo-class

In `css/nurkadir.css`, capture `.ratings-table tbody tr:nth-child(even)`. This rule gives alternating table rows a different background.

**Save as:** `screenshots/code-nth-child.png`

```md
![CSS nth-child table styling](screenshots/code-nth-child.png)
```

### Code screenshot E — Form focus state

In `css/style.css`, capture the `.form-control:focus` rule. Then click inside a field on `contact.html` and capture the yellow focus highlight.

**Save as:** `screenshots/code-form-focus.png`

```md
![Accessible form focus code](screenshots/code-form-focus.png)
```

## Running the project

No installation is required. Clone the repository and open `index.html` in a browser, or use WebStorm's built-in browser preview.

```bash
git clone https://github.com/TemirlanDosDos/movie-midterm-2026.git
cd movie-midterm-2026
```

## Published website

GitHub Pages link will be added here after deployment.
