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
  // Optimized Scroll Handlers (Header, Back to Top, Stats)
  const header = $(".header");
  const backToTopBtn = $(".back-to-top");
  const statsSection = $(".stats");
  let counted = false;
  let statsOffset = 0;

  // Calculate stats offset once (and on resize) to avoid layout thrashing on scroll
  function updateStatsOffset() {
    if (statsSection.length) {
      statsOffset = statsSection.offset().top - window.innerHeight;
    }
  }
  updateStatsOffset();
  // Debounce Resize (wait 100ms after resize stops)
  let resizeTimer;
  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateStatsOffset, 100);
  });

  // Throttle Scroll using requestAnimationFrame
  let ticking = false;
  $(window).scroll(function () {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const sTop = $(window).scrollTop();
        
        // Header Logic
        if (sTop > 50) {
          if (!header.hasClass("is-scrolled")) header.addClass("is-scrolled");
        } else {
          if (header.hasClass("is-scrolled")) header.removeClass("is-scrolled");
        }

        // Back to Top Logic
        if (sTop > 500) {
          if (!backToTopBtn.hasClass("show")) backToTopBtn.addClass("show");
        } else {
          if (backToTopBtn.hasClass("show")) backToTopBtn.removeClass("show");
        }

        // Stats Logic
        if (statsSection.length && !counted && sTop > statsOffset) {
          $(".counter").each(function () {
            const $this = $(this);
            const countTo = $this.attr("data-target");
            $({ countNum: $this.text() }).animate(
              { countNum: countTo },
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
        
        ticking = false;
      });
      ticking = true;
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

  // Course Filtering
  const tabBtns = $(".course-tabs .tab-btn");
  const courseItems = $(".course-list .course-item");

  tabBtns.click(function () {
    // Active class
    tabBtns.removeClass("active");
    $(this).addClass("active");

    const filterValue = $(this).attr("data-filter");

    if (filterValue === "all") {
      courseItems.fadeIn(300);
    } else {
      courseItems.each(function () {
        if ($(this).attr("data-category") === filterValue) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(300);
        }
      });
    }
  });

  // Toast Notification Function
  function showToast(message, type = "success") {
    const toast = $(`
      <div class="toast ${type}">
        <span class="toast-message">${message}</span>
        <button class="toast-close">&times;</button>
      </div>
    `);
    
    $("#toast-container").append(toast);
    
    // Auto remove after 4s
    setTimeout(() => {
      toast.addClass("hide");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
    
    // Close button
    toast.find(".toast-close").click(function() {
      toast.addClass("hide");
      setTimeout(() => toast.remove(), 300);
    });
  }

  // Promo Bar Logic
  $("#promo-close").click(function() {
    $("#promo-bar").slideUp();
  });

  // Newsletter Handling
  $(".newsletter .form").submit(function (e) {
    e.preventDefault();
    const email = $(this).find("input").val();
    if (email) {
      // Replaced alert with custom Toast
      showToast(`Thank you for subscribing with ${email}!`);
      // Confetti visual could go here, but stick to toast for now
      $(this).trigger("reset");
    }
  });

  // Video Modal Logic
  const videoBtn = $(".hero .watch-video");
  const modalVideo = $(".modal-video");
  const modalIframe = $(".modal-iframe iframe");
  const modalClose = $(".modal-close");

  // Demo video ID (Rick Roll or generic nature video) - using a safe nature video
  const videoId = "LXb3EKWsInQ"; // 4K Nature

  videoBtn.click(function () {
    modalVideo.addClass("show");
    modalIframe.attr(
      "src",
      `https://www.youtube.com/embed/${videoId}?autoplay=1`
    );
  });

  function closeModal() {
    modalVideo.removeClass("show");
    modalIframe.attr("src", ""); // Stop video
  }

  modalClose.click(closeModal);

  modalVideo.click(function (e) {
    if ($(e.target).is(".modal-video")) {
      closeModal();
    }
  });

  // Dark Mode Logic
  const themeToggle = $(".theme-toggle");
  const body = $("body");

  // Check LocalStorage
  if (localStorage.getItem("theme") === "dark") {
    body.addClass("dark-mode");
  }

  themeToggle.click(function () {
    body.toggleClass("dark-mode");

    if (body.hasClass("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});

// Preloader
// Preloader
function hidePreloader() {
  $("#preloader").addClass("preloader-hidden");
}

$(window).on("load", hidePreloader);

// Fallback: Force hide after 3 seconds (in case load event hangs)
setTimeout(hidePreloader, 3000);

// Immediate check if already loaded
if (document.readyState === "complete") {
  hidePreloader();
}
