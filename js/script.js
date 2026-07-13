/* --- HERO IMAGE BANNER SELECTOR CONTROLLER --- */
let autoScrollTimer;
const SCROLL_INTERVAL = 4000; // Time in milliseconds (4 seconds per slide)

function changeSlide(thumbnailElement) {
    const mainHeroImg = document.getElementById('featured-img');
    if (!mainHeroImg) return;

    // 1. Set the src path smoothly using cross-fade scaling triggers
    mainHeroImg.style.opacity = '0.3';
    
    setTimeout(() => {
        mainHeroImg.src = thumbnailElement.src;
        mainHeroImg.style.opacity = '1';
    }, 150);

    // 2. Clear existing active frame highlights across siblings
    const allThumbnails = document.querySelectorAll('.slider-thumbnails .thumb');
    allThumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });

    // 3. Assign structural highlight configuration onto selected click-target
    thumbnailElement.classList.add('active');

    // 4. Reset the timer whenever a user manually clicks to prevent rapid skipping
    resetAutoScroll();
}

/* --- AUTOMATED AUTO-SCROLL ENGINE --- */
function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
        const allThumbnails = document.querySelectorAll('.slider-thumbnails .thumb');
        if (allThumbnails.length === 0) return;

        // Find out which thumbnail is currently active
        let currentIndex = Array.from(allThumbnails).findIndex(thumb => thumb.classList.contains('active'));
        
        // Calculate the next slide index (loop back to 0 if at the end)
        let nextIndex = (currentIndex + 1) % allThumbnails.length;

        // Trigger the slide change seamlessly
        changeSlide(allThumbnails[nextIndex]);
    }, SCROLL_INTERVAL);
}

function resetAutoScroll() {
    clearInterval(autoScrollTimer);
    startAutoScroll();
}

// Kickstart the auto-scroll loops as soon as the DOM finishes rendering
document.addEventListener('DOMContentLoaded', () => {
    startAutoScroll();
});


/* --- INTERACTIVE CAROUSEL SLIDER ENGINE (REVIEWS) --- */
let activeReviewIndex = 1; 

function moveReview(direction) {
    const reviewCards = document.querySelectorAll('.reviews-wrapper .review-card');
    if (reviewCards.length === 0) return;

    reviewCards[activeReviewIndex].classList.remove('active-card');
    activeReviewIndex += direction;

    if (activeReviewIndex >= reviewCards.length) {
        activeReviewIndex = 0;
    } else if (activeReviewIndex < 0) {
        activeReviewIndex = reviewCards.length - 1;
    }

    reviewCards[activeReviewIndex].classList.add('active-card');
    reviewCards[activeReviewIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
}

/* --- CONTACT FORM INTERACTION HANDLER --- */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('event-contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the default page reload
            event.preventDefault();

            // Gather all the form inputs dynamically
            const nameInput = contactForm.querySelector('input[type="text"]').value.trim();
            const emailInput = contactForm.querySelector('input[type="email"]').value.trim();

            // Simple validation check before processing
            if (nameInput === "" || emailInput === "") {
                alert("⚠️ Please enter at least your Name and Email so we can get back to you!");
                return;
            }

            // Visual feedback: Transition button to a loading state
            submitBtn.disabled = true;
            submitBtn.style.background = '#333';
            submitBtn.style.color = '#888';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.innerText = 'TRANSMITTING...';

            // Simulate server lag (1.5 seconds) then show success message
            setTimeout(() => {
                alert(`🚀 Transmission Received, ${nameInput}!\nYour tournament/event request has been beamed to the UGA Esports team. Check your inbox soon.`);
                
                // Reset the form inputs cleanly
                contactForm.reset();

                // Restore button back to its neon glory
                submitBtn.disabled = false;
                submitBtn.style.background = 'var(--neon-blue, #00f0ff)';
                submitBtn.style.color = '#111';
                submitBtn.style.cursor = 'pointer';
                submitBtn.innerText = 'Submit Request';
            }, 1500);
        });
    }
});