$(document).ready(function () {
  // Feedback section
  const feedbackItems = $(".feedback-item");
  const feedbackDots = $(".feedback .dot");

  function showFeedbackSlide(index) {
    feedbackItems.hide();
    feedbackItems.eq(index).show();
    
    // Update dots in ALL items to match the current slide index
    feedbackItems.each(function() {
        $(this).find(".dot").removeClass("active");
        $(this).find(".dot").eq(index).addClass("active"); // Use index to select key dot
    });
  }

  feedbackDots.click(function () {
    const index = $(this).index();
    showFeedbackSlide(index);
  });

  // Initial display for feedback
  showFeedbackSlide(0);

  // Blog section
  const blogItems = $(".blogs .item"); // Fixed selector
  const blogDots = $(".blogs .dot"); // Fixed selector

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

  // Mobile Menu
  const toggleMenu = $(".toggle-menu");
  const nav = $(".nav");
  const navOverlay = $(".nav-overlay");

  toggleMenu.click(function (e) {
    e.preventDefault();
    nav.addClass("active");
    navOverlay.addClass("active");
  });

  navOverlay.click(function () {
    nav.removeClass("active");
    navOverlay.removeClass("active");
  });
});
