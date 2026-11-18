# CineScope — Final Project Report

**Course:** Frontend Development  
**Topic:** Movie Website: information, ratings, trailers and reviews  
**Team:** Temirlan Dosmukhambetov (IT-2502), Chingizkhan and Nurkadir

**Repository:** https://github.com/TemirlanDosDos/movie-midterm-2026  
**Website:** https://temirlandosdos.github.io/movie-midterm-2026/

## 1. Objectives

Our goal was to extend the existing CineScope website into an interactive final project. We kept the movie catalog, details, reviews and contact pages from the earlier stages and added a persistent theme, local sign in, an animated FAQ and an external movie-information API.

The website helps visitors discover films, read short descriptions, watch trailers and keep a personal watchlist. It is a student frontend project, not a streaming service.

## 2. Website structure

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Introduction, featured movies and genre links |
| Movies | `movies.html` | Catalog, title/genre filtering and Gemini search |
| Details | `movie-details.html` | Film information, trailers and image gallery |
| Reviews | `reviews.html` | Ratings and a personal CRUD watchlist |
| Contact | `contact.html` | Team information, registration validation and AI disclosure |
| FAQ | `faq.html` | Seven questions with animated answers |
| Sign in | `signin.html` | Local browser profile and sign out |

The seven pages are connected through navigation. Shared CSS and Bootstrap layout utilities provide consistent spacing and responsive layouts. Custom styles use Flexbox and Grid; media queries adapt the content to smaller screens.

## 3. Final project features

### 3.1 Light and dark themes

`js/main.js` reads the saved theme from `localStorage` and applies it through the `data-theme` attribute on the document element. The navigation switch changes the theme and saves the preference. If no preference is saved, the script uses the system colour preference. The same script is loaded on all seven pages.

**Figure 1. Home page in dark mode.**

> INSERT SCREENSHOT 1 HERE — `screenshots/final-home-dark.png`

**Figure 2. The same page in light mode after refreshing.**

> INSERT SCREENSHOT 2 HERE — `screenshots/final-home-light.png`

### 3.2 Local sign in

`js/account.js` validates a name and email address. Invalid inputs receive readable error messages. After valid submission, the script stores the profile in `localStorage`, shows the profile panel and updates the navigation. Refreshing the page restores the profile. Sign out removes the stored profile and returns to the form.

This is local frontend sign in, not server authentication. It does not verify identity, collect passwords or protect server resources.

**Figure 3. Sign-in form with validation errors.**

> INSERT SCREENSHOT 3 HERE — `screenshots/final-signin-errors.png`

**Figure 4. Saved profile displayed after refreshing the page.**

> INSERT SCREENSHOT 4 HERE — `screenshots/final-profile.png`

### 3.3 Animated FAQ

`js/faq.js` attaches a click handler to each question. jQuery `.slideToggle(200)` expands or collapses its answer. The script also changes the plus/minus indicator and `aria-expanded`. `.stop(true, true)` prevents queued animations when a question is clicked repeatedly. There are seven questions about the website and its movie features.

**Figure 5. FAQ with expanded answers and collapsed questions.**

> INSERT SCREENSHOT 5 HERE — `screenshots/final-faq.png`

### 3.4 Gemini movie information

The Movies page has a separate Gemini search below the existing catalog. `js/gemini-search.js` sends the entered title as JSON using `fetch()`. While waiting, the search button is disabled and a loading message is shown. A successful response displays the title, release year, genres and a short description using `textContent`. Errors are shown in the status area and the button becomes available again.

The request flow is:

`Movies page → Cloudflare Worker → Gemini API → JSON response → movie information on the page`

`worker/src/index.js` contains the deployed Worker source. It accepts permitted origins, validates query length, calls Gemini 3.5 Flash Lite and checks the response fields. It handles unsuccessful requests, missing movies and a request timeout. The Gemini API key is stored as a Cloudflare secret, not in browser JavaScript or the repository. Cloudflare is the small backend needed to keep this key private; the website itself is hosted on GitHub Pages.

Gemini generates the information and may make factual mistakes. Responses are not guaranteed database records. Availability also depends on the external API and its quota.

**Figure 6. Successful Gemini search showing title, year, genres and description.**

> INSERT SCREENSHOT 6 HERE — `screenshots/final-gemini-result.png`

### 3.5 Features retained from earlier stages

The catalog supports combined title and genre filtering. The Details gallery supports opening images, previous/next controls and keyboard navigation. Reviews contains a watchlist with create, read, update and delete operations and browser persistence. The Contact registration form demonstrates validation and password-strength feedback; it does not create a server account.

**Figure 7. Watchlist with movie records and Edit/Delete controls.**

> INSERT SCREENSHOT 7 HERE — `screenshots/final-watchlist.png`

**Figure 8. Responsive layout on a 390-pixel-wide screen.**

> INSERT SCREENSHOT 8 HERE — `screenshots/final-mobile.png`

## 4. Development process

We continued in the existing movie-midterm-2026 repository. Team members developed their assigned features in separate branches. Their work was merged into the main branch, then the shared navigation, themes and API integration were connected. The project remains a static HTML/CSS/JavaScript website without a frontend build step.

During integration, the Gemini model was tested against the deployed service. Unavailable models were replaced with a working model. The repository Worker source was then synchronized with the active Cloudflare version. Older Endterm wording and an unused deployment-placeholder check were removed. The README was updated with the final features and local HTTP-server instructions.

## 5. Individual responsibilities

| Participant | Earlier work continued | Final project contribution |
| --- | --- | --- |
| Temirlan Dosmukhambetov | Home, Contact and shared layout | Persistent theme, Gemini integration, Worker configuration, merging and documentation |
| Chingizkhan | Movies, Details, filtering and gallery | FAQ page, jQuery animation and FAQ styling |
| Nurkadir | Reviews and localStorage watchlist | Sign-in page, profile validation, persistence and sign out |

## 6. Verification and limitations

The deployed sign-in form was checked with empty fields and a valid demonstration profile. The profile remained visible after refresh and sign out returned to the form. The selected theme persisted after refresh and navigation to another page. FAQ answers opened and closed, and an unmatched catalog query displayed “No movies found”. The Gemini integration was checked with a real movie request.

Browser storage is local to a browser and device. Clearing it removes the saved profile, watchlist and theme. Trailers require access to YouTube. Gemini requires an available API service and quota. The project does not include real authentication, a database or full-movie streaming.

## 7. AI acknowledgement

OpenAI Codex assisted with code, integration, troubleshooting and documentation. Google Gemini powers the movie-information search. An AI-use disclosure is also included on the Contact page, and the search section warns that generated movie information may contain mistakes.

## 8. Submission links

- [GitHub repository](https://github.com/TemirlanDosDos/movie-midterm-2026)
- [Live website](https://temirlandosdos.github.io/movie-midterm-2026/)

The numbered placeholders above are for the final screenshots. Capture instructions are in [SCREENSHOTS.md](SCREENSHOTS.md).
