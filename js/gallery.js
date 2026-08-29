/* Zaky Dental - Before-After Gallery & Split Slider Logic */

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSliders();
  initGalleryFilters();
});

function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.ba-slider-container');

  sliders.forEach(slider => {
    const afterImage = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');

    if (!afterImage || !handle) return;

    let isDragging = false;

    function setSliderPosition(x) {
      const rect = slider.getBoundingClientRect();
      let positionPercent = ((x - rect.left) / rect.width) * 100;

      // Constrain position between 5% and 95%
      if (positionPercent < 5) positionPercent = 5;
      if (positionPercent > 95) positionPercent = 95;

      afterImage.style.width = `${positionPercent}%`;
      handle.style.left = `${positionPercent}%`;
    }

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Events for Mobile
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches && e.touches[0]) {
        setSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        if (e.cancelable) {
          e.preventDefault();
        }
        setSliderPosition(e.touches[0].clientX);
      }
    }, { passive: false });

    slider.addEventListener('touchend', () => {
      isDragging = false;
    });

    slider.addEventListener('touchcancel', () => {
      isDragging = false;
    });
  });
}

function initGalleryFilters() {
  const filterChips = document.querySelectorAll('.filter-chips .chip-btn');
  const galleryCards = document.querySelectorAll('[data-category]');

  if (!filterChips.length || !galleryCards.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const category = chip.getAttribute('data-filter');

      // Update active filter chip styling
      filterChips.forEach(c => {
        c.className = 'chip-btn flex-shrink-0 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium text-slate-600 hover:text-[#0B1E3D] hover:bg-white/80 transition-all duration-300';
      });
      chip.className = 'chip-btn active flex-shrink-0 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold text-white bg-[#FF5722] shadow-md shadow-[#FF5722]/30 transition-all duration-300';

      // Filter gallery cards
      galleryCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
