<!-- ...existing code... -->
<script>
$(document).ready(function(){
    let currentIndex = 0;
    const items = $('.feedback-item');
    const itemCount = items.length;

    function showSlide(index) {
        items.hide();
        items.eq(index).show();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        showSlide(currentIndex);
    }

    // Initial display
    showSlide(currentIndex);

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Optional: Add navigation buttons
    $('.feedback').append('<button class="prev">Previous</button><button class="next">Next</button>');
    $('.prev').click(prevSlide);
    $('.next').click(nextSlide);
});
</script>
<!-- ...existing code... -->