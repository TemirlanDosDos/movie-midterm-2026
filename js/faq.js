$(document).ready(function () {
  $(".faq-question").on("click", function () {
    const question = $(this);
    const answer = question.closest(".faq-item").find(".faq-answer");
    const isOpen = question.attr("aria-expanded") === "true";

    question.attr("aria-expanded", String(!isOpen));
    if (isOpen) {
      question.find(".faq-icon").text("+");
    } else {
      question.find(".faq-icon").text("−");
    }

    answer.stop(true, true).slideToggle(200);
  });
});
