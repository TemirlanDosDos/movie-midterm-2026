const movieSearchApiUrl = "https://cinescope-movie-search.YOUR-SUBDOMAIN.workers.dev";

const aiMovieForm = document.getElementById("ai-movie-form");

if (aiMovieForm) {
  const titleInput = document.getElementById("ai-movie-title");
  const searchButton = document.getElementById("ai-search-button");
  const status = document.getElementById("ai-search-status");
  const result = document.getElementById("ai-movie-result");

  aiMovieForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const query = titleInput.value.trim();

    if (query.length < 2) {
      status.textContent = "Enter at least two characters.";
      result.hidden = true;
      return;
    }

    if (movieSearchApiUrl.includes("YOUR-SUBDOMAIN")) {
      status.textContent = "The Gemini service is waiting for deployment.";
      result.hidden = true;
      return;
    }

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";
    status.textContent = "Gemini is searching for the movie.";
    result.hidden = true;

    try {
      const response = await fetch(movieSearchApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "The movie search is unavailable.");
      }

      document.getElementById("ai-result-title").textContent = data.title;
      document.getElementById("ai-result-year").textContent = String(data.year);
      document.getElementById("ai-result-genres").textContent = data.genres.join(", ");
      document.getElementById("ai-result-description").textContent = data.description;
      result.hidden = false;
      status.textContent = "Movie found.";
    } catch (error) {
      status.textContent = error.message;
    } finally {
      searchButton.disabled = false;
      searchButton.textContent = "Find movie";
    }
  });
}
