$(document).ready(function () {
  // Feedback section
  const feedbackItems = $(".feedback-item");
  const feedbackDots = $(".feedback .dot");

  function showFeedbackSlide(index) {
    feedbackItems.hide();
    feedbackItems.eq(index).fadeIn(500);

    feedbackDots.removeClass("active");
    feedbackDots.eq(index).addClass("active");
  }

  feedbackDots.click(function () {
    const index = $(this).index();
    showFeedbackSlide(index);
  });

  showFeedbackSlide(0);

  // Blog section - Fix logic to show 3 items per slide
  const blogItems = $(".blogs .item");
  const blogDots = $(".blogs .dot");
  const itemsPerSlide = 3;

  function showBlogSlide(index) {
    blogItems.hide();

    const start = index * itemsPerSlide;
    const end = start + itemsPerSlide;

    // Show the slice of 3 items
    blogItems.slice(start, end).fadeIn(500);

    blogDots.removeClass("active");
    blogDots.eq(index).addClass("active");
  }

  blogDots.click(function () {
    const index = $(this).index();
    showBlogSlide(index);
  });

  // Initial display for blog (Slide 0 -> Items 0, 1, 2)
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

  // Header Scroll Effect & Back to Top
  const backToTopBtn = $(".back-to-top");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".header").addClass("is-scrolled");
    } else {
      $(".header").removeClass("is-scrolled");
    }

    // Back to top
    if ($(this).scrollTop() > 500) {
      backToTopBtn.addClass("show");
    } else {
      backToTopBtn.removeClass("show");
    }
  });

  backToTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  // FAQ Accordion
  $(".faq-item .question").click(function () {
    const parent = $(this).parent();

    // Optional: Close others
    $(".faq-item").not(parent).removeClass("active").find(".answer").slideUp();

    // Toggle current
    parent.toggleClass("active");
    parent.find(".answer").slideToggle();
  });

  // Stats Counter Animation
  let counted = false;
  const statsSection = $(".stats");

  $(window).scroll(function () {
    // Check if stats section is in view
    if (statsSection.length && !counted) {
      const oTop = statsSection.offset().top - window.innerHeight;
      if ($(window).scrollTop() > oTop) {
        $(".counter").each(function () {
          const $this = $(this);
          const countTo = $this.attr("data-target");

          $({ countNum: $this.text() }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 2000,
              easing: "linear",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
              },
            }
          );
        });
        counted = true;
      }
    }
  });
});

// Preloader
$(window).on("load", function () {
  $("#preloader").addClass("preloader-hidden");
});
