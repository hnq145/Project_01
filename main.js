$(document).ready(function () {
  // Feedback section
  const feedbackItems = $(".feedback-item");
  const feedbackDots = $(".feedback .dot");

  function showFeedbackSlide(index) {
    // Ẩn tất cả item trước khi hiện item mới
    feedbackItems.hide();
    // Dùng fadeIn cho mượt mà
    feedbackItems.eq(index).fadeIn(500);

    // Update dots
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
  const blogItems = $(".blogs .item");
  const blogDots = $(".blogs .dot");

  function showBlogSlide(index) {
    // Lưu ý: Layout blogs đang là flex row với 3 item.
    // Logic gốc có vẻ đang ẩn hiện từng item, nhưng layout CSS lại hiển thị 3 item cùng lúc (width 33%).
    // Tuy nhiên, dựa trên code cũ: blogItems.hide(); blogItems.eq(index).show();
    // Có vẻ như ý định là slider từng cái một trên mobile hoặc logic cũ chưa hoàn thiện.
    // Với cấu trúc HTML hiện tại, blog-list là flex container, các item là con.
    // Nếu muốn slider mượt mà cho list này mà vẫn giữ layout 3 cột, logic JS cần phức tạp hơn (slick slider hoặc owl carousel).
    // Tuy nhiên, để giữ đơn giản và cải thiện code hiện có, ta sẽ giả định logic hiện tại (hiển thị 1 item) là mong muốn (có thể cho mobile),
    // hoặc nếu là desktop thì code cũ đang chỉ hiện 1 item -> vỡ layout 3 cột.
    // NHƯNG: CSS `width: calc(33.33% - 20px)` cho thấy nó là grid 3 cột.
    // Code JS cũ: `blogItems.hide(); blogItems.eq(index).show();` -> Điều này sẽ làm ẩn hết và chỉ hiện 1 bài blog?
    // Nếu đúng là grid 3 cột thì JS này đang làm sai lệch hiển thị trên desktop (chỉ hiện 1 thay vì 3).
    // Nhưng vì nhiệm vụ là làm "dynamic" hơn dựa trên cái CÓ SẴN, tôi sẽ nâng cấp hiệu ứng chuyển đổi hiện tại.
    // Nếu code cũ đang chạy, tôi sẽ làm nó mượt hơn (fadeIn).

    blogItems.hide();
    blogItems.eq(index).fadeIn(500);

    blogDots.removeClass("active");
    blogDots.eq(index).addClass("active");
  }

  blogDots.click(function () {
    const index = $(this).index();
    showBlogSlide(index);
  });

  // Initial display for blog - KHÔNG GỌI HÀM NÀY MẶC ĐỊNH NẾU MUỐN HIỂN THỊ DẠNG GRID
  // Kiểm tra lại logic: Nếu user muốn dạng grid 3 cột tĩnh (không slider) thì đoạn JS này thừa/sai.
  // Nếu user muốn slider testtmonial (feedback) thì ok.
  // Nhưng Blog có dots điều hướng -> Có vẻ là slider thật.
  // Để an toàn và đẹp hơn, ta sẽ giữ logic cũ nhưng thay bằng fadeIn.
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

  // Header Scroll Effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".header").addClass("is-scrolled");
    } else {
      $(".header").removeClass("is-scrolled");
    }
  });
});
