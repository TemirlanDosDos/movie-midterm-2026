# CineScope

CineScope is a movie website created for the Frontend Development course and expanded for the final project. A visitor can browse movies, search by title, filter by genre, watch trailers, manage a personal watchlist, sign in locally and ask Google Gemini for short movie information.

## Live website

The project is published with GitHub Pages:

**[Open CineScope](https://temirlandosdos.github.io/movie-midterm-2026/)**

## Team

- Temirlan Dosmukhambetov — IT-2502
- Chingiskhan
- Nurkadir

## Pages

- **Home** — project introduction, featured movies and genres
- **Movies** — responsive movie catalog with search and genre filters
- **Details** — movie information, ratings, trailers and image gallery
- **Reviews** — ratings, reviews and personal watchlist
- **Contact** — team information and registration form
- **FAQ** — seven questions with animated jQuery answers
- **Sign in** — a browser profile stored with `localStorage`

All pages use the same navigation and visual style.

## Final project features

### Light and dark themes

The theme switch is available from every page. The selected theme is stored in `localStorage` and remains active after refresh.

### Local sign in

The Sign in page validates a name and email, saves the browser profile in `localStorage`, restores it after refresh and provides a Sign out action. Passwords are not collected or stored.

### Gemini movie information

Deployment status: the Worker and secret are configured. Live verification is in progress; Gemini has returned temporary service errors, so successful movie results are not yet confirmed.

The Movies page contains a Gemini-powered search. A visitor enters a movie title and receives its year, genres and a short description. The browser uses `fetch()` to call a Cloudflare Worker. The Worker stores the Gemini key as an encrypted secret, requests structured JSON from the Gemini API and returns only the required movie fields.

### jQuery FAQ

The FAQ page contains seven movie-related questions. jQuery `.slideToggle()` opens and closes each answer and changes its `+`/`−` indicator.

### Movie search and filters

The Movies page uses jQuery to search movies by title and filter cards by genre. The page also shows a message when no movies match the selected options.

### Interactive gallery

The Details page contains a modal image gallery. The user can open a picture, move to the previous or next image, use the keyboard arrows and close the gallery with the Escape key.

### Personal watchlist

The Reviews page contains a CRUD watchlist made with JavaScript. A visitor can:

- add a movie;
- edit its information;
- delete it after confirmation;
- choose a watching status;
- save the list in the browser with `localStorage`.

The form checks the title, genre, rating and status before changing the table.

### Registration validation

The Contact page contains a registration form with real-time validation:

- required name;
- email format check;
- password strength indicator;
- password confirmation;
- success and error messages.

The form is a student demonstration, so personal data is not sent to a server.

## Technologies

- HTML5
- CSS3
- Bootstrap 5.3
- JavaScript
- jQuery
- DOM manipulation
- `localStorage`
- Git and GitHub
- GitHub Pages
- Google Gemini API
- Cloudflare Workers

The project is a static website and does not require installation or a build command.

## Team contribution

### Temirlan Dosmukhambetov

Created the Home and Contact pages, shared theme system and Gemini API integration; connected the navigation, merged the team branches and prepared the final repository and documentation.

### Chingizkhan

Created the Movies and Details pages, movie search, genre filters, interactive image gallery and jQuery FAQ.

### Nurkadir

Created the Reviews page, personal watchlist and Sign in page with validation and `localStorage`.

## AI use disclosure

The movie-information integration uses Google Gemini. OpenAI Codex assisted with code, integration and documentation. Gemini answers can contain mistakes, which is stated next to the search form on the website.

## Project screenshots

The following places are reserved for the final screenshots.

### 1. Home page

Shows the main page, navigation and hero section.

![CineScope home page](screenshots/home-desktop.png)

### 2. Movie search and genre filter

Shows the Movies page after entering a search query or selecting a genre.

![Movie title search and genre filters](screenshots/movie-filter.png)

### 3. Movie details and gallery

Shows a movie description and the opened interactive gallery.

![Interactive movie gallery](screenshots/movie-gallery.png)

### 4. Watchlist

Shows several added movies and the Edit/Delete controls.

![Personal movie watchlist](screenshots/watchlist-crud.png)

### 5. Registration validation

Shows the registration form with validation messages and the password strength indicator.

![Registration form validation](screenshots/registration-validation.png)

### 6. Mobile layout

Shows the website navigation and content at mobile width.

![CineScope mobile layout](screenshots/mobile-layout.png)

## Code screenshots

### jQuery search and filtering

![jQuery movie filtering code](screenshots/code-movie-filter.png)

### DOM and localStorage watchlist

![Watchlist localStorage code](screenshots/code-watchlist.png)

### Registration form validation

![Registration validation code](screenshots/code-validation.png)

## How to run locally

1. Download or clone the repository.
2. Open the project folder in WebStorm or another code editor.
3. Open `index.html` in a browser.

Repository: [github.com/TemirlanDosDos/movie-midterm-2026](https://github.com/TemirlanDosDos/movie-midterm-2026)
