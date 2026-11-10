$(document).ready(function () {
  const search = $("#movie-search");
  const filters = $("#genre-filters button");

  function filterMovies() {
    const genre = $("#genre-filters .active").text().toLowerCase();
    const query = search.val().trim().toLowerCase();
    let count = 0;

    $(".movie-card").each(function () {
      const card = $(this);
      const title = card.find("h2").text().toLowerCase();
      const matchesGenre = genre === "all" || card.hasClass(genre);
      const matches = title.includes(query) && matchesGenre;
      card.parent().toggle(matches);
      if (matches) count++;
    });

    $("#no-movies").prop("hidden", count > 0);
  }

  search.on("input", filterMovies);
  filters.on("click", function () {
    filters.removeClass("active").attr("aria-pressed", "false");
    $(this).addClass("active").attr("aria-pressed", "true");
    filterMovies();
  });
  if (search.length) filterMovies();

  const pictures = $(".film-still");
  const lightbox = $("#film-lightbox");
  let current = 0;
  const speed = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200;

  function showPicture() {
    const picture = pictures.eq(current);
    const image = picture.find("img");
    const largeImage = $("#lightbox-image");
    largeImage.attr("src", image.attr("src"));
    largeImage.attr("alt", image.attr("alt"));
    $("#lightbox-caption").text(picture.find("span").text());
  }

  function previous() {
    current--;
    if (current < 0) current = pictures.length - 1;
    showPicture();
  }

  function next() {
    current++;
    if (current === pictures.length) current = 0;
    showPicture();
  }

  pictures.on("click", function () {
    current = pictures.index(this);
    showPicture();
    lightbox[0].showModal();
    lightbox.hide().fadeIn(speed);
  });

  function closeGallery() {
    lightbox.stop(true).fadeOut(speed, function () {
      lightbox[0].close();
    });
  }

  $("#previous-still").on("click", previous);
  $("#next-still").on("click", next);
  $("#close-lightbox").on("click", closeGallery);
  lightbox.on("click", function (event) {
    if (event.target === this) closeGallery();
  });
  lightbox.on("cancel", function (event) {
    event.preventDefault();
    closeGallery();
  });
  lightbox.on("keydown", function (event) {
    if (event.key === "ArrowLeft") previous();
    if (event.key === "ArrowRight") next();
  });
});
