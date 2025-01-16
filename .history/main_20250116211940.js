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

  feedbackDots.click(function () {
    const index = $(this).index();
    showFeedbackSlide(index);
  });

  // Initial display for feedback
  showFeedbackSlide(0);

  const blogItems = $(".blog-item");
  const blogDots = $(".blog .dot");

  function showBlogSlide(index) {
    blogItems.hide();
    blogItems.eq(index).show();
    blogDots.removeClass("active");
    blogDots.eq(index).addClass("active");
  }

  blogDots.click(function () {
    const index = $(this).index();
    showBlogSlide(index);
  });

  // Initial display for blog
  showBlogSlide(0);
});
