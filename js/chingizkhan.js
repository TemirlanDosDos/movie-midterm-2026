$(function () {
  const search = $("#movie-search");
  if (search.length) {
    const cards = $(".movie-grid .movie-card");
    const buttons = $("#genre-filters button");
    let selectedGenre = "All";

    function updateCatalog() {
      const query = search.val().trim().toLowerCase();
      let matches = 0;
      cards.each(function () {
        const card = $(this);
        const title = card.find("h2").text().trim().toLowerCase();
        const genres = card.find(".genre-tags li").map(function () {
          return $(this).text().trim().toLowerCase();
        }).get();
        const visible = title.includes(query) &&
          (selectedGenre === "All" || genres.includes(selectedGenre.toLowerCase()));
        card.parent().prop("hidden", !visible);
        if (visible) matches++;
      });
      $("#no-movies").prop("hidden", matches > 0);
    }

    search.on("input", updateCatalog);
    buttons.on("click", function () {
      selectedGenre = this.dataset.genre;
      buttons.removeClass("active").attr("aria-pressed", "false");
      $(this).addClass("active").attr("aria-pressed", "true");
      updateCatalog();
    });
    updateCatalog();
  }

  const dialog = document.getElementById("film-lightbox");
  if (!dialog) return;

  const stills = $(".film-still");
  const viewer = $(dialog);
  let current = 0;
  const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200;

  function showStill(index) {
    current = (index + stills.length) % stills.length;
    const button = stills.eq(current);
    const img = button.find("img")[0];
    $("#lightbox-image").attr({ src: img.src, alt: img.alt });
    $("#lightbox-caption").text(button.find("span").text());
  }

  function closeViewer() {
    viewer.stop(true, true).fadeOut(duration, function () {
      dialog.close();
      viewer.css("display", "");
    });
  }

  stills.on("click", function () {
    showStill(stills.index(this));
    dialog.showModal();
    viewer.hide().fadeIn(duration);
  });
  $("#previous-still").on("click", function () { showStill(current - 1); });
  $("#next-still").on("click", function () { showStill(current + 1); });
  $("#close-lightbox").on("click", closeViewer);
  viewer.on("cancel", function (event) {
    event.preventDefault();
    closeViewer();
  });
  viewer.on("click", function (event) {
    if (event.target === dialog) closeViewer();
  });
  viewer.on("keydown", function (event) {
    if (event.key === "ArrowLeft") showStill(current - 1);
    if (event.key === "ArrowRight") showStill(current + 1);
  });
});
