$(document).ready(function () {
  const items = $(".feedback-item");
  const dots = $(".dot");

  function showSlide(index) {
    items.hide();
    items.eq(index).show();
    dots.removeClass("active");
    dots.eq(index).addClass("active");
  }

  dots.click(function () {
    const index = $(this).index();
    showSlide(index);
  });

  // Initial display
  showSlide(0);
});
