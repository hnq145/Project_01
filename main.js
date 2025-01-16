$(document).ready(function () {
  // Feedback section
  const feedbackItems = $(".feedback-item");
  const feedbackDots = $(".feedback .dot");

  function showFeedbackSlide(index) {
    feedbackItems.hide();
    feedbackItems.eq(index).show();
    feedbackDots.removeClass("active");
    feedbackDots.eq(index).addClass("active");
  }

  feedbackDots.click(function () {
    const index = $(this).index();
    showFeedbackSlide(index);
  });

  // Initial display for feedback
  showFeedbackSlide(0);

  // Blog section
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
